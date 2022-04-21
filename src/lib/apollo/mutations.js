import { gql } from '@apollo/client';

const CREATE_CART = gql`
	mutation {
		createMyCart(
			draft: { currency: "EUR", shippingAddress: { country: "DE" } }
		) {
			id
			version
		}
	}
`;

const DELETE_CART = gql`
	mutation ($id: String!, $version: Long!) {
		deleteMyCart(id: $id, version: $version) {
			id
			version
		}
	}
`;

const ADD_LINE_ITEM = gql`
	mutation (
		$id: String!
		$version: Long!
		$productId: String!
		$quantity: Long
	) {
		updateMyCart(
			id: $id
			version: $version
			actions: {
				addLineItem: { productId: $productId, quantity: $quantity }
			}
		) {
			id
			version
			lineItems {
				id
				name(locale: "en")
				quantity
			}
			totalPrice {
				centAmount
			}
		}
	}
`;

const CHANGE_LINE_ITEM_QUANTITY = gql`
	mutation (
		$id: String!
		$version: Long!
		$productId: String!
		$quantity: Long!
	) {
		updateMyCart(
			id: $id
			version: $version
			actions: {
				changeLineItemQuantity: {
					lineItemId: $productId
					quantity: $quantity
				}
			}
		) {
			id
			version
			lineItems {
				id
				name(locale: "en")
				quantity
			}
			totalPrice {
				centAmount
			}
		}
	}
`;

const REMOVE_LINE_ITEM = gql`
	mutation (
		$id: String!
		$version: Long!
		$lineItemId: String!
		$quantity: Long
	) {
		updateMyCart(
			id: $id
			version: $version
			actions: {
				removeLineItem: { lineItemId: $lineItemId, quantity: $quantity }
			}
		) {
			id
		}
	}
`;

const PLACE_ORDER = gql`
	mutation ($id: String!, $version: Long!) {
		createMyOrderFromCart(draft: { id: $id, version: $version }) {
			id
		}
	}
`;

const LOG_IN_CUSTOMER = gql`
	mutation customerSignMeIn($draft: CustomerSignMeInDraft!) {
		customer: customerSignMeIn(draft: $draft) {
			customer {
				version
				firstName
				lastName
				email
				id
			}
		}
	}
`;

const SIGN_UP_CUSTOMER = gql`
	mutation customerSignMeUp($draft: CustomerSignMeUpDraft!) {
		customer: customerSignMeUp(draft: $draft) {
			customer {
				version
				firstName
				lastName
				email
			}
		}
	}
`;

export {
	CREATE_CART,
	DELETE_CART,
	ADD_LINE_ITEM,
	REMOVE_LINE_ITEM,
	PLACE_ORDER,
	CHANGE_LINE_ITEM_QUANTITY,
	LOG_IN_CUSTOMER,
	SIGN_UP_CUSTOMER,
};
