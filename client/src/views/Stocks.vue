<template>
  <v-container class="py-6">
    <!-- Page Header -->
    <v-row class="mb-6">
      <v-col cols="12">
        <div class="d-flex align-center mb-4">
          <v-icon color="primary" size="36" class="mr-3">mdi-trending-up</v-icon>
          <h1 class="text-h3 font-weight-bold">Stock Market</h1>
        </div>
        <p class="text-h6 text-grey-darken-1">
          Track equity performance and analyze market trends
        </p>
      </v-col>
    </v-row>
    
    <!-- Market Indices -->
    <v-row class="mb-6">
      <v-col cols="12">
        <h2 class="text-h5 font-weight-bold mb-4">Major Indices</h2>
      </v-col>
      
      <v-col 
        v-for="index in marketIndices"
        :key="index.symbol"
        cols="12" 
        sm="6" 
        md="4"
      >
        <v-card elevation="2">
          <v-card-text>
            <div class="d-flex justify-space-between align-center">
              <div>
                <h3 class="text-h6 font-weight-bold">{{ index.name }}</h3>
                <p class="text-caption text-grey-darken-1">{{ index.symbol }}</p>
              </div>
              <div class="text-right">
                <p class="text-h6 font-weight-bold">{{ index.price }}</p>
                <v-chip 
                  :color="index.change >= 0 ? 'success' : 'error'"
                  size="small"
                >
                  <v-icon 
                    start 
                    size="12"
                  >
                    {{ index.change >= 0 ? 'mdi-trending-up' : 'mdi-trending-down' }}
                  </v-icon>
                  {{ index.changePercent }}%
                </v-chip>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    
    <!-- Stock Table -->
    <v-row>
      <v-col cols="12">
        <v-card elevation="2">
          <v-card-title>
            <h2 class="text-h5 font-weight-bold">Top Stocks</h2>
            <v-spacer />
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              label="Search stocks..."
              single-line
              hide-details
              variant="outlined"
              density="compact"
              style="max-width: 300px;"
            />
          </v-card-title>
          
          <v-data-table
            :headers="headers"
            :items="filteredStocks"
            :search="search"
            class="elevation-0"
            item-value="symbol"
          >
            <template v-slot:item.change="{ item }">
              <v-chip 
                :color="item.change >= 0 ? 'success' : 'error'"
                size="small"
              >
                <v-icon 
                  start 
                  size="12"
                >
                  {{ item.change >= 0 ? 'mdi-trending-up' : 'mdi-trending-down' }}
                </v-icon>
                {{ item.changePercent }}%
              </v-chip>
            </template>
            
            <template v-slot:item.volume="{ item }">
              {{ formatNumber(item.volume) }}
            </template>
            
            <template v-slot:item.marketCap="{ item }">
              {{ formatCurrency(item.marketCap) }}
            </template>
            
            <template v-slot:item.actions="{ item }">
              <v-btn
                size="small"
                color="primary"
                variant="outlined"
                @click="viewStock(item)"
              >
                View
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Stocks',
  data() {
    return {
      search: '',
      apiConnected: false,
      headers: [
        { title: 'Symbol', key: 'symbol', align: 'start' },
        { title: 'Company', key: 'name', align: 'start' },
        { title: 'Price', key: 'price', align: 'end' },
        { title: 'Change', key: 'change', align: 'center' },
        { title: 'Volume', key: 'volume', align: 'end' },
        { title: 'Market Cap', key: 'marketCap', align: 'end' },
        { title: 'Actions', key: 'actions', align: 'center', sortable: false }
      ],
      marketIndices: [],
      stocks: []
    }
  },
  computed: {
    filteredStocks() {
      if (!this.search) return this.stocks
      
      return this.stocks.filter(stock =>
        stock.symbol.toLowerCase().includes(this.search.toLowerCase()) ||
        stock.name.toLowerCase().includes(this.search.toLowerCase())
      )
    }
  },
  methods: {
    formatNumber(num) {
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M'
      }
      if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K'
      }
      return num.toLocaleString()
    },
    formatCurrency(num) {
      if (num >= 1000000000) {
        return '$' + (num / 1000000000).toFixed(1) + 'B'
      }
      if (num >= 1000000) {
        return '$' + (num / 1000000).toFixed(1) + 'M'
      }
      return '$' + num.toLocaleString()
    },
    viewStock(stock) {
      console.log('Viewing stock:', stock)
    },
    connectBrokerageAPI() {
      // Prompt user to connect their brokerage account API
      alert('Please connect your brokerage account API for real-time stock data')
    }
  },
  mounted() {
    // Check if user has API credentials configured
    if (!this.apiConnected) {
      this.connectBrokerageAPI()
    }
  }
}
</script>
