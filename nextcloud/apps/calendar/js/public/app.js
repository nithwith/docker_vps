(function(angular, $, oc_requesttoken, undefined){
	'use strict';



var app = angular.module('Calendar', ['ui.bootstrap']);
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };


app.config(['$provide', '$httpProvider', function ($provide, $httpProvider) {
	'use strict';

	$httpProvider.defaults.headers.common.requesttoken = oc_requesttoken;

	ICAL.design.defaultSet.param['x-oc-group-id'] = {
		allowXName: true
	};

	angular.forEach($.fullCalendar.locales, function (obj, locale) {
		$.fullCalendar.locale(locale, {
			timeFormat: obj.mediumTimeFormat
		});

		var propsToCheck = ['extraSmallTimeFormat', 'hourFormat', 'mediumTimeFormat', 'noMeridiemTimeFormat', 'smallTimeFormat'];

		angular.forEach(propsToCheck, function (propToCheck) {
			if (obj[propToCheck]) {
				var overwrite = {};
				overwrite[propToCheck] = obj[propToCheck].replace('HH', 'H');

				$.fullCalendar.locale(locale, overwrite);
			}
		});
	});

	var isFirstRun = angular.element('#fullcalendar').attr('data-firstRun') === 'yes';
	$provide.constant('isFirstRun', isFirstRun);

	var isPublic = angular.element('#fullcalendar').attr('data-isPublic') === '1';
	$provide.constant('isPublic', isPublic);

	var isEmbedded = angular.element('#fullcalendar').attr('data-isEmbedded') === '1';
	$provide.constant('isEmbedded', isEmbedded);

	var isSharingAPI = _typeof(OC.Share) === 'object';
	$provide.constant('isSharingAPI', isSharingAPI);

	var skipPopover = angular.element('#fullcalendar').attr('data-skipPopover') === 'yes';
	var showWeekNr = angular.element('#fullcalendar').attr('data-weekNumbers') === 'yes';
	var timezone = angular.element('#fullcalendar').attr('data-timezone');
	$provide.constant('settings', { skipPopover: skipPopover, showWeekNr: showWeekNr, timezone: timezone });

	var initialView = angular.element('#fullcalendar').attr('data-initialView');
	var emailAddress = angular.element('#fullcalendar').attr('data-emailAddress');
	var fallbackColor = angular.element('#fullcalendar').attr('data-defaultColor');
	var version = angular.element('#fullcalendar').attr('data-appVersion');
	var publicSharingToken = angular.element('#fullcalendar').attr('data-publicSharingToken');
	var shareeCanEditShares = angular.element('#fullcalendar').attr('data-shareeCanEditShares') === 'yes';
	var shareeCanEditCalendarProperties = angular.element('#fullcalendar').attr('data-shareeCanEditCalendarProperties') === 'yes';
	var canSharePublicLink = angular.element('#fullcalendar').attr('data-canSharePublicLink') === 'yes';
	$provide.constant('constants', {
		initialView: initialView,
		emailAddress: emailAddress,
		fallbackColor: fallbackColor,
		version: version,
		publicSharingToken: publicSharingToken,
		shareeCanEditShares: shareeCanEditShares,
		shareeCanEditCalendarProperties: shareeCanEditCalendarProperties,
		canSharePublicLink: canSharePublicLink,
		SHARE_TYPE_USER: 0,
		SHARE_TYPE_GROUP: 1,
		SHARE_TYPE_CIRCLE: 7
	});
}]);
'use strict';


app.run(['$document', '$rootScope', '$window', 'isPublic', function ($document, $rootScope, $window, isPublic) {
  'use strict';

  var origin = $window.location.origin;
  $rootScope.root = origin + OC.linkTo('calendar', 'index.php') + '/';
  $rootScope.baseUrl = $rootScope.root + 'v1/';

  try {
    if (!isPublic) {
      var webcalHandler = $rootScope.root + '#subscribe_to_webcal?url=%s';
      navigator.registerProtocolHandler('webcal', webcalHandler, 'Nextcloud calendar');
    }
  } catch (e) {
    console.log(e);
  }

  $document.click(function (event) {
    $rootScope.$broadcast('documentClicked', event);
  });
}]);
'use strict';


app.controller('AttendeeController', ["$scope", "AutoCompletionService", function ($scope, AutoCompletionService) {
	'use strict';

	$scope.newAttendeeGroup = -1;
	$scope.nameofattendee = '';

	$scope.cutstats = [{ displayname: t('calendar', 'Individual'), val: 'INDIVIDUAL' }, { displayname: t('calendar', 'Group'), val: 'GROUP' }, { displayname: t('calendar', 'Resource'), val: 'RESOURCE' }, { displayname: t('calendar', 'Room'), val: 'ROOM' }, { displayname: t('calendar', 'Unknown'), val: 'UNKNOWN' }];

	$scope.partstats = [{ displayname: t('calendar', 'Required'), val: 'REQ-PARTICIPANT' }, { displayname: t('calendar', 'Optional'), val: 'OPT-PARTICIPANT' }, { displayname: t('calendar', 'Does not attend'), val: 'NON-PARTICIPANT' }];

	$scope.$parent.registerPostHook(function () {
		$scope.properties.attendee = $scope.properties.attendee || [];
		if ($scope.properties.attendee.length > 0 && $scope.properties.organizer === null) {
			$scope.properties.organizer = {
				value: 'mailto:' + $scope.$parent.emailAddress,
				parameters: {
					cn: OC.getCurrentUser().displayName
				}
			};
		}
	});

	$scope.add = function (email) {
		if (email !== '') {
			$scope.properties.attendee = $scope.properties.attendee || [];
			$scope.properties.attendee.push({
				value: 'mailto:' + email,
				group: $scope.newAttendeeGroup--,
				parameters: {
					'role': 'REQ-PARTICIPANT',
					'rsvp': 'TRUE',
					'partstat': 'NEEDS-ACTION',
					'cutype': 'INDIVIDUAL'
				}
			});
		}
		$scope.attendeeoptions = false;
		$scope.nameofattendee = '';
	};

	$scope.$on('save-contents', function () {
		$scope.add($scope.nameofattendee);
	});

	$scope.remove = function (attendee) {
		$scope.properties.attendee = $scope.properties.attendee.filter(function (elem) {
			return elem.group !== attendee.group;
		});
	};

	$scope.search = function (value) {
		return AutoCompletionService.searchAttendee(value).then(function (attendees) {
			var arr = [];

			attendees.forEach(function (attendee) {
				var emailCount = attendee.email.length;
				attendee.email.forEach(function (email) {
					var displayname = void 0;
					if (emailCount === 1) {
						displayname = _.escape(attendee.name);
					} else {
						displayname = t('calendar', '{name} ({email})', {
							name: attendee.name,
							email: email
						});
					}

					arr.push({
						displayname: displayname,
						email: email,
						name: attendee.name
					});
				});
			});

			return arr;
		});
	};

	$scope.selectFromTypeahead = function (item) {
		$scope.properties.attendee = $scope.properties.attendee || [];
		$scope.properties.attendee.push({
			value: 'mailto:' + item.email,
			parameters: {
				cn: item.name,
				role: 'REQ-PARTICIPANT',
				rsvp: 'TRUE',
				partstat: 'NEEDS-ACTION',
				cutype: 'INDIVIDUAL'
			}
		});
		$scope.nameofattendee = '';
	};
}]);
'use strict';



app.controller('CalController', ['$scope', 'Calendar', 'CalendarService', 'VEventService', 'SettingsService', 'TimezoneService', 'VEvent', 'is', 'fc', 'EventsEditorDialogService', 'PopoverPositioningUtility', '$window', 'isPublic', 'constants', 'settings', function ($scope, Calendar, CalendarService, VEventService, SettingsService, TimezoneService, VEvent, is, fc, EventsEditorDialogService, PopoverPositioningUtility, $window, isPublic, constants, settings) {
	'use strict';

	is.loading = true;

	$scope.calendars = [];
	$scope.eventSource = {};
	$scope.eventModal = null;
	var switcher = [];

	if (settings.timezone === 'automatic') {
		$scope.defaulttimezone = TimezoneService.getDetected();
	} else {
		$scope.defaulttimezone = settings.timezone;
	}

	function showCalendar(url) {
		if (switcher.indexOf(url) === -1 && $scope.eventSource[url].isRendering === false) {
			switcher.push(url);
			fc.elm.fullCalendar('removeEventSource', $scope.eventSource[url]);
			fc.elm.fullCalendar('addEventSource', $scope.eventSource[url]);
		}
	}

	function hideCalendar(url) {
		fc.elm.fullCalendar('removeEventSource', $scope.eventSource[url]);
		if (switcher.indexOf(url) !== -1) {
			switcher.splice(switcher.indexOf(url), 1);
		}
	}

	function createAndRenderEvent(calendar, data, start, end, tz) {
		VEventService.create(calendar, data).then(function (vevent) {
			if (calendar.enabled) {
				fc.elm.fullCalendar('refetchEventSources', calendar.fcEventSource);
			}
		});
	}

	function deleteAndRemoveEvent(vevent, fcEvent) {
		VEventService.delete(vevent).then(function () {
			fc.elm.fullCalendar('removeEvents', fcEvent.id);
		});
	}

	$scope.$watchCollection('calendars', function (newCalendars, oldCalendars) {
		newCalendars.filter(function (calendar) {
			return oldCalendars.indexOf(calendar) === -1;
		}).forEach(function (calendar) {
			$scope.eventSource[calendar.url] = calendar.fcEventSource;
			if (calendar.enabled) {
				showCalendar(calendar.url);
			}

			calendar.register(Calendar.hookEnabledChanged, function (enabled) {
				if (enabled) {
					showCalendar(calendar.url);
				} else {
					hideCalendar(calendar.url);
				}
			});

			calendar.register(Calendar.hookColorChanged, function () {
				if (calendar.enabled) {
					hideCalendar(calendar.url);
					showCalendar(calendar.url);
				}
			});
		});

		oldCalendars.filter(function (calendar) {
			return newCalendars.indexOf(calendar) === -1;
		}).forEach(function (calendar) {
			var url = calendar.url;
			hideCalendar(calendar.url);

			delete $scope.eventSource[url];
		});
	});

	TimezoneService.get($scope.defaulttimezone).then(function (timezone) {
		if (timezone) {
			ICAL.TimezoneService.register($scope.defaulttimezone, timezone.jCal);
		}
	}).catch(function () {
		OC.Notification.showTemporary(t('calendar', 'You are in an unknown timezone ({tz}), falling back to UTC', {
			tz: $scope.defaulttimezone
		}));

		$scope.defaulttimezone = 'UTC';
		$scope.fcConfig.timezone = 'UTC';
		fc.elm.fullCalendar('option', 'timezone', 'UTC');
	});

	if (!isPublic) {
		$scope.calendarsPromise = CalendarService.getAll().then(function (calendars) {
			$scope.calendars = calendars;
			is.loading = false;
			$scope.$apply();
		});
	} else {
		$scope.calendarsPromise = CalendarService.getPublicCalendar(constants.publicSharingToken).then(function (calendar) {
			$scope.calendars = [calendar];
			is.loading = false;
			$scope.$apply();
		}).catch(function (reason) {
			angular.element('#header-right').css('display', 'none');
			angular.element('#emptycontent-container').css('display', 'block');
		});
	}

	$scope.fcConfig = {
		timezone: $scope.defaulttimezone,
		select: function select(start, end, jsEvent, view) {
			var writableCalendars = $scope.calendars.filter(function (elem) {
				return elem.isWritable();
			});

			if (writableCalendars.length === 0) {
				if (!isPublic) {
					OC.Notification.showTemporary(t('calendar', 'Please create a calendar first.'));
				}
				return;
			}

			start.add(start.toDate().getTimezoneOffset(), 'minutes');
			end.add(end.toDate().getTimezoneOffset(), 'minutes');

			var vevent = VEvent.fromStartEnd(start, end, $scope.defaulttimezone);
			vevent.calendar = writableCalendars[0];

			var timestamp = Date.now();
			var fcEventClass = 'new-event-dummy-' + timestamp;

			vevent.getFcEvent(view.start, view.end, $scope.defaulttimezone).then(function (fcEvents) {
				var fcEvent = fcEvents[0];

				fcEvent.title = t('calendar', 'New event');
				fcEvent.className.push(fcEventClass);
				fcEvent.editable = false;
				fc.elm.fullCalendar('renderEvent', fcEvent);

				EventsEditorDialogService.open($scope, fcEvent, function () {
					var elements = angular.element('.' + fcEventClass);
					var isHidden = angular.element(elements[0]).parents('.fc-limited').length !== 0;
					if (isHidden) {
						return PopoverPositioningUtility.calculate(jsEvent.clientX, jsEvent.clientY, jsEvent.clientX, jsEvent.clientY, view);
					} else {
						return PopoverPositioningUtility.calculateByTarget(elements[0], view);
					}
				}, function () {
					return null;
				}, function () {
					fc.elm.fullCalendar('removeEvents', function (fcEventToCheck) {
						if (Array.isArray(fcEventToCheck.className)) {
							return fcEventToCheck.className.indexOf(fcEventClass) !== -1;
						} else {
							return false;
						}
					});
				}).then(function (result) {
					createAndRenderEvent(result.calendar, result.vevent.data, view.start, view.end, $scope.defaulttimezone);
				}).catch(function (reason) {
					return null;
				});
			});
		},
		eventClick: function eventClick(fcEvent, jsEvent, view) {
			var vevent = fcEvent.vevent;
			var oldCalendar = vevent.calendar;
			var fcEvt = fcEvent;

			EventsEditorDialogService.open($scope, fcEvent, function () {
				return PopoverPositioningUtility.calculateByTarget(jsEvent.currentTarget, view);
			}, function () {
				fcEvt.editable = false;
				fc.elm.fullCalendar('updateEvent', fcEvt);
			}, function () {
				fcEvt.editable = fcEvent.calendar.writable;
				fc.elm.fullCalendar('updateEvent', fcEvt);
			}).then(function (result) {
				if (result.calendar === oldCalendar) {
					VEventService.update(vevent).then(function () {
						fc.elm.fullCalendar('removeEvents', fcEvent.id);

						if (result.calendar.enabled) {
							fc.elm.fullCalendar('refetchEventSources', result.calendar.fcEventSource);
						}
					});
				} else {
					deleteAndRemoveEvent(vevent, fcEvent);
					createAndRenderEvent(result.calendar, result.vevent.data, view.start, view.end, $scope.defaulttimezone);
				}
			}).catch(function (reason) {
				if (reason === 'delete') {
					deleteAndRemoveEvent(vevent, fcEvent);
				}
			});
		},
		eventResize: function eventResize(fcEvent, delta, revertFunc) {
			fcEvent.resize(delta);
			VEventService.update(fcEvent.vevent).catch(function () {
				revertFunc();
			});
		},
		eventDrop: function eventDrop(fcEvent, delta, revertFunc) {
			var isAllDay = !fcEvent.start.hasTime();

			var defaultAllDayEventDuration = fc.elm.fullCalendar('option', 'defaultAllDayEventDuration');
			var defaultAllDayEventMomentDuration = moment.duration(defaultAllDayEventDuration);

			var defaultTimedEventDuration = fc.elm.fullCalendar('option', 'defaultTimedEventDuration');
			var defaultTimedEventMomentDuration = moment.duration(defaultTimedEventDuration);

			var timezone = $scope.defaulttimezone;

			fcEvent.drop(delta, isAllDay, timezone, defaultTimedEventMomentDuration, defaultAllDayEventMomentDuration);
			VEventService.update(fcEvent.vevent).catch(function () {
				revertFunc();
			});
		},
		viewRender: function viewRender(view, element) {
			angular.element('#firstrow').find('.datepicker_current').html(view.title).text();
			angular.element('#datecontrol_date').datepicker('setDate', element.fullCalendar('getDate'));
			var newView = view.name;
			if (newView !== $scope.defaultView && !isPublic) {
				SettingsService.setView(newView);
				$scope.defaultView = newView;
			}
			if (newView === 'agendaDay') {
				angular.element('td.fc-state-highlight').css('background-color', '#ffffff');
			} else {
				angular.element('.fc-bg td.fc-state-highlight').css('background-color', '#ffa');
			}
			if (newView === 'agendaWeek') {
				element.fullCalendar('option', 'aspectRatio', 0.1);
			} else {
				element.fullCalendar('option', 'aspectRatio', 1.35);
			}
		},
		eventRender: function eventRender(event, element) {
			var status = event.getSimpleEvent().status;
			if (status !== null) {
				if (status.value === 'TENTATIVE') {
					element.css({ 'opacity': 0.5 });
				} else if (status.value === 'CANCELLED') {
					element.css({
						'text-decoration': 'line-through',
						'opacity': 0.5
					});
				}
			}
		}
	};
}]);
'use strict';



app.controller('CalendarListController', ['$scope', '$rootScope', '$window', 'HashService', 'CalendarService', 'WebCalService', 'is', 'CalendarListItem', 'Calendar', 'MailerService', 'ColorUtility', 'isSharingAPI', 'constants', function ($scope, $rootScope, $window, HashService, CalendarService, WebCalService, is, CalendarListItem, Calendar, MailerService, ColorUtility, isSharingAPI, constants) {
	'use strict';

	$scope.calendarListItems = [];
	$scope.is = is;
	$scope.newCalendarInputVal = '';
	$scope.newCalendarColorVal = '';
	$scope.addingCal = false;
	$scope.addingCalRequest = false;
	$scope.addingSub = false;
	$scope.addingSubRequest = false;

	$scope.subscription = {};
	$scope.subscription.newSubscriptionUrl = '';
	$scope.subscription.newSubscriptionLocked = false;
	$scope.publicdav = 'CalDAV';
	$scope.publicdavdesc = t('calendar', 'CalDAV address for clients');
	$scope.warningLabel = t('calendar', 'Some events in this calendar are broken. Please check the JS console for more info.');
	$scope.shareLabel = t('calendar', 'Share Calendar');
	$scope.sharedLabel = t('calendar', 'Shared');

	$scope.isSharingAPI = isSharingAPI;
	$scope.canSharePublicLink = constants.canSharePublicLink;

	$scope.$watchCollection('calendars', function (newCalendars, oldCalendars) {
		newCalendars = newCalendars || [];
		oldCalendars = oldCalendars || [];

		newCalendars.filter(function (calendar) {
			return oldCalendars.indexOf(calendar) === -1;
		}).forEach(function (calendar) {
			var item = CalendarListItem(calendar);
			if (item) {
				$scope.calendarListItems.push(item);
				$scope.publicdavurl = $scope.$parent.calendars[0].caldav;
				calendar.register(Calendar.hookFinishedRendering, function () {
					if (!$scope.$$phase) {
						$scope.$apply();
					}
				});
			}
		});

		oldCalendars.filter(function (calendar) {
			return newCalendars.indexOf(calendar) === -1;
		}).forEach(function (calendar) {
			$scope.calendarListItems = $scope.calendarListItems.filter(function (itemToCheck) {
				return itemToCheck.calendar !== calendar;
			});
		});
	});

	$scope.openNewCalendarForm = function () {
		$scope.addingCal = true;
	};

	$scope.dismissNewCalendar = function () {
		$scope.newCalendarInputVal = '';
		$scope.newCalendarColorVal = '';
		$scope.addingCal = false;
	};

	$scope.create = function (name) {
		$scope.addingCalRequest = true;
		var color = ColorUtility.randomColor();
		CalendarService.create(name, color).then(function (calendar) {
			$scope.calendars.push(calendar);
			$rootScope.$broadcast('createdCalendar', calendar);

			$scope.newCalendarInputVal = '';
			$scope.newCalendarColorVal = '';
			$scope.addingCal = false;
			$scope.addingCalRequest = false;
			$scope.$apply();
		});
	};

	$scope.openNewSubscriptionForm = function () {
		$scope.addingSub = true;
	};

	$scope.dismissNewSubscription = function () {
		$scope.subscription.newSubscriptionUrl = '';
		$scope.addingSub = false;
	};

	$scope.createSubscription = function (url) {
		$scope.subscription.newSubscriptionLocked = true;
		WebCalService.get(url).then(function (splittedICal) {
			var color = splittedICal.color || ColorUtility.randomColor();
			var name = splittedICal.name || url;

			if (name.length > 100) {
				name = name.substr(0, 100);
			}

			CalendarService.createWebCal(name, color, url).then(function (calendar) {
				angular.element('#new-subscription-button').click();
				$scope.calendars.push(calendar);
				$scope.subscription.newSubscriptionUrl = '';
				$scope.$digest();
				$scope.$parent.$digest();
				$scope.subscription.newSubscriptionLocked = false;
				$scope.addingSub = false;
			}).catch(function () {
				OC.Notification.showTemporary(t('calendar', 'Could not save WebCal-calendar'));
				$scope.subscription.newSubscriptionLocked = false;
			});
		}).catch(function (reason) {
			if (reason.error) {
				OC.Notification.showTemporary(reason.message);
				$scope.subscription.newSubscriptionLocked = false;
			} else if (reason.redirect) {
				$scope.createSubscription(reason.new_url);
			}
		});
	};

	$scope.download = function (item) {
		$window.open(item.calendar.downloadUrl);
	};

	$scope.integration = function (item) {
		return '<iframe width="400" height="215" src="' + item.publicEmbedURL + '"></iframe>';
	};

	$scope.$watch('publicdav', function (newvalue) {
		if ($scope.$parent.calendars[0]) {
			if (newvalue === 'CalDAV') {
				$scope.publicdavurl = $scope.$parent.calendars[0].caldav;
				$scope.publicdavdesc = t('calendar', 'CalDAV address for clients');
			} else {
				var url = $scope.$parent.calendars[0].url;
				if (url.slice(url.length - 1) === '/') {
					url = url.slice(0, url.length - 1);
				}
				url += '?export';
				$scope.publicdavurl = $window.location.origin + url;
				$scope.publicdavdesc = t('calendar', 'WebDAV address for subscriptions');
			}
		}
	});

	$scope.sendMail = function (item) {
		item.toggleSendingMail();
		MailerService.sendMail(item.email, item.publicSharingURL, item.calendar.displayname).then(function (response) {
			if (response.status === 200) {
				item.email = '';
				OC.Notification.showTemporary(t('calendar', 'Email sent.'));
			} else {
				OC.Notification.showTemporary(t('calendar', 'Could not send your email.'));
			}
		});
	};

	$scope.goPublic = function (item) {
		$window.open(item.publicSharingURL);
	};

	$scope.toggleSharesEditor = function (calendar) {
		calendar.toggleSharesEditor();
	};

	$scope.togglePublish = function (item) {
		if (item.calendar.published) {
			item.calendar.publish().then(function (response) {
				if (response) {
					CalendarService.get(item.calendar.url).then(function (calendar) {
						item.calendar.publicToken = calendar.publicToken;
						item.calendar.published = true;
					});
				}
				$scope.$apply();
			});
		} else {
			item.calendar.unpublish().then(function (response) {
				if (response) {
					item.calendar.published = false;
				}
				$scope.$apply();
			});
		}
	};

	$scope.prepareUpdate = function (calendar) {
		calendar.prepareUpdate();
	};

	$scope.onSelectSharee = function (item, model, label, calendarItem) {
		var calendar = calendarItem.calendar;
		calendar.share(item.type, item.identifier, item.displayname, false, false).then(function () {
			calendarItem.selectedSharee = '';

			$scope.$apply();
		});
	};

	$scope.updateExistingUserShare = function (calendar, userId, displayname, writable) {
		calendar.share(constants.SHARE_TYPE_USER, userId, displayname, writable, true).then(function () {
			$scope.$apply();
		});
	};

	$scope.updateExistingGroupShare = function (calendar, groupId, displayname, writable) {
		calendar.share(constants.SHARE_TYPE_GROUP, groupId, displayname, writable, true).then(function () {
			$scope.$apply();
		});
	};

	$scope.updateExistingCircleShare = function (calendar, circleId, displayname, writable) {
		calendar.share(constants.SHARE_TYPE_CIRCLE, circleId, displayname, writable, true).then(function () {
			$scope.$apply();
		});
	};

	$scope.unshareFromUser = function (calendar, userId) {
		calendar.unshare(constants.SHARE_TYPE_USER, userId).then(function () {
			$scope.$apply();
		});
	};

	$scope.unshareFromGroup = function (calendar, groupId) {
		calendar.unshare(constants.SHARE_TYPE_GROUP, groupId).then(function () {
			$scope.$apply();
		});
	};

	$scope.unshareFromCircle = function (calendar, circleId) {
		calendar.unshare(constants.SHARE_TYPE_CIRCLE, circleId).then(function () {
			$scope.$apply();
		});
	};

	$scope.findSharee = function (val, calendar) {
		return $.get(OC.linkToOCS('apps/files_sharing/api/v1') + 'sharees', {
			format: 'json',
			search: val.trim(),
			perPage: 200,
			itemType: 'principals'
		}).then(function (result) {
			var users = result.ocs.data.exact.users.concat(result.ocs.data.users);
			var groups = result.ocs.data.exact.groups.concat(result.ocs.data.groups);
			var circles = result.ocs.data.exact.circles.concat(result.ocs.data.circles);

			var userShares = calendar.shares.users;
			var groupShares = calendar.shares.groups;
			var circleShares = calendar.shares.circles;
			var userSharesLength = userShares.length;
			var groupSharesLength = groupShares.length;
			var circleSharesLength = circleShares.length;
			var i, j;

			var usersLength = users.length;
			for (i = 0; i < usersLength; i++) {
				if (users[i].value.shareWith === OC.currentUser) {
					users.splice(i, 1);
					break;
				}
			}

			for (i = 0; i < userSharesLength; i++) {
				var share = userShares[i];
				usersLength = users.length;
				for (j = 0; j < usersLength; j++) {
					if (users[j].value.shareWith === share.id) {
						users.splice(j, 1);
						break;
					}
				}
			}

			users = users.map(function (item) {
				return {
					display: _.escape(item.label),
					displayname: item.label,
					type: constants.SHARE_TYPE_USER,
					identifier: item.value.shareWith
				};
			});

			groups = groups.map(function (item) {
				return {
					display: _.escape(item.label + ' (' + t('calendar', 'group') + ')'),
					displayname: item.label,
					type: constants.SHARE_TYPE_GROUP,
					identifier: item.value.shareWith
				};
			});

			circles = circles.map(function (item) {
				return {
					display: item.label + ' (' + t('calendar', 'circle') + ')',
					displayname: item.label,
					type: constants.SHARE_TYPE_CIRCLE,
					identifier: item.value.shareWith
				};
			});

			return circles.concat(groups).concat(users);
		});
	};

	$scope.performUpdate = function (item) {
		item.saveEditor();
		item.calendar.update().then(function () {
			$rootScope.$broadcast('updatedCalendar', item.calendar);
			$rootScope.$broadcast('reloadCalendarList');
		});
	};

	$scope.performUpdateShares = function (calendar) {
		calendar.update().then(function () {
			calendar.dropPreviousState();
			calendar.list.edit = false;
			$rootScope.$broadcast('updatedCalendar', calendar);
			$rootScope.$broadcast('reloadCalendarList');
		});
	};

	$scope.triggerEnable = function (item) {
		item.calendar.toggleEnabled();

		item.calendar.update().then(function () {
			$rootScope.$broadcast('updatedCalendarsVisibility', item.calendar);
			$rootScope.$broadcast('reloadCalendarList');
		});
	};

	$scope.remove = function (item) {
		item.calendar.delete().then(function () {
			$scope.$parent.calendars = $scope.$parent.calendars.filter(function (elem) {
				return elem !== item.calendar;
			});
			if (!$scope.$$phase) {
				$scope.$apply();
			}
		});
	};

	$rootScope.$on('reloadCalendarList', function () {
		if (!$scope.$$phase) {
			$scope.$apply();
		}
	});

	HashService.runIfApplicable('subscribe_to_webcal', function (map) {
		if (map.has('url')) {
			var url = map.get('url');

			$scope.subscription.newSubscriptionUrl = url;
			$scope.subscription.newSubscriptionLocked = true;
			angular.element('#new-subscription-button').click();

			$scope.calendarsPromise.then(function () {
				$scope.createSubscription(url);
			});
		}
	});
}]);
'use strict';


app.controller('DatePickerController', ['$scope', 'fc', 'uibDatepickerConfig', 'constants', function ($scope, fc, uibDatepickerConfig, constants) {
	'use strict';

	function getDayClass(data) {
		if (moment(data.date).isSame(new Date(), 'day')) {
			return 'highlight-today';
		}

		if (data.date.getDay() === 0 || data.date.getDay() === 6) {
			return 'highlight-weekend';
		}

		return '';
	}

	$scope.datepickerOptions = {
		formatDay: 'd',
		customClass: getDayClass
	};

	$scope.dt = new Date();
	$scope.visibility = false;

	$scope.selectedView = constants.initialView;

	angular.extend(uibDatepickerConfig, {
		showWeeks: false,
		startingDay: parseInt(moment().startOf('week').format('d'))
	});

	$scope.today = function () {
		$scope.dt = new Date();
	};

	function changeView(index) {
		switch ($scope.selectedView) {
			case 'agendaDay':
				return moment($scope.dt).add(index, 'day').toDate();

			case 'agendaWeek':
				return moment($scope.dt).add(index, 'week').startOf('week').toDate();

			case 'month':
				return moment($scope.dt).add(index, 'month').startOf('month').toDate();
		}
	}

	$scope.prev = function () {
		$scope.dt = changeView(-1);
	};

	$scope.next = function () {
		$scope.dt = changeView(1);
	};

	$scope.toggle = function () {
		$scope.visibility = !$scope.visibility;
	};

	$scope.$watch('dt', function (newValue) {
		if (fc) {
			fc.elm.fullCalendar('gotoDate', newValue);
		}
	});

	$scope.$watch('selectedView', function (newValue) {
		if (fc) {
			fc.elm.fullCalendar('changeView', newValue);
		}
	});
}]);
'use strict';



app.controller('EditorController', ['$scope', 'TimezoneService', 'AutoCompletionService', '$timeout', '$window', '$uibModalInstance', 'vevent', 'simpleEvent', 'calendar', 'isNew', 'emailAddress', function ($scope, TimezoneService, AutoCompletionService, $timeout, $window, $uibModalInstance, vevent, simpleEvent, calendar, isNew, emailAddress) {
	'use strict';

	$scope.properties = simpleEvent;
	$scope.is_new = isNew;
	$scope.calendar = calendar;
	$scope.oldCalendar = isNew ? calendar : vevent.calendar;
	$scope.readOnly = !vevent.calendar.isWritable();
	$scope.accessibleViaCalDAV = vevent.calendar.eventsAccessibleViaCalDAV();
	$scope.selected = 0;
	$scope.timezones = [];
	$scope.emailAddress = emailAddress;
	$scope.edittimezone = $scope.properties.dtstart.parameters.zone !== 'floating' && $scope.properties.dtstart.parameters.zone !== $scope.defaulttimezone || $scope.properties.dtend.parameters.zone !== 'floating' && $scope.properties.dtend.parameters.zone !== $scope.defaulttimezone;

	$scope.preEditingHooks = [];
	$scope.postEditingHooks = [];

	$scope.tabs = [{ title: t('calendar', 'Details'), value: 0 }, { title: t('calendar', 'Attendees'), value: 1 }, { title: t('calendar', 'Reminders'), value: 2 }, { title: t('calendar', 'Repeating'), value: 3 }];

	$scope.classSelect = [{ displayname: t('calendar', 'When shared show full event'), type: 'PUBLIC' }, { displayname: t('calendar', 'When shared show only busy'), type: 'CONFIDENTIAL' }, { displayname: t('calendar', 'When shared hide this event'), type: 'PRIVATE' }];

	$scope.statusSelect = [{ displayname: t('calendar', 'Confirmed'), type: 'CONFIRMED' }, { displayname: t('calendar', 'Tentative'), type: 'TENTATIVE' }, { displayname: t('calendar', 'Cancelled'), type: 'CANCELLED' }];

	$scope.registerPreHook = function (callback) {
		$scope.preEditingHooks.push(callback);
	};

	$uibModalInstance.rendered.then(function () {
		if ($scope.properties.allDay) {
			$scope.properties.dtend.value = moment($scope.properties.dtend.value.subtract(1, 'days'));
		}

		autosize($('.advanced--textarea'));
		autosize($('.events--textarea'));

		$timeout(function () {
			autosize.update($('.advanced--textarea'));
			autosize.update($('.events--textarea'));
		}, 50);

		angular.forEach($scope.preEditingHooks, function (callback) {
			callback();
		});

		$scope.tabopener(0);
	});

	$scope.registerPostHook = function (callback) {
		$scope.postEditingHooks.push(callback);
	};

	$scope.proceed = function () {
		$scope.prepareClose();
		$uibModalInstance.close({
			action: 'proceed',
			calendar: $scope.calendar,
			simple: $scope.properties,
			vevent: vevent
		});
	};

	$scope.save = function () {
		if (!$scope.validate()) {
			return;
		}

		$scope.prepareClose();
		$scope.properties.patch();
		$uibModalInstance.close({
			action: 'save',
			calendar: $scope.calendar,
			simple: $scope.properties,
			vevent: vevent
		});
	};

	$scope.keypress = function (event) {
		var code = event.keyCode || event.which;
		if ((event.metaKey === true || event.ctrlKey === true) && code === 13) {
			$scope.$broadcast('save-contents');
			$scope.save();
		}
	};

	$scope.validate = function () {
		var error = false;
		if ($scope.properties.summary === null || $scope.properties.summary.value.trim() === '') {
			OC.Notification.showTemporary(t('calendar', 'Please add a title.'));
			error = true;
		}
		if ($scope.calendar === null || typeof $scope.calendar === 'undefined') {
			OC.Notification.showTemporary(t('calendar', 'Please select a calendar.'));
			error = true;
		}
		if (!$scope.properties.checkDtStartBeforeDtEnd()) {
			OC.Notification.showTemporary(t('calendar', 'The event can not end before it starts.'));
			error = true;
		}

		return !error;
	};

	$scope.prepareClose = function () {
		if ($scope.properties.allDay) {
			$scope.properties.dtend.value.add(1, 'days');
		}

		angular.forEach($scope.postEditingHooks, function (callback) {
			callback();
		});
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};

	$scope.delete = function () {
		$uibModalInstance.dismiss('delete');
	};

	$scope.export = function () {
		$window.open($scope.oldCalendar.url + vevent.uri);
	};

	$scope.tabopener = function (val) {
		$scope.selected = val;
		if (val === 0) {
			$scope.eventsdetailsview = true;
			$scope.eventsattendeeview = false;
			$scope.eventsalarmview = false;
			$scope.eventsrepeatview = false;
		} else if (val === 1) {
			$scope.eventsdetailsview = false;
			$scope.eventsattendeeview = true;
			$scope.eventsalarmview = false;
			$scope.eventsrepeatview = false;
		} else if (val === 2) {
			$scope.eventsdetailsview = false;
			$scope.eventsattendeeview = false;
			$scope.eventsalarmview = true;
			$scope.eventsrepeatview = false;
		} else if (val === 3) {
			$scope.eventsdetailsview = false;
			$scope.eventsattendeeview = false;
			$scope.eventsalarmview = false;
			$scope.eventsrepeatview = true;
		}
	};

	$scope.selectedCalendarChanged = function () {
		if ($scope.calendar.enabled === false) {
			$scope.calendar.enabled = true;
			$scope.calendar.update();
		}
	};

	$scope.showCalendarSelection = function () {
		if (!$scope.calendar.isWritable()) {
			return true;
		}

		var writableCalendars = $scope.calendars.filter(function (c) {
			return c.isWritable();
		});

		return writableCalendars.length > 1;
	};

	$scope.$watch('properties.dtstart.value', function (nv, ov) {
		var diff = nv.diff(ov, 'seconds');
		if (diff !== 0) {
			$scope.properties.dtend.value = moment($scope.properties.dtend.value.add(diff, 'seconds'));
		}
	});

	$scope.toggledAllDay = function () {
		if ($scope.properties.allDay) {
			return;
		}

		if ($scope.properties.dtstart.value.isSame($scope.properties.dtend.value)) {
			$scope.properties.dtend.value = moment($scope.properties.dtend.value.add(1, 'hours'));
		}

		if ($scope.properties.dtstart.parameters.zone === 'floating' && $scope.properties.dtend.parameters.zone === 'floating') {
			$scope.properties.dtstart.parameters.zone = $scope.defaulttimezone;
			$scope.properties.dtend.parameters.zone = $scope.defaulttimezone;
		}
	};
	$scope.$watch('properties.allDay', $scope.toggledAllDay);

	TimezoneService.listAll().then(function (list) {
		if ($scope.properties.dtstart.parameters.zone !== 'floating' && list.indexOf($scope.properties.dtstart.parameters.zone) === -1) {
			list.push($scope.properties.dtstart.parameters.zone);
		}
		if ($scope.properties.dtend.parameters.zone !== 'floating' && list.indexOf($scope.properties.dtend.parameters.zone) === -1) {
			list.push($scope.properties.dtend.parameters.zone);
		}

		angular.forEach(list, function (timezone) {
			if (timezone === 'GMT' || timezone === 'Z') {
				return;
			}

			if (timezone.split('/').length === 1) {
				$scope.timezones.push({
					displayname: timezone,
					group: t('calendar', 'Global'),
					value: timezone
				});
			} else {
				$scope.timezones.push({
					displayname: timezone.split('/').slice(1).join('/'),
					group: timezone.split('/', 1),
					value: timezone
				});
			}
		});

		$scope.timezones.push({
			displayname: t('calendar', 'None'),
			group: t('calendar', 'Global'),
			value: 'floating'
		});
	});

	$scope.loadTimezone = function (tzId) {
		TimezoneService.get(tzId).then(function (timezone) {
			ICAL.TimezoneService.register(tzId, timezone.jCal);
		});
	};

	$scope.searchLocation = function (value) {
		return AutoCompletionService.searchLocation(value).then(function (locations) {
			locations = locations.map(function (location) {
				return {
					label: _.escape(location.name) + "\n" + location.label,
					name: _.escape(location.name)
				};
			});

			return locations;
		});
	};

	$scope.selectLocationFromTypeahead = function (item) {
		$scope.properties.location.value = item.label;
	};

	$scope.setClassToDefault = function () {
		if ($scope.properties.class === null) {
			$scope.properties.class = {
				type: 'string',
				value: 'PUBLIC'
			};
		}
	};

	$scope.setStatusToDefault = function () {
		if ($scope.properties.status === null) {
			$scope.properties.status = {
				type: 'string',
				value: 'CONFIRMED'
			};
		}
	};
}]);
'use strict';



app.controller('ImportController', ['$scope', '$filter', 'CalendarService', 'VEventService', '$uibModalInstance', 'files', 'ImportFileWrapper', 'ColorUtility', function ($scope, $filter, CalendarService, VEventService, $uibModalInstance, files, ImportFileWrapper, ColorUtility) {
	'use strict';

	$scope.nameSize = 25;

	$scope.rawFiles = files;
	$scope.files = [];

	$scope.showCloseButton = false;
	$scope.writableCalendars = $scope.calendars.filter(function (elem) {
		return elem.isWritable();
	});

	$scope.import = function (fileWrapper) {
		fileWrapper.state = ImportFileWrapper.stateScheduled;

		var importCalendar = function importCalendar(calendar) {
			var objects = fileWrapper.splittedICal.objects;

			angular.forEach(objects, function (object) {
				VEventService.create(calendar, object, false).then(function (response) {
					fileWrapper.state = ImportFileWrapper.stateImporting;
					fileWrapper.progress++;

					if (!response) {
						fileWrapper.errors++;
					}
				}).catch(function (reason) {
					if (reason.status === 400) {
						var xml = reason.xhr.responseXML;
						var error = xml.children[0];

						if (error) {
							var message = error.children[1].textContent;
							if (message === 'Calendar object with uid already exists in this calendar collection.') {
								fileWrapper.duplicates++;
							}
						}
					}

					fileWrapper.state = ImportFileWrapper.stateImporting;
					fileWrapper.errors++;
					fileWrapper.progress++;
				});
			});
		};

		if (fileWrapper.selectedCalendar === 'new') {
			var name = fileWrapper.splittedICal.name || fileWrapper.file.name;
			var color = fileWrapper.splittedICal.color || ColorUtility.randomColor();

			var components = [];
			if (fileWrapper.splittedICal.vevents.length > 0) {
				components.push('vevent');
				components.push('vtodo');
			}
			if (fileWrapper.splittedICal.vjournals.length > 0) {
				components.push('vjournal');
			}
			if (fileWrapper.splittedICal.vtodos.length > 0 && components.indexOf('vtodo') === -1) {
				components.push('vtodo');
			}

			CalendarService.create(name, color, components).then(function (calendar) {
				if (calendar.components.vevent) {
					$scope.calendars.push(calendar);
					$scope.writableCalendars.push(calendar);
				}
				importCalendar(calendar);
				fileWrapper.selectedCalendar = calendar.url;
			});
		} else {
			var calendar = $scope.calendars.filter(function (element) {
				return element.url === fileWrapper.selectedCalendar;
			})[0];
			importCalendar(calendar);
		}
	};

	$scope.preselectCalendar = function (fileWrapper) {
		var possibleCalendars = $filter('importCalendarFilter')($scope.writableCalendars, fileWrapper);
		if (possibleCalendars.length === 0) {
			fileWrapper.selectedCalendar = 'new';
		} else {
			fileWrapper.selectedCalendar = possibleCalendars[0].url;
		}
	};

	$scope.changeCalendar = function (fileWrapper) {
		if (fileWrapper.selectedCalendar === 'new') {
			fileWrapper.incompatibleObjectsWarning = false;
		} else {
			var possibleCalendars = $filter('importCalendarFilter')($scope.writableCalendars, fileWrapper);
			fileWrapper.incompatibleObjectsWarning = possibleCalendars.indexOf(fileWrapper.selectedCalendar) === -1;
		}
	};

	angular.forEach($scope.rawFiles, function (rawFile) {
		var fileWrapper = ImportFileWrapper(rawFile);
		fileWrapper.read(function () {
			$scope.preselectCalendar(fileWrapper);
			$scope.$apply();
		});

		fileWrapper.register(ImportFileWrapper.hookProgressChanged, function () {
			$scope.$apply();
		});

		fileWrapper.register(ImportFileWrapper.hookDone, function () {
			$scope.$apply();
			$scope.closeIfNecessary();

			var calendar = $scope.calendars.find(function (element) {
				return element.url === fileWrapper.selectedCalendar;
			});
			if (calendar && calendar.enabled) {
				calendar.enabled = false;
				calendar.enabled = true;
			}
		});

		fileWrapper.register(ImportFileWrapper.hookErrorsChanged, function () {
			$scope.$apply();
		});

		$scope.files.push(fileWrapper);
	});

	$scope.closeIfNecessary = function () {
		var unfinishedFiles = $scope.files.filter(function (file) {
			return !file.wasCanceled() && !file.isDone() && !file.isEmpty() && !file.hasParsingErrors();
		});
		var filesEncounteredErrors = $scope.files.filter(function (file) {
			return file.isDone() && file.hasErrors() || file.hasParsingErrors();
		});
		var emptyFiles = $scope.files.filter(function (file) {
			return file.isEmpty();
		});

		if (unfinishedFiles.length === 0 && filesEncounteredErrors.length === 0 && emptyFiles.length === 0) {
			$uibModalInstance.close();
		} else if (unfinishedFiles.length === 0 && (filesEncounteredErrors.length !== 0 || emptyFiles.length !== 0)) {
			$scope.showCloseButton = true;
			$scope.$apply();
		}
	};

	$scope.close = function () {
		$uibModalInstance.close();
	};

	$scope.cancelFile = function (fileWrapper) {
		fileWrapper.state = ImportFileWrapper.stateCanceled;
		$scope.closeIfNecessary();
	};
}]);
'use strict';


app.controller('RecurrenceController', ["$scope", function ($scope) {
	'use strict';

	$scope.rruleNotSupported = false;

	$scope.repeat_options_simple = [{ val: 'NONE', displayname: t('calendar', 'None') }, { val: 'DAILY', displayname: t('calendar', 'Every day') }, { val: 'WEEKLY', displayname: t('calendar', 'Every week') }, { val: 'MONTHLY', displayname: t('calendar', 'Every month') }, { val: 'YEARLY', displayname: t('calendar', 'Every year') 
	}];

	$scope.selected_repeat_end = 'NEVER';
	$scope.repeat_end = [{ val: 'NEVER', displayname: t('calendar', 'never') }, { val: 'COUNT', displayname: t('calendar', 'after') 
	}];

	$scope.$parent.registerPreHook(function () {
		if ($scope.properties.rrule.freq !== 'NONE') {
			var unsupportedFREQs = ['SECONDLY', 'MINUTELY', 'HOURLY'];
			if (unsupportedFREQs.indexOf($scope.properties.rrule.freq) !== -1) {
				$scope.rruleNotSupported = true;
			}

			if (typeof $scope.properties.rrule.parameters !== 'undefined') {
				var partIds = Object.getOwnPropertyNames($scope.properties.rrule.parameters);
				if (partIds.length > 0) {
					$scope.rruleNotSupported = true;
				}
			}

			if ($scope.properties.rrule.count !== null) {
				$scope.selected_repeat_end = 'COUNT';
			} else if ($scope.properties.rrule.until !== null) {
				$scope.rruleNotSupported = true;
			}


			if ($scope.properties.rrule.interval === null) {
				$scope.properties.rrule.interval = 1;
			}
		}
	});

	$scope.$parent.registerPostHook(function () {
		$scope.properties.rrule.dontTouch = $scope.rruleNotSupported;

		if ($scope.selected_repeat_end === 'NEVER') {
			$scope.properties.rrule.count = null;
			$scope.properties.rrule.until = null;
		}
	});

	$scope.resetRRule = function () {
		$scope.selected_repeat_end = 'NEVER';
		$scope.properties.rrule.freq = 'NONE';
		$scope.properties.rrule.count = null;
		$scope.properties.rrule.interval = 1;
		$scope.rruleNotSupported = false;
		$scope.properties.rrule.parameters = {};
	};
}]);
'use strict';



app.controller('SettingsController', ['$scope', '$uibModal', '$timeout', 'TimezoneService', 'SettingsService', 'fc', 'isFirstRun', 'settings', function ($scope, $uibModal, $timeout, TimezoneService, SettingsService, fc, isFirstRun, settings) {
	'use strict';

	$scope.settingsCalDavLink = OC.linkToRemote('dav') + '/';
	$scope.settingsCalDavPrincipalLink = OC.linkToRemote('dav') + '/principals/users/' + escapeHTML(encodeURIComponent(oc_current_user)) + '/';
	$scope.skipPopover = settings.skipPopover ? 'yes' : 'no';
	$scope.settingsShowWeekNr = settings.showWeekNr ? 'yes' : 'no';
	$scope.timezone = settings.timezone;
	$scope.timezones = [];

	TimezoneService.listAll().then(function (timezones) {
		$scope.timezones.push({
			displayname: t('calendar', 'Automatic ({timezone})', {
				timezone: TimezoneService.getDetected()
			}),
			value: 'automatic'
		});

		timezones.forEach(function (timezone) {
			if (timezone.split('/').length === 1) {
				$scope.timezones.push({
					displayname: timezone,
					group: t('calendar', 'Global'),
					value: timezone
				});
			} else {
				$scope.timezones.push({
					displayname: timezone.split('/').slice(1).join('/'),
					group: timezone.split('/', 1),
					value: timezone
				});
			}
		});
	});

	$scope.setTimezone = function () {
		SettingsService.setTimezone($scope.timezone);
		settings.timezone = $scope.timezone;

		if (fc.elm) {
			var timezone = settings.timezone;
			if (settings.timezone === 'automatic') {
				timezone = TimezoneService.getDetected();
			}

			fc.elm.fullCalendar('option', 'timezone', timezone);
		}
	};

	$timeout(function () {
		if (isFirstRun) {
			angular.element('.settings-button').click();
			angular.element('#import-button-overlay').tooltip({
				animation: true,
				placement: 'bottom',
				title: t('calendar', 'How about getting started by importing some calendars?')
			});
			$timeout(function () {
				angular.element('#import-button-overlay').tooltip('toggle');
			}, 500);
			$timeout(function () {
				angular.element('#import-button-overlay').tooltip('toggle');
			}, 10500);
			SettingsService.passedFirstRun();
		}
	}, 1500);

	angular.element('#import').on('change', function () {
		var filesArray = [];
		for (var i = 0; i < this.files.length; i++) {
			filesArray.push(this.files[i]);
		}

		if (filesArray.length > 0) {
			$uibModal.open({
				templateUrl: 'import.html',
				controller: 'ImportController',
				windowClass: 'import',
				backdropClass: 'import-backdrop',
				keyboard: false,
				appendTo: angular.element('#importpopover-container'),
				resolve: {
					files: function files() {
						return filesArray;
					}
				},
				scope: $scope
			});
		}

		angular.element('#import').val(null);
	});

	$scope.updateSkipPopover = function () {
		var newValue = $scope.skipPopover;
		settings.skipPopover = newValue === 'yes';
		SettingsService.setSkipPopover(newValue);
	};

	$scope.updateShowWeekNr = function () {
		var newValue = $scope.settingsShowWeekNr;
		settings.showWeekNr = newValue === 'yes';
		SettingsService.setShowWeekNr(newValue);
		if (fc.elm) {
			fc.elm.fullCalendar('option', 'weekNumbers', newValue === 'yes');
		}
	};
}]);
'use strict';


app.controller('VAlarmController', ["$scope", function ($scope) {
	'use strict';

	$scope.newReminderId = -1;

	$scope.alarmFactors = [60, 
	60, 
	24, 
	7 
	];

	$scope.reminderSelect = [{ displayname: t('calendar', 'At time of event'), trigger: 0 }, { displayname: t('calendar', '5 minutes before'), trigger: -1 * 5 * 60 }, { displayname: t('calendar', '10 minutes before'), trigger: -1 * 10 * 60 }, { displayname: t('calendar', '15 minutes before'), trigger: -1 * 15 * 60 }, { displayname: t('calendar', '30 minutes before'), trigger: -1 * 30 * 60 }, { displayname: t('calendar', '1 hour before'), trigger: -1 * 60 * 60 }, { displayname: t('calendar', '2 hours before'), trigger: -1 * 2 * 60 * 60 }, { displayname: t('calendar', 'Custom'), trigger: 'custom' }];

	$scope.reminderSelectTriggers = $scope.reminderSelect.map(function (elem) {
		return elem.trigger;
	}).filter(function (elem) {
		return typeof elem === 'number';
	});

	$scope.reminderTypeSelect = [{ displayname: t('calendar', 'Audio'), type: 'AUDIO' }, { displayname: t('calendar', 'Email'), type: 'EMAIL' }, { displayname: t('calendar', 'Pop-up'), type: 'DISPLAY' }];

	$scope.timeUnitReminderSelect = [{ displayname: t('calendar', 'sec'), factor: 1 }, { displayname: t('calendar', 'min'), factor: 60 }, { displayname: t('calendar', 'hours'), factor: 60 * 60 }, { displayname: t('calendar', 'days'), factor: 60 * 60 * 24 }, { displayname: t('calendar', 'week'), factor: 60 * 60 * 24 * 7 }];

	$scope.timePositionReminderSelect = [{ displayname: t('calendar', 'before'), factor: -1 }, { displayname: t('calendar', 'after'), factor: 1 }];

	$scope.startEndReminderSelect = [{ displayname: t('calendar', 'start'), type: 'start' }, { displayname: t('calendar', 'end'), type: 'end' }];

	$scope.$parent.registerPreHook(function () {
		angular.forEach($scope.properties.alarm, function (alarm) {
			$scope._addEditorProps(alarm);
		});
	});

	$scope.$parent.registerPostHook(function () {
		angular.forEach($scope.properties.alarm, function (alarm) {
			if (alarm.editor.triggerType === 'absolute') {
				alarm.trigger.value = alarm.editor.absMoment;
			}
		});
	});

	$scope._addEditorProps = function (alarm) {
		angular.extend(alarm, {
			editor: {
				triggerValue: 0,
				triggerBeforeAfter: -1,
				triggerTimeUnit: 1,
				absMoment: moment(),
				editing: false
			}
		});

		alarm.editor.reminderSelectValue = $scope.reminderSelectTriggers.indexOf(alarm.trigger.value) !== -1 ? alarm.editor.reminderSelectValue = alarm.trigger.value : alarm.editor.reminderSelectValue = 'custom';

		alarm.editor.triggerType = alarm.trigger.type === 'duration' ? 'relative' : 'absolute';

		if (alarm.editor.triggerType === 'relative') {
			$scope._prepareRelativeVAlarm(alarm);
		} else {
			$scope._prepareAbsoluteVAlarm(alarm);
		}

		$scope._prepareRepeat(alarm);
	};

	$scope._prepareRelativeVAlarm = function (alarm) {
		var unitAndValue = $scope._getUnitAndValue(Math.abs(alarm.trigger.value));

		angular.extend(alarm.editor, {
			triggerBeforeAfter: alarm.trigger.value < 0 ? -1 : 1,
			triggerTimeUnit: unitAndValue[0],
			triggerValue: unitAndValue[1]
		});
	};

	$scope._prepareAbsoluteVAlarm = function (alarm) {
		alarm.editor.absMoment = alarm.trigger.value;
	};

	$scope._prepareRepeat = function (alarm) {
		var unitAndValue = $scope._getUnitAndValue(alarm.duration && alarm.duration.value ? alarm.duration.value : 0);

		angular.extend(alarm.editor, {
			repeat: !(!alarm.repeat.value || alarm.repeat.value === 0),
			repeatNTimes: alarm.editor.repeat ? alarm.repeat.value : 0,
			repeatTimeUnit: unitAndValue[0],
			repeatNValue: unitAndValue[1]
		});
	};

	$scope._getUnitAndValue = function (value) {
		var unit = 1;

		var alarmFactors = [60, 60, 24, 7];

		for (var i = 0; i < alarmFactors.length && value !== 0; i++) {
			var mod = value % alarmFactors[i];
			if (mod !== 0) {
				break;
			}

			unit *= alarmFactors[i];
			value /= alarmFactors[i];
		}

		return [unit, value];
	};

	$scope.add = function () {
		var setTriggers = [];
		angular.forEach($scope.properties.alarm, function (alarm) {
			if (alarm.trigger && alarm.trigger.type === 'duration') {
				setTriggers.push(alarm.trigger.value);
			}
		});

		var triggersToSuggest = [];
		angular.forEach($scope.reminderSelect, function (option) {
			if (typeof option.trigger !== 'number' || option.trigger > -1 * 15 * 60) {
				return;
			}

			triggersToSuggest.push(option.trigger);
		});

		var triggerToSet = null;
		for (var i = 0; i < triggersToSuggest.length; i++) {
			if (setTriggers.indexOf(triggersToSuggest[i]) === -1) {
				triggerToSet = triggersToSuggest[i];
				break;
			}
		}
		if (triggerToSet === null) {
			triggerToSet = triggersToSuggest[triggersToSuggest.length - 1];
		}

		var alarm = {
			id: $scope.newReminderId--,
			action: {
				type: 'text',
				value: 'AUDIO'
			},
			trigger: {
				type: 'duration',
				value: triggerToSet,
				related: 'start'
			},
			repeat: {},
			duration: {}
		};

		$scope._addEditorProps(alarm);
		$scope.properties.alarm.push(alarm);
	};

	$scope.remove = function (alarm) {
		$scope.properties.alarm = $scope.properties.alarm.filter(function (elem) {
			return elem !== alarm;
		});
	};

	$scope.triggerEdit = function (alarm) {
		if (alarm.editor.editing === true) {
			alarm.editor.editing = false;
		} else {
			if ($scope.isEditingReminderSupported(alarm)) {
				alarm.editor.editing = true;
			} else {
				OC.Notification.showTemporary(t('calendar', 'Editing reminders of unknown type not supported.'));
			}
		}
	};

	$scope.isEditingReminderSupported = function (alarm) {
		return ['AUDIO', 'DISPLAY', 'EMAIL'].indexOf(alarm.action.value) !== -1;
	};

	$scope.updateReminderSelectValue = function (alarm) {
		var factor = alarm.editor.reminderSelectValue;
		if (factor !== 'custom') {
			alarm.duration = {};
			alarm.repeat = {};
			alarm.trigger.related = 'start';
			alarm.trigger.type = 'duration';
			alarm.trigger.value = parseInt(factor);

			$scope._addEditorProps(alarm);
		}
	};

	$scope.updateReminderRelative = function (alarm) {
		alarm.trigger.value = parseInt(alarm.editor.triggerBeforeAfter) * parseInt(alarm.editor.triggerTimeUnit) * parseInt(alarm.editor.triggerValue);

		alarm.trigger.type = 'duration';
	};

	$scope.updateReminderAbsolute = function (alarm) {
		if (!moment.isMoment(alarm.trigger.value)) {
			alarm.trigger.value = moment();
		}

		alarm.trigger.type = 'date-time';
	};

	$scope.updateReminderRepeat = function (alarm) {
		alarm.repeat.type = 'string';
		alarm.repeat.value = alarm.editor.repeatNTimes;
		alarm.duration.type = 'duration';
		alarm.duration.value = parseInt(alarm.editor.repeatNValue) * parseInt(alarm.editor.repeatTimeUnit);
	};

	$scope.hasAnyEmailReminders = function () {
		var hasEmail = false;

		angular.forEach($scope.properties.alarm, function (alarm) {
			if (alarm.action.value === 'EMAIL') {
				hasEmail = true;
			}
		});

		return hasEmail;
	};
}]);
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();


app.service('CalendarFactory', ["DavClient", "Calendar", "WebCal", "constants", function (DavClient, Calendar, WebCal, constants) {
	'use strict';

	var context = {};

	var SHARE_USER_PREFIX = 'principal:principals/users/';
	var SHARE_GROUP_PREFIX = 'principal:principals/groups/';
	var SHARE_CIRCLE_PREFIX = 'principal:principals/circles/';

	context.acl = function (props, userPrincipal) {
		var acl = props['{' + DavClient.NS_DAV + '}acl'] || [];
		var canWrite = false;

		acl.forEach(function (rule) {
			var href = rule.getElementsByTagNameNS(DavClient.NS_DAV, 'href');
			if (href.length === 0) {
				return;
			}

			if (href[0].textContent !== userPrincipal) {
				return;
			}

			var writeNode = rule.getElementsByTagNameNS(DavClient.NS_DAV, 'write');
			if (writeNode.length > 0) {
				canWrite = true;
			}
		});

		return canWrite;
	};

	context.color = function (props) {
		var colorProp = props['{' + DavClient.NS_APPLE + '}calendar-color'];
		var fallbackColor = constants.fallbackColor;

		if (angular.isString(colorProp) && colorProp.length > 0) {
			if (colorProp.length === 9) {
				return colorProp.substr(0, 7);
			}
			return colorProp;
		} else {
			return fallbackColor;
		}
	};

	context.components = function (props) {
		var components = props['{' + DavClient.NS_IETF + '}supported-calendar-component-set'] || [];
		var simpleComponents = {
			vevent: false,
			vjournal: false,
			vtodo: false
		};

		components.forEach(function (component) {
			var name = component.attributes.getNamedItem('name').textContent.toLowerCase();

			if (simpleComponents.hasOwnProperty(name)) {
				simpleComponents[name] = true;
			}
		});

		return simpleComponents;
	};

	context.displayname = function (props) {
		return props['{' + DavClient.NS_DAV + '}displayname'];
	};

	context.enabled = function (props, owner, currentUser) {
		if (!angular.isDefined(props['{' + DavClient.NS_OWNCLOUD + '}calendar-enabled'])) {
			if (owner) {
				return owner === currentUser;
			} else {
				return false;
			}
		} else {
			return props['{' + DavClient.NS_OWNCLOUD + '}calendar-enabled'] === '1';
		}
	};

	context.order = function (props) {
		var prop = props['{' + DavClient.NS_APPLE + '}calendar-order'];
		return prop ? parseInt(prop) : undefined;
	};

	context.owner = function (props) {
		var ownerProperty = props['{' + DavClient.NS_DAV + '}owner'];
		if (Array.isArray(ownerProperty) && ownerProperty.length !== 0) {
			var owner = ownerProperty[0].textContent.slice(0, -1);
			var index = owner.indexOf('/remote.php/dav/principals/users/');
			if (index !== -1) {
				return owner.substr(index + 33);
			}
		}

		return null;
	};

	context.sharesAndOwnerDisplayname = function (props, owner) {
		var shareProp = props['{' + DavClient.NS_OWNCLOUD + '}invite'];
		var shares = {
			users: [],
			groups: [],
			circles: []
		};
		var ownerDisplayname = null;

		var ownerDisplaynameProp = props['{' + DavClient.NS_NEXTCLOUD + '}owner-displayname'];
		if (ownerDisplaynameProp) {
			ownerDisplayname = ownerDisplaynameProp;
		}

		if (!Array.isArray(shareProp)) {
			return [shares, ownerDisplayname];
		}

		shareProp.forEach(function (share) {
			var href = share.getElementsByTagNameNS(DavClient.NS_DAV, 'href');
			if (href.length === 0) {
				return;
			}
			href = href[0].textContent;

			var displayName = share.getElementsByTagNameNS(DavClient.NS_OWNCLOUD, 'common-name');
			if (displayName.length === 0) {
				if (href.startsWith(SHARE_USER_PREFIX)) {
					displayName = href.substr(SHARE_USER_PREFIX.length);
				} else if (href.startsWith(SHARE_GROUP_PREFIX)) {
					displayName = href.substr(SHARE_GROUP_PREFIX.length);
				} else {
					displayName = href.substr(SHARE_CIRCLE_PREFIX.length);
				}
			} else {
				displayName = displayName[0].textContent;
			}

			var access = share.getElementsByTagNameNS(DavClient.NS_OWNCLOUD, 'access');
			if (access.length === 0) {
				return;
			}
			access = access[0];

			var writable = access.getElementsByTagNameNS(DavClient.NS_OWNCLOUD, 'read-write');
			writable = writable.length !== 0;

			if (href.startsWith(SHARE_USER_PREFIX)) {
				if (href.substr(SHARE_USER_PREFIX.length) === owner) {
					if (!ownerDisplayname) {
						ownerDisplayname = displayName;
					}
				} else {
					shares.users.push({
						id: href.substr(SHARE_USER_PREFIX.length),
						displayname: displayName,
						writable: writable
					});
				}
			} else if (href.startsWith(SHARE_GROUP_PREFIX)) {
				shares.groups.push({
					id: href.substr(SHARE_GROUP_PREFIX.length),
					displayname: displayName,
					writable: writable
				});
			} else if (href.startsWith(SHARE_CIRCLE_PREFIX)) {
				shares.circles.push({
					id: href.substr(SHARE_CIRCLE_PREFIX.length),
					displayname: displayName,
					writable: writable
				});
			}
		});

		return [shares, ownerDisplayname];
	};

	context.shareableAndPublishable = function (props, writable, publicMode) {
		var shareable = false;
		var publishable = false;

		if (publicMode || !writable) {
			return [shareable, publishable];
		}

		var sharingModesProp = props['{' + DavClient.NS_CALENDARSERVER + '}allowed-sharing-modes'];
		if (!Array.isArray(sharingModesProp) || sharingModesProp.length === 0) {
			return [writable, publishable];
		}

		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = sharingModesProp[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var shareMode = _step.value;

				shareable = shareable || shareMode.localName === 'can-be-shared';
				publishable = publishable || shareMode.localName === 'can-be-published';
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		return [shareable, publishable];
	};

	context.publishedAndPublicToken = function (props) {
		var published = false;
		var publicToken = null;

		if (angular.isDefined(props['{' + DavClient.NS_CALENDARSERVER + '}publish-url'])) {
			published = true;
			var publishURL = props['{' + DavClient.NS_CALENDARSERVER + '}publish-url'][0].textContent;
			if (publishURL.substr(-1) === '/') {
				publishURL = publishURL.substr(0, publishURL.length - 1);
			}

			var lastIndexOfSlash = publishURL.lastIndexOf('/');
			publicToken = publishURL.substr(lastIndexOfSlash + 1);
		}

		return [published, publicToken];
	};

	context.webcal = function (props) {
		var sourceProp = props['{' + DavClient.NS_CALENDARSERVER + '}source'];

		if (Array.isArray(sourceProp)) {
			var source = sourceProp.find(function (source) {
				return DavClient.getNodesFullName(source) === '{' + DavClient.NS_DAV + '}href';
			});

			return source ? source.textContent : null;
		} else {
			return null;
		}
	};

	context.calendarSkeleton = function (props, userPrincipal, publicMode) {
		var simple = {};
		var currentUser = context.getUserFromUserPrincipal(userPrincipal);

		simple.color = context.color(props);
		simple.displayname = context.displayname(props);
		simple.components = context.components(props);
		simple.order = context.order(props);

		simple.writable = context.acl(props, userPrincipal);
		simple.owner = context.owner(props);
		simple.enabled = context.enabled(props, simple.owner, currentUser);

		var _context$sharesAndOwn = context.sharesAndOwnerDisplayname(props, simple.owner),
		    _context$sharesAndOwn2 = _slicedToArray(_context$sharesAndOwn, 2),
		    shares = _context$sharesAndOwn2[0],
		    ownerDisplayname = _context$sharesAndOwn2[1];

		simple.shares = shares;
		simple.ownerDisplayname = ownerDisplayname;

		var _context$shareableAnd = context.shareableAndPublishable(props, simple.writable, publicMode),
		    _context$shareableAnd2 = _slicedToArray(_context$shareableAnd, 2),
		    shareable = _context$shareableAnd2[0],
		    publishable = _context$shareableAnd2[1];

		simple.shareable = shareable;
		simple.publishable = publishable;

		if (simple.owner !== currentUser && !constants.shareeCanEditShares) {
			simple.shareable = false;
			simple.publishable = false;
		}

		var _context$publishedAnd = context.publishedAndPublicToken(props),
		    _context$publishedAnd2 = _slicedToArray(_context$publishedAnd, 2),
		    published = _context$publishedAnd2[0],
		    publicToken = _context$publishedAnd2[1];

		simple.published = published;
		simple.publicToken = publicToken;

		if (publicMode) {
			simple.enabled = true;
			simple.writable = false;
			simple.color = constants.fallbackColor;
		}

		if (publicMode) {
			simple.writableProperties = false;
		} else if (simple.owner === currentUser) {
			simple.writableProperties = simple.writable;
		} else {
			simple.writableProperties = constants.shareeCanEditCalendarProperties || false;
		}

		return simple;
	};

	context.getUserFromUserPrincipal = function (userPrincipal) {
		if (userPrincipal.endsWith('/')) {
			userPrincipal = userPrincipal.slice(0, -1);
		}

		var slashIndex = userPrincipal.lastIndexOf('/');
		return userPrincipal.substr(slashIndex + 1);
	};

	this.calendar = function (CalendarService, body, userPrincipal) {
		var publicMode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

		var href = body.href;
		var props = body.propStat[0].properties;

		var simple = context.calendarSkeleton(props, userPrincipal, publicMode);
		return Calendar(CalendarService, href, simple);
	};

	this.webcal = function (CalendarService, body, userPrincipal) {
		var publicMode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

		var href = body.href;
		var props = body.propStat[0].properties;
		var currentUser = context.getUserFromUserPrincipal(userPrincipal);

		var simple = context.calendarSkeleton(props, userPrincipal, publicMode);
		simple.href = context.webcal(props);

		simple.writable = false;
		simple.writableProperties = currentUser === simple.owner;

		simple.publishable = false;
		simple.shareable = false;

		return WebCal(CalendarService, href, simple);
	};
}]);
'use strict';


app.service('ICalFactory', ["constants", function (constants) {
	'use strict';

	var self = this;

	this.new = function () {
		var root = new ICAL.Component(['vcalendar', [], []]);

		root.updatePropertyWithValue('prodid', '-//Nextcloud calendar v' + constants.version);
		root.updatePropertyWithValue('version', '2.0');
		root.updatePropertyWithValue('calscale', 'GREGORIAN');

		return root;
	};

	this.newEvent = function (uid) {
		var comp = self.new();

		var event = new ICAL.Component('vevent');
		comp.addSubcomponent(event);

		event.updatePropertyWithValue('created', ICAL.Time.now());
		event.updatePropertyWithValue('dtstamp', ICAL.Time.now());
		event.updatePropertyWithValue('last-modified', ICAL.Time.now());
		event.updatePropertyWithValue('uid', uid);

		event.updatePropertyWithValue('dtstart', ICAL.Time.now());

		return comp;
	};
}]);
'use strict';


app.directive('avatar', function () {
  'use strict';

  return {
    restrict: 'A',
    scope: {},
    link: function link(scope, elm, attrs) {
      var size = attrs.size ? parseInt(attrs.size, 10) : 32;
      $(elm).avatar(attrs.user, size);
    }
  };
});
'use strict';

app.directive('colorpicker', ["ColorUtility", function (ColorUtility) {
  'use strict';

  return {
    scope: {
      selected: '=',
      customizedColors: '=colors'
    },
    restrict: 'AE',
    templateUrl: OC.filePath('calendar', 'templates', 'colorpicker.html'),
    link: function link(scope, element, attr) {
      scope.colors = scope.customizedColors || ColorUtility.colors;
      scope.selected = scope.selected || scope.colors[0];
      scope.random = "#000000";

      var inputElement = document.createElement('input');
      inputElement.setAttribute('type', 'color');
      scope.supportsColorPicker = inputElement.type === 'color';

      scope.randomizeColour = function () {
        scope.random = ColorUtility.randomColor();
        scope.pick(scope.random);
      };

      scope.pick = function (color) {
        scope.selected = color;
      };
    }
  };
}]);
'use strict';


app.directive('confirmation', function () {
	'use strict';

	return {
		priority: -1,
		restrict: 'A',
		templateUrl: 'confirmation.html',
		scope: {
			confirmationFunction: "&confirmation",
			confirmationMessage: "&confirmationMessage"

		},
		controller: 'ConfirmationController'
	};
});

app.controller('ConfirmationController', ['$scope', '$rootScope', '$element', '$attrs', '$compile', '$document', '$window', '$timeout', function ($scope, $rootScope, $element, $attrs, $compile, $document, $window, $timeout) {
	'use strict';

	var ConfirmationController = function () {
		function ConfirmationController(_$scope, $rootScope, $element, $attrs, $compile, $document, $window, $timeout) {
			this._$scope = _$scope;
			this._$scope.countdown = 3;

			$element.bind('click', function (e) {
				_$scope.countdown = 3;
				$element.removeClass('active');
				var message = _$scope.confirmationMessage() ? _$scope.confirmationMessage() : "Are you sure?";
				if ($element.hasClass('confirmed')) {
					return;
				}
				e.stopPropagation();
				_$scope.activate();
				$element.children('.confirmation-confirm').tooltip({ title: message, container: 'body', placement: 'right' });
				$element.addClass("confirmed");
			});

			$element.children('.confirmation-confirm').bind('click', function (e) {
				if ($element.hasClass('confirmed active')) {
					_$scope.confirmationFunction();
					return;
				} else {
					e.stopPropagation();
				}
			});

			this._$scope.documentClick = function () {
				$element.removeClass("confirmed");
			};

			this._$scope.activate = function () {
				if (_$scope.countdown) {
					$element.find('.countdown').html(_$scope.countdown + ' s');
					$timeout(function () {
						_$scope.activate();
					}, 1000);
					_$scope.countdown--;
				} else {
					$element.addClass('active');
				}
			};

			$document.bind('click', _$scope.documentClick);
			$document.bind('touchend', _$scope.documentClick);

			$scope.$on('$destroy', function () {
				$document.unbind('click', _$scope.documentClick);
				$document.unbind('touchend', _$scope.documentClick);
			});
		}
		return ConfirmationController;
	}();
	return new ConfirmationController($scope, $rootScope, $element, $attrs, $compile, $document, $window, $timeout);
}]);
'use strict';

app.directive('ocdatetimepicker', ["$compile", "$timeout", function ($compile, $timeout) {
	'use strict';

	return {
		restrict: 'E',
		require: 'ngModel',
		scope: {
			disabletime: '=disabletime',
			date_tabindex: '=datetabindex',
			time_tabindex: '=timetabindex',
			readonly: '=readonly'
		},
		link: function link(scope, element, attrs, ngModelCtrl) {
			var templateHTML = '<input type="text" ng-model="date" class="events--date" tabindex="{{ date_tabindex }}"/>';
			templateHTML += '<span class="events--time--wrapper" ng-click="disableAllDayIfNecessary()"><input type="text" ng-model="time" class="events--time" ng-disabled="disabletime" tabindex="{{ time_tabindex }}"/></span>';
			var template = angular.element(templateHTML);

			scope.date = null;
			scope.time = null;
			scope.disableAllDayIfNecessary = function () {
				if (scope.disabletime && !scope.readonly) {
					$timeout(function () {
						scope.$apply(function () {
							scope.disabletime = false;
						});
						element.find('.events--time').timepicker('show');
					});
				}
			};

			$compile(template)(scope);
			element.append(template);

			function updateFromUserInput() {
				var date = element.find('.events--date').datepicker('getDate'),
				    hours = 0,
				    minutes = 0;

				if (!scope.disabletime) {
					hours = element.find('.events--time').timepicker('getHour');
					minutes = element.find('.events--time').timepicker('getMinute');
				}

				var m = moment(date);
				m.hours(hours);
				m.minutes(minutes);
				m.seconds(0);

				element.find('.events--time').timepicker('hide');
				ngModelCtrl.$setViewValue(m);
			}

			var localeData = moment.localeData();
			function initDatePicker() {
				element.find('.events--date').datepicker({
					dateFormat: localeData.longDateFormat('L').toLowerCase().replace('yy', 'y').replace('yyy', 'yy'),
					monthNames: moment.months(),
					monthNamesShort: moment.monthsShort(),
					dayNames: moment.weekdays(),
					dayNamesMin: moment.weekdaysMin(),
					dayNamesShort: moment.weekdaysShort(),
					firstDay: +localeData.firstDayOfWeek(),
					minDate: null,
					showOtherMonths: true,
					selectOtherMonths: true,
					onClose: updateFromUserInput
				});
			}
			function initTimepicker() {
				element.find('.events--time').timepicker({
					showPeriodLabels: localeData.longDateFormat('LT').toLowerCase().indexOf('a') !== -1,
					showLeadingZero: true,
					showPeriod: localeData.longDateFormat('LT').toLowerCase().indexOf('a') !== -1,
					duration: 0,
					onClose: updateFromUserInput
				});
			}

			initDatePicker();
			initTimepicker();

			scope.$watch(function () {
				return ngModelCtrl.$modelValue;
			}, function (value) {
				if (moment.isMoment(value)) {
					element.find('.events--date').datepicker('setDate', value.toDate());
					element.find('.events--time').timepicker('setTime', value.toDate());
				}
			});
			element.on('$destroy', function () {
				element.find('.events--date').datepicker('destroy');
				element.find('.events--time').timepicker('destroy');
			});
		}
	};
}]);
'use strict';


app.constant('fc', {}).directive('fc', ["fc", "$window", function (fc, $window) {
	'use strict';

	return {
		restrict: 'A',
		scope: {},
		link: function link(scope, elm, attrs) {
			var localeData = moment.localeData();
			var englishFallback = moment.localeData('en');

			var monthNames = [];
			var monthNamesShort = [];
			for (var i = 0; i < 12; i++) {
				var monthName = localeData.months(moment([0, i]), '');
				var shortMonthName = localeData.monthsShort(moment([0, i]), '');

				if (monthName) {
					monthNames.push(monthName);
				} else {
					monthNames.push(englishFallback.months(moment([0, i]), ''));
				}

				if (shortMonthName) {
					monthNamesShort.push(shortMonthName);
				} else {
					monthNamesShort.push(englishFallback.monthsShort(moment([0, i]), ''));
				}
			}

			var dayNames = [];
			var dayNamesShort = [];
			var momentWeekHelper = moment().startOf('week');
			momentWeekHelper.subtract(momentWeekHelper.format('d'));
			for (var _i = 0; _i < 7; _i++) {
				var dayName = localeData.weekdays(momentWeekHelper);
				var shortDayName = localeData.weekdaysShort(momentWeekHelper);

				if (dayName) {
					dayNames.push(dayName);
				} else {
					dayNames.push(englishFallback.weekdays(momentWeekHelper));
				}

				if (shortDayName) {
					dayNamesShort.push(shortDayName);
				} else {
					dayNamesShort.push(englishFallback.weekdaysShort(momentWeekHelper));
				}

				momentWeekHelper.add(1, 'days');
			}

			var firstDay = +moment().startOf('week').format('d');

			var headerSize = angular.element('#header').height();
			var windowElement = angular.element($window);
			windowElement.bind('resize', _.debounce(function () {
				var newHeight = windowElement.height() - headerSize;
				fc.elm.fullCalendar('option', 'height', newHeight);
			}, 150));

			var isPublic = attrs.ispublic === '1';

			var baseConfig = {
				dayNames: dayNames,
				dayNamesShort: dayNamesShort,
				defaultView: attrs.initialView,
				editable: !isPublic,
				firstDay: firstDay,
				forceEventDuration: true,
				header: false,
				height: windowElement.height() - headerSize,
				locale: moment.locale(),
				monthNames: monthNames,
				monthNamesShort: monthNamesShort,
				nowIndicator: true,
				weekNumbers: attrs.weeknumbers === 'yes',
				weekNumbersWithinDays: true,
				selectable: !isPublic,
				agendaEventMinHeight: 21
			};
			var controllerConfig = scope.$parent.fcConfig;
			var config = angular.extend({}, baseConfig, controllerConfig);

			fc.elm = $(elm).fullCalendar(config);
		}
	};
}]);
'use strict';



app.directive('loading', [function () {
  'use strict';

  return {
    restrict: 'E',
    replace: true,
    template: "<div id='loading' class='icon-loading'></div>",
    link: function link($scope, element, attr) {
      $scope.$watch('loading', function (val) {
        if (val) {
          $(element).show();
        } else {
          $(element).hide();
        }
      });
    }
  };
}]);
'use strict';



app.directive('openDialog', function () {
  'use strict';

  return {
    restrict: 'A',
    link: function link(scope, elem, attr, ctrl) {
      var dialogId = '#' + attr.openDialog;
      elem.bind('click', function (e) {
        $(dialogId).dialog('open');
      });
    }
  };
});
'use strict';


app.directive('onToggleShow', function () {
  'use strict';

  return {
    restrict: 'A',
    scope: {
      'onToggleShow': '@'
    },
    link: function link(scope, elem) {
      elem.click(function () {
        var target = $(scope.onToggleShow);
        target.toggle();
      });

      scope.$on('documentClicked', function (s, event) {
        var target = $(scope.onToggleShow);

        if (event.target !== elem[0]) {
          target.hide();
        }
      });
    }
  };
});
'use strict';

app.filter('calendarListFilter', ["CalendarListItem", function (CalendarListItem) {
  'use strict';

  return function (calendarListItems) {
    if (!Array.isArray(calendarListItems)) {
      return [];
    }

    return calendarListItems.filter(function (item) {
      if (!CalendarListItem.isCalendarListItem(item)) {
        return false;
      }
      return item.calendar.isWritable();
    });
  };
}]);
'use strict';

app.filter('subscriptionListFilter', ["CalendarListItem", function (CalendarListItem) {
  'use strict';

  return function (calendarListItems) {
    if (!Array.isArray(calendarListItems)) {
      return [];
    }

    return calendarListItems.filter(function (item) {
      if (!CalendarListItem.isCalendarListItem(item)) {
        return false;
      }
      return !item.calendar.isWritable();
    });
  };
}]);
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };


app.filter('attendeeFilter', function () {
  'use strict';

  return function (attendee) {
    if ((typeof attendee === 'undefined' ? 'undefined' : _typeof(attendee)) !== 'object' || !attendee) {
      return '';
    } else if (_typeof(attendee.parameters) === 'object' && typeof attendee.parameters.cn === 'string') {
      return attendee.parameters.cn;
    } else if (typeof attendee.value === 'string' && attendee.value.toLowerCase().startsWith('mailto:')) {
      return attendee.value.substr(7);
    } else {
      return attendee.value || '';
    }
  };
});
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

app.filter('attendeeNotOrganizerFilter', function () {
  'use strict';

  return function (attendees, organizer) {
    if (typeof organizer !== 'string' || organizer === '') {
      return Array.isArray(attendees) ? attendees : [];
    }

    if (!Array.isArray(attendees)) {
      return [];
    }

    var organizerValue = 'mailto:' + organizer.toLowerCase();
    return attendees.filter(function (element) {
      if ((typeof element === 'undefined' ? 'undefined' : _typeof(element)) !== 'object') {
        return false;
      } else {
        return element.value.toLowerCase() !== organizerValue;
      }
    });
  };
});
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

app.filter('calendarFilter', function () {
  'use strict';

  return function (calendars) {
    if (!Array.isArray(calendars)) {
      return [];
    }

    return calendars.filter(function (element) {
      if ((typeof element === 'undefined' ? 'undefined' : _typeof(element)) !== 'object') {
        return false;
      } else {
        return element.isWritable();
      }
    });
  };
});
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

app.filter('calendarSelectorFilter', function () {
  'use strict';

  return function (calendars, calendar) {
    if (!Array.isArray(calendars)) {
      return [];
    }

    var options = calendars.filter(function (c) {
      return c.isWritable();
    });

    if ((typeof calendar === 'undefined' ? 'undefined' : _typeof(calendar)) !== 'object' || !calendar) {
      return options;
    }

    if (!calendar.isWritable()) {
      return [calendar];
    } else {
      if (options.indexOf(calendar) === -1) {
        options.push(calendar);
      }

      return options;
    }
  };
});
'use strict';

app.filter('datepickerFilter', function () {
  'use strict';

  return function (datetime, view) {
    if (!(datetime instanceof Date) || typeof view !== 'string') {
      return '';
    }

    switch (view) {
      case 'agendaDay':
        return moment(datetime).format('ll');

      case 'agendaWeek':
        return t('calendar', 'Week {number} of {year}', {
          number: moment(datetime).week(),
          year: moment(datetime).year()
        });

      case 'month':
        return moment(datetime).format('MMMM YYYY');

      default:
        return '';
    }
  };
});
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

app.filter('importCalendarFilter', function () {
  'use strict';

  return function (calendars, file) {
    if (!Array.isArray(calendars) || (typeof file === 'undefined' ? 'undefined' : _typeof(file)) !== 'object' || !file || _typeof(file.splittedICal) !== 'object' || !file.splittedICal) {
      return [];
    }

    var events = file.splittedICal.vevents.length,
        journals = file.splittedICal.vjournals.length,
        todos = file.splittedICal.vtodos.length;

    return calendars.filter(function (calendar) {
      if (events !== 0 && !calendar.components.vevent) {
        return false;
      }
      if (journals !== 0 && !calendar.components.vjournal) {
        return false;
      }
      if (todos !== 0 && !calendar.components.vtodo) {
        return false;
      }

      return true;
    });
  };
});
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

app.filter('importErrorFilter', function () {
	'use strict';

	return function (file) {
		if ((typeof file === 'undefined' ? 'undefined' : _typeof(file)) !== 'object' || !file || typeof file.errors !== 'number') {
			return '';
		}

		var all = file.progressToReach;
		var errors = file.errors - file.duplicates;
		var duplicates = file.duplicates;
		var imported = all - file.errors;

		if (file.errors === 0) {
			return t('calendar', 'Successfully imported {imported} objects', { imported: imported });
		} else if (file.errors === 1) {
			if (file.duplicates === 1) {
				return t('calendar', 'Imported {imported} out of {all}, skipped one duplicate', { all: all, imported: imported });
			} else {
				return t('calendar', 'Imported {imported} out of {all}, one failure', { all: all, imported: imported });
			}
		} else {
			if (file.duplicates === 0) {
				return t('calendar', 'Imported {imported} out of {all}, {errors} failures', { all: all, errors: errors, imported: imported });
			} else if (file.duplicates === file.errors) {
				return t('calendar', 'Imported {imported} out of {all}, skipped {duplicates} duplicates', { all: all, duplicates: duplicates, imported: imported });
			} else {
				return t('calendar', 'Imported {imported} out of {all}, {errors} failures, skipped {duplicates} duplicates', { all: all, duplicates: duplicates, errors: errors, imported: imported });
			}
		}
	};
});
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };


