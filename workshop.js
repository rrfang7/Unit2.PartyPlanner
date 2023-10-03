const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2309-FSA-ET-WEB-FT-SF/events`;

const state = {
    parties: [],
};

const partyList = document.querySelector("partyList");
const addPartyForm = document.querySelector("#addParty");
addPartyForm.addEventListener("submit", addParty);


async function render() {
    await getParties();
    renderParties();
}
render();


async function getParties() {
    try {
        const response = await fetch(API_URL);
        const json = await response.json();
        state.parties = json;
    }  catch(err) {
        console.log(err)
    }
};

