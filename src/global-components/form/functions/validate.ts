import {ValidationOptions} from "../../../types/validationOptions.ts";

export function validate(validation: ValidationOptions, value: string) {
    if (value.trim().length === 0) {
        return 'none';
    }
    switch (validation) {
        case 'RANGENUMBER':
            return  /^\d*$/.test(value) ? 'valid' : false;
        case "MIN2CHARACTERS":
            return value.trim().length > 1 ? 'valid' : false;
        case "REDBERRYEMAIL":
            return value.match('^[\\w\\.-]+@redberry\\.ge$') ? 'valid' : false
        case 'PHONE':
            return value.match('^5\\d{8}$') ? 'valid' : false
        case "MIN5WORDS":
            const values = value.split(" ")
            if (values.length === 5 && values[values.length - 1].trim().length > 0) {
                return 'valid'
            }
            if (values.length > 5) {
                return 'valid'
            }
            return false
        case "ONLYNUMBERS":
            return value.match('^\\d+$') ? 'valid' : false
        default:
            return false
    }
}