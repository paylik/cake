<template>
  <div>
    <v-container v-if="product">
      <v-row>
        <v-col>
          <div class="text-h3">
            {{ product.name }}
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-img
          max-height="350"
          max-width="650"
          :src="product.img"
          class="mx-auto"
        ></v-img>
      </v-row>
      <v-row>
        <v-col>
          {{ product.description }}
        </v-col>
      </v-row>
      <v-row v-if="isUserLogin"
        ><v-spacer></v-spacer>
        <v-col>
          <!--          <app-edit-product-modal :product="product"></app-edit-product-modal>-->
          <v-btn class="warning mx-auto" @click="onDelete"> Удалить </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <app-e404></app-e404>
    </v-container>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'
import {ProductClass} from '@/store/product.ts'
import E404 from '@/views/E404.vue'

@Component({
  components: {
    appE404: E404
  }
})
export default class Product extends Vue {
  @Prop(String)
  readonly id!: string

  get product(): ProductClass {
    return this.$store.getters.productById(this.id)
  }

  get isUserLogin(): boolean {
    return this.$store.getters.isUserLogin
  }

  get loading(): boolean {
    return this.$store.getters.loading
  }

  private onDelete(): void {
    const {id} = this.product

    this.$store.dispatch('deleteProduct', id).then(() => this.$router.push('/'))
  }
}
</script>

<style scoped></style>
