import { Component, OnInit, Input } from "@angular/core";
import { Item } from "../../../models/book";

@Component({
  selector: "book-list",
  templateUrl: "./book-list.component.html",
  styleUrls: ["./book-list.component.scss"]
})
export class BookListComponent implements OnInit {
  @Input() books: Item[];

  constructor() {}

  ngOnInit() {}
}
