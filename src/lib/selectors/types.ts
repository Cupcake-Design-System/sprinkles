import { Observable } from 'rxjs';

export interface IListItem<TPayload = any> {
  id: string;
  text: string;
  payload?: TPayload;
  isSelectAll?: boolean;
}

export interface IListSearchResult<TPayload = any> {
  items: IListItem<TPayload>[];
  isLoading: boolean;
  isTooManyResults: boolean;
}

export interface IListChangedEvent<TPayload = any> {
  added: IListItem<TPayload>[];
  removed: IListItem<TPayload>[];
  allSelected: IListItem<TPayload>[];
}

export interface IListAction {
  text: string;
  execute(): Observable<void>;
}

export enum ControlSide {
  Top = 'top',
  Bottom = 'bottom'
}

export interface IFocusParams {
  to: ControlSide | null;
}

export interface IMoveFocusParams {
  from: ControlSide | null;
}
