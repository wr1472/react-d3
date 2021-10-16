import * as d3 from 'd3';
import React, {useEffect, useRef} from 'react';

const colors = [
    "darkviolet",
    "steelblue",
    "lightsteelblue"
]

const width = 500;
const height = 10;

const scale = d3.scaleLinear([0, width]).domain([0, 100]);

export function D3Wrapper({data}: {data: {value: number, cumulativeValue: number}[]}) {
    const ref = useRef(null);

    useEffect(() => {   
        const svg = d3.select(ref.current);        

        const rects = svg
            .selectAll('rect')
            .data(data);

        rects.enter().append("rect")
            .transition()
            .duration(2000)
            .attr('width', (d) => scale(d.value))
            .attr("x", (d) => scale(d.cumulativeValue - d.value))
            .attr('height', height)
            .attr('fill', (d, i) => colors[i]);

        rects
            .transition()
            .duration(2000)
            .attr('width', (d) => scale(d.value))
            .attr("x", (d) => scale(d.cumulativeValue - d.value));
        
        rects.exit().remove();
    }, [ref, data]);

    return <svg width={width} height={height} ref={ref} />;
}

