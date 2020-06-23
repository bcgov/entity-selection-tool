<i18n>
{
  "en": {
    "business_structures": "Business Structure Title"
  },
   "fr": {
    "business_structures": "Business Structure Title - French"
  }
}
</i18n>

<template>
  <BaseModal>
    <template v-slot:modalheader>
      <div class="container">
        <div class="columns">
          <div class="column is-three-quarters">
            <h1>
              {{ $t("business_structures") }}
            </h1>
          </div>
          <div class="column is-one-quarter">
            <b-button
              class="is-pulled-right"
              outlined
              type="is-light"
              :aria-label="$t('close')"
              @click="$parent.close()"
            >
              <font-awesome-icon :icon="['fas', 'times']" />
              {{ $t("close") }}
            </b-button>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:modalbody>
      <TileHome></TileHome>
    </template>
    <template v-slot:modalfooter> </template>
  </BaseModal>
</template>

<script>
import BaseModal from "@/components/base-components/BaseModal.vue";
import TileHome from "@/components/TileHome.vue";
require("../i18n");

export default {
  name: "ModalHome",
  components: {
    BaseModal,
    TileHome
  },
    created(){
    this.$i18n.locale = "en";
  },
};
</script>

<style></style>
