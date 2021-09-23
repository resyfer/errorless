//* CSS
import './css/Button.scss';

const Input = props => {
	const setValue = props.setValue;

	return (
		<>
			<input
				type='text'
				placeholder={props.placeholder}
				onChange={e => setValue(e.target.value)}
			/>
			<label></label>
		</>
	);
};

export default Input;
