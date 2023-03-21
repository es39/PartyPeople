// * 신청자, 참여자 탭
interface contentsTab {
  tabName: string;
}

// * 작성자 정보
interface detailInfo {
  companionId: number;
  memberId: number;
  nickname: string;
  score: number;
  title: string;
  content: string;
  date: string;
  address: string;
  lat: number;
  lng: number;
  tags: string[];
  createdAt: string;
  companionStatus: boolean;
}

// * 첫번째 리뷰 모달
interface firstModal {
  detail: detailInfo;
  setFirstModal: (newValue: boolean) => void;
  reviewId: number;
}

// * 두번째 리뷰 모달
interface secondModal {
  detail: detailInfo;
  setFirstModal: (newValue: boolean) => void;
  setSecondModal: (newValue: boolean) => void;
  reviewId: number;
}

// * 세번째 리뷰 모달
interface thirdModal {
  detail: detailInfo;
  setFirstModal: (newValue: boolean) => void;
  setSecondModal: (newValue: boolean) => void;
  setThirdModal: (newValue: boolean) => void;
  reviewId: number;
}

// * 동행자 정보
interface companionProps {
  detail: detailInfo;
  sub: subApply[];
  setSub: (newValue: subApply[]) => void;
  part: partApply[];
  setPart: (newValue: partApply[]) => void;
}

// * 신청자 정보
interface subApply {
  memberId: number;
  profile: string;
  nickname: string;
}

// * 신청자 props
interface subProps {
  detail: detailInfo;
  sub: subApply[];
  setSub: (newValue: subApply[]) => void;
}

// * 참여자 정보
interface partApply {
  memberId: number;
  profile: string;
  nickname: string;
}

// * 참여자 props
interface partProps {
  detail: detailInfo;
  part: partApply[];
  setPart: (newValue: partApply[]) => void;
}

export type {
  contentsTab,
  firstModal,
  secondModal,
  thirdModal,
  detailInfo,
  subProps,
  partProps,
  companionProps,
};
