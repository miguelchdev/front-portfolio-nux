

export const filterFun = (toFilter, property, query) => {
    if (query == "") return toFilter;

    return toFilter.filter((element) => {
        if (element.hasOwnProperty(property)) {
            if (Array.isArray(element[property]))
                return element[property].includes(query);

            return element[property] == query;
        }
        return true;
    });
};

export const onlyUnique = (value, index, self) => self.indexOf(value) === index;

export function debounce(fn, delay) {
    var timeoutID = null;
    return function() {
        clearTimeout(timeoutID);
        var args = arguments;
        var that = this;
        timeoutID = setTimeout(function() {
            fn.apply(that, args);
        }, delay);
    };
}

export const checkEmail = (email) =>
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
        email
    );

export const checkName = (name) =>
    /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/.test(
        name
    );

export const cloudinaryImage = (url="",options=[]) =>{
    if(!url) return "";
    
    let[ partOne,parTwo] = url.split('upload/')

    let transformations =   options.reduce((prev, act, index, array) => {
        let isLastElement = index == array.length - 1;
        let symbol = isLastElement ? "/":",";
        return prev + `${act}${symbol}`;
    },'');
   
    return `${partOne}upload/${transformations}${parTwo}`;
}

export const cloudinarySrcSet = (url) =>{
    let sizes = [256,300,400,512,768,1024,1280,1600,1920];
    let srcSet = sizes.reduce((prev, act) => {
        return prev + cloudinaryImage(url,['f_auto',`w_${act}`]) + ` ${act}w,`;
    },'')
    return srcSet;
}