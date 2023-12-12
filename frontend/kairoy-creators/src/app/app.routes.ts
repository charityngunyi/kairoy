import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './profile/profile.component';
import { userrouteGuard } from './guards/userroute.guard';
export const routes: Routes = [
	{ path: '', redirectTo: 'user', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
  	// login link
  	{ path: 'user', component: UserComponent, canActivate: [userrouteGuard] },
  	// Signup link
  	// Profile link
  	{ path: 'profile', component: ProfileComponent },
  	// logout
	];
