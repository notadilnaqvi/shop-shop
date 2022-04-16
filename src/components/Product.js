import { useMutation, useQuery } from '@apollo/client';

import { ADD_LINE_ITEM, CREATE_CART, GET_CART } from '@lib/apollo/queries';

function Product({ product }) {
	const { loading, error, data } = useQuery(GET_CART);
	const [createCart] = useMutation(CREATE_CART);
	const [addLineItem] = useMutation(ADD_LINE_ITEM);

	async function handleAddProductToCart(id) {
		let cart = data.me.activeCart;
		if (!cart) {
			const result = await createCart({ refetchQueries: ['me'] });
			cart = result.data.createMyCart;
		}

		addLineItem({
			variables: {
				id: cart.id,
				version: cart.version,
				productId: id,
			},
		});
	}

	return (
		<div
			className='flex flex-row justify-between border-2 rounded-md p-4 shadow-lg'
			key={product.id}
		>
			<div className='w-full flex flex-col justify-between'>
				<p className='font-bold text-xl'>
					{product.masterData.current.name}
				</p>
				<div className='flex space-x-4 mr-4 align-middle'>
					<p className='border-2 px-4 py-2 rounded-md font-bold'>
						&euro;&nbsp;
						{product.masterData.current.masterVariant.price.value
							.centAmount / 100}
					</p>
					<button
						onClick={() => handleAddProductToCart(product.id)}
						className='bg-blue-400 hover:bg-blue-500 px-4 py-2 rounded-md text-white font-bold active:translate-x-[1px] active:translate-y-[1px]'
					>
						Add to cart
					</button>
				</div>
			</div>
			<div className='border-2 rounded-md'>
				<img
					src={product.masterData.current.masterVariant.images[0].url}
					alt=''
					width={120}
				/>
			</div>
		</div>
	);
}

export default Product;
