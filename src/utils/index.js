function getTokenFromLocalStorage() {
	if (typeof window !== 'undefined') {
		try {
			return JSON.parse(window.localStorage.getItem('ct-token'));
		} catch (error) {
			return null;
		}
	}
}

function setTokenInLocalStorage(token) {
	if (typeof window !== 'undefined') {
		window.localStorage.setItem('ct-token', JSON.stringify(token));
	}
}

function removeTokenFromLocalStorage() {
	if (typeof window !== 'undefined') {
		window.localStorage.removeItem('ct-token');
	}
}

export {
	getTokenFromLocalStorage,
	setTokenInLocalStorage,
	removeTokenFromLocalStorage,
};
