import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { MainComponent } from './main.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import { LoginComponent } from 'src/app/modules/login/login.component';
import { ManageUserComponent } from 'src/app/modules/manage-user/manage-user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CmsComponent } from 'src/app/modules/cms/cms.component';
import { ToastrModule } from 'ngx-toastr';





@NgModule({
  declarations: [
  MainComponent,
  DashboardComponent,
  LoginComponent,
  ManageUserComponent,
  CmsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
    HttpClientModule,
    ToastrModule.forRoot()
    


    
    
  ]
})
export class MainModule { }
