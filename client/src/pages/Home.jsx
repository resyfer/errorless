//* React
import { useEffect } from 'react';

//! Temporary
import { Link } from 'react-router-dom';

import Button from '../components/Button';

import './css/Home.scss';

const Home = props => {
	//* Set Title
	useEffect(() => {
		document.title = props.title;
	}, [props.title]);

	return (
		<div className='home'>
			<div className='logo'>
				<img src='/img/logo.png' alt='Errorless' />
			</div>
			<div className='title'>
				<h1>Errorless</h1>
				<h2>Helping breathe in happiness, not COVID-19</h2>
			</div>

			{/* !Temporary */}
			<Link to='institute/1234'>Home</Link>

			<Button name='Login / Sign Up' link='/auth' />
		</div>
	);
};

export default Home;
