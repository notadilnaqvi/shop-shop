import { useState } from 'react';
import {
	useDeleteMyShoppingList,
	useGetMyShoppingLists,
	useRemoveItemToMyShoppingList,
} from 'src/hooks/shopping-list';

function ShoppingList() {
	const [disabled, setDisabled] = useState(false);
	const { data, loading, error } = useGetMyShoppingLists();
	const { deleteMyShoppingList } = useDeleteMyShoppingList();
	const { removeLineItemFromMyShoppingList } =
		useRemoveItemToMyShoppingList();

	async function handleDeleteMyShoppingList(list) {
		setDisabled(true);
		await deleteMyShoppingList({
			variables: {
				id: list.id,
				version: list.version,
			},
			refetchQueries: ['me'],
		});
		setDisabled(false);
	}

	async function handleRemoveLineItemFromMyShoppingList(item) {
		setDisabled(true);
		await removeLineItemFromMyShoppingList({
			variables: {
				id: data.me.shoppingLists.results[0].id,
				version: data.me.shoppingLists.results[0].version,
				lineItemId: item.id,
			},
			refetchQueries: ['me'],
		});
		setDisabled(false);
	}

	if (loading) {
		return (
			<div className='text-gray-800 w-full'>
				<h1 className='font-bold text-2xl mb-8'>Shopping List</h1>
				<div className='space-x-2 my-3 text-gray-400'>Loading ⏳</div>
			</div>
		);
	}

	if (error) {
		console.error('[ShoppingList]:', error);
		return (
			<div className='text-gray-800 w-full'>
				<h1 className='font-bold text-2xl mb-8'>Shopping List</h1>
				<div className='space-x-2 my-3 text-gray-400'>
					Oops. Something went wrong 💀
				</div>
			</div>
		);
	}

	if (!data.me.shoppingLists.results?.[0]?.lineItems.length) {
		return (
			<div className='text-gray-800 w-full'>
				<h1 className='font-bold text-2xl mb-8'>Shopping List</h1>
				<div className='space-x-2 my-3 text-gray-400'>
					Your shopping list is empty
				</div>
			</div>
		);
	}
	return (
		<div className='text-gray-800 w-full'>
			<h1 className='font-bold text-2xl mb-8'>Shopping List</h1>
			{data.me.shoppingLists.results[0].lineItems?.map(lineItem => (
				<div
					className='flex my-3 py-2 max-w-lg justify-between'
					key={lineItem.id}
				>
					<div className='flex space-x-4'>
						<p className='font-medium'>{lineItem.name}</p>
					</div>
					<div className='flex space-x-4 pl-2'>
						<div>
							<div className='flex'>
								<button
									disabled={disabled}
									className='text-xs border py-1 px-2 rounded-l-md hover:bg-slate-50 active:translate-y-[1px]'
									onClick={() =>
										handleRemoveLineItemFromMyShoppingList(
											lineItem
										)
									}
								>
									❌
								</button>
								<button
									disabled={true}
									className='text-xs border border-l-0 py-1 px-2 rounded-r-md hover:bg-slate-50 active:translate-y-[1px]'
									onClick={() => {}}
								>
									🛒
								</button>
							</div>
						</div>
					</div>
				</div>
			))}
			<div className='mt-8 flex items-center space-x-4'>
				<button
					disabled={disabled}
					className=' hover:bg-slate-100 border px-2 py-1 rounded-md text-red-500 font-medium active:translate-x-[1px] active:translate-y-[1px]'
					onClick={() =>
						handleDeleteMyShoppingList(
							data.me.shoppingLists.results[0]
						)
					}
				>
					Clear shopping list
				</button>
			</div>
		</div>
	);
}

export default ShoppingList;
