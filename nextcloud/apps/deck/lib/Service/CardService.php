<?php
/**
 * @copyright Copyright (c) 2016 Julius Härtl <jus@bitgrid.net>
 *
 * @copyright Copyright (c) 2019, Alexandru Puiu (alexpuiu20@yahoo.com)
 *
 * @author Julius Härtl <jus@bitgrid.net>
 * @author Maxence Lange <maxence@artificial-owl.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as
 *  published by the Free Software Foundation, either version 3 of the
 *  License, or (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Deck\Service;

use OCA\Deck\Activity\ActivityManager;
use OCA\Deck\Activity\ChangeSet;
use OCA\Deck\Db\AssignedUsers;
use OCA\Deck\Db\AssignedUsersMapper;
use OCA\Deck\Db\Card;
use OCA\Deck\Db\CardMapper;
use OCA\Deck\Db\Acl;
use OCA\Deck\Db\ChangeHelper;
use OCA\Deck\Db\StackMapper;
use OCA\Deck\Notification\NotificationHelper;
use OCA\Deck\Db\BoardMapper;
use OCA\Deck\Db\LabelMapper;
use OCA\Deck\NotFoundException;
use OCA\Deck\StatusException;
use OCA\Deck\BadRequestException;
use OCP\Comments\ICommentsManager;
use OCP\IUserManager;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\EventDispatcher\GenericEvent;

class CardService {

	private $cardMapper;
	private $stackMapper;
	private $boardMapper;
	private $labelMapper;
	private $permissionService;
	private $boardService;
	private $notificationHelper;
	private $assignedUsersMapper;
	private $attachmentService;
	private $currentUser;
	private $activityManager;
	private $commentsManager;
	private $changeHelper;
	/** @var EventDispatcherInterface */
	private $eventDispatcher;
	private $userManager;

	public function __construct(
		CardMapper $cardMapper,
		StackMapper $stackMapper,
		BoardMapper $boardMapper,
		LabelMapper $labelMapper,
		PermissionService $permissionService,
		BoardService $boardService,
		NotificationHelper $notificationHelper,
		AssignedUsersMapper $assignedUsersMapper,
		AttachmentService $attachmentService,
		ActivityManager $activityManager,
		ICommentsManager $commentsManager,
		IUserManager $userManager,
		ChangeHelper $changeHelper,
		EventDispatcherInterface $eventDispatcher,
		$userId
	) {
		$this->cardMapper = $cardMapper;
		$this->stackMapper = $stackMapper;
		$this->boardMapper = $boardMapper;
		$this->labelMapper = $labelMapper;
		$this->permissionService = $permissionService;
		$this->boardService = $boardService;
		$this->notificationHelper = $notificationHelper;
		$this->assignedUsersMapper = $assignedUsersMapper;
		$this->attachmentService = $attachmentService;
		$this->activityManager = $activityManager;
		$this->commentsManager = $commentsManager;
		$this->userManager = $userManager;
		$this->changeHelper = $changeHelper;
		$this->eventDispatcher = $eventDispatcher;
		$this->currentUser = $userId;
	}

	public function enrich($card) {
		$cardId = $card->getId();
		$this->cardMapper->mapOwner($card);
		$card->setAssignedUsers($this->assignedUsersMapper->find($cardId));
		$card->setLabels($this->labelMapper->findAssignedLabelsForCard($cardId));
		$card->setAttachmentCount($this->attachmentService->count($cardId));
		$user = $this->userManager->get($this->currentUser);
		$lastRead = $this->commentsManager->getReadMark('deckCard', (string)$card->getId(), $user);
		$count = $this->commentsManager->getNumberOfCommentsForObject('deckCard', (string)$card->getId(), $lastRead);
		$card->setCommentsUnread($count);
	}

	public function fetchDeleted($boardId) {
		$this->permissionService->checkPermission($this->boardMapper, $boardId, Acl::PERMISSION_READ);
		$cards = $this->cardMapper->findDeleted($boardId);
		foreach ($cards as $card) {
			$this->enrich($card);
		}
		return $cards;
	}

	/**
	 * @param $cardId
	 * @return \OCA\Deck\Db\RelationalEntity
	 * @throws \OCA\Deck\NoPermissionException
	 * @throws \OCP\AppFramework\Db\DoesNotExistException
	 * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException
	 * @throws BadRequestException
	 */
	public function find($cardId) {

		if (is_numeric($cardId) === false) {
			throw new BadRequestException('card id must be a number');
		}

		$this->permissionService->checkPermission($this->cardMapper, $cardId, Acl::PERMISSION_READ);
		$card = $this->cardMapper->find($cardId);
		$assignedUsers = $this->assignedUsersMapper->find($card->getId());
		$attachments = $this->attachmentService->findAll($cardId, true);
		$card->setAssignedUsers($assignedUsers);
		$card->setAttachments($attachments);
		$this->enrich($card);
		return $card;
	}

	/**
	 * @param $title
	 * @param $stackId
	 * @param $type
	 * @param integer $order
	 * @param $description
	 * @param $owner
	 * @return \OCP\AppFramework\Db\Entity
	 * @throws StatusException
	 * @throws \OCA\Deck\NoPermissionException
	 * @throws \OCP\AppFramework\Db\DoesNotExistException
	 * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException
	 * @throws BadrequestException
	 */
	public function create($title, $stackId, $type, $order, $owner, $description = '') {
		if ($title === 'false' || $title === null) {
			throw new BadRequestException('title must be provided');
		}

		if (is_numeric($stackId) === false) {
			throw new BadRequestException('stack id must be a number');
		}

		if ($type === 'false' || $type === null) {
			throw new BadRequestException('type must be provided');
		}

		if (is_numeric($order) === false) {
			throw new BadRequestException('order must be a number');
		}

		if ($owner === false || $owner === null) {
			throw new BadRequestException('owner must be provided');
		}

		$this->permissionService->checkPermission($this->stackMapper, $stackId, Acl::PERMISSION_EDIT);
		if ($this->boardService->isArchived($this->stackMapper, $stackId)) {
			throw new StatusException('Operation not allowed. This board is archived.');
		}
		$card = new Card();
		$card->setTitle($title);
		$card->setStackId($stackId);
		$card->setType($type);
		$card->setOrder($order);
		$card->setOwner($owner);
		$card->setDescription($description);
		$card = $this->cardMapper->insert($card);
		$this->activityManager->triggerEvent(ActivityManager::DECK_OBJECT_CARD, $card, ActivityManager::SUBJECT_CARD_CREATE);
		$this->changeHelper->cardChanged($card->getId(), false);

		$this->eventDispatcher->dispatch(
			'\OCA\Deck\Card::onCreate',
			new GenericEvent(
				null, ['id' => $card->getId(), 'card' => $card, 'userId' => $owner, 'stackId' => $stackId]
			)
		);

		return $card;
	}

	/**
	 * @param $id
	 * @return \OCP\AppFramework\Db\Entity
	 * @throws StatusException
	 * @throws \OCA\Deck\NoPermissionException
	 * @throws \OCP\AppFramework\Db\DoesNotExistException
	 * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException
	 * @throws BadRequestException
	 */
	public function delete($id) {

		if (is_numeric($id) === false) {
			throw new BadRequestException('card id must be a number');
		}

		$this->permissionService->checkPermission($this->cardMapper, $id, Acl::PERMISSION_EDIT);
		if ($this->boardService->isArchived($this->cardMapper, $id)) {
			throw new StatusException('Operation not allowed. This board is archived.');
		}
		$card = $this->cardMapper->find($id);
		$card->setDeletedAt(time());
		$this->cardMapper->update($card);
		$this->activityManager->triggerEvent(ActivityManager::DECK_OBJECT_CARD, $card, ActivityManager::SUBJECT_CARD_DELETE);
		$this->changeHelper->cardChanged($card->getId(), false);

		$this->eventDispatcher->dispatch(
			'\OCA\Deck\Card::onDelete', new GenericEvent(null, ['id' => $id, 'card' => $card])
		);

		return $card;
	}

	/**
	 * @param $id
	 * @param $title
	 * @param $stackId
	 * @param $type
	 * @param $order
	 * @param $description
	 * @param $owner
	 * @param $duedate
	 * @return \OCP\AppFramework\Db\Entity
	 * @throws StatusException
	 * @throws \OCA\Deck\NoPermissionException
	 * @throws \OCP\AppFramework\Db\DoesNotExistException
	 * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException
	 * @throws BadRequestException
	 */
	public function update($id, $title, $stackId, $type, $order = 0, $description = '', $owner, $duedate = null, $deletedAt = null, $archived = null) {

		if (is_numeric($id) === false) {
			throw new BadRequestException('card id must be a number');
		}

		if ($title === false || $title === null) {
			throw new BadRequestException('title must be provided');
		}

		if (is_numeric($stackId) === false) {
			throw new BadRequestException('stack id must be a number $$$');
		}

		if ($type === false || $type === null) {
			throw new BadRequestException('type must be provided');
		}

		if ($owner === false || $owner === null) {
			throw new BadRequestException('owner must be provided');
		}

		$this->permissionService->checkPermission($this->cardMapper, $id, Acl::PERMISSION_EDIT);
		if ($this->boardService->isArchived($this->cardMapper, $id)) {
			throw new StatusException('Operation not allowed. This board is archived.');
		}
		$card = $this->cardMapper->find($id);
		if ($archived !== null && $card->getArchived() && $archived === true) {
			throw new StatusException('Operation not allowed. This card is archived.');
		}
		$changes = new ChangeSet($card);
		if ($card->getLastEditor() !== $this->currentUser && $card->getLastEditor() !== null) {
			$this->activityManager->triggerEvent(
				ActivityManager::DECK_OBJECT_CARD,
				$card,
				ActivityManager::SUBJECT_CARD_UPDATE_DESCRIPTION,
				[
					'before' => $card->getDescriptionPrev(),
					'after' => $card->getDescription()
				],
				$card->getLastEditor()
			);

			$card->setDescriptionPrev($card->getDescription());
			$card->setLastEditor($this->currentUser);
		}
		$card->setTitle($title);
		$card->setStackId($stackId);
		$card->setType($type);
		$card->setOrder($order);
		$card->setOwner($owner);
		$card->setDuedate($duedate);
		if ($deletedAt) {
			$card->setDeletedAt($deletedAt);
		}
		if ($archived !== null) {
			$card->setArchived($archived);
		}


		// Trigger update events before setting description as it is handled separately
		$changes->setAfter($card);
		$this->activityManager->triggerUpdateEvents(ActivityManager::DECK_OBJECT_CARD, $changes, ActivityManager::SUBJECT_CARD_UPDATE);

		if ($card->getDescriptionPrev() === null) {
			$card->setDescriptionPrev($card->getDescription());
		}
		$card->setDescription($description);


		$card = $this->cardMapper->update($card);
		$this->changeHelper->cardChanged($card->getId(), true);

		$this->eventDispatcher->dispatch(
			'\OCA\Deck\Card::onUpdate', new GenericEvent(null, ['id' => $id, 'card' => $card])
		);

		return $card;
	}

	/**
	 * @param $id
	 * @param $title
	 * @return \OCP\AppFramework\Db\Entity
	 * @throws StatusException
	 * @throws \OCA\Deck\NoPermissionException
	 * @throws \OCP\AppFramework\Db\DoesNotExistException
	 * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException
	 * @throws BadRequestException
	 */
	public function rename($id, $title) {

		if (is_numeric($id) === false) {
			throw new BadRequestException('id must be a number');
		}

		if ($title === false || $title === null) {
			throw new BadRequestException('title must be provided');
		}

		$this->permissionService->checkPermission($this->cardMapper, $id, Acl::PERMISSION_EDIT);
		if ($this->boardService->isArchived($this->cardMapper, $id)) {
			throw new StatusException('Operation not allowed. This board is archived.');
		}
		$card = $this->cardMapper->find($id);
		if ($card->getArchived()) {
			throw new StatusException('Operation not allowed. This card is archived.');
		}
		$card->setTitle($title);
		$this->changeHelper->cardChanged($card->getId(), false);
		$update = $this->cardMapper->update($card);

		$this->eventDispatcher->dispatch(
			'\OCA\Deck\Card::onUpdate', new GenericEvent(null, ['id' => $id, 'card' => $card])
		);

		return $update;
	}

	/**
	 * @param $id
	 * @param $stackId
	 * @param $order
	 * @return array
	 * @throws StatusException
	 * @throws \OCA\Deck\NoPermissionException
	 * @throws \OCP\AppFramework\Db\DoesNotExistException
	 * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException
	 * @throws BadRequestException
	 */
	public function reorder($id, $stackId, $order) {

		if (is_numeric($id) === false) {
			throw new BadRequestException('card id must be a number');
		}

		if (is_numeric($stackId) === false) {
			throw new BadRequestException('stack id must be a number');
		}

		if (is_numeric($order) === false) {
			throw new BadRequestException('order must be a number');
		}

		$this->permissionService->checkPermission($this->cardMapper, $id, Acl::PERMISSION_EDIT);
		if ($this->boardService->isArchived($this->cardMapper, $id)) {
			throw new StatusException('Operation not allowed. This board is archived.');
		}
		$cards = $this->cardMapper->findAll($stackId);
		$result = [];
		$i = 0;
		foreach ($cards as $card) {
			if ($card->getArchived()) {
				throw new StatusException('Operation not allowed. This card is archived.');
			}
			if ($card->id === $id) {
				$card->setOrder($order);
				$card->setLastModified(time());
			}

			if ($i === $order) {
				$i++;
			}

			if ($card->id !== $id) {
				$card->setOrder($i++);
			}
			$this->cardMapper->update($card);
			$result[$card->getOrder()] = $card;
		}
		$this->changeHelper->cardChanged($id, false);
		return array_values($result);
	}

	/**
	 * @param $id
	 * @return \OCP\AppFramework\Db\Entity
	 * @throws StatusException
	 * @throws \OCA\Deck\NoPermissionException
	 * @throws \OCP\AppFramework\Db\DoesNotExistException
	 * @throws \OCP\AppFramework\Db\
	 * @throws BadRequestException
	 */
	public function archive($id) {

		if (is_numeric($id) === false) {
			throw new BadRequestException('id must be a number');
		}

		$this->permissionService->checkPermission($this->cardMapper, $id, Acl::PERMISSION_EDIT);
		if ($this->boardService->isArchived($this->cardMapper, $id)) {
			throw new StatusException('Operation not allowed. This board is archived.');
		}
		$card = $this->cardMapper->find($id);
		$card->setArchived(true);
		$newCard = $this->cardMapper->update($card);
		$this->notificationHelper->markDuedateAsRead($card);
		$this->activityManager->triggerEvent(ActivityManager::DECK_OBJECT_CARD, $newCard, ActivityManager::SUBJECT_CARD_UPDATE_ARCHIVE);
		$this->changeHelper->cardChanged($id, false);

		$this->eventDispatcher->dispatch(
			'\OCA\Deck\Card::onUpdate', new GenericEvent(null, ['id' => $id, 'card' => $card])
		);

		return $newCard;
	}

	/**
	 * @param $id
	 * @return \OCP\AppFramework\Db\Entity
	 * @throws StatusException
	 * @throws \OCA\Deck\NoPermissionException
	 * @throws \OCP\AppFramework\Db\DoesNotExistException
	 * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException
	 * @throws BadRequestException
	 */
	public function unarchive($id) {

		if (is_numeric($id) === false) {
			throw new BadRequestException('id must be a number');
		}

		$this->permissionService->checkPermission($this->cardMapper, $id, Acl::PERMISSION_EDIT);
		if ($this->boardService->isArchived($this->cardMapper, $id)) {
			throw new StatusException('Operation not allowed. This board is archived.');
		}
		$card = $this->cardMapper->find($id);
		$card->setArchived(false);
		$newCard = $this->cardMapper->update($card);
		$this->activityManager->triggerEvent(ActivityManager::DECK_OBJECT_CARD, $newCard, ActivityManager::SUBJECT_CARD_UPDATE_UNARCHIVE);
		$this->changeHelper->cardChanged($id, false);

		$this->eventDispatcher->dispatch(
			'\OCA\Deck\Card::onUpdate', new GenericEvent(null, ['id' => $id, 'card' => $card])
		);

		return $newCard;
	}

	/**
	 * @param $cardId
	 * @param $labelId
	 * @throws StatusException
	 * @throws \OCA\Deck\NoPermissionException
	 * @throws \OCP\AppFramework\Db\DoesNotExistException
	 * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException
	 * @throws BadRequestException
	 */
	public function assignLabel($cardId, $labelId) {

		if (is_numeric($cardId) === false) {
			throw new BadRequestException('card id must be a number');
		}

		if (is_numeric($labelId) === false) {
			throw new BadRequestException('label id must be a number');
		}

		$this->permissionService->checkPermission($this->cardMapper, $cardId, Acl::PERMISSION_EDIT);
		if ($this->boardService->isArchived($this->cardMapper, $cardId)) {
			throw new StatusException('Operation not allowed. This board is archived.');
		}
		$card = $this->cardMapper->find($cardId);
		if ($card->getArchived()) {
			throw new StatusException('Operation not allowed. This card is archived.');
		}
		$label = $this->labelMapper->find($labelId);
		$this->cardMapper->assignLabel($cardId, $labelId);
		$this->changeHelper->cardChanged($cardId, false);
		$this->activityManager->triggerEvent(ActivityManager::DECK_OBJECT_CARD, $card, ActivityManager::SUBJECT_LABEL_ASSIGN, ['label' => $label]);

		$this->eventDispatcher->dispatch(
			'\OCA\Deck\Card::onUpdate', new GenericEvent(null, ['id' => $cardId, 'card' => $card])
		);
	}

	/**
	 * @param $cardId
	 * @param $labelId
	 * @throws StatusException
	 * @throws \OCA\Deck\NoPermissionException
	 * @throws \OCP\AppFramework\Db\DoesNotExistException
	 * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException
	 * @throws BadRequestException
	 */
	public function removeLabel($cardId, $labelId) {

		if (is_numeric($cardId) === false) {
			throw new BadRequestException('card id must be a number');
		}

		if (is_numeric($labelId) === false) {
			throw new BadRequestException('label id must be a number');
		}

		$this->permissionService->checkPermission($this->cardMapper, $cardId, Acl::PERMISSION_EDIT);
		if ($this->boardService->isArchived($this->cardMapper, $cardId)) {
			throw new StatusException('Operation not allowed. This board is archived.');
		}
		$card = $this->cardMapper->find($cardId);
		if ($card->getArchived()) {
			throw new StatusException('Operation not allowed. This card is archived.');
		}
		$label = $this->labelMapper->find($labelId);
		$this->cardMapper->removeLabel($cardId, $labelId);
		$this->changeHelper->cardChanged($cardId, false);
		$this->activityManager->triggerEvent(ActivityManager::DECK_OBJECT_CARD, $card, ActivityManager::SUBJECT_LABEL_UNASSING, ['label' => $label]);

		$this->eventDispatcher->dispatch(
			'\OCA\Deck\Card::onUpdate', new GenericEvent(null, ['id' => $cardId, 'card' => $card])
		);
	}

	/**
	 * @param $cardId
	 * @param $userId
	 * @return bool|null|\OCP\AppFramework\Db\Entity
	 * @throws BadRequestException
	 * @throws \OCA\Deck\NoPermissionException
	 * @throws \OCP\AppFramework\Db\DoesNotExistException
	 * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException
	 */
	public function assignUser($cardId, $userId) {

		if (is_numeric($cardId) === false) {
			throw new BadRequestException('card id must be a number');
		}

		if ($userId === false || $userId === null) {
			throw new BadRequestException('user id must be provided');
		}

		$this->permissionService->checkPermission($this->cardMapper, $cardId, Acl::PERMISSION_EDIT);
		$assignments = $this->assignedUsersMapper->find($cardId);
		foreach ($assignments as $assignment) {
			if ($assignment->getParticipant() === $userId) {
				throw new BadRequestException('The user is already assigned to the card');
			}
		}

		$card = $this->cardMapper->find($cardId);
		$boardId = $this->cardMapper->findBoardId($cardId);
		$boardUsers = array_keys($this->permissionService->findUsers($boardId, true));
		if (!in_array($userId, $boardUsers)) {
			throw new BadRequestException('The user is not part of the board');
		}


		if ($userId !== $this->currentUser) {
			/* Notifyuser about the card assignment */
			$this->notificationHelper->sendCardAssigned($card, $userId);
		}

		$assignment = new AssignedUsers();
		$assignment->setCardId($cardId);
		$assignment->setParticipant($userId);
		$assignment = $this->assignedUsersMapper->insert($assignment);
		$this->changeHelper->cardChanged($cardId, false);
		$this->activityManager->triggerEvent(ActivityManager::DECK_OBJECT_CARD, $card, ActivityManager::SUBJECT_CARD_USER_ASSIGN, ['assigneduser' => $userId]);

		$this->eventDispatcher->dispatch(
			'\OCA\Deck\Card::onUpdate', new GenericEvent(null, ['id' => $cardId, 'card' => $card])
		);

		return $assignment;
	}

	/**
	 * @param $cardId
	 * @param $userId
	 * @return \OCP\AppFramework\Db\Entity
	 * @throws BadRequestException
	 * @throws NotFoundException
	 * @throws \OCA\Deck\NoPermissionException
	 * @throws \OCP\AppFramework\Db\DoesNotExistException
	 * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException
	 */
	public function unassignUser($cardId, $userId) {
		$this->permissionService->checkPermission($this->cardMapper, $cardId, Acl::PERMISSION_EDIT);

		if (is_numeric($cardId) === false) {
			throw new BadRequestException('card id must be a number');
		}

		if ($userId === false || $userId === null) {
			throw new BadRequestException('user must be provided');
		}

		$assignments = $this->assignedUsersMapper->find($cardId);
		foreach ($assignments as $assignment) {
			if ($assignment->getParticipant() === $userId) {
				$assignment = $this->assignedUsersMapper->delete($assignment);
				$card = $this->cardMapper->find($cardId);
				$this->activityManager->triggerEvent(ActivityManager::DECK_OBJECT_CARD, $card, ActivityManager::SUBJECT_CARD_USER_UNASSIGN, ['assigneduser' => $userId]);
				$this->changeHelper->cardChanged($cardId, false);

				$this->eventDispatcher->dispatch(
					'\OCA\Deck\Card::onUpdate', new GenericEvent(null, ['id' => $cardId, 'card' => $card])
				);

				return $assignment;
			}
		}
		throw new NotFoundException('No assignment for ' . $userId . 'found.');
	}
}
