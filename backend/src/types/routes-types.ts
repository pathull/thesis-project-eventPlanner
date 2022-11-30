export interface IParamReqUser {
  userId: string;
}

export interface IParamEvent {
  eventId: string;
}

export interface IParamMember extends IParamEvent, IParamReqUser {}

export interface IItemsBody {
  items: Array<{
    item_name: string;
  }>;
}
