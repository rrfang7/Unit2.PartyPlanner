const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2309-FSA-ET-WEB-FT-SF/events`;

const state = {
    parties: [],
};

// dom references
const partyList = document.querySelector("#partyList");
const addPartyForm = document.querySelector("#addPartyForm");
addPartyForm.addEventListener("submit", addParty);


async function render() {
    await getParties();
    renderParties();
}
render();

// update state with parties from API
async function getParties() {
    try {
        const response = await fetch(API_URL);
        const json = await response.json();
        state.parties = json;
    }  catch(err) {
        console.error(err)
    }
};

getParties()

// render parties from state 
function renderParties() {
    if (!state.parties.length) {
        partyList.innerHTML = `<li>No parties found</li>`;
        return
    }

    const partyItems = state.parties.map((party) => {
        const li = document.createElement("li");
        li.innerHTML = `
        <span>Name: ${party.name}</span>
        <span>Date: ${party.date}</span>
        <span>Time: ${party.time}</span>
        <span>Location: ${party.location}</span>
        <span>Description: ${party.description}</span>
        `;
        return li;
    });

    partyList.replaceChildren(...partyItems);
}

async function addParty(event) {
    event.preventDefault();

    const partyName = document.getElementById("partyName").value;
    const partyDate = document.getElementById("partyDate").value;
    const partyTime = document.getElementById("partyTime").value;
    const partyLocation = document.getElementById("partyLocation").value;
    const partyDescription = document.getElementById("partyDescription").value;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: partyName,
                date: partyDate,
                time: partyTime,
                location: partyLocation,
                description: partyDescription,
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to create party");
        }
        
        render();
    } catch (error) {
        console.error(error)
    }
}