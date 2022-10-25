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

                while (Reader.Read())
                {
                    int id = Reader.GetInt32(0);
                    int idTipoProducto = Reader.GetInt32(1);
                    string nombre = Reader.GetString(2).Trim();
                    string descripcion = Reader.GetString(3).Trim();
                    int precio = Reader.GetInt32(4);
                    string activo = Reader.GetString(5).Trim();
                    int stock = Reader.GetInt32(6);

                    Producto producto = new Producto(id, idTipoProducto, nombre, descripcion, precio, activo,stock);

                    listaProductos.Add(producto);
                }

                Reader.Close();
                con.Close();
            }

            return listaProductos;
        }



        public bool addProducto( Producto producto ) 
        {
            bool response = false; 
            string url = ConfigurationManager.ConnectionStrings["Test"].ToString();

            using (SqlConnection con = new SqlConnection(url))
            {
                SqlCommand Command = con.CreateCommand();
                SqlDataAdapter adapter = new SqlDataAdapter(Command);
                Command.CommandText = "sp_InsertarProducto";
                Command.CommandType = CommandType.StoredProcedure;

                Command.Parameters.AddWithValue("@p_nombre", producto.nombre);
                Command.Parameters.AddWithValue("@p_descripcion", producto.descripcion);
                Command.Parameters.AddWithValue("@p_precio", producto.precio);
                Command.Parameters.AddWithValue("@p_activo", producto.activo);
                Command.Parameters.AddWithValue("@p_stock", producto.stock);

                try
                {
                    con.Open();
                    Command.ExecuteNonQuery();
                    response = true;
                }
                catch( Exception exception )
                {
                    Console.WriteLine(exception.Message);
                    response = false;
                    throw;
                }
                finally
                {
                    Command.Parameters.Clear();
                    con.Close();
                }

                return response;

            }
        }
        public bool updateProducto(int p_id , Producto producto)
        {
            bool response = false;
            string url = ConfigurationManager.ConnectionStrings["Test"].ToString();

            using (SqlConnection con = new SqlConnection(url))
            {
                SqlCommand Command = con.CreateCommand();
                SqlDataAdapter adapter = new SqlDataAdapter(Command);
                Command.CommandText = "sp_ModificarProducto";
                Command.CommandType = CommandType.StoredProcedure;

                Command.Parameters.AddWithValue("@p_id", p_id);
                Command.Parameters.AddWithValue("@p_idTipoProducto", producto.idTipoProducto);
                Command.Parameters.AddWithValue("@p_nombre", producto.nombre);
                Command.Parameters.AddWithValue("@p_descripcionProducto", producto.descripcion);
                Command.Parameters.AddWithValue("@p_precio", producto.precio);
                Command.Parameters.AddWithValue("@p_stock", producto.stock);
                Command.Parameters.AddWithValue("@p_activo", producto.activo);

                try
                {
                    con.Open();
                    Command.ExecuteNonQuery();
                    response = true;
                }
                catch (Exception exception)
                {
                    Console.WriteLine(exception.Message);
                    response = false;
                    throw;
                }
                finally
                {
                    Command.Parameters.Clear();
                    con.Close();
                }

                return response;

            }
        }
        public bool deleteProducto(int p_id)
        {
            bool response = false;
            string url = ConfigurationManager.ConnectionStrings["Test"].ToString();

            using (SqlConnection con = new SqlConnection(url))
            {
                SqlCommand Command = con.CreateCommand();
                SqlDataAdapter adapter = new SqlDataAdapter(Command);
                Command.CommandText = "sp_EliminarProducto";
                Command.CommandType = CommandType.StoredProcedure;

                Command.Parameters.AddWithValue("@p_id", p_id);

                try
                {
                    con.Open();
                    Command.ExecuteNonQuery();
                    response = true;
                }
                catch (Exception exception)
                {
                    Console.WriteLine(exception.Message);
                    response = false;
                    throw;
                }
                finally
                {
                    Command.Parameters.Clear();
                    con.Close();
                }

                return response;

            }
        }
    }
}