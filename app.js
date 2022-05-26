
const sources = [
    {
        className: 'global',
        url : 'https://v6.exchangerate-api.com/v6/a138cb23d3d427fff2d4bdad/latest/USD',
        getJsonRate : (json) => (json.conversion_rates.COP)
    },
    {
        className: 'wise',
        url : 'https://api.transferwise.com/v1/rates?source=USD&target=COP',
        fetchOptions : {headers: {'Authorization': 'Bearer d55a6108-bb23-4e8e-a4f8-3cc340331f08'}},
        getJsonRate : (json) => (json[0].rate)
    },
]


window.addEventListener("load", ()=>{
    const reloadBtn = document.querySelector('.reload-btn')
    reloadBtn.addEventListener('click', pull)
    pull();
});


async function pull (){
    document.body.classList.add('loading')

    sources.forEach(source => pullCOP(source))

    document.body.classList.remove('loading')
}

async function pullCOP (options){

    const price = document.querySelector(`.current-${options.className}-cop-price`)
    price.innerHTML = 'loading';

    // Grab Data From API
    const rate = await fetch(options.url, options.fetchOptions)
        .then((response) => response.json())
        .then ((json) => options.getJsonRate(json));
    
    price.innerHTML = `$ ${rate.toFixed(2)} COP`;
};
