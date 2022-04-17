import {
	ApolloClient,
	HttpLink,
	ApolloLink,
	InMemoryCache,
	from,
} from '@apollo/client';

import generateNewToken from '@lib/commercetools/client';
import { getTokenFromLocalStorage, setTokenInLocalStorage } from 'src/utils';

const httpLink = new HttpLink({
	uri: `${process.env.CTP_API_URL}/${process.env.CTP_PROJECT_KEY}/graphql`,
});

const authMiddleware = new ApolloLink(async (operation, forward) => {
	const { variables, operationName } = operation;
	let customerCredentials = null;
	if (operationName === 'customerSignMeIn') {
		customerCredentials = variables.draft;
	}
	const currentToken = getTokenFromLocalStorage();
	const tokenInfo = await generateNewToken({
		currentToken,
		customerCredentials,
	});
	const token = `${tokenInfo.token_type} ${tokenInfo.access_token}`;
	setTokenInLocalStorage(tokenInfo);

	operation.setContext(({ headers = {} }) => ({
		headers: {
			...headers,
			authorization: token,
		},
	}));

	return forward(operation);
});

const client = new ApolloClient({
	link: from([authMiddleware, httpLink]),
	cache: new InMemoryCache(),
});

export default client;
