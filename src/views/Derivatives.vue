<template>
  <v-container class="py-6">
    <!-- Page Header -->
    <v-row class="mb-6">
      <v-col cols="12">
        <div class="d-flex align-center mb-4">
          <v-icon color="success" size="36" class="mr-3">mdi-chart-multiple</v-icon>
          <h1 class="text-h3 font-weight-bold">Derivatives</h1>
        </div>
        <p class="text-h6 text-grey-darken-1">
          Advanced financial instruments for sophisticated trading strategies
        </p>
      </v-col>
    </v-row>
    
    <!-- Derivative Types -->
    <v-row class="mb-6">
      <v-col 
        v-for="type in derivativeTypes"
        :key="type.name"
        cols="12" 
        sm="6" 
        md="4"
      >
        <v-card 
          elevation="2" 
          hover
          @click="selectedType = type.name"
          :class="selectedType === type.name ? 'border-primary' : ''"
        >
          <v-card-text class="text-center pa-6">
            <v-icon 
              :color="type.color"
              size="48"
              class="mb-3"
            >
              {{ type.icon }}
            </v-icon>
            <h3 class="text-h6 font-weight-bold mb-2">{{ type.name }}</h3>
            <p class="text-body-2 text-grey-darken-1">{{ type.description }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    
    <!-- Derivatives Table -->
    <v-row>
      <v-col cols="12">
        <v-card elevation="2">
          <v-card-title>
            <h2 class="text-h5 font-weight-bold">
              {{ selectedType }} Contracts
            </h2>
            <v-spacer />
            <v-select
              v-model="selectedType"
              :items="derivativeTypes.map(t => t.name)"
              label="Contract Type"
              variant="outlined"
              density="compact"
              style="max-width: 200px;"
            />
          </v-card-title>
          
          <v-data-table
            :headers="headers"
            :items="filteredDerivatives"
            class="elevation-0"
            item-value="contract"
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
            
            <template v-slot:item.expiry="{ item }">
              <v-chip
                :color="getExpiryColor(item.expiry)"
                size="small"
                variant="outlined"
              >
                {{ formatDate(item.expiry) }}
              </v-chip>
            </template>
            
            <template v-slot:item.actions="{ item }">
              <v-btn
                size="small"
                color="primary"
                variant="outlined"
                @click="viewDerivative(item)"
              >
                Analyze
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
  name: 'Derivatives',
  data() {
    return {
      selectedType: 'Options',
      apiConnected: false,
      derivatives: [],
      derivativeTypes: [
        {
          name: 'Options',
          description: 'Call and put options for hedging and speculation',
          icon: 'mdi-arrow-decision',
          color: 'primary'
        },
        {
          name: 'Futures',
          description: 'Standardized contracts for future delivery',
          icon: 'mdi-calendar-clock',
          color: 'success'
        },
        {
          name: 'Swaps',
          description: 'Exchange of cash flows between parties',
          icon: 'mdi-swap-horizontal',
          color: 'warning'
        }
      ],
      headers: [
        { title: 'Contract', key: 'contract', align: 'start' },
        { title: 'Underlying', key: 'underlying', align: 'start' },
        { title: 'Price', key: 'price', align: 'end' },
        { title: 'Change', key: 'change', align: 'center' },
        { title: 'Volume', key: 'volume', align: 'end' },
        { title: 'Expiry', key: 'expiry', align: 'center' },
        { title: 'Actions', key: 'actions', align: 'center', sortable: false }
      ]
    }
  },
  computed: {
    filteredDerivatives() {
      return this.derivatives.filter(derivative => 
        derivative.type === this.selectedType
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
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      })
    },
    getExpiryColor(expiry) {
      const date = new Date(expiry)
      const now = new Date()
      const daysUntilExpiry = (date - now) / (1000 * 60 * 60 * 24)
      
      if (daysUntilExpiry < 30) return 'error'
      if (daysUntilExpiry < 90) return 'warning'
      return 'success'
    },
    viewDerivative(derivative) {
      console.log('Viewing derivative:', derivative)
    },
    connectDerivativesAPI() {
      alert('Please connect your derivatives exchange API for real-time options and futures data')
    }
  },
  mounted() {
    if (!this.apiConnected) {
      this.connectDerivativesAPI()
    }
  }
}
</script>

<style scoped>
.border-primary {
  border: 2px solid rgb(var(--v-theme-primary));
}
</style>
