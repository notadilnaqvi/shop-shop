const { useQuery } = require('@apollo/client');
const { GET_PRODUCT_BY_ID } = require('@lib/apollo/queries');

function useGetProductById({ id }) {
	const { data, loading, error } = useQuery(GET_PRODUCT_BY_ID, {
		variables: { id },
	});

	return { data, loading, error };
}
export { useGetProductById };
