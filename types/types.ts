import { ReactNode } from "react";

export interface createOrg {
  isOpen: Boolean;
  closeBtn: (arg: boolean) => void;
  setData: (arg: any) => void;
  setMsg: (arg: string) => void;
  setAnim: (arg: boolean) => void;
}
export interface addEvent {
  isOpen: Boolean;
  closeBtn: (arg: boolean) => void;
  orgId: String | undefined;
}

export interface eventDetail {
  _id: string;
  voteTitle: string;
  holder: { _id: string; organization: string };
  isActive: boolean;
  candidates: {
    _id: string;
    calonKetua: string;
    calonWakil: string;
    description: string;
    numOfVotes: number;
  }[];
  registeredVoters: { voter: { name: string }; hasVoted: boolean }[];
  createdAt: string;
}

export interface logoutBtn {
  isOpen: boolean;
  reqCloseBtn: (arg: boolean) => void;
  msg: string;
  callFunction: () => void;
}

export interface user {
  _id: string;
  name: string;
  email: string;
  organization: organization[];
  voteParticipation: voteEvents[];
}
export interface members {
  _id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

export interface organization {
  _id: string;
  organization: string;
  description: string;
  admin: { _id: string; name: string; email: string }[];
  members: members[];
  voteEvents: voteEvents[];
}

export interface candidates {
  _id: string;
  calonKetua: string;
  calonWakil: string;
  description: string;
  numOfVotes: number;
}

export interface voteEvents {
  _id: string;
  voteTitle: string;
  holder: organization;
  isActive: boolean;
  finishedDate: Date;
  candidates: candidates[];
  registeredVoters: { voter: user; hasVoted: boolean }[];
}

export interface ListCardTypes {
  key: number;
  href: string;
  headingOne: String;
  subHeadingTitle: string;
  subHeading: String;
  description: String;
  children: React.ReactNode;
}

export interface DeleteModalTypes {
  showDeleteModal: boolean;
  reqCloseBtn: (arg: boolean) => void;
  children: ReactNode;
  deletedItem: string;
  URI: string;
  type: string;
}

export interface MemberSetting {
  showModal: boolean;
  children: ReactNode;
  reqCloseBtn: (arg: string | null) => void;
  URI: string;
  memberData: { name: string | null; id: string | null };
  updateData: (arg: any) => void;
  setMsg: (arg: any) => void;
  setAnim: (arg: any) => void;
  type: string | null;
}
