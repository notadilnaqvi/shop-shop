import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import Image from 'next/image';
import { GET_CART } from '@lib/apollo/queries';
import { ADD_LINE_ITEM, CREATE_CART } from '@lib/apollo/mutations';
import {
	useCreateMyShoppingList,
	useAddItemToMyShoppingList,
	useGetMyShoppingLists,
} from 'src/hooks/shopping-list';

function Product({ product }) {
	const { loading: cartloading, data: cartData } = useQuery(GET_CART);
	const {
		data: shoppingListData,
		loading: shoppingListLoading,
		error: shoppingListError,
	} = useGetMyShoppingLists();
	const [createCart] = useMutation(CREATE_CART);
	const [addLineItem] = useMutation(ADD_LINE_ITEM);
	const [addToCartDisabled, setAddToCartDisabled] = useState(false);
	const [addToListDisabled, setAddToListDisabled] = useState(false);
	const { addLineItemToMyShoppingList } = useAddItemToMyShoppingList();
	const { createMyShoppingList } = useCreateMyShoppingList();

	const isItemAlreadyInCart = cartData?.me?.activeCart?.lineItems
		?.map(({ productId }) => productId)
		?.includes(product.id);

	const isItemAlreadyInShoppingList =
		shoppingListData?.me?.shoppingLists?.results?.[0]?.lineItems
			?.map(({ productId }) => productId)
			?.includes(product.id);

	async function handleAddProductToCart(id) {
		setAddToCartDisabled(true);
		let cart = cartData.me.activeCart;
		if (!cartloading && !cart) {
			const result = await createCart({ refetchQueries: ['me'] });
			cart = result.data.createMyCart;
		}
		await addLineItem({
			variables: {
				id: cart.id,
				version: cart.version,
				productId: id,
			},
			refetchQueries: ['me'],
		});
	}

	async function handleAddLineItemToShoppingList(id) {
		setAddToListDisabled(true);
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
				productId: id,
			},
			refetchQueries: ['me'],
		});
	}

	return (
		<div className='flex flex-row justify-between border rounded-md p-4'>
			<div className='w-full flex flex-col justify-between'>
				<p className='font-bold'>{product.masterData.current.name}</p>
				<div className='flex space-x-2 mr-4 align-middle'>
					<p className='border px-2 py-1 rounded-md text-sm'>
						&euro;&nbsp;
						{product.masterData.current.masterVariant.price.value
							.centAmount / 100}
					</p>
					<button
						title={
							isItemAlreadyInCart
								? 'Added to cart'
								: 'Add to cart'
						}
						disabled={addToCartDisabled || isItemAlreadyInCart}
						onClick={() => handleAddProductToCart(product.id)}
						className='border px-2 py-1 text-sm rounded-md hover:bg-slate-50 active:translate-x-[1px] active:translate-y-[1px]'
					>
						{isItemAlreadyInCart ? '✅' : '🛒'}
					</button>
					<button
						title={
							isItemAlreadyInCart
								? 'Added to shopping list'
								: 'Add to shopping list'
						}
						disabled={
							addToListDisabled || isItemAlreadyInShoppingList
						}
						onClick={() =>
							handleAddLineItemToShoppingList(product.id)
						}
						className='border px-2 py-1 text-sm rounded-md hover:bg-slate-50 active:translate-x-[1px] active:translate-y-[1px]'
					>
						{isItemAlreadyInShoppingList ? '✅' : '❤️'}
					</button>
				</div>
			</div>
			<div className='border rounded-md z-[-1] h-24 w-24 relative'>
				<Image
					src={product.masterData.current.masterVariant.images[0].url}
					alt={product.masterData.current.name}
					layout='fill'
					className='rounded-md'
				/>
			</div>
		</div>
	);
}

export default Product;
