import {APIKEY, BASEURI} from './utility-functions.js';
import {createElement, setContent, convertDate, improveMenuUsability} from './utility-functions.js';

/* ###  Render shows component   ### */

 let renderShows = shows => {
    const data = shows.data;

    const classNameBlock = "shows__";
    const showsContainer = createElement("div", [`${classNameBlock}container`]);
    const showsTitle = setContent(createElement("h2", [`${classNameBlock}title`]), 'Shows');
    const showsContentContainer = createElement("div", [`${classNameBlock}content`]);
    showsContainer.append(showsTitle, showsContentContainer);
    document.querySelector(".shows").append(showsContainer);

    const showsHeader = createElement("div", [`${classNameBlock}header`]);
    const showsLabels = [`Date`, `Venue`, `Location`, ` `];

    showsLabels.map(text => {
        return setContent(createElement("span", [`${classNameBlock}label`]), text)
    }).forEach(element => {showsHeader.append(element);});

    showsContentContainer.appendChild(showsHeader);

    data.forEach(show => {

        const showsHeaderLabels = showsLabels.map(text => {
            return setContent(createElement("span", [`${classNameBlock}label`, `${classNameBlock}label--mobile`]), text)
        });

        const showsTicketContainer = createElement("ul", [`${classNameBlock}ticket`]);

        const showtimestamp = createElement("li", [`${classNameBlock}timestamp`]);
        const showtimestampLabel = showsHeaderLabels[0];
        const showtimestampDate = setContent(createElement("span", [`${classNameBlock}date`]), convertDate('shows', show.date));
        showtimestamp.append(showtimestampLabel, showtimestampDate);

        const showVenue = createElement("li", [`${classNameBlock}venue`]);
        const showVenueLabel = showsHeaderLabels[1];
        const showVenuePlace = setContent(createElement("span", [`${classNameBlock}place`]), show.place);
        showVenue.append(showVenueLabel, showVenuePlace);

        const showLocation = createElement("li", [`${classNameBlock}location`]);
        const showLocationLabel = showsHeaderLabels[2];
        const showLocationPlace = setContent(createElement("span", [`${classNameBlock}city`]), show.location);
        showLocation.append(showLocationLabel, showLocationPlace);

        const showCTAContainer = createElement("li", [`${classNameBlock}purchase`]);
        const showCTA = setContent(createElement("a", [`${classNameBlock}action`]), "Buy Tickets");
        showCTA.href = "";
        showCTA.addEventListener("click", event => event.preventDefault());
        showCTAContainer.append(showCTA);

        const showDivider = createElement("hr", [`${classNameBlock}divider`]);

        showsTicketContainer.addEventListener("click", event => {
            document.querySelectorAll((`.${classNameBlock}ticket--selected`))
            .forEach(element => {
                element.classList.remove(`${classNameBlock}ticket--selected`);
            }); 
            showsTicketContainer.classList.add(`${classNameBlock}ticket--selected`);

        });

        showsTicketContainer.append(showtimestamp, showVenue, showLocation, showCTAContainer);
        showsContentContainer.append(showsTicketContainer, showDivider);
    });
};

axios.get(`${BASEURI}/showdates?api_key=${APIKEY}`)
     .then(result => {
        renderShows(result);
     })
     .catch(error => {
        console.log(error);
     });

improveMenuUsability();