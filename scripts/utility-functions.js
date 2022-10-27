const APIKEY = '147b6ef6-f201-4cd1-a5ae-e436ec7f7791';
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

const convertDate = (format, epochMS) => {
    const date = new Date(epochMS);
    const newDate = date.toString().split(' ').splice(0, 4);

    if (format === 'comment') {
        const month = (date.getMonth() + 1).toString();
        (month.length === 1) ? newDate.splice(0, 2, `0${month}`) : newDate.splice(0, 2, month);
        return newDate.join('/');
    }
    
    return newDate.join(' ');
}

 /* ###  Improve link item usability   ### */
 
const improveMenuUsability = () => {
    document.querySelectorAll(".topbar__item").forEach(element => {
        element.addEventListener("click", event => event.target.childNodes[0].click());
    });
}

export {APIKEY, BASEURI};
export {createElement, setContent, convertDate, improveMenuUsability};