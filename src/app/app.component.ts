import { Component, OnInit } from "@angular/core";
import { UserService } from "./services/user-service/user.service";
import { Router } from "@angular/router";
import { BookService } from "./services/book-service/book.service";
import { Item } from "./models/book";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "E-books";
  user: string;

  constructor(
    private userService: UserService,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.getUser();
    this.userService.user$.subscribe(user => {
      this.user = user;
    });
    !this.user;
    // ? this.router.navigateByUrl("/search")
    this.router.navigateByUrl("");
  }
}
