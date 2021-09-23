//* React
import { useEffect } from "react";

const Home = (props) => {
  //* Set Title
  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  return (
    <main className="home">
      Home
      <br />
      Page
    </main>
  );
};

export default Home;
