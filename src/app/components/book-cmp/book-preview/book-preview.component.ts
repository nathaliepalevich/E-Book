import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Book } from "../../../models/book";
import { Subject, Observable, Subscription } from "rxjs";

@Component({
  selector: "book-preview",
  templateUrl: "./book-preview.component.html",
  styleUrls: ["./book-preview.component.scss"]
})
export class BookPreviewComponent implements OnInit, OnDestroy {
  @Input() book: Book;
  isModalOpen: boolean = false;
  toggleModal$: Subject<boolean> = new Subject<boolean>();
  stopSubscription: Subscription;
  constructor() {}

  ngOnInit() {
    this.stopSubscription = this.toggleModal$.subscribe(() => {
      this.isModalOpen = !this.isModalOpen;
    });
  }
  ngOnDestroy() {
    this.stopSubscription.unsubscribe();
  }
}
