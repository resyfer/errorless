//* React
import { Link } from 'react-router-dom';

const Button = props => {
	return (
		<Link className='button' to={props.link}>
			{props.name}
		</Link>
	);
};

export default Button;
