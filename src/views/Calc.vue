<template>
  <div class="calc">
    <v-container>
      <v-row class="my-5">
        <v-col> <h1>Калькулятор</h1> </v-col>
        <v-col>
          <app-new-ingredient></app-new-ingredient>
          {{ cake }}
          {{ cakePrice }}
        </v-col>
      </v-row>
      <hr />
      <v-row class="my-5">
        <v-col class="col-md-4 d-none d-md-flex">
          <v-img
            class="mx-auto"
            src="https://scontent-frt3-1.cdninstagram.com/v/t51.2885-15/e35/137296470_951107405706801_4544090276522456318_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com&_nc_cat=109&_nc_ohc=jP576RcJs44AX-QHMt5&tp=1&oh=6d2d43bfd3cf282fc9f039239cf6390f&oe=60402B8F"
          />
        </v-col>
        <v-col class=" col-md-8 col-sm-11 mx-auto">
          <v-data-table
            v-model="layers"
            :headers="headers"
            :items="desserts"
            item-key="name"
            show-select
            class="elevation-5"
            hide-default-footer
          >
          </v-data-table>
          <v-card class="mx-auto my-0 elevation-5">
            <v-card-text>
              <v-row class="mb-4" justify="space-between">
                <v-col class="text-left">
                  <span
                    class="display-1 font-weight-light"
                    v-text="`Диаметр - ` + bpm"
                  ></span>
                  <span class="display-1 font-weight-light">см.</span>
                </v-col>
                <v-col class="text-right"> </v-col>
              </v-row>

              <v-slider
                v-model="bpm"
                :color="color"
                track-color="grey"
                always-dirty
                min="10"
                max="40"
              >
                <template v-slot:prepend>
                  <v-icon :color="color" @click="decrement">
                    mdi-minus
                  </v-icon>
                </template>

                <template v-slot:append>
                  <v-icon :color="color" @click="increment">
                    mdi-plus
                  </v-icon>
                </template>
              </v-slider>
            </v-card-text>
          </v-card>
          <v-card class="mx-auto elevation-5">
            <v-card-text>
              <v-row class="mb-4" justify="space-between">
                <v-col class="text-left">
                  <span
                    class="display-1 font-weight-light"
                    v-text="`Высота - ` + height"
                  ></span>
                  <span class="display-1 font-weight-light">см.</span>
                </v-col>
                <v-col class="text-right"> </v-col>
              </v-row>

              <v-slider
                v-model="height"
                :color="color"
                track-color="grey"
                always-dirty
                min="5"
                max="20"
              >
                <template v-slot:prepend>
                  <v-icon :color="color" @click="decrementHeight">
                    mdi-minus
                  </v-icon>
                </template>

                <template v-slot:append>
                  <v-icon :color="color" @click="incrementHeight">
                    mdi-plus
                  </v-icon>
                </template>
              </v-slider>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <hr />
      <v-row class="my-5">
        <v-col class="col-6 col-md-4">
          <v-card class="elevation-5">
            <h3 class="text-center">{{ total }} руб.</h3>
          </v-card>
        </v-col>
        <v-col class="col-6 col-md-4">
          <v-card class="elevation-5">
            <h3 class="text-center">{{ weight }} кг.</h3>
          </v-card>
        </v-col>
        <v-col class="col-12 col-md-4">
          <v-btn class="success elevation-5"> Отправить заявку </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator'
import NewIngredient from '@/views/NewIngredient.vue'
import {IngredientClass} from '@/store/ingredient'

@Component({
  components: {appNewIngredient: NewIngredient}
})
export default class Calc extends Vue {
  private bpm = 20
  private height = 10
  private desserts = this.$store.getters.ingredientList

  get weight(): number {
    return (
      Math.floor((this.bpm * this.bpm * Math.PI * this.height * 1.25) / 100) /
      100
    )
  }

  private headers = [
    {
      text: 'Ингредиенты',
      align: 'start',
      sortable: false,
      value: 'name'
    },
    {text: 'Описание', value: 'description'},
    {text: 'Стоимость', value: 'price'}
  ]

  @Watch('cakePrice')
  onChange() {
    this.cake = this.cakePrice
  }

  // private layersTypes = {
  //   biscuit: {
  //     prise1sm: 1,
  //     label: 'Бисквит'
  //   },
  //   bese: {
  //     prise1sm: 2,
  //     label: 'Безе'
  //   },
  //   curd: {
  //     prise1sm: 1,
  //     label: 'Творожный'
  //   }
  // }

  private layers = this.desserts.slice(0, 2)

  get total(): number {
    return this.layers.reduce(function(sum: number, elem: IngredientClass) {
      return sum + elem.price
    }, 0)
  }

  get color() {
    if (this.bpm < 20) return 'indigo'
    if (this.bpm < 25) return 'teal'
    if (this.bpm < 30) return 'green'
    if (this.bpm < 35) return 'orange'
    return 'red'
  }

  private decrement(): void {
    this.bpm--
  }
  private increment(): void {
    this.bpm++
  }
  private decrementHeight(): void {
    this.height--
  }
  private incrementHeight(): void {
    this.height++
  }

  mounted() {
    const cake = this.desserts.find(h => h.id === '-MU42gDBYiea6maSf-jM')

    const cakePrice = +(this.weight * this.cake.price).toFixed(2)
  }
}
</script>

<style>
.mdi-checkbox-marked::before {
  color: green;
}
</style>
