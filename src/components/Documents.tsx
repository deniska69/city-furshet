const items = [
	{
		title: 'Политика конфиденциальности',
		url: 'https://city-furshet.ru/documents/Политика_конфиденциальности.pdf',
	},
	{
		title: 'Пользовательское соглашение',
		url: 'https://city-furshet.ru/documents/Пользовательское_соглашение.pdf',
	},
	{
		title: 'Публичная оферта',
		url: 'https://city-furshet.ru/documents/Публичная_оферта.pdf',
	},
	{
		title: 'Условия хранения и потребления',
		url: 'https://city-furshet.ru/documents/Условия_хранения_и_потребления.pdf',
	},
];

export const Documents = () => (
	<div className="flex flex-col gap-y-2">
		<span className="pt-4 border-t border-t-border text-base text-xl font-semibold">
			Документы:
		</span>

		{items.map((el, index) => (
			<div key={index} className="flex flex-row items-center gap-x-1 flex-wrap">
				<a
					className="text-secondary text-xl font-medium hover:underline action:underline cursor-pointer"
					href={el.url}
					target="_blank"
				>
					{el.title}
				</a>
			</div>
		))}
	</div>
);
