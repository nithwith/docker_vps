<?php
/**
 * Circles - Bring cloud-users closer together.
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Maxence Lange <maxence@pontapreta.net>
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

namespace OCA\Circles\Migration;

use OC\Share\Share;
use OCA\Circles\Db\CoreRequestBuilder;
use OCA\Circles\Model\Circle;
use OCP\IConfig;
use OCP\IDBConnection;
use OCP\Migration\IOutput;
use OCP\Migration\IRepairStep;

/**
 * Class UsingShortenUniqueIdInsteadOfCircleId
 *
 * @package OCA\Circles\Migration
 */
class UsingShortenUniqueIdInsteadOfCircleId implements IRepairStep {

	/** @var IDBConnection */
	protected $connection;

	/** @var  IConfig */
	protected $config;

	public function __construct(IDBConnection $connection, IConfig $config) {
		$this->connection = $connection;
		$this->config = $config;
	}

	/**
	 * Returns the step's name
	 *
	 * @return string
	 * @since 9.1.0
	 */
	public function getName() {
		return 'Using shorten unique id instead of circle id';
	}

	/**
	 * @param IOutput $output
	 */
	public function run(IOutput $output) {
		$oldVersion = explode(
			'.', \OC::$server->getConfig()
							 ->getAppValue('circles', 'installed_version', '')
		);

		if ((int)$oldVersion[0] === 0
			&& (int)$oldVersion[1] < 13) {
			$this->swapToShortenUniqueId();
		}
	}


	private function swapToShortenUniqueId() {

		$qb = $this->connection->getQueryBuilder();

		/** @noinspection PhpMethodParametersCountMismatchInspection */
		$qb->select('id', 'unique_id')
		   ->from(CoreRequestBuilder::TABLE_CIRCLES);

		$cursor = $qb->execute();
		while ($data = $cursor->fetch()) {
			$circleId = $data['id'];
			$shortenUniqueId = substr($data['unique_id'], 0, 14);

			$this->swapToShortenUniqueIdInTable(
				$circleId, $shortenUniqueId, 'circles_groups'
			);
			$this->swapToShortenUniqueIdInTable(
				$circleId, $shortenUniqueId, 'circles_links'
			);

//			$this->cleanBuggyDuplicateEntries(
//				$circleId, $shortenUniqueId, CoreRequestBuilder::TABLE_MEMBERS, 'user_id'
//			);
			$this->swapToShortenUniqueIdInTable(
				$circleId, $shortenUniqueId, 'circles_members'
			);

			$this->swapToShortenUniqueIdInTable(
				$circleId, $shortenUniqueId, 'circles_links'
			);
			$this->swapToShortenUniqueIdInShares($circleId, $shortenUniqueId);
		}
		$cursor->closeCursor();
	}


	private function swapToShortenUniqueIdInTable($circleId, $shortenUniqueId, $table) {

		$qb = $this->connection->getQueryBuilder();
		$qb->update($table)
		   ->where(
			   $qb->expr()
				  ->eq('circle_id', $qb->createNamedParameter($circleId))
		   );

		$qb->set('circle_id', $qb->createNamedParameter($shortenUniqueId));
		$qb->execute();
	}


	private function swapToShortenUniqueIdInShares($circleId, $shortenUniqueId) {
		$qb = $this->connection->getQueryBuilder();
		$expr = $qb->expr();

		/** @noinspection PhpMethodParametersCountMismatchInspection */
		$qb->update('share')
		   ->where(
			   $expr->andX(
				   $expr->eq(
					   'share_type', $qb->createNamedParameter(7)
				   ),
				   $expr->eq('share_with', $qb->createNamedParameter($circleId))
			   )
		   );

		$qb->set('share_with', $qb->createNamedParameter($shortenUniqueId));
		$qb->execute();
	}


//	private function cleanBuggyDuplicateEntries($circleId, $shortenUniqueId, $table, $field) {
//
//		$qb = $this->connection->getQueryBuilder();
//		$expr = $qb->expr();
//
//		$qb->select($field)
//		   ->from($table)
//		   ->where(
//			   $expr->eq('circle_id', $qb->createNamedParameter($circleId))
//		   );
//
//		$cursor = $qb->execute();
//		while ($data = $cursor->fetch()) {
//			$val = $data[$field];
//			if ($val !== '') {
//				$qb2 = $this->connection->getQueryBuilder();
//				$expr2 = $qb2->expr();
//				/** @noinspection PhpMethodParametersCountMismatchInspection */
//				$qb2->delete($table)
//					->where(
//						$expr2->andX(
//							$expr2->eq('circle_id', $qb2->createNamedParameter($shortenUniqueId)),
//							$expr2->eq($field, $qb2->createNamedParameter($val))
//						)
//					);
//				$qb2->execute();
//			}
//		}
//		$cursor->closeCursor();
//	}

}


