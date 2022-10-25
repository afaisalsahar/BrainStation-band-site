const APIKEY = '60db57e4-6533-4104-9697-97d46fc9a8ae';
const BASEURI = 'https://project-1-api.herokuapp.com';

/* ###  Create and return new element with target classnames   ### */

let createElement = (tag, classNames) => {
    const element = document.createElement(tag);
    classNames.forEach(classname => element.classList.add(classname));
    return element;
};
 
 /* ###  Set and return an elements content   ### */
 
let setContent = (element, content) => {
     element.innerText = content;
     return element;
};

 /* ###  convert date epoch to human readable   ### */

let convertDate = (epochMS) => {
    const date = new Date(0);
    date.setUTCMilliseconds(epochMS);
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}

 /* ###  Improve link item usability   ### */
 
 document.querySelectorAll(".topbar__item").forEach(element => {
    element.addEventListener("click", event => event.target.childNodes[0].click());
 });
