export interface IParamReqUser {
  userId: string;
}

export interface IParamEvent {
  eventId: string;
}

export interface IParamMember extends IParamEvent, IParamReqUser {}
