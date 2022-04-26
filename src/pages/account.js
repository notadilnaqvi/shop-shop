import Link from 'next/link';
import { useCustomer, useLogout } from 'src/hooks';

function Account() {
	const { logout } = useLogout();
	const { data, loading, error } = useCustomer();
	const isCustomerLoggedIn = data?.me?.customer;

	if (loading) {
		return (
			<div className='text-gray-800 w-full'>
				<h1 className='font-bold text-2xl mb-8'>Account Info</h1>
				<div className='space-x-2 my-3 text-gray-400'>Loading ⏳</div>
			</div>
		);
	}

	// Commercetools client throws if we try to access the account info endpoint without credentials
	// That's not really what we can consider an error so we skip the check for now
	// if (error) {
	// 	console.error('[Account]:', error);
	// 	return (
	// 		<div className='text-gray-800 w-full'>
	// 			<h1 className='font-bold text-2xl mb-8'>Account Info</h1>
	// 			<div className='space-x-2 my-3 text-gray-400'>
	// 				Oops. Something went wrong 💀
	// 			</div>
	// 		</div>
	// 	);
	// }

	return (
		<div className='text-gray-800 w-full'>
			<h1 className='font-bold text-2xl mb-8'>Account Info</h1>
			{isCustomerLoggedIn ? (
				<>
					<div className='my-3 grid grid-cols-2 max-w-sm'>
						<p className='pb-3'>Email</p>
						<p className='pb-3 font-medium'>
							{data.me.customer.email}
						</p>
						<p className='pb-3'>First name</p>
						<p className='pb-3 font-medium'>
							{data.me.customer.firstName}
						</p>
						<p className='pb-3'>Last name</p>
						<p className='pb-3 font-medium'>
							{data.me.customer.lastName}
						</p>
						<p className='pb-3'>Date joined</p>
						<p className='pb-3 font-medium'>
							{new Date(
								data.me.customer.createdAt
							).toLocaleDateString('en-GB', {
								day: 'numeric',
								month: 'long',
								year: 'numeric',
							})}
						</p>
					</div>
					<div className='mt-8'>
						<button
							className='border hover:bg-slate-100 px-2 py-1 rounded-md text-red-500 font-medium'
							onClick={logout}
						>
							Logout
						</button>
					</div>
				</>
			) : (
				<>
					<div className='space-x-2 my-3 text-gray-400'>
						You are not logged in
					</div>
					<div className='mt-8 flex items-center space-x-4'>
						<Link href='/log-in'>
							<a className=' bg-blue-400 hover:bg-blue-500 px-2 py-1 rounded-md text-white font-medium'>
								Log In
							</a>
						</Link>
						<p className='text-gray-400 font-medium'>or</p>
						<Link href='/sign-up'>
							<a className='font-medium text-blue-400 underline'>
								Sign Up
							</a>
						</Link>
					</div>
				</>
			)}
		</div>
	);
}

export default Account;
