import {
  BandFillColorAccessorInput,
  Chart,
  Goal,
  Settings
} from "@elastic/charts";
export const GoalChart = () => {
  const subtype = "goal";

  const colorMap: { [k: number]: any } = {
    300: "rgb(232,232,232)",
  };

  const bandFillColor = (x: number): any => colorMap[x];
  return (
    <Chart size={[600, 300]}>
      <Settings showLegend={false} />
      <Goal
        id="spec_1"
        subtype={subtype}
        base={0}
        target={225}
        actual={0}
        bands={[300]}
        ticks={[0, 50, 100, 150, 200, 250, 300]}
        tickValueFormatter={({ value }: BandFillColorAccessorInput) =>
          String(value)
        }
        bandFillColor={({ value }: BandFillColorAccessorInput) =>
          bandFillColor(value)
        }
        labelMajor="Revenue 2020 YTD  "
        labelMinor="(thousand USD)  "
        centralMajor="225"
        centralMinor=""
      />
    </Chart>
  );
};

export default GoalChart;
