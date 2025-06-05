<template>
  <div>
    <!-- Landing Carousel -->
    <LandingCarousel />
    
    <!-- Main Content -->
    <v-container class="py-8">
      <!-- Welcome Section -->
      <v-row class="mb-8">
        <v-col cols="12">
          <div class="text-center">
            <h1 class="text-h3 font-weight-bold mb-4">
              Welcome to FinDash
            </h1>
            <p class="text-h6 text-grey-darken-1">
              Your comprehensive financial dashboard for modern portfolio management
            </p>
          </div>
        </v-col>
      </v-row>
      
      <!-- Quick Stats -->
      <v-row class="mb-8">
        <v-col 
          v-for="stat in quickStats" 
          :key="stat.title"
          cols="12" 
          sm="6" 
          md="3"
        >
          <v-card elevation="2" class="pa-4 text-center">
            <v-icon 
              :color="stat.color" 
              size="48" 
              class="mb-2"
            >
              {{ stat.icon }}
            </v-icon>
            <h3 class="text-h4 font-weight-bold mb-1">
              {{ stat.value }}
            </h3>
            <p class="text-body-2 text-grey-darken-1">
              {{ stat.title }}
            </p>
          </v-card>
        </v-col>
      </v-row>
      
      <!-- Asset Categories -->
      <v-row>
        <v-col cols="12">
          <h2 class="text-h4 font-weight-bold mb-6 text-center">
            Asset Categories
          </h2>
        </v-col>
        
        <v-col 
          v-for="category in assetCategories"
          :key="category.name"
          cols="12" 
          sm="6" 
          md="3"
        >
          <v-card 
            elevation="3"
            hover
            @click="$router.push(category.route)"
            class="category-card"
          >
            <v-card-text class="text-center pa-6">
              <v-icon 
                :color="category.color"
                size="64"
                class="mb-4"
              >
                {{ category.icon }}
              </v-icon>
              <h3 class="text-h5 font-weight-bold mb-2">
                {{ category.name }}
              </h3>
              <p class="text-body-2 text-grey-darken-1">
                {{ category.description }}
              </p>
            </v-card-text>
            
            <v-card-actions class="justify-center pb-4">
              <v-btn 
                :color="category.color"
                variant="outlined"
              >
                Explore
                <v-icon end>mdi-arrow-right</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import LandingCarousel from '../components/LandingCarousel.vue'

export default {
  name: 'Home',
  components: {
    LandingCarousel
  },
  data() {
    return {
      quickStats: [
        {
          title: 'Connect API Sources',
          value: '0',
          icon: 'mdi-chart-line',
          color: 'primary'
        },
        {
          title: 'Asset Classes',
          value: '4',
          icon: 'mdi-view-grid',
          color: 'success'
        },
        {
          title: 'Data Sources',
          value: 'Setup',
          icon: 'mdi-clock-fast',
          color: 'warning'
        },
        {
          title: 'Live Feeds',
          value: 'API',
          icon: 'mdi-earth',
          color: 'info'
        }
      ],
      assetCategories: [
        {
          name: 'Stocks',
          description: 'Connect your brokerage for real equity data',
          icon: 'mdi-trending-up',
          color: 'primary',
          route: '/stocks'
        },
        {
          name: 'Commodities',
          description: 'Link commodity exchanges for live pricing',
          icon: 'mdi-gold',
          color: 'warning',
          route: '/commodities'
        },
        {
          name: 'Derivatives',
          description: 'Connect to options and futures markets',
          icon: 'mdi-chart-multiple',
          color: 'success',
          route: '/derivatives'
        },
        {
          name: 'Crypto',
          description: 'Integrate with cryptocurrency exchanges',
          icon: 'mdi-bitcoin',
          color: 'orange',
          route: '/crypto'
        }
      ]
    }
  }
}
</script>

<style scoped>
.category-card {
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.category-card:hover {
  transform: translateY(-4px);
}
</style>
