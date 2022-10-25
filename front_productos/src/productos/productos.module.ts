import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { ProductosComponent } from './pages/productos/productos.component';
import { HeaderComponent } from './components/header/header.component';
import { FormProductosComponent } from './components/form-productos/form-productos.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { TablaProductosComponent } from './components/tabla-productos/tabla-productos.component';



@NgModule({
  declarations: [
    ProductosComponent,
    HeaderComponent,
    FormProductosComponent,
    TablaProductosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ],
  exports: [
    ProductosComponent,
    HeaderComponent,
    FormProductosComponent
  ]
})
export class ProductosModule { }
