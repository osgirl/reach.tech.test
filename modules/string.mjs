/*
 *  The word group includes the underscore character,
 *  which seems more like spacing, so it's excluded here.
*/
export const removeNonWordCharacters = value => value.replace(/[\W_]/g, '');

export const reverse = value => value.split('').reverse().join('');
