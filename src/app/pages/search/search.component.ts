import { Component, OnInit, OnDestroy } from "@angular/core";
import { BookService } from "../../services/book-service/book.service";
import { Book, Item } from "src/app/models/book";
import { UserService } from "../../services/user-service/user.service";
import { Router } from "@angular/router";

import { fromEvent, Subject } from "rxjs";
import { debounceTime, switchMap, map } from "rxjs/operators";

@Component({
  selector: "ebooks-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit, OnDestroy {
  books: Item[] = [];
  user: string;
  isLoading: boolean = true;
  toDestroy;
  results$: Subject<any> = new Subject<any>();

  constructor(
    private bookService: BookService,
    private userService: UserService,
    private router: Router
  ) {}

  searchBooks(value) {
    this.isLoading = true;
    this.bookService.getbooks(value).subscribe(books => {
      this.isLoading = false;
      this.books = books.items;
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
      .subscribe((results: Book[]) => {
        this.books = results.items;
        console.log("#####", this.books);
      });
  }

  ngOnDestroy() {
    // this.results$.complete();
    // this.results$.unsubscribe();
  }
}
