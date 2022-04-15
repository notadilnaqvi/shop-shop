import SdkAuth, { TokenProvider } from '@commercetools/sdk-auth';

const tokenProvider = new TokenProvider({
	sdkAuth: new SdkAuth({
		host: process.env.CTP_AUTH_URL,
		projectKey: process.env.CTP_PROJECT_KEY,
		credentials: {
			clientId: process.env.CTP_CLIENT_ID,
			clientSecret: process.env.CTP_CLIENT_SECRET,
		},
		scopes: process.env.CTP_SCOPES.split(' '),
	}),
	fetchTokenInfo: sdkAuth => sdkAuth.anonymousFlow(),
});

export default tokenProvider;
