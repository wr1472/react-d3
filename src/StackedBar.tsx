import * as d3 from 'd3';
import React, {useEffect, useRef} from 'react';

const colors = [
    "darkviolet",
    "steelblue",
    "lightsteelblue"
]

export interface StackedBarDataPoint {
    value: number, 
    cumulativeValue: number
};

export function StackedBar({data, width = 500}: {width?: number, data: StackedBarDataPoint[]}) {
    const ref = useRef(null);
    const height = 10;
    
    useEffect(() => {   
        const scale = d3.scaleLinear([0, width]).domain([0, 100]);
        const svg = d3.select(ref.current); 

        const updateDimensions = (selection: any) => {
            selection
                .transition()
                .duration(2000)
                .attr('width', (d: StackedBarDataPoint) => scale(d.value))
                .attr("x", (d: StackedBarDataPoint) => scale(d.cumulativeValue - d.value))
        };

        const rects = svg
            .selectAll('rect')
            .data(data);

        rects.enter().append("rect")
            .call(updateDimensions)
            .attr('height', height)
            .attr('fill', (d, i) => colors[i]);

        rects
            .call(updateDimensions);
        
        rects.exit().remove();
    }, [ref, data, width]);

    return <svg width={width} height={height} ref={ref} />;
}

