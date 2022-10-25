using backend_productos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace backend_productos.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "GET, POST, PUT, DELETE, OPTIONS")]
    public class ProductoController : ApiController
    {
        // GET: api/Producto
        public IEnumerable<Producto> Get()
        {

            ManejadorDeProductos manejadorProductos = new ManejadorDeProductos();

            return manejadorProductos.getTodos();
        }

        // GET: api/Producto/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Producto
        public bool Post([FromBody] Producto producto)
        {
            ManejadorDeProductos manejadorProductos = new ManejadorDeProductos();
            bool response = manejadorProductos.addProducto(producto);

            return response;

        }

        // PUT: api/Producto/5
        public bool Put(int id, [FromBody]Producto producto)
        {
            ManejadorDeProductos manejadorProductos = new ManejadorDeProductos();
            bool response = manejadorProductos.updateProducto(id , producto);

            return response;
        }

        // DELETE: api/Producto/5
        public bool Delete(int id)
        {
            ManejadorDeProductos manejadorProductos = new ManejadorDeProductos();
            bool response = manejadorProductos.deleteProducto(id);

            return response;
        }
    }
}
