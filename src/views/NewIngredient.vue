<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <template v-slot:activator="{on, attrs}">
      <v-btn color="primary" dark v-bind="attrs" v-on="on">
        Добавить
      </v-btn>
    </template>
    <v-card v-model="valid" validation>
      <v-card-title class="headline">
        <v-text-field
          v-model="ingredient.name"
          label="Наименование"
          type="text"
          :rules="[v => !!v || 'Наименование не задано']"
        ></v-text-field>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-textarea
            auto-grow
            v-model="ingredient.description"
            name="description"
            label="Описание"
            type="text"
            :rules="[v => !!v || 'Описание не задано']"
            multiline
          >
          </v-textarea>
        </v-row>
        <v-row>
          <v-text-field
            auto-grow
            v-model.number="ingredient.price"
            name="price"
            label="Цена"
            type="number"
            :rules="[v => !!v || 'Цена не задана']"
          >
          </v-text-field>
        </v-row>
      </v-card-text>
      <v-divider> </v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green"
          text
          @click="createIngredient"
          :loading="loading"
          :disabled="!valid || loading"
        >
          Добавить</v-btn
        >
        <v-btn color="yelow" text @click="onCancel"> Отмена</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {IngredientClass} from '@/store/ingredient'

@Component
export default class NewIngredient extends Vue {
  private ingredient = new IngredientClass('', '', '', '')
  private valid = false
  private dialog = false

  private createIngredient(): void {
    this.$store.dispatch('createIngredient', this.ingredient)
    this.dialog = false
  }

  private onCancel(): void {
    this.dialog = false
  }

  get loading(): boolean {
    return this.$store.getters.loading
  }
}
</script>

<style scoped></style>
