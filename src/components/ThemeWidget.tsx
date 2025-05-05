import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

import { cn } from '@helpers';
import { useTheme } from '@hooks';

export const ThemeWidget = () => {
	const { theme, onToggleTheme } = useTheme();

	return (
		<div onClick={onToggleTheme} className={cn('switch', { checked: theme === 'dark' })}>
			<div className="switch-icon-checked">
				<MoonIcon className="w-3 text-white" />
			</div>
			<div className="switch-icon-unchecked">
				<SunIcon className="w-3 text-neutral-500" />
			</div>
			<div className={cn('switch-toggler', { checked: theme === 'dark' })} />
		</div>
	);
};
