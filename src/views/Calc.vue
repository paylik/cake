<template>
  <div class="calc">
    <v-container>
      <v-row class="my-5">
        <v-col class="col-md-4 d-none d-md-flex">
          <v-img
            class="mx-auto"
            src="https://scontent-frt3-1.cdninstagram.com/v/t51.2885-15/e35/137296470_951107405706801_4544090276522456318_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com&_nc_cat=109&_nc_ohc=jP576RcJs44AX-QHMt5&tp=1&oh=6d2d43bfd3cf282fc9f039239cf6390f&oe=60402B8F"
          />
        </v-col>
        <v-col class=" col-md-8 col-sm-11 mx-auto">
          <v-data-table
            v-model="layerList"
            :headers="headers"
            :items="desserts"
            item-key="name"
            show-select
            class="elevation-5"
            hide-default-footer
            mobile-breakpoint="0"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>
                  Калькулятор
                </v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="600" v-if="isUserLogin">
                  <template v-slot:activator="{on, attrs}">
                    <v-btn
                      color="success"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                    >
                      Добавить
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col>
                            <v-text-field
                              v-model="editedLayer.name"
                              label="Hаименование"
                              :rules="[v => !!v || 'Наименование не задано']"
                            >
                            </v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-text-field
                              v-model="editedLayer.description"
                              label="Описание"
                              :rules="[v => !!v || 'Описание не задано']"
                            >
                            </v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-text-field
                              v-model.number="editedLayer.price"
                              label="Цена"
                              :rules="[v => !!v || 'Цена не задана']"
                              type="number"
                            >
                            </v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-checkbox
                              v-model="editedLayer.checked"
                              color="success"
                              hide-details
                              class="float-left"
                            >
                            </v-checkbox>
                            <v-card-text>
                              Выбрано
                            </v-card-text>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="success" text @click="close">Отмена</v-btn>
                      <v-btn color="success" text @click="save">Записать</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="600">
                  <v-card>
                    <v-card-title class="headline">
                      А ты уверен, что хочешь удалить?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer> </v-spacer>
                      <v-btn color="blue" text @click="closeDelete">
                        Отмена
                      </v-btn>
                      <v-btn color="blue" text @click="deleteLayerConfirm"
                        >Удалить</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{item}">
              <v-icon class="mr-2" @click="editLayer(item)">
                mdi-pencil
              </v-icon>
              <v-icon class="mr-2" @click="deleteLayer(item)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>

          <v-card class="mx-auto my-0 elevation-5">
            <v-card-text>
              <v-row class="mb-4" justify="space-between">
                <v-col class="text-left">
                  <span
                    class="display-1 font-weight-light"
                    v-text="`Диаметр - ` + diameter"
                  ></span>
                  <span class="display-1 font-weight-light">см.</span>
                </v-col>
              </v-row>

              <v-slider
                v-model="diameter"
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
          <app-send-mail
            :layer-list="layerList"
            :total="total"
            :diameter="diameter"

            :height="height"
            :weight="weight"
          ></app-send-mail>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator'
import SendMail from '@/views/SendMail.vue'
import {IngredientClass} from '@/store/ingredient'

@Component({
  components: {
    appSendMail: SendMail
  }
})
export default class Calc extends Vue {

  private diameter = 20
  private height = 10
  private desserts = this.$store.getters.ingredientList
  private layerList = this.$store.getters.layerList
  private kgPrice = this.$store.getters.kgPrice
  private cake = this.$store.getters.cake
  private isUserLogin = this.$store.getters.isUserLogin
  private dialog = false
  private dialogDelete = false

  private editedIndex = -1

  private editedLayer: IngredientClass = new IngredientClass(
    '',
    '',
    '',
    0,
    false
  )

  private defaultLayer: IngredientClass = new IngredientClass(
    '',
    '',
    '',
    0,
    false
  )

  get formTitle() {
    return this.editedIndex === -1 ? 'Новый слой' : 'Редактировать слой'
  }

  get weight(): number {
    return (
      Math.floor(
        (this.diameter * this.diameter * Math.PI * this.height * 1.25) / 100
      ) / 100
    )
  }
  @Watch('layerList.length')
  onLayers() {
    this.cake = this.$store.getters.cake
    this.kgPrice = this.$store.getters.kgPrice
    this.cake.price = +(this.weight * this.kgPrice).toFixed(2)
  }
  @Watch('weight')
  onChange() {
    this.cake.price = +(this.weight * this.kgPrice).toFixed(2)
  }

  private headers = [
    {
      text: 'Ингредиенты',
      align: 'start',
      sortable: false,
      value: 'name'
    },
    {text: 'Описание', value: 'description', cellClass: 'hidden-xs-only', class: 'd-none d-sm-block'},
    {text: 'Стоимость', value: 'price'}
  ]

  // get headers() {
  //   if(this.isUserLogin) {
  //     this.header.push({text: 'Ред.', value: 'actions'})
  //     return this.header
  //   } else {
  //   return this.header
  // }}

  mounted() {

    if(this.isUserLogin) {
      this.headers.push({text: 'Ред.', value: 'actions'})
    }

    this.$nextTick()
  }

  get total(): number {
    return this.layerList.reduce(function(sum: number, elem: IngredientClass) {
      return sum + elem.price
    }, 0)
  }

  get color() {
    if (this.diameter < 20) return 'indigo'
    if (this.diameter < 25) return 'teal'
    if (this.diameter < 30) return 'green'
    if (this.diameter < 35) return 'orange'
    return 'red'
  }

  private decrement(): void {
    this.diameter--
  }
  private increment(): void {
    this.diameter++
  }
  private decrementHeight(): void {
    this.height--
  }
  private incrementHeight(): void {
    this.height++
  }

  private editLayer(dessert: IngredientClass): void {
    this.editedIndex = this.desserts.indexOf(dessert)
    this.editedLayer = Object.assign({}, dessert)
    this.dialog = true
  }
  private deleteLayer(dessert: IngredientClass): void {
    this.editedIndex = this.desserts.indexOf(dessert)
    this.editedLayer = Object.assign({}, dessert)
    this.dialogDelete = true
  }
  private deleteLayerConfirm() {
    this.desserts.splice(this.editedIndex, 1)
    this.$store.dispatch('deleteIngredient', this.editedLayer.id)
    this.closeDelete()
  }
  private close() {
    this.dialog = false
    this.$nextTick(() => {
      this.editedLayer = Object.assign({}, this.defaultLayer)
      this.editedIndex = -1
    })
  }
  private closeDelete() {
    this.dialogDelete = false
    this.$nextTick(() => {
      this.editedLayer = Object.assign({}, this.defaultLayer)
      this.editedIndex = -1
    })
  }
  private save() {
    if (this.editedIndex > -1) {
      // Object.assign(this.desserts[this.editedIndex], this.editedLayer)
      this.$store.dispatch('updateIngredient', this.editedLayer)
    } else {
      this.$store.dispatch('createIngredient', this.editedLayer)
    }
    this.close()
  }
}
</script>

<style>
.mdi-checkbox-marked::before {
  color: green;
}
</style>
