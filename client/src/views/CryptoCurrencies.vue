<template>
  <v-container class="py-6">
    <!-- Page Header -->
    <v-row class="mb-6">
      <v-col cols="12">
        <div class="d-flex align-center mb-4">
          <v-icon color="orange" size="36" class="mr-3">mdi-bitcoin</v-icon>
          <h1 class="text-h3 font-weight-bold">Cryptocurrencies</h1>
        </div>
        <p class="text-h6 text-grey-darken-1">
          Digital assets and blockchain technology market data
        </p>
      </v-col>
    </v-row>
    
    <!-- Market Overview -->
    <v-row class="mb-6">
      <v-col 
        v-for="stat in marketStats"
        :key="stat.title"
        cols="12" 
        sm="6" 
        md="3"
      >
        <v-card elevation="2" class="pa-4 text-center">
          <v-icon 
            :color="stat.color" 
            size="36" 
            class="mb-2"
          >
            {{ stat.icon }}
          </v-icon>
          <h3 class="text-h5 font-weight-bold mb-1">
            {{ stat.value }}
          </h3>
          <p class="text-body-2 text-grey-darken-1">
            {{ stat.title }}
          </p>
        </v-card>
      </v-col>
    </v-row>
    
    <!-- Crypto Grid -->
    <v-row class="mb-6">
      <v-col 
        v-for="crypto in topCryptos"
        :key="crypto.symbol"
        cols="12" 
        sm="6" 
        md="4" 
        lg="3"
      >
        <v-card elevation="2" hover>
          <v-card-text>
            <div class="d-flex align-center mb-3">
              <v-avatar 
                size="40" 
                class="mr-3"
                :color="crypto.color"
              >
                <v-icon color="white">{{ crypto.icon }}</v-icon>
              </v-avatar>
              <div>
                <h3 class="text-h6 font-weight-bold">{{ crypto.name }}</h3>
                <p class="text-caption text-grey-darken-1">{{ crypto.symbol }}</p>
              </div>
            </div>
            
            <div class="text-center">
              <p class="text-h5 font-weight-bold mb-2">${{ crypto.price.toLocaleString() }}</p>
              <v-chip 
                :color="crypto.change >= 0 ? 'success' : 'error'"
                size="small"
              >
                <v-icon 
                  start 
                  size="12"
                >
                  {{ crypto.change >= 0 ? 'mdi-trending-up' : 'mdi-trending-down' }}
                </v-icon>
                {{ crypto.changePercent }}%
              </v-chip>
              
              <div class="mt-3">
                <p class="text-caption text-grey-darken-1">
                  Market Cap: {{ formatCurrency(crypto.marketCap) }}
                </p>
                <p class="text-caption text-grey-darken-1">
                  Volume: {{ formatCurrency(crypto.volume) }}
                </p>
              </div>
            </div>
          </v-card-text>
          
          <v-card-actions>
            <v-btn
              color="primary"
              variant="outlined"
              size="small"
              block
              @click="viewCrypto(crypto)"
            >
              Trade
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    
    <!-- Full Crypto Table -->
    <v-row>
      <v-col cols="12">
        <v-card elevation="2">
          <v-card-title>
            <h2 class="text-h5 font-weight-bold">All Cryptocurrencies</h2>
            <v-spacer />
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              label="Search cryptocurrencies..."
              single-line
              hide-details
              variant="outlined"
              density="compact"
              style="max-width: 300px;"
            />
          </v-card-title>
          
          <v-data-table
            :headers="headers"
            :items="filteredCryptos"
            :search="search"
            class="elevation-0"
            item-value="symbol"
          >
            <template v-slot:item.name="{ item }">
              <div class="d-flex align-center">
                <v-avatar 
                  size="24" 
                  class="mr-2"
                  :color="item.color"
                >
                  <v-icon size="16" color="white">{{ item.icon }}</v-icon>
                </v-avatar>
                <div>
                  <div class="font-weight-bold">{{ item.name }}</div>
                  <div class="text-caption text-grey-darken-1">{{ item.symbol }}</div>
                </div>
              </div>
            </template>
            
            <template v-slot:item.price="{ item }">
              ${{ item.price.toLocaleString() }}
            </template>
            
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
            
            <template v-slot:item.marketCap="{ item }">
              {{ formatCurrency(item.marketCap) }}
            </template>
            
            <template v-slot:item.volume="{ item }">
              {{ formatCurrency(item.volume) }}
            </template>
            
            <template v-slot:item.actions="{ item }">
              <v-btn
                size="small"
                color="primary"
                variant="outlined"
                @click="viewCrypto(item)"
              >
                Trade
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, computed } from 'vue'
import { cryptoData } from '../data/mockData.js'

export default {
  name: 'CryptoCurrencies',
  setup() {
    const search = ref('')
    
    const headers = [
      { title: 'Name', key: 'name', align: 'start' },
      { title: 'Price', key: 'price', align: 'end' },
      { title: 'Change', key: 'change', align: 'center' },
      { title: 'Market Cap', key: 'marketCap', align: 'end' },
      { title: 'Volume', key: 'volume', align: 'end' },
      { title: 'Actions', key: 'actions', align: 'center', sortable: false }
    ]
    
    const marketStats = [
      {
        title: 'Total Market Cap',
        value: '$2.1T',
        icon: 'mdi-chart-pie',
        color: 'primary'
      },
      {
        title: '24h Volume',
        value: '$89.5B',
        icon: 'mdi-swap-vertical',
        color: 'success'
      },
      {
        title: 'BTC Dominance',
        value: '42.3%',
        icon: 'mdi-bitcoin',
        color: 'warning'
      },
      {
        title: 'Active Coins',
        value: '13,000+',
        icon: 'mdi-currency-usd',
        color: 'info'
      }
    ]
    
    const topCryptos = computed(() => cryptoData.slice(0, 8))
    
    const filteredCryptos = computed(() => {
      if (!search.value) return cryptoData
      
      return cryptoData.filter(crypto =>
        crypto.symbol.toLowerCase().includes(search.value.toLowerCase()) ||
        crypto.name.toLowerCase().includes(search.value.toLowerCase())
      )
    })
    
    const formatCurrency = (num) => {
      if (num >= 1000000000000) {
        return '$' + (num / 1000000000000).toFixed(1) + 'T'
      }
      if (num >= 1000000000) {
        return '$' + (num / 1000000000).toFixed(1) + 'B'
      }
      if (num >= 1000000) {
        return '$' + (num / 1000000).toFixed(1) + 'M'
      }
      return '$' + num.toLocaleString()
    }
    
    const viewCrypto = (crypto) => {
      console.log('Viewing crypto:', crypto)
      // Here you would implement crypto detail view
    }
    
    return {
      search,
      headers,
      marketStats,
      topCryptos,
      filteredCryptos,
      formatCurrency,
      viewCrypto
    }
  }
}
</script>
