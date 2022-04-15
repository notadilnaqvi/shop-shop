import { useQuery, useMutation } from '@apollo/client';

import Product from '@components/Product';
import { GET_ALL_PRODUCTS } from '@lib/apollo/queries';

function ProductList() {
	const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);

	if (loading) return null;

	if (error) return <p>{JSON.stringify(error)}</p>;

	return (
		<div className='p-4'>
			<h1 className='font-bold text-4xl pb-2 mb-6'>Items</h1>
			<div className='grid grid-flow-row grid-cols-2 gap-10'>
				{data.products.results.map(product => {
					return <Product product={product} key={product.id} />;
				})}
			</div>
		</div>
	);
}

export default ProductList;
