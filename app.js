window.addEventListener("load", ()=>{
    const reloadBtn = document.querySelector('.reload-btn')
    reloadBtn.addEventListener('click', pull)
    pull();
});


async function pull (){
    document.body.classList.add('loading')
    await pullMainCOP();
    // await pullWise();
    document.body.classList.remove('loading')
}

async function pullMainCOP (){

    const price = document.querySelector('.current-currency-price')
    price.innerHTML = 'loading';

    // Grab Data From API
    const universalCOP = await fetch('https://v6.exchangerate-api.com/v6/a138cb23d3d427fff2d4bdad/latest/USD')
        .then((response) => response.json())
        .then ((json) => (json.conversion_rates.COP));
    
    price.innerHTML = universalCOP.toFixed(2);
};


// function pullWise () {
//     const price = document.querySelector('.wise-currency-price')
//     price.innerHTML = 'loading';

//     // Grab Data From API
//     const wiseValue = fetch('https://api.sandbox.transferwise.tech/v1/rates?source=USD&target=COP&time=2022-05-13T14:53:01', {
//         headers: {
//             'Authorization': 'Bearer d55a6108-bb23-4e8e-a4f8-3cc340331f08'
//           },
//     })
// }

