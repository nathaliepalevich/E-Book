import { Component, OnInit, Input } from "@angular/core";
import { Book } from "src/app/models/book";
import { Subject } from "rxjs";

@Component({
  selector: "book-preview",
  templateUrl: "./book-preview.component.html",
  styleUrls: ["./book-preview.component.scss"]
})
export class BookPreviewComponent implements OnInit {
  @Input() book: Book;
  isModalOpen: boolean = false;
  toggleModal$: Subject<boolean> = new Subject<boolean>();
  constructor() {}

  ngOnInit() {
    this.toggleModal$.subscribe(() => {
      this.isModalOpen = !this.isModalOpen;
    });
  }
}
