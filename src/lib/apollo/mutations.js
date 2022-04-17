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

const ADD_LINE_ITEM = gql`
	mutation ($id: String!, $version: Long!, $productId: String!) {
		updateMyCart(
			id: $id
			version: $version
			actions: { addLineItem: { productId: $productId } }
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
	ADD_LINE_ITEM,
	PLACE_ORDER,
	LOG_IN_CUSTOMER,
	SIGN_UP_CUSTOMER,
};
