export const getAllCoins = async ( {pageParam = 0 }: any ) => {
  const limit = 20;
  const offset = pageParam;

  const apiUrl = 'https://api.coinranking.com/v2/coins'

  const coinUrl = `${apiUrl}?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers=1&orderBy=marketCap&orderDirection=desc&limit=${limit}&offset=${offset}`

	const response = await fetch(coinUrl, {
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
  return {
    coins: json.data.coins,
    nextOffset: json.data.coins.length === limit ? offset + limit : null,
  };
}