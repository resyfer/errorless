//* React
import { useEffect } from 'react';

//* Components
import Button from '../components/Button';

//* CSS

const Components = props => {
	//* Set Title
	useEffect(() => {
		document.title = props.title;
	}, [props.title]);

	return (
		<div className='home'>
			Components
			<br />
			Page
			<br />
			<Button name='Hello' link='/' />
		</div>
	);
};

export default Components;
