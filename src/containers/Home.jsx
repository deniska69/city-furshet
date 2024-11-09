import "./Home.css";
import logo from "../assets/home/logo-color-500w.png";

const Home = () => {
  return (
    <div id="home" className="noselect">
      <div id="home-container">
        <img id="home-container-logo" src={logo} alt="logo_color_500w" />
        <div id="home-container-description_first-wrap">
          <span id="home-container-description_first">Вкуснее, чем дома</span>
        </div>
        <span id="home-container-description_second">Быстрее, чем у плиты</span>
        <a id="home-container-button" href="#menu">
          Посмотреть меню
        </a>
      </div>
    </div>
  );
};

export default Home;