app.filter('simpleReminderDescription', function () {
	'use strict';

	return function (alarm) {
		if ((typeof alarm === 'undefined' ? 'undefined' : _typeof(alarm)) !== 'object' || !alarm || _typeof(alarm.trigger) !== 'object' || !alarm.trigger) {
			return '';
		}

		var relative = alarm.trigger.type === 'duration';
		var relatedToStart = alarm.trigger.related === 'start';
		if (relative) {
			var timeString = moment.duration(Math.abs(alarm.trigger.value), 'seconds').humanize();
			if (alarm.trigger.value < 0) {
				if (relatedToStart) {
					switch (alarm.action.value) {
						case 'AUDIO':
							return t('calendar', 'Audio alarm {time} before the event starts', { time: timeString });

						case 'DISPLAY':
							return t('calendar', 'Pop-up {time} before the event starts', { time: timeString });

						case 'EMAIL':
							return t('calendar', 'Email {time} before the event starts', { time: timeString });

						case 'NONE':
							return t('calendar', 'None {time} before the event starts', { time: timeString });

						default:
							return t('calendar', '{type} {time} before the event starts', { type: alarm.action.value, time: timeString });
					}
				} else {
					switch (alarm.action.value) {
						case 'AUDIO':
							return t('calendar', 'Audio alarm {time} before the event ends', { time: timeString });

						case 'DISPLAY':
							return t('calendar', 'Pop-up {time} before the event ends', { time: timeString });

						case 'EMAIL':
							return t('calendar', 'Email {time} before the event ends', { time: timeString });

						case 'NONE':
							return t('calendar', 'None {time} before the event ends', { time: timeString });

						default:
							return t('calendar', '{type} {time} before the event ends', { type: alarm.action.value, time: timeString });
					}
				}
			} else if (alarm.trigger.value > 0) {
				if (relatedToStart) {
					switch (alarm.action.value) {
						case 'AUDIO':
							return t('calendar', 'Audio alarm {time} after the event starts', { time: timeString });

						case 'DISPLAY':
							return t('calendar', 'Pop-up {time} after the event starts', { time: timeString });

						case 'EMAIL':
							return t('calendar', 'Email {time} after the event starts', { time: timeString });

						case 'NONE':
							return t('calendar', 'None {time} after the event starts', { time: timeString });

						default:
							return t('calendar', '{type} {time} after the event starts', { type: alarm.action.value, time: timeString });
					}
				} else {
					switch (alarm.action.value) {
						case 'AUDIO':
							return t('calendar', 'Audio alarm {time} after the event ends', { time: timeString });

						case 'DISPLAY':
							return t('calendar', 'Pop-up {time} after the event ends', { time: timeString });

						case 'EMAIL':
							return t('calendar', 'Email {time} after the event ends', { time: timeString });

						case 'NONE':
							return t('calendar', 'None {time} after the event ends', { time: timeString });

						default:
							return t('calendar', '{type} {time} after the event ends', { type: alarm.action.value, time: timeString });
					}
				}
			} else {
				if (relatedToStart) {
					switch (alarm.action.value) {
						case 'AUDIO':
							return t('calendar', 'Audio alarm at the event\'s start');

						case 'DISPLAY':
							return t('calendar', 'Pop-up at the event\'s start');

						case 'EMAIL':
							return t('calendar', 'Email at the event\'s start');

						case 'NONE':
							return t('calendar', 'None at the event\'s start');

						default:
							return t('calendar', '{type} at the event\'s start', { type: alarm.action.value });
					}
				} else {
					switch (alarm.action.value) {
						case 'AUDIO':
							return t('calendar', 'Audio alarm at the event\'s end');

						case 'DISPLAY':
							return t('calendar', 'Pop-up at the event\'s end');

						case 'EMAIL':
							return t('calendar', 'Email at the event\'s end');

						case 'NONE':
							return t('calendar', 'None at the event\'s end');

						default:
							return t('calendar', '{type} at the event\'s end', { type: alarm.action.value });
					}
				}
			}
		} else {
			if (alarm.editor && moment.isMoment(alarm.editor.absMoment)) {
				switch (alarm.action.value) {
					case 'AUDIO':
						return t('calendar', 'Audio alarm at {time}', { time: alarm.editor.absMoment.format('LLLL') });

					case 'DISPLAY':
						return t('calendar', 'Pop-up at {time}', { time: alarm.editor.absMoment.format('LLLL') });

					case 'EMAIL':
						return t('calendar', 'Email at {time}', { time: alarm.editor.absMoment.format('LLLL') });

					case 'NONE':
						return t('calendar', 'None at {time}', { time: alarm.editor.absMoment.format('LLLL') });

					default:
						return t('calendar', '{type} at {time}', {
							type: alarm.action.value,
							time: alarm.editor.absMoment.format('LLLL')
						});
				}
			} else {
				return '';
			}
		}
	};
});
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };


