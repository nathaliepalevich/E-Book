import { Component, OnInit, Input } from "@angular/core";
import { UserService } from "../../services/user-service/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "ebooks-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  user_key: string = "USER_NAME";
  user: string;
  constructor(private userService: UserService, private router: Router) {}

  signup(userName) {
    this.userService.signup(this.user_key, userName);
    this.router.navigateByUrl(`/search`);
  }
  ngOnInit() {
    this.userService.user$.subscribe(user => {
      this.user = user;
    });
    if (this.user) this.router.navigateByUrl(`/search`);
  }
}
