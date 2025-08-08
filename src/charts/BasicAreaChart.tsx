import { useEffect, useRef } from "react";
import { createChart, AreaSeries } from "lightweight-charts";
import type { AreaData, Time } from "lightweight-charts";

interface BasicAreaChartProps {
  data: AreaData<Time>[];
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

    const seriesData: AreaData<Time>[] = props.data

    newSeries.setData(seriesData);

    return () => {
      chart.remove();
    };
  }, [props.data]);

  return <div ref={chartContainerRef} />;
}

export default BasicAreaChart;
