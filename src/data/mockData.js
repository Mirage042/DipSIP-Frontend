// Mock data for the financial dashboard

export const stocksData = {
  indices: [
    {
      name: 'S&P 500',
      symbol: 'SPX',
      price: '4,425.89',
      change: 12.34,
      changePercent: '+0.28'
    },
    {
      name: 'Dow Jones',
      symbol: 'DJI',
      price: '34,567.12',
      change: -45.67,
      changePercent: '-0.13'
    },
    {
      name: 'NASDAQ',
      symbol: 'IXIC',
      price: '13,789.45',
      change: 23.56,
      changePercent: '+0.17'
    }
  ],
  stocks: [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: '$182.50',
      change: 2.45,
      changePercent: '+1.36',
      volume: 52000000,
      marketCap: 2850000000000
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      price: '$378.90',
      change: -1.20,
      changePercent: '-0.32',
      volume: 28000000,
      marketCap: 2810000000000
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      price: '$142.30',
      change: 3.15,
      changePercent: '+2.27',
      volume: 31000000,
      marketCap: 1780000000000
    },
    {
      symbol: 'AMZN',
      name: 'Amazon.com Inc.',
      price: '$155.75',
      change: -0.85,
      changePercent: '-0.54',
      volume: 41000000,
      marketCap: 1620000000000
    },
    {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      price: '$248.50',
      change: 12.30,
      changePercent: '+5.21',
      volume: 89000000,
      marketCap: 789000000000
    },
    {
      symbol: 'META',
      name: 'Meta Platforms Inc.',
      price: '$487.20',
      change: -8.45,
      changePercent: '-1.71',
      volume: 22000000,
      marketCap: 1230000000000
    }
  ]
}

export const commoditiesData = [
  {
    name: 'Gold',
    symbol: 'XAU',
    price: '2,035.50',
    change: 15.30,
    changePercent: '+0.76',
    category: 'Precious Metals',
    volume: 185000,
    unit: 'per troy oz'
  },
  {
    name: 'Silver',
    symbol: 'XAG',
    price: '24.85',
    change: -0.35,
    changePercent: '-1.39',
    category: 'Precious Metals',
    volume: 425000,
    unit: 'per troy oz'
  },
  {
    name: 'Crude Oil',
    symbol: 'CL',
    price: '78.45',
    change: 2.15,
    changePercent: '+2.82',
    category: 'Energy',
    volume: 650000,
    unit: 'per barrel'
  },
  {
    name: 'Natural Gas',
    symbol: 'NG',
    price: '3.25',
    change: -0.12,
    changePercent: '-3.56',
    category: 'Energy',
    volume: 890000,
    unit: 'per MMBtu'
  },
  {
    name: 'Wheat',
    symbol: 'ZW',
    price: '645.75',
    change: 8.50,
    changePercent: '+1.33',
    category: 'Agricultural',
    volume: 125000,
    unit: 'per bushel'
  },
  {
    name: 'Corn',
    symbol: 'ZC',
    price: '485.25',
    change: -3.75,
    changePercent: '-0.77',
    category: 'Agricultural',
    volume: 235000,
    unit: 'per bushel'
  },
  {
    name: 'Soybeans',
    symbol: 'ZS',
    price: '1,325.50',
    change: 12.25,
    changePercent: '+0.93',
    category: 'Agricultural',
    volume: 145000,
    unit: 'per bushel'
  },
  {
    name: 'Platinum',
    symbol: 'XPT',
    price: '1,045.80',
    change: -8.90,
    changePercent: '-0.84',
    category: 'Precious Metals',
    volume: 45000,
    unit: 'per troy oz'
  }
]

