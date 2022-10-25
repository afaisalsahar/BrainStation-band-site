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

let displayComment = comments => {
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

/* ###  Handle comment submission  ### */

document.querySelector(".conversation__form").addEventListener("submit", event => {
    event.preventDefault(); event.stopPropagation();
    const form = event.target;

    axios.post(`${BASEURI}/comments?api_key=${APIKEY}`, {
        "name": form.name.value,
        "comment": form.textarea.value
    }).then(result => {
        form.reset();
        return axios.get(`${BASEURI}/comments?api_key=${APIKEY}`);
     })
     .then(result => {
        clearComments();
        displayComment(result);
     })
     .catch(error => {
        console.log(error);
     });
});

axios.get(`${BASEURI}/comments?api_key=${APIKEY}`)
     .then(result => {
        clearComments();
        displayComment(result);
     })
     .catch(error => {
        console.log(error);
     });
