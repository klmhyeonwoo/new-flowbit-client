import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "./QueryKey";
import { api } from ".";
import { chartDataParser } from "@/utils/chartDataParser";
import { CoinType } from "@/components/app/predict/chart/chart";

export interface IChartDataResponse {
  datas: {
    datas: number[]; // 차트에 들어가는 데이터 리스트
    label: string; // 데이터 리스트의 라벨 // 추후 legend로 이름 변경 필요
  }[];
  label: string[]; // x축에 들어가는 라벨
  max: number; // 차트의 최대 값
  min: number; // 차트의 최소 값
}

export type IPredictPriceResponse = {
  [key in CoinType]: {
    actual_data: {
      close_price: number;
      high_price: number;
      low_price: number;
      open_price: number;
      timestamp: string;
      volume: number;
    };
    predicted_data: {
      predicted_krw: number;
      timestamp: string;
    };
  };
};

export function useGetChartDataQuery(props: CoinType) {
  const getAllChart = async (param: string) => {
    return api.get(`/bitcoin-service/chart?currency=${param}`);
  };

  return useQuery({
    queryKey: [QueryKey.CHART, props],
    queryFn: () => getAllChart(props),
    select(data) {
      return chartDataParser(data.data, props);
    },
    staleTime: 60000 * 60 * 2, // 2시간
    gcTime: 60000 * 60 * 2, // 2시간
  });
}

export function useGetPredictPriceQuery() {
  const getPredictData = async () => {
    return await api.get<IPredictPriceResponse>(
      "/bitcoin-service/predicted-value-list",
    );
  };

  return useQuery({
    queryKey: [QueryKey.PREDICT],
    queryFn: getPredictData,
    staleTime: 60000 * 60 * 2, // 2시간
    gcTime: 60000 * 60 * 2, // 2시간
  });
}
