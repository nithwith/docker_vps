<?php
/**
 * @copyright Copyright (c) 2018 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Deck\Controller;

use OCA\Deck\Service\DefaultBoardService;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http\NotFoundResponse;
use OCP\IConfig;
use OCP\IGroup;
use OCP\IGroupManager;
use OCP\IRequest;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\Controller;
use OCP\IL10N;

class ConfigController extends Controller {

	private $config;
	private $userId;
	private $groupManager;

	public function __construct(
		$AppName,
		IRequest $request,
		IConfig $config,
		IGroupManager $groupManager,
		$userId
		) {
		parent::__construct($AppName, $request);

		$this->userId = $userId;
		$this->groupManager = $groupManager;
		$this->config = $config;
	}

	/**
	 * @NoCSRFRequired
	 */
	public function get() {
		$data = [
			'groupLimit' => $this->getGroupLimit(),
		];
		return new DataResponse($data);
	}

	/**
	 * @NoCSRFRequired
	 */
	public function setValue($key, $value) {
		switch ($key) {
			case 'groupLimit':
				$result = $this->setGroupLimit($value);
				break;
		}
		if ($result === null) {
			return new NotFoundResponse();
		}
		return new DataResponse($result);
	}

	private function setGroupLimit($value) {
		$groups = [];
		foreach ($value as $group) {
			$groups[] = $group['id'];
		}
		$data = implode(',', $groups);
		$this->config->setAppValue($this->appName, 'groupLimit', $data);
		return $groups;
	}

	private function getGroupLimitList() {
		$value = $this->config->getAppValue($this->appName, 'groupLimit', '');
		$groups = explode(',', $value);
		if ($value === '') {
			return [];
		}
		return $groups;
	}

	private function getGroupLimit() {
		$groups = $this->getGroupLimitList();
		$groups = array_map(function($groupId) {
			/** @var IGroup $groups */
			$group = $this->groupManager->get($groupId);
			if ($group === null) {
				return null;
			}
			return [
				'id' => $group->getGID(),
				'displayname' => $group->getDisplayName(),
			];
		}, $groups);
		return array_filter($groups);
	}

}
