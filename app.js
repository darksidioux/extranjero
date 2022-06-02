let container, template

const sources = [
    {
        url : 'https://v6.exchangerate-api.com/v6/a138cb23d3d427fff2d4bdad/latest/USD',
        getJsonRate : (json) => (json.conversion_rates.COP)
    },
    {
        url : 'https://api.transferwise.com/v1/rates?source=USD&target=COP',
        fetchOptions : {headers: {'Authorization': 'Bearer d55a6108-bb23-4e8e-a4f8-3cc340331f08'}},
        image : 'wise-logo.png',
        getJsonRate : (json) => (json[0].rate)
    },
    {
        image: 'visa.png',
    },
    {
        image: 'revolut.png',
    },
    {
        image: 'xoom-logo.png',
    },
    {
        image: 'WorldRemit-logo.png',
    },
    {
        image: 'remitly.png',
    },
    {
        image: 'xe-money-transfer-logo.png',
    },
    {
        image: 'small-world-money-transfer-blue.png',
    },
    {
        image: 'paysend-logo.png',
    },


]


window.addEventListener("load", ()=>{
    const reloadBtn = document.querySelector('.reload-btn')
    reloadBtn.addEventListener('click', pull)
    container = document.querySelector('.sources-container')
    template = document.querySelector('.conversion-source-cell')
    pull();
});


async function pull (){
    document.body.classList.add('loading')

    container.innerHTML = '';

    sources.forEach(source => pullCOP(source))

    document.body.classList.remove('loading')
}

async function pullCOP (source){

    // Grab Data From API

    const element = template.cloneNode(true)
    container.appendChild(element);

    const image = element.querySelector('img')
    image.setAttribute('src', `/images/${source.image}`);

    let rate = 0;

    if (source.url){
        rate = await fetch(source.url, source.fetchOptions)
        .then((response) => response.json())
        .then ((json) => source.getJsonRate(json));
    } 

    const price = element.querySelector('.current-cop-price')
    price.innerHTML = `$ ${rate.toFixed(2)} COP`;
};
