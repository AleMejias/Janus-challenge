import { Component, OnInit , Output , EventEmitter  } from '@angular/core';
import { FormBuilder , Validators } from '@angular/forms';
import { CustomFormsValidations } from 'src/productos/helpers/custom-formvalidators';
import { Producto } from 'src/productos/models/producto';
import { HandleFormValuesService } from 'src/productos/services/handle-form-values.service';

@Component({
  selector: 'app-form-productos',
  templateUrl: './form-productos.component.html',
  styleUrls: ['./form-productos.component.scss']
})
export class FormProductosComponent implements OnInit {

  /**
   * Custom evento para avisarle al componente padre que tiene que hacer la peticion con los datos que le estoy enviando
   */
  @Output() addProductoEvent = new EventEmitter<Producto>();
  @Output() updateProductoEvent = new EventEmitter<Producto>();

  /**
   * Hago referencia a los valores del producto que se selecciono para mantener sus id`s respectivos
   */
  productoSeleccionado!: Producto;
  seleccionado: boolean = false;

  formProductos;
  constructor(
    private formBuilder: FormBuilder,
    private productoSeleccionadoService: HandleFormValuesService
  )
  {

    this.formProductos = this.formBuilder.group({
      nombre: [ '' , [ CustomFormsValidations.allowOnlyLetters , CustomFormsValidations.validateLength ] ],
      cantidad: [  ''  , Validators.required  ],
      descripcion:[  ''  ,[ CustomFormsValidations.validateCharacters , CustomFormsValidations.validateLength ] ],
      precio:[  ''   ,  Validators.required  ],
      activo: [  ''  , Validators.required  ]
    });

  }

  ngOnInit(): void {


    this.productoSeleccionadoService.getProductoSeleccionado$().subscribe({
      next: ( producto ) => {

        if( producto.modificado ) {

          this.seleccionado = true;
          this.productoSeleccionado = producto;
          this.formProductos.controls['nombre'].setValue(producto.nombre);
          this.formProductos.controls['descripcion'].setValue(producto.descripcion);
          this.formProductos.controls['precio'].setValue(`${producto.precio}`);
          this.formProductos.controls['cantidad'].setValue(`${producto.stock}`);
          this.formProductos.controls['activo'].setValue(producto.activo);

        }

      }
    })


  }

  get formControls() {
    return this.formProductos.controls;
  }

  OnSubmit(){
    if( this.seleccionado ) {

      const edit: Producto = {
        idProducto: this.productoSeleccionado.idProducto,
        idTipoProducto: this.productoSeleccionado.idTipoProducto,
        nombre: this.formControls.nombre?.value || "",
        descripcion: this.formControls?.descripcion.value || "",
        precio: Number(this.formControls?.precio.value) ,
        stock: Number(this.formControls?.cantidad.value),
        activo: this.formControls?.activo.value || ""
      }
      this.updateProductoEvent.emit( edit );

    } else  {
      const add: Producto = {
        nombre: this.formControls.nombre?.value || "",
        descripcion: this.formControls?.descripcion.value || "",
        precio: Number(this.formControls?.precio.value) ,
        stock: Number(this.formControls?.cantidad.value),
        activo: this.formControls?.activo.value || ""
      }

      this.addProductoEvent.emit( add );
    }
    this.seleccionado = false;
    this.formProductos.reset();
  }

}