app.filter('subscriptionFilter', function () {
  'use strict';

  return function (calendars) {
    if (!Array.isArray(calendars)) {
      return [];
    }

    return calendars.filter(function (element) {
      if ((typeof element === 'undefined' ? 'undefined' : _typeof(element)) !== 'object') {
        return false;
      } else {
        return !element.isWritable();
      }
    });
  };
});
'use strict';


app.filter('timezoneFilter', ['$filter', function ($filter) {
  'use strict';

  return function (timezone) {
    if (typeof timezone !== 'string') {
      return '';
    }

    timezone = timezone.split('_').join(' ');

    var elements = timezone.split('/');
    if (elements.length === 1) {
      return elements[0];
    } else {
      var continent = elements[0];
      var city = $filter('timezoneWithoutContinentFilter')(elements.slice(1).join('/'));

      return city + ' (' + continent + ')';
    }
  };
}]);
'use strict';


app.filter('timezoneWithoutContinentFilter', function () {
  'use strict';

  return function (timezone) {
    timezone = timezone.split('_').join(' ');
    timezone = timezone.replace('St ', 'St. ');

    return timezone.split('/').join(' - ');
  };
});
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

app.factory('ImportFileWrapper', ["Hook", "ICalSplitterUtility", function (Hook, ICalSplitterUtility) {
	'use strict';

	function ImportFileWrapper(file) {
		var context = {
			file: file,
			splittedICal: null,
			selectedCalendar: null,
			state: 0,
			errors: 0,
			progress: 0,
			progressToReach: -1
		};
		var iface = {
			duplicates: 0,
			_isAImportFileWrapperObject: true
		};

		context.checkIsDone = function () {
			if (context.progress === context.progressToReach) {
				context.state = ImportFileWrapper.stateDone;
				iface.emit(ImportFileWrapper.hookDone);
			}
		};

		Object.defineProperties(iface, {
			file: {
				get: function get() {
					return context.file;
				}
			},
			splittedICal: {
				get: function get() {
					return context.splittedICal;
				}
			},
			selectedCalendar: {
				get: function get() {
					return context.selectedCalendar;
				},
				set: function set(selectedCalendar) {
					context.selectedCalendar = selectedCalendar;
				}
			},
			state: {
				get: function get() {
					return context.state;
				},
				set: function set(state) {
					if (typeof state === 'number') {
						context.state = state;
					}
				}
			},
			errors: {
				get: function get() {
					return context.errors;
				},
				set: function set(errors) {
					if (typeof errors === 'number') {
						var oldErrors = context.errors;
						context.errors = errors;
						iface.emit(ImportFileWrapper.hookErrorsChanged, errors, oldErrors);
					}
				}
			},
			progress: {
				get: function get() {
					return context.progress;
				},
				set: function set(progress) {
					if (typeof progress === 'number') {
						var oldProgress = context.progress;
						context.progress = progress;
						iface.emit(ImportFileWrapper.hookProgressChanged, progress, oldProgress);

						context.checkIsDone();
					}
				}
			},
			progressToReach: {
				get: function get() {
					return context.progressToReach;
				}
			}
		});

		iface.wasCanceled = function () {
			return context.state === ImportFileWrapper.stateCanceled;
		};

		iface.isAnalyzing = function () {
			return context.state === ImportFileWrapper.stateAnalyzing;
		};

		iface.isAnalyzed = function () {
			return context.state === ImportFileWrapper.stateAnalyzed;
		};

		iface.isScheduled = function () {
			return context.state === ImportFileWrapper.stateScheduled;
		};

		iface.isImporting = function () {
			return context.state === ImportFileWrapper.stateImporting;
		};

		iface.isDone = function () {
			return context.state === ImportFileWrapper.stateDone;
		};

		iface.hasErrors = function () {
			return context.errors > 0;
		};

		iface.isEmpty = function () {
			return iface.state === ImportFileWrapper.stateEmpty;
		};
		iface.hasParsingErrors = function () {
			return iface.state === ImportFileWrapper.stateParsingError;
		};

		iface.read = function (afterReadCallback) {
			var reader = new FileReader();

			reader.onload = function (event) {
				try {
					context.splittedICal = ICalSplitterUtility.split(event.target.result);
				} catch (e) {
					context.splittedICal = {
						vevents: [],
						vjournals: [],
						vtodos: []
					};
					context.progressToReach = 0;

					iface.state = ImportFileWrapper.stateParsingError;
					iface.emit(ImportFileWrapper.hookDone);
					return;
				}

				context.progressToReach = context.splittedICal.vevents.length + context.splittedICal.vjournals.length + context.splittedICal.vtodos.length;

				if (context.progressToReach === 0) {
					iface.state = ImportFileWrapper.stateEmpty;
					iface.emit(ImportFileWrapper.hookDone);
				} else {
					iface.state = ImportFileWrapper.stateAnalyzed;
					afterReadCallback();
				}
			};

			reader.readAsText(file);
		};

		Object.assign(iface, Hook(context));

		return iface;
	}

	ImportFileWrapper.isImportWrapper = function (obj) {
		return obj instanceof ImportFileWrapper || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null && obj._isAImportFileWrapperObject !== null;
	};

	ImportFileWrapper.stateParsingError = -3;
	ImportFileWrapper.stateEmpty = -2;
	ImportFileWrapper.stateCanceled = -1;
	ImportFileWrapper.stateAnalyzing = 0;
	ImportFileWrapper.stateAnalyzed = 1;
	ImportFileWrapper.stateScheduled = 2;
	ImportFileWrapper.stateImporting = 3;
	ImportFileWrapper.stateDone = 4;

	ImportFileWrapper.hookProgressChanged = 1;
	ImportFileWrapper.hookDone = 2;
	ImportFileWrapper.hookErrorsChanged = 3;

	return ImportFileWrapper;
}]);
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };


app.factory('CalendarListItem', ["$rootScope", "$window", "Calendar", "WebCal", "isSharingAPI", function ($rootScope, $window, Calendar, WebCal, isSharingAPI) {
	'use strict';

	function CalendarListItem(calendar) {
		var context = {
			calendar: calendar,
			isEditingShares: false,
			isEditingProperties: false,
			isDisplayingCalDAVUrl: false,
			isDisplayingWebCalUrl: false,
			isSendingMail: false
		};
		var iface = {
			_isACalendarListItemObject: true
		};

		if (!Calendar.isCalendar(calendar)) {
			return null;
		}

		Object.defineProperties(iface, {
			calendar: {
				get: function get() {
					return context.calendar;
				}
			},
			publicSharingURL: {
				get: function get() {
					var displayname = context.calendar.displayname.replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');

					if (displayname === '') {
						return $rootScope.root + 'p/' + context.calendar.publicToken;
					} else {
						return $rootScope.root + 'p/' + context.calendar.publicToken + '/' + displayname;
					}
				}
			},
			publicEmbedURL: {
				get: function get() {
					return $rootScope.root + 'embed/' + context.calendar.publicToken;
				}
			}
		});

		iface.displayCalDAVUrl = function () {
			return context.isDisplayingCalDAVUrl;
		};

		iface.showCalDAVUrl = function () {
			context.isDisplayingCalDAVUrl = true;
		};

		iface.displayWebCalUrl = function () {
			return context.isDisplayingWebCalUrl;
		};

		iface.hideCalDAVUrl = function () {
			context.isDisplayingCalDAVUrl = false;
		};

		iface.showWebCalUrl = function () {
			context.isDisplayingWebCalUrl = true;
		};

		iface.hideWebCalUrl = function () {
			context.isDisplayingWebCalUrl = false;
		};

		iface.showSharingIcon = function () {
			var isCalendarShareable = context.calendar.isShareable();
			var isCalendarShared = context.calendar.isShared();
			var isCalendarPublishable = context.calendar.isPublishable();

			if (isCalendarPublishable) {
				return true;
			}

			if (!isSharingAPI && isCalendarShared && isCalendarShareable) {
				return true;
			}

			return isSharingAPI && isCalendarShareable;
		};

		iface.isEditingShares = function () {
			return context.isEditingShares;
		};

		iface.isSendingMail = function () {
			return context.isSendingMail;
		};

		iface.toggleEditingShares = function () {
			context.isEditingShares = !context.isEditingShares;
		};

		iface.toggleSendingMail = function () {
			context.isSendingMail = !context.isSendingMail;
		};

		iface.isEditing = function () {
			return context.isEditingProperties;
		};

		iface.displayActions = function () {
			return !iface.isEditing();
		};

		iface.displayColorIndicator = function () {
			return !iface.isEditing() && !context.calendar.isRendering();
		};

		iface.displaySpinner = function () {
			return !iface.isEditing() && context.calendar.isRendering();
		};

		iface.openEditor = function () {
			iface.color = context.calendar.color;
			iface.displayname = context.calendar.displayname;

			context.isEditingProperties = true;
		};

		iface.cancelEditor = function () {
			iface.color = '';
			iface.displayname = '';

			context.isEditingProperties = false;
		};

		iface.saveEditor = function () {
			context.calendar.color = iface.color;
			context.calendar.displayname = iface.displayname;

			iface.color = '';
			iface.displayname = '';

			context.isEditingProperties = false;
		};

		iface.isWebCal = function () {
			return WebCal.isWebCal(context.calendar);
		};

		iface.getOwnerName = function () {
			return context.calendar.ownerDisplayname || context.calendar.owner;
		};

		iface.getPublicDisplayname = function () {
			var searchFor = '(' + context.calendar.owner + ')';
			var lastIndexOf = context.calendar.displayname.lastIndexOf(searchFor);

			return context.calendar.displayname.substr(0, lastIndexOf - 1);
		};

		iface.color = '';
		iface.displayname = '';

		iface.order = 0;

		iface.selectedSharee = '';

		return iface;
	}

	CalendarListItem.isCalendarListItem = function (obj) {
		return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null && obj._isACalendarListItemObject === true;
	};

	return CalendarListItem;
}]);
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();


app.factory('Calendar', ["$window", "Hook", "VEventService", "TimezoneService", "ColorUtility", "StringUtility", function ($window, Hook, VEventService, TimezoneService, ColorUtility, StringUtility) {
	'use strict';


	function Calendar(CalendarService, url, props) {
		url = url || '';
		props = props || {};

		var context = {
			calendarService: CalendarService,
			fcEventSource: {},
			components: props.components,
			mutableProperties: {
				color: props.color,
				displayname: props.displayname,
				enabled: props.enabled,
				order: props.order,
				published: props.published
			},
			updatedProperties: [],
			tmpId: StringUtility.uid(),
			url: url,
			owner: props.owner,
			ownerDisplayname: props.ownerDisplayname,
			shares: props.shares,
			publicToken: props.publicToken,
			publishable: props.publishable,
			warnings: [],
			shareable: props.shareable,
			writable: props.writable,
			writableProperties: props.writableProperties
		};
		var iface = {
			_isACalendarObject: true
		};

		context.fcEventSource.events = function (start, end, timezone, callback) {
			var fcAPI = this;
			context.fcEventSource.isRendering = true;
			iface.emit(Calendar.hookFinishedRendering);

			start = moment(start.stripZone().format());
			end = moment(end.stripZone().format());

			var TimezoneServicePromise = TimezoneService.get(timezone);
			var VEventServicePromise = VEventService.getAll(iface, start, end);
			Promise.all([TimezoneServicePromise, VEventServicePromise]).then(function (results) {
				var _results = _slicedToArray(results, 2),
				    tz = _results[0],
				    events = _results[1];

				var promises = [];
				var vevents = [];

				events.forEach(function (event) {
					var promise = event.getFcEvent(start, end, tz).then(function (vevent) {
						vevents = vevents.concat(vevent);
					}).catch(function (reason) {
						iface.addWarning(reason);
						console.log(event, reason);
					});

					promises.push(promise);
				});

				return Promise.all(promises).then(function () {
					callback(vevents);
					fcAPI.eventManager.currentPeriod.release();
					context.fcEventSource.isRendering = false;

					iface.emit(Calendar.hookFinishedRendering);
				});
			}).catch(function (reason) {
				if (reason === 'Unknown timezone' && timezone !== 'UTC') {
					var eventsFn = iface.fcEventSource.events.bind(fcAPI);
					eventsFn(start, end, 'UTC', callback);
				}

				callback([]);
				fcAPI.eventManager.currentPeriod.release();

				iface.addWarning(reason);
				context.fcEventSource.isRendering = false;
				iface.emit(Calendar.hookFinishedRendering);

				console.log(context.url, reason);
			});
		};
		context.fcEventSource.editable = context.writable;
		context.fcEventSource.calendar = iface;
		context.fcEventSource.isRendering = false;

		context.setUpdated = function (property) {
			if (context.updatedProperties.indexOf(property) === -1) {
				context.updatedProperties.push(property);
			}
		};

		Object.defineProperties(iface, {
			color: {
				get: function get() {
					return context.mutableProperties.color;
				},
				set: function set(color) {
					var oldColor = context.mutableProperties.color;
					if (color === oldColor) {
						return;
					}
					context.mutableProperties.color = color;
					context.setUpdated('color');
					iface.emit(Calendar.hookColorChanged, color, oldColor);
				}
			},
			textColor: {
				get: function get() {
					var colors = ColorUtility.extractRGBFromHexString(context.mutableProperties.color);
					return ColorUtility.generateTextColorFromRGB(colors.r, colors.g, colors.b);
				}
			},
			displayname: {
				get: function get() {
					return context.mutableProperties.displayname;
				},
				set: function set(displayname) {
					var oldDisplayname = context.mutableProperties.displayname;
					if (displayname === oldDisplayname) {
						return;
					}
					context.mutableProperties.displayname = displayname;
					context.setUpdated('displayname');
					iface.emit(Calendar.hookDisplaynameChanged, displayname, oldDisplayname);
				}
			},
			enabled: {
				get: function get() {
					return context.mutableProperties.enabled;
				},
				set: function set(enabled) {
					var oldEnabled = context.mutableProperties.enabled;
					if (enabled === oldEnabled) {
						return;
					}
					context.mutableProperties.enabled = enabled;
					context.setUpdated('enabled');
					iface.emit(Calendar.hookEnabledChanged, enabled, oldEnabled);
				}
			},
			order: {
				get: function get() {
					return context.mutableProperties.order;
				},
				set: function set(order) {
					var oldOrder = context.mutableProperties.order;
					if (order === oldOrder) {
						return;
					}
					context.mutableProperties.order = order;
					context.setUpdated('order');
					iface.emit(Calendar.hookOrderChanged, order, oldOrder);
				}

			},
			components: {
				get: function get() {
					return context.components;
				}
			},
			url: {
				get: function get() {
					return context.url;
				}
			},
			downloadUrl: {
				get: function get() {
					var url = context.url;
					if (url.slice(url.length - 1) === '/') {
						url = url.slice(0, url.length - 1);
					}
					url += '?export';

					return url;
				},
				configurable: true
			},
			caldav: {
				get: function get() {
					return $window.location.origin + context.url;
				}
			},
			publicToken: {
				get: function get() {
					return context.publicToken;
				},
				set: function set(publicToken) {
					context.publicToken = publicToken;
				}
			},
			published: {
				get: function get() {
					return context.mutableProperties.published;
				},
				set: function set(published) {
					context.mutableProperties.published = published;
				}
			},
			publishable: {
				get: function get() {
					return context.publishable;
				}
			},
			fcEventSource: {
				get: function get() {
					return context.fcEventSource;
				}
			},
			shares: {
				get: function get() {
					return context.shares;
				}
			},
			tmpId: {
				get: function get() {
					return context.tmpId;
				}
			},
			warnings: {
				get: function get() {
					return context.warnings;
				}
			},
			owner: {
				get: function get() {
					return context.owner;
				}
			},
			ownerDisplayname: {
				get: function get() {
					return context.ownerDisplayname;
				}
			}
		});

		iface.hasUpdated = function () {
			return context.updatedProperties.length !== 0;
		};

		iface.getUpdated = function () {
			return context.updatedProperties;
		};

		iface.resetUpdated = function () {
			context.updatedProperties = [];
		};

		iface.addWarning = function (msg) {
			context.warnings.push(msg);
		};

		iface.hasWarnings = function () {
			return context.warnings.length > 0;
		};

		iface.resetWarnings = function () {
			context.warnings = [];
		};

		iface.toggleEnabled = function () {
			context.mutableProperties.enabled = !context.mutableProperties.enabled;
			context.setUpdated('enabled');
			iface.emit(Calendar.hookEnabledChanged, context.mutableProperties.enabled, !context.mutableProperties.enabled);
		};

		iface.isShared = function () {
			return context.shares.circles.length !== 0 || context.shares.groups.length !== 0 || context.shares.users.length !== 0;
		};

		iface.isPublished = function () {
			return context.mutableProperties.published;
		};

		iface.isPublishable = function () {
			return context.publishable;
		};

		iface.isShareable = function () {
			return context.shareable;
		};

		iface.isRendering = function () {
			return context.fcEventSource.isRendering;
		};

		iface.isWritable = function () {
			return context.writable;
		};

		iface.arePropertiesWritable = function () {
			return context.writableProperties;
		};

		iface.eventsAccessibleViaCalDAV = function () {
			return true;
		};

		iface.refresh = function () {
		};

		iface.update = function () {
			return context.calendarService.update(iface);
		};

		iface.delete = function () {
			return context.calendarService.delete(iface);
		};

		iface.share = function (shareType, shareWith, shareWithDisplayname, writable, existingShare) {
			return context.calendarService.share(iface, shareType, shareWith, shareWithDisplayname, writable, existingShare);
		};

		iface.unshare = function (shareType, shareWith, writable, existingShare) {
			return context.calendarService.unshare(iface, shareType, shareWith, writable, existingShare);
		};

		iface.publish = function () {
			return context.calendarService.publish(iface);
		};

		iface.unpublish = function () {
			return context.calendarService.unpublish(iface);
		};

		Object.assign(iface, Hook(context));

		return iface;
	}

	Calendar.isCalendar = function (obj) {
		return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null && obj._isACalendarObject === true;
	};

	Calendar.hookFinishedRendering = 1;
	Calendar.hookColorChanged = 2;
	Calendar.hookDisplaynameChanged = 3;
	Calendar.hookEnabledChanged = 4;
	Calendar.hookOrderChanged = 5;

	return Calendar;
}]);
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };


