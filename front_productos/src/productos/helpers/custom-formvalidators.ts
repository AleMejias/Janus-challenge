import { AbstractControl, ValidationErrors } from '@angular/forms';


export class CustomFormsValidations {
  /**
   * Se encarga de validar que se introduzcan minimamente 3 caracteres en el campo input
   * @param control -> Control del formulario sobre el cúal se va a trabajar
   * @returns NULL = VALIDO | TRUE= INVALIDO
   */
  static validateLength( control: AbstractControl ): ValidationErrors | null {

    if( control.value === null ) { return null; }

      let current = control.value.length;
      if ( current > 2 ) {

        return null;
      } else {

        return { validatedLength: true }

      }

  }

  /**
   * Se encarga de permitir la entrada de los siguientes caracteres: A-Z , a-z , 0-9 , - , _ , /
   * Es utilizada para la validación de numeros de afiliado
   * @param control -> Control del formulario sobre el cúal se va a trabajar
   * @returns NULL = VALIDO | TRUE= INVALIDO
   */
  static validateCharacters( control: AbstractControl ): ValidationErrors | null {


    if( control.value === null ) { return null; }

    let isValid: boolean = false;
    for( let i of control.value ) {

      let character = i.charCodeAt(0);

      isValid = false;

      if( ( character > 47 && character < 58 ) ||
          ( character > 64 && character < 91 ) ||
          ( character == 45 || character == 47 || character == 95 )  ||
          ( character > 96 && character < 123) )
      {
        isValid = true;
      }

    }

    return isValid ? null : { validatedCharacter: true };
  }

  /**
   * Se encarga de validar que la entrada sean solo caracteres incluyendo Ñ y acentos
   * @param control -> Control del formulario sobre el cúal se va a trabajar
   * @returns NULL = VALIDO | TRUE= INVALIDO
   */
  static allowOnlyLetters( control: AbstractControl ): ValidationErrors | null {

    const regex = /^[0-9a-zA-ZÀ-ÿ\u00f1\u00d1\s+]+$/;

    return regex.test( control.value ) ? null : { allowOnlyLetters: true };

  }
}
