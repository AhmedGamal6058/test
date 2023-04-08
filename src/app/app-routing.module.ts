import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NahidhActionComponent } from './home/nahidh-action/nahidh-action.component';
import { EfficiencyComponent } from './home/efficiency/efficiency.component';
import { OnlineSiteRequestsComponent } from './home/online-site-requests/online-site-requests.component';
import { FinancialClaimsComponent } from './home/financial-claims/financial-claims.component';
import { ResultsComponent } from './home/results/results.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'home/action', component: NahidhActionComponent },
  { path: 'home/efficiency', component: EfficiencyComponent },
  { path: 'home/online-site-requests', component: OnlineSiteRequestsComponent },
  { path: 'home/financial-claims', component: FinancialClaimsComponent },
  { path: 'home/results', component: ResultsComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
