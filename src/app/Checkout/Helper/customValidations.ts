import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const alphaNames: ValidatorFn =
    (control: AbstractControl): ValidationErrors | null => {
        let nameVal: string = control.value;
        let validError = { 'alphaNames': { 'value': nameVal } }
        if (nameVal?.trim() == "") return null;
        return isNaN(Number(nameVal)) ? null : validError;
    }


export const onlyDigits: ValidatorFn =
    (control: AbstractControl): ValidationErrors | null => {
        let ssnVal: string = control.value;
        let validError = { 'onlyDigits': { 'value': ssnVal } }
        return !isNaN(Number(ssnVal)) ? null : validError;
    }


export const checkExpiryDate : ValidatorFn = (control: AbstractControl) : ValidationErrors | null => {
    let today = new Date();
    let date: string = control.value;
    let validError = {'checkExpiryDate' : {'value':date}};

    let currentYear = today.getFullYear()%100;
    let curentMonth = today.getMonth();

    let cardYear = +(date?.split('/')[1]);
    let cardMonth = +(date?.split('/')[0]);

    if(cardYear >= currentYear){
        if(cardMonth >= curentMonth){
            return null;
        }
        return validError;
    }
    return validError;

}