export const derivativesData = [
  {
    type: 'Options',
    contract: 'AAPL 190 Call',
    underlying: 'AAPL',
    price: '$3.45',
    change: 0.25,
    changePercent: '+7.81',
    volume: 15000,
    expiry: '2024-03-15'
  },
  {
    type: 'Options',
    contract: 'SPY 440 Put',
    underlying: 'SPY',
    price: '$2.80',
    change: -0.15,
    changePercent: '-5.08',
    volume: 25000,
    expiry: '2024-02-28'
  },
  {
    type: 'Options',
    contract: 'TSLA 250 Call',
    underlying: 'TSLA',
    price: '$8.90',
    change: 1.20,
    changePercent: '+15.58',
    volume: 8500,
    expiry: '2024-04-19'
  },
  {
    type: 'Futures',
    contract: 'ES Mar24',
    underlying: 'S&P 500',
    price: '$4,428.75',
    change: 15.50,
    changePercent: '+0.35',
    volume: 125000,
    expiry: '2024-03-15'
  },
  {
    type: 'Futures',
    contract: 'CL Apr24',
    underlying: 'Crude Oil',
    price: '$79.25',
    change: 1.85,
    changePercent: '+2.39',
    volume: 85000,
    expiry: '2024-04-20'
  },
  {
    type: 'Futures',
    contract: 'GC Jun24',
    underlying: 'Gold',
    price: '$2,045.60',
    change: 18.40,
    changePercent: '+0.91',
    volume: 45000,
    expiry: '2024-06-27'
  },
  {
    type: 'Swaps',
    contract: 'USD-EUR IRS 5Y',
    underlying: 'Interest Rate',
    price: '3.45%',
    change: 0.05,
    changePercent: '+1.47',
    volume: 2500,
    expiry: '2029-01-15'
  },
  {
    type: 'Swaps',
    contract: 'CDS SPX 5Y',
    underlying: 'Credit Default',
    price: '85.50',
    change: -2.30,
    changePercent: '-2.62',
    volume: 1200,
    expiry: '2029-03-20'
  }
]

export const cryptoData = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 45250,
    change: 1250,
    changePercent: '+2.84',
    marketCap: 885000000000,
    volume: 28500000000,
    icon: 'mdi-bitcoin',
    color: 'orange'
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    price: 2750,
    change: -85,
    changePercent: '-3.00',
    marketCap: 330000000000,
    volume: 15200000000,
    icon: 'mdi-ethereum',
    color: 'blue'
  },
  {
    symbol: 'BNB',
    name: 'Binance Coin',
    price: 315,
    change: 12,
    changePercent: '+3.96',
    marketCap: 48500000000,
    volume: 1800000000,
    icon: 'mdi-currency-btc',
    color: 'amber'
  },
  {
    symbol: 'ADA',
    name: 'Cardano',
    price: 0.52,
    change: 0.02,
    changePercent: '+4.00',
    marketCap: 18200000000,
    volume: 580000000,
    icon: 'mdi-alpha-a-circle',
    color: 'blue-darken-2'
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    price: 98.5,
    change: -3.2,
    changePercent: '-3.15',
    marketCap: 42800000000,
    volume: 2100000000,
    icon: 'mdi-circle',
    color: 'purple'
  },
  {
    symbol: 'DOT',
    name: 'Polkadot',
    price: 7.85,
    change: 0.35,
    changePercent: '+4.67',
    marketCap: 9800000000,
    volume: 425000000,
    icon: 'mdi-circle-multiple',
    color: 'pink'
  },
  {
    symbol: 'AVAX',
    name: 'Avalanche',
    price: 38.90,
    change: 1.80,
    changePercent: '+4.85',
    marketCap: 14500000000,
    volume: 850000000,
    icon: 'mdi-triangle',
    color: 'red'
  },
  {
    symbol: 'MATIC',
    name: 'Polygon',
    price: 0.95,
    change: -0.04,
    changePercent: '-4.04',
    marketCap: 8900000000,
    volume: 380000000,
    icon: 'mdi-hexagon-multiple',
    color: 'purple-darken-2'
  },
  {
    symbol: 'LINK',
    name: 'Chainlink',
    price: 15.75,
    change: 0.85,
    changePercent: '+5.70',
    marketCap: 8700000000,
    volume: 520000000,
    icon: 'mdi-link',
    color: 'blue-darken-1'
  },
  {
    symbol: 'UNI',
    name: 'Uniswap',
    price: 6.45,
    change: -0.25,
    changePercent: '-3.73',
    marketCap: 4800000000,
    volume: 185000000,
    icon: 'mdi-unicorn',
    color: 'pink-darken-2'
  }
]
