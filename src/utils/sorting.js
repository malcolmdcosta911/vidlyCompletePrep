


import { getNestedObject } from './getNestedObject';

export const sorting = (data, sortColumn, order) => {

    const dataToSort = [...data];

    if (dataToSort.length === 0) return [];

    //console.log(dataToSort[0][sortColumn],);

    const negation = order === `asc` ? -1 : 1;

    dataToSort.sort((a, b) => {

        //  console.log(a, sortColumn);

        //a===obj  sortColumn=`title`
        let A = getNestedObject(a, sortColumn);
        let B = getNestedObject(b, sortColumn);


        // console.log(typeof (A)) // typeof (A) can be string or number

        if (typeof (A) === `string` && typeof (B) === `string`) {
            A = A.toLowerCase();
            B = B.toLowerCase();
        }


        if (A > B) { return negation * -1; }
        else if (B > A) { return negation * 1; }
        else { return 0; }

    });

    // console.log(dataToSort);
    return dataToSort
};
