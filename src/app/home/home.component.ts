import { Component ,AfterViewInit,Renderer2,ElementRef,Inject, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Router } from '@angular/router';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  constructor( private _router:Router,private renderer: Renderer2, private el: ElementRef,@Inject(PLATFORM_ID) private platformId: Object ){}
  navigation(str:any){
    console.log(str);
    this._router.navigate([str]);
   }
   images = ["/assets/bg3.jpg","/assets/bg3.jpg","/assets/bg3.jpg"];

   openEmail(email: string) {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = `mailto:${email}`;
    } else {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank');
    }
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const scrollElements = this.el.nativeElement.querySelectorAll('.scroll-animation');

      const elementInView = (el: any, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
          elementTop <=
          (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
      };

      const displayScrollElement = (element: any) => {
        this.renderer.addClass(element, 'animate');
      };

      const hideScrollElement = (element: any) => {
        this.renderer.removeClass(element, 'animate');
      };

      const handleScrollAnimation = () => {
        scrollElements.forEach((el: any) => {
          if (elementInView(el, 1.25)) {
            displayScrollElement(el);
          } else {
            hideScrollElement(el);
          }
        });
      };

      window.addEventListener('scroll', handleScrollAnimation);
      handleScrollAnimation(); // Trigger animation on load
    }

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

  

}


