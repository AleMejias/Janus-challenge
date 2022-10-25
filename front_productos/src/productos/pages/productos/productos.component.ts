import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../models/producto';
import { HandleFormValuesService } from 'src/productos/services/handle-form-values.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  dataList: Producto[] = [];

  constructor(
    private productoSeleccionadoService: HandleFormValuesService,
    private productosService: ProductosService
  ) { }

  ngOnInit(): void {

    this.OnLoadProductos();

  }

  OnLoadProductos() {


    this.productosService.getProductos().subscribe({
      next: ( productos ) => {

        this.dataList = productos;
      },
      error : (e) => {

        alert('No se pudo recuperar los productos')
      }
    })

  }
  OnProductoSeleccionado(producto: Producto){

    let prod = producto;

    prod.modificado = true;
    this.productoSeleccionadoService.updateProductoSeleccionado$(prod);

  }

  OnEliminarProducto(producto: any) {


    this.productosService.deleteProducto(producto.idProducto).subscribe({
      next: ( response ) => {

        if( response ) {

          alert(`Eliminamos tu producto exitosamente`);
          this.dataList = [];
          this.OnLoadProductos();

        } else {


          alert(`No pudimos eliminar tu producto, intente mas tarde`);
        }


      },
      error: (e) => {

        alert(`No pudimos eliminar tu producto, intente mas tarde`);

      }
    });
  }

  addProducto( producto: any ) {

    this.productosService.addProducto(producto).subscribe({
      next: ( response ) => {

        if( response ) {

          alert(`Incorporación de ${producto.nombre} exitosa`);
          this.dataList = [];
          this.OnLoadProductos();
          this.productoSeleccionadoService.resetproductoSeleccionado$();

        } else {


          alert(`No pudimos agregar tu ${producto.nombre}, intente mas tarde`);
        }


      },
      error: (e) => {

        alert(`No pudimos agregar tu ${producto.nombre}, intente mas tarde`);

      }
    });

  }

  updateProducto( producto: any ) {


    this.productosService.updateProducto( producto.idProducto , producto).subscribe({
      next: ( response ) => {

        if( response ) {

          alert(`Modificamos tu ${producto.nombre} exitosamente`);
          this.dataList = [];
          this.OnLoadProductos();
          this.productoSeleccionadoService.resetproductoSeleccionado$();

        } else {


          alert(`No pudimos modificar tu ${producto.nombre}, intente mas tarde`);
        }


      },
      error: (e) => {

        alert(`No pudimos modificar tu ${producto.nombre}, intente mas tarde`);

      }
    });

  }

}
