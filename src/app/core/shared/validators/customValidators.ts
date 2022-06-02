
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
export namespace CustomValidators {
    export function equalLength(Length: number): ValidatorFn {
        return (control:AbstractControl) : ValidationErrors | null => {
            const value: any = control.value ?? "";
            if (!value) {
                return null;
            }
            const controlValid = (value as string).length != Length;
    
            return controlValid ? {equalLength:true}: null;
        }
    }
}
