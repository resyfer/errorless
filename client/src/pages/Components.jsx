//* React
import { useState, useEffect } from 'react';

//* Components
import Button from '../components/Button';
import Input from '../components/Input';

const Components = props => {
	//* Set Title
	useEffect(() => {
		document.title = props.title;
	}, [props.title]);

	const [inputValue, setInputValue] = useState('');

	return (
		<div className='home'>
			Components
			<br />
			Page
			<br />
			<br />
			<Button name='Hello' link='/' />
			<br />
			<br />
			<Input placeholder='Hello' setValue={setInputValue} />
			<br />
			Value: {inputValue}
		</div>
	);
};

export default Components;
