<template>
  <div>
    <v-container>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-row>
          <v-col>
            <v-text-field
              v-model="product.name"
              name="name"
              label="Добавить заглавие"
              :rules="[v => !!v || 'Имя не определено']"
            >
            </v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-file-input
              accept="image/*"
              type="file"
              label="Выберите файл"
              prepend-icon="mdi-camera"
              @change="onFileChange"
            >
            </v-file-input>
          </v-col>
        </v-row>
        <v-row class="subtitle 1">
          <v-textarea
            auto-grow
            v-model="product.description"
            label="Добавить описание"
            type="text"
            multiline
            counter="300"
            required
            :rules="[v => !!v || 'Описание не задано']"
          ></v-textarea>
        </v-row>
        <v-row>
          <v-col class="text-h2">
            {{ product.name }}
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-img
              max-height="350"
              max-width="650"
              :src="newImg"
              class="mx-auto"
              v-model="newImg"
            >
            </v-img>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            {{ product.description }}
          </v-col>
        </v-row>
        <v-row>
          <v-btn
            class="warning mx-auto"
            @click="createProduct"
            :loading="loading"
            :disabled="!valid || loading"
          >
            Добавить
          </v-btn>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import product, {ProductClass} from '@/store/product'

const img = new File(['@/assets/noFoto.jpg'], 'noFoto.jpg')

@Component
export default class NewProduct extends Vue {
  private product = new ProductClass('', '', '', img)
  private valid = false
  private newImg: string | ArrayBuffer | null | File = '../assets/noFoto.jpg'

  private onFileChange(event: File): void {
    if (event !== undefined) {
      const reader = new FileReader()
      reader.readAsDataURL(event)
      reader.onload = () => {
        this.product.img = event
        this.newImg = reader.result
      }
    }
  }
  private createProduct(): void {
    this.$store
      .dispatch('createProduct', this.product)
      .then(() => this.$router.push('/'))
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {})
  }
  get loading(): boolean {
    return this.$store.getters.loading
  }
}
</script>

<style scoped></style>
