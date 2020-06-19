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
      <h1>
        {{ $t("business_structures") }}
      </h1>
    </template>
    <template v-slot:modalbody>
      <TileHome></TileHome>
    </template>
    <template v-slot:modalfooter>
      <b-button
        outlined
        type="is-primary"
        :aria-label="$t('')"
        @click="$parent.close()"
      >
        <font-awesome-icon :icon="['fas', 'times']" />
      </b-button>
    </template>
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
