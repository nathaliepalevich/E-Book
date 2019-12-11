import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";

import { Subject } from "rxjs";
import { debounceTime, switchMap, map } from "rxjs/operators";

import { BookService } from "../../services/book-service/book.service";
import { UserService } from "../../services/user-service/user.service";
import { Item } from "../../models/book";

@Component({
  selector: "search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit, OnDestroy {
  books: Item[] = [];
  user: string;
  isLoading: boolean = true;
  results$: Subject<any> = new Subject<any>();

  val;
  p: number = 1;
  isNoRes: boolean = false;
  constructor(
    private bookService: BookService,
    private userService: UserService,
    private router: Router
  ) {}

  searchBooks(value) {
    this.val = value;
    this.isLoading = true;
    this.bookService
      .getbooks(value)
      .pipe(map(res => res.items))
      .subscribe(books => {
        this.isLoading = false;
        this.books = books;
      });
  }

  flipPage(pageNum) {
    this.bookService.flipPage(pageNum);
    this.searchBooks(this.val);
  }

  ngOnInit() {
    this.userService.user$.subscribe(user => {
      this.user = user;
    });
    if (!this.user) {
      this.router.navigateByUrl("/");
      return;
    }
    this.searchBooks("");

    this.results$
      .pipe(
        debounceTime(1000),
        map(keyboardEvent => {
          this.val = keyboardEvent.target.value;
          this.p = 1;
          return keyboardEvent.target.value;
        }),
        switchMap(searchTerm => this.bookService.getbooks(searchTerm))
      )
      .subscribe(results => {
        this.books = results.items;
        if (!this.books) this.isNoRes = true;
        else this.isNoRes = false;
      });
  }

  ngOnDestroy() {
    this.results$.complete();
    this.results$.unsubscribe();
  }
}
