import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';

import { SIGN_UP_CUSTOMER } from '@lib/apollo/mutations';

function SignUp() {
	const router = useRouter();
	const [signUpCustomer] = useMutation(SIGN_UP_CUSTOMER);

	const [form, setForm] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	});

	function handleChange(event) {
		setForm(prev => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	}

	async function handleSubmit(event) {
		event.preventDefault();
		await signUpCustomer({ variables: { draft: form } });
		router.push('/log-in');
	}

	return (
		<div className='text-gray-800 w-full'>
			<h1 className='font-bold text-3xl mb-10'>Sign Up</h1>
			<form onSubmit={handleSubmit} className='max-w-lg'>
				<div className='flex flex-col space-y-4'>
					<label htmlFor='firstName' className='text-xl font-medium'>
						First name
					</label>
					<input
						id='firstName'
						name='firstName'
						type='text'
						className='border-2 rounded-md p-2 text-lg'
						onChange={handleChange}
						value={form.firstName}
						minLength='2'
						maxLength='32'
						required
					/>
					<label htmlFor='lastName' className='text-xl font-medium'>
						Last name
					</label>
					<input
						id='lastName'
						name='lastName'
						type='text'
						className='border-2 rounded-md p-2 text-lg'
						onChange={handleChange}
						value={form.lastName}
						minLength='2'
						maxLength='32'
						required
					/>
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
						maxLength='128'
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
						minLength='8'
						required
					/>
				</div>
				<div className='mt-8 flex items-center space-x-4'>
					<button
						className='bg-blue-400 hover:bg-blue-500 px-4 py-2 rounded-md text-white font-bold active:translate-x-[1px] active:translate-y-[1px]'
						type='submit'
					>
						Create account
					</button>
					<p className='text-lg text-gray-400 font-medium'>or</p>
					<Link href='/log-in'>
						<a className='text-lg font-medium text-blue-400 hover:underline '>
							Log In
						</a>
					</Link>
				</div>
			</form>
		</div>
	);
}

export default SignUp;
