import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const alphaNames: ValidatorFn =
    (control: AbstractControl): ValidationErrors | null => {
        let nameVal: string = control.value;
        let validError = { 'alphaNames': { 'value': nameVal } }
        if (nameVal.trim() == "") return null;
        return isNaN(Number(nameVal)) ? null : validError;
    }


export const onlyDigits: ValidatorFn =
    (control: AbstractControl): ValidationErrors | null => {
        let ssnVal: string = control.value;
        let validError = { 'onlyDigits': { 'value': ssnVal } }
        return !isNaN(Number(ssnVal)) ? null : validError;
    }