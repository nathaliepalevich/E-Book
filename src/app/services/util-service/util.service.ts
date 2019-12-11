import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UtilService {
  constructor() {}

  saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getFromStorage(key) {
    const res = localStorage.getItem(key);
    const res1 = JSON.parse(res);
    return res1;
  }
}
