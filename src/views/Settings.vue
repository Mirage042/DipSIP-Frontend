<template>
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
                <!-- Account Settings -->
                <v-col cols="12">
                  <h3 class="text-h6 font-weight-bold mb-4">Account Settings</h3>
                </v-col>
                
                <v-col cols="12">
                  <v-text-field
                    v-model="settings.username"
                    label="Username"
                    variant="outlined"
                    prepend-inner-icon="mdi-account"
                    readonly
                  />
                </v-col>
                
                <v-col cols="12">
                  <v-btn
                    color="primary"
                    variant="outlined"
                    prepend-icon="mdi-lock-reset"
                    @click="changePassword"
                  >
                    Change Password
                  </v-btn>
                </v-col>
                
                <!-- Display Settings -->
                <v-col cols="12">
                  <h3 class="text-h6 font-weight-bold mb-4 mt-4">Display Settings</h3>
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
                
                <v-col cols="12">
                  <v-select
                    v-model="settings.language"
                    :items="languages"
                    label="Language"
                    variant="outlined"
                    prepend-inner-icon="mdi-translate"
                  />
                </v-col>
                
                <!-- Data & Privacy -->
                <v-col cols="12">
                  <h3 class="text-h6 font-weight-bold mb-4 mt-4">Data & Privacy</h3>
                </v-col>
                
                <v-col cols="12">
                  <v-switch
                    v-model="settings.dataSharing"
                    label="Allow anonymous usage data sharing"
                    color="primary"
                    inset
                  />
                </v-col>
                
                <v-col cols="12">
                  <v-switch
                    v-model="settings.cookiesAccepted"
                    label="Accept functional cookies"
                    color="primary"
                    inset
                  />
                </v-col>
                
                <v-col cols="12">
                  <v-btn
                    color="info"
                    variant="outlined"
                    prepend-icon="mdi-download"
                    @click="downloadData"
                  >
                    Download My Data
                  </v-btn>
                </v-col>
                
                <!-- Trading Settings -->
                <v-col cols="12">
                  <h3 class="text-h6 font-weight-bold mb-4 mt-4">Trading Settings</h3>
                </v-col>
                
                <v-col cols="12">
                  <v-switch
                    v-model="settings.twoFactorAuth"
                    label="Two-Factor Authentication"
                    color="primary"
                    inset
                  />
                </v-col>
                
                <v-col cols="12">
                  <v-switch
                    v-model="settings.tradingConfirmations"
                    label="Require confirmations for trades"
                    color="primary"
                    inset
                  />
                </v-col>
                
                <v-col cols="12">
                  <v-text-field
                    v-model="settings.dailyLimit"
                    label="Daily Trading Limit ($)"
                    type="number"
                    variant="outlined"
                    prepend-inner-icon="mdi-cash"
                  />
                </v-col>
                
                <!-- Danger Zone -->
                <v-col cols="12">
                  <v-divider class="my-6" />
                  <h3 class="text-h6 font-weight-bold mb-4 text-error">Danger Zone</h3>
                </v-col>
                
                <v-col cols="12">
                  <v-btn
                    color="error"
                    variant="outlined"
                    prepend-icon="mdi-delete"
                    @click="deleteAccount"
                  >
                    Delete Account
                  </v-btn>
                  <p class="text-caption text-grey-darken-1 mt-2">
                    This action cannot be undone. All your data will be permanently deleted.
                  </p>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          
          <v-card-actions class="pa-6">
            <v-spacer />
            <v-btn
              color="grey"
              variant="outlined"
              class="mr-4"
              @click="resetSettings"
            >
              Reset
            </v-btn>
            <v-btn
              color="primary"
              @click="saveSettings"
            >
              Save Settings
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Settings',
  setup() {
    const settings = ref({
      username: 'johndoe',
      theme: 'Light',
      currency: 'USD',
      language: 'English',
      dataSharing: false,
      cookiesAccepted: true,
      twoFactorAuth: false,
      tradingConfirmations: true,
      dailyLimit: 10000
    })
    
    const themes = ['Light', 'Dark', 'Auto']
    const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD']
    const languages = ['English', 'Spanish', 'French', 'German', 'Japanese']
    
    const saveSettings = () => {
      console.log('Saving settings:', settings.value)
      // Here you would implement settings saving
    }
    
    const resetSettings = () => {
      settings.value = {
        username: 'johndoe',
        theme: 'Light',
        currency: 'USD',
        language: 'English',
        dataSharing: false,
        cookiesAccepted: true,
        twoFactorAuth: false,
        tradingConfirmations: true,
        dailyLimit: 10000
      }
    }
    
    const changePassword = () => {
      console.log('Change password requested')
      // Here you would implement password change dialog
    }
    
    const downloadData = () => {
      console.log('Download data requested')
      // Here you would implement data download
    }
    
    const deleteAccount = () => {
      console.log('Delete account requested')
      // Here you would implement account deletion confirmation dialog
    }
    
    return {
      settings,
      themes,
      currencies,
      languages,
      saveSettings,
      resetSettings,
      changePassword,
      downloadData,
      deleteAccount
    }
  }
}
</script>
