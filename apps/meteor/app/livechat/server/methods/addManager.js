import { Meteor } from 'meteor/meteor';

import { hasPermission } from '../../../authorization/server';
import { Livechat } from '../lib/Livechat';
import { methodDeprecationLogger } from '../../../lib/server/lib/deprecationWarningLogger';

Meteor.methods({
	'livechat:addManager'(username) {
		methodDeprecationLogger.warn('livechat:addManager will be deprecated in future versions of Rocket.Chat');
		if (!Meteor.userId() || !hasPermission(Meteor.userId(), 'manage-livechat-managers')) {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'livechat:addManager' });
		}

		return Livechat.addManager(username);
	},
});
