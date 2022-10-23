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
        public int precio { get; set; }
        public int activo  { get; set; }
        public int stock { get; set; }


        public Producto()
        {

        }
        public Producto( int id , int idTipoProducto , string nombre , int precio , int activo , int stock )
        {

        }
    }
}