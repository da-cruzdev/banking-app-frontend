import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/clients/store/client.selectors';

@Injectable({
  providedIn: 'root',
})
export class RedirectAuthGuard implements CanActivate {
  user!: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private readonly store: Store
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.isLoggedIn()
      ? this.router.navigate(['/dashboard'])
      : true;
  }
}
