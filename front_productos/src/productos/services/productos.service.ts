import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Producto } from 'src/productos/models/producto';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  url: string = "https://localhost:44378/api/Producto";

  constructor(
    private http: HttpClient
  ) { }

  getProductos():Observable<Producto[]> {

    return this.http.get<Producto[]>( this.url );
  }

  addProducto( producto: Producto ) :Observable<Producto> {

    return this.http.post<Producto>( this.url,producto )

  }

  updateProducto( idProducto: number , producto: Producto ): Observable<Producto> {

    return this.http.put<Producto>( `${this.url}/${idProducto}`,producto )
  }

  deleteProducto( idProducto: number ) {

    return this.http.delete<Producto>( `${this.url}/${idProducto}` )
  }
}
