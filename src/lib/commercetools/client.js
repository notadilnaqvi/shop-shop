import SdkAuth, { TokenProvider } from '@commercetools/sdk-auth';
import { getTokenFromLocalStorage, setTokenInLocalStorage } from 'src/utils';

const sdkAuth = new SdkAuth({
	host: process.env.CTP_AUTH_URL,
	projectKey: process.env.CTP_PROJECT_KEY,
	credentials: {
		clientId: process.env.CTP_CLIENT_ID,
		clientSecret: process.env.CTP_CLIENT_SECRET,
	},
	scopes: process.env.CTP_SCOPES.split(' '),
});

async function generateNewToken(customerCredentials) {
	const currentToken = getTokenFromLocalStorage();

	// The order is important here
	let tokenFlow;
	if (customerCredentials) {
		const { email: username, password } = customerCredentials;
		tokenFlow = await sdkAuth.customerPasswordFlow({ username, password });
	} else if (currentToken) {
		tokenFlow = currentToken;
	} else {
		tokenFlow = await sdkAuth.anonymousFlow();
	}

	const tokenProvider = new TokenProvider({ sdkAuth }, tokenFlow);

	const tokenInfo = await tokenProvider.getTokenInfo();

	setTokenInLocalStorage(tokenInfo);

	return tokenInfo;
}

export default generateNewToken;

// https://docs.commercetools.com/api/graphql
// https://commercetools.github.io/nodejs/sdk/api/
