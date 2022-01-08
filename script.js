let loadedPokemons = [];  // main array for initial Landingpage
let offset = 0;  // start point where fetching begins, increases with scrolling of page and loading more pokemon
let limit = 20;


/**
 * FETCH source:  pokeapi.co api
 * @returns: Pokemon data >> fill Array "loadedPokemons"
 */


async function loadPokedex() {
    let url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    let response = await fetch(url);
    let responseAsJSON = await response.json();

    for (let i = 0; i < responseAsJSON.results.length; i++) {
        let loadedPokemon = await fetch(responseAsJSON.results[i].url);
        let loadedPokemonAsJSON = await loadedPokemon.json();
        loadedPokemons.push(loadedPokemonAsJSON);
    }
    offset += 20;
    renderLoadedPokemons();
}


// INPUT: >> SEARCH on keyup  

/**
 * @param:  Text from Inputfield
 * @return: Array containing filtered Pokemon >> can be used for renderPokedex
 */

function searchPokemon() {
    // prevent a case-sensitive search --> transform search input to lower case
    let searchInput = document.getElementById('searchInput').value.toLowerCase();
    // Loop through pokemon array, and hide those who don't match the search query
    let initialCanvas = document.getElementById('pokemon-collection');
    initialCanvas.innerHTML = '';

    for (let i = 0; i < loadedPokemons.length; i++) {
        if (loadedPokemons[i]['name'].includes(searchInput)) {
            initialCanvas.innerHTML +=
                generateSummaryCard(i);
            assignBackgroundColors(i);
        }
    }
}

function clearInputField() {
    let searchInput = document.getElementById('searchInput');
    searchInput.value = "";
}


// RENDER Functions

/**
 *  @param: 1.) complete Pokedex Array (= "loadedPokemons") OR 2.) filtered Array via search Results
 *  @return: Final Summary Cards of Pokemon 
*/

function renderLoadedPokemons() {
    let initialCanvas = document.getElementById('pokemon-collection');
    initialCanvas.innerHTML = '';

    for (let i = 0; i < loadedPokemons.length; i++) {
        initialCanvas.innerHTML +=
            generateSummaryCard(i);
        assignBackgroundColors(i);
    }
    clearInputField();
}

/**
 * EVENT HANDLER
 */

function showDetailCard(i) {  // click on any summary Card on main canvas
    let detailCanvas = document.getElementById('pokemonDetailed');
    let exitCanvas = document.getElementById('exitCanvas');
    let mainCanvasPokCollection = document.getElementById('pokemon-collection');

    detailCanvas.classList.remove('d-none');
    exitCanvas.classList.remove('d-none');
    mainCanvasPokCollection.style.filter = 'blur(20px) grayscale(0.5)';


    detailCanvas.innerHTML = '';
    detailCanvas.innerHTML = generatePokDetails(i);

    hideFooter();
    adjustColorsDetailCard(i);
}

function closeDetailCard() {  // click anywhere on the exitCanvas, stop Event Propagation on currently open pokemon detail card
    let detailCanvas = document.getElementById('pokemonDetailed');
    let exitCanvas = document.getElementById('exitCanvas')
    let mainCanvasPokCollection = document.getElementById('pokemon-collection')

    detailCanvas.classList.add('d-none');
    exitCanvas.classList.add('d-none');
    mainCanvasPokCollection.style.filter = 'blur(0) grayscale(0)';

    showFooter();
    renderLoadedPokemons();  // if you have used the search before, we want to always return to a full collection of pokemon
    clearInputField();
}

function hideFooter() {
    document.getElementById('footer').classList.add('d-none');
}

function showFooter() {
    document.getElementById('footer').classList.remove('d-none');
}


/**
 * CSS MODIFICATIONS: adjust colors for each pokemon type
 */

