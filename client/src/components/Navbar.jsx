import { useContext } from 'react';
import UserContext from '../context/UserContext';

import { Link } from 'react-router-dom';

//* CSS
import './css/Navbar.scss';

//* Components import
import Button from './Button';

//! Temporary
const user = {
	id: 'abcd',
	organisation: {
		id: '1234',
	},
};

const Navbar = props => {
	// const {user, loggedIn} = useContext(UserContext);
	const { loggedIn } = useContext(UserContext);

	return (
		<div className='navbar'>
			<Link to={`/user/${user.id}`} className='logo-link'>
				<img src='/img/logo.png' className='logo' alt='Errorless' />
			</Link>
			<ul className='nav-items-ctnr'>
				<li>
					<Link to={`/user/${user.id}`}>Home</Link>
				</li>
				<li>
					<Link to={`/institute/${user.organisation.id}`}>Institute</Link>
				</li>
				<li>
					<Link to='/team'>About Us</Link>
				</li>
			</ul>
			{!loggedIn && <Button name='Login / Sign Up' link='/auth' />}
		</div>
	);
};

export default Navbar;
