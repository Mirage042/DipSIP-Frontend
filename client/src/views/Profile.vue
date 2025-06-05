<template>
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
                <!-- Profile Picture -->
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
                
                <!-- Personal Information -->
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
                
                <v-col cols="12">
                  <v-text-field
                    v-model="profile.phone"
                    label="Phone Number"
                    variant="outlined"
                    prepend-inner-icon="mdi-phone"
                  />
                </v-col>
                
                <!-- Investment Preferences -->
                <v-col cols="12">
                  <h3 class="text-h6 font-weight-bold mb-4 mt-4">Investment Preferences</h3>
                </v-col>
                
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="profile.riskTolerance"
                    :items="riskLevels"
                    label="Risk Tolerance"
                    variant="outlined"
                    prepend-inner-icon="mdi-chart-line-variant"
                  />
                </v-col>
                
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="profile.investmentGoal"
                    :items="investmentGoals"
                    label="Investment Goal"
                    variant="outlined"
                    prepend-inner-icon="mdi-target"
                  />
                </v-col>
                
                <v-col cols="12">
                  <v-select
                    v-model="profile.preferredAssets"
                    :items="assetClasses"
                    label="Preferred Asset Classes"
                    variant="outlined"
                    multiple
                    chips
                    prepend-inner-icon="mdi-view-grid"
                  />
                </v-col>
                
                <!-- Notifications -->
                <v-col cols="12">
                  <h3 class="text-h6 font-weight-bold mb-4 mt-4">Notification Preferences</h3>
                </v-col>
                
                <v-col cols="12">
                  <v-switch
                    v-model="profile.emailNotifications"
                    label="Email Notifications"
                    color="primary"
                    inset
                  />
                </v-col>
                
                <v-col cols="12">
                  <v-switch
                    v-model="profile.priceAlerts"
                    label="Price Alerts"
                    color="primary"
                    inset
                  />
                </v-col>
                
                <v-col cols="12">
                  <v-switch
                    v-model="profile.marketNews"
                    label="Market News Updates"
                    color="primary"
                    inset
                  />
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
              @click="resetForm"
            >
              Reset
            </v-btn>
            <v-btn
              color="primary"
              @click="saveProfile"
            >
              Save Changes
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
  name: 'Profile',
  setup() {
    const profile = ref({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      riskTolerance: 'Moderate',
      investmentGoal: 'Long-term Growth',
      preferredAssets: ['Stocks', 'Crypto'],
      emailNotifications: true,
      priceAlerts: true,
      marketNews: false
    })
    
    const riskLevels = [
      'Conservative',
      'Moderate',
      'Aggressive'
    ]
    
    const investmentGoals = [
      'Capital Preservation',
      'Income Generation',
      'Long-term Growth',
      'Speculation'
    ]
    
    const assetClasses = [
      'Stocks',
      'Commodities',
      'Derivatives',
      'Crypto'
    ]
    
    const saveProfile = () => {
      console.log('Saving profile:', profile.value)
      // Here you would implement profile saving
    }
    
    const resetForm = () => {
      // Reset to default values
      profile.value = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        riskTolerance: 'Moderate',
        investmentGoal: 'Long-term Growth',
        preferredAssets: ['Stocks', 'Crypto'],
        emailNotifications: true,
        priceAlerts: true,
        marketNews: false
      }
    }
    
    return {
      profile,
      riskLevels,
      investmentGoals,
      assetClasses,
      saveProfile,
      resetForm
    }
  }
}
</script>
