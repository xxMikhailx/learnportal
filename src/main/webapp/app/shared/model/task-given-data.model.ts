import { ITask } from 'app/shared/model/task.model';

export interface ITaskGivenData {
  id?: number;
  content?: string;
  task?: ITask;
}

export class TaskGivenData implements ITaskGivenData {
  constructor(public id?: number, public content?: string, public task?: ITask) {}
}
