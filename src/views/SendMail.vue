<template>
  <v-dialog v-model="dialogMail" persistent max-width="600">
    <template v-slot:activator="{on, attrs}">
      <v-btn color="primary" dark v-bind="attrs" v-on="on">
        Оформить заявку
      </v-btn>
    </template>
    <v-card v-model="valid" validation>
      <v-card-title class="headline">
        Оформление заявки
      </v-card-title>
      <v-card-text>
        <v-row v-for="layer in layerList" :key="layer.id">
          <v-col cols="6">{{ layer.name }}</v-col>
          <v-col cols="3" class="headline">{{ layer.price }}</v-col>
          <v-col cols="3">(бел. руб.)</v-col>
        </v-row>
        <v-row>
          <v-select
            :items="foundation"
            label="Основа"
            v-model="select"
          ></v-select>
        </v-row>
        <v-row>
          <v-select :items="colors" label="Основа" v-model="color"></v-select>
        </v-row>
        <v-row>
          <v-text-field
            auto-grow
            v-model="inscription"
            name="inscription"
            label="Надпись"
            type="text"
            :rules="[v => !!v || 'Надпись не задана']"
          >
          </v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            auto-grow
            v-model="phone"
            name="phone"
            label="Контактный телефон"
            type="number"
            :rules="[v => !!v || 'Телефон не указан']"
          >
          </v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            auto-grow
            v-model="address"
            name="address"
            label="Адрес доставки"
            type="text"
            :rules="[v => !!v || 'Адрес не указан']"
          >
          </v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            auto-grow
            v-model="name"
            name="name"
            label="Имя"
            type="text"
            :rules="[v => !!v || 'Имя не указано']"
          >
          </v-text-field>
        </v-row>
        <v-row>
          <v-col
            >Общая сумма заказа: <span class="headline">{{ total }}</span> (бел.
            руб.)
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider> </v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green"
          text
          @click="sendMail"
          :loading="loading"
          :disabled="!valid || loading"
        >
          Оформить заказ</v-btn
        >
        <v-btn color="red" text @click="onCancel"> Отмена</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {IngredientClass} from '@/store/ingredient'
import axios from 'axios'
import router from '@/router'

@Component
export default class SendMail extends Vue {
  @Prop() readonly layerList: Array<IngredientClass> = []
  @Prop() readonly total: number = 0
  @Prop() readonly diameter: number = 0
  @Prop() readonly height: number = 0
  @Prop() readonly weight: number = 0

  private ingredient = new IngredientClass('', '', '', 0, false)
  private valid = false
  private dialogMail = false

  private foundation = ['Бисквитный', 'Песочный', 'Медовый', 'Творожный']
  private select = 'Бисквитный'
  private colors = [
    'Красный',
    'Оранженый',
    'Желтый',
    'Зеленый',
    'Голубой',
    'Синий',
    'Фиолетовый',
    'Розовый'
  ]
  private color = 'Красный'
  private inscription = ''
  private phone = ''
  private address = ''
  private name = ''
  private layers = this.layerList.map(v => v.name)

  private sendMail(): void {
    axios
      .post('mail.php', {
        Слои: this.layers,
        Имя: this.name,
        Телефон: this.phone,
        Адрес: this.address,
        Основа: this.select,
        Цвет: this.color,
        Надпись: this.inscription,
        Диаметр: this.diameter,
        Высота: this.height,
        Вес: this.weight,
        Цена: this.total
      })
      .then(() => alert('Спасибо за заказ'))
      .then(() => this.$router.push('/'))
      .catch(error => {
        console.log(error)
      })
    this.dialogMail = false
  }

  private onCancel(): void {
    this.dialogMail = false
  }

  get loading(): boolean {
    return this.$store.getters.loading
  }
}
</script>

<style scoped></style>
