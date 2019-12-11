import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user-service/user.service";

@Component({
  selector: "ebooks-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"]
})
export class NavigationComponent implements OnInit {
  constructor(private userService: UserService) {}
  user: string;

  logout() {
    this.userService.logOut();
  }
  ngOnInit() {
    this.userService.user$.subscribe(user => {
      this.user = user;
    });
  }
}
