import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './layouts/main/main.component';
import { CmsComponent } from './modules/cms/cms.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './modules/login/login.component';
import { ManageUserComponent } from './modules/manage-user/manage-user.component';

const routes: Routes = [{
  path:'',component:LoginComponent},{
  path:'admin',component:MainComponent,children:[{
  path:'dashboard',component:DashboardComponent},{
  path:'users',component:ManageUserComponent},{
    path:'cms',component:CmsComponent},
]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
