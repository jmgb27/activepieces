import { createAction } from '@activepieces/pieces-framework';
import { vapiAuth } from "../.."
import { VapiClient } from "@vapi-ai/server-sdk";

export const listCalls = createAction({
  auth: vapiAuth,
  name: 'listCalls',
  displayName: 'List calls',
  description: 'List all calls from organization',
  props: {},
  async run(context) {
    try {
      const client = new VapiClient({token: context.auth})

      return await client.calls.list()
    } catch (error) {
      throw new Error(`Error while listing calls: ${(error as Error).message}`)
    }
  },
});
