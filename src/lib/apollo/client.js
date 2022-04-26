import {
	ApolloClient,
	HttpLink,
	ApolloLink,
	InMemoryCache,
	from,
} from '@apollo/client';

import generateNewToken from '@lib/commercetools/client';

const httpLink = new HttpLink({
	uri: `${process.env.CTP_API_URL}/${process.env.CTP_PROJECT_KEY}/graphql`,
});

const authMiddleware = new ApolloLink(async (operation, forward) => {
	const { variables, operationName } = operation;
	const tokenInfo = await generateNewToken();
	const token = `${tokenInfo.token_type} ${tokenInfo.access_token}`;

	operation.setContext(({ headers = {} }) => ({
		headers: {
			...headers,
			authorization: token,
		},
	}));

	// Not really sure what this does but fixes the persist issue
	return forward(operation).map(response => {
		if (
			operationName === 'customerSignMeIn' ||
			operationName === 'customerSignMeUp'
		) {
			const customerCredentials = variables.draft;
			generateNewToken(customerCredentials);
		}
		return response;
	});
});

const client = new ApolloClient({
	link: from([authMiddleware, httpLink]),
	cache: new InMemoryCache(),
});

export default client;
