import { Settings } from '@rocket.chat/models';

import { addMigration } from '../../lib/migrations';
import { Users } from '../../../app/models/server';

addMigration({
	version: 276,
	async up() {
		Users.update(
			{ 'settings.preferences.enableNewMessageTemplate': { $exists: 1 } },
			{
				$unset: { 'settings.preferences.enableNewMessageTemplate': 1 },
			},
			{ multi: true },
		);
		await Settings.removeById('Accounts_Default_User_Preferences_enableNewMessageTemplate');
	},
});