function assignBackgroundColors(i) {
    let cardBackground = document.getElementById(`card-summary${i}`);

    if (loadedPokemons[i]['types'][0]['type']['name'] === 'grass') {
        cardBackground.classList.add('bg-grass');
        return
    }
    if (loadedPokemons[i]['types'][0]['type']['name'] === 'bug') {
        cardBackground.classList.add('bg-bug');
        return
    }
    if (loadedPokemons[i]['types'][0]['type']['name'] === 'poison') {
        cardBackground.classList.add('bg-poison');
        return
    }
    if (loadedPokemons[i]['types'][0]['type']['name'] === 'fire') {
        cardBackground.classList.add('bg-fire');
        return
    }
    if (loadedPokemons[i]['types'][0]['type']['name'] === 'water') {
        cardBackground.classList.add('bg-water');
        return
    }
    if (loadedPokemons[i]['types'][0]['type']['name'] === 'normal') {
        cardBackground.classList.add('bg-normal');
        return
    }
    // default for all other cases
    cardBackground.classList.add('bg-other')
}


function adjustColorsDetailCard(i) {
    let backgroundTop = document.getElementById('detail-card-top' + i);
    let backgroundTypeInfo = document.getElementById('detail-type' + i);
    let staticBar1 = document.getElementById('bar1' + i);
    let staticBar2 = document.getElementById('bar2' + i);
    let staticBar3 = document.getElementById('bar3' + i);
    let staticBar4 = document.getElementById('bar4' + i);

    if (loadedPokemons[i]['types'][0]['type']['name'] === 'grass') {
        backgroundTop.classList.add('bg-grass-detail');
        backgroundTypeInfo.classList.add('bg-grass-detail');
        staticBar1.classList.add('bg-grass-detail');
        staticBar2.classList.add('bg-grass-detail');
        staticBar3.classList.add('bg-grass-detail');
        staticBar4.classList.add('bg-grass-detail');
        return
    }
    if (loadedPokemons[i]['types'][0]['type']['name'] === 'bug') {
        backgroundTop.classList.add('bg-bug-detail');
        backgroundTypeInfo.classList.add('bg-bug-detail');
        staticBar1.classList.add('bg-bug-detail');
        staticBar2.classList.add('bg-bug-detail');
        staticBar3.classList.add('bg-bug-detail');
        staticBar4.classList.add('bg-bug-detail');
        return
    }
    if (loadedPokemons[i]['types'][0]['type']['name'] === 'poison') {
        backgroundTop.classList.add('bg-poison-detail');
        backgroundTypeInfo.classList.add('bg-poison-detail');
        staticBar1.classList.add('bg-poison-detail');
        staticBar2.classList.add('bg-poison-detail');
        staticBar3.classList.add('bg-poison-detail');
        staticBar4.classList.add('bg-poison-detail');
        return
    }
    if (loadedPokemons[i]['types'][0]['type']['name'] === 'fire') {
        backgroundTop.classList.add('bg-fire-detail');
        backgroundTypeInfo.classList.add('bg-fire-detail');
        staticBar1.classList.add('bg-fire-detail');
        staticBar2.classList.add('bg-fire-detail');
        staticBar3.classList.add('bg-fire-detail');
        staticBar4.classList.add('bg-fire-detail');
        return
    }
    if (loadedPokemons[i]['types'][0]['type']['name'] === 'water') {
        backgroundTop.classList.add('bg-water-detail');
        backgroundTypeInfo.classList.add('bg-water-detail');
        staticBar1.classList.add('bg-water-detail');
        staticBar2.classList.add('bg-water-detail');
        staticBar3.classList.add('bg-water-detail');
        staticBar4.classList.add('bg-water-detail');
        return
    }
    if (loadedPokemons[i]['types'][0]['type']['name'] === 'normal') {
        backgroundTop.classList.add('bg-normal-detail');
        backgroundTypeInfo.classList.add('bg-normal-detail');
        staticBar1.classList.add('bg-normal-detail');
        staticBar2.classList.add('bg-normal-detail');
        staticBar3.classList.add('bg-normal-detail');
        staticBar4.classList.add('bg-normal-detail');
        return
    }
    // default for all other cases
    backgroundTop.classList.add('bg-other')
    backgroundTypeInfo.classList.add('bg-other-detail')
    staticBar1.classList.add('bg-other-detail');
    staticBar2.classList.add('bg-other-detail');
    staticBar3.classList.add('bg-other-detail');
    staticBar4.classList.add('bg-other-detail');
}



