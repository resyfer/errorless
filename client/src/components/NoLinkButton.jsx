//* CSS
import "./css/NoLinkButton.scss";

const NoLinkButton = (props) => {
  return (
    <div className="noLinkBtn" onClick={props.onClick} style={props.style}>
      <button className="btn-link">{props.name}</button>
    </div>
  );
};

export default NoLinkButton;
