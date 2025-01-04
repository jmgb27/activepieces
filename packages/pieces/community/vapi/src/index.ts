
import { createPiece, PieceAuth, PropertyType } from "@activepieces/pieces-framework";
import { listCalls } from "./lib/actions/list-calls"
import { createCustomApiCallAction } from '@activepieces/pieces-common';

export const vapiAuth = PieceAuth.SecretText({
  displayName: 'Private Key',
  description: 'Enter your VAPI private key',
  required: true,
})

export const vapi = createPiece({
  displayName: "Vapi",
  auth: vapiAuth,
  minimumSupportedRelease: '0.36.1',
  logoUrl: "https://vapi.ai/favicon.ico",
  authors: ['jmgb27'],
  actions: [listCalls,createCustomApiCallAction({
        baseUrl: (auth) => (auth as { url: string }).url,
        auth: vapiAuth,
        authMapping: async (auth) => ({
          Authorization: `Bearer ${(auth)}`,
        }),
        props: {
          url: {
            type: PropertyType.SHORT_TEXT,
            displayName: 'URL',
            description: 'The URL to call',
            required: true,
            defaultValue: 'https://api.vapi.ai',
          }
        }})
      ],
  triggers: [],
});
