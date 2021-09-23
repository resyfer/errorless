//* CSS
import "./css/Input.scss";

const Input = (props) => {
  return (
    <div className="input-ctnr">
      <input
        className="input"
        for={props.name}
        type={props.type}
        minLength="2"
        onChange={(e) => props.value[1](e.target.value)}
      />
      {props.value[0] === "" && (
        <label className="input-label" name={props.name}>
          {props.placeholder}
        </label>
      )}
    </div>
  );
};

export default Input;
