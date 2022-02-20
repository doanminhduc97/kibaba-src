import { Chart, Heatmap, niceTimeFormatter, ScaleType, Settings } from "@elastic/charts";
import { boolean, button } from "@storybook/addon-knobs";
import { useCallback, useState } from "react";
import { DATA_6 } from "./mock-data/heatmap-data";

export const HeatmapChart = () => {
  const [selection, setSelection] = useState();

  const persistCellsSelection = boolean("Persist cells selection", true);
  const showXAxisTitle = boolean("Show x axis title", false);
  const showYAxisTitle = boolean("Show y axis title", false);

  const handler = useCallback(() => {
    setSelection(undefined);
  }, []);

  button("Clear cells selection", handler);

  const colorScale = {
    type: "bands",
    bands: [
      { start: -Infinity, end: 3.5, color: "#d2e9f7" },
      { start: 3.5, end: 25, color: "#8bc8fb" },
      { start: 25, end: 50, color: "#fdec25" },
      { start: 50, end: 75, color: "#fba740" },
      { start: 75, end: Infinity, color: "#fe5050" },
    ],
  };
  const xScale = {
    type: ScaleType.Time,
    interval: DATA_6.interval,
  };
  return (
    <Chart size={[1500, 700]}>
      <Settings showLegend={false} />
      <Heatmap
        id="heatmap1"
        colorScale={colorScale}
        data={DATA_6.data}
        xAccessor="x"
        yAccessor="y"
        valueAccessor="value"
        valueFormatter={(d) => `${Number(d.toFixed(2))}℃`}
        ySortPredicate="numAsc"
        xScale={xScale}
        xAxisLabelFormatter={(value) => {
          return niceTimeFormatter([1572825600000, 1572912000000])(value, {
            timeZone: "UTC",
          });
        }}
        timeZone={DATA_6.timeZone}
        onBrushEnd={(e) => {
          setSelection({ x: e.x, y: e.y });
        }}
        highlightedData={persistCellsSelection ? selection : undefined}
        xAxisTitle={showXAxisTitle ? "Bottom axis" : undefined}
        yAxisTitle={showYAxisTitle ? "Left axis" : undefined}
      />
    </Chart>
  );
};

export default HeatmapChart;
