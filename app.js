import { globalCOP, sources } from "./data.js";

let container, template

window.addEventListener("load", ()=>{
    const reloadBtn = document.querySelector('.reload-btn')
    reloadBtn.addEventListener('click', pull)

    container = document.querySelector('.sources-container')
    template = document.querySelector('.conversion-source-cell')
    container.innerHTML = '';

    sources.map(source => createSourceCell(source));

    globalCOP.price = document.querySelector('.current-global-cop-price');

    pull();
});


async function pull (){
    document.body.classList.add('loading')

    const globalCOPPromise = pullCOP(globalCOP);

    const promises = sources.map(source => pullCOP(source))
    promises.push(globalCOPPromise);
    await Promise.all(promises)

    document.body.classList.remove('loading')
}

function createSourceCell (source){

    // Create source cell in HTML

    const element = template.cloneNode(true)
    container.appendChild(element);

    const image = element.querySelector('img')
    image.setAttribute('src', `/images/${source.image}`);

    source.price = element.querySelector('.current-cop-price')
};

async function pullCOP (source){

    // Grab Data From API

    let rate = 0;

    if (source.url){
        rate = await fetch(source.url, source.fetchOptions)
        .then((response) => response.json())
        .then ((json) => source.getJsonRate(json));
    }

    source.price.innerHTML = `$ ${rate.toFixed(2)} COP`;
};
