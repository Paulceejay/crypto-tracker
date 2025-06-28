export const getCoinDetails = async (uuid: any) => {
	const response = await fetch(`https://api.coinranking.com/v2/coin/${uuid}`, {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '2b69ee66bamsh6c468b35e265e98p1cfdbejsn4a5b71fef482',
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
  }
})

if(!response.ok){
  throw new Error ("Error Loading your Selected Coin")
}


	const json = await response.json()

return json.data.coin
}