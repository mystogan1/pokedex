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

//To fetch data
const getPoke = async (url, pokeName) => {
    const res = await fetch(url + pokeName);
    return await res.json();
}


//Main fuction to change data
let start = async () => {
    console.log(pokeInpt.value);

    // load data
    var pokeData = await getPoke(api_url, pokeInpt.value);
    console.log(pokeData);

    //image
    pokeImg.src = pokeData.sprites.other.home.front_default;

    //Id Number
    number.innerText = '#' + pokeData.id;

    // type
        //TODO: //Remove existing child
    // let type = Array.from(document.querySelector('#poke-type span'));
    // if (type) {
    //     for (let span of type) {
    //         types.removeChild(span);
    //     }
    // }

        //Create and add type
    for (let type of pokeData.types) {
        let span = document.createElement('span');
        span.classList.add('type');
        Object.keys(colors).forEach(color => {
            if (color == type.type.name) {
                console.log(colors[color]);
                span.style.background = `rgb(${colors[color]})`;
                span.innerText = color;
            }
        })
        types.append(span);
    }

    //stats
    let stats = [];
    for (let stat of pokeData.stats) {
        stats.push(stat.base_stat);
    }
    [hp.innerText, atk.innerText, def.innerText, satk.innerText, sdef.innerText, spd.innerText] = stats;

    // bar
    let statsBar = [];
    for (let stat of pokeData.stats) {
        statsBar.push(stat.base_stat + '%');
    }
    [hpBar.style.width, atkBar.style.width, defBar.style.width, satkBar.style.width, sdefBar.style.width, spdBar.style.width] = statsBar;
}


//pre-fetched data
fetch(api_url)
    .then(res => res.json())
    .then(data => {
        try {
            start();
        } catch (e) {
            console.count(e.message);
        }
    })

//fetch after input
pokeInpt.addEventListener('input', function (e) {
    if (e.data) {
        start();
    }
});