app.factory('FcEvent', ["SimpleEvent", function (SimpleEvent) {
	'use strict';


	function FcEvent(vevent, event, start, end) {
		var context = { vevent: vevent, event: event };
		context.iCalEvent = new ICAL.Event(event);

		var id = context.vevent.uri;
		if (event.hasProperty('recurrence-id')) {
			id += context.event.getFirstPropertyValue('recurrence-id').toICALString();
		}

		var allDay = start.icaltype === 'date' && end.icaltype === 'date';
		context.allDay = allDay;

		var iface = {
			_isAFcEventObject: true,
			id: id,
			allDay: allDay,
			start: moment(start.toString()),
			end: moment(end.toString()),
			repeating: context.iCalEvent.isRecurring(),
			className: ['fcCalendar-id-' + vevent.calendar.tmpId],
			editable: vevent.calendar.isWritable(),
			backgroundColor: vevent.calendar.color,
			borderColor: vevent.calendar.color,
			textColor: vevent.calendar.textColor,
			title: event.getFirstPropertyValue('summary')
		};

		Object.defineProperties(iface, {
			vevent: {
				get: function get() {
					return context.vevent;
				},
				enumerable: true
			},
			event: {
				get: function get() {
					return context.event;
				},
				enumerable: true
			},
			calendar: {
				get: function get() {
					return context.vevent.calendar;
				},
				enumerable: true
			}
		});

		iface.getSimpleEvent = function () {
			return SimpleEvent(context.event);
		};

		iface.drop = function (delta, isAllDay, timezone, defaultTimedEventMomentDuration, defaultAllDayEventMomentDuration) {
			delta = new ICAL.Duration().fromSeconds(delta.asSeconds());

			var timedDuration = new ICAL.Duration().fromSeconds(defaultTimedEventMomentDuration.asSeconds());
			var allDayDuration = new ICAL.Duration().fromSeconds(defaultAllDayEventMomentDuration.asSeconds());

			var dtstartProp = context.event.getFirstProperty('dtstart');
			var dtstart = dtstartProp.getFirstValue();
			dtstart.isDate = isAllDay;
			dtstart.addDuration(delta);
			dtstart.zone = isAllDay ? 'floating' : dtstart.zone;

			if (context.allDay && !isAllDay) {
				var timezoneObject = ICAL.TimezoneService.get(timezone);

				if (timezone === 'UTC') {
					timezone = 'Z';
				}

				dtstart.zone = timezoneObject;
				if (timezone !== 'Z') {
					dtstartProp.setParameter('tzid', timezone);

					if (context.event.parent) {
						context.event.parent.addSubcomponent(timezoneObject.component);
					}
				}
			}
			if (!context.allDay && isAllDay) {
				dtstartProp.removeParameter('tzid');
			}
			context.event.updatePropertyWithValue('dtstart', dtstart);

			if (context.allDay !== isAllDay) {
				if (!context.event.hasProperty('duration')) {
					var dtend = dtstart.clone();
					dtend.addDuration(isAllDay ? allDayDuration : timedDuration);
					var dtendProp = context.event.updatePropertyWithValue('dtend', dtend);

					var tzid = dtstartProp.getParameter('tzid');
					if (tzid) {
						dtendProp.setParameter('tzid', tzid);
					} else {
						dtendProp.removeParameter('tzid');
					}
				} else {
					context.event.updatePropertyWithValue('duration', isAllDay ? allDayDuration : timedDuration);
				}
			} else {
				if (context.event.hasProperty('dtend')) {
					var _dtend = context.event.getFirstPropertyValue('dtend');
					_dtend.addDuration(delta);
					context.event.updatePropertyWithValue('dtend', _dtend);
				}
			}

			context.allDay = isAllDay;
			context.vevent.touch();
		};

		iface.resize = function (delta) {
			delta = new ICAL.Duration().fromSeconds(delta.asSeconds());

			if (context.event.hasProperty('duration')) {
				var duration = context.event.getFirstPropertyValue('duration');
				duration.fromSeconds(delta.toSeconds() + duration.toSeconds());
				context.event.updatePropertyWithValue('duration', duration);
			} else if (context.event.hasProperty('dtend')) {
				var dtend = context.event.getFirstPropertyValue('dtend');
				dtend.addDuration(delta);
				context.event.updatePropertyWithValue('dtend', dtend);
			} else if (context.event.hasProperty('dtstart')) {
				var dtstart = event.getFirstProperty('dtstart');
				var _dtend2 = dtstart.getFirstValue().clone();
				_dtend2.addDuration(delta);

				var prop = context.event.addPropertyWithValue('dtend', _dtend2);

				var tzid = dtstart.getParameter('tzid');
				if (tzid) {
					prop.setParameter('tzid', tzid);
				}
			}

			context.vevent.touch();
		};

		iface.lock = function () {
			context.lock = true;
		};

		iface.unlock = function () {
			context.lock = false;
		};

		return iface;
	}

	FcEvent.isFcEvent = function (obj) {
		return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null && obj._isAFcEventObject === true;
	};

	return FcEvent;
}]);
'use strict';


app.factory('Hook', function () {
  'use strict';

  return function Hook(context) {
    context.hooks = {};
    var iface = {};

    iface.emit = function (identifier, newValue, oldValue) {
      if (Array.isArray(context.hooks[identifier])) {
        context.hooks[identifier].forEach(function (callback) {
          callback(newValue, oldValue);
        });
      }
    };

    iface.register = function (identifier, callback) {
      context.hooks[identifier] = context.hooks[identifier] || [];
      context.hooks[identifier].push(callback);
    };

    return iface;
  };
});
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };


app.factory('SimpleEvent', function () {
	'use strict';

	var defaults = {
		'summary': null,
		'location': null,
		'organizer': null,
		'class': null,
		'description': null,
		'status': null,
		'alarm': null,
		'attendee': null,
		'dtstart': null,
		'dtend': null,
		'repeating': null,
		'rdate': null,
		'rrule': null,
		'exdate': null
	};

	var attendeeParameters = ['role', 'rsvp', 'partstat', 'cutype', 'cn', 'delegated-from', 'delegated-to'];

	var organizerParameters = ['cn'];

	function getDtProperty(simple, propName) {
		if (simple.allDay) {
			simple[propName].parameters.zone = 'floating';
		}

		simple[propName].parameters.zone = simple[propName].parameters.zone || 'floating';

		if (simple[propName].parameters.zone !== 'floating' && !ICAL.TimezoneService.has(simple[propName].parameters.zone)) {
			throw new Error('Requested timezone not found (' + simple[propName].parameters.zone + ')');
		}

		var iCalTime = ICAL.Time.fromJSDate(simple[propName].value.toDate(), false);
		iCalTime.isDate = simple.allDay;

		if (simple[propName].parameters.zone !== 'floating') {
			iCalTime.zone = ICAL.TimezoneService.get(simple[propName].parameters.zone);
		}

		return iCalTime;
	}

	var simpleParser = {
		date: function date(data, vevent, key, parameters) {
			parameters = (parameters || []).concat(['tzid']);
			simpleParser._parseSingle(data, vevent, key, parameters, function (p) {
				var first = p.getFirstValue();
				return p.type === 'duration' ? first.toSeconds() : moment(first.toJSDate());
			});
		},
		dates: function dates(data, vevent, key, parameters) {
			parameters = (parameters || []).concat(['tzid']);
			simpleParser._parseMultiple(data, vevent, key, parameters, function (p) {
				var values = p.getValues(),
				    usableValues = [];

				values.forEach(function (value) {
					if (p.type === 'duration') {
						usableValues.push(value.toSeconds());
					} else {
						usableValues.push(moment(value.toJSDate()));
					}
				});

				return usableValues;
			});
		},
		string: function string(data, vevent, key, parameters) {
			simpleParser._parseSingle(data, vevent, key, parameters, function (p) {
				return p.isMultiValue ? p.getValues() : p.getFirstValue();
			});
		},
		strings: function strings(data, vevent, key, parameters) {
			simpleParser._parseMultiple(data, vevent, key, parameters, function (p) {
				return p.isMultiValue ? p.getValues() : p.getFirstValue();
			});
		},
		_parseSingle: function _parseSingle(data, vevent, key, parameters, valueParser) {
			var prop = vevent.getFirstProperty(key);
			if (!prop) {
				return;
			}

			data[key] = {
				parameters: simpleParser._parseParameters(prop, parameters),
				type: prop.type
			};

			if (prop.isMultiValue) {
				data[key].values = valueParser(prop);
			} else {
				data[key].value = valueParser(prop);
			}
		},
		_parseMultiple: function _parseMultiple(data, vevent, key, parameters, valueParser) {
			data[key] = data[key] || [];

			var properties = vevent.getAllProperties(key);
			var group = 0;

			properties.forEach(function (property) {
				var currentElement = {
					group: group,
					parameters: simpleParser._parseParameters(property, parameters),
					type: property.type
				};

				if (property.isMultiValue) {
					currentElement.values = valueParser(property);
				} else {
					currentElement.value = valueParser(property);
				}

				data[key].push(currentElement);
				property.setParameter('x-nc-group-id', group.toString());
				group++;
			});
		},
		_parseParameters: function _parseParameters(prop, para) {
			var parameters = {};

			if (!para) {
				return parameters;
			}

			para.forEach(function (p) {
				parameters[p] = prop.getParameter(p);
			});

			return parameters;
		}
	};

	var simpleReader = {
		date: function date(vevent, oldSimpleData, newSimpleData, key, parameters) {
			parameters = (parameters || []).concat(['tzid']);
			simpleReader._readSingle(vevent, oldSimpleData, newSimpleData, key, parameters, function (v, isMultiValue) {
				return v.type === 'duration' ? ICAL.Duration.fromSeconds(v.value) : ICAL.Time.fromJSDate(v.value.toDate());
			});
		},
		dates: function dates(vevent, oldSimpleData, newSimpleData, key, parameters) {
			parameters = (parameters || []).concat(['tzid']);
			simpleReader._readMultiple(vevent, oldSimpleData, newSimpleData, key, parameters, function (v, isMultiValue) {
				var values = [];

				v.values.forEach(function (value) {
					if (v.type === 'duration') {
						values.push(ICAL.Duration.fromSeconds(value));
					} else {
						values.push(ICAL.Time.fromJSDate(value.toDate()));
					}
				});

				return values;
			});
		},
		string: function string(vevent, oldSimpleData, newSimpleData, key, parameters) {
			simpleReader._readSingle(vevent, oldSimpleData, newSimpleData, key, parameters, function (v, isMultiValue) {
				return isMultiValue ? v.values : v.value;
			});
		},
		strings: function strings(vevent, oldSimpleData, newSimpleData, key, parameters) {
			simpleReader._readMultiple(vevent, oldSimpleData, newSimpleData, key, parameters, function (v, isMultiValue) {
				return isMultiValue ? v.values : v.value;
			});
		},
		_readSingle: function _readSingle(vevent, oldSimpleData, newSimpleData, key, parameters, valueReader) {
			if (!newSimpleData[key]) {
				return;
			}
			if (!newSimpleData[key].hasOwnProperty('value') && !newSimpleData[key].hasOwnProperty('values')) {
				return;
			}
			var isMultiValue = newSimpleData[key].hasOwnProperty('values');

			var prop = vevent.updatePropertyWithValue(key, valueReader(newSimpleData[key], isMultiValue));
			simpleReader._readParameters(prop, newSimpleData[key], parameters);
		},
		_readMultiple: function _readMultiple(vevent, oldSimpleData, newSimpleData, key, parameters, valueReader) {
			var oldGroups = [];
			var properties = void 0,
			    pKey = void 0,
			    groupId = void 0;

			oldSimpleData[key] = oldSimpleData[key] || [];
			oldSimpleData[key].forEach(function (e) {
				oldGroups.push(e.group);
			});

			newSimpleData[key] = newSimpleData[key] || [];
			newSimpleData[key].forEach(function (e) {
				var isMultiValue = e.hasOwnProperty('values');
				var value = valueReader(e, isMultiValue);

				if (oldGroups.indexOf(e.group) === -1) {
					var property = new ICAL.Property(key);
					simpleReader._setProperty(property, value, isMultiValue);
					simpleReader._readParameters(property, e, parameters);
					vevent.addProperty(property);
				} else {
					oldGroups.splice(oldGroups.indexOf(e.group), 1);

					properties = vevent.getAllProperties(key);
					for (pKey in properties) {
						if (!properties.hasOwnProperty(pKey)) {
							continue;
						}

						groupId = properties[pKey].getParameter('x-nc-group-id');
						if (groupId === null) {
							continue;
						}
						if (parseInt(groupId) === e.group) {
							simpleReader._setProperty(properties[pKey], value, isMultiValue);
							simpleReader._readParameters(properties[pKey], e, parameters);
						}
					}
				}
			});

			properties = vevent.getAllProperties(key);
			properties.forEach(function (property) {
				groupId = property.getParameter('x-nc-group-id');
				if (oldGroups.indexOf(parseInt(groupId)) !== -1) {
					vevent.removeProperty(property);
				}
				property.removeParameter('x-nc-group-id');
			});
		},
		_readParameters: function _readParameters(prop, simple, para) {
			if (!para) {
				return;
			}
			if (!simple.parameters) {
				return;
			}

			para.forEach(function (p) {
				if (simple.parameters[p]) {
					prop.setParameter(p, simple.parameters[p]);
				} else {
					prop.removeParameter(p);
				}
			});
		},
		_setProperty: function _setProperty(prop, value, isMultiValue) {
			if (isMultiValue) {
				prop.setValues(value);
			} else {
				prop.setValue(value);
			}
		}
	};

	var simpleProperties = {
		'summary': { parser: simpleParser.string, reader: simpleReader.string },
		'location': { parser: simpleParser.string, reader: simpleReader.string },
		'attendee': {
			parser: simpleParser.strings,
			reader: simpleReader.strings,
			parameters: attendeeParameters
		},
		'organizer': {
			parser: simpleParser.string,
			reader: simpleReader.string,
			parameters: organizerParameters
		},
		'class': { parser: simpleParser.string, reader: simpleReader.string },
		'description': {
			parser: simpleParser.string,
			reader: simpleReader.string
		},
		'status': { parser: simpleParser.string, reader: simpleReader.string
		} };

	var specificParser = {
		alarm: function alarm(data, vevent) {
			data.alarm = data.alarm || [];

			var alarms = vevent.getAllSubcomponents('valarm');
			var group = 0;
			alarms.forEach(function (alarm) {
				var alarmData = {
					group: group,
					action: {},
					trigger: {},
					repeat: {},
					duration: {},
					attendee: []
				};

				simpleParser.string(alarmData, alarm, 'action');
				simpleParser.date(alarmData, alarm, 'trigger');
				simpleParser.string(alarmData, alarm, 'repeat');
				simpleParser.date(alarmData, alarm, 'duration');
				simpleParser.strings(alarmData, alarm, 'attendee', attendeeParameters);


				if (alarmData.trigger.type === 'duration' && alarm.hasProperty('trigger')) {
					var trigger = alarm.getFirstProperty('trigger');
					var related = trigger.getParameter('related');
					if (related) {
						alarmData.trigger.related = related;
					} else {
						alarmData.trigger.related = 'start';
					}
				}

				data.alarm.push(alarmData);

				alarm.getFirstProperty('action').setParameter('x-nc-group-id', group.toString());
				group++;
			});
		},
		date: function date(data, vevent) {
			var dtstart = vevent.getFirstPropertyValue('dtstart');
			var dtend = void 0;

			if (vevent.hasProperty('dtend')) {
				dtend = vevent.getFirstPropertyValue('dtend');
			} else if (vevent.hasProperty('duration')) {
				dtend = dtstart.clone();
				dtend.addDuration(vevent.getFirstPropertyValue('duration'));
			} else {
				dtend = dtstart.clone();

				if (dtend.icaltype === 'date') {
					dtend.addDuration(ICAL.Duration.fromString('P1D'));
				}
			}

			data.dtstart = {
				parameters: {
					zone: dtstart.zone.toString()
				},
				value: moment({
					years: dtstart.year,
					months: dtstart.month - 1,
					date: dtstart.day,
					hours: dtstart.hour,
					minutes: dtstart.minute,
					seconds: dtstart.seconds
				})
			};
			data.dtend = {
				parameters: {
					zone: dtend.zone.toString()
				},
				value: moment({
					years: dtend.year,
					months: dtend.month - 1,
					date: dtend.day,
					hours: dtend.hour,
					minutes: dtend.minute,
					seconds: dtend.seconds
				})
			};
			data.allDay = dtstart.icaltype === 'date' && dtend.icaltype === 'date';
		},
		repeating: function repeating(data, vevent) {
			var iCalEvent = new ICAL.Event(vevent);

			data.repeating = iCalEvent.isRecurring();

			var rrule = vevent.getFirstPropertyValue('rrule');
			if (rrule) {
				data.rrule = {
					count: rrule.count,
					freq: rrule.freq,
					interval: rrule.interval,
					parameters: rrule.parts,
					until: null
				};

			} else {
				data.rrule = {
					freq: 'NONE'
				};
			}
		}
	};

	var specificReader = {
		alarm: function alarm(vevent, oldSimpleData, newSimpleData) {
			var components = {},
			    key = 'alarm';

			function getAlarmGroup(alarmData) {
				return alarmData.group;
			}

			oldSimpleData[key] = oldSimpleData[key] || [];
			var oldGroups = oldSimpleData[key].map(getAlarmGroup);

			newSimpleData[key] = newSimpleData[key] || [];
			var newGroups = newSimpleData[key].map(getAlarmGroup);

			var removedAlarms = oldGroups.filter(function (group) {
				return newGroups.indexOf(group) === -1;
			});

			vevent.getAllSubcomponents('valarm').forEach(function (alarm) {
				var group = alarm.getFirstProperty('action').getParameter('x-nc-group-id');
				components[group] = alarm;
			});

			removedAlarms.forEach(function (group) {
				if (components[group]) {
					vevent.removeSubcomponent(components[group]);
					delete components[group];
				}
			});

			newSimpleData[key].forEach(function (alarmData) {
				var valarm = void 0,
				    oldSimpleAlarmData = void 0;

				if (oldGroups.indexOf(alarmData.group) === -1) {
					valarm = new ICAL.Component('VALARM');
					vevent.addSubcomponent(valarm);
					oldSimpleAlarmData = {};
				} else {
					valarm = components[alarmData.group];
					oldSimpleAlarmData = oldSimpleData.alarm.find(function (alarm) {
						return alarm.group === alarmData.group;
					});
				}

				simpleReader.string(valarm, oldSimpleAlarmData, alarmData, 'action', []);
				simpleReader.date(valarm, oldSimpleAlarmData, alarmData, 'trigger', []);
				simpleReader.string(valarm, oldSimpleAlarmData, alarmData, 'repeat', []);
				simpleReader.date(valarm, oldSimpleAlarmData, alarmData, 'duration', []);
				simpleReader.strings(valarm, oldSimpleAlarmData, alarmData, 'attendee', attendeeParameters);

				valarm.getFirstProperty('action').removeParameter('x-nc-group-id');
			});
		},
		date: function date(vevent, oldSimpleData, newSimpleData) {
			vevent.removeAllProperties('dtstart');
			vevent.removeAllProperties('dtend');
			vevent.removeAllProperties('duration');

			if (newSimpleData.allDay) {
				newSimpleData.dtstart.parameters.zone = 'floating';
				newSimpleData.dtend.parameters.zone = 'floating';
			}

			newSimpleData.dtstart.parameters.zone = newSimpleData.dtstart.parameters.zone || 'floating';
			newSimpleData.dtend.parameters.zone = newSimpleData.dtend.parameters.zone || 'floating';

			if (newSimpleData.dtstart.parameters.zone !== 'floating' && !ICAL.TimezoneService.has(newSimpleData.dtstart.parameters.zone)) {
				throw new Error('Requested timezone not found (' + newSimpleData.dtstart.parameters.zone + ')');
			}
			if (newSimpleData.dtend.parameters.zone !== 'floating' && !ICAL.TimezoneService.has(newSimpleData.dtend.parameters.zone)) {
				throw new Error('Requested timezone not found (' + newSimpleData.dtend.parameters.zone + ')');
			}

			var start = ICAL.Time.fromJSDate(newSimpleData.dtstart.value.toDate(), false);
			start.isDate = newSimpleData.allDay;
			var end = ICAL.Time.fromJSDate(newSimpleData.dtend.value.toDate(), false);
			end.isDate = newSimpleData.allDay;

			var alreadyStoredTimezones = ['UTC'];
			var vtimezones = vevent.parent.getAllSubcomponents('vtimezone');
			vtimezones.forEach(function (vtimezone) {
				alreadyStoredTimezones.push(vtimezone.getFirstPropertyValue('tzid'));
			});

			var startProp = new ICAL.Property('dtstart', vevent);
			if (newSimpleData.dtstart.parameters.zone !== 'floating') {
				if (newSimpleData.dtstart.parameters.zone !== 'UTC') {
					startProp.setParameter('tzid', newSimpleData.dtstart.parameters.zone);
				}

				var startTz = ICAL.TimezoneService.get(newSimpleData.dtstart.parameters.zone);
				start.zone = startTz;
				if (alreadyStoredTimezones.indexOf(newSimpleData.dtstart.parameters.zone) === -1) {
					vevent.parent.addSubcomponent(startTz.component);
					alreadyStoredTimezones.push(newSimpleData.dtstart.parameters.zone);
				}
			}
			startProp.setValue(start);

			var endProp = new ICAL.Property('dtend', vevent);
			if (newSimpleData.dtend.parameters.zone !== 'floating') {
				if (newSimpleData.dtend.parameters.zone !== 'UTC') {
					endProp.setParameter('tzid', newSimpleData.dtend.parameters.zone);
				}

				var endTz = ICAL.TimezoneService.get(newSimpleData.dtend.parameters.zone);
				end.zone = endTz;
				if (alreadyStoredTimezones.indexOf(newSimpleData.dtend.parameters.zone) === -1) {
					vevent.parent.addSubcomponent(endTz.component);
				}
			}
			endProp.setValue(end);

			vevent.addProperty(startProp);
			vevent.addProperty(endProp);
		},
		repeating: function repeating(vevent, oldSimpleData, newSimpleData) {
			if (newSimpleData.rrule === null || newSimpleData.rrule.freq === 'NONE') {
				vevent.removeAllProperties('rdate');
				vevent.removeAllProperties('rrule');
				vevent.removeAllProperties('exdate');

				return;
			}

			if (newSimpleData.rrule.dontTouch) {
				return;
			}

			var params = {
				interval: newSimpleData.rrule.interval,
				freq: newSimpleData.rrule.freq
			};

			if (newSimpleData.rrule.count) {
				params.count = newSimpleData.rrule.count;
			}

			var rrule = new ICAL.Recur(params);
			vevent.updatePropertyWithValue('rrule', rrule);
		}
	};

	function SimpleEvent(event) {
		var context = {
			event: event,
			patched: false,
			oldProperties: {}
		};

		var iface = {
			_isASimpleEventObject: true
		};
		angular.extend(iface, defaults);

		context.generateOldProperties = function () {
			context.oldProperties = {};

			for (var key in defaults) {
				context.oldProperties[key] = angular.copy(iface[key]);
			}
		};

		iface.checkDtStartBeforeDtEnd = function () {
			var dtStart = getDtProperty(iface, 'dtstart');
			var dtEnd = getDtProperty(iface, 'dtend');

			return dtEnd.compare(dtStart) !== -1;
		};

		iface.patch = function () {
			if (context.patched) {
				throw new Error('SimpleEvent was already patched, patching not possible');
			}

			for (var simpleKey in simpleProperties) {
				var simpleProperty = simpleProperties[simpleKey];

				var reader = simpleProperty.reader;
				var parameters = simpleProperty.parameters;
				if (context.oldProperties[simpleKey] !== iface[simpleKey]) {
					if (iface[simpleKey] === null) {
						context.event.removeAllProperties(simpleKey);
					} else {
						reader(context.event, context.oldProperties, iface, simpleKey, parameters);
					}
				}
			}

			for (var specificKey in specificReader) {
				var _reader = specificReader[specificKey];
				_reader(context.event, context.oldProperties, iface);
			}

			context.patched = true;
		};

		for (var simpleKey in simpleProperties) {
			var simpleProperty = simpleProperties[simpleKey];

			var parser = simpleProperty.parser;
			var parameters = simpleProperty.parameters;
			if (context.event.hasProperty(simpleKey)) {
				parser(iface, context.event, simpleKey, parameters);
			}
		}

		for (var specificKey in specificParser) {
			var _parser = specificParser[specificKey];
			_parser(iface, context.event);
		}

		context.generateOldProperties();

		return iface;
	}

	SimpleEvent.isSimpleEvent = function (obj) {
		return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null && obj._isASimpleEventObject === true;
	};

	return SimpleEvent;
});
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

app.factory('SplittedICal', function () {
	'use strict';

	function SplittedICal(name, color) {
		var context = {
			name: name,
			color: color,
			vevents: [],
			vjournals: [],
			vtodos: []
		};
		var iface = {
			_isASplittedICalObject: true
		};

		Object.defineProperties(iface, {
			name: {
				get: function get() {
					return context.name;
				}
			},
			color: {
				get: function get() {
					return context.color;
				}
			},
			vevents: {
				get: function get() {
					return context.vevents;
				}
			},
			vjournals: {
				get: function get() {
					return context.vjournals;
				}
			},
			vtodos: {
				get: function get() {
					return context.vtodos;
				}
			},
			objects: {
				get: function get() {
					return [].concat(context.vevents).concat(context.vjournals).concat(context.vtodos);
				}
			}
		});

		iface.addObject = function (componentName, object) {
			switch (componentName) {
				case 'vevent':
					context.vevents.push(object);
					break;

				case 'vjournal':
					context.vjournals.push(object);
					break;

				case 'vtodo':
					context.vtodos.push(object);
					break;

				default:
					break;
			}
		};

		return iface;
	}

	SplittedICal.isSplittedICal = function (obj) {
		return obj instanceof SplittedICal || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null && obj._isASplittedICalObject !== null;
	};

	return SplittedICal;
});
'use strict';


app.factory('Timezone', function () {
	'use strict';

	var timezone = function Timezone(data) {
		angular.extend(this, {
			_props: {}
		});

		if (data instanceof ICAL.Timezone) {
			this._props.jCal = data;
			this._props.name = data.tzid;
		} else if (typeof data === 'string') {
			var jCal = ICAL.parse(data);
			var components = new ICAL.Component(jCal);
			var iCalTimezone = null;
			if (components.name === 'vtimezone') {
				iCalTimezone = new ICAL.Timezone(components);
			} else {
				iCalTimezone = new ICAL.Timezone(components.getFirstSubcomponent('vtimezone'));
			}
			this._props.jCal = iCalTimezone;
			this._props.name = iCalTimezone.tzid;
		}
	};

	timezone.prototype = {
		get jCal() {
			return this._props.jCal;
		},
		get name() {
			return this._props.name;
		}
	};

	return timezone;
});
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }


app.factory('VEvent', ["TimezoneService", "FcEvent", "SimpleEvent", "ICalFactory", "StringUtility", function (TimezoneService, FcEvent, SimpleEvent, ICalFactory, StringUtility) {
	'use strict';


	function VEvent(calendar, comp, uri) {
		var etag = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

		var context = { calendar: calendar, comp: comp, uri: uri, etag: etag };
		var iface = {
			_isAVEventObject: true
		};

		if (!context.comp || !context.comp.jCal || context.comp.jCal.length === 0) {
			throw new TypeError('Given comp is not a valid calendar');
		}

		var vtimezones = comp.getAllSubcomponents('vtimezone');
		vtimezones.forEach(function (vtimezone) {
			var timezone = new ICAL.Timezone(vtimezone);
			ICAL.TimezoneService.register(timezone.tzid, timezone);
		});

		if (!uri) {
			var vevent = context.comp.getFirstSubcomponent('vevent');
			context.uri = vevent.getFirstPropertyValue('uid');
		}

		context.calculateDTEnd = function (vevent) {
			if (vevent.hasProperty('dtend')) {
				return vevent.getFirstPropertyValue('dtend');
			} else if (vevent.hasProperty('duration')) {
				var dtstart = vevent.getFirstPropertyValue('dtstart').clone();
				dtstart.addDuration(vevent.getFirstPropertyValue('duration'));

				return dtstart;
			} else {
				var _dtstart = vevent.getFirstPropertyValue('dtstart').clone();

				if (_dtstart.icaltype === 'date') {
					_dtstart.addDuration(ICAL.Duration.fromString('P1D'));
				}

				return _dtstart;
			}
		};

		context.convertTz = function (dt, timezone) {
			if (context.needsTzConversion(dt) && timezone) {
				dt = dt.convertToZone(timezone);
			}

			return dt;
		};

		context.needsTzConversion = function (dt) {
			return dt.icaltype !== 'date' && dt.zone !== ICAL.Timezone.localTimezone;
		};

		context.getMissingEventTimezones = function () {
			var missingTimezones = [];
			var propertiesToSearch = ['dtstart', 'dtend'];
			var vevents = context.comp.getAllSubcomponents('vevent');
			vevents.forEach(function (vevent) {
				propertiesToSearch.forEach(function (propName) {
					if (vevent.hasProperty(propName)) {
						var prop = vevent.getFirstProperty(propName);
						var tzid = prop.getParameter('tzid');
						if (tzid && !ICAL.TimezoneService.has(tzid) && missingTimezones.indexOf(tzid) === -1) {
							missingTimezones.push(tzid);
						}
					}
				});
			});

			return missingTimezones;
		};

		Object.defineProperties(iface, {
			calendar: {
				get: function get() {
					return context.calendar;
				},
				set: function set(calendar) {
					context.calendar = calendar;
				}
			},
			comp: {
				get: function get() {
					return context.comp;
				}
			},
			data: {
				get: function get() {
					return context.comp.toString();
				}
			},
			etag: {
				get: function get() {
					return context.etag;
				},
				set: function set(etag) {
					context.etag = etag;
				}
			},
			uri: {
				get: function get() {
					return context.uri;
				}
			}
		});

		iface.getFcEvent = function (start, end, timezone) {
			return new Promise(function (resolve, reject) {
				var iCalStart = ICAL.Time.fromJSDate(start.toDate());
				var iCalEnd = ICAL.Time.fromJSDate(end.toDate());
				var fcEvents = [];

				var missingTimezones = context.getMissingEventTimezones();
				var errorSafeMissingTimezones = [];
				missingTimezones.forEach(function (missingTimezone) {
					var promise = TimezoneService.get(missingTimezone).then(function (tz) {
						return tz;
					}).catch(function (reason) {
						return null;
					});
					errorSafeMissingTimezones.push(promise);
				});

				Promise.all(errorSafeMissingTimezones).then(function (timezones) {
					timezones.forEach(function (timezone) {
						if (!timezone) {
							return;
						}

						var icalTimezone = new ICAL.Timezone(timezone.jCal);
						ICAL.TimezoneService.register(timezone.name, icalTimezone);
					});
				}).then(function () {
					var vevents = context.comp.getAllSubcomponents('vevent');
					var exceptions = vevents.filter(function (vevent) {
						return vevent.hasProperty('recurrence-id');
					});
					var vevent = vevents.find(function (vevent) {
						return !vevent.hasProperty('recurrence-id');
					});

					if (!vevent && exceptions.length === 0) {
						resolve([]);
					}

					if (vevent && (vevent.hasProperty('rrule') || vevent.hasProperty('rdate'))) {
						if (!vevent.hasProperty('dtstart')) {
							resolve([]);
						}

						var iCalEvent = new ICAL.Event(vevent, { exceptions: exceptions });
						var dtstartProp = vevent.getFirstProperty('dtstart');
						var rawDtstart = dtstartProp.getFirstValue('dtstart');

						var iterator = new ICAL.RecurExpansion({
							component: vevent,
							dtstart: rawDtstart
						});

						var next = void 0;
						while (next = iterator.next()) {
							var occurrence = iCalEvent.getOccurrenceDetails(next);

							if (occurrence.endDate.compare(iCalStart) < 0) {
								continue;
							}
							if (occurrence.startDate.compare(iCalEnd) > 0) {
								break;
							}

							var dtstart = context.convertTz(occurrence.startDate, timezone.jCal);
							var dtend = context.convertTz(occurrence.endDate, timezone.jCal);
							var fcEvent = FcEvent(iface, occurrence.item.component, dtstart, dtend);

							fcEvents.push(fcEvent);
						}
					} else {
						if (vevent) {
							exceptions.push(vevent);
						}

						exceptions.forEach(function (singleVEvent) {
							if (!singleVEvent.hasProperty('dtstart')) {
								return;
							}

							var dtstartProp = singleVEvent.getFirstProperty('dtstart');
							var rawDtstart = dtstartProp.getFirstValue('dtstart');
							var rawDtend = context.calculateDTEnd(singleVEvent);

							var dtstart = context.convertTz(rawDtstart, timezone.jCal);
							var dtend = context.convertTz(rawDtend, timezone.jCal);
							var fcEvent = FcEvent(iface, singleVEvent, dtstart, dtend);

							fcEvents.push(fcEvent);
						});
					}

					resolve(fcEvents);
				});
			});
		};

		iface.getSimpleEvent = function (searchedRecurrenceId) {
			var vevents = context.comp.getAllSubcomponents('vevent');

			var veventsLength = vevents.length;
			for (var i = 0; i < veventsLength; i++) {
				var _vevent = vevents[i];
				var hasRecurrenceId = _vevent.hasProperty('recurrence-id');
				var recurrenceId = null;
				if (hasRecurrenceId) {
					recurrenceId = _vevent.getFirstPropertyValue('recurrence-id').toICALString();
				}

				if (!hasRecurrenceId && !searchedRecurrenceId || hasRecurrenceId && searchedRecurrenceId === recurrenceId) {
					return SimpleEvent(_vevent);
				}
			}

			throw new Error('Event not found');
		};

		iface.touch = function () {
			var vevent = context.comp.getFirstSubcomponent('vevent');
			vevent.updatePropertyWithValue('last-modified', ICAL.Time.now());
		};

		return iface;
	}

	VEvent.isVEvent = function (obj) {
		return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null && obj._isAVEventObject === true;
	};

	VEvent.sanDate = function (ics) {
		ics.split("\n").forEach(function (el, i) {

			var findTypes = ['DTSTART', 'DTEND'];
			var dateType = /[^:]*/.exec(el)[0];
			var icsDate = null;

			if (findTypes.indexOf(dateType) >= 0 && el.trim().substr(-3) === 'T::') {
				icsDate = el.replace(/[^0-9]/g, '');
				ics = ics.replace(el, dateType + ';VALUE=DATE:' + icsDate);
			}
		});

		return ics;
	};

	VEvent.sanNoDateValue = function (ics) {
		ics.split("\n").forEach(function (el, i) {

			if (el.indexOf(';VALUE=DATE') !== -1) {
				return;
			}

			var findTypes = ['DTSTART', 'DTEND'];

			var _el$split = el.split(':'),
			    _el$split2 = _slicedToArray(_el$split, 2),
			    dateTypePara = _el$split2[0],
			    dateValue = _el$split2[1];

			var _dateTypePara$split = dateTypePara.split(';'),
			    _dateTypePara$split2 = _toArray(_dateTypePara$split),
			    dateType = _dateTypePara$split2[0],
			    dateParameters = _dateTypePara$split2.slice(1);

			if (findTypes.indexOf(dateType) >= 0 && dateParameters.indexOf('VALUE=DATE') === -1 && dateValue.length === 8) {
				ics = ics.replace(el, dateTypePara + ';VALUE=DATE:' + dateValue);
			}
		});

		return ics;
	};

	VEvent.sanTrigger = function (ics) {
		var regex = /^TRIGGER:P$/gm;
		if (ics.match(regex)) {
			ics = ics.replace(regex, 'TRIGGER:P0D');
		}

		return ics;
	};

	VEvent.fromRawICS = function (calendar, ics, uri) {
		var etag = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

		var comp = void 0;

		if (ics.search('T::') > 0) {
			ics = VEvent.sanDate(ics);
		}

		if (ics.search('TRIGGER:P') > 0) {
			ics = VEvent.sanTrigger(ics);
		}

		ics = VEvent.sanNoDateValue(ics);

		try {
			var jCal = ICAL.parse(ics);
			comp = new ICAL.Component(jCal);
		} catch (e) {
			console.log(e);
			throw new TypeError('given ics data was not valid');
		}

		return VEvent(calendar, comp, uri, etag);
	};

	VEvent.fromStartEnd = function (start, end, timezone) {
		var uid = StringUtility.uid();
		var comp = ICalFactory.newEvent(uid);
		var uri = StringUtility.uid('Nextcloud', 'ics');
		var vevent = VEvent(null, comp, uri);
		var simple = vevent.getSimpleEvent();

		simple.allDay = !start.hasTime() && !end.hasTime();
		simple.dtstart = {
			type: start.hasTime() ? 'datetime' : 'date',
			value: start,
			parameters: {
				zone: timezone
			}
		};
		simple.dtend = {
			type: end.hasTime() ? 'datetime' : 'date',
			value: end,
			parameters: {
				zone: timezone
			}
		};
		simple.patch();

		return vevent;
	};

	return VEvent;
}]);
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();


