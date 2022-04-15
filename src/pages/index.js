import Cart from '@components/Cart';
import ProductList from '@components/ProductList';

export default function Home() {
	return (
		<div className='py-10 flex h-min text-gray-800 justify-around'>
			<div className=''>
				<Cart />
			</div>
			<div>
				<ProductList />
			</div>
			<div>
				<Cart />
			</div>
		</div>
	);
}
