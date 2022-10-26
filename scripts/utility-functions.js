const APIKEY = '60db57e4-6533-4104-9697-97d46fc9a8ae';
const BASEURI = 'https://project-1-api.herokuapp.com';

/* ###  Create and return new element with target classnames   ### */

const createElement = (tag, classNames) => {
    const element = document.createElement(tag);
    classNames.forEach(classname => element.classList.add(classname));
    return element;
};
 
 /* ###  Set and return an elements content   ### */
 
const setContent = (element, content) => {
     element.innerText = content;
     return element;
};

 /* ###  convert date epoch to human readable   ### */

const convertDate = (epochMS) => {
    const date = new Date(epochMS);
    
    let day = date.getDate().toString();
    if (day.length === 1) day = `0${day}`;

    let month = date.getMonth().toString();
    if (month.length === 1) month = `0${month}`;

    // const day = (date.getDate().toString().length == 1) ? `0${date.getDate().toString()}` : date.getDate().toString();
    // const month = (date.getMonth().toString().length == 1) ? `0${date.getMonth().toString()}` : date.getMonth().toString();
    
    return `${month}/${day}/${date.getFullYear()}`;
}

 /* ###  Improve link item usability   ### */
 
const improveMenuUsability = () => {
    document.querySelectorAll(".topbar__item").forEach(element => {
        element.addEventListener("click", event => event.target.childNodes[0].click());
    });
}

export {APIKEY, BASEURI};
export {createElement, setContent, convertDate, improveMenuUsability};

