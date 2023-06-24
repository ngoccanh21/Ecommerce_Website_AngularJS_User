import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { LoginService } from 'src/app/service/login.service';
import { user } from './login.model';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin!: boolean;
  message:any;
  form!: FormGroup;
  responsedata:any;
  UserObj:user = new user();

  constructor(private router: Router,private api:LoginService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      tk: ['', [Validators.required,  Validators.minLength(5), Validators.maxLength(100)]],
      pass: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
    })
    
  }
  login() {
    this.UserObj.tk = this.form.value.tk;
    this.UserObj.pass = this.form.value.pass;
    this.api.login(this.UserObj)
      .subscribe(res => {
        this.responsedata = res;
        if (res.message == "dang nhap thanh cong !!!") {
          // localStorage.setItem("name",res.user.tenUser);
          localStorage.setItem("token", this.responsedata.jwtToken);
          // localStorage.setItem('khachhang', JSON.stringify(this.responsedata.khachhang));
          console.log(this.responsedata);
          this.router.navigate(['/home'])
        }
        else {
          alert(res.message)
        }
      }
      )
  }
    

}
