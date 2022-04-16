import Link from 'next/link';

function Header() {
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
				<ul className='hidden md:flex h-full'>
					<li>
						<Link href='/log-in'>
							<a className=' h-full flex items-center text-xl transition duration-200 ease-in-out'>
								Login
							</a>
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default Header;
