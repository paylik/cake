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
import {Vue, Component} from 'vue-property-decorator'
import Header from '@/components/Header.vue'
@Component({
  components: {
    Header
  }
})
export default class App extends Vue {}
</script>
