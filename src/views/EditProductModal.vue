<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <template v-slot:activator="{on, attrs}">
      <v-btn color="primary" dark v-bind="attrs" v-on="on">
        Редактировать
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
        <v-img max-height="150" max-width="350" :src="newImg" class="mx-auto">
        </v-img>
        <v-row>
          <v-file-input
            accept="image/*"
            label="Выберите файл"
            prepend-icon="mdi-camera"
            @change="onFileChange($event)"
          >
          </v-file-input>
        </v-row>
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
import {ProductClass} from '@/store/product'

@Component
export default class EditProductModal extends Vue {
  @Prop(ProductClass) readonly product!: ProductClass

  private valid = false
  private dialog = false
  private editedName = this.product.name
  private editedDescription = this.product.description
  private editedImg = this.product.img
  private newImg: string | ArrayBuffer | File | null = this.editedImg

  private onFileChange(event: any): void {
    const file = event.name
    if (file !== undefined) {
      const reader = new FileReader()
      reader.readAsDataURL(event)
      reader.onload = () => {
        this.editedImg = event
        this.newImg = reader.result
      }
    }
  }

  private onSave(): void {
    this.$store.dispatch('updateProduct', {
      id: this.product.id,
      name: this.editedName,
      description: this.editedDescription,
      img: this.editedImg
      // image: this.editedImg,
    })

    this.dialog = false
  }

  private onCancel(): void {
    this.dialog = false
    this.editedName = this.product.name
    this.editedDescription = this.product.description
    this.editedImg = this.product.img
  }
}
</script>

<style scoped></style>
