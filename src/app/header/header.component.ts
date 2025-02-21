import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuOpen = false;
  isSearchVisible = false;
  searchTerm = '';

  constructor(private router: Router) {}

    toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  // toggleSearch() {
  //   this.isSearchVisible = !this.isSearchVisible;
  // }

  // handleSearchChange(event: Event) {
  //   const inputElement = event.target as HTMLInputElement;
  //   this.searchTerm = inputElement.value;
  // }
  // private searchData: { [key: string]: string } = {
  //   'home': '/home',
  //   'products': '/products',
  //   'contact': '/contact',
  //   'help': '/help',
  //   'solutions': '/solutions',
  // };
  // search() {
  //   if (this.searchTerm) {
  //     const route = this.searchData[this.searchTerm];
  //     if (route) {
  //       this.router.navigate([route]);
  //     } else {
  //       alert('No results found for "' + this.searchTerm + '"');
  //     }
  //   }
  // }
}
