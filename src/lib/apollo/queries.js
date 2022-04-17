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

export { GET_ALL_PRODUCTS, GET_CART };
