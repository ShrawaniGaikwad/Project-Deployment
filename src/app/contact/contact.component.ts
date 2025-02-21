import { Component, ElementRef, OnInit,Renderer2,Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {} from 'googlemaps';
import { ViewChild } from '@angular/core';
import { MyserviceService } from '../myservice.service';
import { Title,Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  help!: FormGroup;
  loading: boolean = false;
  helpArray:any[]=[];
  siteKey: string = '';  
  captchaResponse: string | null = null;


  constructor(private formbuilder: FormBuilder,private _http:HttpClient,private _myservice:MyserviceService,private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object,private titleService: Title, private metaService: Meta){}
 onCaptchaResolved(response: string | null): void {
    this.captchaResponse = response;  
    this.help.patchValue({ recaptcha: response });
  }
  ngOnInit(): void {
    this.siteKey='6LeYlmgqAAAAAAG7pUPuacKScmfEUm5ukfXJrwKo';

    this.help = this.formbuilder.group({
      Name:['',[Validators.required,Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)*$')]],
      Phone:['',[Validators.required,Validators.pattern('[0-9]*'),Validators.maxLength(10),Validators.minLength(10)]],
      Email:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      Subject:['',[Validators.required]],
      Query:['',[Validators.required,Validators.minLength(5)]],
      recaptcha: ['', [Validators.required,]]
    });

    this.titleService.setTitle('VPTronics - Leading UPS Solutions | VP UPS Power Backup');

    // Set Meta Description
    this.metaService.updateTag({
      name: 'description',
      content: 'VPTronics is a trusted provider of VP UPS systems, delivering reliable and efficient power backup solutions for homes, businesses, and industries.'
    });
    }

    myhelp() {
      this.loading = true;
  
      if (this.help.valid) {
        const formData = this.help.value;
        this._myservice.getContact(formData).subscribe(
          res => {
            this.loading = false;
            console.log(this.help.value);
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
  
  

 