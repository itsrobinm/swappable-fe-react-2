export function priceValidator(text : string) : Boolean {
    return /^[0-9]{0,5}$/.test(text);
}