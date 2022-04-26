import Link from 'next/link';

import { useCart, useCustomer } from 'src/hooks';
import { useGetMyShoppingLists } from 'src/hooks/shopping-list';

function Header() {
	const { data: cartData } = useCart();
	const { data: shoppingListData } = useGetMyShoppingLists();
	const { data: customerData, loading: customerLoading } = useCustomer();

	const isCustomerLoggedIn = customerData?.me?.customer;
	const productsInCart = cartData?.me?.activeCart?.totalLineItemQuantity;
	const itemsInShoppingList =
		shoppingListData?.me?.shoppingLists?.results?.[0]?.lineItems?.length;

	return (
		<header className='fixed w-full text-gray-800 flex justify-center h-14 bg-white tracking-widest border-b px-8'>
			<nav className='max-w-[1024px] w-full flex h-full font-medium'>
				{/* Logo */}
				<div className='h-full mr-auto'>
					<Link href='/'>
						<a className='font-bold text-xl h-full flex items-center'>
							Shop-Shop
						</a>
					</Link>
				</div>

				{/* Nav links */}
				{customerLoading || (
					<ul className='flex h-full space-x-4'>
						<li>
							<div className='h-full flex items-center'>
								<Link href='/shopping-list'>
									<a
										className='font-medium  inline-block border  px-2 py-1 rounded-md  hover:bg-slate-50'
										title='View shopping list'
									>
										<span className='relative'>
											{!!itemsInShoppingList && (
												<span className='absolute top-[-7px] inline-flex items-center justify-center px-2 py-1 text-xs font-extrabold tracking-tighter leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
													{itemsInShoppingList}
												</span>
											)}
										</span>
										❤️
									</a>
								</Link>
							</div>
						</li>
						<li>
							<div className='h-full flex items-center'>
								<Link href='/cart'>
									<a
										className='font-medium  inline-block border  px-2 py-1 rounded-md  hover:bg-slate-50'
										title='View cart'
									>
										<span className='relative'>
											{productsInCart && (
												<span className='absolute top-[-7px] inline-flex items-center justify-center px-2 py-1 text-xs font-extrabold tracking-tighter leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
													{productsInCart}
												</span>
											)}
										</span>
										🛒
									</a>
								</Link>
							</div>
						</li>

						<li>
							<div className='h-full flex items-center'>
								<Link href='/account'>
									<a
										className='font-medium rounded-md px-2 py-1 border hover:bg-slate-50'
										title='View account info'
									>
										{isCustomerLoggedIn ? '🧑' : '🕵️‍♂️'}
									</a>
								</Link>
							</div>
						</li>
					</ul>
				)}
			</nav>
		</header>
	);
}

export default Header;
