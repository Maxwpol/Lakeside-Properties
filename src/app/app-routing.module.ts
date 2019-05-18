import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Layouts/home/home.component';
import { PropertyComponent } from './Layouts/property/property.component';
import { TestComponent } from './Layouts/test/test.component';
import { AddPropertyComponent } from './Layouts/add-property/add-property.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'properties', component: PropertyComponent},
  {path: 'addproperty', component: AddPropertyComponent},
  {path: 'test', component: TestComponent},
  {path: '**', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
