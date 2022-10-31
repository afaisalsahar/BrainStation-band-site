import {APIKEY, BASEURI} from './utility-functions.js';
import {createElement, classModifier, setContent, convertDate, sortComments, improveMenuUsability} from './utility-functions.js';

/* ###  simple text input/textarea validation   ### */

const validateTextInput = (input, value) => {
    value = value.trim();
    if (input === 'name') {
        return (value.length === 0 || !/^[\a-zA-Z ]*$/.test(value)) ? false : true;
    }
    return (value.length === 0) ? false : true;
}

/* ###  clear/delete comments   ### */

const clearComments = () => {
    document.querySelector(".conversation__items").innerHTML = '';
}

/* ###  fetch comments   ### */

const fetchComments = () => {
    axios.get(`${BASEURI}/comments?api_key=${APIKEY}`)
    .then(response => {
       clearComments();
       sortComments(response.data).forEach((comment, index, arr) => {
           displayComment(comment, (index + 1 === arr.length));
       });
    })
    .catch(error => {
       console.log("Error: ", error);
   }); 
};

/* ###  render comments on page   ### */

const displayComment = (comment, lastComment) => {
    const classNameBlock = "conversation__";

    const container = document.querySelector(`.${classNameBlock}items`);

    const commentItem = createElement("article", [`${classNameBlock}item`]);
    commentItem.setAttribute('data-id', comment.id);
    
    const thumbnail = createElement("div", [`${classNameBlock}thumbnail`]);
    const avatar = createElement("div", [`${classNameBlock}avatar`]);
    thumbnail.append(avatar);

    const content = createElement("div", [`${classNameBlock}content`]);

    const name = setContent(createElement("h3", [`${classNameBlock}username`]), comment.name);
    const timestamp = setContent(createElement("span", [`${classNameBlock}timestamp`]), convertDate('comment', comment.timestamp));
    const body = setContent(createElement("p", [`${classNameBlock}body`]), comment.comment);
    
    const reaction = createElement("div", [`${classNameBlock}reaction`]);
    const likeCTA = createElement("a", [`${classNameBlock}like`]);
    
    likeCTA.addEventListener("click", () => {
        axios.put(`${BASEURI}/comments/${comment.id}/like?api_key=${APIKEY}`)
        .then(response => {
            likeCounter.innerText = response.data.likes;
        });
    });

    const likeHeart = createElement("i", [`fa-solid`, `fa-heart`]);
    const likeCounter = setContent(createElement("span", [`${classNameBlock}counter`]), comment.likes);
    likeCTA.append(likeHeart, likeCounter);
    reaction.append(likeCTA);

    const deleteCTA = createElement("a", [`${classNameBlock}delete`]);

    deleteCTA.addEventListener("click", () => {
        axios.delete(`${BASEURI}/comments/${comment.id}?api_key=${APIKEY}`)
        .then(response => {
            fetchComments();
        });
    });

    const deleteTrash = createElement("i", [`fa-solid`, `fa-trash`]);
    const deleteLabel = setContent(createElement("span", [`${classNameBlock}delete`]), "Delete");

    deleteCTA.append(deleteTrash, deleteLabel);
    reaction.append(deleteCTA);

    const divider = createElement("hr", [`${classNameBlock}divider`]);
    
    content.append(name, timestamp, body, reaction);
    commentItem.append(thumbnail, content);
    container.append(commentItem, divider);

    if (lastComment) {
        container.insertBefore(
            createElement("hr", [`${classNameBlock}divider`]),
            document.querySelector(".conversation__item")
        );
    }
}

/* ###  handle comment submission  ### */

document.querySelector(".conversation__form").addEventListener("submit", event => {
    event.preventDefault();
    
    const classNameBlock = "conversation__"; 
    const form = event.target;
    const name = form.name;
    const nameData = name.value;
    const comment = form.textarea;
    const commentData = comment.value;

    if (validateTextInput('name', nameData) && validateTextInput('comment', commentData)) {

        classModifier(name, 'remove', `${classNameBlock}input--error`);
        classModifier(comment, 'remove', `${classNameBlock}input--error`);

        axios.post(`${BASEURI}/comments?api_key=${APIKEY}`, {
            "name": nameData,
            "comment": commentData
        }).then(response => {
            form.reset();
            fetchComments();
         })
         .catch(error => {
            console.log("Error: ", error);
         });
    } else {
        (!validateTextInput('name', nameData)) ?
            classModifier(name, 'add', `${classNameBlock}input--error`) :
            classModifier(name, 'remove', `${classNameBlock}input--error`);

        (!validateTextInput('comment', commentData)) ?
            classModifier(comment, 'add', `${classNameBlock}textarea--error`) :
            classModifier(comment, 'remove', `${classNameBlock}textarea--error`);
    }
});

const nameInput = document.querySelector(".conversation__input");
nameInput.addEventListener("focus", () => classModifier(nameInput, 'remove', 'conversation__input--error'));
const commentArea = document.querySelector(".conversation__textarea");
commentArea.addEventListener("focus", () => classModifier(commentArea, 'remove', 'conversation__textarea--error'));

fetchComments();
improveMenuUsability();