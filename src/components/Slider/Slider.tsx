import React from 'react';

import styles from './Slider.module.scss';

export type SliderMark = {
    value: number;
    label: number;
};

type Props = {
    minValue: number;
    maxValue: number;
    step: number;
    marks: SliderMark[];
    onChange: (value: number | number[]) => void;
    value: number;
};

export const Slider = ({
                           marks,
                           onChange,
                           value,
                           minValue,
                           maxValue,
                           step,
                       }: Props) => {
        return (
            <div className={styles.root}>
                <input
                    type="range"
                    min={minValue}
                    max={maxValue}
                    step={step}
                    onChange={(event) => onChange(Number(event.target.value))}
                    value={value}
                    className={styles.input}
                />
                <div className={styles.marks}>
                    {marks.map((item, index) => {
                        return (
                            <>
                                <div key={index} className={styles.markItem}>
                                    <div
                                        className={`${styles.switch} ${item.value === value && styles.activeMark}
                                          ${item.value < value && styles.beforeActive}
                                      `}
                                    ></div>
                                    <div className={styles.label}>{item.label}</div>
                                </div>
                                <div
                                    className={`${styles.line} ${item.value < value && styles.beforeActive}`}
                                />
                            </>
                        );
                    })}
                </div>
            </div>
        );
    }
;
