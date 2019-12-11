import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";
import { Book, Item } from "src/app/models/book";
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
  constructor(private bookService: BookService) {}

  addToWishlist() {
    this.bookService.addBook(this.book);
    this.toggleModalClicked();
  }
  removeFromWishlist() {
    this.bookService.removeBook(this.book);
    this.toggleModalClicked();
  }

  toggleModalClicked() {
    this.toggleModal.emit();
  }

  ngOnInit() {
    this.wishlistSubscription = this.bookService.wishListBooks$.subscribe(
      wishListBooks => {
        this.wishListBooks = wishListBooks ? wishListBooks : [];
        const bookFromWL = this.wishListBooks.find(savedBook => {
          return savedBook.id === this.book.id;
        });
        this.existInWishlist = bookFromWL ? true : false;
      }
    );
  }

  ngOnDestroy() {
    // this.wishlistSubscription.unsubscribe();
  }
}
