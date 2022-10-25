import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Producto } from 'src/productos/models/producto';


const initialValue: Producto = {
  modificado: false,
  idProducto: 0,
  idTipoProducto: 0,
  nombre: '',
  descripcion: '',
  precio: 0,
  stock: 0,
  activo: ''
}

@Injectable({
  providedIn: 'root'
})
export class HandleFormValuesService {

    /**
   * Observable utilizado para manejar si se pudo hacer correctamente una verificación
  */

  productoSeleccionado$ = new BehaviorSubject<Producto>( initialValue );


  constructor() { }


  /**
   *
   * @returns Devuelve el valor actual del observable para informar al componente formulario que valors debe autocompletar
   */

  getProductoSeleccionado$(): Observable<Producto> {

  return this.productoSeleccionado$.asObservable();

  }


  /**
   * Metodo utilizado para actualizar al observable que informa al componente formulario que se quiere modificar un producto
   * @param currentStatus => Producto que se desea modificar
   */
  updateProductoSeleccionado$( productoSeleccionado: Producto ) {

  this.productoSeleccionado$.next( productoSeleccionado );

  }

  /**
   * Metodo para volver a su estado inicial los valores del observable que contiene la información de un afiliado verificado
   */
  resetproductoSeleccionado$(  ) {

  this.productoSeleccionado$.next( initialValue );

  }


}
