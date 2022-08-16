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
