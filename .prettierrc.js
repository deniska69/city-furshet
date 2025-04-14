import { prettier } from '@parabit/prettier';

export default {
	...prettier,
	plugins: ['@ianvs/prettier-plugin-sort-imports'],
	importOrder: [
		'^react$',
		'<THIRD_PARTY_MODULES>',
		'',
		'^@assets|@components|@constants|@containers|@helpers|@hooks|@modules|@navigation|@services|@stores|@types$',
		'',
		'^[.]',
	],
};
