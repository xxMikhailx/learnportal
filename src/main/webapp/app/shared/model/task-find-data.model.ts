import { ITask } from 'app/shared/model/task.model';

export interface ITaskFindData {
    id?: number;
    content?: string;
    task?: ITask;
}

export class TaskFindData implements ITaskFindData {
    constructor(public id?: number, public content?: string, public task?: ITask) {}
}
