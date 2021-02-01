<template>
  <div class="calc">
    <v-container>
      <v-row class="my-5">
        <v-col> <h1>Калькулятор</h1> </v-col>
      </v-row>
      <hr />
      <v-row class="my-5">
        <v-col>
          <v-btn class="success"> Добавить слой </v-btn>
        </v-col>
      </v-row>
      <hr />
      <v-row class="my-5">
        <v-col class="col-6">
          <v-img
            class="mx-auto"
            src="https://scontent-frt3-1.cdninstagram.com/v/t51.2885-15/e35/137296470_951107405706801_4544090276522456318_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com&_nc_cat=109&_nc_ohc=jP576RcJs44AX-QHMt5&tp=1&oh=6d2d43bfd3cf282fc9f039239cf6390f&oe=60402B8F"
            max-width="400"
          />
        </v-col>
        <v-col>
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
          <v-card class="mx-auto my-0" max-width="800">
            <v-card-text>
              <v-row class="mb-4" justify="space-between">
                <v-col class="text-left">
                  <span
                    class="display-1 font-weight-light"
                    v-text="`Диаметр-` + bpm"
                    >Диаметр</span
                  >
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
          <v-card class="mx-auto" max-width="800">
            <v-card-text>
              <v-row class="mb-4" justify="space-between">
                <v-col class="text-left">
                  <span
                    class="display-1 font-weight-light"
                    v-text="`Высота-` + height"
                    >Диаметр</span
                  >
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
                  <v-icon :color="color" @click="decrementH">
                    mdi-minus
                  </v-icon>
                </template>

                <template v-slot:append>
                  <v-icon :color="color" @click="incrementH">
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
        <v-col class="col-2">
          <v-card>
            <h3 class="text-center">{{ total }} руб.</h3>
          </v-card>
        </v-col>
        <v-col class="col-2">
          <v-card>
            <h3 class="text-center">{{ weight }} кг.</h3>
          </v-card>
        </v-col>
        <v-col>
          <v-btn class="success"> Отправить заявку </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator'
import {$internalHooks} from 'vue-class-component/lib/component'

@Component({
  components: {}
})
export default class Calc extends Vue {
  private bpm = 20
  private height = 10

  get weight(): number {
    return (
      Math.floor((((this.bpm * this.bpm) / 4) * Math.PI * this.height) / 100) /
      100
    )
  }

  get cakePrice() {
    return +(this.weight * 18).toFixed(2)
  }
  private headers = [
    {
      text: 'Ингредиенты',
      align: 'start',
      sortable: false,
      value: 'name'
    },
    {text: 'Описание', value: 'description'},
    {text: 'Protein (g)', value: 'protein'},
    {text: 'Стоимость', value: 'price'}
  ]
  private desserts = [
    {
      name: 'Основа торта',
      description:
        'Бисквитные торты. Торты из бисквитного теста получаются пышными и нежными.',
      selected: true,
      price: this.cakePrice
    },
    {
      name: 'Глазурь',
      description:
        'Глазурь — кондитерский полуфабрикат, покрытие на поверхности кондитерских изделий',
      protein: 0,
      price: 0
    },
    {
      name: 'Украшения',
      description: 'Цвтетные украшения из белого шоколада',
      protein: 0,
      price: 4
    },
    {
      name: 'Свечи',
      description: 'Цифры или маленькие свечки',
      protein: 0,
      price: 1
    },
    {
      name: 'Упаковка',
      description: 'Качественная картонная упаковка с пластиковым окошком',
      protein: 0,
      price: 3
    }
  ]
  private cake: any = this.desserts.find(h => h.name === 'Основа торта')

  @Watch('cakePrice')
  onCange(weight: number, cake: any) {
    this.cake.price = this.cakePrice
  }

  private layersTypes = {
    biscuit: {
      prise1sm: 1,
      label: 'Бисквит'
    },
    bese: {
      prise1sm: 2,
      label: 'Безе'
    },
    curd: {
      prise1sm: 1,
      label: 'Творожный'
    }
  }
  private layers = this.desserts.slice(0, 2)
  get total(): number {
    return this.layers.reduce(function(sum: number, elem: any) {
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
  private decrementH(): void {
    this.bpm--
  }
  private incrementH(): void {
    this.bpm++
  }
}
</script>

<style>
.mdi-checkbox-marked::before {
  color: green;
}
</style>
