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

 /* ###  Improve link item usability   ### */
 
 document.querySelectorAll(".topbar__item").forEach(element => {
    element.addEventListener("click", event => event.target.childNodes[0].click());
 });
