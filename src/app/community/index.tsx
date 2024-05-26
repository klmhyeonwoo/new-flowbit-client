import { Fragment, useState } from "react";
import { css } from "@emotion/react";
import CommunityBoard from "@/components/app/community/community-board";
import CommunityCreateBtn from "@/components/app/community/community-createBtn";
import CommunityHotBoard from "@/components/app/community/community-hotBoard";
import CommunitySearch from "@/components/app/community/community-search";
import CommunityTab from "@/components/app/community/community-tab";
import UseApiCommunity from "@/hooks/api/newsletter/UseApiComminity";
import {
  BoardModal,
  ModalPortal,
} from "@/components/common/modal/board-modal.tsx";

export default function CommunityPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [communityPage, _] = useState<{
    page: number;
    size: number;
  }>({
    page: 0,
    size: 30,
  });

  const [communityCategory, setCommunityCategory] = useState("");

  const [communitySort, setCommunitySort] = useState("");

  const [communitySearchWord, setCommunitySearchWord] = useState("");

  const [modal, setModal] = useState(false);

  const { data } = UseApiCommunity({
    page: `page=${communityPage.page}`,
    size: `&size=${communityPage.size}`,
    sort: communitySort,
    category: communityCategory,
    searchWord: communitySearchWord,
  });

  const handleCommunitySort = (sort: string) => {
    setCommunitySort(sort);
  };

  const handleCommunityCategory = (category: string) => {
    setCommunityCategory(category);
  };

  const handleCommunitySearchWord = (word: string) => {
    setCommunitySearchWord(word);
  };

  const createBoardModal = () => {
    setModal(true);
  };

  return (
    <Fragment>
      {modal && (
        <ModalPortal>
          <BoardModal setModalState={setModal} />
        </ModalPortal>
      )}
      <div
        css={css`
          width: 100%;
          height: 32.2rem;
          background-color: black;
        `}
      ></div>
      <div
        css={css`
          margin: 3.5rem auto;
          max-width: 111.6rem;
          display: flex;
          gap: 12rem;
        `}
      >
        <main
          css={css`
            min-width: 735px;
            display: flex;
            flex-direction: column;
            gap: 4.2rem;
          `}
        >
          <CommunityCreateBtn onClick={createBoardModal}></CommunityCreateBtn>
          <CommunityTab
            onClickCategoryTab={handleCommunityCategory}
            onClickSortTab={handleCommunitySort}
          ></CommunityTab>
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 5rem;
            `}
          >
            {data &&
              data.content.map((row) => {
                return (
                  <CommunityBoard
                    key={row.boardId + row.nickname}
                    {...row}
                  ></CommunityBoard>
                );
              })}
          </div>
        </main>
        <aside
          css={css`
            display: flex;
            flex-direction: column;
            gap: 4.7rem;
          `}
        >
          <CommunitySearch
            onSearchWord={handleCommunitySearchWord}
            onClickTag={handleCommunityCategory}
          ></CommunitySearch>
          <CommunityHotBoard></CommunityHotBoard>
        </aside>
      </div>
    </Fragment>
  );
}
