import { Component, Renderer2, ElementRef, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.css'] // Note the plural 'styleUrls'
})
export class SolutionsComponent implements AfterViewInit {
  showForm: boolean = false;
  menuOpen = false;

  constructor(
    private _router: Router,
    private renderer: Renderer2,
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

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

      // Adding event listeners for card click to toggle popup
      const cards = this.el.nativeElement.querySelectorAll('.card4');
      cards.forEach((card: any) => {
        this.renderer.listen(card, 'click', () => {
          this.togglePopup(card);
        });
      });
    }
  }

  togglePopup(card: any) {
    const popup = card.querySelector('.popuptext');
    if (popup.classList.contains('show')) {
      // popup.classList.remove('show');
    } else {
      popup.classList.add('show');
    }
  }
  closePopup(event: Event) {
    console.log("Inside closePopup");
    event.stopPropagation(); // Prevent the click from propagating to the card
    const target = event.target as HTMLElement;
    const popup = target.closest('.popuptext');
    if (popup) {
      popup.classList.remove('show');
    }
  }
}
