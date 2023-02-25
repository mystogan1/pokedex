const pokeInpt = document.querySelector('#search');
const number = document.querySelector('#number');
const pokeImg = document.querySelector('#pokemon-image');
const types = document.querySelector('#poke-type');
let [hp, atk, def, satk, sdef, spd] = document.querySelectorAll('.stats .stat-number');
let [hpBar, atkBar, defBar, satkBar, sdefBar, spdBar] = document.querySelectorAll('.stats .stat-bar .bar-inner');
const api_url = "https://pokeapi.co/api/v2/pokemon/";
const colors = {
    "rock": "182, 158, 49",
    "ghost": "112, 85, 155",
    "steel": "183, 185, 208",
    "water": "100, 147, 235",
    "grass": "116, 203, 72",
    "psychic": "251, 85, 132",
    "ice": "154, 214, 223",
    "dark": "117, 87, 76",
    "fairy": "230, 158, 172",
    "normal": "170, 166, 127",
    "fighting": "193, 34, 57",
    "flying": "168, 145, 236",
    "poison": "164, 62, 158",
    "ground": "222, 193, 107",
    "bug": "167, 183, 35",
    "fire": "245, 125, 49",
    "electric": "249, 207, 48",
    "dragon": "112, 55, 255"
}
var link = document.querySelector("link[rel~='icon']");

//To fetch data
const getPoke = async (url, pokeName = 'pikachu') => {
    const res = await fetch(url + pokeName);
    if (res.status == 200) {
        return await res.json();
    }
}


//Main fuction to change data
let pokemon = (pokeData) => {
    //favicon
    link.href = pokeData.sprites.other.home.front_default;
        
    //image
    pokeImg.src = pokeData.sprites.other.home.front_default;  //dream_world

    //Id Number
    number.innerText = '#' + pokeData.id;

    // type
    types.innerHTML = '';
    pokeData.types.forEach(t => {
        let newType = document.createElement('span');
        newType.style.background = `rgb(${colors[t.type.name]})`;
        newType.innerText = t.type.name;
        newType.classList.add('type');

        types.append(newType);
    })

    //stats
    let stats = [];
    for (let stat of pokeData.stats) {
        stats.push(stat.base_stat);
    }
    [hp.innerText, atk.innerText, def.innerText, satk.innerText, sdef.innerText, spd.innerText] = stats;

    // bar
    let statsBar = [];
    for (let stat of pokeData.stats) {
        statsBar.push(stat.base_stat/2 + '%');
    }
    [hpBar.style.width, atkBar.style.width, defBar.style.width, satkBar.style.width, sdefBar.style.width, spdBar.style.width] = statsBar;
}

let start = async (pokeName) => {
    try {
        let data = await getPoke(api_url,pokeName);
        pokemon(data);
    } catch (e) {
        console.log(e);
        console.log(`"${pokeName}" not found.`)
    }
}


//pre-fetched data
start();

//fetch after input
pokeInpt.addEventListener('input',function (e) {
    if (e.data) {
        pokeName = pokeInpt.value.split(' ').join('-');
        setTimeout(function () {
            start(pokeName.toLowerCase())
        }, 700);
    }
});