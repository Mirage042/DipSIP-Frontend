const { createApp, ref, computed, onMounted, onUnmounted } = Vue;
const { createVuetify } = Vuetify;
const { createRouter, createWebHistory } = VueRouter;

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#0F172A', // Rich dark blue-gray
          secondary: '#1E293B', // Sophisticated dark
          accent: '#3B82F6', // Modern blue
          error: '#EF4444', // Clean red
          info: '#06B6D4', // Cyan
          success: '#10B981', // Emerald
          warning: '#F59E0B', // Amber
          surface: '#FFFFFF',
          background: '#F8FAFC',
          'on-primary': '#FFFFFF',
          'on-secondary': '#FFFFFF',
          'surface-variant': '#F1F5F9',
          'primary-lighten-1': '#334155',
          'primary-lighten-2': '#64748B',
          'accent-lighten-1': '#60A5FA',
          'success-lighten-1': '#34D399',
          'error-lighten-1': '#F87171',
        },
      },
      dark: {
        colors: {
          primary: '#3B82F6',
          secondary: '#1E293B',
          accent: '#60A5FA',
          error: '#EF4444',
          info: '#06B6D4',
          success: '#10B981',
          warning: '#F59E0B',
          surface: '#1E293B',
          background: '#0F172A',
          'surface-variant': '#334155',
        },
      },
    },
  },
});

