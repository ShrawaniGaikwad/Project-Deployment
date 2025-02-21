import { Component,Renderer2,PLATFORM_ID,Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  OnInit } from '@angular/core';
import { MyserviceService } from '../myservice.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrl: './help.component.css'
})
export class HelpComponent implements OnInit{
  help!: FormGroup;
  loading: boolean = false;
  helpArray:any[]=[];
  captchaResponse: string | null = null;
  siteKey: string = '';  

  
  constructor(
    private formbuilder: FormBuilder,
    private _http:HttpClient,
    private _myservice:MyserviceService,
    private _router:Router,
    private renderer: Renderer2,
     @Inject(PLATFORM_ID) private platformId: Object ){}
  ngOnInit(): void 
  {
    this.siteKey='6LeYlmgqAAAAAAG7pUPuacKScmfEUm5ukfXJrwKo';
    this.help = this.formbuilder.group({
      Name:['',[Validators.required,Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)*$')]],
      Phone:['',[Validators.required,Validators.pattern('[0-9]*'),Validators.maxLength(10),Validators.minLength(10)]],
      Email:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      CompanyName:['',],
      Query:['',[Validators.required,Validators.minLength(5)]],
      recaptcha: ['', [Validators.required,]]
    });
  }

  onCaptchaResolved(response: string | null): void {
    this.captchaResponse = response;  
    this.help.patchValue({ recaptcha: response });
  }
  navigation(str:any){
    console.log(str);
    this._router.navigate([str]);
   }

   myhelp() {
    this.loading = true;

    if (this.help.valid) {
      const formData = this.help.value;
      this._myservice.getHelp(formData).subscribe(
        res => {
          this.loading = false;
          alert('Submitted successfully');
          this.help.reset();
        },
        err => {
          this.loading = false;
          alert('Unable to submit');
        }
      );
    } else {
      alert('Please complete the reCAPTCHA');
      this.loading = false;
    }
  }

}
