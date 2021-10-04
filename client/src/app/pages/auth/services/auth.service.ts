import { Injectable } from '@angular/core';
import { getItem, removeItem, setItem, StorageItem } from '@app/@core/utils';
import { BehaviorSubject } from 'rxjs';
import { AppService } from '@app/app.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn$ = new BehaviorSubject<boolean>(!!getItem(StorageItem.Auth));

  constructor(
   
  ) {
  }

  get isLoggedIn(): boolean {
    return this.isLoggedIn$.getValue();
  }

  signIn(): void {
    const token = Array(4)
      .fill(0)
      .map(() => Math.random() * 99)
      .join('-');

    setItem(StorageItem.Auth, token);
    this.isLoggedIn$.next(true);
  }

  signOut(): void {
    removeItem(StorageItem.Auth);
  //  this.endSession();
    this.isLoggedIn$.next(false);
  }

  endSession() {
    localStorage.removeItem('user_token');
    localStorage.removeItem("token_expiry");
  }
}
