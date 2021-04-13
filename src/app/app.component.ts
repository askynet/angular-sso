import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, MicrosoftLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  user: SocialUser | undefined;
  loggedIn!: boolean;
  GoogleLoginProvider = GoogleLoginProvider;
  constructor(private authService: SocialAuthService, private route: ActivatedRoute) {
   }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      console.log('user', user);
      console.log(user.authToken);
      this.user = user;
      this.loggedIn = (user != null);
    });
    this.route.queryParams.subscribe(params => {
      console.log(params);
  });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signInWithMicrosoft(): void {
    this.authService.signIn(MicrosoftLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  refreshGoogleToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }
}
