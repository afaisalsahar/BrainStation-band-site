/* ###  shows listing   ### */

const shows = [
    {
        date: 'Mon Sept 06 2021',
        venue: 'Ronald Lane',
        location: 'San Francisco, CA'
    },
    {
        date: 'Tue Sept 21 2021',
        venue: 'Pier 3 East',
        location: 'San Francisco, CA'
    },
    {
        date: 'Fri Oct 15 2021',
        venue: 'View Lounge',
        location: 'San Francisco, CA'
    },
    {
        date: 'Sat Nov 06 2021',
        venue: 'Hyatt Agency',
        location: 'San Francisco, CA'
    },
    {
        date: 'Fri Nov 26 2021',
        venue: 'Moscow Center',
        location: 'San Francisco, CA'
    },
    {
        date: 'Wed Dec 15 2021',
        venue: 'Press Club',
        location: 'San Francisco, CA'
    }
];

/* ###  Render shows component   ### */

 let rendershows = showsObj => {
    const data = showsObj ? showsObj : shows;

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
        const showtimestampDate = setContent(createElement("span", [`${classNameBlock}date`]), show.date);
        showtimestamp.append(showtimestampLabel, showtimestampDate);

        const showVenue = createElement("li", [`${classNameBlock}venue`]);
        const showVenueLabel = showsHeaderLabels[1];
        const showVenuePlace = setContent(createElement("span", [`${classNameBlock}place`]), show.venue);
        showVenue.append(showVenueLabel, showVenuePlace);

        const showLocation = createElement("li", [`${classNameBlock}location`]);
        const showLocationLabel = showsHeaderLabels[2];
        const showLocationPlace = setContent(createElement("span", [`${classNameBlock}city`]), show.location);
        showLocation.append(showLocationLabel, showLocationPlace);

        const showCTA = setContent(createElement("a", [`${classNameBlock}action`]), "Buy Tickets");
        showCTA.href = "";
        showCTA.addEventListener("click", event => event.preventDefault());

        const showDivider = createElement("hr", [`${classNameBlock}divider`]);

        showsTicketContainer.addEventListener("click", event => {
            event.stopPropagation();

            document.querySelectorAll((`.${classNameBlock}ticket--selected`))
            .forEach(element => {
                element.classList.remove(`${classNameBlock}ticket--selected`);
            });
            showsTicketContainer.classList.add(`${classNameBlock}ticket--selected`);

        });

        showsTicketContainer.append(showtimestamp, showVenue, showLocation, showCTA);
        showsContentContainer.append(showsTicketContainer, showDivider);
    });
};

rendershows();

