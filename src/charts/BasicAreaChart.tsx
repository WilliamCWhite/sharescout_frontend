import { useEffect, useRef } from "react";
import { createChart, AreaSeries } from "lightweight-charts";
import type { DataPoint } from "../lib/interfaces";
import type { AreaData, Time } from "lightweight-charts";

interface BasicAreaChartProps {
  data: DataPoint[];
}

function BasicAreaChart(props: BasicAreaChartProps) {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        attributionLogo: false,
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
      timeScale: {
        timeVisible: true,
      },
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addSeries(AreaSeries, {});

    const seriesData: AreaData<Time>[] = props.data.map((d) => ({
      time: Math.floor(d.time.getTime() / 1000) as Time,
      value: d.value,
    }));

    newSeries.setData(seriesData);

    const newerSeries = chart.addSeries(AreaSeries, {});
    const newerSeriesData: AreaData<Time>[] = props.data.map((d) => ({
      time: Math.floor(d.time.getTime() / 1000) as Time,
      value: d.value + 10,
    }))
    newerSeries.setData(newerSeriesData)

    return () => {
      chart.remove();
    };
  }, [props.data]);

  return <div ref={chartContainerRef} />;
}

export default BasicAreaChart;
