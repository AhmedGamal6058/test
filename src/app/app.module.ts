import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NahidhActionComponent } from './home/nahidh-action/nahidh-action.component';
import { EfficiencyComponent } from './home/efficiency/efficiency.component';
import { OnlineSiteRequestsComponent } from './home/online-site-requests/online-site-requests.component';
import { FinancialClaimsComponent } from './home/financial-claims/financial-claims.component';
import { ResultsComponent } from './home/results/results.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ConfigManagerService } from './services/config-manager.service';
import { RequestInterceptor } from './interceptor/request.interceptor';
import { ErrorHandlingInterceptor } from './interceptor/error-handling.interceptor';

export const configFactory = (configManager: ConfigManagerService) => {
  return () => configManager.loadConfig();
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    NahidhActionComponent,
    EfficiencyComponent,
    OnlineSiteRequestsComponent,
    FinancialClaimsComponent,
    ResultsComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
  ],
  providers: [
    HttpClientModule,
    {
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      deps: [ConfigManagerService],
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
