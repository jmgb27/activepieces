import { createTrigger, TriggerStrategy } from '@activepieces/pieces-framework';
import { intercomAuth } from '../..';
import { intercomClient } from '../common';

export const conversationClosed = createTrigger({
	// auth: check https://www.activepieces.com/docs/developers/piece-reference/authentication,
	name: 'conversationClosed',
	displayName: 'Conversation closed',
	description: 'Triggers when a conversation is closed',
	props: {},
	sampleData: undefined,
	auth: intercomAuth,
	type: TriggerStrategy.APP_WEBHOOK,
	async onEnable(context) {
		const client = intercomClient(context.auth);
		const response = await client.admins.identify();

		if (!response.app?.id_code) {
			throw new Error('Could not find admin id code');
		}

		context.app.createListeners({
			events: ['conversation.admin.closed'],
			identifierValue: response['app']['id_code'],
		});
	},
	async onDisable(context) {
		// implement webhook deletion logic
	},
	async run(context) {
		return [context.payload.body];
	},
});
