<template>
  <v-container class="col-10 col-md-6">
    <v-form ref="form" v-model="valid" validation>
      <v-text-field
        v-model="name"
        :counter="10"
        :rules="nameRules"
        label="Логин"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="Пароль"
        required
      ></v-text-field>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="onSubmit">
        Войти
      </v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component({
  components: {}
})
export default class Login extends Vue {
  private valid = true
  private name = ''
  private nameRules = [
    (v: string) => !!v || 'Имя не задано',
    (v: string) =>
      (v && v.length >= 10) || 'Имя не должно быть менее 10 символов'
  ]
  private password = ''
  private passwordRules = [
    (v: string) => !!v || 'Пароль не задан',
    (v: string) =>
      (v && v.length >= 8) || 'Пароль не должен быть менее 8 символов'
  ]
  private onSubmit(): void {
    if ((this.$refs.form as Vue & {validate: () => boolean}).validate()) {
      const user = {
        name: this.name,
        password: this.password
      }
      this.$store
        .dispatch('loginUser', user)
        .then(() => this.$router.push('/'))
        .catch(() => console.log(this.name))
    }
  }
  private loading(): void {
    return this.$store.getters.loading
  }
}
</script>

<style scoped></style>
