import { Component,Renderer2,ElementRef,PLATFORM_ID ,Inject,AfterViewInit} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  menuOpen = false;
  showTable1: boolean = false;
  showOnlyTable: boolean = false;
  showTable2: boolean = false;
  showTable3: boolean = false;
  showTable4: boolean = false;
  showTable5: boolean = false;
  showTable6: boolean = false;
  showTable7: boolean = false;

  toggleTable(i : number) {
    if(i == 1)
    {
      this.showTable1 = !this.showTable1;
      this.showOnlyTable = !this.showOnlyTable;
    }
     if(i == 2)
    {
      this.showTable2 = !this.showTable2;
      this.showOnlyTable = !this.showOnlyTable;
    }
    if(i == 3)
      {
        this.showTable3 = !this.showTable3;
        this.showOnlyTable = !this.showOnlyTable;
      }
    if(i == 4)
      {
        this.showTable4 = !this.showTable4;
        this.showOnlyTable = !this.showOnlyTable;
      }
    if(i == 5)
      {
        this.showTable5 = !this.showTable5;
        this.showOnlyTable = !this.showOnlyTable;
      }
    if(i == 6)
      {
        this.showTable6 = !this.showTable6;
        this.showOnlyTable = !this.showOnlyTable;
      }
    if(i == 7)
      {
        this.showTable7 = !this.showTable7;
        this.showOnlyTable = !this.showOnlyTable;
      }
}
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  constructor( private renderer: Renderer2, private el: ElementRef,@Inject(PLATFORM_ID) private platformId: Object ){}
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
  }
}
