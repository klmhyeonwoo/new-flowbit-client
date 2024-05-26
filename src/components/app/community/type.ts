export interface CommunityBoardType {
  memberId: number;
  memberEmail: string;
  nickname: string;
  profile: string;
  boardId: number;
  title: string;
  content: string;
  createTime: string;
  updateTime: string;
  imagePath: string[];
  boardLikeCount: number;
  boardCommentCount: string;
  boardCategory: string;
  boardTags: string[];
  comments: CommunityCommentType[];
}

export interface CommunityCommentType {
  memberEmail: string;
  profile: string;
  createTime: string;
  content: string;
  commentId: number;
  memberId: number;
  name: string;
}

export interface CommunityPageType {
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
