<template>
  <v-app>
    <v-app-bar
      class="col-lg-10 mx-auto pl-0"
      app
      fixed
      color="#43a047"
      dark
      shrink-on-scroll
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
      scroll-target="scrolling"
      scroll-threshold="500"
    >
      <template v-slot:img="{props}">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <!--      <v-app-bar-nav-icon class="my-auto"></v-app-bar-nav-icon>-->
      <v-app-bar-title class="my-auto d-sm-none d-md-flex"
        >Пироженка</v-app-bar-title
      >
      <!--      <v-img-->
      <!--        src="https://scontent-frt3-2.cdninstagram.com/v/t51.2885-19/s150x150/125489634_361831821582420_6370236198145764500_n.jpg?_nc_ht=scontent-frt3-2.cdninstagram.com&_nc_ohc=kqs8tA6-PokAX89x0st&tp=1&oh=959ba061e9097c36fa0c42999a7c9643&oe=60456800"-->
      <!--      ></v-img>-->

      <v-tabs class="ml-7" centered>
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
        <v-text-field
          prepend-icon="mdi-phone-classic"
          disabled
          value="+375 29 785 60 73"
          class="shrink"
        >
        </v-text-field>
      </v-tabs>

      <v-btn icon href="https://ok.ru/profile/514791907741" target="_blank">
        <v-img src="@/assets/odnoklassniki.png" class="mt-n6"></v-img>
      </v-btn>

      <v-btn icon href="https://www.instagram.com/natali0603_/" target="_blank">
        <v-img src="@/assets/insta.png" class="mt-n6"></v-img>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main id="scrolling" class="overflow-y-auto" max-height="600">
      <v-container
        ><v-row
          ><v-col md="11" class="col-lg-10 col-sm-12 mx-auto"
            ><router-view /></v-col
        ></v-row>
      </v-container>
    </v-main>
    <v-footer>
      <v-row
        ><v-col
          class="primary lighten-2 py-4 text-center white--text"
          cols="12"
        >
          Пироженка {{ new Date().getFullYear() }} —
          <strong>
            <a
              href="mailto:paylik@yandex.ru
        ?subject=Запрос%20Тортики%20Сморгонь
        &body=Запрос%20Тортики%20Сморгонь"
            >
              Разработка сайта: paylik@yandex.ru
            </a></strong
          >
        </v-col></v-row
      ></v-footer
    >
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App',

  components: {}
})
</script>
