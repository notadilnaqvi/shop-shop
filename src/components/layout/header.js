import Link from 'next/link';

import { useCustomer, useLogout } from 'src/hooks';

function Header() {
	const { data } = useCustomer();
	const { logout } = useLogout();

	return (
		<header className='fixed w-full text-gray-800 flex justify-center h-20 bg-white tracking-widest border-b-2 px-20'>
			<nav className='max-w-[1024px] w-full flex h-full font-medium'>
				{/* Logo */}
				<div className='h-full mr-auto'>
					<Link href='/'>
						<a className='font-bold text-3xl h-full flex items-center'>
							Shop-Shop
						</a>
					</Link>
				</div>

				{/* Nav links */}
				<ul className='hidden md:flex h-full space-x-4'>
					{data ? (
						<>
							<li>
								<p className='font-normal text-gray-400 h-full flex items-center text-xl transition duration-200 ease-in-out'>
									Logged in as&nbsp;
									<span className='font-medium text-gray-600'>
										{data?.me?.customer?.email}
									</span>
								</p>
							</li>
							<li>
								<button
									className='text-red-500 font-medium h-full flex items-center text-xl transition duration-200 ease-in-out'
									onClick={logout}
								>
									Logout
								</button>
							</li>
						</>
					) : (
						<li>
							<Link href='/log-in'>
								<a className=' h-full flex items-center text-xl transition duration-200 ease-in-out'>
									Login
								</a>
							</Link>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
}

export default Header;
