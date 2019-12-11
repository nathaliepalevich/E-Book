import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";

import { Item } from "../../models/book";
import { UserService } from "../../services/user-service/user.service";
import { BookService } from "../../services/book-service/book.service";

@Component({
  selector: "wishlist",
  templateUrl: "./wishlist.component.html",
  styleUrls: ["./wishlist.component.scss"]
})
export class WishlistComponent implements OnInit, OnDestroy {
  books: Item[] = [];
  user: string;
  wishListBooks: Item[] = [];
  constructor(
    private bookService: BookService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.bookService.wishListBooks$.subscribe(wishListBooks => {
      this.wishListBooks = wishListBooks;
    });
    this.userService.user$.subscribe(user => {
      this.user = user;
    });
    if (!this.user) {
      this.router.navigateByUrl("/");
      return;
    }
  }
  ngOnDestroy() {}
}
