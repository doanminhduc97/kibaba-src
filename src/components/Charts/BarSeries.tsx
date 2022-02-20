import {
  Axis,
  BarSeries,
  Chart,
  niceTimeFormatter,
  Position,
  ScaleType,
  Settings
} from "@elastic/charts";

export default function BarChart() {
  const min = new Date("2020-03-23T10:00:00.000Z").getTime();
  const max = new Date("2020-03-26T15:00:00.000Z").getTime();
  return (
    <div className="App">
      <Chart size={[500, 200]}>
        <Settings rotation={90} />
        <Axis id="count" title="count" position={Position.Left} />
        <Axis
          id="x"
          title="goods"
          position={Position.Bottom}
          tickFormat={niceTimeFormatter([min, max])}
          domain={{
            min,
            max,
          }}
        />
        <BarSeries
          id="bars"
          name="amount"
          xScaleType={ScaleType.Ordinal}
          xAccessor="x"
          yAccessors={["y1"]}
          y0Accessors={["y0"]}
          data={[
            {
              x: "Value A",
              y0: new Date("2020-03-24T10:00:00.000Z").getTime(),
              y1: new Date("2020-03-25T15:00:00.000Z").getTime(),
            },
            {
              x: "Value B",
              y0: new Date("2020-03-24T18:00:00.000Z").getTime(),
              y1: new Date("2020-03-25T22:00:00.000Z").getTime(),
            },
            {
              x: "Value C",
              y0: new Date("2020-03-24T20:00:00.000Z").getTime(),
              y1: new Date("2020-03-25T20:00:00.000Z").getTime(),
            },
            {
              x: "Value D",
              y0: new Date("2020-03-25T12:00:00.000Z").getTime(),
              y1: new Date("2020-03-26T03:00:00.000Z").getTime(),
            },
          ]}
        />
      </Chart>
    </div>
  );
}
