import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';

import { LOG_IN_CUSTOMER } from '@lib/apollo/mutations';

function LogIn() {
	const router = useRouter();
	const [logInCustomer] = useMutation(LOG_IN_CUSTOMER);
	const [form, setForm] = useState({ email: '', password: '' });

	function handleChange(event) {
		setForm(prev => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	}

	async function handleSubmit(event) {
		event.preventDefault();
		await logInCustomer({
			variables: { draft: form },
			refetchQueries: ['me'],
		});
		router.push('/');
	}

	return (
		<div className='text-gray-800 w-full'>
			<h1 className='font-bold text-3xl mb-10'>Log In</h1>
			<form onSubmit={handleSubmit} className='max-w-lg'>
				<div className='flex flex-col space-y-4'>
					<label htmlFor='email' className='text-xl font-medium'>
						Email
					</label>
					<input
						id='email'
						name='email'
						type='email'
						className='border-2 rounded-md p-2 text-lg'
						onChange={handleChange}
						value={form.email}
						required
					/>
					<label htmlFor='password' className='text-xl font-medium'>
						Password
					</label>
					<input
						id='password'
						name='password'
						type='password'
						className='border-2 rounded-md p-2 text-lg'
						onChange={handleChange}
						value={form.password}
						required
					/>
				</div>
				<div className='mt-8 flex items-center space-x-4'>
					<button
						className='bg-blue-400 hover:bg-blue-500 px-4 py-2 rounded-md text-white font-bold active:translate-x-[1px] active:translate-y-[1px]'
						type='submit'
					>
						Log in
					</button>
					<p className='text-lg text-gray-400 font-medium'>or</p>
					<Link href='/sign-up'>
						<a className='text-lg font-medium text-blue-400 hover:underline '>
							Sign Up
						</a>
					</Link>
				</div>
			</form>
		</div>
	);
}

export default LogIn;
