import React, { useState, useEffect } from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";
import "./styles.css";

const App: React.FC = () => {
    const [time, setTime] = useState<number>(0);

    const [isRunning, setIsRunning] = useState<boolean>(false);

    const [laps, setLaps] = useState<number[]>([]);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isRunning) {
            interval = setInterval(() => setTime((time) => time + 10), 10);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isRunning]);

    useEffect(() => {
        if (time) {
            const prevLaps = laps.slice(0, laps.length - 1);
            const currentLap: number =
                time - prevLaps.reduce((acc, val) => acc + val, 0);
            setLaps([...prevLaps, currentLap]);
        } else {
            setLaps([]);
        }
    }, [time]);

    return (
        <>
            <StopWatch time={time} />
            <StopWatchButton
                setIsRunning={setIsRunning}
                isRunning={isRunning}
                time={time}
                setTime={setTime}
                laps={laps}
                setLaps={setLaps}
            />
        </>
    );
};

export default App;
