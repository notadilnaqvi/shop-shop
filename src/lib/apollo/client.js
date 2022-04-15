import {
	ApolloClient,
	HttpLink,
	ApolloLink,
	InMemoryCache,
	from,
} from '@apollo/client';

import tokenProvider from '@lib/commercetools/tokenProvider';

const httpLink = new HttpLink({
	uri: `${process.env.CTP_API_URL}/${process.env.CTP_PROJECT_KEY}/graphql`,
});

const authMiddleware = new ApolloLink(async (operation, forward) => {
	const tokenInfo = await tokenProvider.getTokenInfo();
	const token = `${tokenInfo.token_type} ${tokenInfo.access_token}`;

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