// Financial Dashboard App Component
const FinancialDashboardApp = {
  template: `
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
        <div class="main-content">
          <component :is="currentView" @navigate="handleNavigation" />
        </div>
      </v-main>
      
      <!-- FAB Button for AI Assistant -->
      <v-btn
        v-if="currentView !== 'AIAssistant'"
        @click="handleNavigation('/ai-assistant')"
        color="primary"
        icon="mdi-robot"
        size="large"
        class="fab-ai-assistant"
        elevation="6"
      />
      
      <Footer />
    </v-app>
  `,
  
  setup() {
    const drawer = ref(false);
    const currentView = ref('Home');
    
    const routeComponentMap = {
      '/': 'Home',
      '/stocks': 'Stocks', 
      '/commodities': 'Commodities',
      '/derivatives': 'Derivatives',
      '/crypto': 'CryptoCurrencies',
      '/ai-assistant': 'AIAssistant',
      '/profile': 'Profile',
      '/settings': 'Settings'
    };
    
    const handleNavigation = (route) => {
      // Map route to component
      const component = routeComponentMap[route] || 'Home';
      currentView.value = component;
      
      // Update URL without reloading
      window.history.pushState({}, '', route);
      
      // Close drawer on mobile after navigation
      if (window.innerWidth < 960) {
        drawer.value = false;
      }
    };
    
    return {
      drawer,
      currentView,
      handleNavigation
    };
  },
  
  components: {
    NavigationDrawer: {
      template: `
        <v-navigation-drawer
          v-model="localDrawer"
          app
          temporary
          class="modern-drawer"
          width="320"
          elevation="8"
        >
          <div class="drawer-header">
            <div class="brand-section">
              <div class="brand-logo">
                <v-icon size="40" color="white">mdi-trending-up</v-icon>
              </div>
              <div class="brand-content">
                <h2 class="brand-title">FinanceHub</h2>
                <p class="brand-subtitle">Professional Trading Platform</p>
              </div>
            </div>
          </div>
          
          <div class="user-status-card">
            <v-card class="status-card" elevation="0">
              <v-card-text class="pa-3">
                <div class="d-flex align-center">
                  <v-avatar size="48" class="mr-3">
                    <v-img src="https://ui-avatars.com/api/?name=John+Doe&background=3B82F6&color=fff" />
                  </v-avatar>
                  <div>
                    <div class="user-name">John Doe</div>
                    <div class="user-portfolio">Portfolio: $127,450</div>
                    <v-chip size="small" color="success" variant="tonal">+2.4% Today</v-chip>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </div>
          
          <div class="navigation-section">
            <div class="section-title">Navigation</div>
            <v-list nav class="modern-nav-list">
              <v-list-item
                v-for="item in navigationItems"
                :key="item.title"
                :value="item.value"
                @click="$emit('navigate', item.route)"
                class="nav-item"
                rounded="lg"
              >
                <template v-slot:prepend>
                  <div class="nav-icon-container">
                    <v-icon :icon="item.icon" size="20"></v-icon>
                  </div>
                </template>
                
                <v-list-item-title class="nav-title">{{ item.title }}</v-list-item-title>
                <template v-slot:append>
                  <v-icon size="16" class="nav-arrow">mdi-chevron-right</v-icon>
                </template>
              </v-list-item>
            </v-list>
          </div>
          
          <div class="market-status-section">
            <v-card class="market-card" elevation="0">
              <v-card-text class="pa-3">
                <div class="d-flex justify-space-between align-center mb-2">
                  <span class="status-label">Market Status</span>
                  <v-chip
                    :color="marketStatus.color"
                    size="small"
                    variant="tonal"
                  >
                    <v-icon start size="8">{{ marketStatus.icon }}</v-icon>
                    {{ marketStatus.text }}
                  </v-chip>
                </div>
                <div class="market-stats">
                  <div class="stat-item">
                    <span class="stat-label">S&P 500</span>
                    <span class="stat-value text-success">+0.85%</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">NASDAQ</span>
                    <span class="stat-value text-success">+1.24%</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">DOW</span>
                    <span class="stat-value text-error">-0.12%</span>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </div>
        </v-navigation-drawer>
      `,
      
      props: {
        modelValue: {
          type: Boolean,
          default: false
        }
      },
      
      emits: ['update:modelValue', 'navigate'],
      
      setup(props, { emit }) {
        const localDrawer = computed({
          get: () => props.modelValue,
          set: (value) => emit('update:modelValue', value)
        });
        
        const navigationItems = [
          { title: 'Dashboard', icon: 'mdi-view-dashboard', route: '/', value: 'dashboard' },
          { title: 'Stocks', icon: 'mdi-trending-up', route: '/stocks', value: 'stocks' },
          { title: 'Commodities', icon: 'mdi-gold', route: '/commodities', value: 'commodities' },
          { title: 'Derivatives', icon: 'mdi-chart-multiple', route: '/derivatives', value: 'derivatives' },
          { title: 'CryptoCurrencies', icon: 'mdi-bitcoin', route: '/crypto', value: 'crypto' },
          { title: 'AI Assistant', icon: 'mdi-robot', route: '/ai-assistant', value: 'ai-assistant' }
        ];
        
        const marketStatus = computed(() => {
          const now = new Date();
          const hour = now.getHours();
          const day = now.getDay();
          
          // Simple market hours simulation (9 AM - 4 PM, weekdays)
          const isMarketHours = day >= 1 && day <= 5 && hour >= 9 && hour < 16;
          
          return isMarketHours 
            ? { text: 'Open', color: 'green', icon: 'mdi-circle' }
            : { text: 'Closed', color: 'red', icon: 'mdi-circle' };
        });
        
        return {
          localDrawer,
          navigationItems,
          marketStatus
        };
      }
    },
    
    Header: {
      template: `
        <v-app-bar 
          app 
          class="modern-header"
          color="transparent"
          flat
          height="60"
        >
          <div class="header-background"></div>
          <div class="header-content">
            <v-app-bar-nav-icon 
              @click="$emit('toggle-drawer')"
              class="nav-icon"
              color="white"
            />
            
            <v-toolbar-title class="text-h6 font-weight-bold brand-title">
              <v-icon class="mr-2 brand-icon" size="24">mdi-trending-up</v-icon>
              <span class="brand-text">FinanceHub</span>
            </v-toolbar-title>
            
            <v-spacer />
            
            <div class="search-container">
              <v-text-field
                v-model="searchQuery"
                prepend-inner-icon="mdi-magnify"
                label="Search markets, stocks, crypto..."
                single-line
                hide-details
                variant="solo"
                density="comfortable"
                class="modern-search"
                rounded="lg"
                style="max-width: 350px; backdrop-filter: blur(10px);"
                @keyup.enter="handleSearch"
              />
            </div>
            
            <div class="header-actions">
              <v-btn
                icon
                variant="text"
                class="notification-btn"
                color="white"
              >
                <v-badge
                  color="error"
                  content="3"
                  offset-x="2"
                  offset-y="2"
                >
                  <v-icon>mdi-bell</v-icon>
                </v-badge>
              </v-btn>
              
              <v-menu offset-y>
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    class="profile-btn"
                    variant="text"
                  >
                    <v-avatar size="32" class="profile-avatar">
                      <v-img
                        src="https://ui-avatars.com/api/?name=John+Doe&background=3B82F6&color=fff"
                        alt="Profile"
                      />
                    </v-avatar>
                    <div class="profile-info ml-2 d-none d-md-flex">
                      <div class="profile-name">John Doe</div>
                      <div class="profile-role">Investor</div>
                    </div>
                    <v-icon class="ml-1">mdi-chevron-down</v-icon>
                  </v-btn>
                </template>
            
                <v-list class="modern-dropdown" elevation="8">
                  <v-list-item class="user-info-item">
                    <div class="user-details">
                      <div class="user-name">John Doe</div>
                      <div class="user-email">john.doe@example.com</div>
                      <v-chip size="small" color="success" variant="tonal" class="mt-1">Pro Account</v-chip>
                    </div>
                  </v-list-item>
                  
                  <v-divider class="my-2"></v-divider>
                  
                  <v-list-item @click="$emit('navigate', '/profile')" class="dropdown-item">
                    <template v-slot:prepend>
                      <v-icon color="primary">mdi-account-circle</v-icon>
                    </template>
                    <v-list-item-title>Profile Settings</v-list-item-title>
                  </v-list-item>
                  
                  <v-list-item @click="$emit('navigate', '/settings')" class="dropdown-item">
                    <template v-slot:prepend>
                      <v-icon color="primary">mdi-cog</v-icon>
                    </template>
                    <v-list-item-title>Preferences</v-list-item-title>
                  </v-list-item>
                  
                  <v-list-item class="dropdown-item">
                    <template v-slot:prepend>
                      <v-icon color="warning">mdi-shield-check</v-icon>
                    </template>
                    <v-list-item-title>Security</v-list-item-title>
                  </v-list-item>
                  
                  <v-divider class="my-2"></v-divider>
                  
                  <v-list-item class="dropdown-item">
                    <template v-slot:prepend>
                      <v-icon color="error">mdi-logout</v-icon>
                    </template>
                    <v-list-item-title>Sign Out</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </div>
        </v-app-bar>
      `,
      
      emits: ['toggle-drawer', 'navigate'],
      
      setup() {
        const searchQuery = ref('');
        
        const handleSearch = () => {
          if (searchQuery.value.trim()) {
            console.log('Searching for:', searchQuery.value);
            // Here you would implement actual search functionality
          }
        };
        
        return {
          searchQuery,
          handleSearch
        };
      }
    },
    
    Footer: {
      template: `
        <v-footer color="grey-darken-3" class="text-center pa-4">
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <h6 class="text-h6 mb-2">Follow Us</h6>
                <v-btn
                  v-for="social in socialLinks"
                  :key="social.name"
                  :href="social.url"
                  icon
                  variant="text"
                  class="mx-1"
                  target="_blank"
                >
                  <v-icon>{{ social.icon }}</v-icon>
                </v-btn>
              </v-col>
              
              <v-col cols="12" md="4">
                <h6 class="text-h6 mb-2">Quick Links</h6>
                <div class="d-flex flex-column">
                  <v-btn
                    v-for="link in quickLinks"
                    :key="link.name"
                    :href="link.url"
                    variant="text"
                    size="small"
                    class="mb-1"
                  >
                    {{ link.name }}
                  </v-btn>
                </div>
              </v-col>
              
              <v-col cols="12" md="4">
                <h6 class="text-h6 mb-2">Legal</h6>
                <div class="d-flex flex-column">
                  <v-btn
                    v-for="legal in legalLinks"
                    :key="legal.name"
                    :href="legal.url"
                    variant="text"
                    size="small"
                    class="mb-1"
                  >
                    {{ legal.name }}
                  </v-btn>
                </div>
              </v-col>
            </v-row>
            
            <v-divider class="my-4" />
            
            <div class="text-center">
              <p class="mb-0">
                © {{ currentYear }} FinDash. All rights reserved.
              </p>
              <p class="text-caption mt-1">
                Professional financial dashboard for asset management and analytics.
              </p>
            </div>
          </v-container>
        </v-footer>
      `,
      
      setup() {
        const currentYear = computed(() => new Date().getFullYear());
        
        const socialLinks = [
          { name: 'Twitter', icon: 'mdi-twitter', url: 'https://twitter.com' },
          { name: 'LinkedIn', icon: 'mdi-linkedin', url: 'https://linkedin.com' },
          { name: 'Facebook', icon: 'mdi-facebook', url: 'https://facebook.com' },
          { name: 'Instagram', icon: 'mdi-instagram', url: 'https://instagram.com' }
        ];
        
        const quickLinks = [
          { name: 'Contact Us', url: '/contact' },
          { name: 'Support', url: '/support' },
          { name: 'API Documentation', url: '/api-docs' },
          { name: 'Blog', url: '/blog' }
        ];
        
        const legalLinks = [
          { name: 'Terms of Service', url: '/terms' },
          { name: 'Privacy Policy', url: '/privacy' },
          { name: 'Cookie Policy', url: '/cookies' },
          { name: 'Disclaimer', url: '/disclaimer' }
        ];
        
        return {
          currentYear,
          socialLinks,
          quickLinks,
          legalLinks
        };
      }
    },
    
    Home: {
      template: `
        <div>
          <LandingCarousel @navigate="$emit('navigate', $event)" />
          
          <v-container class="py-8">
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
                  @click="$emit('navigate', category.route)"
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
      `,
      
      emits: ['navigate'],
      
      setup() {
        const quickStats = [
          { title: 'Total Markets', value: '150+', icon: 'mdi-chart-line', color: 'primary' },
          { title: 'Asset Classes', value: '4', icon: 'mdi-view-grid', color: 'success' },
          { title: 'Real-time Data', value: '24/7', icon: 'mdi-clock-fast', color: 'warning' },
          { title: 'Global Coverage', value: '50+', icon: 'mdi-earth', color: 'info' }
        ];
        
        const assetCategories = [
          { name: 'Stocks', description: 'Equity markets and individual stock analysis', icon: 'mdi-trending-up', color: 'primary', route: '/stocks' },
          { name: 'Commodities', description: 'Precious metals, energy, and agricultural products', icon: 'mdi-gold', color: 'warning', route: '/commodities' },
          { name: 'Derivatives', description: 'Options, futures, and complex financial instruments', icon: 'mdi-chart-multiple', color: 'success', route: '/derivatives' },
          { name: 'Crypto', description: 'Digital currencies and blockchain assets', icon: 'mdi-bitcoin', color: 'orange', route: '/crypto' }
        ];
        
        return {
          quickStats,
          assetCategories
        };
      },
      
      components: {
        LandingCarousel: {
          template: `
            <div class="carousel-wrapper">
              <v-carousel
                height="400"
                cycle
                interval="5000"
                show-arrows="hover"
                hide-delimiter-background
              >
              <v-carousel-item
                v-for="(slide, index) in slides"
                :key="index"
                :src="slide.image"
                cover
              >
                <div class="carousel-content">
                  <v-container class="fill-height">
                    <v-row align="center" justify="center">
                      <v-col cols="12" md="8" class="text-center">
                        <h2 class="text-h3 font-weight-bold text-white mb-4">
                          {{ slide.title }}
                        </h2>
                        <p class="text-h6 text-white mb-6">
                          {{ slide.subtitle }}
                        </p>
                        <v-btn
                          @click="$emit('navigate', slide.route)"
                          color="primary"
                          size="large"
                          elevation="2"
                        >
                          {{ slide.actionText }}
                          <v-icon end>mdi-arrow-right</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </div>
              </v-carousel-item>
            </v-carousel>
            </div>
          `,
          
          emits: ['navigate'],
          
          setup() {
            const slides = [
              {
                title: 'Connect Your Brokerage Account',
                subtitle: 'Link your account to access real-time stock market data and portfolio tracking',
                actionText: 'Connect Stocks',
                route: '/stocks',
                image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
              },
              {
                title: 'Live Commodities Data',
                subtitle: 'Connect to commodity exchanges for real-time pricing on gold, oil, and agricultural products',
                actionText: 'Setup Commodities',
                route: '/commodities',
                image: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
              },
              {
                title: 'Derivatives Market Access',
                subtitle: 'Connect to options and futures exchanges for authentic derivatives pricing',
                actionText: 'Setup Derivatives',
                route: '/derivatives',
                image: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
              },
              {
                title: 'Cryptocurrency Exchange Integration',
                subtitle: 'Link your crypto exchange accounts for real-time digital asset tracking',
                actionText: 'Connect Crypto',
                route: '/crypto',
                image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
              }
            ];
            
            return { slides };
          }
        }
      }
    },
    
    Stocks: {
      template: `
        <v-container class="py-6">
          <v-row class="mb-6">
            <v-col cols="12">
              <div class="d-flex align-center mb-4">
                <v-icon color="primary" size="36" class="mr-3">mdi-trending-up</v-icon>
                <h1 class="text-h3 font-weight-bold">Stock Market</h1>
              </div>
              <p class="text-h6 text-grey-darken-1">
                Connect your brokerage account or API key to view real-time stock data
              </p>
            </v-col>
          </v-row>
          
          <v-row>
            <v-col cols="12">
              <v-card elevation="2" class="pa-6 text-center">
                <v-icon color="primary" size="64" class="mb-4">mdi-key-variant</v-icon>
                <h2 class="text-h5 font-weight-bold mb-4">Connect Your Data Source</h2>
                <p class="text-body-1 mb-6">
                  To display real-time stock market data, please connect your brokerage API or data provider
                </p>
                <v-btn color="primary" size="large" @click="requestApiConnection">
                  Connect Data Source
                </v-btn>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      `,
      
      setup() {
        const requestApiConnection = () => {
          // This would trigger a request for API keys from the user
          console.log('Requesting API connection for stock data');
        };
        
        return {
          requestApiConnection
        };
      }
    },
    
    Commodities: {
      template: `
        <v-container class="py-6">
          <v-row class="mb-6">
            <v-col cols="12">
              <div class="d-flex align-center mb-4">
                <v-icon color="warning" size="36" class="mr-3">mdi-gold</v-icon>
                <h1 class="text-h3 font-weight-bold">Commodities</h1>
              </div>
              <p class="text-h6 text-grey-darken-1">
                Connect to a commodities data provider to track precious metals, energy, and agricultural prices
              </p>
            </v-col>
          </v-row>
          
          <v-row>
            <v-col cols="12">
              <v-card elevation="2" class="pa-6 text-center">
                <v-icon color="warning" size="64" class="mb-4">mdi-database-off</v-icon>
                <h2 class="text-h5 font-weight-bold mb-4">Commodities Data Required</h2>
                <p class="text-body-1 mb-6">
                  Connect to a commodities data provider or API to view real-time precious metals, energy, and agricultural commodity prices
                </p>
                <v-btn color="warning" size="large" @click="requestCommoditiesApi">
                  Connect Commodities API
                </v-btn>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      `,
      
      setup() {
        const requestCommoditiesApi = () => {
          console.log('Requesting commodities API connection');
        };
        
        return {
          requestCommoditiesApi
        };
      }
    },
    
    Derivatives: {
      template: `
        <v-container class="py-6">
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
          
          <v-row>
            <v-col cols="12">
              <v-card elevation="2" class="pa-6 text-center">
                <v-icon color="success" size="64" class="mb-4">mdi-chart-timeline-variant</v-icon>
                <h2 class="text-h5 font-weight-bold mb-4">Derivatives Data Access</h2>
                <p class="text-body-1 mb-6">
                  Connect to your derivatives trading platform or data provider to view options, futures, and swaps
                </p>
                <v-btn color="success" size="large" @click="requestDerivativesApi">
                  Connect Trading Platform
                </v-btn>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      `,
      
      setup() {
        const requestDerivativesApi = () => {
          console.log('Requesting derivatives API connection');
        };
        
        return {
          requestDerivativesApi
        };
      }
    },
    
    CryptoCurrencies: {
      template: `
        <v-container class="py-6">
          <v-row class="mb-6">
            <v-col cols="12">
              <div class="d-flex align-center mb-4">
                <v-icon color="orange" size="36" class="mr-3">mdi-bitcoin</v-icon>
                <h1 class="text-h3 font-weight-bold">Cryptocurrencies</h1>
              </div>
              <p class="text-h6 text-grey-darken-1">
                Connect to cryptocurrency exchanges for real-time digital asset data
              </p>
            </v-col>
          </v-row>
          
          <v-row>
            <v-col cols="12">
              <v-card elevation="2" class="pa-6 text-center">
                <v-icon color="orange" size="64" class="mb-4">mdi-currency-btc</v-icon>
                <h2 class="text-h5 font-weight-bold mb-4">Crypto Exchange Connection</h2>
                <p class="text-body-1 mb-6">
                  Connect to your cryptocurrency exchange or API provider to view real-time digital asset prices and trading data
                </p>
                <v-btn color="orange" size="large" @click="requestCryptoApi">
                  Connect Exchange API
                </v-btn>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      `,
      
      setup() {
        const requestCryptoApi = () => {
          console.log('Requesting cryptocurrency API connection');
        };
        
        return {
          requestCryptoApi
        };
      }
    },
    
    Profile: {
      template: `
        <v-container class="py-6">
          <v-row>
            <v-col cols="12" md="8" offset-md="2" lg="6" offset-lg="3">
              <v-card elevation="2">
                <v-card-title class="text-h4 font-weight-bold text-center pa-6">
                  <v-icon color="primary" size="36" class="mr-3">mdi-account-circle</v-icon>
                  User Profile
                </v-card-title>
                
                <v-card-text class="pa-6">
                  <v-form>
                    <v-row>
                      <v-col cols="12" class="text-center mb-4">
                        <v-avatar size="120" color="primary">
                          <v-icon size="64">mdi-account</v-icon>
                        </v-avatar>
                        <div class="mt-4">
                          <v-btn color="primary" variant="outlined" size="small">
                            Change Photo
                          </v-btn>
                        </div>
                      </v-col>
                      
                      <v-col cols="12">
                        <h3 class="text-h6 font-weight-bold mb-4">Personal Information</h3>
                      </v-col>
                      
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="profile.firstName"
                          label="First Name"
                          variant="outlined"
                          prepend-inner-icon="mdi-account"
                        />
                      </v-col>
                      
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="profile.lastName"
                          label="Last Name"
                          variant="outlined"
                        />
                      </v-col>
                      
                      <v-col cols="12">
                        <v-text-field
                          v-model="profile.email"
                          label="Email Address"
                          type="email"
                          variant="outlined"
                          prepend-inner-icon="mdi-email"
                        />
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
                
                <v-card-actions class="pa-6">
                  <v-spacer />
                  <v-btn color="grey" variant="outlined" class="mr-4" @click="resetForm">
                    Reset
                  </v-btn>
                  <v-btn color="primary" @click="saveProfile">
                    Save Changes
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      `,
      
      setup() {
        const profile = ref({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com'
        });
        
        const saveProfile = () => {
          console.log('Saving profile:', profile.value);
        };
        
        const resetForm = () => {
          profile.value = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com'
          };
        };
        
        return {
          profile,
          saveProfile,
          resetForm
        };
      }
    },
    
    Settings: {
      template: `
        <v-container class="py-6">
          <v-row>
            <v-col cols="12" md="8" offset-md="2" lg="6" offset-lg="3">
              <v-card elevation="2">
                <v-card-title class="text-h4 font-weight-bold text-center pa-6">
                  <v-icon color="primary" size="36" class="mr-3">mdi-cog</v-icon>
                  Settings
                </v-card-title>
                
                <v-card-text class="pa-6">
                  <v-form>
                    <v-row>
                      <v-col cols="12">
                        <h3 class="text-h6 font-weight-bold mb-4">Display Settings</h3>
                      </v-col>
                      
                      <v-col cols="12">
                        <v-select
                          v-model="settings.theme"
                          :items="themes"
                          label="Theme"
                          variant="outlined"
                          prepend-inner-icon="mdi-palette"
                        />
                      </v-col>
                      
                      <v-col cols="12">
                        <v-select
                          v-model="settings.currency"
                          :items="currencies"
                          label="Default Currency"
                          variant="outlined"
                          prepend-inner-icon="mdi-currency-usd"
                        />
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
                
                <v-card-actions class="pa-6">
                  <v-spacer />
                  <v-btn color="grey" variant="outlined" class="mr-4" @click="resetSettings">
                    Reset
                  </v-btn>
                  <v-btn color="primary" @click="saveSettings">
                    Save Settings
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      `,
      
      setup() {
        const settings = ref({
          theme: 'Light',
          currency: 'USD'
        });
        
        const themes = ['Light', 'Dark', 'Auto'];
        const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];
        
        const saveSettings = () => {
          console.log('Saving settings:', settings.value);
        };
        
        const resetSettings = () => {
          settings.value = {
            theme: 'Light',
            currency: 'USD'
          };
        };
        
        return {
          settings,
          themes,
          currencies,
          saveSettings,
          resetSettings
        };
      }
    },
    
    AIAssistant: {
      template: `
        <v-container class="py-6">
          <v-row justify="center">
            <v-col cols="12" lg="10">
              <v-card elevation="2" class="mb-6">
                <v-card-title class="pa-6 bg-primary text-white">
                  <v-icon class="mr-3">mdi-robot</v-icon>
                  AI Financial Assistant
                </v-card-title>
                
                <v-card-text class="pa-6">
                  <v-row>
                    <v-col cols="12" md="8">
                      <div class="chat-container" style="height: 400px; overflow-y: auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 16px; background-color: #fafafa;">
                        <div v-for="(message, index) in messages" :key="index" class="mb-3">
                          <div :class="message.type === 'user' ? 'text-right' : 'text-left'">
                            <v-chip 
                              :color="message.type === 'user' ? 'primary' : 'grey-lighten-1'"
                              :text-color="message.type === 'user' ? 'white' : 'black'"
                              class="pa-3"
                              style="max-width: 80%; white-space: normal; height: auto;"
                            >
                              {{ message.text }}
                            </v-chip>
                          </div>
                        </div>
                        <div v-if="isTyping" class="text-left">
                          <v-chip color="grey-lighten-1" class="pa-3">
                            <v-progress-circular indeterminate size="16" class="mr-2"></v-progress-circular>
                            AI is typing...
                          </v-chip>
                        </div>
                      </div>
                      
                      <v-text-field
                        v-model="currentMessage"
                        label="Ask me about financial markets, investments, or trading strategies..."
                        variant="outlined"
                        class="mt-4"
                        append-inner-icon="mdi-send"
                        @click:append-inner="sendMessage"
                        @keyup.enter="sendMessage"
                        :disabled="isTyping"
                      />
                    </v-col>
                    
                    <v-col cols="12" md="4">
                      <v-card variant="outlined" class="mb-4">
                        <v-card-title class="text-h6">Quick Actions</v-card-title>
                        <v-card-text>
                          <v-btn 
                            v-for="action in quickActions" 
                            :key="action.text"
                            @click="sendQuickMessage(action.text)"
                            variant="outlined"
                            block
                            class="mb-2 quick-action-btn"
                            :disabled="isTyping"
                            height="auto"
                            style="white-space: normal; word-break: break-word; text-align: center; padding: 12px 16px;"
                          >
                            {{ action.text }}
                          </v-btn>
                        </v-card-text>
                      </v-card>
                      
                      <v-card variant="outlined">
                        <v-card-title class="text-h6">AI Capabilities</v-card-title>
                        <v-card-text>
                          <v-list density="compact">
                            <v-list-item>
                              <v-list-item-title>Market Analysis</v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>Investment Advice</v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>Risk Assessment</v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>Portfolio Optimization</v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card-text>
                
                <v-card-actions class="pa-6">
                  <v-btn color="grey" variant="outlined" @click="clearChat">
                    Clear Chat
                  </v-btn>
                  <v-spacer />
                  <v-btn color="primary" @click="connectToAI">
                    Connect to AI Service
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      `,
      
      setup() {
        const currentMessage = ref('');
        const isTyping = ref(false);
        const messages = ref([
          {
            type: 'assistant',
            text: 'Hello! I\'m your AI financial assistant. I can help you with market analysis, investment strategies, and financial planning. How can I assist you today?'
          }
        ]);
        
        const quickActions = [
          { text: 'Analyze current market trends' },
          { text: 'Suggest portfolio diversification' },
          { text: 'Explain cryptocurrency risks' },
          { text: 'Compare investment options' }
        ];
        
        const sendMessage = () => {
          if (!currentMessage.value.trim() || isTyping.value) return;
          
          messages.value.push({
            type: 'user',
            text: currentMessage.value
          });
          
          const userMessage = currentMessage.value;
          currentMessage.value = '';
          isTyping.value = true;
          
          // Simulate AI response
          setTimeout(() => {
            messages.value.push({
              type: 'assistant',
              text: getAIResponse(userMessage)
            });
            isTyping.value = false;
          }, 2000);
        };
        
        const sendQuickMessage = (message) => {
          currentMessage.value = message;
          sendMessage();
        };
        
        const getAIResponse = (userMessage) => {
          const responses = [
            'To provide accurate financial analysis, I need access to real-time market data APIs. Please connect your preferred financial data service.',
            'For personalized investment advice, I would need to access current market conditions through authenticated data sources.',
            'I can help analyze your portfolio once you connect to your brokerage API or financial data provider.',
            'To give you the most current market insights, please provide access to live financial data feeds.'
          ];
          return responses[Math.floor(Math.random() * responses.length)];
        };
        
        const clearChat = () => {
          messages.value = [
            {
              type: 'assistant',
              text: 'Hello! I\'m your AI financial assistant. I can help you with market analysis, investment strategies, and financial planning. How can I assist you today?'
            }
          ];
        };
        
        const connectToAI = () => {
          console.log('Requesting AI service connection');
          messages.value.push({
            type: 'assistant',
            text: 'To provide accurate financial assistance, I need access to external AI services and financial data APIs. Please provide the necessary API keys and configure your data sources.'
          });
        };
        
        return {
          currentMessage,
          isTyping,
          messages,
          quickActions,
          sendMessage,
          sendQuickMessage,
          clearChat,
          connectToAI
        };
      }
    }
  }
};

