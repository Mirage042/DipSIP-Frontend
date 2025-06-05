<template>
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
                @click="navigateToPage(slide.actionRoute)"
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
</template>

<script>
export default {
  name: 'LandingCarousel',
  emits: ['navigate'],
  data() {
    return {
      slides: [
        {
          title: 'Connect Your Brokerage Account',
          subtitle: 'Link your account to access real-time stock market data and portfolio tracking',
          actionText: 'Connect Stocks',
          actionRoute: '/stocks',
          image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
        },
        {
          title: 'Live Commodities Data',
          subtitle: 'Connect to commodity exchanges for real-time pricing on gold, oil, and agricultural products',
          actionText: 'Setup Commodities',
          actionRoute: '/commodities',
          image: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
        },
        {
          title: 'Derivatives Market Access',
          subtitle: 'Connect to options and futures exchanges for authentic derivatives pricing',
          actionText: 'Setup Derivatives',
          actionRoute: '/derivatives',
          image: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
        },
        {
          title: 'Cryptocurrency Exchange Integration',
          subtitle: 'Link your crypto exchange accounts for real-time digital asset tracking',
          actionText: 'Connect Crypto',
          actionRoute: '/crypto',
          image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
        }
      ]
    }
  },
  methods: {
    navigateToPage(route) {
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>
.carousel-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0.6) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
