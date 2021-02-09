<template>
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

    <v-app-bar-nav-icon
      class="my-auto"
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>
    <v-navigation-drawer
      temporary
      absolute
      bottom
      src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
      v-model="drawer"
      height="300"
      width="300"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Пироженка
          </v-list-item-title>
          <!--            <v-list-item-subtitle>-->
          <!--              subtext-->
          <!--            </v-list-item-subtitle>-->
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list rounded nav dense>
        <v-list-item
          v-for="item in tabs"
          :key="item.name"
          :to="{name: item.name}"
          active-class="active"
          exact
        >
          <v-icon class="pr-3">{{ item.icon }}</v-icon>

          {{ item.title }}
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar-title class="my-auto d-none d-md-flex"
      >Пироженка</v-app-bar-title
    >

    <v-tabs class="ml-7" centered>
      <router-link
        v-for="item in tabs"
        :key="item.name"
        role="tab"
        class="v-tab"
        :to="{name: item.name}"
        exact
        active-class="v-tab--active"
        ><v-icon class="pr-3"> {{ item.icon }}</v-icon
        >{{ item.title }}</router-link
      >
    </v-tabs>
    <v-text-field
      prepend-icon="mdi-phone-classic"
      disabled
      value="+375 29 785 60 73"
      class="col-3"
    >
    </v-text-field>
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
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class Header extends Vue {
  private tabs = [
    {name: 'home', title: 'Домой', icon: 'mdi-home'},
    {name: 'about', title: 'О нас', icon: 'mdi-information-outline'},
    {name: 'calc', title: 'Калькулятор', icon: 'mdi-calculator'}
  ]
  private drawer = false
}
</script>
