import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { UtilService } from "../util-service/util.service";
@Injectable({
  providedIn: "root"
})
export class UserService implements OnInit {
  user$ = new BehaviorSubject<string>("");
  user_key: string = "USER_NAME";

  constructor(private utilService: UtilService) {}

  ngOnInit(): void {
    this.user$.subscribe(val => console.log(val));
  }

  getUser() {
    const user = this.utilService.getFromStorage(this.user_key);
    this.user$.next(user);
  }

  signup(key, userName) {
    this.utilService.saveToStorage(key, userName);
    this.user$.next(userName);
  }
  logOut() {
    this.user$.next("");
    localStorage.clear();
  }
}
