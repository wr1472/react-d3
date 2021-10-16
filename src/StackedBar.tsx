import * as d3 from 'd3';
import React, {useEffect, useRef} from 'react';

const colors = [
    "darkviolet",
    "steelblue",
    "lightsteelblue"
]

export function StackedBar({data, width = 500}: {width?: number, data: {value: number, cumulativeValue: number}[]}) {
    const ref = useRef(null);
    const height = 10;
    
    useEffect(() => {   
        const scale = d3.scaleLinear([0, width]).domain([0, 100]);
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
    }, [ref, data, width]);

    return <svg width={width} height={height} ref={ref} />;
}

