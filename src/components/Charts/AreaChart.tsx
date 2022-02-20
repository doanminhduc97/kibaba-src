import {
    AreaSeries,
    Axis,
    Chart, Position, ScaleType
} from "@elastic/charts";
import moment from "moment";
export default function AreaChart() {
  const data = [
    { g: "css", x: 1614092400000, y: 13 },
    { g: "css", x: 1614103200000, y: 17 },
    { g: "css", x: 1614114000000, y: 9 },
    { g: "css", x: 1614124800000, y: 3 },
    { g: "css", x: 1614135600000, y: 1 },
    { g: "css", x: 1614146400000, y: 0 },
    { g: "css", x: 1614157200000, y: 0 },
    { g: "css", x: 1614168000000, y: 4 },
    { g: "css", x: 1614178800000, y: 14 },
    { g: "css", x: 1614189600000, y: 6 },
    { g: "css", x: 1614200400000, y: 8 },
    { g: "css", x: 1614211200000, y: 2 },
    { g: "css", x: 1614222000000, y: 1 },
    { g: "css", x: 1614232800000, y: 0 },
    { g: "css", x: 1614243600000, y: 0 },
    { g: "css", x: 1614254400000, y: 3 },
    { g: "css", x: 1614265200000, y: 11 },
    { g: "css", x: 1614276000000, y: null },
    { g: "css", x: 1614286800000, y: 6 },
    { g: "css", x: 1614297600000, y: 3 },
    { g: "css", x: 1614308400000, y: 0 },
    { g: "css", x: 1614319200000, y: 0 },
    { g: "css", x: 1614330000000, y: 2 },
    { g: "css", x: 1614340800000, y: 3 },
    { g: "css", x: 1614351600000, y: 6 },
    { g: "gz", x: 1614092400000, y: 15 },
    { g: "gz", x: 1614103200000, y: 16 },
    { g: "gz", x: 1614114000000, y: 7 },
    { g: "gz", x: 1614124800000, y: 4 },
    { g: "gz", x: 1614135600000, y: 1 },
    { g: "gz", x: 1614146400000, y: 0 },
    { g: "gz", x: 1614157200000, y: 1 },
    { g: "gz", x: 1614168000000, y: 6 },
    { g: "gz", x: 1614178800000, y: 9 },
    { g: "gz", x: 1614189600000, y: 5 },
    { g: "gz", x: 1614200400000, y: 6 },
    { g: "gz", x: 1614211200000, y: 7 },
    { g: "gz", x: 1614222000000, y: 1 },
    { g: "gz", x: 1614232800000, y: 0 },
    { g: "gz", x: 1614243600000, y: 2 },
    { g: "gz", x: 1614254400000, y: 4 },
    { g: "gz", x: 1614265200000, y: 20 },
    { g: "gz", x: 1614276000000, y: null },
    { g: "gz", x: 1614286800000, y: 12 },
    { g: "gz", x: 1614297600000, y: 3 },
    { g: "gz", x: 1614308400000, y: 0 },
    { g: "gz", x: 1614319200000, y: 0 },
    { g: "gz", x: 1614330000000, y: 2 },
    { g: "gz", x: 1614340800000, y: 3 },
    { g: "gz", x: 1614351600000, y: 9 },
  ].map((d) => ({ ...d, x: moment(d.x).valueOf() }));

  return (
    <Chart size={[600, 300]}>
      <Axis id="count" title="status" position={Position.Left} />
      <AreaSeries
        id="test3"
        stackMode="percentage"
        xScaleType="time"
        yScaleType={ScaleType.Linear}
        stackAccessors={["yes"]}
        xAccessor="x"
        yAccessors={["y"]}
        splitSeriesAccessors={["g"]}
        data={data}
      />
    </Chart>
  );
}
