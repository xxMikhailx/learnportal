import { IContact } from 'app/shared/model/contact.model';

export interface IMainPage {
  id?: number;
  content?: any;
  motto?: string;
  contacts?: IContact[];
}

export class MainPage implements IMainPage {
  constructor(public id?: number, public content?: any, public motto?: string, public contacts?: IContact[]) {}
}
