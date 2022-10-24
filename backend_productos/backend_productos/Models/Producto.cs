using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace backend_productos.Models
{
    public class Producto
    {
        public int idProducto { get; set; }
        public int idTipoProducto { get; set; }
        public string nombre { get; set; }
        public string descripcion { get; set; }
        public int precio { get; set; }
        public string activo  { get; set; }
        public int stock { get; set; }


        public Producto()
        {

        }
        //Metodo de prueba para traer los datos
        public Producto(int p_id, int p_idTipoProducto, string p_nombre, int p_precio, string p_activo)
        {
            idProducto = p_id;
            idTipoProducto = p_idTipoProducto;
            nombre = p_nombre;
            precio = p_precio;
            activo = p_activo;
        }
        public Producto( int p_id, int p_idTipoProducto, string p_nombre, string p_descripcion , int p_precio, string p_activo, int p_stock)
        {
            idProducto = p_id;
            idTipoProducto = p_idTipoProducto;
            nombre = p_nombre;
            descripcion = p_descripcion;
            precio = p_precio;
            activo = p_activo;
            stock = p_stock;
        }

        public Producto(string p_nombre, string p_descripcion, int p_precio, int p_stock , string p_activo)
        {
            nombre = p_nombre;
            descripcion = p_descripcion;
            precio = p_precio;
            stock = p_stock;
            activo = p_activo;
        }
    }
}