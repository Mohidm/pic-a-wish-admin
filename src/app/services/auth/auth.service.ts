import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {User} from './auth.model'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private _loginUrl = "http://localhost:3000/admin/authenticate"
  private token:string;
  private tokenTimer:any
  constructor(private http: HttpClient, private route:Router) { }

  getToken(){
    return this.token
  }

  loginUser(email:string, password:string){
    const user: User={email:email, password:password}
    this.http.post<{token:string, expiry:number}>(this._loginUrl,user).subscribe(response=>{
      const token = response.token
      this.token = token
      if(this.token){
        const tokenExpiry=response.expiry
        this.tokenTimer= setTimeout(()=>{
           this.logoutUser()
         },tokenExpiry*1000)
        const now = new Date()
        const expirationDate= new Date(now.getTime() + tokenExpiry*1000) 
        this.saveAuthData(token,expirationDate)
        this.route.navigate(['admin/dashboard'])
 
        
      }
      
    },err=> console.log(err.error)
    )
      
    
  }
//
  logoutUser(){
    this.token=''
    clearTimeout(this.tokenTimer)
    this.clearAuthData()
    this.route.navigate(["/"])
  }
  private saveAuthData(token:string, expirationDate:Date){
   localStorage.setItem('token',token)
   localStorage.setItem('expiration',expirationDate.toISOString())
  }
  private clearAuthData(){
    localStorage.removeItem('token')
    localStorage.removeItem('expiration')
  }
}
