<div id="board-status" ng-if="statusservice.active">
    <div id="emptycontent">
        <div class="icon-{{ statusservice.icon }}"></div>
        <h2>{{ statusservice.title }}</h2>
        <p>{{ statusservice.text }}</p></div>
</div>
<div id="sidebar-header">
    <a class="icon-close" ui-sref="board" ng-click="sidebar.show=!sidebar.show" title="<?php p($l->t('Close')); ?>"> &nbsp;<?php
		?><span class="hidden-visually"><?php p($l->t('Close')); ?></span><?php
	?></a>
    <h3>{{ boardservice.getCurrent().title }}</h3>
</div>

<ul class="tabHeaders">
    <li class="tabHeader" ng-class="{'selected': (params.tab==0 || !params.tab)}" ui-sref="{tab: 0}"><a><?php p($l->t('Sharing')); ?></a></li>
    <li class="tabHeader" ng-class="{'selected': (params.tab==1)}" ui-sref="{tab: 1}"><a><?php p($l->t('Tags')); ?></a></li>
    <li class="tabHeader" ng-class="{'selected': (params.tab==2)}" ui-sref="{tab: 2}"><a><?php p($l->t('Deleted items')); ?></a></li>
	<li class="tabHeader" ng-class="{'selected': (params.tab==4)}" ui-sref="{tab: 4}" ng-if="isTimelineEnabled()"><a><?php p($l->t('Timeline')); ?></a></li>

