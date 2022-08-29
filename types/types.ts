export interface DataMapped {
  organization: String;
  admin: { name: String };
  description: String;
  _id: String;
}
export interface CloseBtn {
  isOpen: Boolean;
  closeBtn: (arg: boolean) => void;
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
  createdAt: Date | undefined;
}
