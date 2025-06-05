<template>
  <v-app-bar 
    app 
    color="primary" 
    dark 
    elevation="4"
    height="64"
  >
    <v-app-bar-nav-icon 
      @click="$emit('toggle-drawer')"
    />
    
    <v-toolbar-title class="text-h5 font-weight-bold">
      <v-icon class="mr-2">mdi-chart-line</v-icon>
      FinDash
    </v-toolbar-title>
    
    <v-spacer />
    
    <!-- Search Bar -->
    <v-text-field
      v-model="searchQuery"
      prepend-inner-icon="mdi-magnify"
      label="Search assets..."
      single-line
      hide-details
      outlined
      dense
      class="mx-4 search-field"
      style="max-width: 300px;"
      @keyup.enter="handleSearch"
    />
    
    <v-spacer />
    
    <!-- User Menu -->
    <v-menu offset-y>
      <template v-slot:activator="{ props }">
        <v-btn
          icon
          v-bind="props"
        >
          <v-avatar size="36" color="secondary">
            <v-icon>mdi-account</v-icon>
          </v-avatar>
        </v-btn>
      </template>
      
      <v-list>
        <v-list-item @click="$emit('navigate', '/profile')">
          <template v-slot:prepend>
            <v-icon>mdi-account-circle</v-icon>
          </template>
          <v-list-item-title>User Profile</v-list-item-title>
        </v-list-item>
        
        <v-list-item @click="$emit('navigate', '/settings')">
          <template v-slot:prepend>
            <v-icon>mdi-cog</v-icon>
          </template>
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Header',
  emits: ['toggle-drawer', 'navigate'],
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    handleSearch() {
      if (this.searchQuery.trim()) {
        console.log('Searching for:', this.searchQuery)
        // Here you would implement actual search functionality
      }
    }
  }
}
</script>

<style scoped>
.search-field {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.search-field ::v-deep(.v-input__control) {
  min-height: 40px;
}

.search-field ::v-deep(.v-field__input) {
  color: white;
}

.search-field ::v-deep(.v-field__outline) {
  color: rgba(255, 255, 255, 0.3);
}
</style>
