//* React
import { useEffect, useContext } from 'react';

//! Temporary
import { Link } from 'react-router-dom';

import UserContext from '../context/UserContext';

import Button from '../components/Button';

import './css/Home.scss';

const Home = props => {
	const { loggedIn } = useContext(UserContext);

	//* Set Title
	useEffect(() => {
		document.title = props.title;
	}, [props.title]);

	return (
		<div className='home'>
			<div className='logo'>
				<img src='/img/logo.png' alt='CoLive-21' />
			</div>
			<div className='title'>
				<h1>CoLive-21</h1>
				<h2>Helping breathe in happiness, not COVID-19</h2>
			</div>

			{/* !Temporary */}
			<Link to='institute/1234'>Home</Link>

			{!loggedIn && <Button name='Login / Sign Up' link='/auth' />}
		</div>
	);
};

export default Home;
