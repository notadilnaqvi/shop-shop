import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { GET_CART } from '@lib/apollo/queries';
import PlaceOrderButton from '@components/PlaceOrderButton';
import {
	CHANGE_LINE_ITEM_QUANTITY,
	DELETE_CART,
	REMOVE_LINE_ITEM,
} from '@lib/apollo/mutations';
import {
	useAddItemToMyShoppingList,
	useCreateMyShoppingList,
	useGetMyShoppingLists,
} from 'src/hooks/shopping-list';

function Cart() {
	const [disabled, setDisabled] = useState(false);
	const { loading, error, data } = useQuery(GET_CART);
	const [deleteCart] = useMutation(DELETE_CART);
	const [changeLineItemQuantity] = useMutation(CHANGE_LINE_ITEM_QUANTITY);
	const [removeLineItem] = useMutation(REMOVE_LINE_ITEM);
	const {
		data: shoppingListData,
		loading: shoppingListLoading,
		error: shoppingListError,
	} = useGetMyShoppingLists();
	const { addLineItemToMyShoppingList } = useAddItemToMyShoppingList();
	const { createMyShoppingList } = useCreateMyShoppingList();

	async function handleDeleteCart(cart) {
		setDisabled(true);
		await deleteCart({
			variables: {
				id: cart.id,
				version: cart.version,
			},
			refetchQueries: ['me'],
		});
		setDisabled(false);
	}

	async function handleAddItem(item) {
		setDisabled(true);
		await changeLineItemQuantity({
			variables: {
				id: data.me.activeCart.id,
				version: data.me.activeCart.version,
				productId: item.id,
				quantity: item.quantity + 1,
			},
			refetchQueries: ['me'],
		});
		setDisabled(false);
	}

	// Decrement quantity by 1
	async function handleRemoveItem(item) {
		setDisabled(true);
		await removeLineItem({
			variables: {
				id: data.me.activeCart.id,
				version: data.me.activeCart.version,
				lineItemId: item.id,
				quantity: 1,
			},
			refetchQueries: ['me'],
		});
		setDisabled(false);
	}

	// Remove item altogether
	async function handleDeleteItem(item) {
		setDisabled(true);
		await removeLineItem({
			variables: {
				id: data.me.activeCart.id,
				version: data.me.activeCart.version,
				lineItemId: item.id,
			},
			refetchQueries: ['me'],
		});
		setDisabled(false);
	}

	// Move from cart to shopping list
	async function moveToShoppingList(item) {
		setDisabled(true);
		const shoppingListExists =
			!!shoppingListData.me.shoppingLists.results.length;
		let shoppingList;

		if (shoppingListExists) {
			shoppingList = shoppingListData.me.shoppingLists.results[0];
		} else {
			const result = await createMyShoppingList({
				variables: {
					draft: {
						name: 'my-shopping-list',
					},
				},
				refetchQueries: ['me'],
			});
			shoppingList = result.data.createMyShoppingList;
		}
		await addLineItemToMyShoppingList({
			variables: {
				id: shoppingList.id,
				version: shoppingList.version,
				productId: item.productId,
			},
		});
		await removeLineItem({
			variables: {
				id: data.me.activeCart.id,
				version: data.me.activeCart.version,
				lineItemId: item.id,
			},
			refetchQueries: ['me'],
		});
		setDisabled(false);
	}

	if (loading) {
		return (
			<div className='text-gray-800 w-full'>
				<h1 className='font-bold text-2xl mb-8'>Cart</h1>
				<div className='space-x-2 my-3 text-gray-400'>Loading ⏳</div>
			</div>
		);
	}

	if (error) {
		console.error('[Cart]:', error);
		return (
			<div className='text-gray-800 w-full'>
				<h1 className='font-bold text-2xl mb-8'>Cart</h1>
				<div className='space-x-2 my-3 text-gray-400'>
					Oops. Something went wrong 💀
				</div>
			</div>
		);
	}

	if (!data.me.activeCart?.totalLineItemQuantity) {
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
						<div>
							<div className='flex'>
								<button
									title='Remove one item'
									disabled={disabled}
									className='text-xs border py-1 px-2 rounded-l-md hover:bg-slate-50 active:translate-y-[1px]'
									onClick={() => handleRemoveItem(lineItem)}
								>
									➖
								</button>
								<button
									title='Add one item'
									disabled={disabled}
									className='text-xs border-y py-1 px-2 hover:bg-slate-50 active:translate-y-[1px]'
									onClick={() => handleAddItem(lineItem)}
								>
									➕
								</button>
								<button
									title='Delete from cart'
									disabled={disabled}
									className='text-xs border-y border-l py-1 px-2 hover:bg-slate-50 active:translate-y-[1px]'
									onClick={() => handleDeleteItem(lineItem)}
								>
									❌
								</button>
								<button
									title='Move to shopping list'
									disabled={disabled}
									className='text-xs border py-1 px-2 rounded-r-md hover:bg-slate-50 active:translate-y-[1px]'
									onClick={() => moveToShoppingList(lineItem)}
								>
									❤️
								</button>
							</div>
						</div>
					</div>
				</div>
			))}
			<div className='py-6 text-lg flex space-x-4'>
				<p>Grand Total</p>
				<p className='font-semibold'>
					&euro; {data.me.activeCart.totalPrice?.centAmount / 100}
				</p>
			</div>
			<div className='mt-8 flex items-center space-x-4'>
				<PlaceOrderButton cart={data.me.activeCart} />
				<button
					disabled={disabled}
					className=' hover:bg-slate-100 border px-2 py-1 rounded-md text-red-500 font-medium active:translate-x-[1px] active:translate-y-[1px]'
					onClick={() => handleDeleteCart(data.me.activeCart)}
				>
					Clear cart
				</button>
			</div>
		</div>
	);
}

export default Cart;
