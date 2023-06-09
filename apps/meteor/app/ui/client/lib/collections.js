import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { settings } from '../../../settings/client';
import { CachedChatRoom, CachedChatSubscription } from '../../../models/client';

Meteor.startup(() => {
	Tracker.autorun(() => {
		if (!Meteor.userId() && settings.get('Accounts_AllowAnonymousRead') === true) {
			CachedChatRoom.init();
			CachedChatSubscription.ready.set(true);
		}
	});
});
