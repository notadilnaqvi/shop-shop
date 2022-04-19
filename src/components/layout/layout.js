import Cart from '@components/Cart';
import React from 'react';

import Header from './header';

function Layout({ children }) {
	return (
		<React.Fragment>
			<Header />
			<main className='pt-20 px-8 w-full tracking-wide flex justify-center min-h-[calc(100vh-120px)] text-gray-800'>
				<div className='w-full max-w-[1024px] py-8'>{children}</div>
				{/* <div className='pt-12'>
					<Cart />
				</div> */}
			</main>
		</React.Fragment>
	);
}

export default Layout;
