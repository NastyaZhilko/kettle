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
};

export function SwitchButtons<T extends string>({
                                                    buttons,
                                                    value,
                                                    onChange,
                                                }: Props<T>) {
    return (
        <div className={styles.root}>
            {buttons.map(({ label, value: buttonValue }) => (
                <button
                    key={buttonValue}
                    onClick={() => onChange(buttonValue)}
                    className={`${styles.button} ${value === buttonValue && styles.active}`}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}

export type { SwitchButton as SwitchButtonProps };
