import { ReactNode } from 'react';

import { cn } from '@helpers';

interface ISwitch {
	value: boolean;
	onChange: (value: boolean) => void;
	className?: string;
	iconToggler?: ReactNode;
	iconChecked?: ReactNode;
	iconUnChecked?: ReactNode;
}

export const Switch = (props: ISwitch) => (
	<div
		className={cn('switch', { checked: props.value }, props.className)}
		onClick={() => props.onChange(!props.value)}
	>
		{props?.iconChecked ? <div className="switch-icon-checked">{props?.iconChecked}</div> : null}
		{props?.iconUnChecked ? (
			<div className="switch-icon-unchecked">{props?.iconUnChecked}</div>
		) : null}

		<div className={cn('switch-toggler', { checked: props.value })}>{props.iconToggler}</div>
	</div>
);
