<template>
  <v-app>
    <Header />
    <v-main id="scrolling" class="overflow-y-auto" max-height="600">
      <v-container
        ><v-row
          ><v-col md="11" class="col-lg-10 col-sm-12 mx-auto"
            ><router-view /></v-col
        ></v-row>
      </v-container>
    </v-main>
    <Footer />
    <v-snackbar
      v-model="snackbar"
      :timeout="5000"
      :multi-line="true"
      @input="closeError"
      v-if="error"
    >
      {{ error }}

      <template v-slot:action="{attrs}">
        <v-btn color="pink" text v-bind="attrs" @click.native="closeError">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import Header from '@/components/Header.vue'
import firebase from 'firebase'
import Footer from '@/components/Footer.vue'
@Component({
  components: {
    Header,
    Footer
  }
})
export default class App extends Vue {
  @Prop(String)
  readonly id!: string

  private drawer = false

  private snackbar = true

  get error(): string {
    return this.$store.getters.error
  }

  get loading(): boolean {
    return this.$store.getters.loading
  }

  private closeError(): void {
    this.$store.dispatch('clearError')
    this.snackbar = false
  }

  created(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyCcwHJB-TC5j_sHM35NqXlGW4SR0_3Ypf8',
      authDomain: 'vue-shop-22584.firebaseapp.com',
      databaseURL: 'https://vue-shop-22584.firebaseio.com',
      projectId: 'vue-shop-22584',
      storageBucket: 'vue-shop-22584.appspot.com',
      messagingSenderId: '687339852851',
      appId: '1:687339852851:web:2f372b59a200794761ff46',
      measurementId: 'G-MXME18L0K3'
    })

    firebase.analytics()
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })
    this.$store.dispatch('fetchIngredients')
    this.$store.dispatch('fetchProducts')
    this.$store.dispatch('fetchLayers')
  }
}
</script>
