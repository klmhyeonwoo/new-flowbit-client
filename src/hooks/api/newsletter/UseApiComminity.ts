import { api } from "@/api";
import {
  CommunityBoardType,
  CommunityPageType,
} from "@/components/app/community/type";
import { useQuery } from "@tanstack/react-query";

export type getCommunityBoardResType = CommunityPageType & {
  content: CommunityBoardType[];
};

export type ApiCommunityProps = {
  page: string;
  size: string;
  sort: string;
  category: string;
  searchWord: string;
};

export default function UseApiCommunity(props: ApiCommunityProps) {
  const getCommunityBoard = async (props: ApiCommunityProps) => {
    const { page, size, sort, category, searchWord } = props;

    const param = [page, size, sort, category, searchWord].reduce(
      (acc, value) => acc + value,
      "?",
    );

    return await api
      .get(`/board-service/api/v1/board${param}`)
      .then((res) => res.data.data as getCommunityBoardResType);
  };

  return useQuery({
    queryKey: ["community", props],
    queryFn: () => {
      return getCommunityBoard(props);
    },
  });
}
