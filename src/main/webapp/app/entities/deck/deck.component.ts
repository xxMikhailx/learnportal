import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IDeck } from 'app/shared/model/deck.model';
import { ICategory } from 'app/shared/model/category.model';
import { AccountService } from 'app/core/auth/account.service';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { DeckService } from './deck.service';
import { CategoryService } from '../category/category.service';

@Component({
  selector: 'jhi-deck',
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit, OnDestroy {
  decks: IDeck[];
  categories: ICategory[];
  searchValue: string;
  categoryId: string;
  currentAccount: any;
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected deckService: DeckService,
    protected categoryService: CategoryService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected parseLinks: JhiParseLinks,
    protected accountService: AccountService,
    protected location: Location,
    protected route: ActivatedRoute
  ) {
    this.decks = [];
    this.categories = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.deckService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
        search: this.getSearchRequest()
      })
      .subscribe(
        (res: HttpResponse<IDeck[]>) => this.addDecks(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.categoryService
      .query()
        .pipe(
          filter((res: HttpResponse<ICategory[]>) => res.ok),
          map((res: HttpResponse<ICategory[]>) => res.body)
        )
        .subscribe(
          (res: ICategory[]) => { this.categories = res; },
          (res: HttpErrorResponse) => this.onError(res.message)
        );
  }

  reloadAll() {
    this.page = 0;
    this.deckService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
        search: this.getSearchRequest()
      })
      .subscribe(
        (res: HttpResponse<IDeck[]>) => this.resetDecks(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.categoryService
      .query()
        .pipe(
          filter((res: HttpResponse<ICategory[]>) => res.ok),
          map((res: HttpResponse<ICategory[]>) => res.body)
        )
        .subscribe(
          (res: ICategory[]) => { this.categories = res; },
          (res: HttpErrorResponse) => this.onError(res.message)
        );
  }

  reset() {
    this.page = 0;
    this.searchValue = "";
    this.categoryId = "";
    this.decks = [];
    this.categories = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.searchValue = this.route.snapshot.queryParamMap.get("searchValue");
    this.categoryId = this.route.snapshot.queryParamMap.get("categoryId") || "";
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInDecks();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDeck) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInDecks() {
    this.eventSubscriber = this.eventManager.subscribe('deckListModification', response => this.reset());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected resetDecks(data: IDeck[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.decks.splice(0, this.decks.length);
    for (let i = 0; i < data.length; i++) {
      this.decks.push(data[i]);
    }
  }

  protected addDecks(data: IDeck[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.decks.push(data[i]);
    }
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  onSearchChange() {
    this.updateLocationUrl();
    this.reloadAll();
  }

  getSearchRequest() {
    if (this.searchValue || this.categoryId) {
      if (this.searchValue && this.categoryId) {
        return "(title=='*" + this.searchValue + "*',description=='*" + this.searchValue + "*');category.id==" + this.categoryId;
      }
      if (this.searchValue) {
        return "title=='*" + this.searchValue + "*',description=='*" + this.searchValue + "*'";
      } else {
        return "category.id==" + this.categoryId;
      }
    } else {
      return "";
    }
  }

  updateLocationUrl() {
    if (this.searchValue || this.categoryId) {
      if (this.searchValue && this.categoryId) {
        this.location.go("/deck", "searchValue=" + this.searchValue + "&categoryId=" + this.categoryId);
        return;
      }
      if (this.searchValue) {
        this.location.go("/deck", "searchValue=" + this.searchValue);
      } else {
        this.location.go("/deck", "categoryId=" + this.categoryId);
      }
    } else {
      this.location.go("/deck");
    }
  }
}
