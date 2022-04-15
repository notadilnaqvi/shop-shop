import { gql } from '@apollo/client';

const GET_ALL_PRODUCTS = gql`
	{
		products {
			total
			results {
				id
				masterData {
					current {
						masterVariant {
							images {
								url
							}
							price(currency: "EUR") {
								value {
									centAmount
									currencyCode
									type
								}
							}
						}
						name(locale: "en")
					}
				}
			}
		}
	}
`;

const GET_CART = gql`
	query me {
		me {
			activeCart {
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
	}
`;

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

export { GET_ALL_PRODUCTS, GET_CART, CREATE_CART, ADD_LINE_ITEM, PLACE_ORDER };
