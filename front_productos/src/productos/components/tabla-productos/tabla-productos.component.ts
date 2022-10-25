import { Component, OnInit ,ViewChild , AfterViewInit , Input , Output , EventEmitter} from '@angular/core';

import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from 'src/productos/models/producto';


@Component({
  selector: 'app-tabla-productos',
  templateUrl: './tabla-productos.component.html',
  styleUrls: ['./tabla-productos.component.scss']
})
export class TablaProductosComponent implements OnInit , AfterViewInit{

  data= new MatTableDataSource<Producto>()
  @Input() dataList: Producto[]= [];
  @Output() productoSeleccionadoEvent: EventEmitter<Producto>= new EventEmitter;
  @Output() eliminarProductoEvent: EventEmitter<Producto>= new EventEmitter;

  /**
   * Permiter setear una columna en la tabla que muestra el listado de transacciones
   */
  displayedColumns: string[] = ['nombre','precio','descripcion','stock' , 'eliminar','modificar'];

  /**
   * Hace referencia a la funcionalidad de ordenamiento que proporciona Angular Material
   */
  @ViewChild(MatSort) sort!: MatSort;


  constructor() { }

  ngOnInit(): void {
    this.data= new MatTableDataSource( this.dataList );
  }

  ngAfterViewInit() {
    this.data.sort = this.sort;
  }

  private compare(a: any, b:any, isAsc: any) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  onSortData(sort: Sort) {

    let data = this.dataList.slice();
    if (sort.active && sort.direction !== '') {
        data = data.sort((a: any, b: any) => {
            const isAsc = sort.direction === 'asc';
            switch (sort.active) {
                case 'nombre': return this.compare(a.nombre, b.nombre, isAsc);
                case 'precio': return this.compare(a.precio, b.precio, isAsc);
                case 'stock': return this.compare(a.stock, b.stock, isAsc);
                default: return 0;
            }
        });
    }
    this.data= new MatTableDataSource( data )
  }

  deleteProducto(producto: Producto ){

    this.eliminarProductoEvent.emit(producto);
  }

  updateProducto( producto: Producto ) {

    this.productoSeleccionadoEvent.emit( producto )

  }
}
