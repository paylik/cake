<template>
  <v-app>
    <v-app-bar
      class="col-lg-10 mx-auto"
      app
      fixed
      color="#43a047"
      dark
      shrink-on-scroll
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
      scroll-threshold="500"
    >
      <template v-slot:img="{props}">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-app-bar-title class="flex-shrink-0">Пироженка</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-tabs align-with-title>
        <router-link
          role="tab"
          class="v-tab"
          :to="{name: 'home'}"
          exact
          active-class="v-tab--active"
          >Главная</router-link
        ><router-link
          role="tab"
          class="v-tab"
          :to="{name: 'about'}"
          active-class="v-tab--active"
          >О нас</router-link
        ><router-link
          role="tab"
          class="v-tab"
          :to="{name: 'calc'}"
          active-class="v-tab--active"
          >Калькулятор</router-link
        >
      </v-tabs>

      <v-btn icon>
        <v-img src="@/assets/odnoklassniki.png" class="mt-n6"></v-img>
      </v-btn>

      <v-btn icon>
        <v-img src="@/assets/insta.png" class="mt-n6"></v-img>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main
      class="col-lg-10 mx-auto overflow - y - auto"
      id="scrolling-techniques-5"
      max-height="600"
    >
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App',

  components: {},

  data: () => ({
    //
  })
})
</script>
