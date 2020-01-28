<?php
/**
 * @copyright Copyright (c) 2016 Julius Härtl <jus@bitgrid.net>
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
use OCA\Deck\Collaboration\Resources\ResourceProvider;
use OCA\Deck\Db\Acl;
use OCA\Deck\Db\AclMapper;
use OCA\Deck\Db\AssignedUsersMapper;
use OCA\Deck\Db\ChangeHelper;
use OCA\Deck\Db\IPermissionMapper;
use OCA\Deck\Db\Label;
use OCA\Deck\Db\StackMapper;
use OCA\Deck\NoPermissionException;
use OCA\Deck\Notification\NotificationHelper;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\IGroupManager;
use OCP\IL10N;
use OCA\Deck\Db\Board;
use OCA\Deck\Db\BoardMapper;
use OCA\Deck\Db\LabelMapper;
use OCP\IUserManager;
use OCA\Deck\BadRequestException;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\EventDispatcher\GenericEvent;


class BoardService {

	private $boardMapper;
	private $stackMapper;
	private $labelMapper;
	private $aclMapper;
	private $l10n;
	private $permissionService;
	private $notificationHelper;
	private $assignedUsersMapper;
	private $userManager;
	private $groupManager;
	private $userId;
	private $activityManager;
	/** @var EventDispatcherInterface */
	private $eventDispatcher;
	private $changeHelper;

	public function __construct(
		BoardMapper $boardMapper,
		StackMapper $stackMapper,
		IL10N $l10n,
		LabelMapper $labelMapper,
		AclMapper $aclMapper,
		PermissionService $permissionService,
		NotificationHelper $notificationHelper,
		AssignedUsersMapper $assignedUsersMapper,
		IUserManager $userManager,
		IGroupManager $groupManager,
		ActivityManager $activityManager,
		EventDispatcherInterface $eventDispatcher,
		ChangeHelper $changeHelper,
		$userId
	) {
		$this->boardMapper = $boardMapper;
		$this->stackMapper = $stackMapper;
		$this->labelMapper = $labelMapper;
		$this->aclMapper = $aclMapper;
		$this->l10n = $l10n;
		$this->permissionService = $permissionService;
		$this->notificationHelper = $notificationHelper;
		$this->assignedUsersMapper = $assignedUsersMapper;
		$this->userManager = $userManager;
		$this->groupManager = $groupManager;
		$this->activityManager = $activityManager;
		$this->eventDispatcher = $eventDispatcher;
		$this->changeHelper = $changeHelper;
		$this->userId = $userId;
	}

	/**
	 * Set a different user than the current one, e.g. when no user is available in occ
	 *
	 * @param string $userId
	 */
	public function setUserId(string $userId): void {
		$this->userId = $userId;
	}

	/**
	 * @return array
	 */
	public function findAll($since = -1, $details = null) {
		$userInfo = $this->getBoardPrerequisites();
		$userBoards = $this->boardMapper->findAllByUser($userInfo['user'], null, null, $since);
		$groupBoards = $this->boardMapper->findAllByGroups($userInfo['user'], $userInfo['groups'],null, null,  $since);
		$circleBoards = $this->boardMapper->findAllByCircles($userInfo['user'], null, null,  $since);
		$complete = array_merge($userBoards, $groupBoards, $circleBoards);
		$result = [];
		/** @var Board $item */
		foreach ($complete as &$item) {
			if (!array_key_exists($item->getId(), $result)) {
				$this->boardMapper->mapOwner($item);
				if ($item->getAcl() !== null) {
					foreach ($item->getAcl() as &$acl) {
						$this->boardMapper->mapAcl($acl);
					}
				}
				if ($details !== null) {
					$this->enrichWithStacks($item);
					$this->enrichWithLabels($item);
					$this->enrichWithUsers($item);
				}
				$permissions = $this->permissionService->matchPermissions($item);
				$item->setPermissions([
					'PERMISSION_READ' => $permissions[Acl::PERMISSION_READ],
					'PERMISSION_EDIT' => $permissions[Acl::PERMISSION_EDIT],
					'PERMISSION_MANAGE' => $permissions[Acl::PERMISSION_MANAGE],
					'PERMISSION_SHARE' => $permissions[Acl::PERMISSION_SHARE]
				]);
				$result[$item->getId()] = $item;
			}
		}
		return array_values($result);
	}

	/**
	 * @param $boardId
	 * @return Board
	 * @throws DoesNotExistException
	 * @throws \OCA\Deck\NoPermissionException
	 * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException
	 * @throws BadRequestException
	 */
	public function find($boardId) {

		if ( is_numeric($boardId) === false ) {
			throw new BadRequestException('board id must be a number');
		}

		$this->permissionService->checkPermission($this->boardMapper, $boardId, Acl::PERMISSION_READ);
		/** @var Board $board */
		$board = $this->boardMapper->find($boardId, true, true);
		$this->boardMapper->mapOwner($board);
		foreach ($board->getAcl() as &$acl) {
			if ($acl !== null) {
				$this->boardMapper->mapAcl($acl);
			}
		}
		$permissions = $this->permissionService->matchPermissions($board);
		$board->setPermissions([
			'PERMISSION_READ' => $permissions[Acl::PERMISSION_READ],
			'PERMISSION_EDIT' => $permissions[Acl::PERMISSION_EDIT],
			'PERMISSION_MANAGE' => $permissions[Acl::PERMISSION_MANAGE],
			'PERMISSION_SHARE' => $permissions[Acl::PERMISSION_SHARE]
		]);
		$this->enrichWithUsers($board);
		return $board;
	}

	/**
	 * @return array
	 */
	private function getBoardPrerequisites() {
		$groups = $this->groupManager->getUserGroupIds(
			$this->userManager->get($this->userId)
		);
		return [
			'user' => $this->userId,
			'groups' => $groups
		];
	}

	/**
	 * @param $mapper
	 * @param $id
	 * @return bool
	 * @throws DoesNotExistException
	 * @throws \OCA\Deck\NoPermissionException
	 * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException
	 * @throws BadRequestException
	 */
	public function isArchived($mapper, $id) {

		if (is_numeric($id) === false)  {
			throw new BadRequestException('id must be a number');
		}

		try {
			$boardId = $id;
			if ($mapper instanceof IPermissionMapper) {
				$boardId = $mapper->findBoardId($id);
			}
			if ($boardId === null) {
				return false;
			}
		} catch (DoesNotExistException $exception) {
			return false;
		}
		$board = $this->find($boardId);
		return $board->getArchived();
	}

	/**
	 * @param $mapper
	 * @param $id
	 * @return bool
	 * @throws DoesNotExistException
	 * @throws \OCA\Deck\NoPermissionException
	 * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException
	 * @throws BadRequestException
	 */
	public function isDeleted($mapper, $id) {

		if ($mapper === false || $mapper === null) {
			throw new BadRequestException('mapper must be provided');
		}

		if (is_numeric($id) === false)  {
			throw new BadRequestException('id must be a number');
		}

		try {
			$boardId = $id;
			if ($mapper instanceof IPermissionMapper) {
				$boardId = $mapper->findBoardId($id);
			}
			if ($boardId === null) {
				return false;
			}
		} catch (DoesNotExistException $exception) {
			return false;
		}
		$board = $this->find($boardId);
		return $board->getDeletedAt() > 0;
	}


	/**
	 * @param $title
	 * @param $userId
	 * @param $color
	 * @return \OCP\AppFramework\Db\Entity
	 * @throws BadRequestException
	 */
	public function create($title, $userId, $color) {

		if ($title === false || $title === null) {
			throw new BadRequestException('title must be provided');
		}

		if ($userId === false || $userId === null) {
			throw new BadRequestException('userId must be provided');
		}

		if ($color === false || $color === null) {
			throw new BadRequestException('color must be provided');
		}

		if (!$this->permissionService->canCreate()) {
			throw new NoPermissionException('Creating boards has been disabled for your account.');
		}

		$board = new Board();
		$board->setTitle($title);
		$board->setOwner($userId);
		$board->setColor($color);
		$new_board = $this->boardMapper->insert($board);

		// create new labels
		$default_labels = [
			'31CC7C' => $this->l10n->t('Finished'),
			'317CCC' => $this->l10n->t('To review'),
			'FF7A66' => $this->l10n->t('Action needed'),
			'F1DB50' => $this->l10n->t('Later')
		];
		$labels = [];
		foreach ($default_labels as $labelColor => $labelTitle) {
			$label = new Label();
			$label->setColor($labelColor);
			$label->setTitle($labelTitle);
			$label->setBoardId($new_board->getId());
			$labels[] = $this->labelMapper->insert($label);
		}
		$new_board->setLabels($labels);
		$this->boardMapper->mapOwner($new_board);
		$permissions = $this->permissionService->matchPermissions($new_board);
		$new_board->setPermissions([
			'PERMISSION_READ' => $permissions[Acl::PERMISSION_READ],
			'PERMISSION_EDIT' => $permissions[Acl::PERMISSION_EDIT],
			'PERMISSION_MANAGE' => $permissions[Acl::PERMISSION_MANAGE],
			'PERMISSION_SHARE' => $permissions[Acl::PERMISSION_SHARE]
		]);
		$this->activityManager->triggerEvent(ActivityManager::DECK_OBJECT_BOARD, $new_board, ActivityManager::SUBJECT_BOARD_CREATE);
		$this->changeHelper->boardChanged($new_board->getId());

		$this->eventDispatcher->dispatch(
			'\OCA\Deck\Board::onCreate',
			new GenericEvent(
				null, ['id' => $new_board->getId(), 'userId' => $userId, 'board' => $new_board]
			)
		);

		return $new_board;
	}

	/**
	 * @param $id
	 * @return Board
	 * @throws DoesNotExistException
	 * @throws \OCA\Deck\NoPermissionException
	 * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException
	 * @throws BadRequestException
	 */
	public function delete($id) {

		if (is_numeric($id) === false) {
			throw new BadRequestException('board id must be a number');
		}

		$this->permissionService->checkPermission($this->boardMapper, $id, Acl::PERMISSION_READ);
		$board = $this->find($id);
		if ($board->getDeletedAt() > 0) {
			throw new BadRequestException('This board has already been deleted');
		}
		$board->setDeletedAt(time());
		$board = $this->boardMapper->update($board);
		$this->activityManager->triggerEvent(ActivityManager::DECK_OBJECT_BOARD, $board, ActivityManager::SUBJECT_BOARD_DELETE);
		$this->changeHelper->boardChanged($board->getId());

		$this->eventDispatcher->dispatch(
			'\OCA\Deck\Board::onDelete', new GenericEvent(null, ['id' => $id])
		);

		return $board;
	}

	/**
	 * @param $id
	 * @return \OCP\AppFramework\Db\Entity
	 * @throws DoesNotExistException
	 * @throws \OCA\Deck\NoPermissionException
	 * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException
	 */
	public function deleteUndo($id) {

		if (is_numeric($id) === false) {
			throw new BadRequestException('board id must be a number');
		}

		$this->permissionService->checkPermission($this->boardMapper, $id, Acl::PERMISSION_READ);
		$board = $this->find($id);
		$board->setDeletedAt(0);
		$board = $this->boardMapper->update($board);
		$this->activityManager->triggerEvent(ActivityManager::DECK_OBJECT_BOARD, $board, ActivityManager::SUBJECT_BOARD_RESTORE);
		$this->changeHelper->boardChanged($board->getId());

		$this->eventDispatcher->dispatch(
			'\OCA\Deck\Board::onUpdate', new GenericEvent(null, ['id' => $id, 'board' => $board])
		);

		return $board;
	}

	/**
	 * @param $id
	 * @return \OCP\AppFramework\Db\Entity
	 * @throws DoesNotExistException
	 * @throws \OCA\Deck\NoPermissionException
	 * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException
	 * @throws BadRequestException
	 */
	public function deleteForce($id) {
		if (is_numeric($id) === false)  {
			throw new BadRequestException('id must be a number');
		}

		$this->permissionService->checkPermission($this->boardMapper, $id, Acl::PERMISSION_READ);
		$board = $this->find($id);
		$delete = $this->boardMapper->delete($board);

		$this->eventDispatcher->dispatch(
			'\OCA\Deck\Board::onDelete', new GenericEvent(null, ['id' => $id])
		);

		return $delete;
	}

	/**
	 * @param $id
	 * @param $title
	 * @param $color
	 * @param $archived
	 * @return \OCP\AppFramework\Db\Entity
	 * @throws DoesNotExistException
	 * @throws \OCA\Deck\NoPermissionException
	 * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException
	 * @throws BadRequestException
	 */
	public function update($id, $title, $color, $archived) {

		if (is_numeric($id) === false) {
			throw new BadRequestException('board id must be a number');
		}

		if ($title === false || $title === null) {
			throw new BadRequestException('color must be provided');
		}

		if ($color === false || $color === null) {
			throw new BadRequestException('color must be provided');
		}

		if ( is_bool($archived) === false ) {
			throw new BadRequestException('archived must be a boolean');
		}

		$this->permissionService->checkPermission($this->boardMapper, $id, Acl::PERMISSION_MANAGE);
		$board = $this->find($id);
		$changes = new ChangeSet($board);
		$board->setTitle($title);
		$board->setColor($color);
		$board->setArchived($archived);
		$changes->setAfter($board);
		$this->boardMapper->update($board); // operate on clone so we can check for updated fields
		$this->boardMapper->mapOwner($board);
		$this->activityManager->triggerUpdateEvents(ActivityManager::DECK_OBJECT_BOARD, $changes, ActivityManager::SUBJECT_BOARD_UPDATE);
		$this->changeHelper->boardChanged($board->getId());

		$this->eventDispatcher->dispatch(
			'\OCA\Deck\Board::onUpdate', new GenericEvent(null, ['id' => $id, 'board' => $board])
		);

		return $board;
	}


	/**
	 * @param $boardId
	 * @param $type
	 * @param $participant
	 * @param $edit
	 * @param $share
	 * @param $manage
	 * @return \OCP\AppFramework\Db\Entity
	 * @throws BadRequestException
	 * @throws \OCA\Deck\NoPermissionException
	 */
	public function addAcl($boardId, $type, $participant, $edit, $share, $manage) {

		if (is_numeric($boardId) === false) {
			throw new BadRequestException('board id must be a number');
		}

		if ($type === false || $type === null) {
			throw new BadRequestException('type must be provided');
		}

		if ($participant === false || $participant === null) {
			throw new BadRequestException('participant must be provided');
		}

		if ($edit === null) {
			throw new BadRequestException('edit must be provided');
		}

		if ($share === null) {
			throw new BadRequestException('share must be provided');
		}

		if ($manage === null) {
			throw new BadRequestException('manage must be provided');
		}

		$this->permissionService->checkPermission($this->boardMapper, $boardId, Acl::PERMISSION_SHARE);
		$acl = new Acl();
		$acl->setBoardId($boardId);
		$acl->setType($type);
		$acl->setParticipant($participant);
		$acl->setPermissionEdit($edit);
		$acl->setPermissionShare($share);
		$acl->setPermissionManage($manage);

		/* Notify users about the shared board */
		$this->notificationHelper->sendBoardShared($boardId, $acl);

		$newAcl = $this->aclMapper->insert($acl);
		$this->activityManager->triggerEvent(ActivityManager::DECK_OBJECT_BOARD, $newAcl, ActivityManager::SUBJECT_BOARD_SHARE);
		$this->boardMapper->mapAcl($newAcl);
		$this->changeHelper->boardChanged($boardId);

		// TODO: use the dispatched event for this
		$version = \OC_Util::getVersion()[0];
		if ($version >= 16) {
			try {
				$resourceProvider = \OC::$server->query(\OCA\Deck\Collaboration\Resources\ResourceProvider::class);
				$resourceProvider->invalidateAccessCache($boardId);
			} catch (\Exception $e) {}
		}

		$this->eventDispatcher->dispatch(
			'\OCA\Deck\Board::onShareNew', new GenericEvent(null, ['id' => $newAcl->getId(), 'acl' => $newAcl, 'boardId' => $boardId])
		);

		return $newAcl;
	}

	/**
	 * @param $id
	 * @param $edit
	 * @param $share
	 * @param $manage
	 * @return \OCP\AppFramework\Db\Entity
	 * @throws DoesNotExistException
	 * @throws \OCA\Deck\NoPermissionException
	 * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException
	 * @throws BadRequestException
	 */
	public function updateAcl($id, $edit, $share, $manage) {

		if (is_numeric($id) === false) {
			throw new BadRequestException('id must be a number');
		}

		if ($edit === null) {
			throw new BadRequestException('edit must be provided');
		}

		if ($share === null) {
			throw new BadRequestException('share must be provided');
		}

		if ($manage === null) {
			throw new BadRequestException('manage must be provided');
		}

		$this->permissionService->checkPermission($this->aclMapper, $id, Acl::PERMISSION_SHARE);
		/** @var Acl $acl */
		$acl = $this->aclMapper->find($id);
		$acl->setPermissionEdit($edit);
		$acl->setPermissionShare($share);
		$acl->setPermissionManage($manage);
		$this->boardMapper->mapAcl($acl);
		$board = $this->aclMapper->update($acl);
		$this->changeHelper->boardChanged($acl->getBoardId());

		$this->eventDispatcher->dispatch(
			'\OCA\Deck\Board::onShareEdit', new GenericEvent(null, ['id' => $id, 'boardId' => $acl->getBoardId(), 'acl' => $acl])
		);

		return $board;
	}

	/**
	 * @param $id
	 * @return \OCP\AppFramework\Db\Entity
	 * @throws DoesNotExistException
	 * @throws \OCA\Deck\NoPermissionException
	 * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException
	 * @throws BadRequestException
	 */
	public function deleteAcl($id) {

		if (is_numeric($id) === false) {
			throw new BadRequestException('id must be a number');
		}

		$this->permissionService->checkPermission($this->aclMapper, $id, Acl::PERMISSION_SHARE);
		/** @var Acl $acl */
		$acl = $this->aclMapper->find($id);
		$this->boardMapper->mapAcl($acl);
		if ($acl->getType() === Acl::PERMISSION_TYPE_USER) {
			$assignements = $this->assignedUsersMapper->findByUserId($acl->getParticipant());
			foreach ($assignements as $assignement) {
				$this->assignedUsersMapper->delete($assignement);
			}
		}
		$this->activityManager->triggerEvent(ActivityManager::DECK_OBJECT_BOARD, $acl, ActivityManager::SUBJECT_BOARD_UNSHARE);
		$this->changeHelper->boardChanged($acl->getBoardId());

		$version = \OC_Util::getVersion()[0];
		if ($version >= 16) {
			try {
				$resourceProvider = \OC::$server->query(\OCA\Deck\Collaboration\Resources\ResourceProvider::class);
				$resourceProvider->invalidateAccessCache($acl->getBoardId());
			} catch (\Exception $e) {}
		}
		$delete = $this->aclMapper->delete($acl);

		$this->eventDispatcher->dispatch(
			'\OCA\Deck\Board::onShareDelete', new GenericEvent(null, ['id' => $id, 'boardId' => $acl->getBoardId(), 'acl' => $acl])
		);

		return $delete;
	}

	private function enrichWithStacks($board, $since = -1) {
		$stacks = $this->stackMapper->findAll($board->getId(), null, null, $since);

		if(\count($stacks) === 0) {
			return;
		}

		$board->setStacks($stacks);
	}

	private function enrichWithLabels($board, $since = -1) {
		$labels = $this->labelMapper->findAll($board->getId(), null, null, $since);

		if(\count($labels) === 0) {
			return;
		}

		$board->setLabels($labels);
	}

	private function enrichWithUsers($board, $since = -1) {
		$boardUsers = $this->permissionService->findUsers($board->getId());
		if(\count($boardUsers) === 0) {
			return;
		}
		$board->setUsers(array_values($boardUsers));
	}

}
