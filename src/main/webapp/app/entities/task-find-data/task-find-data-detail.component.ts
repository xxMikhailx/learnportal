import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITaskFindData } from 'app/shared/model/task-find-data.model';

@Component({
  selector: 'jhi-task-find-data-detail',
  templateUrl: './task-find-data-detail.component.html'
})
export class TaskFindDataDetailComponent implements OnInit {
  taskFindData: ITaskFindData;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ taskFindData }) => {
      this.taskFindData = taskFindData;
    });
  }

  previousState() {
    window.history.back();
  }
}