// HTML RETURN FUNCTIONS

/**
 * @param: {i} >> from renderPokedex for loop -->  PokemonNumber in currrent Array
 * @returns HTML Code for each Summary-Card
 */

function generateSummaryCard(i) {
    //make first Letter of PokemonName a Capital Letter
    let capitalizedName = loadedPokemons[i]['name'].charAt(0).toUpperCase() + loadedPokemons[i]['name'].slice(1);

    //HTML Code for each Summary Card >> open detail card on click
    return `
    <div id="card-summary${i}" class="card-summary img-background-summarycard" onclick="showDetailCard(${i})"> 
        <div class="card-summary-description">
            <div class="card-summary-name">${capitalizedName}</div>
            <div class="card-summary-type">${loadedPokemons[i]['types'][0]['type']['name']}</div>
        </div>
        <div class="card-summary-img">
            <img loading="lazy" src="${loadedPokemons[i]['sprites']['other']['dream_world']['front_default']}">
        </div> 
    </div>`
}


function generatePokDetails(i) {
    let capitalizedName = loadedPokemons[i]['name'].charAt(0).toUpperCase() + loadedPokemons[i]['name'].slice(1);
    let weightInKg = (loadedPokemons[i]['weight'] / 10).toFixed(0);
    let heightInCm = (loadedPokemons[i]['height'] * 30.48 / 100).toFixed(1);  // from unit foot in cm

    return `
        <div id="detail-card-top${i}" class="detail-card-top">
            <h1>${capitalizedName}</h1>
            <span id="pokemon-no">#${loadedPokemons[i]['id']}</span>
            <img id="detail-card-img" src="${loadedPokemons[i]['sprites']['other']['dream_world']['front_default']}">
        </div>

        <div class="detail-card-main">
            <div id="pokemon-type" class="pokemon-type">
                <h4 class="detail-type" id="detail-type${i}">${loadedPokemons[i]['types'][0]['type']['name']}</h4>
            </div>

            <div class="pokemon-physiognomy">
                <div id="species">
                    <h3>${loadedPokemons[i]['abilities'][0]['ability']['name']}</h3>
                    <h4>ability</h4>
                </div>
                <div id="height">
                    <h3>${heightInCm} m</h3>
                    <h4>height</h4>
                </div>
                <div id="weight">
                    <h3>${weightInKg} kg</h3>
                    <h4>weight</h4>
                </div>
            </div>

            <div class="chart-wrap">
                <div class="grid horizontal">
                    <div class="flex-justifystart">
                        <div class="flex-left">hp</div>
                        <div class="fullpercent">
                            <div class="bar" id="bar1${i}" style="width:${loadedPokemons[i]['stats'][0]['base_stat']}%;" title="hp"></div>
                        </div>
                    </div>

                    <div class="flex-justifystart">
                        <div class="flex-left">attack</div>
                        <div class="fullpercent">
                            <div class="bar" id="bar2${i}" style="width:${loadedPokemons[i]['stats'][1]['base_stat']}%;" title="attack"></div>
                        </div>
                    </div>
                    <div class="flex-justifystart">
                        <div class="flex-left">defense</div>
                        <div class="fullpercent">
                            <div class="bar" id="bar3${i}"  style="width:${loadedPokemons[i]['stats'][2]['base_stat']}%;" title="defense"></div>
                        </div>
                        </div>
                    <div class="flex-justifystart">
                        <div class="flex-left">speed</div>
                        <div class="fullpercent">
                            <div class="bar" id="bar4${i}" style="width:${loadedPokemons[i]['stats'][5]['base_stat']}%;" title="speed"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
}

