import AreaChart from "../../components/Charts/AreaChart";
import AxesChart from "../../components/Charts/AxesChart";
import BarChart from "../../components/Charts/BarSeries";
import BubbleChart from "../../components/Charts/BubbleChart";
import BubbleMixBar from "../../components/Charts/BubbleMixBar";
import GoalChart from "../../components/Charts/GoalChart";
import HeatmapChart from "../../components/Charts/HeatmapChart";
import LinePoint from "../../components/Charts/LinePoint";
import LineChart from "../../components/Charts/LineSeries";
function home() {
  return (
    <div>
      <BarChart /> <LineChart /> <LinePoint /> <BubbleChart /> <HeatmapChart />{" "}
      <BubbleMixBar /> <GoalChart /> <AxesChart /> <AreaChart />
    </div>
  );
}

export default home;
