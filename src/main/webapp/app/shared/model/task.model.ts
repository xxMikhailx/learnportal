import { ITaskGivenData } from 'app/shared/model/task-given-data.model';
import { ITaskFindData } from 'app/shared/model/task-find-data.model';
import { ICategory } from 'app/shared/model/category.model';

export interface ITask {
    id?: number;
    title?: string;
    shortDescription?: string;
    taskDescription?: any;
    solution?: any;
    givenData?: ITaskGivenData[];
    findData?: ITaskFindData[];
    category?: ICategory;
}

export class Task implements ITask {
    constructor(
        public id?: number,
        public title?: string,
        public shortDescription?: string,
        public taskDescription?: any,
        public solution?: any,
        public givenData?: ITaskGivenData[],
        public findData?: ITaskFindData[],
        public category?: ICategory
    ) {}
}
