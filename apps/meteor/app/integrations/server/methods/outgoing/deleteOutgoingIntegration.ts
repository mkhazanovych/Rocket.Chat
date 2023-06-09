import { Meteor } from 'meteor/meteor';
import { Integrations, IntegrationHistory } from '@rocket.chat/models';

import { hasPermission } from '../../../../authorization/server';

Meteor.methods({
	async deleteOutgoingIntegration(integrationId) {
		let integration;

		if (!this.userId) {
			throw new Meteor.Error('not_authorized', 'Unauthorized', {
				method: 'deleteOutgoingIntegration',
			});
		}

		if (hasPermission(this.userId, 'manage-outgoing-integrations')) {
			integration = Integrations.findOneById(integrationId);
		} else if (hasPermission(this.userId, 'manage-own-outgoing-integrations')) {
			integration = Integrations.findOne({
				'_id': integrationId,
				'_createdBy._id': this.userId,
			});
		} else {
			throw new Meteor.Error('not_authorized', 'Unauthorized', {
				method: 'deleteOutgoingIntegration',
			});
		}

		if (!(await integration)) {
			throw new Meteor.Error('error-invalid-integration', 'Invalid integration', {
				method: 'deleteOutgoingIntegration',
			});
		}

		await Integrations.removeById(integrationId);
		await IntegrationHistory.removeByIntegrationId(integrationId);

		return true;
	},
});
