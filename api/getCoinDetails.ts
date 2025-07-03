// const response = await fetch( `https://api.coinranking.com/v2/coin/${uuid}/history?timePeriod=${timePeriod}&referenceCurrencyUuid=${referenceCurrency}`,

export const getCoinDetails = async (uuid: any) => {
	const response = await fetch( `https://api.coinranking.com/v2/coin/${uuid}`, {
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

export const getCoinHistory = async (
  uuid: string | any,
  timePeriod: string = '24h'
) => {
  const res = await fetch(
    `https://api.coinranking.com/v2/coin/${uuid}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${timePeriod}`,
    {
      headers: {
        'X-Rapidapi-Key': '2b69ee66bamsh6c468b35e265e98p1cfdbejsn4a5b71fef482',
        'X-Rapidapi-Host': 'coinranking1.p.rapidapi.com',
      },
    }
  );
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  
  const json = await res.json();

  if (!json.data || !json.data.history) {
    throw new Error('Invalid response format');
  }
  return json.data.history
  .map((point: any) => {
    // Ensure we have valid data
    const timestamp = point.timestamp;
    const price = point.price;

    // Skip invalid data points
    if (!timestamp || !price || isNaN(parseFloat(price))) {
      return null;
    }

    return {
      x: timestamp * 1000, // Convert to milliseconds for Victory Native
      y: parseFloat(price),
    };
  })
  .filter(Boolean); // Remove null entries
};
