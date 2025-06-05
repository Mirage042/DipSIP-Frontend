<template>
  <v-app>
    <NavigationDrawer 
      v-model="drawer" 
      @navigate="handleNavigation"
    />
    
    <Header 
      @toggle-drawer="drawer = !drawer"
      @navigate="handleNavigation"
    />
    
    <v-main>
      <router-view />
    </v-main>
    
    <Footer />
  </v-app>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import NavigationDrawer from './components/NavigationDrawer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    NavigationDrawer
  },
  data() {
    return {
      drawer: false
    }
  },
  methods: {
    handleNavigation(route) {
      this.$router.push(route)
      // Close drawer on mobile after navigation
      if (window.innerWidth < 960) {
        this.drawer = false
      }
    }
  }
}
</script>

<style>
.v-application {
  font-family: 'Roboto', sans-serif;
}
</style>
