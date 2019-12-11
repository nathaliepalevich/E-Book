import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";
import { Book, Item } from "src/app/models/book";
import { UtilService } from "../../../services/util-service/util.service";
import { BookService } from "src/app/services/book-service/book.service";
import { Subscription } from "rxjs";
@Component({
  selector: "app-book-details",
  templateUrl: "./book-details.component.html",
  styleUrls: ["./book-details.component.scss"]
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  existInWishlist: boolean;
  wishListBooks: any; //: Item[];
  subscription;
  @Input() book: Item;
  @Input() isModalOpen: boolean;
  @Output() toggleModal: EventEmitter<null> = new EventEmitter<null>();

  wishlistSubscription: Subscription;
  constructor(
    private utilService: UtilService,
    private bookService: BookService
  ) {}

  addToWishlist() {
    this.bookService.addBook(this.book);
    // this.toggleModalClicked();
    this.toggleModal.emit();
  }
  removeFromWishlist() {
    this.bookService.removeBook(this.book);
    // this.toggleModalClicked();
    this.toggleModal.emit();
  }

  toggleModalClicked() {
    this.toggleModal.emit();
  }

  ngOnInit() {
    this.bookService.getWishListBooks();
    this.bookService.wishListBooks$.subscribe(wishListBooks => {
      this.wishListBooks = wishListBooks ? wishListBooks : [];
      const bookFromWL = this.wishListBooks.find(savedBook => {
        return savedBook.id === this.book.id;
      });
      this.existInWishlist = bookFromWL ? true : false;
    });
  }

  ngOnDestroy() {
    // this.wishlistSubscription.unsubscribe();
  }
}
