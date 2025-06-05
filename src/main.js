const { createApp, ref, computed, onMounted, onUnmounted } = Vue;
const { createVuetify } = Vuetify;

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#667eea',
          secondary: '#764ba2',
          accent: '#3B82F6',
          error: '#EF4444',
          info: '#06B6D4',
          success: '#10B981',
          warning: '#F59E0B',
          surface: '#FFFFFF',
          background: 'transparent',
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
      const component = routeComponentMap[route] || 'Home';
      currentView.value = component;
      window.history.pushState({}, '', route);
      
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
          class="glass modern-drawer"
          width="320"
          elevation="8"
        >
          <div class="drawer-header pa-4">
            <div class="d-flex align-center">
              <div class="brand-logo mr-3">
                <v-icon size="40" color="white">mdi-trending-up</v-icon>
              </div>
              <div>
                <h2 class="text-white font-weight-bold">FinanceHub</h2>
                <p class="text-grey-lighten-2 mb-0">Professional Trading Platform</p>
              </div>
            </div>
          </div>
          
          <v-list nav class="pa-2">
            <v-list-item
              v-for="item in navigationItems"
              :key="item.title"
              @click="$emit('navigate', item.route)"
              class="mb-1 glass-dark rounded-lg"
              color="white"
            >
              <template v-slot:prepend>
                <v-icon :icon="item.icon" color="white"></v-icon>
              </template>
              <v-list-item-title class="text-white">{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      `,
      
      props: {
        modelValue: Boolean
      },
      
      emits: ['update:modelValue', 'navigate'],
      
      setup(props, { emit }) {
        const localDrawer = computed({
          get: () => props.modelValue,
          set: (value) => emit('update:modelValue', value)
        });
        
        const navigationItems = [
          { title: 'Dashboard', icon: 'mdi-view-dashboard', route: '/' },
          { title: 'Stocks', icon: 'mdi-trending-up', route: '/stocks' },
          { title: 'Commodities', icon: 'mdi-gold', route: '/commodities' },
          { title: 'Derivatives', icon: 'mdi-chart-multiple', route: '/derivatives' },
          { title: 'CryptoCurrencies', icon: 'mdi-bitcoin', route: '/crypto' },
          { title: 'AI Assistant', icon: 'mdi-robot', route: '/ai-assistant' }
        ];
        
        return {
          localDrawer,
          navigationItems
        };
      }
    },
    
    Header: {
      template: `
        <v-app-bar 
          app 
          class="glass"
          color="transparent"
          flat
          height="60"
        >
          <v-app-bar-nav-icon 
            @click="$emit('toggle-drawer')"
            color="white"
          />
          
          <v-toolbar-title class="text-h6 font-weight-bold text-white">
            <v-icon class="mr-2" size="24" color="white">mdi-trending-up</v-icon>
            FinanceHub
          </v-toolbar-title>
          
          <v-spacer />
          
          <v-text-field
            v-model="searchQuery"
            prepend-inner-icon="mdi-magnify"
            label="Search markets..."
            single-line
            hide-details
            variant="solo"
            density="comfortable"
            class="mr-4 glass"
            style="max-width: 300px;"
          />
          
          <v-btn icon color="white">
            <v-badge color="error" content="3">
              <v-icon>mdi-bell</v-icon>
            </v-badge>
          </v-btn>
          
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" variant="text" color="white">
                <v-avatar size="32" class="mr-2">
                  <v-img src="https://ui-avatars.com/api/?name=John+Doe&background=3B82F6&color=fff" />
                </v-avatar>
                <span class="d-none d-md-inline">John Doe</span>
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            
            <v-list class="glass">
              <v-list-item @click="$emit('navigate', '/profile')">
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-account-circle</v-icon>
                </template>
                <v-list-item-title>Profile</v-list-item-title>
              </v-list-item>
              
              <v-list-item @click="$emit('navigate', '/settings')">
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-cog</v-icon>
                </template>
                <v-list-item-title>Settings</v-list-item-title>
              </v-list-item>
              
              <v-divider />
              
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="error">mdi-logout</v-icon>
                </template>
                <v-list-item-title>Sign Out</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-app-bar>
      `,
      
      emits: ['toggle-drawer', 'navigate'],
      
      setup() {
        const searchQuery = ref('');
        
        return {
          searchQuery
        };
      }
    },
    
    Home: {
      template: `
        <div class="home-container">
          <LandingCarousel />
          
          <v-container class="py-8">
            <v-row>
              <v-col cols="12" md="6" lg="3" v-for="category in categories" :key="category.title">
                <v-card @click="$emit('navigate', category.route)" class="glass hover-lift pa-4 text-center" style="cursor: pointer;">
                  <v-icon :color="category.color" size="48" class="mb-4">{{ category.icon }}</v-icon>
                  <h3 class="text-white mb-2">{{ category.title }}</h3>
                  <p class="text-grey-lighten-2">{{ category.description }}</p>
                  <v-chip :color="category.color" variant="tonal" class="mt-2">
                    {{ category.count }} Assets
                  </v-chip>
                </v-card>
              </v-col>
            </v-row>
            
            <v-row class="mt-8">
              <v-col cols="12">
                <v-card class="glass pa-6">
                  <h2 class="text-white mb-4">Connect Your Financial Data</h2>
                  <p class="text-grey-lighten-2 mb-4">To display authentic market data, please connect your preferred financial data provider or trading account.</p>
                  <v-btn color="primary" variant="elevated" @click="showConnectDialog = true">
                    Connect Data Source
                  </v-btn>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
          
          <v-dialog v-model="showConnectDialog" max-width="600">
            <v-card class="glass">
              <v-card-title class="text-white">Connect Financial Data Sources</v-card-title>
              <v-card-text class="text-grey-lighten-2">
                <p class="mb-4">To access real-time financial data, connect your preferred provider:</p>
                <v-list class="transparent">
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon color="primary">mdi-chart-line</v-icon>
                    </template>
                    <v-list-item-title class="text-white">Alpha Vantage API</v-list-item-title>
                    <v-list-item-subtitle>Real-time stock and forex data</v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon color="warning">mdi-bitcoin</v-icon>
                    </template>
                    <v-list-item-title class="text-white">CoinGecko API</v-list-item-title>
                    <v-list-item-subtitle>Cryptocurrency market data</v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon color="success">mdi-bank</v-icon>
                    </template>
                    <v-list-item-title class="text-white">Brokerage Account</v-list-item-title>
                    <v-list-item-subtitle>Connect your trading account</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn @click="showConnectDialog = false">Cancel</v-btn>
                <v-btn color="primary" @click="showConnectDialog = false">Connect</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      `,
      
      emits: ['navigate'],
      
      setup() {
        const showConnectDialog = ref(false);
        
        const categories = [
          {
            title: 'Stocks',
            description: 'Track equity markets and individual stocks',
            icon: 'mdi-trending-up',
            color: 'success',
            count: '2,500+',
            route: '/stocks'
          },
          {
            title: 'Commodities',
            description: 'Monitor precious metals and energy markets',
            icon: 'mdi-gold',
            color: 'warning',
            count: '150+',
            route: '/commodities'
          },
          {
            title: 'Derivatives',
            description: 'Analyze options, futures, and forex',
            icon: 'mdi-chart-multiple',
            color: 'info',
            count: '1,000+',
            route: '/derivatives'
          },
          {
            title: 'Crypto',
            description: 'Explore cryptocurrency markets',
            icon: 'mdi-bitcoin',
            color: 'primary',
            count: '500+',
            route: '/crypto'
          }
        ];
        
        return {
          categories,
          showConnectDialog
        };
      }
    },
    
    LandingCarousel: {
      template: `
        <v-carousel
          height="400"
          hide-delimiter-background
          show-arrows="hover"
          class="landing-carousel"
        >
          <v-carousel-item v-for="(slide, index) in slides" :key="index">
            <div class="carousel-slide d-flex align-center justify-center">
              <div class="carousel-overlay"></div>
              <div class="carousel-content text-center text-white">
                <v-icon size="80" class="mb-4">{{ slide.icon }}</v-icon>
                <h1 class="text-h3 font-weight-bold mb-4">{{ slide.title }}</h1>
                <p class="text-h6 mb-6">{{ slide.description }}</p>
                <v-btn
                  @click="$emit('navigate', slide.action.route)"
                  :color="slide.action.color"
                  size="large"
                  variant="elevated"
                >
                  {{ slide.action.text }}
                </v-btn>
              </div>
            </div>
          </v-carousel-item>
        </v-carousel>
      `,
      
      emits: ['navigate'],
      
      setup() {
        const slides = [
          {
            title: 'Professional Trading Platform',
            description: 'Connect your financial data sources for real-time market analysis',
            icon: 'mdi-trending-up',
            action: { text: 'Connect Data', route: '/stocks', color: 'success' }
          },
          {
            title: 'AI-Powered Insights',
            description: 'Get intelligent market analysis with OpenAI integration',
            icon: 'mdi-robot',
            action: { text: 'Try AI Assistant', route: '/ai-assistant', color: 'primary' }
          },
          {
            title: 'Comprehensive Portfolio',
            description: 'Track stocks, crypto, commodities, and derivatives',
            icon: 'mdi-chart-pie',
            action: { text: 'Setup Profile', route: '/profile', color: 'warning' }
          }
        ];
        
        return {
          slides
        };
      }
    },
    
    Stocks: {
      template: `
        <v-container class="py-8">
          <v-card class="glass pa-6">
            <h1 class="text-white mb-4">Stock Markets</h1>
            <p class="text-grey-lighten-2 mb-4">Connect your brokerage account or financial data API to view real-time stock market data and portfolio performance.</p>
            <v-btn color="primary" variant="elevated" @click="showConnectDialog = true">
              Connect Data Source
            </v-btn>
            
            <v-dialog v-model="showConnectDialog" max-width="500">
              <v-card class="glass">
                <v-card-title class="text-white">Connect Stock Data</v-card-title>
                <v-card-text class="text-grey-lighten-2">
                  To display authentic stock market data, please connect your preferred financial data provider:
                  <v-list class="transparent mt-4">
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon color="primary">mdi-api</v-icon>
                      </template>
                      <v-list-item-title class="text-white">Alpha Vantage API</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon color="warning">mdi-yahoo</v-icon>
                      </template>
                      <v-list-item-title class="text-white">Yahoo Finance API</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon color="success">mdi-bank</v-icon>
                      </template>
                      <v-list-item-title class="text-white">Brokerage Account</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn @click="showConnectDialog = false">Cancel</v-btn>
                  <v-btn color="primary" @click="showConnectDialog = false">Connect</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card>
        </v-container>
      `,
      
      setup() {
        const showConnectDialog = ref(false);
        
        return {
          showConnectDialog
        };
      }
    },
    
    Commodities: {
      template: `
        <v-container class="py-8">
          <v-card class="glass pa-6">
            <h1 class="text-white mb-4">Commodities Market</h1>
            <p class="text-grey-lighten-2 mb-4">Connect to commodity trading platforms or financial data providers for real-time precious metals, energy, and agricultural pricing.</p>
            <v-btn color="warning" variant="elevated" @click="showConnectDialog = true">
              Connect Data Provider
            </v-btn>
            
            <v-dialog v-model="showConnectDialog" max-width="500">
              <v-card class="glass">
                <v-card-title class="text-white">Connect Commodity Data</v-card-title>
                <v-card-text class="text-grey-lighten-2">
                  To access real-time commodity prices, connect your preferred data source:
                  <v-list class="transparent mt-4">
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon color="warning">mdi-database</v-icon>
                      </template>
                      <v-list-item-title class="text-white">Quandl API</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon color="info">mdi-chart-line</v-icon>
                      </template>
                      <v-list-item-title class="text-white">Commodity Trading Account</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn @click="showConnectDialog = false">Cancel</v-btn>
                  <v-btn color="warning" @click="showConnectDialog = false">Connect</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card>
        </v-container>
      `,
      
      setup() {
        const showConnectDialog = ref(false);
        
        return {
          showConnectDialog
        };
      }
    },
    
    Derivatives: {
      template: `
        <v-container class="py-8">
          <v-card class="glass pa-6">
            <h1 class="text-white mb-4">Derivatives Market</h1>
            <p class="text-grey-lighten-2 mb-4">Access options, futures, and forex data through institutional trading platforms for comprehensive derivatives analysis.</p>
            <v-btn color="info" variant="elevated" @click="showConnectDialog = true">
              Connect Trading Platform
            </v-btn>
            
            <v-dialog v-model="showConnectDialog" max-width="500">
              <v-card class="glass">
                <v-card-title class="text-white">Connect Derivatives Data</v-card-title>
                <v-card-text class="text-grey-lighten-2">
                  Connect your derivatives trading account for real-time data:
                  <v-list class="transparent mt-4">
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon color="primary">mdi-bank</v-icon>
                      </template>
                      <v-list-item-title class="text-white">Interactive Brokers</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon color="success">mdi-chart-multiple</v-icon>
                      </template>
                      <v-list-item-title class="text-white">TD Ameritrade</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon color="warning">mdi-currency-usd</v-icon>
                      </template>
                      <v-list-item-title class="text-white">CBOE Options Data</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn @click="showConnectDialog = false">Cancel</v-btn>
                  <v-btn color="info" @click="showConnectDialog = false">Connect</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card>
        </v-container>
      `,
      
      setup() {
        const showConnectDialog = ref(false);
        
        return {
          showConnectDialog
        };
      }
    },
    
    CryptoCurrencies: {
      template: `
        <v-container class="py-8">
          <v-card class="glass pa-6">
            <h1 class="text-white mb-4">Cryptocurrency Markets</h1>
            <p class="text-grey-lighten-2 mb-4">Connect your crypto exchange account or API for real-time cryptocurrency market data and portfolio tracking.</p>
            <v-btn color="primary" variant="elevated" @click="showConnectDialog = true">
              Connect Crypto Exchange
            </v-btn>
            
            <v-dialog v-model="showConnectDialog" max-width="500">
              <v-card class="glass">
                <v-card-title class="text-white">Connect Crypto Data</v-card-title>
                <v-card-text class="text-grey-lighten-2">
                  Connect your cryptocurrency exchange for live data:
                  <v-list class="transparent mt-4">
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon color="primary">mdi-bitcoin</v-icon>
                      </template>
                      <v-list-item-title class="text-white">Coinbase Pro API</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon color="warning">mdi-currency-btc</v-icon>
                      </template>
                      <v-list-item-title class="text-white">Binance API</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon color="info">mdi-chart-areaspline</v-icon>
                      </template>
                      <v-list-item-title class="text-white">CoinGecko API</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn @click="showConnectDialog = false">Cancel</v-btn>
                  <v-btn color="primary" @click="showConnectDialog = false">Connect</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card>
        </v-container>
      `,
      
      setup() {
        const showConnectDialog = ref(false);
        
        return {
          showConnectDialog
        };
      }
    },
    
    AIAssistant: {
      template: `
        <v-container class="py-8">
          <v-card class="glass pa-6 mb-6">
            <h1 class="text-white mb-4">AI Financial Assistant</h1>
            <p class="text-grey-lighten-2">Get intelligent insights and analysis powered by AI. Connect your OpenAI API key for enhanced functionality.</p>
          </v-container>
          
          <v-row>
            <v-col cols="12" lg="8">
              <v-card class="glass chat-container" height="500">
                <v-card-title class="text-white border-b">
                  <v-icon class="mr-2">mdi-robot</v-icon>
                  AI Assistant
                </v-card-title>
                
                <v-card-text class="chat-messages pa-4" style="height: 400px; overflow-y: auto;">
                  <div v-for="message in messages" :key="message.id" class="mb-4">
                    <div :class="['message', message.sender === 'user' ? 'user-message' : 'ai-message']">
                      <div class="message-content glass-dark pa-3 rounded-lg">
                        <p class="text-white mb-0">{{ message.text }}</p>
                        <small class="text-grey-lighten-2">{{ message.time }}</small>
                      </div>
                    </div>
                  </div>
                </v-card-text>
                
                <v-card-actions class="pa-4">
                  <v-text-field
                    v-model="newMessage"
                    @keyup.enter="sendMessage"
                    placeholder="Ask about markets, analysis, or trading strategies..."
                    variant="outlined"
                    hide-details
                    class="glass"
                    append-inner-icon="mdi-send"
                    @click:append-inner="sendMessage"
                  />
                </v-card-actions>
              </v-card>
            </v-col>
            
            <v-col cols="12" lg="4">
              <v-card class="glass pa-4 mb-4">
                <h3 class="text-white mb-4">Quick Actions</h3>
                <v-btn
                  v-for="action in quickActions"
                  :key="action.text"
                  @click="sendQuickMessage(action.text)"
                  block
                  variant="outlined"
                  color="white"
                  class="mb-2 responsive-text"
                >
                  <v-icon start>{{ action.icon }}</v-icon>
                  {{ action.text }}
                </v-btn>
              </v-card>
              
              <v-card class="glass pa-4">
                <h3 class="text-white mb-4">Setup Required</h3>
                <p class="text-grey-lighten-2 mb-4">Connect your OpenAI API key in Settings to enable AI functionality.</p>
                <v-btn @click="$emit('navigate', '/settings')" color="primary" variant="elevated" block>
                  Go to Settings
                </v-btn>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      `,
      
      emits: ['navigate'],
      
      setup() {
        const messages = ref([
          {
            id: 1,
            sender: 'ai',
            text: 'Hello! I am your AI financial assistant. To provide personalized insights, please connect your OpenAI API key in settings.',
            time: new Date().toLocaleTimeString()
          }
        ]);
        
        const newMessage = ref('');
        
        const quickActions = [
          { text: 'Market Analysis', icon: 'mdi-chart-line' },
          { text: 'Portfolio Review', icon: 'mdi-briefcase' },
          { text: 'Risk Assessment', icon: 'mdi-shield-check' },
          { text: 'Trading Signals', icon: 'mdi-signal' }
        ];
        
        const sendMessage = () => {
          if (!newMessage.value.trim()) return;
          
          messages.value.push({
            id: Date.now(),
            sender: 'user',
            text: newMessage.value,
            time: new Date().toLocaleTimeString()
          });
          
          setTimeout(() => {
            messages.value.push({
              id: Date.now() + 1,
              sender: 'ai',
              text: 'I need an OpenAI API key to provide detailed analysis. Please connect your API key in settings to enable full AI capabilities.',
              time: new Date().toLocaleTimeString()
            });
          }, 1000);
          
          newMessage.value = '';
        };
        
        const sendQuickMessage = (text) => {
          newMessage.value = text;
          sendMessage();
        };
        
        return {
          messages,
          newMessage,
          quickActions,
          sendMessage,
          sendQuickMessage
        };
      }
    },
    
    Profile: {
      template: `
        <v-container class="py-8">
          <v-card class="glass pa-6">
            <h1 class="text-white mb-6">User Profile</h1>
            
            <v-row>
              <v-col cols="12" md="4">
                <div class="text-center">
                  <v-avatar size="120" class="mb-4">
                    <v-img src="https://ui-avatars.com/api/?name=John+Doe&background=3B82F6&color=fff&size=120" />
                  </v-avatar>
                  <h2 class="text-white">John Doe</h2>
                  <p class="text-grey-lighten-2">Professional Investor</p>
                  <v-chip color="success" variant="tonal">Pro Account</v-chip>
                </div>
              </v-col>
              
              <v-col cols="12" md="8">
                <v-form>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        label="First Name"
                        value="John"
                        variant="outlined"
                        class="glass"
                      />
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        label="Last Name"
                        value="Doe"
                        variant="outlined"
                        class="glass"
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Email"
                        value="john.doe@example.com"
                        variant="outlined"
                        class="glass"
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-btn color="primary" variant="elevated">
                        Update Profile
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-col>
            </v-row>
          </v-card>
        </v-container>
      `
    },
    
    Settings: {
      template: `
        <v-container class="py-8">
          <v-card class="glass pa-6">
            <h1 class="text-white mb-6">Settings</h1>
            
            <v-row>
              <v-col cols="12" md="6">
                <h3 class="text-white mb-4">API Configuration</h3>
                <p class="text-grey-lighten-2 mb-4">Connect your API keys to enable real-time data and AI functionality.</p>
                <v-text-field
                  label="OpenAI API Key"
                  type="password"
                  variant="outlined"
                  class="glass mb-4"
                  placeholder="sk-..."
                  hint="Required for AI Assistant functionality"
                  persistent-hint
                />
                <v-text-field
                  label="Alpha Vantage API Key"
                  type="password"
                  variant="outlined"
                  class="glass mb-4"
                  placeholder="Enter your API key"
                  hint="For stock market data"
                  persistent-hint
                />
                <v-text-field
                  label="CoinGecko API Key"
                  type="password"
                  variant="outlined"
                  class="glass mb-4"
                  placeholder="Enter your API key"
                  hint="For cryptocurrency data"
                  persistent-hint
                />
                <v-btn color="primary" variant="elevated">
                  Save API Keys
                </v-btn>
              </v-col>
              
              <v-col cols="12" md="6">
                <h3 class="text-white mb-4">Preferences</h3>
                <v-switch
                  label="Enable notifications"
                  color="primary"
                  class="mb-2"
                />
                <v-switch
                  label="Dark mode"
                  color="primary"
                  class="mb-2"
                />
                <v-switch
                  label="Auto-refresh data"
                  color="primary"
                  class="mb-4"
                />
                <v-btn color="success" variant="elevated">
                  Save Preferences
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-container>
      `
    }
  }
};

// Initialize the app
const app = createApp(FinancialDashboardApp);
app.use(vuetify);
app.mount('#app');