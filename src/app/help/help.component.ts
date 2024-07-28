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
  menuOpen = false;
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  constructor(private formbuilder: FormBuilder,private _http:HttpClient,private _myservice:MyserviceService,private _router:Router,private renderer: Renderer2, @Inject(PLATFORM_ID) private platformId: Object ){}
  ngOnInit(): void 
  {
    this.help = this.formbuilder.group({
      Name:['',[Validators.required,Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)*$')]],
      Phone:['',[Validators.required,Validators.pattern('[0-9]*'),Validators.maxLength(10),Validators.minLength(10)]],
      Email:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      CompanyName:['',],
      Query:['',[Validators.required,Validators.minLength(5)]]
    });

    if (isPlatformBrowser(this.platformId)) {
      const script = this.renderer.createElement('script');
      script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js';
      script.onload = () => {
        (window as any).botpressWebChat.init({
          composerPlaceholder: "Chat with VPTronics Bot",
          botConversationDescription: "Welcome to the Bot",
          botId: '636a51aa-1eb4-4d20-8da6-6e0abafe2170',
          hostUrl: 'https://cdn.botpress.cloud/webchat/v1',
          messagingUrl: 'https://messaging.botpress.cloud',
          clientId: '636a51aa-1eb4-4d20-8da6-6e0abafe2170',
          webhookId: '84601cf8-9415-45a1-ac52-603c82a5db8a',
          lazySocket: true,
          themeName: "prism",
          botName: "VPTronics Bot",
          stylesheet: 'https://webchat-styler-css.botpress.app/prod/ce6b1978-1e2c-456f-bf32-7cb2069c226c/v36363/style.css',
          frontendVersion: "v1",
          useSessionStorage: true,
          theme: "prism",
          themeColor: "#2563eb",
          allowedOrigins: []
        });
      };
      this.renderer.appendChild(document.body, script);
    }
  }
  navigation(str:any){
    console.log(str);
    this._router.navigate([str]);
   }

  myhelp(){
    this.loading = true;
    console.log(this.help.value);
    this._myservice.getHelp(this.help.value).subscribe(res=>{
      this.loading = false;
    alert("Submitted successfully");
    this.help.reset();   },
  err =>{
    this.loading=false;
    alert("Unable to submit")
  })
  }

}
