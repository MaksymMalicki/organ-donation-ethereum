import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../../modules/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class isProcurementOrganiser implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

    return this.authService.isUserOrganProcurementOrganiser().then(
      (isOrganProcurementOrganiser: boolean) => {
        if (isOrganProcurementOrganiser) {
          return true;
        } else {
          return this.router.navigate(['/login']);
        }
      }
    );
  }
}
