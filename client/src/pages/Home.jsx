//* React
import { useEffect } from 'react';

const Home = props => {
	//* Set Title
	useEffect(() => {
		document.title = props.title;
	}, [props.title]);

	return (
		<div className='home'>
			Home
			<br />
			Page
		</div>
	);
};

export default Home;
