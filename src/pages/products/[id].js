import { useMutation, useQuery } from '@apollo/client';
import { ADD_LINE_ITEM, CREATE_CART } from '@lib/apollo/mutations';
import { GET_CART } from '@lib/apollo/queries';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useGetProductById } from 'src/hooks/products';
import {
	useAddItemToMyShoppingList,
	useCreateMyShoppingList,
	useGetMyShoppingLists,
} from 'src/hooks/shopping-list';

function ProductDetail() {
	const router = useRouter();
	const { id } = router.query;
	const {
		data: productData,
		loading: productLoading,
		error: productError,
	} = useGetProductById({ id });

	const {
		loading: cartloading,
		data: cartData,
		error: cartError,
	} = useQuery(GET_CART);
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

	if (cartloading || productLoading || shoppingListLoading) {
		return (
			<div className='text-gray-800 w-full'>
				<h1 className='font-bold text-2xl mb-8'>Product Detail</h1>
				<div className='space-x-2 my-3 text-gray-400'>Loading ⏳</div>
			</div>
		);
	}

	if (cartError || productError || shoppingListError) {
		console.error('[ProductDetail]:', error);
		return (
			<div className='text-gray-800 w-full'>
				<h1 className='font-bold text-2xl mb-8'>Product Detail</h1>
				<div className='space-x-2 my-3 text-gray-400'>
					Oops. Something went wrong 💀
				</div>
			</div>
		);
	}

	const isItemAlreadyInCart = cartData?.me?.activeCart?.lineItems
		?.map(({ productId }) => productId)
		?.includes(productData.product.id);

	const isItemAlreadyInShoppingList =
		shoppingListData?.me?.shoppingLists?.results?.[0]?.lineItems
			?.map(({ productId }) => productId)
			?.includes(productData.product.id);

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
		<div className='text-gray-800 w-full'>
			<h1 className='font-bold text-2xl mb-8'>Product Detail</h1>
			<div className='flex flex-col sm:flex-row justify-between'>
				<div className='w-full flex flex-col justify-between sm:space-y-0 space-y-4'>
					<p className='font-bold'>
						{productData.product.masterData.current.name}
					</p>
					<div className='flex md:space-x-2 md:space-y-0 space-x-0 space-y-4 md:flex-row flex-col mr-4 align-middle'>
						<p className='border px-2 py-1 rounded-md text-sm w-min'>
							&euro;&nbsp;
							{productData.product.masterData.current
								.masterVariant.price.value.centAmount / 100}
						</p>
						<button
							title={
								isItemAlreadyInCart
									? 'Added to cart'
									: 'Add to cart'
							}
							disabled={addToCartDisabled || isItemAlreadyInCart}
							onClick={() =>
								handleAddProductToCart(productData.product.id)
							}
							className={`border px-2 py-1 w-min text-sm rounded-md hover:bg-slate-50 ${
								!isItemAlreadyInCart &&
								!addToCartDisabled &&
								'active:translate-x-[1px] active:translate-y-[1px]'
							}`}
						>
							{isItemAlreadyInCart ? (
								<p className='font-medium pl-2 whitespace-nowrap'>
									✅ Added to cart
								</p>
							) : (
								<p className='font-medium pl-2 whitespace-nowrap'>
									🛒 Add to cart
								</p>
							)}
						</button>
						<button
							title={
								isItemAlreadyInShoppingList
									? 'Added to shopping list'
									: 'Add to shopping list'
							}
							onClick={() =>
								handleAddLineItemToShoppingList(
									productData.product.id
								)
							}
							disabled={
								addToListDisabled || isItemAlreadyInShoppingList
							}
							className={`border px-2 py-1 w-min text-sm rounded-md hover:bg-slate-50 ${
								!isItemAlreadyInShoppingList &&
								!addToListDisabled &&
								'active:translate-x-[1px] active:translate-y-[1px]'
							}`}
						>
							<>
								{isItemAlreadyInShoppingList ? (
									<p className='font-medium pl-2 whitespace-nowrap'>
										✅ Added to shopping list
									</p>
								) : (
									<p className='font-medium pl-2 whitespace-nowrap'>
										❤️ Add to shopping list
									</p>
								)}
							</>
						</button>
					</div>
				</div>
				<div className='border rounded-md z-[-1] sm:h-24 sm:w-24 h-64 w-64 relative sm:mt-0 mt-5'>
					<Image
						src={
							productData.product.masterData.current.masterVariant
								.images[0].url
						}
						alt={productData.product.masterData.current.name}
						layout='fill'
						className='rounded-md'
					/>
				</div>
			</div>
		</div>
	);
}

export default ProductDetail;
