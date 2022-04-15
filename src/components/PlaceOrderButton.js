import { useMutation } from '@apollo/client';

import { PLACE_ORDER } from '@lib/apollo/queries';

function PlaceOrderButton({ cart }) {
	const [placeOrder] = useMutation(PLACE_ORDER);

	function handlePlaceOrder(cart) {
		placeOrder({
			variables: {
				id: cart.id,
				version: cart.version,
			},
			refetchQueries: ['me'],
		});
	}

	return (
		<button
			className='bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md text-white font-bold active:translate-x-[1px] active:translate-y-[1px]'
			onClick={() => handlePlaceOrder(cart)}
		>
			Place order
		</button>
	);
}

export default PlaceOrderButton;
