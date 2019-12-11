import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";

import { Book, Item } from "../../models/book";
import { UtilService } from "../util-service/util.service";

@Injectable({
  providedIn: "root"
})
export class BookService {
  startIndex$ = new BehaviorSubject<number>(0);

  wishlist_key: string = "USER_WISHLIST";
  currSearchRes_key: string = "Curr_Search_Res";
  wishListBooks$ = new BehaviorSubject<Item[]>([]);
  wishlistBooks: Item[];
  startIndex: number = 0;
  serchTerm: string;
  constructor(private http: HttpClient, private utilService: UtilService) {}

  flipPage(pageNum) {
    const page: object = { 1: 0, 2: 4, 3: 8, 4: 12, 5: 15 };
    for (const key in page) {
      if (pageNum === +key) {
        this.startIndex = page[key];
        break;
      }
    }
    this.startIndex$.next(pageNum);
  }

  getbooks(serchTerm = ""): Observable<any> {
    return this.http.get<any>(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${serchTerm}''&startIndex=${this.startIndex}&maxResults=4&projection=full&orderBy=newest`
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