app.factory('WebCal', ["$http", "Calendar", "VEvent", "TimezoneService", "WebCalService", "WebCalUtility", function ($http, Calendar, VEvent, TimezoneService, WebCalService, WebCalUtility) {
	'use strict';


	function WebCal(CalendarService, url, props) {
		var context = {
			calendarService: CalendarService,
			updatedProperties: [],
			storedUrl: props.href, 
			url: WebCalUtility.fixURL(props.href)
		};

		var iface = Calendar(CalendarService, url, props);
		iface._isAWebCalObject = true;

		context.setUpdated = function (property) {
			if (context.updatedProperties.indexOf(property) === -1) {
				context.updatedProperties.push(property);
			}
		};

		Object.defineProperties(iface, {
			downloadUrl: {
				get: function get() {
					return context.url;
				}
			},
			storedUrl: {
				get: function get() {
					return context.storedUrl;
				}
			}
		});

		iface.fcEventSource.events = function (start, end, timezone, callback) {
			var fcAPI = this;
			iface.fcEventSource.isRendering = true;
			iface.emit(Calendar.hookFinishedRendering);

			var allowDowngradeToHttp = !context.storedUrl.startsWith('https://');

			var TimezoneServicePromise = TimezoneService.get(timezone);
			var WebCalServicePromise = WebCalService.get(context.url, allowDowngradeToHttp);
			Promise.all([TimezoneServicePromise, WebCalServicePromise]).then(function (results) {
				var _results = _slicedToArray(results, 2),
				    tz = _results[0],
				    response = _results[1];

				var promises = [];
				var vevents = [];

				response.vevents.forEach(function (ics) {
					try {
						var vevent = VEvent.fromRawICS(iface, ics);
						var promise = vevent.getFcEvent(start, end, tz).then(function (vevent) {
							vevents = vevents.concat(vevent);
						}).catch(function (reason) {
							iface.addWarning(reason);
							console.log(event, reason);
						});

						promises.push(promise);
					} catch (e) {
						console.log(e);
					}
				});

				return Promise.all(promises).then(function () {
					callback(vevents);
					fcAPI.eventManager.currentPeriod.release();

					iface.fcEventSource.isRendering = false;
					iface.emit(Calendar.hookFinishedRendering);
				});
			}).catch(function (reason) {
				if (reason === 'Unknown timezone' && timezone !== 'UTC') {
					var eventsFn = iface.fcEventSource.events.bind(fcAPI);
					eventsFn(start, end, 'UTC', callback);
				} else if (reason.redirect === true) {
					if (context.storedUrl === reason.new_url) {
						return Promise.reject('Fatal error. Redirected URL matched original URL. Aborting');
					}

					context.storedUrl = reason.new_url;
					context.url = reason.new_url;
					context.setUpdated('storedUrl');
					iface.update();
					var _eventsFn = iface.fcEventSource.events.bind(fcAPI);
					_eventsFn(start, end, timezone, callback);
				} else {
					callback([]);
					fcAPI.eventManager.currentPeriod.release();

					iface.addWarning(reason);
					console.log(reason);
					iface.fcEventSource.isRendering = false;
					iface.emit(Calendar.hookFinishedRendering);
				}
			});
		};

		iface.eventsAccessibleViaCalDAV = function () {
			return false;
		};

		var parentGetUpdated = iface.getUpdated;
		iface.getUpdated = function () {
			var updated = parentGetUpdated();
			return updated.concat(context.updatedProperties);
		};

		var parentResetUpdated = iface.resetUpdated;
		iface.resetUpdated = function () {
			parentResetUpdated();
			context.updatedProperties = [];
		};

		iface.delete = function () {
			localStorage.removeItem(iface.storedUrl);
			return context.calendarService.delete(iface);
		};

		return iface;
	}

	WebCal.isWebCal = function (obj) {
		return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null && obj._isAWebCalObject === true;
	};

	return WebCal;
}]);
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();


app.service('ColorUtility', function () {
	'use strict';

	var self = this;

	this.colors = [];

	this.generateTextColorFromRGB = function (red, green, blue) {
		var brightness = (red * 299 + green * 587 + blue * 114) / 1000;
		return brightness > 130 ? '#000000' : '#FAFAFA';
	};

	this.extractRGBFromHexString = function (colorString) {
		var fallbackColor = {
			r: 255,
			g: 255,
			b: 255
		},
		    matchedString;

		if (typeof colorString !== 'string') {
			return fallbackColor;
		}

		switch (colorString.length) {
			case 4:
				matchedString = colorString.match(/^#([0-9a-f]{3})$/i);
				return Array.isArray(matchedString) && matchedString[1] ? {
					r: parseInt(matchedString[1].charAt(0), 16) * 0x11,
					g: parseInt(matchedString[1].charAt(1), 16) * 0x11,
					b: parseInt(matchedString[1].charAt(2), 16) * 0x11
				} : fallbackColor;

			case 7:
			case 9:
				var regex = new RegExp('^#([0-9a-f]{' + (colorString.length - 1) + '})$', 'i');
				matchedString = colorString.match(regex);
				return Array.isArray(matchedString) && matchedString[1] ? {
					r: parseInt(matchedString[1].substr(0, 2), 16),
					g: parseInt(matchedString[1].substr(2, 2), 16),
					b: parseInt(matchedString[1].substr(4, 2), 16)
				} : fallbackColor;

			default:
				return fallbackColor;
		}
	};

	this._ensureTwoDigits = function (str) {
		return str.length === 1 ? '0' + str : str;
	};

	this.rgbToHex = function (r, g, b) {
		if (Array.isArray(r)) {
			var _r = r;

			var _r2 = _slicedToArray(_r, 3);

			r = _r2[0];
			g = _r2[1];
			b = _r2[2];
		}

		return '#' + this._ensureTwoDigits(parseInt(r, 10).toString(16)) + this._ensureTwoDigits(parseInt(g, 10).toString(16)) + this._ensureTwoDigits(parseInt(b, 10).toString(16));
	};

	this._hslToRgb = function (h, s, l) {
		if (Array.isArray(h)) {
			var _h = h;

			var _h2 = _slicedToArray(_h, 3);

			h = _h2[0];
			s = _h2[1];
			l = _h2[2];
		}

		s /= 100;
		l /= 100;

		return hslToRgb(h, s, l);
	};

	this.randomColor = function () {
		if (typeof String.prototype.toHsl === 'function') {
			var hsl = Math.random().toString().toHsl();
			return self.rgbToHex(self._hslToRgb(hsl));
		} else {
			return self.colors[Math.floor(Math.random() * self.colors.length)];
		}
	};

	if (typeof String.prototype.toHsl === 'function') {
		var hashValues = ['15', '9', '4', 'b', '6', '11', '74', 'f', '57'];
		angular.forEach(hashValues, function (hashValue) {
			var hsl = hashValue.toHsl();
			self.colors.push(self.rgbToHex(self._hslToRgb(hsl)));
		});
	} else {
		this.colors = ['#31CC7C', '#317CCC', '#FF7A66', '#F1DB50', '#7C31CC', '#CC317C', '#3A3B3D', '#CACBCD'];
	}
});
'use strict';


app.service('ICalSplitterUtility', ["ICalFactory", "SplittedICal", function (ICalFactory, SplittedICal) {
	'use strict';

	var calendarColorIdentifier = 'x-apple-calendar-color';
	var calendarNameIdentifier = 'x-wr-calname';
	var componentNames = ['vevent', 'vjournal', 'vtodo'];

	this.split = function (iCalString) {
		var jcal = ICAL.parse(iCalString);
		var components = new ICAL.Component(jcal);

		var objects = {};
		var timezones = components.getAllSubcomponents('vtimezone');

		componentNames.forEach(function (componentName) {
			var vobjects = components.getAllSubcomponents(componentName);
			objects[componentName] = {};

			vobjects.forEach(function (vobject) {
				var uid = vobject.getFirstPropertyValue('uid');
				objects[componentName][uid] = objects[componentName][uid] || [];
				objects[componentName][uid].push(vobject);
			});
		});

		var name = components.getFirstPropertyValue(calendarNameIdentifier);
		var color = components.getFirstPropertyValue(calendarColorIdentifier);

		var split = SplittedICal(name, color);
		componentNames.forEach(function (componentName) {
			var _loop = function _loop(objectKey) {
				if (!objects[componentName].hasOwnProperty(objectKey)) {
					return 'continue';
				}

				var component = ICalFactory.new();
				timezones.forEach(function (timezone) {
					component.addSubcomponent(timezone);
				});
				objects[componentName][objectKey].forEach(function (object) {
					component.addSubcomponent(object);
				});
				split.addObject(componentName, component.toString());
			};

			for (var objectKey in objects[componentName]) {
				var _ret = _loop(objectKey);

				if (_ret === 'continue') continue;
			}
		});

		return split;
	};
}]);
'use strict';


app.service('PopoverPositioningUtility', ["$window", function ($window) {
	'use strict';

	var context = {
		popoverHeight: 300,
		popoverWidth: 450
	};

	Object.defineProperties(context, {
		headerHeight: {
			get: function get() {
				return angular.element('#header').height();
			}
		},
		navigationWidth: {
			get: function get() {
				return angular.element('#app-navigation').width();
			}
		},
		windowX: {
			get: function get() {
				return $window.innerWidth - context.navigationWidth;
			}
		},
		windowY: {
			get: function get() {
				return $window.innerHeight - context.headerHeight;
			}
		}
	});

	context.isAgendaDayView = function (view) {
		return view.name === 'agendaDay';
	};

	context.isAgendaView = function (view) {
		return view.name.startsWith('agenda');
	};

	context.isInTheUpperPart = function (top) {
		return (top - context.headerHeight) / context.windowY < 0.5;
	};

	context.isInTheLeftQuarter = function (left) {
		return (left - context.navigationWidth) / context.windowX < 0.25;
	};

	context.isInTheRightQuarter = function (left) {
		return (left - context.navigationWidth) / context.windowX > 0.75;
	};

	this.calculate = function (left, top, right, bottom, view) {
		var position = [],
		    eventWidth = right - left;

		if (context.isInTheUpperPart(top)) {
			if (context.isAgendaView(view)) {
				position.push({
					name: 'top',
					value: top - context.headerHeight + 30
				});
			} else {
				position.push({
					name: 'top',
					value: bottom - context.headerHeight + 20
				});
			}
		} else {
			position.push({
				name: 'top',
				value: top - context.headerHeight - context.popoverHeight - 20
			});
		}

		if (context.isAgendaDayView(view)) {
			position.push({
				name: 'left',
				value: left - context.popoverWidth / 2 - 20 + eventWidth / 2
			});
		} else {
			if (context.isInTheLeftQuarter(left)) {
				position.push({
					name: 'left',
					value: left - 20 + eventWidth / 2
				});
			} else if (context.isInTheRightQuarter(left)) {
				position.push({
					name: 'left',
					value: left - context.popoverWidth - 20 + eventWidth / 2
				});
			} else {
				position.push({
					name: 'left',
					value: left - context.popoverWidth / 2 - 20 + eventWidth / 2
				});
			}
		}

		return position;
	};

	this.calculateByTarget = function (target, view) {
		var clientRect = target.getClientRects()[0];

		var left = clientRect.left,
		    top = clientRect.top,
		    right = clientRect.right,
		    bottom = clientRect.bottom;

		return this.calculate(left, top, right, bottom, view);
	};
}]);
'use strict';

app.service('StringUtility', function () {
	'use strict';

	this.uid = function (prefix, suffix) {
		prefix = prefix || '';
		suffix = suffix || '';

		if (prefix !== '') {
			prefix += '-';
		}
		if (suffix !== '') {
			suffix = '.' + suffix;
		}

		return prefix + Math.random().toString(36).substr(2).toUpperCase() + Math.random().toString(36).substr(2).toUpperCase() + suffix;
	};

	this.uri = function (start, isAvailable) {
		start = start || '';

		var uri = start.toString().toLowerCase().replace(/\s+/g, '-') 
		.replace(/[^\w\-]+/g, '') 
		.replace(/\-\-+/g, '-') 
		.replace(/^-+/, '') 
		.replace(/-+$/, ''); 

		if (uri === '') {
			uri = '-';
		}

		if (isAvailable(uri)) {
			return uri;
		}

		if (uri.indexOf('-') === -1) {
			uri = uri + '-1';
			if (isAvailable(uri)) {
				return uri;
			}
		}

		do {
			var positionLastDash = uri.lastIndexOf('-');
			var firstPart = uri.substr(0, positionLastDash);
			var lastPart = uri.substr(positionLastDash + 1);

			if (lastPart.match(/^\d+$/)) {
				lastPart = parseInt(lastPart);
				lastPart++;

				uri = firstPart + '-' + lastPart;
			} else {
				uri = uri + '-1';
			}
		} while (isAvailable(uri) === false);

		return uri;
	};
});
'use strict';


app.service('WebCalUtility', ["$rootScope", function ($rootScope) {
	'use strict';


	this.allowDowngrade = function (url) {
		return !url.startsWith('https://');
	};

	this.buildProxyURL = function (url) {
		return $rootScope.baseUrl + 'proxy?url=' + encodeURIComponent(url);
	};

	this.downgradePossible = function (url, allowDowngradeToHttp) {
		return url.startsWith('https://') && allowDowngradeToHttp;
	};

	this.downgradeURL = function (url) {
		if (url.startsWith('https://')) {
			return 'http://' + url.substr(8);
		}
	};

	this.fixURL = function (url) {
		if (url.startsWith('http://') || url.startsWith('https://')) {
			return url;
		} else if (url.startsWith('webcal://')) {
			return 'https://' + url.substr(9);
		} else {
			return 'https://' + url;
		}
	};
}]);
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };


app.service('XMLUtility', function () {
	'use strict';

	var context = {};
	context.XMLify = function (xmlDoc, parent, json) {
		var element = xmlDoc.createElementNS(json.name[0], json.name[1]);

		json.attributes = json.attributes || [];
		json.attributes.forEach(function (a) {
			if (a.length === 2) {
				element.setAttribute(a[0], a[1]);
			} else {
				element.setAttributeNS(a[0], a[1], a[2]);
			}
		});

		if (json.value) {
			element.textContent = json.value;
		} else if (json.children) {
			for (var key in json.children) {
				if (json.children.hasOwnProperty(key)) {
					context.XMLify(xmlDoc, element, json.children[key]);
				}
			}
		}

		parent.appendChild(element);
	};

	var serializer = new XMLSerializer();

	this.getRootSkeleton = function () {
		if (arguments.length === 0) {
			return [{}, null];
		}

		var skeleton = {
			name: arguments[0],
			children: []
		};

		var childrenWrapper = skeleton.children;

		var args = Array.prototype.slice.call(arguments, 1);
		args.forEach(function (argument) {
			var level = {
				name: argument,
				children: []
			};
			childrenWrapper.push(level);
			childrenWrapper = level.children;
		});

		return [skeleton, childrenWrapper];
	};

	this.serialize = function (json) {
		json = json || {};
		if ((typeof json === 'undefined' ? 'undefined' : _typeof(json)) !== 'object' || !json.hasOwnProperty('name')) {
			return '';
		}

		var root = document.implementation.createDocument('', '', null);
		context.XMLify(root, root, json);

		return serializer.serializeToString(root);
	};
});
'use strict';


app.service('AutoCompletionService', ['$rootScope', '$http', function ($rootScope, $http) {
  'use strict';

  this.searchAttendee = function (name) {
    return $http.post($rootScope.baseUrl + 'autocompletion/attendee', {
      search: name
    }).then(function (response) {
      return response.data;
    });
  };

  this.searchLocation = function (address) {
    return $http.post($rootScope.baseUrl + 'autocompletion/location', {
      location: address
    }).then(function (response) {
      return response.data;
    });
  };
}]);
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();


app.service('CalendarService', ["DavClient", "StringUtility", "XMLUtility", "CalendarFactory", "isPublic", "constants", function (DavClient, StringUtility, XMLUtility, CalendarFactory, isPublic, constants) {
	'use strict';

	var context = {
		self: this,
		calendarHome: null,
		userPrincipal: null,
		usedURLs: []
	};
	var privateAPI = {};
	this.privateAPI = privateAPI;

	var PROPERTIES = ['{' + DavClient.NS_DAV + '}displayname', '{' + DavClient.NS_DAV + '}resourcetype', '{' + DavClient.NS_IETF + '}calendar-description', '{' + DavClient.NS_IETF + '}calendar-timezone', '{' + DavClient.NS_APPLE + '}calendar-order', '{' + DavClient.NS_APPLE + '}calendar-color', '{' + DavClient.NS_IETF + '}supported-calendar-component-set', '{' + DavClient.NS_CALENDARSERVER + '}publish-url', '{' + DavClient.NS_CALENDARSERVER + '}allowed-sharing-modes', '{' + DavClient.NS_OWNCLOUD + '}calendar-enabled', '{' + DavClient.NS_DAV + '}acl', '{' + DavClient.NS_DAV + '}owner', '{' + DavClient.NS_OWNCLOUD + '}invite', '{' + DavClient.NS_CALENDARSERVER + '}source', '{' + DavClient.NS_NEXTCLOUD + '}owner-displayname'];

	var CALENDAR_IDENTIFIER = '{' + DavClient.NS_IETF + '}calendar';
	var WEBCAL_IDENTIFIER = '{' + DavClient.NS_CALENDARSERVER + '}subscribed';

	var UPDATABLE_PROPERTIES = ['color', 'displayname', 'enabled', 'order', 'storedUrl'];

	var UPDATABLE_PROPERTIES_MAP = {
		color: [DavClient.NS_APPLE, 'a:calendar-color'],
		displayname: [DavClient.NS_DAV, 'd:displayname'],
		enabled: [DavClient.NS_OWNCLOUD, 'o:calendar-enabled'],
		order: [DavClient.NS_APPLE, 'a:calendar-order']
	};

	var SHARE_USER = constants.SHARE_TYPE_USER;
	var SHARE_GROUP = constants.SHARE_TYPE_GROUP;
	var SHARE_CIRCLE = constants.SHARE_TYPE_CIRCLE;

	context.bootPromise = function () {
		if (isPublic) {
			return Promise.resolve(true);
		}

		var url = DavClient.buildUrl(OC.linkToRemoteBase('dav'));
		var properties = ['{' + DavClient.NS_DAV + '}current-user-principal'];
		var depth = 0;
		var headers = {
			'requesttoken': OC.requestToken
		};

		return DavClient.propFind(url, properties, depth, headers).then(function (response) {
			if (!DavClient.wasRequestSuccessful(response.status) || response.body.propStat.length < 1) {
				throw new Error('current-user-principal could not be determined');
			}

			var props = response.body.propStat[0].properties;
			context.userPrincipal = props['{' + DavClient.NS_DAV + '}current-user-principal'][0].textContent;

			var url = context.userPrincipal;
			var properties = ['{' + DavClient.NS_IETF + '}calendar-home-set'];
			var depth = 0;
			var headers = {
				'requesttoken': OC.requestToken
			};

			return DavClient.propFind(url, properties, depth, headers).then(function (response) {
				if (!DavClient.wasRequestSuccessful(response.status) || response.body.propStat.length < 1) {
					throw new Error('calendar-home-set could not be determind');
				}

				var props = response.body.propStat[0].properties;
				context.calendarHome = props['{' + DavClient.NS_IETF + '}calendar-home-set'][0].textContent;
			});
		});
	}();

	context.getResourceType = function (body) {
		var resourceTypes = body.propStat[0].properties['{' + DavClient.NS_DAV + '}resourcetype'];
		if (!resourceTypes) {
			return false;
		}

		var resourceType = resourceTypes.find(function (resourceType) {
			var name = DavClient.getNodesFullName(resourceType);
			return [CALENDAR_IDENTIFIER, WEBCAL_IDENTIFIER].indexOf(name) !== -1;
		});

		if (!resourceType) {
			return false;
		}

		return DavClient.getNodesFullName(resourceType);
	};

	context.getShareValue = function (shareType, shareWith) {
		if (shareType !== SHARE_USER && shareType !== SHARE_GROUP && shareType !== SHARE_CIRCLE) {
			throw new Error('Unknown shareType given');
		}

		var hrefValue = void 0;
		if (shareType === SHARE_USER) {
			hrefValue = 'principal:principals/users/';
		} else if (shareType === SHARE_GROUP) {
			hrefValue = 'principal:principals/groups/';
		} else {
			hrefValue = 'principal:principals/circles/';
		}
		hrefValue += shareWith;

		return hrefValue;
	};

	context.isURIAvailable = function (suggestedUri) {
		var uriToCheck = context.calendarHome + suggestedUri + '/';
		return context.usedURLs.indexOf(uriToCheck) === -1;
	};

	this.getAll = function () {
		return context.bootPromise.then(function () {
			var url = DavClient.buildUrl(context.calendarHome);
			var depth = 1;
			var headers = {
				'requesttoken': OC.requestToken
			};

			return DavClient.propFind(url, PROPERTIES, depth, headers).then(function (response) {
				if (!DavClient.wasRequestSuccessful(response.status)) {
					throw new Error('Loading calendars failed');
				}
				var calendars = [];

				response.body.forEach(function (body) {
					if (body.propStat.length < 1) {
						return;
					}

					context.usedURLs.push(body.href);

					var responseCode = DavClient.getResponseCodeFromHTTPResponse(body.propStat[0].status);
					if (!DavClient.wasRequestSuccessful(responseCode)) {
						return;
					}

					var resourceType = context.getResourceType(body);
					if (resourceType === CALENDAR_IDENTIFIER) {
						var calendar = CalendarFactory.calendar(privateAPI, body, context.userPrincipal);
						calendars.push(calendar);
					} else if (resourceType === WEBCAL_IDENTIFIER) {
						var webcal = CalendarFactory.webcal(privateAPI, body, context.userPrincipal);
						calendars.push(webcal);
					}
				});

				return calendars.filter(function (calendar) {
					return calendar.components.vevent === true;
				});
			});
		});
	};

	this.get = function (calendarUrl) {
		return context.bootPromise.then(function () {
			var url = DavClient.buildUrl(calendarUrl);
			var depth = 0;
			var headers = {
				'requesttoken': OC.requestToken
			};

			return DavClient.propFind(url, PROPERTIES, depth, headers).then(function (response) {
				var body = response.body;
				if (body.propStat.length < 1) {
					throw new Error('Loading requested calendar failed');
				}

				var responseCode = DavClient.getResponseCodeFromHTTPResponse(body.propStat[0].status);
				if (!DavClient.wasRequestSuccessful(responseCode)) {
					throw new Error('Loading requested calendar failed');
				}

				var resourceType = context.getResourceType(body);
				if (resourceType === CALENDAR_IDENTIFIER) {
					return CalendarFactory.calendar(privateAPI, body, context.userPrincipal);
				} else if (resourceType === WEBCAL_IDENTIFIER) {
					return CalendarFactory.webcal(privateAPI, body, context.userPrincipal);
				}
			}).then(function (calendar) {
				if (calendar.components.vevent === false) {
					throw new Error('Requested calendar exists, but does not qualify for storing events');
				}

				return calendar;
			});
		});
	};

	this.getPublicCalendar = function (token) {
		var urlPart = OC.linkToRemoteBase('dav') + '/public-calendars/' + token;

		var url = DavClient.buildUrl(urlPart);
		var depth = 0;
		var headers = {
			'requesttoken': OC.requestToken
		};

		return DavClient.propFind(url, PROPERTIES, depth, headers).then(function (response) {
			var body = response.body;
			if (body.propStat.length < 1) {
				throw new Error('Loading requested calendar failed');
			}

			var responseCode = DavClient.getResponseCodeFromHTTPResponse(body.propStat[0].status);
			if (!DavClient.wasRequestSuccessful(responseCode)) {
				throw new Error('Loading requested calendar failed');
			}

			return CalendarFactory.calendar(privateAPI, body, '', true);
		}).then(function (calendar) {
			if (calendar.components.vevent === false) {
				throw new Error('Requested calendar exists, but does not qualify for storing events');
			}

			return calendar;
		});
	};

	this.create = function (name, color) {
		var components = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ['vevent', 'vtodo'];

		return context.bootPromise.then(function () {
			var _XMLUtility$getRootSk = XMLUtility.getRootSkeleton([DavClient.NS_DAV, 'd:mkcol'], [DavClient.NS_DAV, 'd:set'], [DavClient.NS_DAV, 'd:prop']),
			    _XMLUtility$getRootSk2 = _slicedToArray(_XMLUtility$getRootSk, 2),
			    skeleton = _XMLUtility$getRootSk2[0],
			    dPropChildren = _XMLUtility$getRootSk2[1];

			dPropChildren.push({
				name: [DavClient.NS_DAV, 'd:resourcetype'],
				children: [{
					name: [DavClient.NS_DAV, 'd:collection']
				}, {
					name: [DavClient.NS_IETF, 'c:calendar']
				}]
			});
			dPropChildren.push({
				name: [DavClient.NS_DAV, 'd:displayname'],
				value: name
			});
			dPropChildren.push({
				name: [DavClient.NS_APPLE, 'a:calendar-color'],
				value: color
			});
			dPropChildren.push({
				name: [DavClient.NS_OWNCLOUD, 'o:calendar-enabled'],
				value: '1'
			});
			dPropChildren.push({
				name: [DavClient.NS_IETF, 'c:supported-calendar-component-set'],
				children: components.map(function (component) {
					return {
						name: [DavClient.NS_IETF, 'c:comp'],
						attributes: [['name', component.toUpperCase()]]
					};
				})
			});

			var method = 'MKCOL';
			var uri = StringUtility.uri(name, context.isURIAvailable);
			var url = context.calendarHome + uri + '/';
			var headers = {
				'Content-Type': 'application/xml; charset=utf-8',
				'requesttoken': OC.requestToken
			};
			var xml = XMLUtility.serialize(skeleton);

			return DavClient.request(method, url, headers, xml).then(function (response) {
				if (response.status !== 201) {
					throw new Error('Creating a calendar failed');
				}

				context.usedURLs.push(url);

				return context.self.get(url);
			});
		});
	};

	this.createWebCal = function (name, color, source) {
		return context.bootPromise.then(function () {
			var _XMLUtility$getRootSk3 = XMLUtility.getRootSkeleton([DavClient.NS_DAV, 'd:mkcol'], [DavClient.NS_DAV, 'd:set'], [DavClient.NS_DAV, 'd:prop']),
			    _XMLUtility$getRootSk4 = _slicedToArray(_XMLUtility$getRootSk3, 2),
			    skeleton = _XMLUtility$getRootSk4[0],
			    dPropChildren = _XMLUtility$getRootSk4[1];

			dPropChildren.push({
				name: [DavClient.NS_DAV, 'd:resourcetype'],
				children: [{
					name: [DavClient.NS_DAV, 'd:collection']
				}, {
					name: [DavClient.NS_CALENDARSERVER, 'cs:subscribed']
				}]
			});
			dPropChildren.push({
				name: [DavClient.NS_DAV, 'd:displayname'],
				value: name
			});
			dPropChildren.push({
				name: [DavClient.NS_APPLE, 'a:calendar-color'],
				value: color
			});
			dPropChildren.push({
				name: [DavClient.NS_OWNCLOUD, 'o:calendar-enabled'],
				value: '1'
			});
			dPropChildren.push({
				name: [DavClient.NS_CALENDARSERVER, 'cs:source'],
				children: [{
					name: [DavClient.NS_DAV, 'd:href'],
					value: source
				}]
			});

			var method = 'MKCOL';
			var uri = StringUtility.uri(name, context.isURIAvailable);
			var url = context.calendarHome + uri + '/';
			var headers = {
				'Content-Type': 'application/xml; charset=utf-8',
				'requesttoken': OC.requestToken
			};
			var xml = XMLUtility.serialize(skeleton);

			return DavClient.request(method, url, headers, xml).then(function (response) {
				if (response.status !== 201) {
					throw new Error('Creating a webcal subscription failed');
				}

				context.usedURLs.push(url);

				return context.self.get(url);
			});
		});
	};

	privateAPI.get = function (calendar) {
	};

	privateAPI.update = function (calendar) {
		var updatedProperties = calendar.getUpdated();
		if (updatedProperties.length === 0) {
			return Promise.resolve(calendar);
		}

		var _XMLUtility$getRootSk5 = XMLUtility.getRootSkeleton([DavClient.NS_DAV, 'd:propertyupdate'], [DavClient.NS_DAV, 'd:set'], [DavClient.NS_DAV, 'd:prop']),
		    _XMLUtility$getRootSk6 = _slicedToArray(_XMLUtility$getRootSk5, 2),
		    skeleton = _XMLUtility$getRootSk6[0],
		    dPropChildren = _XMLUtility$getRootSk6[1];

		updatedProperties.forEach(function (name) {
			if (UPDATABLE_PROPERTIES.indexOf(name) === -1) {
				return;
			}

			var value = calendar[name];
			if (name === 'enabled') {
				value = value ? '1' : '0';
			}

			if (name === 'storedUrl') {
				dPropChildren.push({
					name: [DavClient.NS_CALENDARSERVER, 'cs:source'],
					children: [{
						name: [DavClient.NS_DAV, 'd:href'],
						value: value
					}]
				});
			} else {
				dPropChildren.push({
					name: UPDATABLE_PROPERTIES_MAP[name],
					value: value
				});
			}
		});
		calendar.resetUpdated();

		var method = 'PROPPATCH';
		var url = calendar.url;
		var headers = {
			'Content-Type': 'application/xml; charset=utf-8',
			'requesttoken': OC.requestToken
		};
		var xml = XMLUtility.serialize(skeleton);

		return DavClient.request(method, url, headers, xml).then(function (response) {
			if (!DavClient.wasRequestSuccessful(response.status)) {
				throw new Error('Updating calendar failed');
			}

			return calendar;
		});
	};

	privateAPI.delete = function (calendar) {
		var method = 'DELETE';
		var url = calendar.url;
		var headers = {
			'requesttoken': OC.requestToken
		};

		return DavClient.request(method, url, headers).then(function (response) {
			if (!DavClient.wasRequestSuccessful(response.status)) {
				throw new Error('Deleting calendar failed');
			}

			var index = context.usedURLs.indexOf(url);
			context.usedURLs.splice(index, 1);
		});
	};

	privateAPI.share = function (calendar, shareType, shareWith, shareWithDisplayname, writable, existingShare) {
		var _XMLUtility$getRootSk7 = XMLUtility.getRootSkeleton([DavClient.NS_OWNCLOUD, 'o:share'], [DavClient.NS_OWNCLOUD, 'o:set']),
		    _XMLUtility$getRootSk8 = _slicedToArray(_XMLUtility$getRootSk7, 2),
		    skeleton = _XMLUtility$getRootSk8[0],
		    oSetChildren = _XMLUtility$getRootSk8[1];

		var hrefValue = context.getShareValue(shareType, shareWith);
		oSetChildren.push({
			name: [DavClient.NS_DAV, 'd:href'],
			value: hrefValue
		});
		oSetChildren.push({
			name: [DavClient.NS_OWNCLOUD, 'o:summary'],
			value: t('calendar', '{calendar} shared by {owner}', {
				calendar: calendar.displayname,
				owner: calendar.owner
			})
		});
		if (writable) {
			oSetChildren.push({
				name: [DavClient.NS_OWNCLOUD, 'o:read-write']
			});
		}

		var method = 'POST';
		var url = calendar.url;
		var headers = {
			'Content-Type': 'application/xml; charset=utf-8',
			'requesttoken': OC.requestToken
		};
		var xml = XMLUtility.serialize(skeleton);

		return DavClient.request(method, url, headers, xml).then(function (response) {
			if (!DavClient.wasRequestSuccessful(response.status)) {
				throw new Error('Sharing calendar failed');
			}

			if (existingShare) {
				return;
			}

			if (shareType === SHARE_USER) {
				calendar.shares.users.push({
					id: shareWith,
					displayname: shareWithDisplayname,
					writable: writable
				});
			} else if (shareType === SHARE_GROUP) {
				calendar.shares.groups.push({
					id: shareWith,
					displayname: shareWithDisplayname,
					writable: writable
				});
			} else {
				calendar.shares.circles.push({
					id: shareWith,
					displayname: shareWithDisplayname,
					writable: writable
				});
			}
		});
	};

	privateAPI.unshare = function (calendar, shareType, shareWith) {
		var _XMLUtility$getRootSk9 = XMLUtility.getRootSkeleton([DavClient.NS_OWNCLOUD, 'o:share'], [DavClient.NS_OWNCLOUD, 'o:remove']),
		    _XMLUtility$getRootSk10 = _slicedToArray(_XMLUtility$getRootSk9, 2),
		    skeleton = _XMLUtility$getRootSk10[0],
		    oRemoveChildren = _XMLUtility$getRootSk10[1];

		var hrefValue = context.getShareValue(shareType, shareWith);
		oRemoveChildren.push({
			name: [DavClient.NS_DAV, 'd:href'],
			value: hrefValue
		});

		var method = 'POST';
		var url = calendar.url;
		var headers = {
			'Content-Type': 'application/xml; charset=utf-8',
			'requesttoken': OC.requestToken
		};
		var xml = XMLUtility.serialize(skeleton);

		return DavClient.request(method, url, headers, xml).then(function (response) {
			if (!DavClient.wasRequestSuccessful(response.status)) {
				throw new Error('Sharing calendar failed');
			}

			if (shareType === SHARE_USER) {
				var index = calendar.shares.users.findIndex(function (user) {
					return user.id === shareWith;
				});
				calendar.shares.users.splice(index, 1);
			} else if (shareType === SHARE_GROUP) {
				var _index = calendar.shares.groups.findIndex(function (group) {
					return group.id === shareWith;
				});
				calendar.shares.groups.splice(_index, 1);
			} else {
				var _index2 = calendar.shares.circles.findIndex(function (circle) {
					return circle.id === shareWith;
				});
				calendar.shares.circles.splice(_index2, 1);
			}
		});
	};

	privateAPI.publish = function (calendar) {
		var _XMLUtility$getRootSk11 = XMLUtility.getRootSkeleton([DavClient.NS_CALENDARSERVER, 'cs:publish-calendar']),
		    _XMLUtility$getRootSk12 = _slicedToArray(_XMLUtility$getRootSk11, 1),
		    skeleton = _XMLUtility$getRootSk12[0];

		var method = 'POST';
		var url = calendar.url;
		var headers = {
			'Content-Type': 'application/xml; charset=utf-8',
			requesttoken: oc_requesttoken
		};
		var xml = XMLUtility.serialize(skeleton);

		return DavClient.request(method, url, headers, xml).then(function (response) {
			if (!DavClient.wasRequestSuccessful(response.status)) {
				return false;
			}

			return true;
		});
	};

	privateAPI.unpublish = function (calendar) {
		var _XMLUtility$getRootSk13 = XMLUtility.getRootSkeleton([DavClient.NS_CALENDARSERVER, 'cs:unpublish-calendar']),
		    _XMLUtility$getRootSk14 = _slicedToArray(_XMLUtility$getRootSk13, 1),
		    skeleton = _XMLUtility$getRootSk14[0];

		var method = 'POST';
		var url = calendar.url;
		var headers = {
			'Content-Type': 'application/xml; charset=utf-8',
			requesttoken: oc_requesttoken
		};
		var xml = XMLUtility.serialize(skeleton);

		return DavClient.request(method, url, headers, xml).then(function (response) {
			if (!DavClient.wasRequestSuccessful(response.status)) {
				return false;
			}

			return true;
		});
	};
}]);
'use strict';


