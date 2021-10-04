import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { AppService } from '../../../../app.service';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './registration-page.html',
  styleUrls: ['./registration-page.scss'],
})

export class RegistrationPage {
  path = ROUTER_UTILS.config;
  root: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private appService: AppService
  ) {
    this.root = `/${ROUTER_UTILS.config.base.home}`;
  }

  onCreateAccount(firstName: String, surname: String, userName: String,
    email: String, password: String): void {

    this.appService.registerUser(firstName, surname, userName, email, password);
    this.router.navigate([this.root]);
  }

  onGoBack(): void {
    console.log('have your way');
    // this.appService.getUsers();
  }
}
