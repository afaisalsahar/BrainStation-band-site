/* ###  Comments Posted   ### */

const comments = [
    {
        name: 'Connor Walton',
        date: '02/17/2021',
        comment: 'This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.'
    },
    {
        name: 'Emilie Beach',
        date: '01/09/2021',
        comment: 'I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.'
    },
    {
        name: 'Miles Acosta',
        date: '12/20/2020',
        comment: 'I can\'t stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can\'t get enough.'
    }
];

/* ###  Store new comments   ### */

let storeComments = target => {
    const timestamp = new Date();
    const comment = {
        name: target.name.value,
        date: `${timestamp.getDate()}/${timestamp.getMonth()}/${timestamp.getFullYear()}`,
        comment: target.textarea.value
    }
    return comments.unshift(comment);
};

/* ###  Delete all comments   ### */

let clearComments = () => document.querySelector(".conversation__items").innerHTML = ' ';

/* ###  Render comments on page   ### */

let displayComment = commentsObj => {

    clearComments();
    const data = commentsObj ? commentsObj : comments;

    const classNameBlock = "conversation__";
    const mainContainer = document.querySelector(`.${classNameBlock}items`);

    mainContainer.appendChild(createElement("hr", [`${classNameBlock}divider`]));

    data.forEach(comment => {

        const commentContainer = createElement("article", [`${classNameBlock}item`]);
    
        const thumbnail = createElement("div", [`${classNameBlock}thumbnail`]);
        const avatar = createElement("div", [`${classNameBlock}avatar`]);
        thumbnail.append(avatar);
    
        const content = createElement("div", [`${classNameBlock}content`]);

        const name = setContent(createElement("h3", [`${classNameBlock}username`]), comment.name);
        const timestamp = setContent(createElement("span", [`${classNameBlock}timestamp`]), comment.date);
        const body = setContent(createElement("p", [`${classNameBlock}body`]), comment.comment);
        const divider = createElement("hr", [`${classNameBlock}divider`]);

        content.append(name, timestamp, body);
        commentContainer.append(thumbnail, content);
        mainContainer.append(commentContainer, divider);
    });
}

/* ###  Handle comment submission  ### */

document.querySelector(".conversation__form").addEventListener("submit", event => {
    event.preventDefault(); event.stopPropagation();
    const form = event.target;

    if(storeComments(form)) {
        displayComment();
        form.reset();
    } else {
        return "An error occured, please try again";
    }
});

displayComment();