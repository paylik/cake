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
        <v-col>
          <v-btn class="success"> Добавить слой </v-btn>
        </v-col>
        <v-col>
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="desserts"
            item-key="name"
            show-select
            class="elevation-1"
          >
          </v-data-table>
        </v-col>
      </v-row>
      <hr />
      <v-row class="my-5">
        <v-col class="col-2">
          <v-card>
            <h3 class="text-center">200 руб.</h3>
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
import {Component, Vue} from 'vue-property-decorator'

@Component({
  components: {}
})
export default class Calc extends Vue {
  private layers = []
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
      protein: 0,
      price: '10'
    },
    {
      name: 'Глазурь',
      description:
        'Глазурь — кондитерский полуфабрикат, покрытие на поверхности кондитерских изделий',
      protein: 0,
      price: '0'
    },
    {
      name: 'Украшения',
      description: 'Цвтетные украшения из белого шоколада',
      protein: 0,
      price: '4'
    },
    {
      name: 'Свечи',
      description: 'Цифры или маленькие свечки',
      protein: 0,
      price: '1'
    },
    {
      name: 'Упаковка',
      description: 'Качественная картонная упаковка с пластиковым окошком',
      protein: 0,
      price: '3'
    }
  ]
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
}
</script>
