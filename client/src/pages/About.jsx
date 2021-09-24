import "./css/About.scss";

const About = (props) => {
  return (
    <main className="team">
      <div className="teamHeader">Errorless Team</div>
      <div className="teamList">
        <div className="teamImg">
          <img src="/img/team/Saurav.jpg" alt="Saurav" />
          <p>Saurav Pal</p>
          <p>2nd Year, CSE Dept</p>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.github.com/resyfer"
          >
            <i className="fab fa-github"></i>
          </a>
        </div>
        <div className="teamImg">
          <img src="/img/team/Pratik.jpg" alt="Pratik" />
          <p>Pratik Majumdar</p>
          <p>2nd Year, CSE Dept</p>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.github.com/codadept"
          >
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>
    </main>
  );
};

export default About;
