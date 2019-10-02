import { ICategory } from 'app/shared/model/category.model';

export interface ITheory {
  id?: number;
  title?: string;
  description?: string;
  content?: any;
  category?: ICategory;
}

export class Theory implements ITheory {
  constructor(public id?: number, public title?: string, public description?: string, public content?: any, public category?: ICategory) {}
}
