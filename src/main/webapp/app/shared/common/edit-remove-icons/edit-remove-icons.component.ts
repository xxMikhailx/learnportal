import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'jhi-edit-remove-icons',
  templateUrl: './edit-remove-icons.component.html',
  styleUrls: ['./edit-remove-icons.component.scss']
})
export class EditRemoveIconsComponent implements OnInit {
  @Input() entityId: number;
  @Input() entityName: string;

  constructor() {}

  ngOnInit() {}
}
