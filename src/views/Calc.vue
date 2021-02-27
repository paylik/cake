<template>
  <div class="calc">
    <v-container>
      <v-row class="my-5">
        <v-col> <h1>Калькулятор</h1> </v-col>
        <v-col>
          <app-new-ingredient></app-new-ingredient>
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
            v-model="layerList"
            :headers="headers"
            :items="desserts"
            item-key="name"
            show-select
            class="elevation-5"
            hide-default-footer
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>
                  Калькулятор
                </v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="600">
                  <template v-slot: activator="{on, attrs}">
                    <v-btn color="success" dark class="mb-2" v-bind="attrs" v-on="on">
                      Добавить
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{formTitle}}</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedLayer.name" label="Hаименование">

                            </v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedLayer.description" label="Описание">

                            </v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model.number="editedLayer.price" label="Цена">

                            </v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-card-text> Выбрано </v-card-text>
                            <v-checkbox v-model="editedLayer.checked" color="success" hide-details>
                            </v-checkbox>
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
                    <v-card-title class="headline"> А ты уверен, что хочешь удалить?</v-card-title>
                    <v-card-actions>
                      <v-spacer>
                      </v-spacer>
                      <v-btn color="blue" text @click="closeDelete"> Отмена </v-btn>
                      <v-btn color="blue" text @click="deleteLayerConfirm"></v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon
                      class="mr-2"
                      @click="editLayer(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                      class="mr-2"
                      @click="deleteLayer(item)"
              >
                mdi-delete
              </v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize"> Очистить </v-btn>
            </template>
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
import EditLayerModal from '@/views/EditLayerModal.vue'

@Component({
  components: {
    appNewIngredient: NewIngredient,
    appEditLayerModal: EditLayerModal
  }
})
export default class Calc extends Vue {
  private bpm = 20
  private height = 10
  private desserts = this.$store.getters.ingredientList
  private layerList = this.$store.getters.layerList
  private kgPrice = this.$store.getters.kgPrice
  private cake = this.$store.getters.cake

  private dialog = false
  private dialogDelete = false

  private editedIndex = -1

  private editedLayer = new IngredientClass('','','',0,false)

  private defaultLayer = new IngredientClass('','','',0,false)

  get formTitle() {
    return this.editedIndex === -1 ? 'Новый слой' : 'Добавить слой'
  }

  get weight(): number {
    return (
      Math.floor((this.bpm * this.bpm * Math.PI * this.height * 1.25) / 100) /
      100
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
    {text: 'Описание', value: 'description'},
    {text: 'Стоимость', value: 'price'},
    {text: 'Ред.', value: 'actions', sortable: false}
  ]

  get total(): number {
    return this.layerList.reduce(function(sum: number, elem: IngredientClass) {
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
    this.desserts.slice(this.editedIndex, 1)
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
    if(this.editedIndex > -1) {
      Object.assign(this.desserts[this.editedIndex], this.editedLayer)
    } else {
      this.desserts.push(this.editedLayer)
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
