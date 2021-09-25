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
		<main className='home'>
			Components
			<br />
			Page
			<br />
			<br />
			<Button name='Hello' link='/' />
			<br />
			<br />
			<Input
				placeholder='Hello'
				label='World'
				type='text'
				name='user'
				value={[inputValue, setInputValue]}
			/>
			<br />
			Value: {inputValue}
			<br />
			<br />
			<br />
			<br />

		</main>
	);
};

export default Components;
