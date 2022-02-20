import {
    Axis,
    Chart,
    CurveType,
    LineSeries,
    niceTimeFormatByDay,
    Position,
    ScaleType,
    timeFormatter
} from "@elastic/charts";
const dateFormatter = timeFormatter(niceTimeFormatByDay(1));
export default function App() {
  return (
    <Chart size={[1000, 400]}>
      <Axis id="count" title="status" position={Position.Left} />
      <Axis
        id="x"
        title="time"
        position={Position.Bottom}
        tickFormat={dateFormatter}
      />
      `{" "}
      <LineSeries
        id="bars"
        name="amount"
        xScaleType={ScaleType.Time}
        xAccessor={0}
        yAccessors={[1]}
        curve={CurveType.CURVE_STEP_AFTER}
        data={[
          [1551438000000, 1],
          [1551438300000, 2],
          [1551438540000, 0],
          [1551438990000, 1],
          [1551440520000, 0],
          [1551441120000, 1],
          [1551442000000, 1],
        ]}
      />
    </Chart>
  );
}
