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
    console.log('clearinputfield auskommentiet')
    // let searchInput = document.getElementById('searchInput');
    // searchInput.value = "";
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
}

function closeDetailCard() {  // click anywhere on the exitCanvas, stop Event Propagation on currently open pokemon detail card
    let detailCanvas = document.getElementById('pokemonDetailed');
    let exitCanvas = document.getElementById('exitCanvas')
    let mainCanvasPokCollection = document.getElementById('pokemon-collection')

    detailCanvas.classList.add('d-none');
    exitCanvas.classList.add('d-none');
    mainCanvasPokCollection.style.filter = 'blur(0) grayscale(0)';

    showFooter();
    renderLoadedPokemons();  // to return from a search, we want to always return to a full collection of pokemon
    clearInputField();
}

function hideFooter() {  // when detail card is open
    document.getElementById('footer').classList.add('d-none');
}

function showFooter() {  // when detail card is closed
    document.getElementById('footer').classList.remove('d-none');
}




// HTML RETURN FUNCTIONS

/**
 * @param: {i} >> from renderPokedex() for loop -->  PokemonNumber in currrent Array
 * @returns HTML Code for each Summary-Card
 */
function generateSummaryCard(i) {
    let capitalizedName = loadedPokemons[i]['name'].charAt(0).toUpperCase() + loadedPokemons[i]['name'].slice(1);
    let pokemonType = loadedPokemons[i]['types'][0]['type']['name'];

    return `
    <div id="card-summary${i}" class="card-summary img-background-summarycard bg-${pokemonType}" onclick="showDetailCard(${i})"> 
        <div class="card-summary-description">
            <div class="card-summary-name">${capitalizedName}</div>
            <div class="card-summary-type">${loadedPokemons[i]['types'][0]['type']['name']}</div>
        </div>
        <div class="card-summary-img">
            <img loading="lazy" src="${loadedPokemons[i]['sprites']['other']['dream_world']['front_default']}">
        </div> 
    </div>`;
}


function generatePokDetails(i) {
    let capitalizedName = loadedPokemons[i]['name'].charAt(0).toUpperCase() + loadedPokemons[i]['name'].slice(1);
    let weightInKg = (loadedPokemons[i]['weight'] / 10).toFixed(0);
    let heightInCm = (loadedPokemons[i]['height'] * 30.48 / 100).toFixed(1);  // from unit foot in cm
    let pokemonType = loadedPokemons[i]['types'][0]['type']['name'];

    return `
        <div id="detail-card-top${i}" class="detail-card-top bg-${pokemonType}-detail">
            <h1>${capitalizedName}</h1>
            <span id="pokemon-no">#${loadedPokemons[i]['id']}</span>
            <img id="detail-card-img" src="${loadedPokemons[i]['sprites']['other']['dream_world']['front_default']}">
        </div>

        <div class="detail-card-main">
            <div id="pokemon-type" class="pokemon-type ">
                <h4 class="detail-type bg-${pokemonType}-detail" id="detail-type${i}">${loadedPokemons[i]['types'][0]['type']['name']}</h4>
            </div>

            <div class="pokemon-physiognomy">
                <div id="species">
                    <h3 class="fontcolor-${pokemonType}">${loadedPokemons[i]['abilities'][0]['ability']['name']}</h3>
                    <h4 class="fontcolor-${pokemonType}">ability</h4>
                </div>
                <div id="height">
                    <h3 class="fontcolor-${pokemonType}">${heightInCm} m</h3>
                    <h4 class="fontcolor-${pokemonType}">height</h4>
                </div>
                <div id="weight">
                    <h3 class="fontcolor-${pokemonType}">${weightInKg} kg</h3>
                    <h4 class="fontcolor-${pokemonType}">weight</h4>
                </div>
            </div>

            <div class="chart-wrap">
                <div class="grid horizontal">
                    <div class="flex-justifystart">
                        <div class="flex-left fontcolor-${pokemonType}">hp</div>
                        <div class="fullpercent">
                            <div class="bar bg-${pokemonType}-detail" id="bar1${i}" style="width:${loadedPokemons[i]['stats'][0]['base_stat']}%;" title="hp"></div>
                            <div class="bar-leftover"></div>
                        </div>
                        <h4 class="percentNumber fontcolor-${pokemonType}">${loadedPokemons[i]['stats'][0]['base_stat']}%</h4>
                    </div>

                    <div class="flex-justifystart">
                        <div class="flex-left fontcolor-${pokemonType}">attack</div>
                        <div class="fullpercent">
                            <div class="bar bg-${pokemonType}-detail" id="bar2${i}" style="width:${loadedPokemons[i]['stats'][1]['base_stat']}%;" title="attack"></div>
                            <div class="bar-leftover"></div>
                        </div>
                        <h4  class="percentNumber fontcolor-${pokemonType}">${loadedPokemons[i]['stats'][1]['base_stat']}%</h4>
                    </div>
                    <div class="flex-justifystart">
                        <div class="flex-left fontcolor-${pokemonType}">defense</div>
                        <div class="fullpercent">
                            <div class="bar bg-${pokemonType}-detail" id="bar3${i}"  style="width:${loadedPokemons[i]['stats'][2]['base_stat']}%;" title="defense"></div>
                            <div class="bar-leftover"></div>
                        </div>
                        <h4 class="percentNumber fontcolor-${pokemonType}">${loadedPokemons[i]['stats'][2]['base_stat']}%</h4>
                        </div>

                    <div class="flex-justifystart">
                        <div class="flex-left fontcolor-${pokemonType}">speed</div>
                        <div class="fullpercent">
                            <div class="bar bg-${pokemonType}-detail" id="bar4${i}" style="width:${loadedPokemons[i]['stats'][5]['base_stat']}%;" title="speed"></div>
                            <div class="bar-leftover"></div>
                        </div>
                        <h4 class="percentNumber fontcolor-${pokemonType}">${loadedPokemons[i]['stats'][5]['base_stat']}%</h4 >
                    </div>
                </div>
            </div>
        </div>`;
}

