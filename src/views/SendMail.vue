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
      {{ layers }}
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {IngredientClass} from '@/store/ingredient'
import emailjs from 'emailjs-com'

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
  private layers = this.layerList.map(v => v['name'])

  private sendMail(): void {
    emailjs
      .send(
        'service_cccujca',
        'template_vey7hrm',
        {
          layers: this.layers,
          name: this.name,
          phone: this.phone,
          address: this.address,
          select: this.select,
          color: this.color,
          inscription: this.inscription,
          diameter: this.diameter,
          height: this.height,
          weight: this.weight,
          total: this.total
        },
        'user_Xd6nHWJFHD8ULYlJ9QG7O'
      )
      .then(
        function(response) {
          console.log('SUCCESS!', response.status, response.text)
        },
        function(error) {
          console.log('FAILED...', error)
        }
      )

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
