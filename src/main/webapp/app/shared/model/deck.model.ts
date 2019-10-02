import { ICategory } from 'app/shared/model/category.model';

export interface IDeck {
  id?: number;
  title?: string;
  description?: string;
  deckContentType?: string;
  deck?: any;
  category?: ICategory;
}

export class Deck implements IDeck {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string,
    public deckContentType?: string,
    public deck?: any,
    public category?: ICategory
  ) {}
}
