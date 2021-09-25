//* React
import { useState, useEffect } from 'react';

//* Components
import Button from '../components/Button';
import Input from '../components/Input';
import User from '../components/User';

const Components = props => {
	//* Set Title
	useEffect(() => {
		document.title = props.title;
	}, [props.title]);

	const [inputValue, setInputValue] = useState('');

	const [isBan, setIsBan] = useState(false);
	const [isDelete, setIsDelete] = useState(false);

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
			<div style={{width:"90%"}}>
				<User ban={[isBan, setIsBan]} setIsDelete={setIsDelete} name="Johnny Sins" desg="Student" img="/img/defaultpic.png" />
			</div>

		</main>
	);
};

export default Components;
