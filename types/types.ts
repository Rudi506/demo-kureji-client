import { RefCallback } from "react";

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
