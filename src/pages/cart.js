import { useQuery } from '@apollo/client';

import { GET_CART } from '@lib/apollo/queries';
import PlaceOrderButton from '@components/PlaceOrderButton';

function CartPage() {
	const { loading, error, data } = useQuery(GET_CART);

	if (loading) return null;

	if (error) return <p>{JSON.stringify(error)}</p>;

	if (!loading && !data.me.activeCart) {
		return (
			<div className='text-gray-800 w-full'>
				<h1 className='font-bold text-2xl mb-8'>Cart</h1>
				<div className='space-x-2 my-3 text-gray-400'>
					Your cart is empty
				</div>
			</div>
		);
	}
	return (
		<div className='text-gray-800 w-full'>
			<h1 className='font-bold text-2xl mb-8'>Cart</h1>
			{data.me.activeCart.lineItems?.map(lineItem => (
				<div
					className='flex my-3 py-2 max-w-lg justify-between'
					key={lineItem.id}
				>
					<div className='flex space-x-4'>
						<p className='font-medium'>{lineItem.quantity}</p>
						<p className='text-gray-400'>x</p>
						<p className='font-medium'>{lineItem.name}</p>
					</div>
					<div className='flex space-x-4 pl-2'>
						<p className='whitespace-nowrap font-medium'>
							&euro; {lineItem.totalPrice.centAmount / 100}
						</p>
						{/* <div className='flex'>
							<button className='text-xs border py-1 px-2 rounded-l-md hover:bg-slate-50 active:translate-y-[1px]'>
								➖
							</button>
							<button className='text-xs border-y py-1 px-2 hover:bg-slate-50 active:translate-y-[1px]'>
								➕
							</button>
							<button className='text-xs border py-1 px-2 rounded-r-md hover:bg-slate-50 active:translate-y-[1px]'>
								❌
							</button>
						</div> */}
					</div>
				</div>
			))}
			<div className='py-6 text-lg flex space-x-4'>
				<p>Grand Total</p>
				<p className='font-semibold'>
					&euro; {data.me.activeCart.totalPrice?.centAmount / 100}
				</p>
			</div>
			<PlaceOrderButton cart={data.me.activeCart} />
		</div>
	);
}

export default CartPage;
