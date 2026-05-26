export const environment = {
  production: true,
  api: '/api/',
  ambiente: 'prd',
  msalConfig: {
    auth: {
      clientId: '7b5932f1-6303-4c84-9d59-fd2cbfbe8026',
      authority: 'https://login.microsoftonline.com/d7ed2ad6-5160-418b-be44-1663e14b791f',
    },
  },
  apiConfig: {
    scopes: ['user.read'],
    uri: 'https://graph.microsoft.com/v1.0/*',
  }
};
