import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITaskGivenData } from 'app/shared/model/task-given-data.model';

@Component({
  selector: 'jhi-task-given-data-detail',
  templateUrl: './task-given-data-detail.component.html'
})
export class TaskGivenDataDetailComponent implements OnInit {
  taskGivenData: ITaskGivenData;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ taskGivenData }) => {
      this.taskGivenData = taskGivenData;
    });
  }

  previousState() {
    window.history.back();
  }
}
