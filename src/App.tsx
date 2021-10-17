import {useEffect, useState} from 'react';

import {css} from "@emotion/css";

import {StackedBar} from './StackedBar';

const updateInterval = 5000;
const sum = (prev: number, curr: number) => prev + curr;
const generateData = (_: unknown) => Math.floor(Math.random() * 100);
const toPercentage = (value: number, _: unknown, values: number[]) => value / values.reduce(sum, 0) * 100;
const toDatapoint = (value: number, index: number, values: number[]) => ({
    value,
    cumulativeValue: values.slice(0, index + 1).reduce(sum, 0)
});

function App() {
    const [data, setData] = useState([
        {value: 0, cumulativeValue: 0},
        {value: 0, cumulativeValue: 0},
        {value: 0, cumulativeValue: 0}
    ]);

    useEffect(() => {
        const interval = setInterval(() =>
            setData(data
                .map(generateData)
                .map(toPercentage)
                .map(toDatapoint)), 
            updateInterval);
    
        return () => clearInterval(interval);
      }, [data]);

    return <>
        <div className={css({display: "flex", justifyContent: "center", alignItems: "end", height: "calc(50vh)"})}>
            <StackedBar data={data} />
        </div>
        <div className={css({textAlign: "center", marginTop: 8, fontStyle: "italic"})}>d3 horizontal stacked bar</div>
    </>;
}

export default App;
