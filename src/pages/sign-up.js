import Link from 'next/link';
import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { SIGN_UP_CUSTOMER } from '@lib/apollo/mutations';

function SignUp() {
	const [disabled, setDisabled] = useState(false);
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
		setDisabled(true);
		await signUpCustomer({ variables: { draft: form } });
		await new Promise(r => setTimeout(r, 2000)); // TODO: Find proper fix for this hack.
		window.location = '/';
	}

	if (disabled) {
		return (
			<div className='text-gray-800 w-full'>
				<h1 className='font-bold text-2xl mb-8'>Sign Up</h1>
				<div className='space-x-2 my-3 text-gray-400'>
					Signing up ⏳
				</div>
			</div>
		);
	}

	return (
		<div className='text-gray-800 w-full'>
			<h1 className='font-bold text-2xl mb-8'>Sign Up</h1>
			<form onSubmit={handleSubmit} className='max-w-sm'>
				<div className='flex flex-col space-y-4'>
					<label htmlFor='firstName' className='font-medium'>
						First name
					</label>
					<input
						id='firstName'
						name='firstName'
						type='text'
						className='border rounded-md py-1 px-3'
						onChange={handleChange}
						value={form.firstName}
						minLength='2'
						maxLength='32'
						required
					/>
					<label htmlFor='lastName' className='font-medium'>
						Last name
					</label>
					<input
						id='lastName'
						name='lastName'
						type='text'
						className='border rounded-md py-1 px-3'
						onChange={handleChange}
						value={form.lastName}
						minLength='2'
						maxLength='32'
						required
					/>
					<label htmlFor='email' className='font-medium'>
						Email
					</label>
					<input
						id='email'
						name='email'
						type='email'
						className='border rounded-md py-1 px-3'
						onChange={handleChange}
						value={form.email}
						maxLength='128'
						required
					/>
					<label htmlFor='password' className='font-medium'>
						Password
					</label>
					<input
						id='password'
						name='password'
						type='password'
						className='border rounded-md py-1 px-3'
						onChange={handleChange}
						value={form.password}
						minLength='8'
						required
					/>
				</div>
				<div className='mt-8 flex items-center space-x-4'>
					<button
						disabled={disabled}
						className='bg-blue-400 hover:bg-blue-500 px-2 py-1 rounded-md text-white font-medium active:translate-x-[1px] active:translate-y-[1px]'
						type='submit'
					>
						Create Account
					</button>
					<p className='text-gray-400 font-medium'>or</p>
					<Link href='/log-in'>
						<a className='font-medium text-blue-400 hover:underline '>
							Log In
						</a>
					</Link>
				</div>
			</form>
		</div>
	);
}

export default SignUp;
