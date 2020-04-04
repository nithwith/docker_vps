# Changelog
All notable changes to this project will be documented in this file.


### 0.18.3

- fixing issue during migration.


### 0.18.0 (nc18)

- compat nc18
- circles as backend for contacts


### 0.17.10

- fixing issue with sqlite


### 0.17.9

- fixing issue during token generation
- token are now remove and not just disabled when remote user is kicked


### 0.17.8

- improvement when sharing a file to mail address: 
- each contact have his own link to the file, and password is generated if enforced.
- access to shared file is disable if the account is removed from the circle.
- when adding a contact to a circle with already existing shares, a list of the shares is sent by mail  


### 0.17.7

- lighter requests on request on Shares
- new settings to allow moderator to add member to closed circle without invitation step
- new icons


### 0.17.5

- bugfix


### 0.17.4

- prevent user enumeration
- apply limit to linked group


### 0.17.3

- fixing an issue on the front-end with linked groups


### 0.17.2

- more logging
- add multiple mails address.


### 0.17.1

- more APIs.
- Allow disable of Activity on Circle creation.
- fixing some div overlay.


### 0.17.0 (NC16)

- some new APIs.


## 0.13.4

- bugfixes.


## 0.13.0

- Feature: Circles Async is now available on every shares rendering the UX a lot smoother.
- Feature: The stability of Circles Async is testable from the Admin Interface.
- Feature: mail address can be added as a member of a Circle.
- Feature: contact can be added as a member of a Circle.
- Feature: When sharing a file to a Circle, all non-local member (Mail address or Contact) will receive a link to the shared files by mail. 
- Feature: the older Admin of a Circle becomes Owner if current Owner's account deleted. If the Circle has no Admin, the Circle is deleted.
- api: Circles::getSharesFromCircle()/ShotgunCircles::getSharesFromCircle() returns SharingFrame[]
- Fix: Unexpected behaviour when an the account of a circle owner is removed from the cloud
- Code: Automatic DI
- Code: Compatibility NC13 collaboration search
- New Command: ./occ circles:clean
- API: The app will dispatch some events (by Vinicius Cubas Brand <viniciuscb@gmail.com>)


		\OCA\Circles::onCircleCreation
		\OCA\Circles::onCircleDestruction
		\OCA\Circles::onMemberNew
		\OCA\Circles::onMemberInvited
		\OCA\Circles::onMemberRequesting
		\OCA\Circles::onMemberLeaving
		\OCA\Circles::onMemberLevel
		\OCA\Circles::onMemberOwner
		\OCA\Circles::onGroupLink
		\OCA\Circles::onGroupUnlink
		\OCA\Circles::onGroupLevel
		\OCA\Circles::onLinkRequestSent
		\OCA\Circles::onLinkRequestReceived
		\OCA\Circles::onLinkRequestRejected
		\OCA\Circles::onLinkRequestCanceled
		\OCA\Circles::onLinkRequestAccepted
		\OCA\Circles::onLinkRequestAccepting
		\OCA\Circles::onLinkUp
		\OCA\Circles::onLinkDown
		\OCA\Circles::onLinkRemove
		\OCA\Circles::onSettingsChange


## 0.12.4

- Fixing a migration bug.
- Add Type to members.


## 0.12.0

- Security: SQL incremented ID is not used anymore; Every request on a Circle will require a 14 chars version of its Unique ID. (API v0.10.0).
- Security: When leaving a circle, shared files are not accessible by said circle anymore.
- Bug: Fix icons.
- Bug: Fix strange behaviour when the app is deleted from disk, but not disabled in the cloud.
- Code design: Getting rid of Mapper/Entity and using pure QueryBuilder.
- Feature: Edit Name and Description of a circle.
- Feature: Activities are now sent by email.
- Feature: Mass invite group members to a circle.
- Feature: Link groups to circle and assign level to linked group.
- UI: fixing some glitches. 
- Global: Private circle are now named Closed circle.
- Global: Hidden circle are now named Secret circle.


## 0.11.0

- Federated circles
- Integration with activity
- New UI
- Bugfixes


## 0.10.0

- Introduction to linked circles (federated-circles)
- Bugfixes to a few SQL requests (pgsql)
- Improvement of some SQL requests
- Compatability with PHP 5.6


## 0.9.6

- Shares: Take Nodes into account.
- API: Returns circle name.
- Misc: Removal of memberships when user is deleted.
- Misc: Bugfixes.
- Misc: All texts reviewed. 


## 0.9.5

- Small database rework
- UI bug fixed.
- API: Creation of new share items
- API: Listing members of a circle


## 0.9.4

- Fixed an SQL error (#51)
- Adding a way to destroy a circle (#50)


## 0.9.3

### Added

- Initial release to Nextcloud appstore
