import { Component, Renderer2, ElementRef, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { Router ,NavigationEnd} from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { ViewportScroller } from '@angular/common'; // <-- Import this

@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.css'] // Note the plural 'styleUrls'
})
export class SolutionsComponent implements AfterViewInit {
  showForm: boolean = false;

  constructor(
    private _router: Router,
    private renderer: Renderer2,
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) { }


  link(myroute: string) {
    console.log(myroute);
    this._router.navigate([myroute]);
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
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.viewportScroller.scrollToPosition([0, 0]); // Scrolls to the top of the page
        }
      });
      

      // Adding event listeners for card click to toggle popup
      
  }
}
}

