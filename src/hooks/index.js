import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';

import { GET_CUSTOMER } from '@lib/apollo/queries';
import { removeTokenFromLocalStorage } from 'src/utils';

function useLogout() {
	const router = useRouter();
	function logout() {
		removeTokenFromLocalStorage();
		router.reload('/');
	}

	return { logout };
}

function useCustomer() {
	const { loading, error, data } = useQuery(GET_CUSTOMER);
	return { loading, error, data };
}

export { useLogout, useCustomer };
