import React, {useEffect, useState} from 'react';
import styles from './App.module.scss'

import {SwitchButtonProps, SwitchButtons} from "./components/SwitchButtons/SwitchButtons";
import {Slider, SliderMark} from "./components/Slider/Slider";

type KettleStateType = 'on' | 'off' | 'boiled' | 'stopped'

const MAX_WATER_VOLUME = 1;
const MIN_WATER_VOLUME = 0;
const STEP_WATER_VOLUME = 0.25;
const INITIAL_TEMPERATURE = 0;
const INITIAL_KETTLE_STATE = 'off';

const SLIDER_VALUES = [MIN_WATER_VOLUME, 0.25, 0.5, 0.75, 1] as const;
const SLIDER_LABELS: Record<SliderValue, number> = {
    [SLIDER_VALUES[0]]: 0,
    [SLIDER_VALUES[1]]: 0.25,
    [SLIDER_VALUES[2]]: 0.5,
    [SLIDER_VALUES[3]]: 0.75,
    [SLIDER_VALUES[4]]: 1,
};
type SliderValue = (typeof SLIDER_VALUES)[number];

function App() {

    const toggleButtons: SwitchButtonProps<KettleStateType>[] = [
        {
            value: 'on',
            label: 'On',
        },
        {
            value: 'off',
            label: 'Off',
        },
    ];

    const sliderMarks: SliderMark[] = SLIDER_VALUES.map((value) => ({
        value,
        label: SLIDER_LABELS[value],
    }));
    const [waterVolume, setWaterVolume] = useState<SliderValue>(MIN_WATER_VOLUME);

    const [kettleState, setKettleState] = useState<KettleStateType>(INITIAL_KETTLE_STATE)
    const [temperature, setTemperature] = useState<number>(INITIAL_TEMPERATURE)
    const [message, setMessage] = useState<string>('The kettle is off')

    useEffect(() => {
        if (kettleState === 'on') {
            const idTimeout = setTimeout(() => {
                setMessage('The kettle is boiled')
                setKettleState('boiled')
                setTimeout(() => {
                    setMessage('The kettle is off')
                    setKettleState('off')
                }, 1000)
            }, 10000)
            return () => {
                clearTimeout(idTimeout)
            }
        }
    }, [kettleState])

    useEffect(() => {
        if (kettleState === 'on') {
            const idInterval = setInterval(() => {
                setTemperature((currentTemperature) => currentTemperature + 10)

            }, 1000)
            return () => {
                clearInterval(idInterval)
            }
        }
    }, [kettleState])

    const handleSliderChange = (value: number | number[]) => {
        setWaterVolume(value as SliderValue);
    }

    const toggleSwitch = (state: KettleStateType) => {
        setKettleState(state)
        setMessage(`The kettle is stopped`)
        if (state === 'on') {
            setTemperature(0)
            setMessage(`The kettle is ${state}`)
        }
    }
    return (
        <div className={styles.root}>
            <div className={styles.blockImage}>
                <img src='/kettle.jpg' alt='kettle' className={styles.image}/>
            </div>
            <div className={styles.blockInfo}>
                <div className={styles.waterVolume}>
                    <div className={styles.waterVolumeInformation}>
                        Water volume: {waterVolume} liter
                    </div>
                    <Slider
                        minValue={MIN_WATER_VOLUME}
                        maxValue={MAX_WATER_VOLUME}
                        step={STEP_WATER_VOLUME}
                        marks={sliderMarks}
                        value={waterVolume}
                        onChange={handleSliderChange}
                    />
                </div>
                <div>
                    <SwitchButtons<KettleStateType>
                        buttons={toggleButtons}
                        value={kettleState}
                        onChange={toggleSwitch}
                        disabled={!waterVolume}
                    />
                </div>
                <div>Water temperature: {temperature} ℃</div>
                <div>{message}</div>
            </div>
        </div>
    );
}

export default App;
