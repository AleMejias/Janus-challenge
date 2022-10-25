export interface Producto {
  modificado?:      boolean;
  idProducto?:     number;
  idTipoProducto?: number;
  nombre:         string;
  descripcion:    string;
  precio:         number;
  activo:         string;
  stock:          number;
}
