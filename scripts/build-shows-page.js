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

let createElement = (tag, classNames) => {
    const element = document.createElement(tag);
    classNames.forEach(classname => element.classList.add(classname));
    return element;
 }

 let setContent = (element, content) => {
    element.innerText = content;
    return element;
}

 let rendershows = showsObj => {
    const data = showsObj ? showsObj : shows;

    const classNameBlock = "shows__";
    const mainContainer = document.querySelector(`.${classNameBlock}content`);

    const showsHeader = createElement("div", [`${classNameBlock}header`]);
    [`Date`, `Venue`, `Location`, ` `].map(text => {
        return setContent(createElement("span", [`${classNameBlock}label`]), text)
    }).forEach(element => { showsHeader.appendChild(element);});
    mainContainer.appendChild(showsHeader);

    data.forEach(show => {

        const showsHeaderLabels = [`Date`, `Venue`, `Location`, ` `].map(text => {
            return setContent(createElement("span", [`${classNameBlock}label`]), text)
        });

        const showContainer = createElement("ul", [`${classNameBlock}ticket`]);
      
        const showtimestamp = createElement("li", [`${classNameBlock}timestamp`]);
        const showtimestampLabel = showsHeaderLabels[0];
        showtimestampLabel.classList.add(`${classNameBlock}label--mobile`);
        const showtimestampDate = createElement("span", [`${classNameBlock}date`])
        showtimestampDate.innerText = show.date;
        showtimestamp.append(showtimestampLabel, showtimestampDate);

        const showVenue = createElement("li", [`${classNameBlock}venue`]);
        const showVenueLabel = showsHeaderLabels[1];
        showVenueLabel.classList.add(`${classNameBlock}label--mobile`);
        const showVenuePlace = createElement("span", [`${classNameBlock}place`])
        showVenuePlace.innerText = show.venue;
        showVenue.append(showVenueLabel, showVenuePlace);

        const showLocation = createElement("li", [`${classNameBlock}location`]);
        const showLocationLabel = showsHeaderLabels[1];
        showLocationLabel.classList.add(`${classNameBlock}label--mobile`);
        const showLocationPlace = createElement("span", [`${classNameBlock}city`])
        showLocationPlace.innerText = show.location;
        showLocation.append(showLocationLabel, showLocationPlace);

        const showCTA = createElement("a", [`${classNameBlock}action`]);
        showCTA.innerText = "Buy Tickets"
        const showDivider = createElement("hr", [`${classNameBlock}divider`]);

        showContainer.addEventListener("click", (event) => {
            event.stopPropagation();

            document.querySelectorAll((`.${classNameBlock}ticket--selected`))
            .forEach(element => {
                element.classList.remove(`${classNameBlock}ticket--selected`);
            });

            showContainer.classList.toggle(`${classNameBlock}ticket--selected`);
        })
        showContainer.append(showtimestamp, showVenue, showLocation, showCTA);
        mainContainer.append(showContainer, showDivider);
    });
}

rendershows();

