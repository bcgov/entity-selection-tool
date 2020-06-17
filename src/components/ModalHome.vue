<template>
  <BaseModal>
    <template v-slot:modalheader>
      <p class="title is-4">
        {{ $t("business_structures") }}
      </p>
    </template>
    <template v-slot:modalbody>
      <p>
        {{ $t("") }}
      </p>
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
export default {
  name: "ModalHome",
  components: {
    BaseModal
  }
};
</script>

<style></style>
