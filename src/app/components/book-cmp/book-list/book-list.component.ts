import { Component, OnInit, Input } from "@angular/core";
import { Book } from "src/app/models/book";

@Component({
  selector: "book-list",
  templateUrl: "./book-list.component.html",
  styleUrls: ["./book-list.component.scss"]
})
export class BookListComponent implements OnInit {
  @Input() books: Book[];
  p: number = 1;

  constructor() {}

  ngOnInit() {}
}
