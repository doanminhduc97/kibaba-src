import {
  Axis,
  Chart,
  LineSeries,
  niceTimeFormatter,
  Position,
  ScaleType,
  Settings
} from "@elastic/charts";
import { useState } from "react";
import { DATA } from "./mock-data/line-data";

export default function LinePoint() {
  const theme: Object = {
    axes: {
      gridLineStyle: {
        vertical: {
          dash: [5, 5],
        },
      },
    },
    lineSeriesStyle: { point: { radius: 1.5 } },
  };
  const [themeSetting] = useState(theme);
  return (
    <Chart size={[600, 200]}>
      <Settings
        theme={themeSetting}
        showLegend
        legendPosition={Position.Bottom}
      />
      <Axis
        id="count"
        title="% of coverage"
        position={Position.Left}
        domain={{ fit: true }}
        ticks={5}
        showGridLines
        tickFormat={(d: any) => {
          return `${d.toFixed(1)} %`;
        }}
      />
      <Axis
        id="x"
        position={Position.Bottom}
        tickFormat={niceTimeFormatter([
          DATA[0].timestamp,
          DATA[DATA.length - 1].timestamp,
        ])}
        showGridLines
      />
      <LineSeries
        id="bars"
        name="current coverage 73.2%"
        xScaleType={ScaleType.Time}
        xAccessor="timestamp"
        yAccessors={["percentage"]}
        data={DATA}
      />
    </Chart>
  );
}