app.service('DavClient', ["$window", function ($window) {
	'use strict';

	var client = new dav.Client({
		baseUrl: OC.linkToRemote('dav/calendars'),
		xmlNamespaces: {
			'DAV:': 'd',
			'urn:ietf:params:xml:ns:caldav': 'c',
			'http://apple.com/ns/ical/': 'aapl',
			'http://owncloud.org/ns': 'oc',
			'http://nextcloud.com/ns': 'nc',
			'http://calendarserver.org/ns/': 'cs'
		}
	});

	client.NS_DAV = 'DAV:';
	client.NS_IETF = 'urn:ietf:params:xml:ns:caldav';
	client.NS_APPLE = 'http://apple.com/ns/ical/';
	client.NS_OWNCLOUD = 'http://owncloud.org/ns';
	client.NS_NEXTCLOUD = 'http://nextcloud.com/ns';
	client.NS_CALENDARSERVER = 'http://calendarserver.org/ns/';

	client.buildUrl = function (path) {
		if (path.substr(0, 1) !== '/') {
			path = '/' + path;
		}

		return $window.location.origin + path;
	};

	client.getNodesFullName = function (node) {
		return '{' + node.namespaceURI + '}' + node.localName;
	};

	client.getResponseCodeFromHTTPResponse = function (t) {
		return parseInt(t.split(' ')[1]);
	};

	client.wasRequestSuccessful = function (status) {
		return status >= 200 && status <= 299;
	};

	return client;
}]);
'use strict';


app.service('EventsEditorDialogService', ["$uibModal", "constants", "settings", function ($uibModal, constants, settings) {
	'use strict';

	var EDITOR_POPOVER = 'eventspopovereditor.html';
	var EDITOR_SIDEBAR = 'eventssidebareditor.html';
	var REPEAT_QUESTION = ''; 

	var context = {
		fcEvent: null,
		promise: null,
		eventModal: null
	};

	context.cleanup = function () {
		context.fcEvent = null;
		context.promise = null;
		context.eventModal = null;
	};

	context.showPopover = function () {
		return angular.element(window).width() > 768;
	};

	context.positionPopover = function (position) {
		angular.element('#popover-container').css('display', 'none');
		angular.forEach(position, function (v) {
			angular.element('.modal').css(v.name, v.value);
		});
		angular.element('#popover-container').css('display', 'block');
	};

	context.openDialog = function (template, resolve, reject, unlock, position, scope, fcEvent, _simpleEvent, _calendar) {
		context.fcEvent = fcEvent;
		context.eventModal = $uibModal.open({
			appendTo: template === EDITOR_POPOVER ? angular.element('#popover-container') : angular.element('#app-content'),
			controller: 'EditorController',
			resolve: {
				vevent: function vevent() {
					return fcEvent.vevent;
				},
				simpleEvent: function simpleEvent() {
					return _simpleEvent;
				},
				calendar: function calendar() {
					return _calendar;
				},
				isNew: function isNew() {
					return fcEvent.vevent.etag === null || fcEvent.vevent.etag === '';
				},
				emailAddress: function emailAddress() {
					return constants.emailAddress;
				}
			},
			scope: scope,
			templateUrl: template,
			windowClass: template === EDITOR_POPOVER ? 'popover' : null
		});

		if (template === EDITOR_SIDEBAR) {
			angular.element('#app-content').addClass('with-app-sidebar');
		}

		context.eventModal.rendered.then(function () {
			return context.positionPopover(position);
		});
		context.eventModal.result.then(function (result) {
			if (result.action === 'proceed') {
				context.openDialog(EDITOR_SIDEBAR, resolve, reject, unlock, [], scope, fcEvent, _simpleEvent, result.calendar);
			} else {
				if (template === EDITOR_SIDEBAR) {
					angular.element('#app-content').removeClass('with-app-sidebar');
				}

				unlock();
				context.cleanup();
				resolve({
					calendar: result.calendar,
					vevent: result.vevent
				});
			}
		}).catch(function (reason) {
			if (template === EDITOR_SIDEBAR) {
				angular.element('#app-content').removeClass('with-app-sidebar');
			}

			if (reason !== 'superseded') {
				context.cleanup();
			}

			unlock();
			reject(reason);
		});
	};

	context.openRepeatQuestion = function () {
	};

	this.open = function (scope, fcEvent, calculatePosition, lock, unlock) {
		if (context.fcEvent === fcEvent) {
			return context.promise;
		}

		if (context.fcEvent) {
			context.eventModal.dismiss('superseded');
		}

		context.promise = new Promise(function (resolve, reject) {
			var position = calculatePosition();

			lock();

			var calendar = fcEvent.vevent ? fcEvent.vevent.calendar : null;
			var simpleEvent = fcEvent.getSimpleEvent();

			if (context.showPopover() && !settings.skipPopover) {
				context.openDialog(EDITOR_POPOVER, resolve, reject, unlock, position, scope, fcEvent, simpleEvent, calendar);
			} else {
				context.openDialog(EDITOR_SIDEBAR, resolve, reject, unlock, [], scope, fcEvent, simpleEvent, calendar);
			}
		});

		return context.promise;
	};

}]);
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();


app.service('HashService', ["$location", function ($location) {
	'use strict';

	var context = {
		hashId: null,
		parameters: new Map()
	};

	(function () {
		var hash = $location.url();

		if (!hash || hash === '') {
			return;
		}

		if (hash.startsWith('#')) {
			hash = hash.substr(1);
		}
		if (hash.startsWith('/')) {
			hash = hash.substr(1);
		}

		if (!hash.includes('?')) {
			return;
		}

		var questionMarkPosition = hash.indexOf('?');
		context.hashId = hash.substr(0, questionMarkPosition);

		var parameters = hash.substr(questionMarkPosition + 1);
		parameters.split('&').forEach(function (part) {
			var _part$split = part.split('='),
			    _part$split2 = _slicedToArray(_part$split, 2),
			    key = _part$split2[0],
			    value = _part$split2[1];

			context.parameters.set(key, decodeURIComponent(value));
		});
	})();

	this.runIfApplicable = function (id, callback) {
		if (id === context.hashId) {
			callback(context.parameters);
		}
	};
}]);
'use strict';


app.factory('is', function () {
  'use strict';

  return {
    loading: false
  };
});
'use strict';


app.service('MailerService', ['$rootScope', 'DavClient', function ($rootScope, DavClient) {
  'use strict';

  this.sendMail = function (dest, url, name) {
    var headers = {
      'Content-Type': 'application/json; charset=utf-8',
      requesttoken: oc_requesttoken
    };
    var mailBody = {
      'recipient': dest,
      'url': url,
      'calendarName': name
    };
    return DavClient.request('POST', $rootScope.baseUrl + 'public/sendmail', headers, JSON.stringify(mailBody));
  };
}]);
'use strict';


app.service('SettingsService', ['$rootScope', '$http', function ($rootScope, $http) {
	'use strict';

	this.getView = function () {
		return $http({
			method: 'GET',
			url: $rootScope.baseUrl + 'config',
			params: { key: 'view' }
		}).then(function (response) {
			return response.data.value;
		});
	};

	this.setView = function (view) {
		return $http({
			method: 'POST',
			url: $rootScope.baseUrl + 'config',
			data: {
				key: 'view',
				value: view
			}
		}).then(function () {
			return true;
		});
	};

	this.getSkipPopover = function () {
		return $http({
			method: 'GET',
			url: $rootScope.baseUrl + 'config',
			params: { key: 'skipPopover' }
		}).then(function (response) {
			return response.data.value;
		});
	};

	this.setSkipPopover = function (value) {
		return $http({
			method: 'POST',
			url: $rootScope.baseUrl + 'config',
			data: {
				key: 'skipPopover',
				value: value
			}
		}).then(function () {
			return true;
		});
	};

	this.getShowWeekNr = function () {
		return $http({
			method: 'GET',
			url: $rootScope.baseUrl + 'config',
			params: { key: 'showWeekNr' }
		}).then(function (response) {
			return response.data.value;
		});
	};

	this.setShowWeekNr = function (value) {
		return $http({
			method: 'POST',
			url: $rootScope.baseUrl + 'config',
			data: {
				key: 'showWeekNr',
				value: value
			}
		}).then(function () {
			return true;
		});
	};

	this.passedFirstRun = function () {
		return $http({
			method: 'POST',
			url: $rootScope.baseUrl + 'config',
			data: {
				key: 'firstRun'
			}
		}).then(function () {
			return true;
		});
	};

	this.getTimezone = function () {
		return $http({
			method: 'GET',
			url: $rootScope.baseUrl + 'config',
			params: { key: 'timezone' }
		}).then(function (response) {
			return response.data.value;
		});
	};

	this.setTimezone = function (value) {
		return $http({
			method: 'POST',
			url: $rootScope.baseUrl + 'config',
			data: {
				key: 'timezone',
				value: value
			}
		}).then(function () {
			return true;
		});
	};
}]);
'use strict';


app.service('TimezoneService', ["TimezoneDataProvider", "Timezone", function (TimezoneDataProvider, Timezone) {
	'use strict';

	var context = {};

	var timezoneList = Object.keys(TimezoneDataProvider.zones);

	context.isOlsonTimezone = function (tzName) {
		var hasSlash = tzName.indexOf('/') !== -1;
		var hasSpace = tzName.indexOf(' ') !== -1;
		var startsWithETC = tzName.startsWith('Etc');
		var startsWithUS = tzName.startsWith('US/');

		return hasSlash && !hasSpace && !startsWithETC && !startsWithUS;
	};

	this.get = function (tzid) {
		if (TimezoneDataProvider.aliases[tzid]) {
			tzid = TimezoneDataProvider.aliases[tzid].aliasTo;
		}

		if (tzid === 'UTC') {
			return Promise.resolve(new Timezone(ICAL.TimezoneService.get('UTC')));
		} else if (tzid === 'floating') {
			return Promise.resolve(new Timezone(ICAL.Timezone.localTimezone));
		}

		if (!TimezoneDataProvider.zones.hasOwnProperty(tzid)) {
			return Promise.reject('Unknown timezone');
		}

		var ics = TimezoneDataProvider.zones[tzid].ics;
		return Promise.resolve(new Timezone(ics));
	};

	this.getDetected = function () {
		var tz = jstz.determine();
		var tzname = tz ? tz.name() : 'UTC';

		if (TimezoneDataProvider.aliases[tzname]) {
			return TimezoneDataProvider.aliases[tzname].aliasTo;
		}

		return tzname;
	};

	this.listAll = function () {
		var olsonAliases = [];
		angular.forEach(TimezoneDataProvider.aliases, function (value, key) {
			if (context.isOlsonTimezone(key)) {
				olsonAliases.push(key);
			}
		});

		var timezones = timezoneList.concat(olsonAliases).concat(['UTC']);
		timezones.sort();

		return Promise.resolve(timezones);
	};
}]);
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();


app.service('VEventService', ["DavClient", "StringUtility", "XMLUtility", "VEvent", function (DavClient, StringUtility, XMLUtility, VEvent) {
	'use strict';

	var context = {
		calendarDataPropName: '{' + DavClient.NS_IETF + '}calendar-data',
		eTagPropName: '{' + DavClient.NS_DAV + '}getetag',
		self: this
	};

	context.getEventUrl = function (event) {
		return event.calendar.url + event.uri;
	};

	context.getTimeRangeString = function (momentObject) {
		var utc = momentObject.utc();
		return utc.format('YYYYMMDD') + 'T' + utc.format('HHmmss') + 'Z';
	};

	this.getAll = function (calendar, start, end) {
		var _XMLUtility$getRootSk = XMLUtility.getRootSkeleton([DavClient.NS_IETF, 'c:calendar-query']),
		    _XMLUtility$getRootSk2 = _slicedToArray(_XMLUtility$getRootSk, 2),
		    skeleton = _XMLUtility$getRootSk2[0],
		    dPropChildren = _XMLUtility$getRootSk2[1];

		dPropChildren.push({
			name: [DavClient.NS_DAV, 'd:prop'],
			children: [{
				name: [DavClient.NS_DAV, 'd:getetag']
			}, {
				name: [DavClient.NS_IETF, 'c:calendar-data']
			}]
		});
		dPropChildren.push({
			name: [DavClient.NS_IETF, 'c:filter'],
			children: [{
				name: [DavClient.NS_IETF, 'c:comp-filter'],
				attributes: [['name', 'VCALENDAR']],
				children: [{
					name: [DavClient.NS_IETF, 'c:comp-filter'],
					attributes: [['name', 'VEVENT']],
					children: [{
						name: [DavClient.NS_IETF, 'c:time-range'],
						attributes: [['start', context.getTimeRangeString(start)], ['end', context.getTimeRangeString(end)]]
					}]
				}]
			}]
		});

		var url = calendar.url;
		var headers = {
			'Content-Type': 'application/xml; charset=utf-8',
			'Depth': 1,
			'requesttoken': OC.requestToken
		};
		var xml = XMLUtility.serialize(skeleton);

		return DavClient.request('REPORT', url, headers, xml).then(function (response) {
			if (!DavClient.wasRequestSuccessful(response.status)) {
				return Promise.reject(response);
			}

			var vevents = [];
			for (var key in response.body) {
				if (!response.body.hasOwnProperty(key)) {
					continue;
				}

				var obj = response.body[key];
				var props = obj.propStat[0].properties;
				var calendarData = props[context.calendarDataPropName];
				var etag = props[context.eTagPropName];
				var uri = obj.href.substr(obj.href.lastIndexOf('/') + 1);

				try {
					var vevent = VEvent.fromRawICS(calendar, calendarData, uri, etag);
					vevents.push(vevent);
				} catch (e) {
					console.log(e);
				}
			}

			return vevents;
		});
	};

	this.get = function (calendar, uri) {
		var url = calendar.url + uri;
		var headers = {
			'requesttoken': OC.requestToken
		};

		return DavClient.request('GET', url, headers, '').then(function (response) {
			if (!DavClient.wasRequestSuccessful(response.status)) {
				return Promise.reject(response);
			}

			var calendarData = response.body;
			var etag = response.xhr.getResponseHeader('ETag');

			try {
				return VEvent.fromRawICS(calendar, calendarData, uri, etag);
			} catch (e) {
				console.log(e);
				return Promise.reject(e);
			}
		});
	};

	this.create = function (calendar, data) {
		var returnEvent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

		var headers = {
			'Content-Type': 'text/calendar; charset=utf-8',
			'requesttoken': OC.requestToken
		};
		var uri = StringUtility.uid('Nextcloud', 'ics');
		var url = calendar.url + uri;

		return DavClient.request('PUT', url, headers, data).then(function (response) {
			if (!DavClient.wasRequestSuccessful(response.status)) {
				return Promise.reject(response);
			}

			if (returnEvent) {
				return context.self.get(calendar, uri);
			} else {
				return true;
			}
		});
	};

	this.update = function (event) {
		var url = context.getEventUrl(event);
		var headers = {
			'Content-Type': 'text/calendar; charset=utf-8',
			'If-Match': event.etag,
			'requesttoken': OC.requestToken
		};
		var payload = event.data;

		return DavClient.request('PUT', url, headers, payload).then(function (response) {
			if (!DavClient.wasRequestSuccessful(response.status)) {
				return Promise.reject(response);
			}

			event.etag = response.xhr.getResponseHeader('ETag');

			return true;
		});
	};

	this.delete = function (event) {
		var url = context.getEventUrl(event);
		var headers = {
			'If-Match': event.etag,
			'requesttoken': OC.requestToken
		};

		return DavClient.request('DELETE', url, headers, '').then(function (response) {
			if (DavClient.wasRequestSuccessful(response.status)) {
				return true;
			} else {
				return Promise.reject(response);
			}
		});
	};
}]);
'use strict';


