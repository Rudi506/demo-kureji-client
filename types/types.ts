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
  holder: { organization: string };
  isActive: boolean;
  candidates: { calonKetua: string; calonWakil: string; description: string }[];
  registeredVoters: { voter: { name: string } }[];
  createdAt: Date;
}
