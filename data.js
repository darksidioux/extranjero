export const globalCOP = {
  url : 'https://v6.exchangerate-api.com/v6/a138cb23d3d427fff2d4bdad/latest/USD',
  getJsonRate : (json) => (json.conversion_rates.COP)
}

export const sources = [
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
