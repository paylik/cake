<template>
    <v-footer>
        <v-row
        ><v-col
                class="primary lighten-2 py-4 text-center white--text"
                cols="12"
        >
            Пироженка {{ new Date().getFullYear() }} —
            <v-dialog
                    transition="dialog-bottom-transition"
                    max-width="600"
                    v-model="dialogMyMail"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                            color="primary"
                            v-bind="attrs"
                            v-on="on"
                    >Разработка сайта: paylik@yandex.ru</v-btn>
                </template>
                <template v-slot:default="dialog">
                    <v-card>
                        <v-toolbar
                                color="primary"
                                dark
                        >Разработка сайта:
                        </v-toolbar>
                        <v-card-text>
                            <v-row class="subtitle-1 mt-3">
                            Если Вас интересует разработка сайта,<br>
                                то вы можете связаться со мной:<br>
                            - по телефону: +375 (29) 11 88 166<br>
                            - написать мне на почту: paylik@yandex.ru<br>
                            - или заполнить и отправить эту форму:
                            </v-row>
                            <v-form ref="form" lazy-validation>
                                <v-text-field
                                        v-model="name"
                                        :counter="10"
                                        :rules="nameRules"
                                        label="Имя"
                                        required
                                        name="user_name"
                                ></v-text-field>

                                <v-text-field
                                        v-model="email"
                                        :rules="emailRules"
                                        label="E-mail"
                                        required
                                        type="email"
                                        name="user_email"
                                ></v-text-field>
                                <v-text-field
                                        auto-grow
                                        v-model="phone"
                                        name="phone"
                                        label="Контактный телефон"
                                        type="number"
                                        :rules="[v => !!v || 'Телефон не указан']"
                                ></v-text-field>
                                <v-textarea
                                v-model="message"
                                name="message"
                                :rules="messageRules"
                                label="Сообщение"
                                required
                                type="text"
                                ></v-textarea>


                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                                    text
                                    @click="dialog.value = false"
                            >Отмена</v-btn>
                            <v-btn
                                    :disabled="!valid"
                                    color="success"
                                    class="mr-4"
                                    @click="sendMyEmail"
                            >
                                Отправить
                            </v-btn>
                        </v-card-actions>

                    </v-card>
                </template>
            </v-dialog>
        </v-col>
        </v-row>
    </v-footer>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import emailjs from 'emailjs-com'
    import {IngredientClass} from '@/store/ingredient'

    @Component
  export default class Footer extends Vue{

      private dialogMyMail = false
      private valid = true
      private name = ''
      private nameRules = [
        (v: string) => !!v || 'Name is required',
        (v: string) => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ]
      private message = ''
      private messageRules = [
        (v: string) => !!v || 'Name is required',
        (v: string) => (v && v.length <= 100) || 'Name must be less than 100 characters',
      ]
      private email = ''
      private phone = ''
      private emailRules = [
        (v: string) => !!v || 'E-mail is required',
        (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ]
      get error(): string {
        return this.$store.getters.error
      }

      private sendMyEmail(): void {
        emailjs
          .send(
            'service_cccujca',
            'template_vu60tyx',
            {
              name: this.name,
              phone: this.phone,
              email: this.email,
              message: this.message
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
        this.dialogMyMail = false
        this.$store.dispatch('setError', 'Спасибо за обращение. Я скоро с Вами свяжусь.')
        setTimeout(() => this.$store.dispatch('setError', null), 5000)
    }
  }
</script>



<style scoped>

</style>