<?php
/**
 * Circles - Bring cloud-users closer together.
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Maxence Lange <maxence@pontapreta.net>
 * @author Vinicius Cubas Brand <vinicius@eita.org.br>
 * @author Daniel Tygel <dtygel@eita.org.br>
 *
 * @copyright 2017
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
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Circles\AppInfo;

use OC;
use OCA\Circles\Api\v1\Circles;
use OCA\Circles\Service\ConfigService;
use OCA\Circles\Service\DavService;
use OCA\Files\App as FilesApp;
use OCP\App\ManagerEvent;
use OCP\AppFramework\App;
use OCP\AppFramework\IAppContainer;
use OCP\AppFramework\QueryException;
use OCP\Util;

require_once __DIR__ . '/../../appinfo/autoload.php';


class Application extends App {

	const APP_NAME = 'circles';

	const REMOTE_URL_PAYLOAD = '/index.php/apps/circles/v1/payload';
	const TEST_URL_ASYNC = '/index.php/apps/circles/admin/testAsync';

	const CLIENT_TIMEOUT = 3;

	/** @var IAppContainer */
	private $container;

	/**
	 * @param array $params
	 */
	public function __construct(array $params = array()) {
		parent::__construct(self::APP_NAME, $params);

		$this->container = $this->getContainer();

		$this->registerHooks();
		$this->registerDavHooks();
	}


	/**
	 * Register Hooks
	 */
	public function registerHooks() {
		Util::connectHook(
			'OC_User', 'post_deleteUser', '\OCA\Circles\Hooks\UserHooks', 'onUserDeleted'
		);
		Util::connectHook(
			'OC_User', 'post_deleteGroup', '\OCA\Circles\Hooks\UserHooks', 'onGroupDeleted'
		);
	}


	/**
	 * Register Navigation elements
	 */
	public function registerNavigation() {
		/** @var ConfigService $configService */
		try {
			$configService = OC::$server->query(ConfigService::class);
		} catch (QueryException $e) {
			return;
		}

		if (!$configService->stillFrontEnd()) {
			return;
		}

		$appManager = $this->container->getServer()
									  ->getNavigationManager();
		$appManager->add(
			function() {
				$urlGen = OC::$server->getURLGenerator();
				$navName = OC::$server->getL10N(self::APP_NAME)
									  ->t('Circles');

				return [
					'id'    => self::APP_NAME,
					'order' => 5,
					'href'  => $urlGen->linkToRoute('circles.Navigation.navigate'),
					'icon'  => $urlGen->imagePath(self::APP_NAME, 'circles.svg'),
					'name'  => $navName
				];
			}
		);

	}

	public function registerFilesPlugin() {
		$eventDispatcher = OC::$server->getEventDispatcher();
		$eventDispatcher->addListener(
			'OCA\Files::loadAdditionalScripts',
			function() {
				Circles::addJavascriptAPI();

				Util::addScript('circles', 'files/circles.files.app');
				Util::addScript('circles', 'files/circles.files.list');

				Util::addStyle('circles', 'files/circles.filelist');
			}
		);
	}


	/**
	 *
	 */
	public function registerFilesNavigation() {
		$appManager = FilesApp::getNavigationManager();
		$appManager->add(
			function() {
				$l = OC::$server->getL10N('circles');

				return [
					'id'      => 'circlesfilter',
					'appname' => 'circles',
					'script'  => 'files/list.php',
					'order'   => 25,
					'name'    => $l->t('Shared to Circles'),
				];
			}
		);
	}


	public function registerDavHooks() {
		try {
			/** @var ConfigService $configService */
			$configService = OC::$server->query(ConfigService::class);
			if (!$configService->isContactsBackend()) {
				return;
			}

			/** @var DavService $davService */
			$davService = OC::$server->query(DavService::class);
		} catch (QueryException $e) {
			return;
		}

		$event = OC::$server->getEventDispatcher();

		$event->addListener(ManagerEvent::EVENT_APP_ENABLE, [$davService, 'onAppEnabled']);
		$event->addListener('\OCA\DAV\CardDAV\CardDavBackend::createCard', [$davService, 'onCreateCard']);
		$event->addListener('\OCA\DAV\CardDAV\CardDavBackend::updateCard', [$davService, 'onUpdateCard']);
		$event->addListener('\OCA\DAV\CardDAV\CardDavBackend::deleteCard', [$davService, 'onDeleteCard']);
	}

}

