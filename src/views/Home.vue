<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col class="elevation-5">
          <v-carousel>
            <v-carousel-item
              cycle
              v-for="(item, i) in items"
              :key="i"
              :src="item.src"
              reverse-transition="fade-transition"
              transition="fade-transition"
            ></v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col>
        <h1 class="py-6">Мы предлагаем:</h1>
        </v-col>
        <v-col>
          <v-btn class="success my-6">Добавить</v-btn>
        </v-col>
      </v-row>
      <v-row
        v-for="product in products"
        :key="product.description"
        class="elevation-5"
      >
        <v-col class="col-2">
          <v-img :src="product.image"></v-img>
        </v-col>
        <v-col class="col-10 my-auto">
          <h4>{{ product.description }}</h4>
          <router-link :to="'/product/' + product.name" >
            <v-btn class="success rounded" small >Подробнее</v-btn></router-link>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component({
  components: {}
})
export default class Home extends Vue {
  private items = [
    {
      src:
        'https://scontent-frt3-1.cdninstagram.com/v/t51.2885-15/e35/143637314_703985903596910_4814460802722014661_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=1016vfLgpfMAX_uBDNe&tp=1&oh=96fa64617db3bc6c020f015e7e401281&oe=6046B3EE'
    },
    {
      src:
        'https://scontent-frt3-2.cdninstagram.com/v/t51.2885-15/e35/140810122_210785107367379_7734523869048399837_n.jpg?_nc_ht=scontent-frt3-2.cdninstagram.com&_nc_cat=103&_nc_ohc=AucqrtHEIYQAX-0bKvh&tp=1&oh=b64585a2c32323d5398af218adc2b746&oe=604420A1'
    },
    {
      src:
        'https://scontent-frt3-1.cdninstagram.com/v/t51.2885-15/e35/140780074_197931298689810_2110891057850914148_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com&_nc_cat=106&_nc_ohc=UebY3GVV5M8AX-qOAE1&tp=1&oh=d6d8e3c97ed29ccd163213d1474bee49&oe=6047546A'
    },
    {
      src:
        'https://scontent-frt3-1.cdninstagram.com/v/t51.2885-15/e35/139002787_691289088209368_1324110568867373586_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=Ll8Zrn9xv6cAX96SwXu&tp=1&oh=7d78983db980070734c7068af7786a81&oe=6046C7C2'
    },
    {
      src:
        'https://scontent-frt3-2.cdninstagram.com/v/t51.2885-15/e35/135283767_403553100719139_848790047642578022_n.jpg?_nc_ht=scontent-frt3-2.cdninstagram.com&_nc_cat=103&_nc_ohc=fD1tg7CUOw4AX_oCMAG&tp=1&oh=deb1f71f0db003e1d42e80a022b30d9b&oe=6045C6CD'
    },
    {
      src:
        'https://scontent-frt3-1.cdninstagram.com/v/t51.2885-15/e35/136730020_4263123390369532_117041689864639206_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=h0Xo3SPyfBoAX-hPXB2&tp=1&oh=83735fe50f2bdedd03cc49d8261529f3&oe=60446D3E'
    },
    {
      src:
        'https://scontent-frt3-2.cdninstagram.com/v/t51.2885-15/e35/133919237_306493787466075_4450582325029381095_n.jpg?_nc_ht=scontent-frt3-2.cdninstagram.com&_nc_cat=103&_nc_ohc=yGzaiMgpPX0AX_5nZJv&tp=1&oh=10e32fab70c5ababec852b4be0440fcb&oe=6043B66D'
    },
    {
      src:
        'https://scontent-frt3-1.cdninstagram.com/v/t51.2885-15/e35/131394858_218280403150125_2019345363854513560_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com&_nc_cat=109&_nc_ohc=Y8rPy8FC7v0AX-jmoio&tp=1&oh=adf5fbdc329c63e7d730ebb764c9224f&oe=6044ABA9'
    },
    {
      src:
        'https://scontent-frt3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/125219249_690625261632140_887786302810645981_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=FKCFFwdVagcAX9lp2yc&tp=1&oh=e1cd744935041f5f71508017e790e5ff&oe=60475639'
    }
  ]
  private products = [
    {
      id: '1',
      name: 'cake',
      image:
        'https://scontent-frt3-2.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/125432494_388610018855067_6716365889788440693_n.jpg?_nc_ht=scontent-frt3-2.cdninstagram.com&_nc_cat=103&_nc_ohc=LN_CJLtH5aEAX90NdHA&tp=1&oh=e6ea34a2a99952e0c722dfa4e83ed96b&oe=604722D1',
      description:
        'Торты любого размера, цвета, наполнения и украшений. Более точную цену вы сможете узнать на строничке калькулятора.'
    },
    {
      id: '2',
      name: 'curd',
      image:
        'https://scontent-frx5-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/125520266_2853812301515472_6812759515572880815_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_cat=100&_nc_ohc=A4Pj4mfb1Y0AX-6n9ly&tp=1&oh=f9ef7ed8fafb288ba33b5a43800f9ca4&oe=6045AEED',
      description: 'Творожные десерты в стаканчике с разнообразной начинкой.'
    },
    {
      id: '3',
      name: 'smallCake',
      image:
        'https://scontent-frt3-1.cdninstagram.com/v/t51.2885-15/e35/131394858_218280403150125_2019345363854513560_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com&_nc_cat=109&_nc_ohc=Y8rPy8FC7v0AX-jmoio&tp=1&oh=adf5fbdc329c63e7d730ebb764c9224f&oe=6044ABA9',
      description: 'Индивидуальные и тематические пирожное на любой вкус.'
    }
  ]
}
</script>
