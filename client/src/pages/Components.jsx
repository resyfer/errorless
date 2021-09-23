//* React
import { useEffect } from "react";

//* Components
import Button from "../components/Button";

//* CSS

const Components = (props) => {
  //* Set Title
  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  return (
    <main className="home">
      Components
      <br />
      Page
      <br />
      <Button name="Hello" link="/" />
    </main>
  );
};

export default Components;
