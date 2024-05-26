import { IChartDataResponse } from "@/api/chartApi";
import { CoinType } from "@/components/app/predict/chart/chart";
import { ChartDataType, ChartType } from "@/lib/Chart";

const CHART_WIDTH = 1116;
const CHART_HEIGHT = 652;
const CHART_FONT = 14;

const CHART_SHOW_DATA_COUNT = 14;
const CHART_SHOW_LABEL_COUNT = 8;

// 서버로부터 넘어온 차트 데이터 규격을 차트 라이브러리에서 요구하는 형태로 파싱
export function chartDataParser(
  chartDataResponse: IChartDataResponse,
  coinType: CoinType,
): ChartType {
  const chartData: ChartType = {
    targetId: "chart",
    size: {
      width: CHART_WIDTH,
      height: CHART_HEIGHT,
      font: CHART_FONT,
    },
    datas: [],
    labels: [],
    zoom: true,
    showDataCount: CHART_SHOW_DATA_COUNT,
    showLabelCount: CHART_SHOW_LABEL_COUNT,
  };
  const datas: ChartDataType[] = [];

  chartDataResponse.datas.forEach((element, i) => {
    let data: ChartDataType;

    if (i === 0) {
      // 실제 가격 차트
      data = {
        label: element.label,
        data: coinType === "BTC" ? element.datas.slice(7) : element.datas,
        width: 2,
        color: "#0056CA",
        min: chartDataResponse.min,
        max: chartDataResponse.max,
        drawMode: "area",
        areaColor: "rgba(0, 86, 202, .7)",
      };
    } else {
      // 예측 가격 차트
      data = {
        label: element.label,
        data: element.datas,
        width: 2,
        color: "#00285D",
        min: chartDataResponse.min,
        max: chartDataResponse.max,
        drawMode: "dotted",
        areaColor: "rgba(228, 75, 121, 0.16)",
      };
    }
    datas.push(data);
  });

  chartData.datas = datas;
  chartData.labels = chartDataResponse.label.map((row) =>
    row.split("-").join(""),
  );

  return chartData;
}
