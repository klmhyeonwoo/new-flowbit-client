import { useState } from "react";
import { css } from "@emotion/react";
import { DESIGN_SYSTEM_COLOR, DESIGN_SYSTEM_TEXT } from "@/style/variable";

const COIN_TYPE_LIST = ["전체", "리플", "비트코인", "이더리움"];
const ORDER_TYPE_LIST = ["최신순", "인기순"];
const ORDER_TYPE_DICT: { [key: string]: string } = {
  최신순: "&Sort=createdAt,desc",
  인기순: "&Sort=boardLikeCount,desc",
};

export default function CommunityTab({
  onClickCategoryTab,
  onClickSortTab,
}: {
  onClickCategoryTab: (category: string) => void;
  onClickSortTab: (sort: string) => void;
}) {
  const [selectedCoinType, setSelectedCoinType] = useState(COIN_TYPE_LIST[0]);
  const [selectedOrderType, setSelectedOrderType] = useState(
    ORDER_TYPE_LIST[0],
  );

  const handleTabChange = (coinType: string) => {
    setSelectedCoinType(coinType);
    onClickCategoryTab(`&boardCategory=${coinType}`);
  };

  const handleOrderChange = (dateType: string) => {
    setSelectedOrderType(dateType);
    const sort = ORDER_TYPE_DICT[dateType];
    if (sort) {
      onClickSortTab(sort);
    }
  };

  return (
    <nav
      css={css`
        width: 100%;
        display: flex;
        justify-content: space-between;

        border-bottom: 0.2rem solid #e0e0e0;
      `}
    >
      {/* Tab */}
      <div>
        <ul
          css={css`
            display: flex;
            gap: 2rem;
            padding: 0;
            margin: 0;
            list-style: none;

            & label {
              cursor: pointer;
              position: relative;
            }

            & input:checked + label > span {
              color: #222222;
              font-weight: bold;
            }

            & input:checked + label::after {
              content: " ";
              display: block;
              width: 100%;
              height: 0.2rem;
              background-color: #0056ca;

              position: absolute;
              bottom: -100%;
              transform: translateY(-0.3rem);
            }
          `}
        >
          {COIN_TYPE_LIST.map((type) => {
            return (
              <li key={type}>
                <input
                  type="radio"
                  id={`community-tab-${type}`}
                  name="community-tab"
                  hidden
                  checked={type === selectedCoinType}
                  onChange={() => handleTabChange(type)}
                />
                <label htmlFor={`community-tab-${type}`}>
                  <span
                    css={css`
                      ${DESIGN_SYSTEM_TEXT.S3};
                      color: ${DESIGN_SYSTEM_COLOR.GRAY_400};
                    `}
                  >
                    {type}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
      {/* Date Order */}
      <div>
        <ul
          css={css`
            display: flex;
            gap: 1rem;
            padding: 0;
            padding-bottom: 1.2rem;
            padding-right: 1rem;
            margin: 0;
            list-style: none;

            & label {
              padding: 0.5rem 1.5rem;
              border-radius: 10rem;
              cursor: pointer;
            }

            & input:checked + label {
              background-color: #f5f5f5;
            }

            & input:checked + label > span {
              color: #222222;
            }
          `}
        >
          {ORDER_TYPE_LIST.map((type) => {
            return (
              <li key={type}>
                <input
                  type="radio"
                  id={`community-order-${type}`}
                  name="community-order"
                  hidden
                  checked={type === selectedOrderType}
                  onChange={() => handleOrderChange(type)}
                />
                <label htmlFor={`community-order-${type}`}>
                  <span
                    css={css`
                      ${DESIGN_SYSTEM_TEXT.B2};
                      color: ${DESIGN_SYSTEM_COLOR.GRAY_600};
                    `}
                  >
                    {type}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
