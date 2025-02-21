import { Component,Renderer2,ElementRef,PLATFORM_ID ,Inject,AfterViewInit} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common'; // <-- Import this
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  productId: string = '';

  showTable1: boolean = false;
  showOnlyTable: boolean = false;
  showTable2: boolean = false;
  showTable3: boolean = false;
  showTable4: boolean = false;
  showTable5: boolean = false;
  showTable6: boolean = false;
  showTable7: boolean = false;
  constructor( private renderer: Renderer2,  
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object, 
    private router: Router,    
    private viewportScroller: ViewportScroller,
    private route: ActivatedRoute ){}

  toggleTable(i : number) {
    if(i == 1)
    {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      this.showTable1 = !this.showTable1;
      this.showOnlyTable = !this.showOnlyTable;
    }
     if(i == 2)
    {
      window.scrollTo({ top: 0, behavior: 'smooth' });

      this.showTable2 = !this.showTable2;
      this.showOnlyTable = !this.showOnlyTable;
    }
    if(i == 4)
      {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        this.showTable4 = !this.showTable4;
        this.showOnlyTable = !this.showOnlyTable;
      }
    if(i == 5)
      {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        this.showTable5 = !this.showTable5;
        this.showOnlyTable = !this.showOnlyTable;
      }
    
}


goToProducts(i:number) {
  this.viewportScroller.scrollToPosition([0, 0]);

  this.toggleTable(i);
}
  displayContact() {
    alert("Contact Here for buying the product .\nContact details :  \nPhone No. 9028249904 \nEmail : vpups.pune@gmail.com")
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
      handleScrollAnimation();

     
    }

    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id') || ''; 
      this.loadProductDetails(this.productId); // Load product details based on ID
    });
  
  }

  loadProductDetails(id: string) {
    // Step 1: Implement logic to fetch product details based on the ID
    // Example: Simulate fetching data from a service (API call)
    console.log('Loading product ID:', id);

    // Simulate the product details being fetched with a delay
    setTimeout(() => {
        const productElement = document.getElementById(id);
        
        // Check if the element with the product ID exists on the page
        if (productElement) {
            // Step 2: Scroll to the product element with smooth behavior
            productElement.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.log('Product element not found with ID:', id);
        }
    }, 500); // Simulate a 500ms delay to mimic an API call delay
}

}
