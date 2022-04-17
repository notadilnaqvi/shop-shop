import SdkAuth, { TokenProvider } from '@commercetools/sdk-auth';

const sdkAuth = new SdkAuth({
	host: process.env.CTP_AUTH_URL,
	projectKey: process.env.CTP_PROJECT_KEY,
	credentials: {
		clientId: process.env.CTP_CLIENT_ID,
		clientSecret: process.env.CTP_CLIENT_SECRET,
	},
	scopes: process.env.CTP_SCOPES.split(' '),
});

async function generateNewToken({ currentToken, customerCredentials }) {
	let tokenInfo;
	// The order is important here
	if (customerCredentials) {
		console.log('using customerPasswordFlow', customerCredentials);
		const { email: username, password } = customerCredentials;
		tokenInfo = await sdkAuth.customerPasswordFlow({ username, password });
	} else if (currentToken) {
		console.log('using currentToken', currentToken);
		tokenInfo = currentToken;
	} else {
		console.log('using anonymousFlow');
		tokenInfo = await sdkAuth.anonymousFlow();
	}

	const tokenProvider = new TokenProvider({ sdkAuth }, tokenInfo);

	return tokenProvider.getTokenInfo();
}

export default generateNewToken;

// https://docs.commercetools.com/api/graphql
// https://commercetools.github.io/nodejs/sdk/api/
