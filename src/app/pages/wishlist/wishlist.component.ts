import { Component, OnInit, OnDestroy } from "@angular/core";
import { Book, Item } from "src/app/models/book";
import { UserService } from "src/app/services/user-service/user.service";
import { BookService } from "src/app/services/book-service/book.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "ebooks-wishlist",
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
    this.bookService.getWishListBooks();
    this.bookService.wishListBooks$.subscribe(wishListBooks => {
      this.wishListBooks = wishListBooks;
      console.log(this.wishListBooks);
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
