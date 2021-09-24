//* React
import { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import UserContext from '../context/UserContext';

import NoLinkButton from '../components/NoLinkButton';
import Input from '../components/Input';

import './css/ProfileEdit.scss';

const ProfileEdit = props => {
	const { user, loggedIn } = useContext(UserContext);

	const history = useHistory();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [photoUrl, setPhotoUrl] = useState('');
	const [phoneNo, setPhoneNo] = useState('');

	useEffect(() => {
		if (!loggedIn) history.push('/');
	}, []);

	useEffect(() => {
		if (loggedIn) {
			user.name && setName(user.name);
			user.email && setEmail(user.email);
			user.photo && setName(user.name);
			user.phoneNo && setName(user.phoneNo);
		}
	}, [loggedIn]);

	//* Set Title
	useEffect(() => {
		document.title = props.title;
	}, [props.title]);

	return (
		<main className='prof-edit'>
			<div className='heading'>Edit User Profile</div>
			<div className='card'>
				<Input
					placeholder='Name'
					label='Name'
					type='text'
					name='name'
					value={[name, setName]}
				/>
				<Input
					placeholder='Email'
					label='Email'
					type='text'
					name='email'
					value={[email, setEmail]}
				/>
				<Input
					placeholder='Photo URL'
					label='Profile Pic'
					type='text'
					name='pfp'
					value={[photoUrl, setPhotoUrl]}
				/>
				<Input
					placeholder='Phone'
					label='Phone Number'
					type='number'
					name='number'
					value={[phoneNo, setPhoneNo]}
				/>
				<NoLinkButton name='Save' />
			</div>
		</main>
	);
};

export default ProfileEdit;
