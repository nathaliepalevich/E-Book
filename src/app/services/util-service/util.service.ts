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
    return JSON.parse(localStorage.getItem(key));
  }
}
