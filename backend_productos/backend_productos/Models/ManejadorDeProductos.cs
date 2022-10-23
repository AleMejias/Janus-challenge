using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace backend_productos.Models
{
    public class ManejadorDeProductos
    {
        public List<Producto> getTodos()
        {
            List<Producto> listaProductos = new List<Producto>();
            string url = ConfigurationManager.ConnectionStrings["Test"].ToString();

            using (SqlConnection con = new SqlConnection(url))
            {
                con.Open();

                SqlCommand Command = con.CreateCommand();
                Command.CommandText = "sp_ObtenerProductos";
                Command.CommandType = CommandType.StoredProcedure;

                SqlDataReader Reader = Command.ExecuteReader();

                while( Reader.Read() )
                {
                    int id = Reader.GetInt32(0);
                    int idTipoProducto = Reader.GetInt32(1);
                    string nombre = Reader.GetString(2).Trim();
                    int precio = Reader.GetInt32(3);
                    int activo = Reader.GetInt32(4);
                    int stock = Reader.GetInt32(5);


                    Producto producto = new Producto( id , idTipoProducto , nombre , precio , activo , stock );

                    listaProductos.Add(producto);
                }

                Reader.Close();
                con.Close();
            }

            return listaProductos;
        }
    }
}