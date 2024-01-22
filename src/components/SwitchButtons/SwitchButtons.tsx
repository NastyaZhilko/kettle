import React from 'react';

import styles from './SwitchButtons.module.scss';

type SwitchButton<T extends string> = {
    label: string;
    value: T;
};

type Props<T extends string> = {
    buttons: SwitchButton<T>[];
    value: T;
    onChange(value: T): void;
    disabled?: boolean
};

export function SwitchButtons<T extends string>({
                                                    buttons,
                                                    value,
                                                    onChange,
                                                    disabled
                                                }: Props<T>) {
    return (
        <div className={styles.root}>
            {buttons.map(({ label, value: buttonValue }) => {
                const isActiveButton = value===buttonValue
                return (
                    <button
                        key={buttonValue}
                        onClick={() => onChange(buttonValue)}
                        className={`${styles.button} ${isActiveButton && styles.active}`}
                        disabled={isActiveButton || disabled}
                    >
                        {label}
                    </button>
                )
            })}
        </div>
    );
}

export type { SwitchButton as SwitchButtonProps };
