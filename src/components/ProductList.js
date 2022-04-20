import { useQuery } from '@apollo/client';

import Product from '@components/Product';
import { GET_ALL_PRODUCTS } from '@lib/apollo/queries';

function ProductList() {
	const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);

	return (
		<div className='w-full'>
			<h1 className='font-bold text-2xl mb-8'>Summer Collection 🏖️</h1>
			{loading ? (
				<div className='space-x-2 my-3 text-gray-400'>Loading ⏳</div>
			) : error ? (
				<div className='space-x-2 my-3 text-gray-400'>
					Oops. Something went wrong 💀
				</div>
			) : (
				<div className='grid grid-flow-row lg:grid-cols-3 md:grid-cols-2 grid-col-1 gap-4'>
					{data.products.results.map(product => {
						return <Product product={product} key={product.id} />;
					})}
				</div>
			)}
		</div>
	);
}

export default ProductList;
