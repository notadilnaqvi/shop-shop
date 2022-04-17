function setLocalStorage(key, val) {
	if (typeof window !== 'undefined') window.localStorage.setItem(key, val);
}

function getLocalStorage(key) {
	if (typeof window !== 'undefined') return window.localStorage.getItem(key);
}

export { setLocalStorage, getLocalStorage };
