import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ContactComponent } from './contact/contact.component';
import { HelpComponent } from './help/help.component';
import { SolutionsComponent } from './solutions/solutions.component';

const routes: Routes = [
  {
  path: '', redirectTo: 'home',pathMatch: 'full'
  },
  {
   path: 'home', component: HomeComponent 
  },
 {
   path: 'products', component: ProductComponent 
 }, 
 {
   path:'contact' , component: ContactComponent
 },
 {
  path:'help' , component:HelpComponent
},
{
  path:'solutions',component:SolutionsComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
