export const getAllCoins = async () => {
	const response = await fetch('https://api.coinranking.com/v2/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0', {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '2b69ee66bamsh6c468b35e265e98p1cfdbejsn4a5b71fef482',
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
  }
})

if(!response.ok){
  throw new Error ("Error Loading Coins")
}


	const json = await response.json()
return json.data
}