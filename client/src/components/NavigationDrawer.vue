<template>
  <v-navigation-drawer
    v-model="localDrawer"
    app
    temporary
    color="grey-lighten-5"
    width="280"
  >
    <!-- Header -->
    <v-list-item class="pa-4">
      <template v-slot:prepend>
        <v-icon class="mr-2" color="primary">mdi-chart-line</v-icon>
      </template>
      <v-list-item-title class="text-h6 font-weight-bold">
        FinDash
      </v-list-item-title>
      <v-list-item-subtitle>Asset Management</v-list-item-subtitle>
    </v-list-item>
    
    <v-divider />
    
    <!-- Navigation Items -->
    <v-list nav>
      <v-list-item
        v-for="item in navigationItems"
        :key="item.title"
        :value="item.value"
        @click="$emit('navigate', item.route)"
        color="primary"
      >
        <template v-slot:prepend>
          <v-icon>{{ item.icon }}</v-icon>
        </template>
        
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
    
    <v-divider class="my-4" />
    
    <!-- Additional Info -->
    <v-list>
      <v-list-item>
        <v-list-item-title class="text-caption text-grey-darken-1">
          Market Status
        </v-list-item-title>
        <v-list-item-subtitle>
          <v-chip
            :color="marketStatus.color"
            size="small"
            class="mt-1"
          >
            <v-icon start size="12">{{ marketStatus.icon }}</v-icon>
            {{ marketStatus.text }}
          </v-chip>
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavigationDrawer',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'navigate'],
  data() {
    return {
      navigationItems: [
        {
          title: 'Dashboard',
          icon: 'mdi-view-dashboard',
          route: '/',
          value: 'dashboard'
        },
        {
          title: 'Stocks',
          icon: 'mdi-trending-up',
          route: '/stocks',
          value: 'stocks'
        },
        {
          title: 'Commodities',
          icon: 'mdi-gold',
          route: '/commodities',
          value: 'commodities'
        },
        {
          title: 'Derivatives',
          icon: 'mdi-chart-multiple',
          route: '/derivatives',
          value: 'derivatives'
        },
        {
          title: 'CryptoCurrencies',
          icon: 'mdi-bitcoin',
          route: '/crypto',
          value: 'crypto'
        }
      ]
    }
  },
  computed: {
    localDrawer: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    },
    marketStatus() {
      const now = new Date()
      const hour = now.getHours()
      const day = now.getDay()
      
      // Simple market hours simulation (9 AM - 4 PM, weekdays)
      const isMarketHours = day >= 1 && day <= 5 && hour >= 9 && hour < 16
      
      return isMarketHours 
        ? { text: 'Open', color: 'green', icon: 'mdi-circle' }
        : { text: 'Closed', color: 'red', icon: 'mdi-circle' }
    }
  }
}
</script>
