import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})



export class ForgotPasswordPage {
  path = ROUTER_UTILS.config;



  
}
