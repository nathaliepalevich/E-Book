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

  constructor(
    private bookService: BookService,
    private userService: UserService,
    private router: Router
  ) {}

  searchBooks(value) {
    this.isLoading = true;
    this.bookService
      .getbooks(value)
      .pipe(map(res => res.items))
      .subscribe(books => {
        this.isLoading = false;
        this.books = books;
      });
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
        debounceTime(500),
        map(keyboardEvent => keyboardEvent.target.value),
        switchMap(searchTerm => this.bookService.getbooks(searchTerm))
      )
      .subscribe(results => {
        this.books = results.items;
        console.log("#####", this.books);
      });
  }

  ngOnDestroy() {
    // this.results$.complete();
    // this.results$.unsubscribe();
  }
}
