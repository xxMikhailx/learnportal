import { IMainPage } from 'app/shared/model/main-page.model';
import { ContactType } from 'app/shared/model/enumerations/contact-type.model';

export interface IContact {
  id?: number;
  text?: string;
  description?: string;
  contactType?: ContactType;
  mainPage?: IMainPage;
}

export class Contact implements IContact {
  constructor(
    public id?: number,
    public text?: string,
    public description?: string,
    public contactType?: ContactType,
    public mainPage?: IMainPage
  ) {}
}
