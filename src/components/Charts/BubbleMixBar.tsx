import {
  Axis,
  BarSeries,
  BubbleSeries,
  Chart,
  ColorVariant,
  Position,
  ScaleType,
  Settings,
  TooltipType
} from "@elastic/charts";
import { data } from "./mock-data/bubble-data";

export default function BubbleMixBar() {
  return (
    <div className="App">
      <Chart size={[1500, 1000]}>
        <Settings
          tooltip={TooltipType.Follow}
          theme={{
            markSizeRatio: 8,
          }}
          showLegend
        />
        <Axis id="count" title="Miles per Gallon" position={Position.Left} />
        <Axis id="x" title="Horsepower" position={Position.Bottom} />
        <BubbleSeries
          id="series green"
          name="series green"
          xScaleType={ScaleType.Linear}
          xAccessor="Horsepower"
          yAccessors={["Miles_per_Gallon"]}
          splitSeriesAccessors={["Origin"]}
          markSizeAccessor={"Acceleration"}
          data={data}
          bubbleSeriesStyle={{
            point: {
              strokeWidth: 0,
              fill: ColorVariant.Series,
              opacity: 0.4,
            },
          }}
        />
        <BarSeries
          id="bars"
          name="amount"
          xScaleType={ScaleType.Linear}
          xAccessor="Horsepower"
          yAccessors={["Miles_per_Gallon"]}
          splitSeriesAccessors={["Origin"]}
          markSizeAccessor={"Acceleration"}
          data={data}
        />
      </Chart>
    </div>
  );
}
