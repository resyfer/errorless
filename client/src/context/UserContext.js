import { createContext } from 'react';

const UserContext = createContext({
	user: null,
	setUser: () => {},
	loggedIn: null,
	setLoggedIn: () => {},
});

export default UserContext;
