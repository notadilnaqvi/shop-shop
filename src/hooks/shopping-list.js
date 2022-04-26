import { useMutation, useQuery } from '@apollo/client';

import { GET_MY_SHOPPING_LISTS } from '@lib/apollo/queries';
import {
	CREATE_MY_SHOPPING_LIST,
	DELETE_MY_SHOPPING_LIST,
	ADD_LINE_ITEM_TO_MY_SHOPPING_LIST,
	REMOVE_LINE_ITEM_FROM_MY_SHOPPING_LIST,
} from '@lib/apollo/mutations';

function useGetMyShoppingLists() {
	const { data, loading, error } = useQuery(GET_MY_SHOPPING_LISTS);
	return { data, loading, error };
}

function useCreateMyShoppingList() {
	const [createMyShoppingList] = useMutation(CREATE_MY_SHOPPING_LIST);
	return { createMyShoppingList };
}

function useDeleteMyShoppingList() {
	const [deleteMyShoppingList] = useMutation(DELETE_MY_SHOPPING_LIST);
	return { deleteMyShoppingList };
}

function useAddItemToMyShoppingList() {
	const [addLineItemToMyShoppingList] = useMutation(
		ADD_LINE_ITEM_TO_MY_SHOPPING_LIST
	);
	return { addLineItemToMyShoppingList };
}

function useRemoveItemToMyShoppingList() {
	const [removeLineItemFromMyShoppingList] = useMutation(
		REMOVE_LINE_ITEM_FROM_MY_SHOPPING_LIST
	);
	return { removeLineItemFromMyShoppingList };
}

export {
	useGetMyShoppingLists,
	useCreateMyShoppingList,
	useDeleteMyShoppingList,
	useAddItemToMyShoppingList,
	useRemoveItemToMyShoppingList,
};
