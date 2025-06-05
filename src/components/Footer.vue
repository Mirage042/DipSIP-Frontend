<template>
  <v-footer color="grey-darken-3" class="text-center pa-4">
    <v-container>
      <v-row>
        <!-- Social Media Links -->
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
        
        <!-- Quick Links -->
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
        
        <!-- Legal -->
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
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'Footer',
  setup() {
    const currentYear = computed(() => new Date().getFullYear())
    
    const socialLinks = [
      { name: 'Twitter', icon: 'mdi-twitter', url: 'https://twitter.com' },
      { name: 'LinkedIn', icon: 'mdi-linkedin', url: 'https://linkedin.com' },
      { name: 'Facebook', icon: 'mdi-facebook', url: 'https://facebook.com' },
      { name: 'Instagram', icon: 'mdi-instagram', url: 'https://instagram.com' }
    ]
    
    const quickLinks = [
      { name: 'Contact Us', url: '/contact' },
      { name: 'Support', url: '/support' },
      { name: 'API Documentation', url: '/api-docs' },
      { name: 'Blog', url: '/blog' }
    ]
    
    const legalLinks = [
      { name: 'Terms of Service', url: '/terms' },
      { name: 'Privacy Policy', url: '/privacy' },
      { name: 'Cookie Policy', url: '/cookies' },
      { name: 'Disclaimer', url: '/disclaimer' }
    ]
    
    return {
      currentYear,
      socialLinks,
      quickLinks,
      legalLinks
    }
  }
}
</script>
