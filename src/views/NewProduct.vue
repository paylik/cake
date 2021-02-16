<template>
  <div>
    <v-container>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-row>
          <v-col>
            <div class="text-h3"></div>
            {{ product.name }}
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
            <v-img
              max-height="350"
              max-width="650"
              :src="product.img"
              class="mx-auto"
            >
            </v-img>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {ProductClass} from '@/store/product'

@Component
export default class NewProduct extends Vue {
  private product = new ProductClass('', '', '', new File('', null))
  private valid = false
  private newImg: string | ArrayBuffer | null = null

  private onFileChange(event: any): void {
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
