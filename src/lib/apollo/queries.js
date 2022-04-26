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

const GET_PRODUCT_BY_ID = gql`
	query product($id: String!) {
		product(id: $id) {
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
`;

const GET_CART = gql`
	query me {
		me {
			activeCart {
				id
				version
				totalLineItemQuantity
				lineItems {
					productId
					id
					name(locale: "en")
					quantity
					totalPrice {
						centAmount
					}
				}
				totalPrice {
					centAmount
				}
			}
		}
	}
`;

const GET_CUSTOMER = gql`
	query me {
		me {
			customer {
				id
				firstName
				lastName
				email
				createdAt
			}
		}
	}
`;

const GET_MY_SHOPPING_LISTS = gql`
	query me {
		me {
			shoppingLists {
				results {
					id
					version
					lineItems {
						productId
						id
						name(locale: "en")
					}
				}
			}
		}
	}
`;

export {
	GET_ALL_PRODUCTS,
	GET_CART,
	GET_CUSTOMER,
	GET_MY_SHOPPING_LISTS,
	GET_PRODUCT_BY_ID,
};
