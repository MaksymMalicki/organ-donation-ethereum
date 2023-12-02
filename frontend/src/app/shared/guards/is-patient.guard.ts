import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../../modules/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class IsPatientGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    return this.authService.isUserPatient().then(
      (isPatient: boolean) => {
        if(isPatient) {
          return true;
        } else {
          this.router.navigate(['/login']);
        }
      }
    );
  }
}
