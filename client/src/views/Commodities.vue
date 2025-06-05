<template>
  <v-container class="py-6">
    <!-- Page Header -->
    <v-row class="mb-6">
      <v-col cols="12">
        <div class="d-flex align-center mb-4">
          <v-icon color="warning" size="36" class="mr-3">mdi-gold</v-icon>
          <h1 class="text-h3 font-weight-bold">Commodities</h1>
        </div>
        <p class="text-h6 text-grey-darken-1">
          Track precious metals, energy, and agricultural commodity prices
        </p>
      </v-col>
    </v-row>
    
    <!-- Commodity Categories -->
    <v-row class="mb-6">
      <v-col cols="12">
        <v-chip-group
          v-model="selectedCategory"
          selected-class="text-primary"
          mandatory
        >
          <v-chip
            v-for="category in categories"
            :key="category"
            :value="category"
            variant="outlined"
          >
            {{ category }}
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>
    
    <!-- Commodities Grid -->
    <v-row>
      <v-col 
        v-for="commodity in filteredCommodities"
        :key="commodity.symbol"
        cols="12" 
        sm="6" 
        md="4" 
        lg="3"
      >
        <v-card elevation="2" hover>
          <v-card-text>
            <div class="d-flex align-center mb-3">
              <v-icon 
                :color="getCommodityColor(commodity.category)"
                size="32"
                class="mr-3"
              >
                {{ getCommodityIcon(commodity.category) }}
              </v-icon>
              <div>
                <h3 class="text-h6 font-weight-bold">{{ commodity.name }}</h3>
                <p class="text-caption text-grey-darken-1">{{ commodity.symbol }}</p>
              </div>
            </div>
            
            <div class="text-center">
              <p class="text-h5 font-weight-bold mb-2">${{ commodity.price }}</p>
              <v-chip 
                :color="commodity.change >= 0 ? 'success' : 'error'"
                size="small"
              >
                <v-icon 
                  start 
                  size="12"
                >
                  {{ commodity.change >= 0 ? 'mdi-trending-up' : 'mdi-trending-down' }}
                </v-icon>
                {{ commodity.changePercent }}%
              </v-chip>
              
              <div class="mt-3">
                <p class="text-caption text-grey-darken-1">
                  Volume: {{ formatNumber(commodity.volume) }}
                </p>
                <p class="text-caption text-grey-darken-1">
                  Unit: {{ commodity.unit }}
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
              @click="viewCommodity(commodity)"
            >
              View Details
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Commodities',
  data() {
    return {
      selectedCategory: 'All',
      categories: ['All', 'Precious Metals', 'Energy', 'Agricultural'],
      commodities: [],
      apiConnected: false
    }
  },
  computed: {
    filteredCommodities() {
      if (this.selectedCategory === 'All') {
        return this.commodities
      }
      return this.commodities.filter(commodity => 
        commodity.category === this.selectedCategory
      )
    }
  },
  methods: {
    getCommodityIcon(category) {
      const iconMap = {
        'Precious Metals': 'mdi-gold',
        'Energy': 'mdi-gas-station',
        'Agricultural': 'mdi-corn'
      }
      return iconMap[category] || 'mdi-chart-line'
    },
    getCommodityColor(category) {
      const colorMap = {
        'Precious Metals': 'warning',
        'Energy': 'error',
        'Agricultural': 'success'
      }
      return colorMap[category] || 'primary'
    },
    formatNumber(num) {
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M'
      }
      if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K'
      }
      return num.toLocaleString()
    },
    viewCommodity(commodity) {
      console.log('Viewing commodity:', commodity)
    },
    connectCommodityAPI() {
      alert('Please connect your commodity exchange API for real-time pricing data')
    }
  },
  mounted() {
    if (!this.apiConnected) {
      this.connectCommodityAPI()
    }
  }
}
</script>
