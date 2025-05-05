import { prettier } from '@parabit/prettier';

export default {
	...prettier,
	plugins: ['@ianvs/prettier-plugin-sort-imports'],
	importOrder: [
		'^react$',
		'<THIRD_PARTY_MODULES>',
		'',
		'^@assets|@components|@constants|@containers|@helpers|@hooks|@modals|@modules|@navigation|@services|@stores|@styles|@types$',
		'',
		'^[.]',
	],
};
