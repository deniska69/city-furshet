import './Home.css';

import logo from 'assets/home/logo-color-500w.png';

export const Home = () => (
	<div id="home" className="noselect">
		<div id="home-container">
			<span className="home-text">
				Готовые боксы с закусками на любое мероприятие от нашей фуршетной мастерской
			</span>

			<img id="home-container-logo" src={logo} alt="logo_color_500w" />

			<span className="home-text">Фуршет, Кофе-брейк , гастробоксы, выездное накрытие</span>

			<a id="home-container-button" href="#menu">
				Посмотреть меню
			</a>
		</div>
	</div>
);