</ul>
<div class="tabsContainer">
    <div id="tabBoardShare" class="tab" ng-if="params.tab==0 || !params.tab">
        <ui-select ng-if="boardservice.canShare()" ng-model="status.addSharee" theme="select2"
				   title="<?php p($l->t('Select users or groups to share with')); ?>"
				   placeholder="<?php p($l->t('Select users or groups to share with')); ?>"
				   on-select="aclAdd(status.addSharee)" search-enabled="true">
            <ui-select-match placeholder="<?php p($l->t('Select users or groups to share with')); ?>">
                <span><i class="icon icon-{{aclTypeString($item)}}"></i> {{ $item.participant.displayname }}</span>
            </ui-select-match>
            <ui-select-choices refresh="searchForUser($select.search)" refresh-delay="0" repeat="sharee in boardservice.sharees">
				<div class="avatardiv" avatar data-user="{{ sharee.participant.uid }}" data-displayname="{{ sharee.participant.displayname }}" ng-if="sharee.type==OC.Share.SHARE_TYPE_USER"></div>
				<div class="avatardiv" ng-if="sharee.type==OC.Share.SHARE_TYPE_GROUP"><i class="icon icon-{{aclTypeString(sharee)}}" ></i></div>
				<span class="has-tooltip username" ng-if="sharee.type==OC.Share.SHARE_TYPE_GROUP">
					{{ sharee.participant.displayname }} (<?php p($l->t('Group')); ?>)
				</span>
				<div class="avatardiv circles" ng-if="sharee.type==OC.Share.SHARE_TYPE_CIRCLE"><i class="icon icon-circles icon-white"></i></div>
				<span class="has-tooltip username" ng-if="sharee.type==OC.Share.SHARE_TYPE_CIRCLE">
					{{ sharee.participant.displayname }} (<?php p($l->t('Circle')); ?>)
				</span>
                <span class="has-tooltip username" ng-if="sharee.type==OC.Share.SHARE_TYPE_USER">
					{{ sharee.participant.displayname }}
				</span>
            </ui-select-choices>
            <ui-select-no-choice>
            <?php p($l->t('No matching user or group found.')); ?>
            </ui-select-no-choice>
        </ui-select>

        <ul id="shareWithList" class="shareWithList">
            <li>
                <span class="icon-loading-small" style="display:none;"></span>
				<div class="avatardiv" avatar data-user="{{ boardservice.getCurrent().owner.uid }}" data-displayname="{{ boardservice.getCurrent().owner.displayname }}" ng-if="boardservice.id"></div>
                <span class="has-tooltip username">
                    {{ boardservice.getCurrent().owner.displayname }}
				</span>
            </li>
            <li ng-repeat="acl in boardservice.getCurrent().acl track by acl.participant.primaryKey">
                <span class="icon-loading-small" style="display:none;" title="<?php p($l->t('Loading')); ?>"></span>
                <div class="avatardiv" avatar data-contactsmenu="true" data-user="{{ acl.participant.uid }}" data-displayname="{{ acl.participant.displayname }}" ng-if="acl.type==OC.Share.SHARE_TYPE_USER"></div>
                <div class="avatardiv" ng-if="acl.type!=OC.Share.SHARE_TYPE_USER"><i class="icon icon-{{aclTypeString(acl)}}" ></i></div>

				<span class="has-tooltip username" ng-if="acl.type==OC.Share.SHARE_TYPE_USER">
                    {{ acl.participant.displayname }}
				</span>
                <span class="has-tooltip username" ng-if="acl.type==OC.Share.SHARE_TYPE_GROUP">
                    {{ acl.participant.displayname }} (<?php p($l->t('Group')); ?>)
				</span>
				<span class="has-tooltip username" ng-if="acl.type==OC.Share.SHARE_TYPE_CIRCLE">
                    {{ acl.participant.displayname }} (<?php p($l->t('Circle')); ?> {{ acl.participant.typeString }})
					<div>{{ acl.participant.circleOwner.display_name }}</div>
				</span>

				<span class="sharingOptionsGroup">
                <span class="shareOption"ng-if="boardservice.canManage()">
                    <input type="checkbox" class="permissions checkbox" id="checkbox-permission-{{ acl.id }}-edit" ng-model="acl.permissionEdit" ng-change="aclUpdate(acl)" />
                    <label for="checkbox-permission-{{ acl.id }}-edit"><?php p($l->t('Edit')); ?></label>
                </span>
				<span class="shareOption" ng-if="boardservice.canManage()">
                    <input type="checkbox" class="permissions checkbox" id="checkbox-permission-{{ acl.id }}-share" ng-model="acl.permissionShare" ng-change="aclUpdate(acl)" />
                    <label for="checkbox-permission-{{ acl.id }}-share"><?php p($l->t('Share')); ?></label>
                </span>
                <span class="shareOption"ng-if="boardservice.canManage()">
                    <input type="checkbox" class="permissions checkbox" id="checkbox-permission-{{ acl.id }}-manage" ng-model="acl.permissionManage" ng-change="aclUpdate(acl)" />
                    <label for="checkbox-permission-{{ acl.id }}-manage"><?php p($l->t('Manage')); ?></label>
                </span>
				</span>
                <a ng-if="boardservice.canManage()" ng-click="aclDelete(acl)"><span class="icon-loading-small hidden"></span><span class="icon icon-delete"></span><span class="hidden-visually"><?php p($l->t('Discard share')); ?></span></a>
            </li>
			<li ng-if="!boardservice.canShare()">
				<?php p($l->t('Sharing has been disabled for your account.')); ?>
			</li>
        </ul>
		<div id="collaborationResources"></div>

    </div>
    <div id="board-detail-labels" class="tab commentsTabView" ng-if="params.tab==1">

            <ul class="labels">
                <li ng-repeat="label in boardservice.getCurrent().labels">
                    <span class="label-title" ng-style="{'background-color':'#{{label.color}}','color':'{{ label.color|textColorFilter }}'}" ng-if="!label.edit">
                        <span ng-if="label.title">{{ label.title }}</span><i ng-if="!label.title"><br /></i>
                    </span>
                    <div class="label-edit" ng-if="label.edit">
                        <div ng-style="{'background-color':'#{{label.color}}','color':'{{ textColor(label.color) }}','width':'100%'}">
                            <form ng-submit="labelUpdate(label)">
                                <input type="text" ng-model="label.title" class="input-inline" ng-style="{'background-color':'#{{label.color}}','color':'{{ label.color|textColorFilter }}'}" autofocus-on-insert maxlength="100"/>
                            </form>
                        </div>
                        <div class="colorselect" ng-controller="ColorPickerController">
                            <div class="color" ng-repeat="c in defaultColors" ng-style="{'background-color':'#{{ c }}'}" ng-click="label=setColor(label,c);" ng-class="{'selected': (c == label.color) }"><br /></div>
                            <label class="colorselect-label{{ label.color | iconWhiteFilter }} color" ng-style="getCustomBackground(label.hashedColor)" ng-init="label.hashedColor='#' + label.color">
                                <input class="color" type="color" ng-model="label.hashedColor" value="#{{label.color}}" ng-change="label=setHashedColor(label)"/>
                            </label>
                        </div>
                    </div>
                    <a ng-if="boardservice.canManage() && label.edit" ng-click="labelUpdate(label)" class="icon" title="<?php p($l->t('Update tag')); ?>"><i class="icon icon-checkmark" ></i><span class="hidden-visually"><?php p($l->t('Update tag')); ?></span></a>
                    <a ng-if="boardservice.canManage() && !label.edit" ng-click="labelUpdateBefore(label); label.edit=true" class="icon" title="<?php p($l->t('Edit tag')); ?>"><i class="icon icon-rename"></i><span class="hidden-visually"><?php p($l->t('Edit tag')); ?></span></a>
                    <a ng-if="boardservice.canManage()" ng-click="labelDelete(label)" class="icon" title="<?php p($l->t('Delete tag')); ?>"><i class="icon icon-delete" ></i><span class="hidden-visually"><?php p($l->t('Delete tag')); ?></span></a>
                </li>
                <li ng-if="status.createLabel">
                    <div class="label-edit">
                        <div ng-style="{'background-color':'#{{newLabel.color}}','color':'{{ textColor(newLabel.color) }}','width':'100%'}">
                            <form ng-submit="labelCreate(newLabel)">
                                <input type="text" class="input-inline" ng-model="newLabel.title" ng-style="{'color':'{{ newLabel.color|textColorFilter }}'};" autofocus-on-insert maxlength="100" />
                            </form>
                        </div>
                        <div class="colorselect" ng-controller="ColorPickerController">
                            <div class="color" ng-repeat="c in defaultColors" ng-style="{'background-color':'#{{ c }}'}" ng-click="newLabel=setColor(newLabel,c)" ng-class="{'selected': (c == newLabel.color), 'dark': (newBoard.color | textColorFilter) === '#ffffff' }"><br /></div>
                            <label class="colorselect-label{{ newLabel.color | iconWhiteFilter }} color" ng-style="getCustomBackground(newLabel.hashedColor)" ng-init="newLabel.hashedColor='#' + newLabel.color">
                                <input class="color" type="color" ng-model="newLabel.hashedColor" value="#{{newLabel.color}}" ng-change="newLabel=setHashedColor(newLabel)"/>
                            </label>
                        </div>
                    </div>
                    <a ng-click="labelCreate(newLabel)" class="icon" title="<?php p($l->t('Create')); ?>"><i class="icon icon-checkmark" ></i><span class="hidden-visually"><?php p($l->t('Create')); ?></span></a>
                    <a ng-click="status.createLabel=false" class="icon" title="<?php p($l->t('Close')); ?>"><i class="icon icon-close" ></i><span class="hidden-visually"><?php p($l->t('Close')); ?></span></a>
                </li>
                <li ng-if="boardservice.canManage() && !status.createLabel" class="label-create">
                    <a ng-click="status.createLabel=true" class="button"><span class="icon icon-add"></span><br /><span><?php p($l->t('Create a new tag')); ?></span></a>
                </li>
            </ul>

    </div>

	<div id="board-detail-deleted-stacks" class="tab deletedStacksTabView" ng-if="params.tab==2">
		<h3><?php p($l->t('Deleted stacks')); ?></h3>
		<ul class='board-detail__deleted-list'>
			<li class='board-detail__deleted-list__item' ng-repeat="deletedStack in stackservice.deleted">
				<span class="icon icon-deck"></span>
				<span class="title">{{deletedStack.title}}</span>
				<span class="live-relative-timestamp" data-timestamp="{{ deletedStack.deletedAt*1000  }}">{{deletedStack.deletedAt | relativeDateFilter }}</span>
				<a ng-click="stackUndoDelete(deletedStack)"><span class="icon icon-history"></span></a>
			</li>
		</ul>

		<h3><?php p($l->t('Deleted cards')); ?></h3>

		<ul class='board-detail__deleted-list'>
			<li class='board-detail__deleted-list__item' ng-repeat="deletedCard in cardservice.deleted">
				<span class="icon icon-deck"></span>
				<span class="title">{{deletedCard.title}} ({{stackservice.tryAllThenDeleted(deletedCard.stackId).title}})</span>
				<span class="live-relative-timestamp" data-timestamp="{{ deletedCard.deletedAt*1000  }}">{{deletedCard.deletedAt | relativeDateFilter }}</span>
				<a ng-click="cardOrCardAndStackUndoDelete(deletedCard)">
					<span class="icon icon-history"></span>
				</a>
			</li>
		</ul>
	</div>

	<div id="board-detail-activity" class="tab activityTabView" ng-if="isTimelineEnabled() && params.tab==4">
		<activity-component ng-if="boardservice.getCurrent()" type="deck_board" element="boardservice.getCurrent()"></activity-component>
	</div>


</div>
