import Cart from '@components/Cart';
import ProductList from '@components/ProductList';

export default function Home() {
	return (
		<div className='p-10 flex h-min text-gray-800 justify-center w-full'>
			<div className='grid grid-cols-4 gap-x-6'>
				<div className=''>
					<Cart />
				</div>
				<div className='col-span-2'>
					<ProductList />
				</div>
				<div className=''>
					<Cart />
				</div>
			</div>
		</div>
	);
}
