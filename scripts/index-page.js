import {APIKEY, BASEURI} from './utility-functions.js';
import {createElement, setContent, convertDate, improveMenuUsability} from './utility-functions.js';

/* ###  simple text input/textarea validation   ### */

const validateTextInput = input => (input === '' || !/^[\a-zA-Z ]*$/.test(input)) ? false : true;

/* ###  add/remove invalid form input types   ### */

const styleInvalidFormInput = (element, type, classname) => (type === 'add') ? element.classList.add(classname) : element.classList.remove(classname);

/* ###  clear/delete comments   ### */

const clearComments = () => document.querySelector(".conversation__items").innerHTML = ' ';

/* ###  render comments on page   ### */

const displayComment = comments => {
    const data = comments.data;
    data.sort((a, b) => b.timestamp - a.timestamp);

    const classNameBlock = "conversation__";
    
    const container = document.querySelector(`.${classNameBlock}items`);
    container.append(createElement("hr", [`${classNameBlock}divider`]));

    data.forEach(comment => {

        const commentItem = createElement("article", [`${classNameBlock}item`]);
    
        const thumbnail = createElement("div", [`${classNameBlock}thumbnail`]);
        const avatar = createElement("div", [`${classNameBlock}avatar`]);
        thumbnail.append(avatar);
    
        const content = createElement("div", [`${classNameBlock}content`]);

        const name = setContent(createElement("h3", [`${classNameBlock}username`]), comment.name);
        const timestamp = setContent(createElement("span", [`${classNameBlock}timestamp`]), convertDate(comment.timestamp));
        const body = setContent(createElement("p", [`${classNameBlock}body`]), comment.comment);
        const divider = createElement("hr", [`${classNameBlock}divider`]);

        content.append(name, timestamp, body);
        commentItem.append(thumbnail, content);
        container.append(commentItem, divider);
    });
}

/* ###  handle comment submission  ### */

document.querySelector(".conversation__form").addEventListener("submit", event => {
    event.preventDefault(); event.stopPropagation();
    
    const classNameBlock = "conversation__"; 
    const form = event.target;
    const name = form.name.value.trim();
    const comment = form.textarea.value.trim();

    if (validateTextInput(name) && validateTextInput(comment)) {

        form.name.classList.remove(`${classNameBlock}input--error`);
        form.textarea.classList.remove(`${classNameBlock}textarea--error`);

        axios.post(`${BASEURI}/comments?api_key=${APIKEY}`, {
            "name": name,
            "comment": comment
        }).then(result => {
            form.reset();
            return axios.get(`${BASEURI}/comments?api_key=${APIKEY}`);
         })
         .then(result => {
            clearComments();
            displayComment(result);            
         })
         .catch(error => {
            console.log("Error: ", error);
         });
    } else {
        (!validateTextInput(name)) ?
            styleInvalidFormInput(form.name, 'add', `${classNameBlock}input--error`) :
            styleInvalidFormInput(form.name, 'remove', `${classNameBlock}input--error`);

        (!validateTextInput(comment)) ?
            styleInvalidFormInput(form.textarea, 'add', `${classNameBlock}textarea--error`) :
            styleInvalidFormInput(form.textarea, 'remove', `${classNameBlock}textarea--error`);
    }
});

axios.get(`${BASEURI}/comments?api_key=${APIKEY}`)
     .then(result => {
        clearComments();
        displayComment(result);
     })
     .catch(error => {
        console.log("Error: ", error);
    });

improveMenuUsability();