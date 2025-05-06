import logo from '@assets/home/logo-color-500w.png';
import { scrollToMenu } from '@helpers';

export const Home = () => (
	<div id="home" className="noselect min-h-[100vh] flex justify-start bg-white w-full">
		<div
			id="home-container"
			className="flex flex-col items-center justify-center w-full gap-y-6 px-6 dev lg:w-1/2 lg:ml-[40%] lg:gap-y-12 pt-(--header-height) pb-6"
		>
			<span className="text-secondary text-xl text-center md:max-w-[600px] md:text-2xl md:font-medium">
				Готовые боксы с закусками на любое мероприятие от нашей фуршетной мастерской
			</span>

			<img className="max-w-[80vw] md:max-w-[500px]" src={logo} alt="logo_color_500w" />

			<span className="text-secondary text-xl text-center md:max-w-[600px] md:text-2xl md:font-medium">
				Фуршет, Кофе-брейк , гастробоксы, выездное накрытие
			</span>

			<button
				className="bg-primary hover:bg-primary/80 active:bg-primary/80 hover:cursor-pointer rounded-lg text-white font-medium px-5 py-3 text-2xl active:scale-[99%] transition-all"
				onClick={() => scrollToMenu()}
			>
				Посмотреть меню
			</button>
		</div>
	</div>
);
