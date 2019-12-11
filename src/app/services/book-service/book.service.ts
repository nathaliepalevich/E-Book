import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";

import { Book, Item } from "../../models/book";
import { UtilService } from "../util-service/util.service";

@Injectable({
  providedIn: "root"
})
export class BookService {
  private bookUrl = "https://www.googleapis.com/books/v1/volumes?q=";
  wishlist_key: string = "USER_WISHLIST";
  currSearchRes_key: string = "Curr_Search_Res";
  wishListBooks$ = new BehaviorSubject<Item[]>([]);
  wishlistBooks: Item[];
  constructor(private http: HttpClient, private utilService: UtilService) {}

  getbooks(serchTerm = ""): Observable<Book[]> {
    return this.http.get<Book[]>(
      `${this.bookUrl}${serchTerm}''&startIndex=0&maxResults=20&langRestrict=en`
    );
  }
  getWishListBooks() {
    this.wishlistBooks =
      this.utilService.getFromStorage(this.wishlist_key) || [];
    this.wishListBooks$.next(this.wishlistBooks);
  }

  addBook(chosenBook) {
    this.getWishListBooks();
    this.wishlistBooks.unshift(chosenBook);
    this.utilService.saveToStorage(this.wishlist_key, this.wishlistBooks);
    this.wishListBooks$.next(this.wishlistBooks);
  }

  removeBook(chosenBook) {
    this.getWishListBooks();
    const bookIdx = this.wishlistBooks.findIndex(
      book => book.id === chosenBook.id
    );
    this.wishlistBooks.splice(bookIdx, 1);
    this.utilService.saveToStorage(this.wishlist_key, this.wishlistBooks);
    this.wishListBooks$.next(this.wishlistBooks);
  }
}
