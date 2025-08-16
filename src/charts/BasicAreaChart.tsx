import { useEffect, useRef } from "react";
import { createChart, AreaSeries } from "lightweight-charts";
import type { AreaData, Time  } from "lightweight-charts";
import { convertResponsePoints, DataDisplaySetting } from "../lib/dataConversions";
import type { ResponsePoint } from "../lib/interfaces";

interface BasicAreaChartProps {
  responsePoints: ResponsePoint[] | null;
  field: DataDisplaySetting;
  field2: DataDisplaySetting;
}

function BasicAreaChart(props: BasicAreaChartProps) {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;
    if (props.responsePoints === null) return;
    if (props.responsePoints.length <= 0)  return;

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

    const seriesData: AreaData<Time>[] = convertResponsePoints(props.responsePoints, props.field)

    newSeries.setData(seriesData);
    
    const nextSeries = chart.addSeries(AreaSeries, {});
    const nextData = convertResponsePoints(props.responsePoints, props.field2)
    nextSeries.setData(nextData)

    return () => {
      chart.remove();
    };
  }, [props.responsePoints]);

  return <div ref={chartContainerRef} />;
}

export default BasicAreaChart;
