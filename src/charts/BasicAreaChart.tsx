import { useEffect, useRef } from "react";
import { createChart, AreaSeries } from "lightweight-charts";
import type { AreaData, Time  } from "lightweight-charts";

interface BasicAreaChartProps {
  chartPoints: AreaData<Time>[] | null
}

function BasicAreaChart(props: BasicAreaChartProps) {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;
    if (props.chartPoints === null) return;
    if (props.chartPoints.length <= 0)  return;

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

    const seriesData: AreaData<Time>[] = props.chartPoints

    newSeries.setData(seriesData);

    return () => {
      chart.remove();
    };
  }, [props.chartPoints]);

  return <div ref={chartContainerRef} />;
}

export default BasicAreaChart;
