//* CSS
import './css/Input.scss';

const Input = props => {
	return (
		<div className='input-ctnr'>
			<input
				className='input'
				for={props.name}
				type={props.type}
				minLength='2'
				onChange={e => props.value.setInputValue(e.target.value)}
			/>
			{props.value.inputValue === '' && (
				<label className='input-label' name={props.name}>
					{props.placeholder}
				</label>
			)}
		</div>
	);
};

export default Input;