app.service('WebCalService', ["$http", "ICalSplitterUtility", "WebCalUtility", "SplittedICal", function ($http, ICalSplitterUtility, WebCalUtility, SplittedICal) {
	'use strict';

	var self = this;
	var context = {
		cachedSplittedICals: {}
	};

	this.get = function (webcalUrl, allowDowngradeToHttp) {
		if (context.cachedSplittedICals.hasOwnProperty(webcalUrl)) {
			return Promise.resolve(context.cachedSplittedICals[webcalUrl]);
		}

		if (allowDowngradeToHttp === undefined) {
			allowDowngradeToHttp = WebCalUtility.allowDowngrade(webcalUrl);
		}

		webcalUrl = WebCalUtility.fixURL(webcalUrl);
		var url = WebCalUtility.buildProxyURL(webcalUrl);

		var localWebcal = JSON.parse(localStorage.getItem(webcalUrl));
		if (localWebcal && localWebcal.timestamp > new Date().getTime()) {
			return Promise.resolve(ICalSplitterUtility.split(localWebcal.value));
		}

		return $http.get(url).then(function (response) {
			var splitted = ICalSplitterUtility.split(response.data);

			if (!SplittedICal.isSplittedICal(splitted)) {
				return Promise.reject(t('calendar', 'Please enter a valid WebCal-URL'));
			}

			context.cachedSplittedICals[webcalUrl] = splitted;
			localStorage.setItem(webcalUrl, JSON.stringify({ value: response.data, timestamp: new Date().getTime() + 7200000 })); 

			return splitted;
		}).catch(function (e) {
			if (WebCalUtility.downgradePossible(webcalUrl, allowDowngradeToHttp)) {
				var httpUrl = WebCalUtility.downgradeURL(webcalUrl);

				return self.get(httpUrl, false).then(function (splitted) {
					context.cachedSplittedICals[webcalUrl] = splitted;
					return splitted;
				});
			}

			if (e.status === 422) {
				return Promise.reject({
					error: true,
					redirect: false,
					message: e.data.message
				});
			} else if (e.status === 400) {
				return Promise.reject({
					error: false,
					redirect: true,
					new_url: e.data.new_url
				});
			} else {
				return Promise.reject({
					error: true,
					redirect: false,
					message: t('calendar', 'Severe error in webcal proxy. Please contact administrator for more information.')
				});
			}
		});
	};
}]);
app.service('TimezoneDataProvider', function () { return {
  "version": "2.2016j",
  "aliases": {
    "AUS Central Standard Time": {
      "aliasTo": "Australia/Darwin"
    },
    "AUS Eastern Standard Time": {
      "aliasTo": "Australia/Sydney"
    },
    "Afghanistan Standard Time": {
      "aliasTo": "Asia/Kabul"
    },
    "Africa/Asmera": {
      "aliasTo": "Africa/Asmara"
    },
    "Africa/Timbuktu": {
      "aliasTo": "Africa/Bamako"
    },
    "Alaskan Standard Time": {
      "aliasTo": "America/Anchorage"
    },
    "America/Argentina/ComodRivadavia": {
      "aliasTo": "America/Argentina/Catamarca"
    },
    "America/Buenos_Aires": {
      "aliasTo": "America/Argentina/Buenos_Aires"
    },
    "America/Louisville": {
      "aliasTo": "America/Kentucky/Louisville"
    },
    "America/Montreal": {
      "aliasTo": "America/Toronto"
    },
    "America/Santa_Isabel": {
      "aliasTo": "America/Tijuana"
    },
    "Arab Standard Time": {
      "aliasTo": "Asia/Riyadh"
    },
    "Arabian Standard Time": {
      "aliasTo": "Asia/Dubai"
    },
    "Arabic Standard Time": {
      "aliasTo": "Asia/Baghdad"
    },
    "Argentina Standard Time": {
      "aliasTo": "America/Argentina/Buenos_Aires"
    },
    "Asia/Calcutta": {
      "aliasTo": "Asia/Kolkata"
    },
    "Asia/Katmandu": {
      "aliasTo": "Asia/Kathmandu"
    },
    "Asia/Rangoon": {
      "aliasTo": "Asia/Yangon"
    },
    "Asia/Saigon": {
      "aliasTo": "Asia/Ho_Chi_Minh"
    },
    "Atlantic Standard Time": {
      "aliasTo": "America/Halifax"
    },
    "Atlantic/Faeroe": {
      "aliasTo": "Atlantic/Faroe"
    },
    "Atlantic/Jan_Mayen": {
      "aliasTo": "Europe/Oslo"
    },
    "Azerbaijan Standard Time": {
      "aliasTo": "Asia/Baku"
    },
    "Azores Standard Time": {
      "aliasTo": "Atlantic/Azores"
    },
    "Bahia Standard Time": {
      "aliasTo": "America/Bahia"
    },
    "Bangladesh Standard Time": {
      "aliasTo": "Asia/Dhaka"
    },
    "Belarus Standard Time": {
      "aliasTo": "Europe/Minsk"
    },
    "Canada Central Standard Time": {
      "aliasTo": "America/Regina"
    },
    "Cape Verde Standard Time": {
      "aliasTo": "Atlantic/Cape_Verde"
    },
    "Caucasus Standard Time": {
      "aliasTo": "Asia/Yerevan"
    },
    "Cen. Australia Standard Time": {
      "aliasTo": "Australia/Adelaide"
    },
    "Central America Standard Time": {
      "aliasTo": "America/Guatemala"
    },
    "Central Asia Standard Time": {
      "aliasTo": "Asia/Almaty"
    },
    "Central Brazilian Standard Time": {
      "aliasTo": "America/Cuiaba"
    },
    "Central Europe Standard Time": {
      "aliasTo": "Europe/Budapest"
    },
    "Central European Standard Time": {
      "aliasTo": "Europe/Warsaw"
    },
    "Central Pacific Standard Time": {
      "aliasTo": "Pacific/Guadalcanal"
    },
    "Central Standard Time": {
      "aliasTo": "America/Chicago"
    },
    "Central Standard Time (Mexico)": {
      "aliasTo": "America/Mexico_City"
    },
    "China Standard Time": {
      "aliasTo": "Asia/Shanghai"
    },
    "E. Africa Standard Time": {
      "aliasTo": "Africa/Nairobi"
    },
    "E. Australia Standard Time": {
      "aliasTo": "Australia/Brisbane"
    },
    "E. South America Standard Time": {
      "aliasTo": "America/Sao_Paulo"
    },
    "Eastern Standard Time": {
      "aliasTo": "America/New_York"
    },
    "Egypt Standard Time": {
      "aliasTo": "Africa/Cairo"
    },
    "Ekaterinburg Standard Time": {
      "aliasTo": "Asia/Yekaterinburg"
    },
    "Etc/GMT": {
      "aliasTo": "UTC"
    },
    "Etc/GMT+0": {
      "aliasTo": "UTC"
    },
    "Etc/UCT": {
      "aliasTo": "UTC"
    },
    "Etc/UTC": {
      "aliasTo": "UTC"
    },
    "Etc/Unversal": {
      "aliasTo": "UTC"
    },
    "Etc/Zulu": {
      "aliasTo": "UTC"
    },
    "Europe/Belfast": {
      "aliasTo": "Europe/London"
    },
    "FLE Standard Time": {
      "aliasTo": "Europe/Kiev"
    },
    "Fiji Standard Time": {
      "aliasTo": "Pacific/Fiji"
    },
    "GMT": {
      "aliasTo": "UTC"
    },
    "GMT Standard Time": {
      "aliasTo": "Europe/London"
    },
    "GMT+0": {
      "aliasTo": "UTC"
    },
    "GMT0": {
      "aliasTo": "UTC"
    },
    "GTB Standard Time": {
      "aliasTo": "Europe/Bucharest"
    },
    "Georgian Standard Time": {
      "aliasTo": "Asia/Tbilisi"
    },
    "Greenland Standard Time": {
      "aliasTo": "America/Godthab"
    },
    "Greenwich": {
      "aliasTo": "UTC"
    },
    "Greenwich Standard Time": {
      "aliasTo": "Atlantic/Reykjavik"
    },
    "Hawaiian Standard Time": {
      "aliasTo": "Pacific/Honolulu"
    },
    "India Standard Time": {
      "aliasTo": "Asia/Calcutta"
    },
    "Iran Standard Time": {
      "aliasTo": "Asia/Tehran"
    },
    "Israel Standard Time": {
      "aliasTo": "Asia/Jerusalem"
    },
    "Jordan Standard Time": {
      "aliasTo": "Asia/Amman"
    },
    "Kaliningrad Standard Time": {
      "aliasTo": "Europe/Kaliningrad"
    },
    "Korea Standard Time": {
      "aliasTo": "Asia/Seoul"
    },
    "Libya Standard Time": {
      "aliasTo": "Africa/Tripoli"
    },
    "Line Islands Standard Time": {
      "aliasTo": "Pacific/Kiritimati"
    },
    "Magadan Standard Time": {
      "aliasTo": "Asia/Magadan"
    },
    "Mauritius Standard Time": {
      "aliasTo": "Indian/Mauritius"
    },
    "Middle East Standard Time": {
      "aliasTo": "Asia/Beirut"
    },
    "Montevideo Standard Time": {
      "aliasTo": "America/Montevideo"
    },
    "Morocco Standard Time": {
      "aliasTo": "Africa/Casablanca"
    },
    "Mountain Standard Time": {
      "aliasTo": "America/Denver"
    },
    "Mountain Standard Time (Mexico)": {
      "aliasTo": "America/Chihuahua"
    },
    "Myanmar Standard Time": {
      "aliasTo": "Asia/Rangoon"
    },
    "N. Central Asia Standard Time": {
      "aliasTo": "Asia/Novosibirsk"
    },
    "Namibia Standard Time": {
      "aliasTo": "Africa/Windhoek"
    },
    "Nepal Standard Time": {
      "aliasTo": "Asia/Katmandu"
    },
    "New Zealand Standard Time": {
      "aliasTo": "Pacific/Auckland"
    },
    "Newfoundland Standard Time": {
      "aliasTo": "America/St_Johns"
    },
    "North Asia East Standard Time": {
      "aliasTo": "Asia/Irkutsk"
    },
    "North Asia Standard Time": {
      "aliasTo": "Asia/Krasnoyarsk"
    },
    "Pacific SA Standard Time": {
      "aliasTo": "America/Santiago"
    },
    "Pacific Standard Time": {
      "aliasTo": "America/Los_Angeles"
    },
    "Pacific Standard Time (Mexico)": {
      "aliasTo": "America/Santa_Isabel"
    },
    "Pakistan Standard Time": {
      "aliasTo": "Asia/Karachi"
    },
    "Paraguay Standard Time": {
      "aliasTo": "America/Asuncion"
    },
    "Romance Standard Time": {
      "aliasTo": "Europe/Paris"
    },
    "Russia Time Zone 10": {
      "aliasTo": "Asia/Srednekolymsk"
    },
    "Russia Time Zone 11": {
      "aliasTo": "Asia/Kamchatka"
    },
    "Russia Time Zone 3": {
      "aliasTo": "Europe/Samara"
    },
    "Russian Standard Time": {
      "aliasTo": "Europe/Moscow"
    },
    "SA Eastern Standard Time": {
      "aliasTo": "America/Cayenne"
    },
    "SA Pacific Standard Time": {
      "aliasTo": "America/Bogota"
    },
    "SA Western Standard Time": {
      "aliasTo": "America/La_Paz"
    },
    "SE Asia Standard Time": {
      "aliasTo": "Asia/Bangkok"
    },
    "Samoa Standard Time": {
      "aliasTo": "Pacific/Apia"
    },
    "Singapore Standard Time": {
      "aliasTo": "Asia/Singapore"
    },
    "South Africa Standard Time": {
      "aliasTo": "Africa/Johannesburg"
    },
    "Sri Lanka Standard Time": {
      "aliasTo": "Asia/Colombo"
    },
    "Syria Standard Time": {
      "aliasTo": "Asia/Damascus"
    },
    "Taipei Standard Time": {
      "aliasTo": "Asia/Taipei"
    },
    "Tasmania Standard Time": {
      "aliasTo": "Australia/Hobart"
    },
    "Tokyo Standard Time": {
      "aliasTo": "Asia/Tokyo"
    },
    "Tonga Standard Time": {
      "aliasTo": "Pacific/Tongatapu"
    },
    "Turkey Standard Time": {
      "aliasTo": "Europe/Istanbul"
    },
    "UCT": {
      "aliasTo": "UTC"
    },
    "US Eastern Standard Time": {
      "aliasTo": "America/Indiana/Indianapolis"
    },
    "US Mountain Standard Time": {
      "aliasTo": "America/Phoenix"
    },
    "US/Central": {
      "aliasTo": "America/Chicago"
    },
    "US/Eastern": {
      "aliasTo": "America/New_York"
    },
    "US/Mountain": {
      "aliasTo": "America/Denver"
    },
    "US/Pacific": {
      "aliasTo": "America/Los_Angeles"
    },
    "US/Pacific-New": {
      "aliasTo": "America/Los_Angeles"
    },
    "Ulaanbaatar Standard Time": {
      "aliasTo": "Asia/Ulaanbaatar"
    },
    "Universal": {
      "aliasTo": "UTC"
    },
    "Venezuela Standard Time": {
      "aliasTo": "America/Caracas"
    },
    "Vladivostok Standard Time": {
      "aliasTo": "Asia/Vladivostok"
    },
    "W. Australia Standard Time": {
      "aliasTo": "Australia/Perth"
    },
    "W. Central Africa Standard Time": {
      "aliasTo": "Africa/Lagos"
    },
    "W. Europe Standard Time": {
      "aliasTo": "Europe/Berlin"
    },
    "West Asia Standard Time": {
      "aliasTo": "Asia/Tashkent"
    },
    "West Pacific Standard Time": {
      "aliasTo": "Pacific/Port_Moresby"
    },
    "Yakutsk Standard Time": {
      "aliasTo": "Asia/Yakutsk"
    },
    "Z": {
      "aliasTo": "UTC"
    },
    "Zulu": {
      "aliasTo": "UTC"
    },
    "utc": {
      "aliasTo": "UTC"
    }
  },
  "zones": {
    "Africa/Abidjan": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Abidjan\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0051900",
      "longitude": "-0040200"
    },
    "Africa/Accra": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Accra\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0053300",
      "longitude": "+0001300"
    },
    "Africa/Addis_Ababa": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Addis_Ababa\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:EAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0090200",
      "longitude": "+0384200"
    },
    "Africa/Algiers": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Algiers\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0364700",
      "longitude": "+0030300"
    },
    "Africa/Asmara": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Asmara\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:EAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0152000",
      "longitude": "+0385300"
    },
    "Africa/Bamako": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Bamako\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0123900",
      "longitude": "-0080000"
    },
    "Africa/Bangui": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Bangui\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0100\r\nTZNAME:WAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0042200",
      "longitude": "+0183500"
    },
    "Africa/Banjul": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Banjul\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0132800",
      "longitude": "-0163900"
    },
    "Africa/Bissau": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Bissau\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0115100",
      "longitude": "-0153500"
    },
    "Africa/Blantyre": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Blantyre\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0200\r\nTZNAME:CAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0154700",
      "longitude": "+0350000"
    },
    "Africa/Brazzaville": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Brazzaville\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0100\r\nTZNAME:WAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0041600",
      "longitude": "+0151700"
    },
    "Africa/Bujumbura": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Bujumbura\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0200\r\nTZNAME:CAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0032300",
      "longitude": "+0292200"
    },
    "Africa/Cairo": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Cairo\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0300300",
      "longitude": "+0311500"
    },
    "Africa/Casablanca": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Casablanca\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0000\r\nTZNAME:WET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0100\r\nTZNAME:WEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE",
      "latitude": "+0333900",
      "longitude": "-0073500"
    },
    "Africa/Ceuta": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Ceuta\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0355300",
      "longitude": "-0051900"
    },
    "Africa/Conakry": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Conakry\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0093100",
      "longitude": "-0134300"
    },
    "Africa/Dakar": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Dakar\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0144000",
      "longitude": "-0172600"
    },
    "Africa/Dar_es_Salaam": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Dar_es_Salaam\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:EAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0064800",
      "longitude": "+0391700"
    },
    "Africa/Djibouti": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Djibouti\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:EAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0113600",
      "longitude": "+0430900"
    },
    "Africa/Douala": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Douala\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0100\r\nTZNAME:WAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0040300",
      "longitude": "+0094200"
    },
    "Africa/El_Aaiun": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/El_Aaiun\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0000\r\nTZNAME:WET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0100\r\nTZNAME:WEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE",
      "latitude": "+0270900",
      "longitude": "-0131200"
    },
    "Africa/Freetown": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Freetown\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0083000",
      "longitude": "-0131500"
    },
    "Africa/Gaborone": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Gaborone\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0200\r\nTZNAME:CAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0243900",
      "longitude": "+0255500"
    },
    "Africa/Harare": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Harare\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0200\r\nTZNAME:CAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0175000",
      "longitude": "+0310300"
    },
    "Africa/Johannesburg": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Johannesburg\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0200\r\nTZNAME:SAST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0261500",
      "longitude": "+0280000"
    },
    "Africa/Juba": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Juba\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:EAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0045100",
      "longitude": "+0313600"
    },
    "Africa/Kampala": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Kampala\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:EAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0001900",
      "longitude": "+0322500"
    },
    "Africa/Khartoum": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Khartoum\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:EAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0153600",
      "longitude": "+0323200"
    },
    "Africa/Kigali": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Kigali\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0200\r\nTZNAME:CAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0015700",
      "longitude": "+0300400"
    },
    "Africa/Kinshasa": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Kinshasa\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0100\r\nTZNAME:WAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0041800",
      "longitude": "+0151800"
    },
    "Africa/Lagos": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Lagos\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0100\r\nTZNAME:WAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0062700",
      "longitude": "+0032400"
    },
    "Africa/Libreville": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Libreville\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0100\r\nTZNAME:WAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0002300",
      "longitude": "+0092700"
    },
    "Africa/Lome": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Lome\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0060800",
      "longitude": "+0011300"
    },
    "Africa/Luanda": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Luanda\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0100\r\nTZNAME:WAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0084800",
      "longitude": "+0131400"
    },
    "Africa/Lubumbashi": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Lubumbashi\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0200\r\nTZNAME:CAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0114000",
      "longitude": "+0272800"
    },
    "Africa/Lusaka": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Lusaka\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0200\r\nTZNAME:CAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0152500",
      "longitude": "+0281700"
    },
    "Africa/Malabo": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Malabo\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0100\r\nTZNAME:WAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0034500",
      "longitude": "+0084700"
    },
    "Africa/Maputo": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Maputo\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0200\r\nTZNAME:CAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0255800",
      "longitude": "+0323500"
    },
    "Africa/Maseru": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Maseru\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0200\r\nTZNAME:SAST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0292800",
      "longitude": "+0273000"
    },
    "Africa/Mbabane": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Mbabane\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0200\r\nTZNAME:SAST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0261800",
      "longitude": "+0310600"
    },
    "Africa/Mogadishu": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Mogadishu\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:EAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0020400",
      "longitude": "+0452200"
    },
    "Africa/Monrovia": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Monrovia\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0061800",
      "longitude": "-0104700"
    },
    "Africa/Nairobi": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Nairobi\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:EAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0011700",
      "longitude": "+0364900"
    },
    "Africa/Ndjamena": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Ndjamena\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0100\r\nTZNAME:WAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0120700",
      "longitude": "+0150300"
    },
    "Africa/Niamey": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Niamey\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0100\r\nTZNAME:WAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0133100",
      "longitude": "+0020700"
    },
    "Africa/Nouakchott": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Nouakchott\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0180600",
      "longitude": "-0155700"
    },
    "Africa/Ouagadougou": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Ouagadougou\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0122200",
      "longitude": "-0013100"
    },
    "Africa/Porto-Novo": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Porto-Novo\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0100\r\nTZNAME:WAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0062900",
      "longitude": "+0023700"
    },
    "Africa/Sao_Tome": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Sao_Tome\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0002000",
      "longitude": "+0064400"
    },
    "Africa/Tripoli": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Tripoli\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0325400",
      "longitude": "+0131100"
    },
    "Africa/Tunis": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Tunis\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0364800",
      "longitude": "+0101100"
    },
    "Africa/Windhoek": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Africa/Windhoek\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:WAST\r\nDTSTART:19700906T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=9;BYDAY=1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:WAT\r\nDTSTART:19700405T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0223400",
      "longitude": "+0170600"
    },
    "America/Adak": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Adak\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-1000\r\nTZOFFSETTO:-0900\r\nTZNAME:HDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0900\r\nTZOFFSETTO:-1000\r\nTZNAME:HST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0515248",
      "longitude": "-1763929"
    },
    "America/Anchorage": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Anchorage\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0900\r\nTZOFFSETTO:-0800\r\nTZNAME:AKDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0800\r\nTZOFFSETTO:-0900\r\nTZNAME:AKST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0611305",
      "longitude": "-1495401"
    },
    "America/Anguilla": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Anguilla\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0181200",
      "longitude": "-0630400"
    },
    "America/Antigua": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Antigua\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0170300",
      "longitude": "-0614800"
    },
    "America/Araguaina": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Araguaina\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:BRT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0071200",
      "longitude": "-0481200"
    },
    "America/Argentina/Buenos_Aires": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Argentina/Buenos_Aires\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:ART\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0343600",
      "longitude": "-0582700"
    },
    "America/Argentina/Catamarca": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Argentina/Catamarca\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:ART\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0282800",
      "longitude": "-0654700"
    },
    "America/Argentina/Cordoba": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Argentina/Cordoba\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:ART\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0312400",
      "longitude": "-0641100"
    },
    "America/Argentina/Jujuy": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Argentina/Jujuy\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:ART\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0241100",
      "longitude": "-0651800"
    },
    "America/Argentina/La_Rioja": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Argentina/La_Rioja\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:ART\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0292600",
      "longitude": "-0665100"
    },
    "America/Argentina/Mendoza": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Argentina/Mendoza\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:ART\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0325300",
      "longitude": "-0684900"
    },
    "America/Argentina/Rio_Gallegos": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Argentina/Rio_Gallegos\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:ART\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0513800",
      "longitude": "-0691300"
    },
    "America/Argentina/Salta": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Argentina/Salta\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:ART\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0244700",
      "longitude": "-0652500"
    },
    "America/Argentina/San_Juan": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Argentina/San_Juan\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:ART\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0313200",
      "longitude": "-0683100"
    },
    "America/Argentina/San_Luis": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Argentina/San_Luis\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:ART\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0331900",
      "longitude": "-0662100"
    },
    "America/Argentina/Tucuman": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Argentina/Tucuman\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:ART\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0264900",
      "longitude": "-0651300"
    },
    "America/Argentina/Ushuaia": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Argentina/Ushuaia\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:ART\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0544800",
      "longitude": "-0681800"
    },
    "America/Aruba": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Aruba\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0123000",
      "longitude": "-0695800"
    },
    "America/Asuncion": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Asuncion\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0300\r\nTZNAME:PYST\r\nDTSTART:19701004T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0400\r\nTZNAME:PYT\r\nDTSTART:19700322T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=4SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0251600",
      "longitude": "-0574000"
    },
    "America/Atikokan": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Atikokan\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0484531",
      "longitude": "-0913718"
    },
    "America/Bahia": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Bahia\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:BRT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0125900",
      "longitude": "-0383100"
    },
    "America/Bahia_Banderas": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Bahia_Banderas\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19701025T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0500\r\nTZNAME:CDT\r\nDTSTART:19700405T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE",
      "latitude": "+0204800",
      "longitude": "-1051500"
    },
    "America/Barbados": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Barbados\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0130600",
      "longitude": "-0593700"
    },
    "America/Belem": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Belem\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:BRT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0012700",
      "longitude": "-0482900"
    },
    "America/Belize": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Belize\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0173000",
      "longitude": "-0881200"
    },
    "America/Blanc-Sablon": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Blanc-Sablon\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0512500",
      "longitude": "-0570700"
    },
    "America/Boa_Vista": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Boa_Vista\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0024900",
      "longitude": "-0604000"
    },
    "America/Bogota": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Bogota\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0500\r\nTZNAME:COT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0043600",
      "longitude": "-0740500"
    },
    "America/Boise": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Boise\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0700\r\nTZOFFSETTO:-0600\r\nTZNAME:MDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0700\r\nTZNAME:MST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0433649",
      "longitude": "-1161209"
    },
    "America/Cambridge_Bay": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Cambridge_Bay\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0700\r\nTZOFFSETTO:-0600\r\nTZNAME:MDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0700\r\nTZNAME:MST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0690650",
      "longitude": "-1050310"
    },
    "America/Campo_Grande": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Campo_Grande\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0300\r\nTZNAME:AMST\r\nDTSTART:19701018T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=3SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AMT\r\nDTSTART:19700215T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=2;BYDAY=3SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0202700",
      "longitude": "-0543700"
    },
    "America/Cancun": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Cancun\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0210500",
      "longitude": "-0864600"
    },
    "America/Caracas": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Caracas\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:VET\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0103000",
      "longitude": "-0665600"
    },
    "America/Cayenne": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Cayenne\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:GFT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0045600",
      "longitude": "-0522000"
    },
    "America/Cayman": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Cayman\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0191800",
      "longitude": "-0812300"
    },
    "America/Chicago": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Chicago\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0500\r\nTZNAME:CDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0415100",
      "longitude": "-0873900"
    },
    "America/Chihuahua": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Chihuahua\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0700\r\nTZOFFSETTO:-0600\r\nTZNAME:MDT\r\nDTSTART:19700405T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0700\r\nTZNAME:MST\r\nDTSTART:19701025T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0283800",
      "longitude": "-1060500"
    },
    "America/Costa_Rica": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Costa_Rica\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0095600",
      "longitude": "-0840500"
    },
    "America/Creston": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Creston\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0700\r\nTZOFFSETTO:-0700\r\nTZNAME:MST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0490600",
      "longitude": "-1163100"
    },
    "America/Cuiaba": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Cuiaba\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0300\r\nTZNAME:AMST\r\nDTSTART:19701018T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=3SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AMT\r\nDTSTART:19700215T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=2;BYDAY=3SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0153500",
      "longitude": "-0560500"
    },
    "America/Curacao": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Curacao\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0121100",
      "longitude": "-0690000"
    },
    "America/Danmarkshavn": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Danmarkshavn\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0764600",
      "longitude": "-0184000"
    },
    "America/Dawson": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Dawson\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0800\r\nTZOFFSETTO:-0700\r\nTZNAME:PDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0700\r\nTZOFFSETTO:-0800\r\nTZNAME:PST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0640400",
      "longitude": "-1392500"
    },
    "America/Dawson_Creek": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Dawson_Creek\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0700\r\nTZOFFSETTO:-0700\r\nTZNAME:MST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0594600",
      "longitude": "-1201400"
    },
    "America/Denver": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Denver\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0700\r\nTZOFFSETTO:-0600\r\nTZNAME:MDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0700\r\nTZNAME:MST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0394421",
      "longitude": "-1045903"
    },
    "America/Detroit": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Detroit\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0400\r\nTZNAME:EDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0421953",
      "longitude": "-0830245"
    },
    "America/Dominica": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Dominica\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0151800",
      "longitude": "-0612400"
    },
    "America/Edmonton": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Edmonton\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0700\r\nTZOFFSETTO:-0600\r\nTZNAME:MDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0700\r\nTZNAME:MST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0533300",
      "longitude": "-1132800"
    },
    "America/Eirunepe": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Eirunepe\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0500\r\nTZNAME:ACT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0064000",
      "longitude": "-0695200"
    },
    "America/El_Salvador": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/El_Salvador\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0134200",
      "longitude": "-0891200"
    },
    "America/Fort_Nelson": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Fort_Nelson\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0700\r\nTZOFFSETTO:-0700\r\nTZNAME:MST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0584800",
      "longitude": "-1224200"
    },
    "America/Fortaleza": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Fortaleza\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:BRT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0034300",
      "longitude": "-0383000"
    },
    "America/Glace_Bay": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Glace_Bay\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0300\r\nTZNAME:ADT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0461200",
      "longitude": "-0595700"
    },
    "America/Godthab": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Godthab\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0200\r\nTZNAME:WGST\r\nDTSTART:19700328T220000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYMONTHDAY=24,25,26,27,28,29,30;BYDAY=SA\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0200\r\nTZOFFSETTO:-0300\r\nTZNAME:WGT\r\nDTSTART:19701024T230000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYMONTHDAY=24,25,26,27,28,29,30;BYDAY=SA\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0641100",
      "longitude": "-0514400"
    },
    "America/Goose_Bay": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Goose_Bay\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0300\r\nTZNAME:ADT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE",
      "latitude": "+0532000",
      "longitude": "-0602500"
    },
    "America/Grand_Turk": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Grand_Turk\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0212800",
      "longitude": "-0710800"
    },
    "America/Grenada": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Grenada\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0120300",
      "longitude": "-0614500"
    },
    "America/Guadeloupe": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Guadeloupe\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0161400",
      "longitude": "-0613200"
    },
    "America/Guatemala": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Guatemala\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0143800",
      "longitude": "-0903100"
    },
    "America/Guayaquil": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Guayaquil\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0500\r\nTZNAME:ECT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0021000",
      "longitude": "-0795000"
    },
    "America/Guyana": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Guyana\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:GYT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0064800",
      "longitude": "-0581000"
    },
    "America/Halifax": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Halifax\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0300\r\nTZNAME:ADT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0443900",
      "longitude": "-0633600"
    },
    "America/Havana": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Havana\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0500\r\nTZNAME:CST\r\nDTSTART:19701101T010000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0400\r\nTZNAME:CDT\r\nDTSTART:19700308T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE",
      "latitude": "+0230800",
      "longitude": "-0822200"
    },
    "America/Hermosillo": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Hermosillo\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0700\r\nTZOFFSETTO:-0700\r\nTZNAME:MST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0290400",
      "longitude": "-1105800"
    },
    "America/Indiana/Indianapolis": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Indiana/Indianapolis\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0400\r\nTZNAME:EDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0394606",
      "longitude": "-0860929"
    },
    "America/Indiana/Knox": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Indiana/Knox\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0500\r\nTZNAME:CDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0411745",
      "longitude": "-0863730"
    },
    "America/Indiana/Marengo": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Indiana/Marengo\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0400\r\nTZNAME:EDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0382232",
      "longitude": "-0862041"
    },
    "America/Indiana/Petersburg": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Indiana/Petersburg\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0400\r\nTZNAME:EDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0382931",
      "longitude": "-0871643"
    },
    "America/Indiana/Tell_City": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Indiana/Tell_City\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0500\r\nTZNAME:CDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0375711",
      "longitude": "-0864541"
    },
    "America/Indiana/Vevay": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Indiana/Vevay\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0400\r\nTZNAME:EDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0384452",
      "longitude": "-0850402"
    },
    "America/Indiana/Vincennes": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Indiana/Vincennes\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0400\r\nTZNAME:EDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0384038",
      "longitude": "-0873143"
    },
    "America/Indiana/Winamac": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Indiana/Winamac\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0400\r\nTZNAME:EDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE",
      "latitude": "+0410305",
      "longitude": "-0863611"
    },
    "America/Inuvik": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Inuvik\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0700\r\nTZOFFSETTO:-0600\r\nTZNAME:MDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0700\r\nTZNAME:MST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0682059",
      "longitude": "-1334300"
    },
    "America/Iqaluit": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Iqaluit\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0400\r\nTZNAME:EDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0634400",
      "longitude": "-0682800"
    },
    "America/Jamaica": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Jamaica\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0175805",
      "longitude": "-0764736"
    },
    "America/Juneau": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Juneau\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0900\r\nTZOFFSETTO:-0800\r\nTZNAME:AKDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0800\r\nTZOFFSETTO:-0900\r\nTZNAME:AKST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0581807",
      "longitude": "-1342511"
    },
    "America/Kentucky/Louisville": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Kentucky/Louisville\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0400\r\nTZNAME:EDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0381515",
      "longitude": "-0854534"
    },
    "America/Kentucky/Monticello": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Kentucky/Monticello\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0400\r\nTZNAME:EDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0364947",
      "longitude": "-0845057"
    },
    "America/Kralendijk": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Kralendijk\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0120903",
      "longitude": "-0681636"
    },
    "America/La_Paz": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/La_Paz\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:BOT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0163000",
      "longitude": "-0680900"
    },
    "America/Lima": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Lima\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0500\r\nTZNAME:PET\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0120300",
      "longitude": "-0770300"
    },
    "America/Los_Angeles": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Los_Angeles\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0800\r\nTZOFFSETTO:-0700\r\nTZNAME:PDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0700\r\nTZOFFSETTO:-0800\r\nTZNAME:PST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0340308",
      "longitude": "-1181434"
    },
    "America/Lower_Princes": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Lower_Princes\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0180305",
      "longitude": "-0630250"
    },
    "America/Maceio": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Maceio\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:BRT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0094000",
      "longitude": "-0354300"
    },
    "America/Managua": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Managua\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0120900",
      "longitude": "-0861700"
    },
    "America/Manaus": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Manaus\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0030800",
      "longitude": "-0600100"
    },
    "America/Marigot": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Marigot\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0180400",
      "longitude": "-0630500"
    },
    "America/Martinique": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Martinique\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0143600",
      "longitude": "-0610500"
    },
    "America/Matamoros": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Matamoros\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0500\r\nTZNAME:CDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0255000",
      "longitude": "-0973000"
    },
    "America/Mazatlan": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Mazatlan\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0700\r\nTZOFFSETTO:-0600\r\nTZNAME:MDT\r\nDTSTART:19700405T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0700\r\nTZNAME:MST\r\nDTSTART:19701025T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0231300",
      "longitude": "-1062500"
    },
    "America/Menominee": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Menominee\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0500\r\nTZNAME:CDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0450628",
      "longitude": "-0873651"
    },
    "America/Merida": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Merida\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0500\r\nTZNAME:CDT\r\nDTSTART:19700405T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19701025T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0205800",
      "longitude": "-0893700"
    },
    "America/Metlakatla": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Metlakatla\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0800\r\nTZOFFSETTO:-0900\r\nTZNAME:AKST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0900\r\nTZOFFSETTO:-0800\r\nTZNAME:AKDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE",
      "latitude": "+0550737",
      "longitude": "-1313435"
    },
    "America/Mexico_City": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Mexico_City\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0500\r\nTZNAME:CDT\r\nDTSTART:19700405T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19701025T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0192400",
      "longitude": "-0990900"
    },
    "America/Miquelon": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Miquelon\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0200\r\nTZNAME:PMDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0200\r\nTZOFFSETTO:-0300\r\nTZNAME:PMST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0470300",
      "longitude": "-0562000"
    },
    "America/Moncton": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Moncton\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0300\r\nTZNAME:ADT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0460600",
      "longitude": "-0644700"
    },
    "America/Monterrey": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Monterrey\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0500\r\nTZNAME:CDT\r\nDTSTART:19700405T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19701025T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0254000",
      "longitude": "-1001900"
    },
    "America/Montevideo": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Montevideo\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:UYT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0345300",
      "longitude": "-0561100"
    },
    "America/Montserrat": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Montserrat\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0164300",
      "longitude": "-0621300"
    },
    "America/Nassau": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Nassau\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0400\r\nTZNAME:EDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0250500",
      "longitude": "-0772100"
    },
    "America/New_York": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/New_York\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0400\r\nTZNAME:EDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0404251",
      "longitude": "-0740023"
    },
    "America/Nipigon": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Nipigon\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0400\r\nTZNAME:EDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0490100",
      "longitude": "-0881600"
    },
    "America/Nome": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Nome\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0900\r\nTZOFFSETTO:-0800\r\nTZNAME:AKDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0800\r\nTZOFFSETTO:-0900\r\nTZNAME:AKST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0643004",
      "longitude": "-1652423"
    },
    "America/Noronha": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Noronha\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0200\r\nTZOFFSETTO:-0200\r\nTZNAME:FNT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0035100",
      "longitude": "-0322500"
    },
    "America/North_Dakota/Beulah": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/North_Dakota/Beulah\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0500\r\nTZNAME:CDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0471551",
      "longitude": "-1014640"
    },
    "America/North_Dakota/Center": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/North_Dakota/Center\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0500\r\nTZNAME:CDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0470659",
      "longitude": "-1011757"
    },
    "America/North_Dakota/New_Salem": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/North_Dakota/New_Salem\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0500\r\nTZNAME:CDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0465042",
      "longitude": "-1012439"
    },
    "America/Ojinaga": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Ojinag1a\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0700\r\nTZOFFSETTO:-0600\r\nTZNAME:MDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0700\r\nTZNAME:MST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0293400",
      "longitude": "-1042500"
    },
    "America/Panama": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Panama\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0085800",
      "longitude": "-0793200"
    },
    "America/Pangnirtung": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Pangnirtung\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0400\r\nTZNAME:EDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0660800",
      "longitude": "-0654400"
    },
    "America/Paramaribo": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Paramaribo\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:SRT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0055000",
      "longitude": "-0551000"
    },
    "America/Phoenix": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Phoenix\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0700\r\nTZOFFSETTO:-0700\r\nTZNAME:MST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0332654",
      "longitude": "-1120424"
    },
    "America/Port-au-Prince": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Port-au-Prince\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0183200",
      "longitude": "-0722000"
    },
    "America/Port_of_Spain": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Port_of_Spain\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0103900",
      "longitude": "-0613100"
    },
    "America/Porto_Velho": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Porto_Velho\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0084600",
      "longitude": "-0635400"
    },
    "America/Puerto_Rico": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Puerto_Rico\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0182806",
      "longitude": "-0660622"
    },
    "America/Rainy_River": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Rainy_River\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0500\r\nTZNAME:CDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0484300",
      "longitude": "-0943400"
    },
    "America/Rankin_Inlet": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Rankin_Inlet\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0500\r\nTZNAME:CDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0624900",
      "longitude": "-0920459"
    },
    "America/Recife": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Recife\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:BRT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0080300",
      "longitude": "-0345400"
    },
    "America/Regina": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Regina\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0502400",
      "longitude": "-1043900"
    },
    "America/Resolute": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Resolute\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0500\r\nTZNAME:CDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE",
      "latitude": "+0744144",
      "longitude": "-0944945"
    },
    "America/Rio_Branco": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Rio_Branco\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0500\r\nTZNAME:ACT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0095800",
      "longitude": "-0674800"
    },
    "America/Santarem": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Santarem\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:BRT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0022600",
      "longitude": "-0545200"
    },
    "America/Santiago": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Santiago\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0400\r\nTZNAME:CLT\r\nDTSTART:19700510T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=5;BYMONTHDAY=9,10,11,12,13,14,15;BYDAY=SU\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0300\r\nTZNAME:CLST\r\nDTSTART:19700809T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=8;BYMONTHDAY=9,10,11,12,13,14,15;BYDAY=SU\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE",
      "latitude": "-0332700",
      "longitude": "-0704000"
    },
    "America/Santo_Domingo": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Santo_Domingo\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0182800",
      "longitude": "-0695400"
    },
    "America/Sao_Paulo": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Sao_Paulo\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0200\r\nTZNAME:BRST\r\nDTSTART:19701018T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=3SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:BRT\r\nDTSTART:19700215T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=2;BYDAY=3SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0233200",
      "longitude": "-0463700"
    },
    "America/Scoresbysund": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Scoresbysund\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0100\r\nTZOFFSETTO:+0000\r\nTZNAME:EGST\r\nDTSTART:19700329T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:-0100\r\nTZNAME:EGT\r\nDTSTART:19701025T010000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0702900",
      "longitude": "-0215800"
    },
    "America/Sitka": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Sitka\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0900\r\nTZOFFSETTO:-0800\r\nTZNAME:AKDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0800\r\nTZOFFSETTO:-0900\r\nTZNAME:AKST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0571035",
      "longitude": "-1351807"
    },
    "America/St_Barthelemy": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/St_Barthelemy\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0175300",
      "longitude": "-0625100"
    },
    "America/St_Johns": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/St_Johns\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0230\r\nTZOFFSETTO:-0330\r\nTZNAME:NST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0330\r\nTZOFFSETTO:-0230\r\nTZNAME:NDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE",
      "latitude": "+0473400",
      "longitude": "-0524300"
    },
    "America/St_Kitts": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/St_Kitts\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0171800",
      "longitude": "-0624300"
    },
    "America/St_Lucia": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/St_Lucia\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0140100",
      "longitude": "-0610000"
    },
    "America/St_Thomas": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/St_Thomas\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0182100",
      "longitude": "-0645600"
    },
    "America/St_Vincent": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/St_Vincent\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0130900",
      "longitude": "-0611400"
    },
    "America/Swift_Current": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Swift_Current\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0501700",
      "longitude": "-1075000"
    },
    "America/Tegucigalpa": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Tegucigalpa\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0140600",
      "longitude": "-0871300"
    },
    "America/Thule": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Thule\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0300\r\nTZNAME:ADT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0763400",
      "longitude": "-0684700"
    },
    "America/Thunder_Bay": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Thunder_Bay\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0400\r\nTZNAME:EDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0482300",
      "longitude": "-0891500"
    },
    "America/Tijuana": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Tijuana\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0800\r\nTZOFFSETTO:-0700\r\nTZNAME:PDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0700\r\nTZOFFSETTO:-0800\r\nTZNAME:PST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0323200",
      "longitude": "-1170100"
    },
    "America/Toronto": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Toronto\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0400\r\nTZNAME:EDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0433900",
      "longitude": "-0792300"
    },
    "America/Tortola": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Tortola\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0182700",
      "longitude": "-0643700"
    },
    "America/Vancouver": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Vancouver\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0800\r\nTZOFFSETTO:-0700\r\nTZNAME:PDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0700\r\nTZOFFSETTO:-0800\r\nTZNAME:PST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0491600",
      "longitude": "-1230700"
    },
    "America/Whitehorse": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Whitehorse\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0800\r\nTZOFFSETTO:-0700\r\nTZNAME:PDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0700\r\nTZOFFSETTO:-0800\r\nTZNAME:PST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0604300",
      "longitude": "-1350300"
    },
    "America/Winnipeg": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Winnipeg\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0500\r\nTZNAME:CDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0495300",
      "longitude": "-0970900"
    },
    "America/Yakutat": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Yakutat\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0900\r\nTZOFFSETTO:-0800\r\nTZNAME:AKDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0800\r\nTZOFFSETTO:-0900\r\nTZNAME:AKST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0593249",
      "longitude": "-1394338"
    },
    "America/Yellowknife": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:America/Yellowknife\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0700\r\nTZOFFSETTO:-0600\r\nTZNAME:MDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0700\r\nTZNAME:MST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0622700",
      "longitude": "-1142100"
    },
    "Antarctica/Casey": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Antarctica/Casey\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1100\r\nTZOFFSETTO:+1100\r\nTZNAME:+11\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0661700",
      "longitude": "+1103100"
    },
    "Antarctica/Davis": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Antarctica/Davis\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0700\r\nTZOFFSETTO:+0700\r\nTZNAME:+07\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0683500",
      "longitude": "+0775800"
    },
    "Antarctica/DumontDUrville": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Antarctica/DumontDUrville\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1000\r\nTZOFFSETTO:+1000\r\nTZNAME:+10\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0664000",
      "longitude": "+1400100"
    },
    "Antarctica/Macquarie": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Antarctica/Macquarie\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1100\r\nTZOFFSETTO:+1100\r\nTZNAME:MIST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0543000",
      "longitude": "+1585700"
    },
    "Antarctica/Mawson": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Antarctica/Mawson\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0500\r\nTZOFFSETTO:+0500\r\nTZNAME:+05\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0673600",
      "longitude": "+0625300"
    },
    "Antarctica/McMurdo": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Antarctica/McMurdo\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+1200\r\nTZOFFSETTO:+1300\r\nTZNAME:NZDT\r\nDTSTART:19700927T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=9;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1300\r\nTZOFFSETTO:+1200\r\nTZNAME:NZST\r\nDTSTART:19700405T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0775000",
      "longitude": "+1663600"
    },
    "Antarctica/Palmer": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Antarctica/Palmer\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0400\r\nTZNAME:CLT\r\nDTSTART:19700510T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=5;BYMONTHDAY=9,10,11,12,13,14,15;BYDAY=SU\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0300\r\nTZNAME:CLST\r\nDTSTART:19700809T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=8;BYMONTHDAY=9,10,11,12,13,14,15;BYDAY=SU\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE",
      "latitude": "-0644800",
      "longitude": "-0640600"
    },
    "Antarctica/Rothera": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Antarctica/Rothera\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:-03\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0673400",
      "longitude": "-0680800"
    },
    "Antarctica/Syowa": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Antarctica/Syowa\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:+03\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0690022",
      "longitude": "+0393524"
    },
    "Antarctica/Troll": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Antarctica/Troll\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0200\r\nTZNAME:+02\r\nDTSTART:19700329T010000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0000\r\nTZNAME:+00\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0720041",
      "longitude": "+0023206"
    },
    "Antarctica/Vostok": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Antarctica/Vostok\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0600\r\nTZOFFSETTO:+0600\r\nTZNAME:+06\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0782400",
      "longitude": "+1065400"
    },
    "Arctic/Longyearbyen": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Arctic/Longyearbyen\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0780000",
      "longitude": "+0160000"
    },
    "Asia/Aden": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Aden\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0124500",
      "longitude": "+0451200"
    },
    "Asia/Almaty": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Almaty\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0600\r\nTZOFFSETTO:+0600\r\nTZNAME:+06\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0431500",
      "longitude": "+0765700"
    },
    "Asia/Amman": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Amman\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:EEST\r\nDTSTART:19700326T235959\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1TH\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19701030T010000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1FR\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0315700",
      "longitude": "+0355600"
    },
    "Asia/Anadyr": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Anadyr\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1200\r\nTZOFFSETTO:+1200\r\nTZNAME:+12\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0644500",
      "longitude": "+1772900"
    },
    "Asia/Aqtau": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Aqtau\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0500\r\nTZOFFSETTO:+0500\r\nTZNAME:+05\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0443100",
      "longitude": "+0501600"
    },
    "Asia/Aqtobe": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Aqtobe\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0500\r\nTZOFFSETTO:+0500\r\nTZNAME:+05\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0501700",
      "longitude": "+0571000"
    },
    "Asia/Ashgabat": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Ashgabat\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0500\r\nTZOFFSETTO:+0500\r\nTZNAME:+05\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0375700",
      "longitude": "+0582300"
    },
    "Asia/Atyrau": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Atyrau\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0500\r\nTZOFFSETTO:+0500\r\nTZNAME:+05\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0470700",
      "longitude": "+0515600"
    },
    "Asia/Baghdad": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Baghdad\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0332100",
      "longitude": "+0442500"
    },
    "Asia/Bahrain": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Bahrain\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0262300",
      "longitude": "+0503500"
    },
    "Asia/Baku": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Baku\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0400\r\nTZOFFSETTO:+0400\r\nTZNAME:+04\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0402300",
      "longitude": "+0495100"
    },
    "Asia/Bangkok": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Bangkok\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0700\r\nTZOFFSETTO:+0700\r\nTZNAME:ICT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0134500",
      "longitude": "+1003100"
    },
    "Asia/Barnaul": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Barnaul\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0700\r\nTZOFFSETTO:+0700\r\nTZNAME:+07\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0532200",
      "longitude": "+0834500"
    },
    "Asia/Beirut": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Beirut\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:EEST\r\nDTSTART:19700329T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19701025T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0335300",
      "longitude": "+0353000"
    },
    "Asia/Bishkek": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Bishkek\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0600\r\nTZOFFSETTO:+0600\r\nTZNAME:+06\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0425400",
      "longitude": "+0743600"
    },
    "Asia/Brunei": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Brunei\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0800\r\nTZOFFSETTO:+0800\r\nTZNAME:BNT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0045600",
      "longitude": "+1145500"
    },
    "Asia/Chita": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Chita\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0900\r\nTZOFFSETTO:+0900\r\nTZNAME:+09\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0520300",
      "longitude": "+1132800"
    },
    "Asia/Choibalsan": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Choibalsan\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0800\r\nTZOFFSETTO:+0900\r\nTZNAME:CHOST\r\nDTSTART:19700328T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SA\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0900\r\nTZOFFSETTO:+0800\r\nTZNAME:CHOT\r\nDTSTART:19700926T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=9;BYDAY=-1SA\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0480400",
      "longitude": "+1143000"
    },
    "Asia/Colombo": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Colombo\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0530\r\nTZOFFSETTO:+0530\r\nTZNAME:+0530\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0065600",
      "longitude": "+0795100"
    },
    "Asia/Damascus": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Damascus\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19701030T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1FR\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:EEST\r\nDTSTART:19700327T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1FR\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE",
      "latitude": "+0333000",
      "longitude": "+0361800"
    },
    "Asia/Dhaka": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Dhaka\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0600\r\nTZOFFSETTO:+0600\r\nTZNAME:BDT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0234300",
      "longitude": "+0902500"
    },
    "Asia/Dili": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Dili\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0900\r\nTZOFFSETTO:+0900\r\nTZNAME:TLT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0083300",
      "longitude": "+1253500"
    },
    "Asia/Dubai": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Dubai\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0400\r\nTZOFFSETTO:+0400\r\nTZNAME:GST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0251800",
      "longitude": "+0551800"
    },
    "Asia/Dushanbe": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Dushanbe\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0500\r\nTZOFFSETTO:+0500\r\nTZNAME:+05\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0383500",
      "longitude": "+0684800"
    },
    "Asia/Famagusta": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Famagusta\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:+03\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0350700",
      "longitude": "+0335700"
    },
    "Asia/Gaza": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Gaza\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:EEST\r\nDTSTART:19700328T010000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SA\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19701031T010000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SA\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0313000",
      "longitude": "+0342800"
    },
    "Asia/Hebron": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Hebron\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:EEST\r\nDTSTART:19700328T010000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SA\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19701031T010000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SA\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0313200",
      "longitude": "+0350542"
    },
    "Asia/Ho_Chi_Minh": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Ho_Chi_Minh\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0700\r\nTZOFFSETTO:+0700\r\nTZNAME:ICT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0104500",
      "longitude": "+1064000"
    },
    "Asia/Hong_Kong": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Hong_Kong\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0800\r\nTZOFFSETTO:+0800\r\nTZNAME:HKT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0221700",
      "longitude": "+1140900"
    },
    "Asia/Hovd": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Hovd\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0700\r\nTZOFFSETTO:+0800\r\nTZNAME:HOVST\r\nDTSTART:19700328T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SA\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0800\r\nTZOFFSETTO:+0700\r\nTZNAME:HOVT\r\nDTSTART:19700926T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=9;BYDAY=-1SA\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0480100",
      "longitude": "+0913900"
    },
    "Asia/Irkutsk": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Irkutsk\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0800\r\nTZOFFSETTO:+0800\r\nTZNAME:+08\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0521600",
      "longitude": "+1042000"
    },
    "Asia/Istanbul": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Istanbul\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:+03\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0410100",
      "longitude": "+0285800"
    },
    "Asia/Jakarta": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Jakarta\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0700\r\nTZOFFSETTO:+0700\r\nTZNAME:WIB\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0061000",
      "longitude": "+1064800"
    },
    "Asia/Jayapura": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Jayapura\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0900\r\nTZOFFSETTO:+0900\r\nTZNAME:WIT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0023200",
      "longitude": "+1404200"
    },
    "Asia/Jerusalem": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Jerusalem\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:IDT\r\nDTSTART:19700327T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYMONTHDAY=23,24,25,26,27,28,29;BYDAY=FR\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:IST\r\nDTSTART:19701025T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0314650",
      "longitude": "+0351326"
    },
    "Asia/Kabul": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Kabul\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0430\r\nTZOFFSETTO:+0430\r\nTZNAME:AFT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0343100",
      "longitude": "+0691200"
    },
    "Asia/Kamchatka": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Kamchatka\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1200\r\nTZOFFSETTO:+1200\r\nTZNAME:+12\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0530100",
      "longitude": "+1583900"
    },
    "Asia/Karachi": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Karachi\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0500\r\nTZOFFSETTO:+0500\r\nTZNAME:PKT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0245200",
      "longitude": "+0670300"
    },
    "Asia/Kathmandu": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Kathmandu\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0545\r\nTZOFFSETTO:+0545\r\nTZNAME:NPT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0274300",
      "longitude": "+0851900"
    },
    "Asia/Khandyga": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Khandyga\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0900\r\nTZOFFSETTO:+0900\r\nTZNAME:+09\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0623923",
      "longitude": "+1353314"
    },
    "Asia/Kolkata": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Kolkata\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0530\r\nTZOFFSETTO:+0530\r\nTZNAME:IST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0223200",
      "longitude": "+0882200"
    },
    "Asia/Krasnoyarsk": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Krasnoyarsk\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0700\r\nTZOFFSETTO:+0700\r\nTZNAME:+07\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0560100",
      "longitude": "+0925000"
    },
    "Asia/Kuala_Lumpur": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Kuala_Lumpur\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0800\r\nTZOFFSETTO:+0800\r\nTZNAME:MYT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0031000",
      "longitude": "+1014200"
    },
    "Asia/Kuching": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Kuching\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0800\r\nTZOFFSETTO:+0800\r\nTZNAME:MYT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0013300",
      "longitude": "+1102000"
    },
    "Asia/Kuwait": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Kuwait\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0292000",
      "longitude": "+0475900"
    },
    "Asia/Macau": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Macau\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0800\r\nTZOFFSETTO:+0800\r\nTZNAME:CST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0221400",
      "longitude": "+1133500"
    },
    "Asia/Magadan": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Magadan\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1100\r\nTZOFFSETTO:+1100\r\nTZNAME:+11\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0593400",
      "longitude": "+1504800"
    },
    "Asia/Makassar": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Makassar\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0800\r\nTZOFFSETTO:+0800\r\nTZNAME:WITA\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0050700",
      "longitude": "+1192400"
    },
    "Asia/Manila": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Manila\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0800\r\nTZOFFSETTO:+0800\r\nTZNAME:PHT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0143500",
      "longitude": "+1210000"
    },
    "Asia/Muscat": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Muscat\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0400\r\nTZOFFSETTO:+0400\r\nTZNAME:GST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0233600",
      "longitude": "+0583500"
    },
    "Asia/Nicosia": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Nicosia\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19701025T040000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:EEST\r\nDTSTART:19700329T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE",
      "latitude": "+0351000",
      "longitude": "+0332200"
    },
    "Asia/Novokuznetsk": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Novokuznetsk\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0700\r\nTZOFFSETTO:+0700\r\nTZNAME:+07\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0534500",
      "longitude": "+0870700"
    },
    "Asia/Novosibirsk": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Novosibirsk\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0700\r\nTZOFFSETTO:+0700\r\nTZNAME:+07\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0550200",
      "longitude": "+0825500"
    },
    "Asia/Omsk": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Omsk\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0600\r\nTZOFFSETTO:+0600\r\nTZNAME:+06\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0550000",
      "longitude": "+0732400"
    },
    "Asia/Oral": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Oral\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0500\r\nTZOFFSETTO:+0500\r\nTZNAME:+05\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0511300",
      "longitude": "+0512100"
    },
    "Asia/Phnom_Penh": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Phnom_Penh\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0700\r\nTZOFFSETTO:+0700\r\nTZNAME:ICT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0113300",
      "longitude": "+1045500"
    },
    "Asia/Pontianak": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Pontianak\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0700\r\nTZOFFSETTO:+0700\r\nTZNAME:WIB\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0000200",
      "longitude": "+1092000"
    },
    "Asia/Pyongyang": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Pyongyang\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0830\r\nTZOFFSETTO:+0830\r\nTZNAME:KST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0390100",
      "longitude": "+1254500"
    },
    "Asia/Qatar": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Qatar\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0251700",
      "longitude": "+0513200"
    },
    "Asia/Qyzylorda": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Qyzylorda\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0600\r\nTZOFFSETTO:+0600\r\nTZNAME:+06\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0444800",
      "longitude": "+0652800"
    },
    "Asia/Riyadh": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Riyadh\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0243800",
      "longitude": "+0464300"
    },
    "Asia/Sakhalin": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Sakhalin\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1100\r\nTZOFFSETTO:+1100\r\nTZNAME:+11\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0465800",
      "longitude": "+1424200"
    },
    "Asia/Samarkand": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Samarkand\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0500\r\nTZOFFSETTO:+0500\r\nTZNAME:+05\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0394000",
      "longitude": "+0664800"
    },
    "Asia/Seoul": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Seoul\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0900\r\nTZOFFSETTO:+0900\r\nTZNAME:KST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0373300",
      "longitude": "+1265800"
    },
    "Asia/Shanghai": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Shanghai\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0800\r\nTZOFFSETTO:+0800\r\nTZNAME:CST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0311400",
      "longitude": "+1212800"
    },
    "Asia/Singapore": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Singapore\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0800\r\nTZOFFSETTO:+0800\r\nTZNAME:SGT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0011700",
      "longitude": "+1035100"
    },
    "Asia/Srednekolymsk": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Srednekolymsk\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1100\r\nTZOFFSETTO:+1100\r\nTZNAME:+11\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0672800",
      "longitude": "+1534300"
    },
    "Asia/Taipei": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Taipei\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0800\r\nTZOFFSETTO:+0800\r\nTZNAME:CST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0250300",
      "longitude": "+1213000"
    },
    "Asia/Tashkent": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Tashkent\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0500\r\nTZOFFSETTO:+0500\r\nTZNAME:+05\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0412000",
      "longitude": "+0691800"
    },
    "Asia/Tbilisi": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Tbilisi\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0400\r\nTZOFFSETTO:+0400\r\nTZNAME:+04\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0414300",
      "longitude": "+0444900"
    },
    "Asia/Tehran": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Tehran\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0330\r\nTZOFFSETTO:+0430\r\nTZNAME:IRDT\r\nDTSTART:19700321T000000\r\nRRULE:FREQ=YEARLY\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0430\r\nTZOFFSETTO:+0330\r\nTZNAME:IRST\r\nDTSTART:19700921T000000\r\nRRULE:FREQ=YEARLY\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0354000",
      "longitude": "+0512600"
    },
    "Asia/Thimphu": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Thimphu\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0600\r\nTZOFFSETTO:+0600\r\nTZNAME:BTT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0272800",
      "longitude": "+0893900"
    },
    "Asia/Tokyo": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Tokyo\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0900\r\nTZOFFSETTO:+0900\r\nTZNAME:JST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0353916",
      "longitude": "+1394441"
    },
    "Asia/Tomsk": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Tomsk\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0700\r\nTZOFFSETTO:+0700\r\nTZNAME:+07\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0563000",
      "longitude": "+0845800"
    },
    "Asia/Ulaanbaatar": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Ulaanbaatar\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0800\r\nTZOFFSETTO:+0900\r\nTZNAME:ULAST\r\nDTSTART:19700328T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SA\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0900\r\nTZOFFSETTO:+0800\r\nTZNAME:ULAT\r\nDTSTART:19700926T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=9;BYDAY=-1SA\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0475500",
      "longitude": "+1065300"
    },
    "Asia/Urumqi": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Urumqi\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0600\r\nTZOFFSETTO:+0600\r\nTZNAME:XJT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0434800",
      "longitude": "+0873500"
    },
    "Asia/Ust-Nera": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Ust-Nera\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1000\r\nTZOFFSETTO:+1000\r\nTZNAME:+10\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0643337",
      "longitude": "+1431336"
    },
    "Asia/Vientiane": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Vientiane\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0700\r\nTZOFFSETTO:+0700\r\nTZNAME:ICT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0175800",
      "longitude": "+1023600"
    },
    "Asia/Vladivostok": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Vladivostok\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1000\r\nTZOFFSETTO:+1000\r\nTZNAME:+10\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0431000",
      "longitude": "+1315600"
    },
    "Asia/Yakutsk": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Yakutsk\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0900\r\nTZOFFSETTO:+0900\r\nTZNAME:+09\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0620000",
      "longitude": "+1294000"
    },
    "Asia/Yangon": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Yangon\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0630\r\nTZOFFSETTO:+0630\r\nTZNAME:MMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0164700",
      "longitude": "+0961000"
    },
    "Asia/Yekaterinburg": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Yekaterinburg\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0500\r\nTZOFFSETTO:+0500\r\nTZNAME:+05\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0565100",
      "longitude": "+0603600"
    },
    "Asia/Yerevan": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Asia/Yerevan\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0400\r\nTZOFFSETTO:+0400\r\nTZNAME:+04\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0401100",
      "longitude": "+0443000"
    },
    "Atlantic/Azores": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Atlantic/Azores\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0100\r\nTZOFFSETTO:+0000\r\nTZNAME:AZOST\r\nDTSTART:19700329T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:-0100\r\nTZNAME:AZOT\r\nDTSTART:19701025T010000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0374400",
      "longitude": "-0254000"
    },
    "Atlantic/Bermuda": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Atlantic/Bermuda\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0300\r\nTZNAME:ADT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0321700",
      "longitude": "-0644600"
    },
    "Atlantic/Canary": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Atlantic/Canary\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0100\r\nTZNAME:WEST\r\nDTSTART:19700329T010000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0000\r\nTZNAME:WET\r\nDTSTART:19701025T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0280600",
      "longitude": "-0152400"
    },
    "Atlantic/Cape_Verde": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Atlantic/Cape_Verde\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0100\r\nTZOFFSETTO:-0100\r\nTZNAME:CVT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0145500",
      "longitude": "-0233100"
    },
    "Atlantic/Faroe": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Atlantic/Faroe\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0100\r\nTZNAME:WEST\r\nDTSTART:19700329T010000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0000\r\nTZNAME:WET\r\nDTSTART:19701025T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0620100",
      "longitude": "-0064600"
    },
    "Atlantic/Madeira": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Atlantic/Madeira\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0100\r\nTZNAME:WEST\r\nDTSTART:19700329T010000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0000\r\nTZNAME:WET\r\nDTSTART:19701025T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0323800",
      "longitude": "-0165400"
    },
    "Atlantic/Reykjavik": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Atlantic/Reykjavik\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0640900",
      "longitude": "-0215100"
    },
    "Atlantic/South_Georgia": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Atlantic/South_Georgia\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0200\r\nTZOFFSETTO:-0200\r\nTZNAME:GST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0541600",
      "longitude": "-0363200"
    },
    "Atlantic/St_Helena": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Atlantic/St_Helena\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0155500",
      "longitude": "-0054200"
    },
    "Atlantic/Stanley": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Atlantic/Stanley\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:FKST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0514200",
      "longitude": "-0575100"
    },
    "Australia/Adelaide": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Australia/Adelaide\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1030\r\nTZOFFSETTO:+0930\r\nTZNAME:ACST\r\nDTSTART:19700405T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0930\r\nTZOFFSETTO:+1030\r\nTZNAME:ACDT\r\nDTSTART:19701004T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=1SU\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE",
      "latitude": "-0345500",
      "longitude": "+1383500"
    },
    "Australia/Brisbane": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Australia/Brisbane\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1000\r\nTZOFFSETTO:+1000\r\nTZNAME:AEST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0272800",
      "longitude": "+1530200"
    },
    "Australia/Broken_Hill": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Australia/Broken_Hill\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1030\r\nTZOFFSETTO:+0930\r\nTZNAME:ACST\r\nDTSTART:19700405T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0930\r\nTZOFFSETTO:+1030\r\nTZNAME:ACDT\r\nDTSTART:19701004T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=1SU\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE",
      "latitude": "-0315700",
      "longitude": "+1412700"
    },
    "Australia/Currie": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Australia/Currie\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+1000\r\nTZOFFSETTO:+1100\r\nTZNAME:AEDT\r\nDTSTART:19701004T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1100\r\nTZOFFSETTO:+1000\r\nTZNAME:AEST\r\nDTSTART:19700405T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0395600",
      "longitude": "+1435200"
    },
    "Australia/Darwin": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Australia/Darwin\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0930\r\nTZOFFSETTO:+0930\r\nTZNAME:ACST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0122800",
      "longitude": "+1305000"
    },
    "Australia/Eucla": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Australia/Eucla\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0845\r\nTZOFFSETTO:+0845\r\nTZNAME:ACWST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0314300",
      "longitude": "+1285200"
    },
    "Australia/Hobart": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Australia/Hobart\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+1000\r\nTZOFFSETTO:+1100\r\nTZNAME:AEDT\r\nDTSTART:19701004T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1100\r\nTZOFFSETTO:+1000\r\nTZNAME:AEST\r\nDTSTART:19700405T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0425300",
      "longitude": "+1471900"
    },
    "Australia/Lindeman": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Australia/Lindeman\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1000\r\nTZOFFSETTO:+1000\r\nTZNAME:AEST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0201600",
      "longitude": "+1490000"
    },
    "Australia/Lord_Howe": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Australia/Lord_Howe\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1100\r\nTZOFFSETTO:+1030\r\nTZNAME:LHST\r\nDTSTART:19700405T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+1030\r\nTZOFFSETTO:+1100\r\nTZNAME:LHDT\r\nDTSTART:19701004T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=1SU\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE",
      "latitude": "-0313300",
      "longitude": "+1590500"
    },
    "Australia/Melbourne": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Australia/Melbourne\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1100\r\nTZOFFSETTO:+1000\r\nTZNAME:AEST\r\nDTSTART:19700405T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+1000\r\nTZOFFSETTO:+1100\r\nTZNAME:AEDT\r\nDTSTART:19701004T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=1SU\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE",
      "latitude": "-0374900",
      "longitude": "+1445800"
    },
    "Australia/Perth": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Australia/Perth\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0800\r\nTZOFFSETTO:+0800\r\nTZNAME:AWST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0315700",
      "longitude": "+1155100"
    },
    "Australia/Sydney": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Australia/Sydney\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1100\r\nTZOFFSETTO:+1000\r\nTZNAME:AEST\r\nDTSTART:19700405T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+1000\r\nTZOFFSETTO:+1100\r\nTZNAME:AEDT\r\nDTSTART:19701004T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=1SU\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE",
      "latitude": "-0335200",
      "longitude": "+1511300"
    },
    "Europe/Amsterdam": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Amsterdam\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0522200",
      "longitude": "+0045400"
    },
    "Europe/Andorra": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Andorra\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0423000",
      "longitude": "+0013100"
    },
    "Europe/Astrakhan": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Astrakhan\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0400\r\nTZOFFSETTO:+0400\r\nTZNAME:+04\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0462100",
      "longitude": "+0480300"
    },
    "Europe/Athens": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Athens\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:EEST\r\nDTSTART:19700329T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19701025T040000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0375800",
      "longitude": "+0234300"
    },
    "Europe/Belgrade": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Belgrade\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0445000",
      "longitude": "+0203000"
    },
    "Europe/Berlin": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Berlin\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0523000",
      "longitude": "+0132200"
    },
    "Europe/Bratislava": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Bratislava\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0480900",
      "longitude": "+0170700"
    },
    "Europe/Brussels": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Brussels\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0505000",
      "longitude": "+0042000"
    },
    "Europe/Bucharest": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Bucharest\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:EEST\r\nDTSTART:19700329T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19701025T040000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0442600",
      "longitude": "+0260600"
    },
    "Europe/Budapest": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Budapest\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0473000",
      "longitude": "+0190500"
    },
    "Europe/Busingen": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Busingen\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0474200",
      "longitude": "+0084100"
    },
    "Europe/Chisinau": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Chisinau\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:EEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0470000",
      "longitude": "+0285000"
    },
    "Europe/Copenhagen": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Copenhagen\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0554000",
      "longitude": "+0123500"
    },
    "Europe/Dublin": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Dublin\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0100\r\nTZNAME:IST\r\nDTSTART:19700329T010000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19701025T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0532000",
      "longitude": "-0061500"
    },
    "Europe/Gibraltar": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Gibraltar\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0360800",
      "longitude": "-0052100"
    },
    "Europe/Guernsey": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Guernsey\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0100\r\nTZNAME:BST\r\nDTSTART:19700329T010000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19701025T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0492700",
      "longitude": "-0023200"
    },
    "Europe/Helsinki": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Helsinki\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:EEST\r\nDTSTART:19700329T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19701025T040000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0601000",
      "longitude": "+0245800"
    },
    "Europe/Isle_of_Man": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Isle_of_Man\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0100\r\nTZNAME:BST\r\nDTSTART:19700329T010000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19701025T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0540900",
      "longitude": "-0042800"
    },
    "Europe/Istanbul": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Istanbul\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:+03\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0410100",
      "longitude": "+0285800"
    },
    "Europe/Jersey": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Jersey\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0100\r\nTZNAME:BST\r\nDTSTART:19700329T010000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19701025T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0491200",
      "longitude": "-0020700"
    },
    "Europe/Kaliningrad": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Kaliningrad\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0544300",
      "longitude": "+0203000"
    },
    "Europe/Kiev": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Kiev\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:EEST\r\nDTSTART:19700329T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19701025T040000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0502600",
      "longitude": "+0303100"
    },
    "Europe/Kirov": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Kirov\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:+03\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0583600",
      "longitude": "+0493900"
    },
    "Europe/Lisbon": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Lisbon\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0000\r\nTZNAME:WET\r\nDTSTART:19701025T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0100\r\nTZNAME:WEST\r\nDTSTART:19700329T010000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE",
      "latitude": "+0384300",
      "longitude": "-0090800"
    },
    "Europe/Ljubljana": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Ljubljana\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0460300",
      "longitude": "+0143100"
    },
    "Europe/London": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/London\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0100\r\nTZNAME:BST\r\nDTSTART:19700329T010000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19701025T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0513030",
      "longitude": "+0000731"
    },
    "Europe/Luxembourg": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Luxembourg\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0493600",
      "longitude": "+0060900"
    },
    "Europe/Madrid": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Madrid\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0402400",
      "longitude": "-0034100"
    },
    "Europe/Malta": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Malta\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0355400",
      "longitude": "+0143100"
    },
    "Europe/Mariehamn": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Mariehamn\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:EEST\r\nDTSTART:19700329T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19701025T040000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0600600",
      "longitude": "+0195700"
    },
    "Europe/Minsk": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Minsk\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:+03\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0535400",
      "longitude": "+0273400"
    },
    "Europe/Monaco": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Monaco\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0434200",
      "longitude": "+0072300"
    },
    "Europe/Moscow": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Moscow\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:MSK\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0554521",
      "longitude": "+0373704"
    },
    "Europe/Nicosia": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Nicosia\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19701025T040000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:EEST\r\nDTSTART:19700329T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE",
      "latitude": "+0351000",
      "longitude": "+0332200"
    },
    "Europe/Oslo": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Oslo\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0595500",
      "longitude": "+0104500"
    },
    "Europe/Paris": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Paris\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0485200",
      "longitude": "+0022000"
    },
    "Europe/Podgorica": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Podgorica\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0422600",
      "longitude": "+0191600"
    },
    "Europe/Prague": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Prague\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0500500",
      "longitude": "+0142600"
    },
    "Europe/Riga": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Riga\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:EEST\r\nDTSTART:19700329T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19701025T040000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0565700",
      "longitude": "+0240600"
    },
    "Europe/Rome": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Rome\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0415400",
      "longitude": "+0122900"
    },
    "Europe/Samara": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Samara\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0400\r\nTZOFFSETTO:+0400\r\nTZNAME:+04\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0531200",
      "longitude": "+0500900"
    },
    "Europe/San_Marino": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/San_Marino\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0435500",
      "longitude": "+0122800"
    },
    "Europe/Sarajevo": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Sarajevo\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0435200",
      "longitude": "+0182500"
    },
    "Europe/Saratov": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Saratov\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0400\r\nTZOFFSETTO:+0400\r\nTZNAME:+04\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0513400",
      "longitude": "+0460200"
    },
    "Europe/Simferopol": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Simferopol\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:MSK\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0445700",
      "longitude": "+0340600"
    },
    "Europe/Skopje": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Skopje\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0415900",
      "longitude": "+0212600"
    },
    "Europe/Sofia": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Sofia\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:EEST\r\nDTSTART:19700329T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19701025T040000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0424100",
      "longitude": "+0231900"
    },
    "Europe/Stockholm": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Stockholm\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0592000",
      "longitude": "+0180300"
    },
    "Europe/Tallinn": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Tallinn\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:EEST\r\nDTSTART:19700329T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19701025T040000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0592500",
      "longitude": "+0244500"
    },
    "Europe/Tirane": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Tirane\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0412000",
      "longitude": "+0195000"
    },
    "Europe/Ulyanovsk": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Ulyanovsk\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0400\r\nTZOFFSETTO:+0400\r\nTZNAME:+04\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0542000",
      "longitude": "+0482400"
    },
    "Europe/Uzhgorod": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Uzhgorod\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:EEST\r\nDTSTART:19700329T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19701025T040000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0483700",
      "longitude": "+0221800"
    },
    "Europe/Vaduz": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Vaduz\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0470900",
      "longitude": "+0093100"
    },
    "Europe/Vatican": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Vatican\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0415408",
      "longitude": "+0122711"
    },
    "Europe/Vienna": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Vienna\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0481300",
      "longitude": "+0162000"
    },
    "Europe/Vilnius": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Vilnius\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:EEST\r\nDTSTART:19700329T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19701025T040000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0544100",
      "longitude": "+0251900"
    },
    "Europe/Volgograd": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Volgograd\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:+03\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0484400",
      "longitude": "+0442500"
    },
    "Europe/Warsaw": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Warsaw\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0521500",
      "longitude": "+0210000"
    },
    "Europe/Zagreb": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Zagreb\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0454800",
      "longitude": "+0155800"
    },
    "Europe/Zaporozhye": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Zaporozhye\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:EEST\r\nDTSTART:19700329T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19701025T040000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0475000",
      "longitude": "+0351000"
    },
    "Europe/Zurich": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Europe/Zurich\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0472300",
      "longitude": "+0083200"
    },
    "Indian/Antananarivo": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Indian/Antananarivo\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:EAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0185500",
      "longitude": "+0473100"
    },
    "Indian/Chagos": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Indian/Chagos\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0600\r\nTZOFFSETTO:+0600\r\nTZNAME:IOT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0072000",
      "longitude": "+0722500"
    },
    "Indian/Christmas": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Indian/Christmas\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0700\r\nTZOFFSETTO:+0700\r\nTZNAME:CXT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0102500",
      "longitude": "+1054300"
    },
    "Indian/Cocos": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Indian/Cocos\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0630\r\nTZOFFSETTO:+0630\r\nTZNAME:CCT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0121000",
      "longitude": "+0965500"
    },
    "Indian/Comoro": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Indian/Comoro\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:EAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0114100",
      "longitude": "+0431600"
    },
    "Indian/Kerguelen": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Indian/Kerguelen\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0500\r\nTZOFFSETTO:+0500\r\nTZNAME:+05\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0492110",
      "longitude": "+0701303"
    },
    "Indian/Mahe": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Indian/Mahe\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0400\r\nTZOFFSETTO:+0400\r\nTZNAME:SCT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0044000",
      "longitude": "+0552800"
    },
    "Indian/Maldives": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Indian/Maldives\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0500\r\nTZOFFSETTO:+0500\r\nTZNAME:MVT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0041000",
      "longitude": "+0733000"
    },
    "Indian/Mauritius": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Indian/Mauritius\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0400\r\nTZOFFSETTO:+0400\r\nTZNAME:MUT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0201000",
      "longitude": "+0573000"
    },
    "Indian/Mayotte": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Indian/Mayotte\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:EAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0124700",
      "longitude": "+0451400"
    },
    "Indian/Reunion": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Indian/Reunion\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0400\r\nTZOFFSETTO:+0400\r\nTZNAME:RET\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0205200",
      "longitude": "+0552800"
    },
    "Pacific/Apia": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Pacific/Apia\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1400\r\nTZOFFSETTO:+1300\r\nTZNAME:WSST\r\nDTSTART:19700405T040000\r\nRRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+1300\r\nTZOFFSETTO:+1400\r\nTZNAME:WSDT\r\nDTSTART:19700927T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=9;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE",
      "latitude": "-0135000",
      "longitude": "-1714400"
    },
    "Pacific/Auckland": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Pacific/Auckland\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+1200\r\nTZOFFSETTO:+1300\r\nTZNAME:NZDT\r\nDTSTART:19700927T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=9;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1300\r\nTZOFFSETTO:+1200\r\nTZNAME:NZST\r\nDTSTART:19700405T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0365200",
      "longitude": "+1744600"
    },
    "Pacific/Bougainville": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Pacific/Bougainville\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1100\r\nTZOFFSETTO:+1100\r\nTZNAME:BST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0061300",
      "longitude": "+1553400"
    },
    "Pacific/Chatham": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Pacific/Chatham\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+1245\r\nTZOFFSETTO:+1345\r\nTZNAME:CHADT\r\nDTSTART:19700927T024500\r\nRRULE:FREQ=YEARLY;BYMONTH=9;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1345\r\nTZOFFSETTO:+1245\r\nTZNAME:CHAST\r\nDTSTART:19700405T034500\r\nRRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0435700",
      "longitude": "-1763300"
    },
    "Pacific/Chuuk": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Pacific/Chuuk\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1000\r\nTZOFFSETTO:+1000\r\nTZNAME:CHUT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0072500",
      "longitude": "+1514700"
    },
    "Pacific/Easter": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Pacific/Easter\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0600\r\nTZNAME:EAST\r\nDTSTART:19700509T220000\r\nRRULE:FREQ=YEARLY;BYMONTH=5;BYDAY=2SA\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0500\r\nTZNAME:EASST\r\nDTSTART:19700808T220000\r\nRRULE:FREQ=YEARLY;BYMONTH=8;BYDAY=2SA\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE",
      "latitude": "-0270900",
      "longitude": "-1092600"
    },
    "Pacific/Efate": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Pacific/Efate\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1100\r\nTZOFFSETTO:+1100\r\nTZNAME:VUT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0174000",
      "longitude": "+1682500"
    },
    "Pacific/Enderbury": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Pacific/Enderbury\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1300\r\nTZOFFSETTO:+1300\r\nTZNAME:PHOT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0030800",
      "longitude": "-1710500"
    },
    "Pacific/Fakaofo": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Pacific/Fakaofo\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1300\r\nTZOFFSETTO:+1300\r\nTZNAME:TKT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0092200",
      "longitude": "-1711400"
    },
    "Pacific/Fiji": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Pacific/Fiji\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+1200\r\nTZOFFSETTO:+1300\r\nTZNAME:FJST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1300\r\nTZOFFSETTO:+1200\r\nTZNAME:FJT\r\nDTSTART:19700118T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=1;BYDAY=3SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0180800",
      "longitude": "+1782500"
    },
    "Pacific/Funafuti": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Pacific/Funafuti\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1200\r\nTZOFFSETTO:+1200\r\nTZNAME:TVT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0083100",
      "longitude": "+1791300"
    },
    "Pacific/Galapagos": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Pacific/Galapagos\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0600\r\nTZNAME:GALT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0005400",
      "longitude": "-0893600"
    },
    "Pacific/Gambier": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Pacific/Gambier\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0900\r\nTZOFFSETTO:-0900\r\nTZNAME:GAMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0230800",
      "longitude": "-1345700"
    },
    "Pacific/Guadalcanal": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Pacific/Guadalcanal\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1100\r\nTZOFFSETTO:+1100\r\nTZNAME:SBT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0093200",
      "longitude": "+1601200"
    },
    "Pacific/Guam": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Pacific/Guam\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1000\r\nTZOFFSETTO:+1000\r\nTZNAME:ChST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0132800",
      "longitude": "+1444500"
    },
    "Pacific/Honolulu": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Pacific/Honolulu\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-1000\r\nTZOFFSETTO:-1000\r\nTZNAME:HST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0211825",
      "longitude": "-1575130"
    },
    "Pacific/Johnston": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Pacific/Johnston\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-1000\r\nTZOFFSETTO:-1000\r\nTZNAME:HST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0164500",
      "longitude": "-1693100"
    },
    "Pacific/Kiritimati": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Pacific/Kiritimati\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1400\r\nTZOFFSETTO:+1400\r\nTZNAME:LINT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0015200",
      "longitude": "-1572000"
    },
    "Pacific/Kosrae": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Pacific/Kosrae\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1100\r\nTZOFFSETTO:+1100\r\nTZNAME:KOST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0051900",
      "longitude": "+1625900"
    },
    "Pacific/Kwajalein": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Pacific/Kwajalein\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1200\r\nTZOFFSETTO:+1200\r\nTZNAME:MHT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0090500",
      "longitude": "+1672000"
    },
    "Pacific/Majuro": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Pacific/Majuro\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1200\r\nTZOFFSETTO:+1200\r\nTZNAME:MHT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0070900",
      "longitude": "+1711200"
    },
    "Pacific/Marquesas": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Pacific/Marquesas\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0930\r\nTZOFFSETTO:-0930\r\nTZNAME:MART\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0090000",
      "longitude": "-1393000"
    },
    "Pacific/Midway": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Pacific/Midway\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-1100\r\nTZOFFSETTO:-1100\r\nTZNAME:SST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0281300",
      "longitude": "-1772200"
    },
    "Pacific/Nauru": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Pacific/Nauru\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1200\r\nTZOFFSETTO:+1200\r\nTZNAME:NRT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0003100",
      "longitude": "+1665500"
    },
    "Pacific/Niue": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Pacific/Niue\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-1100\r\nTZOFFSETTO:-1100\r\nTZNAME:NUT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0190100",
      "longitude": "-1695500"
    },
    "Pacific/Norfolk": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Pacific/Norfolk\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1100\r\nTZOFFSETTO:+1100\r\nTZNAME:NFT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0290300",
      "longitude": "+1675800"
    },
    "Pacific/Noumea": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Pacific/Noumea\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1100\r\nTZOFFSETTO:+1100\r\nTZNAME:NCT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0221600",
      "longitude": "+1662700"
    },
    "Pacific/Pago_Pago": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Pacific/Pago_Pago\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-1100\r\nTZOFFSETTO:-1100\r\nTZNAME:SST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0141600",
      "longitude": "-1704200"
    },
    "Pacific/Palau": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Pacific/Palau\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0900\r\nTZOFFSETTO:+0900\r\nTZNAME:PWT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0072000",
      "longitude": "+1342900"
    },
    "Pacific/Pitcairn": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Pacific/Pitcairn\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0800\r\nTZOFFSETTO:-0800\r\nTZNAME:PST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0250400",
      "longitude": "-1300500"
    },
    "Pacific/Pohnpei": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Pacific/Pohnpei\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1100\r\nTZOFFSETTO:+1100\r\nTZNAME:PONT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0065800",
      "longitude": "+1581300"
    },
    "Pacific/Port_Moresby": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Pacific/Port_Moresby\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1000\r\nTZOFFSETTO:+1000\r\nTZNAME:PGT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0093000",
      "longitude": "+1471000"
    },
    "Pacific/Rarotonga": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Pacific/Rarotonga\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-1000\r\nTZOFFSETTO:-1000\r\nTZNAME:CKT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0211400",
      "longitude": "-1594600"
    },
    "Pacific/Saipan": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Pacific/Saipan\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1000\r\nTZOFFSETTO:+1000\r\nTZNAME:ChST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0151200",
      "longitude": "+1454500"
    },
    "Pacific/Tahiti": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Pacific/Tahiti\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-1000\r\nTZOFFSETTO:-1000\r\nTZNAME:TAHT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0173200",
      "longitude": "-1493400"
    },
    "Pacific/Tarawa": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Pacific/Tarawa\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1200\r\nTZOFFSETTO:+1200\r\nTZNAME:GILT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0012500",
      "longitude": "+1730000"
    },
    "Pacific/Tongatapu": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Pacific/Tongatapu\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+1300\r\nTZOFFSETTO:+1400\r\nTZNAME:+14\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1400\r\nTZOFFSETTO:+1300\r\nTZNAME:+13\r\nDTSTART:19700118T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=1;BYDAY=3SU\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0211000",
      "longitude": "-1751000"
    },
    "Pacific/Wake": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Pacific/Wake\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1200\r\nTZOFFSETTO:+1200\r\nTZNAME:WAKT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "+0191700",
      "longitude": "+1663700"
    },
    "Pacific/Wallis": {
      "ics": "BEGIN:VTIMEZONE\r\nTZID:Pacific/Wallis\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1200\r\nTZOFFSETTO:+1200\r\nTZNAME:WFT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE",
      "latitude": "-0131800",
      "longitude": "-1761000"
    }
  }
}
;});
})(angular, jQuery, oc_requesttoken);