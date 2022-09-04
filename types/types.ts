export interface DataMapped {
  organization: String;
  admin: { name: String };
  description: String;
  _id: String;
}
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

export interface orgDetail {
  admin: { name: String };
  _id: String;
  organization: String;
  description: String;
  members: [];
  voteEvents: [];
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

export interface organization {
  _id: string;
  organization: string;
  description: string;
  admin: { _id: string; name: string; email: string };
  members: user[];
  voteEvents: [];
}

export interface voteEvents {
  _id: string;
  voteTitle: string;
  holder: organization;
  isActive: boolean;
  finishedDate: Date;
  candidates: {
    calonKetua: string;
    calonWakil: string;
    description: string;
    numOfVotes: number;
  }[];
  registeredVoters: { voter: user; hasVoted: boolean }[];
}
