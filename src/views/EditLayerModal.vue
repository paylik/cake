<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <template v-slot:activator="{on, attrs}">
      <v-btn color="primary" dark v-bind="attrs" v-on="on">
        <v-icon>mdi-table-edit</v-icon>
      </v-btn>
    </template>
    <v-card v-model="valid" validation>
      <v-card-title class="headline">
        <v-text-field
          v-model="editedName"
          name="title"
          label="Заголовок"
          type="text"
          :rules="[v => !!v || 'Заглавие не задано']"
        >
        </v-text-field>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-textarea
            auto-grow
            v-model="editedDescription"
            name="description"
            label="Описание"
            type="text"
            :rules="[v => !!v || 'Описание не задано']"
            multiline
          >
          </v-textarea>
        </v-row>
        <v-row>
          <v-textarea
            auto-grow
            v-model.number="editedPrice"
            name="price"
            label="Цена"
            type="number"
            :rules="[v => !!v || 'Цена не задана']"
            multiline
          >
          </v-textarea>
        </v-row>
        <v-row>
          <v-card-text>По умолчанию</v-card-text>
          <v-checkbox v-model="editedСhecked" color="success" hide-details>
          </v-checkbox>
        </v-row>
      </v-card-text>
      <v-divider> </v-divider>
      <v-card-actions>
        <v-spacer> </v-spacer>
        <v-btn color="green darken-1" text @click="onSave" :disabled="!valid">
          Сохранить
        </v-btn>
        <v-btn color="yelow" text @click="onCancel">
          Отменить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import {IngredientClass} from '@/store/ingredient'

@Component
export default class EditLayerModal extends Vue {
  @Prop(IngredientClass) readonly ingredient!: IngredientClass

  private valid = false
  private dialog = false
  private editedName = this.ingredient.name
  private editedDescription = this.ingredient.description
  private editedPrice = this.ingredient.price
  private editedСhecked = this.ingredient.checked

  private onSave(): void {
    this.$store.dispatch('updateIngredient', {
      id: this.ingredient.id,
      name: this.editedName,
      description: this.editedDescription,
      price: this.editedPrice,
      checked: this.editedСhecked
    })

    this.dialog = false
  }

  private onCancel(): void {
    this.dialog = false
    this.editedName = this.ingredient.name
    this.editedDescription = this.ingredient.description
    this.editedPrice = this.ingredient.price
    this.editedСhecked = this.ingredient.checked
  }
}
</script>

<style scoped></style>
