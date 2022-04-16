import { useQuery } from '@apollo/client';

import { GET_CART } from '@lib/apollo/queries';
import PlaceOrderButton from '@components/PlaceOrderButton';

function Cart() {
	const { loading, error, data } = useQuery(GET_CART);

	if (loading) return null;

	if (error) return <p>{JSON.stringify(error)}</p>;

	if (!data.me.activeCart) {
		return (
			<div className='p-4 ml-6 fixed'>
				<h1 className='font-bold text-3xl pb-4'>Cart</h1>
				<div className='text-xl space-x-2 my-3 text-gray-400'>
					The cart is empty
				</div>
			</div>
		);
	}

	return (
		<div className='p-4 ml-6 fixed'>
			<h1 className='font-bold text-3xl pb-4'>Cart</h1>
			{data.me.activeCart.lineItems?.map(lineItem => (
				<div
					key={lineItem.id}
					className='text-lg space-x-2 my-3 border-b-2 p-2'
				>
					<span>{lineItem.quantity}</span>
					<span>x</span>
					<span>{lineItem.name}</span>
				</div>
			))}
			<div className='py-6 text-xl'>
				Total&nbsp;
				<span className='font-semibold'>
					&euro; {data.me.activeCart.totalPrice?.centAmount / 100}
				</span>
			</div>
			<PlaceOrderButton cart={data.me.activeCart} />
		</div>
	);
}

export default Cart;
