import { ICategory } from 'app/shared/model/category.model';

export interface IFormula {
    id?: number;
    title?: string;
    description?: string;
    equation?: string;
    category?: ICategory;
}

export class Formula implements IFormula {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public equation?: string,
        public category?: ICategory
    ) {}
}
