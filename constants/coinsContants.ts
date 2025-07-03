export const CURRENCIES = [
    { uuid: 'yhjMzLPhuIDl', symbol: 'USD', name: 'US Dollar' },
    { uuid: '5k-_VTxqtCEI', symbol: 'EUR', name: 'Euro' },
    { uuid: 'K4Qc0fW43u0y', symbol: 'GBP', name: 'British Pound' },
    { uuid: 'Hokyui45Z38f', symbol: 'JPY', name: 'Japanese Yen' },
    { uuid: 'QUs7TawY8JSS', symbol: 'BTC', name: 'Bitcoin' },
    { uuid: 'dvUf0i0J5s8R', symbol: 'ETH', name: 'Ethereum' },
  ];

 export const TIME_PERIODS = [
  { id: '1h', label: '1H' },
    { id: '24h', label: '24H' },
    { id: '7d', label: '7D' },
    { id: '1m', label: '1M' },
    { id: '3m', label: '3M' },
    { id: '1y', label: '1Y' },
    { id: '5y', label: '5Y' },
  ];

  export interface HistoryPoint {
    price: string;
    timestamp: number;
  }
  
  export interface ChartDataPoint {
    x: number;
    y: number;
    price: string;
    date: string;
  }