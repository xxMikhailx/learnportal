import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'jhi-recommended-links',
  templateUrl: './recommended-links.component.html',
  styleUrls: ['./recommended-links.component.scss']
})
export class RecommendedLinksComponent implements OnInit {
  @Input() categoryId: number;
  @Input() currentEntity: string;

  constructor() {}

  ngOnInit() {}
}
