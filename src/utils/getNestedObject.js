// let movies = [
//     { genre: { name: `Action`, }, name: `Avatar` },

// ];


//property can be nested
export function getNestedObject(obj, property) {;
    if (!property) { console.warn(`Invalid Property`); return `` }

    if (!obj || Object.keys(obj) === 0) { console.warn(`Invalid Object`); return `` }

    const properties = property.split(`.`);
    // console.log(`properties`, properties);

    let output = { ...obj };

    for (let i = 0; i < properties.length; i++) {
        output = output[properties[i]];
        //console.log(dataArr[properties[i]]) ;
    }
    //console.log(`output`, output);

    if (!output || Object.keys(output) === 0) { console.warn(`No such Property in Object`); return `` }

    ///output is a string
    return output;

}


// getName(movies[0], `name`);