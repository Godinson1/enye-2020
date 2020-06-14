//Autocomplete helper function for search

export const myFunc = (value: string) => {
    if(value.charAt(0) === 'm') {
        return 'medical offices';
    } else if (value.charAt(0) === 'p') {
        return 'pharmacies';
    } else if (value.charAt(0) === 'h') {
        return 'hospitals';
    } else if (value.charAt(0) === 'c') {
        return 'clinics';
    } else {
        return '';
    }
}