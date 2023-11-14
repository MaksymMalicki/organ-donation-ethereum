import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import {AuthService} from "../../modules/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class IsDonorGuard implements CanActivate {
  constructor(
    private authService: AuthService
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    return this.authService.isUserDonor();
  }

}
