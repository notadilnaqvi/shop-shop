import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { PLACE_ORDER } from '@lib/apollo/mutations';

function PlaceOrderButton({ cart }) {
	const [disabled, setDisabled] = useState(false);
	const [placeOrder] = useMutation(PLACE_ORDER);

	async function handlePlaceOrder(cart) {
		setDisabled(true);
		await placeOrder({
			variables: {
				id: cart.id,
				version: cart.version,
			},
			refetchQueries: ['me'],
		});
	}

	return (
		<button
			disabled={disabled}
			className='bg-green-500 hover:bg-green-600 px-2 py-1 rounded-md text-white font-medium active:translate-x-[1px] active:translate-y-[1px]'
			onClick={() => handlePlaceOrder(cart)}
		>
			Place order
		</button>
	);
}

export default PlaceOrderButton;
