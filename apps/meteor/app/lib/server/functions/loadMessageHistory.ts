/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Messages, Rooms } from '../../../models/server';
import { normalizeMessagesForUser } from '../../../utils/server/lib/normalizeMessagesForUser';
import { getHiddenSystemMessages } from '../lib/getHiddenSystemMessages';

export function loadMessageHistory({
	userId,
	rid,
	end,
	limit = 20,
	ls,
	showThreadMessages = true,
	offset = 0,
}: {
	userId: string;
	rid: string;
	end: Date | undefined;
	limit?: number;
	ls?: string | Date;
	showThreadMessages?: boolean;
	offset?: number;
}) {
	const room = Rooms.findOneById(rid, { fields: { sysMes: 1 } });

	const hiddenMessageTypes = getHiddenSystemMessages(room);

	const options = {
		sort: {
			ts: -1,
		},
		limit,
		skip: offset,
		fields: {},
	};

	const records = end
		? Messages.findVisibleByRoomIdBeforeTimestampNotContainingTypes(rid, end, hiddenMessageTypes, options, showThreadMessages).fetch()
		: Messages.findVisibleByRoomIdNotContainingTypes(rid, hiddenMessageTypes, options, showThreadMessages).fetch();
	const messages = normalizeMessagesForUser(records, userId);
	let unreadNotLoaded = 0;
	let firstUnread;

	if (ls) {
		const firstMessage = messages[messages.length - 1];

		if (firstMessage && new Date(firstMessage.ts) > new Date(ls)) {
			const unreadMessages = Messages.findVisibleByRoomIdBetweenTimestampsNotContainingTypes(
				rid,
				ls,
				firstMessage.ts,
				hiddenMessageTypes,
				{
					limit: 1,
					sort: {
						ts: 1,
					},
				},
				showThreadMessages,
			);

			const totalCursor = Messages.findVisibleByRoomIdBetweenTimestampsNotContainingTypes(
				rid,
				ls,
				firstMessage.ts,
				hiddenMessageTypes,
				{},
				showThreadMessages,
			);

			firstUnread = unreadMessages.fetch()[0];
			unreadNotLoaded = totalCursor.count();
		}
	}

	return {
		messages,
		firstUnread,
		unreadNotLoaded,
	};
}
