import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { AuthService } from '../../services/auth.service';
import { AppService } from '../../../../app.service';
import { RoleGuard } from '@app/@core/guards';

@Component({
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})

export class SignInPage {
  returnUrl: string;
  imgPath: string;
  forgotPassword: string;
  home: string;
  createAccount: string;
  path = ROUTER_UTILS.config;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private appService: AppService,
    private roleGuard: RoleGuard

  ) {
    this.imgPath = "../../../../../assets/img/account.png";
    this.returnUrl =
      this.activatedRoute.snapshot.queryParamMap.get('returnUrl') ||
      `/${ROUTER_UTILS.config.base.home}`;

    this.home = `/${ROUTER_UTILS.config.base.home}`;
    this.forgotPassword = `/${ROUTER_UTILS.config.auth.forgotPassword}`;
    this.createAccount = `/${ROUTER_UTILS.config.auth.registration}`;
  }

  onClickSignIn(email: string, password: string): void {
    this.appService.authenticateUser(email, password);
  
  }

  onForgotPassword(): void {
    console.log('push back');
    this.authService.signIn();
  }

  onCreateAccount(): void {
    //this.router.navigate([this.createAccount]);
  }

  ngOnInit() {



  }

}
