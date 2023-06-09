import { Meteor } from 'meteor/meteor';
import { Integrations } from '@rocket.chat/models';

import { hasPermission } from '../../../../authorization/server';

Meteor.methods({
	async deleteIncomingIntegration(integrationId) {
		let integration;
		const { userId } = this;

		if (userId && hasPermission(userId, 'manage-incoming-integrations')) {
			integration = Integrations.findOneById(integrationId);
		} else if (userId && hasPermission(userId, 'manage-own-incoming-integrations')) {
			integration = Integrations.findOne({
				'_id': integrationId,
				'_createdBy._id': userId,
			});
		} else {
			throw new Meteor.Error('not_authorized', 'Unauthorized', {
				method: 'deleteIncomingIntegration',
			});
		}

		if (!(await integration)) {
			throw new Meteor.Error('error-invalid-integration', 'Invalid integration', {
				method: 'deleteIncomingIntegration',
			});
		}

		await Integrations.removeById(integrationId);

		return true;
	},
});