// Add custom CSS styles
const style = document.createElement('style');
style.textContent = `
  .v-app-bar {
    position: sticky !important;
    top: 0;
    z-index: 1000;
  }
  
  .v-main {
    padding-top: 0 !important;
  }
  
  .main-content {
    margin-top: 0; /* No space needed as app bar is positioned correctly */
  }
  
  .carousel-wrapper {
    margin-top: 0;
    position: relative;
    z-index: 1;
  }
  
  .v-carousel {
    margin-top: 0;
  }
  
  .carousel-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.4);
  }
  
  .carousel-content .v-container {
    height: 100%;
    display: flex;
    align-items: center;
  }
  
  .category-card {
    transition: transform 0.2s ease-in-out;
    cursor: pointer;
  }
  
  .category-card:hover {
    transform: translateY(-4px);
  }
  
  .search-field .v-field {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .search-field .v-field__input {
    color: white;
  }
  
  .search-field .v-field__input::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  .fab-ai-assistant {
    position: fixed !important;
    bottom: 24px;
    right: 24px;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .fab-ai-assistant:hover {
    transform: scale(1.1);
    transition: transform 0.2s ease-in-out;
  }
  
  .chat-container {
    scroll-behavior: smooth;
  }
  
  .chat-container::-webkit-scrollbar {
    width: 6px;
  }
  
  .chat-container::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  .chat-container::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }
  
  .chat-container::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
  
  /* Global Modern Styles */
  * {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .v-application {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
    min-height: 100vh;
  }
  
  /* Modern Header Styles */
  .modern-header {
    position: relative;
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .header-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%);
    backdrop-filter: blur(20px);
  }
  
  .header-content {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 20px;
    height: 60px;
  }
  
  .brand-title {
    color: white !important;
    font-weight: 700;
    background: linear-gradient(135deg, #60A5FA, #34D399);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .brand-icon {
    color: #60A5FA !important;
    filter: drop-shadow(0 0 8px rgba(96, 165, 250, 0.3));
  }
  
  .search-container {
    margin: 0 24px;
  }
  
  .modern-search .v-field__input {
    color: white !important;
  }
  
  .modern-search .v-field__input::placeholder {
    color: rgba(255, 255, 255, 0.6) !important;
  }
  
  .header-actions {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  
  .profile-btn {
    color: white !important;
    background: rgba(255, 255, 255, 0.1) !important;
    backdrop-filter: blur(10px);
    border-radius: 20px !important;
    padding: 4px 12px !important;
    height: 40px !important;
  }
  
  .profile-name {
    color: white;
    font-weight: 600;
    font-size: 0.8rem;
    line-height: 1.1;
  }
  
  .profile-role {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.7rem;
    line-height: 1.1;
  }
  
  .modern-dropdown {
    border-radius: 12px !important;
    backdrop-filter: blur(20px);
    background: rgba(255, 255, 255, 0.95) !important;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
    min-width: 250px;
    max-width: 280px;
  }
  
  .user-info-item {
    background: linear-gradient(135deg, #F8FAFC, #E2E8F0);
    border-radius: 12px;
    margin: 8px;
  }
  
  .user-name {
    font-weight: 600;
    color: #0F172A;
    font-size: 1rem;
  }
  
  .user-email {
    color: #64748B;
    font-size: 0.875rem;
  }
  
  .dropdown-item:hover {
    background: rgba(59, 130, 246, 0.08) !important;
    border-radius: 8px;
  }
  
  /* Modern Navigation Drawer */
  .modern-drawer {
    background: linear-gradient(180deg, #0F172A 0%, #1E293B 100%) !important;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .drawer-header {
    background: linear-gradient(135deg, #3B82F6, #1D4ED8);
    padding: 32px 24px;
    position: relative;
    overflow: hidden;
  }
  
  .brand-section {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 16px;
  }
  
  .brand-logo {
    width: 56px;
    height: 56px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(10px);
  }
  
  .brand-title {
    color: white;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
    line-height: 1.2;
  }
  
  .brand-subtitle {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.875rem;
    margin: 4px 0 0 0;
    line-height: 1.2;
  }
  
  .user-status-card {
    padding: 16px 24px 24px;
  }
  
  .status-card {
    background: rgba(255, 255, 255, 0.1) !important;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 16px !important;
  }
  
  .user-portfolio {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.875rem;
    margin: 2px 0;
  }
  
  .navigation-section {
    padding: 0 24px 24px;
  }
  
  .section-title {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 12px;
    padding-left: 8px;
  }
  
  .modern-nav-list {
    background: transparent !important;
  }
  
  .nav-item {
    margin-bottom: 8px !important;
    background: rgba(255, 255, 255, 0.05) !important;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease !important;
  }
  
  .nav-item:hover {
    background: rgba(255, 255, 255, 0.15) !important;
    transform: translateX(8px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  .nav-icon-container {
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #3B82F6, #1D4ED8);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
  
  .nav-title {
    color: white !important;
    font-weight: 500;
    margin-left: 12px;
  }
  
  .nav-arrow {
    color: rgba(255, 255, 255, 0.5) !important;
    transition: all 0.3s ease;
  }
  
  .nav-item:hover .nav-arrow {
    color: white !important;
    transform: translateX(4px);
  }
  
  .market-status-section {
    padding: 0 24px 24px;
  }
  
  .market-card {
    background: rgba(255, 255, 255, 0.1) !important;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 16px !important;
  }
  
  .status-label {
    color: rgba(255, 255, 255, 0.8);
    font-weight: 600;
    font-size: 0.875rem;
  }
  
  .market-stats {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 12px;
  }
  
  .stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .stat-label {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.875rem;
  }
  
  .stat-value {
    font-weight: 600;
    font-size: 0.875rem;
  }
  
  /* Main Content */
  .main-content {
    margin-top: 0;
    background: rgba(248, 250, 252, 0.95);
    backdrop-filter: blur(20px);
    min-height: calc(100vh - 60px);
  }
  
  .category-card {
    transition: all 0.3s ease !important;
    cursor: pointer;
    background: white !important;
    border-radius: 16px !important;
    border: 1px solid rgba(226, 232, 240, 0.8);
    backdrop-filter: blur(20px);
  }
  
  .category-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
    border-color: #3B82F6;
  }
  
  /* FAB Button */
  .fab-ai-assistant {
    position: fixed !important;
    bottom: 32px;
    right: 32px;
    z-index: 1000;
    background: linear-gradient(135deg, #3B82F6, #1D4ED8) !important;
    box-shadow: 0 10px 25px rgba(59, 130, 246, 0.4) !important;
    width: 64px !important;
    height: 64px !important;
  }
  
  .fab-ai-assistant:hover {
    transform: scale(1.1) !important;
    box-shadow: 0 20px 40px rgba(59, 130, 246, 0.6) !important;
    transition: all 0.3s ease !important;
  }
  
  .quick-action-btn {
    min-height: 48px !important;
    height: auto !important;
    white-space: normal !important;
    word-wrap: break-word !important;
    text-align: center !important;
    line-height: 1.4 !important;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(29, 78, 216, 0.05)) !important;
    border: 1px solid rgba(59, 130, 246, 0.2) !important;
    transition: all 0.3s ease !important;
  }
  
  .quick-action-btn:hover {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(29, 78, 216, 0.1)) !important;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
  }
  
  .quick-action-btn .v-btn__content {
    white-space: normal !important;
    word-wrap: break-word !important;
    overflow-wrap: break-word !important;
    hyphens: auto !important;
  }
  
  @media (max-width: 960px) {
    .header-content {
      padding: 0 16px;
      height: 60px;
    }
    
    .search-container {
      margin: 0 12px;
    }
    
    .brand-text {
      display: none;
    }
    
    .profile-info {
      display: none !important;
    }
    
    .profile-btn {
      padding: 4px 8px !important;
      height: 36px !important;
    }
    
    .modern-search {
      max-width: 200px !important;
    }
    
    .fab-ai-assistant {
      bottom: 24px !important;
      right: 24px !important;
      width: 56px !important;
      height: 56px !important;
    }
    
    .quick-action-btn {
      font-size: 0.875rem !important;
      padding: 10px 12px !important;
    }
  }
`;
document.head.appendChild(style);

// Create and mount the Vue app
const app = createApp(FinancialDashboardApp);
app.use(vuetify);
app.mount('#app');
