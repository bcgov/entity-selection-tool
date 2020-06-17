<template>
  <BaseTile>
    <template v-slot:tileheader>
      <p class="title is-4">
        {{ $t("") }}
      </p>
    </template>
    <template v-slot:tilebody>
      <p>
        {{ $t("") }}
      </p>
    </template>
    <template v-slot:tilefooter> </template>
  </BaseTile>
</template>

<script>
import BaseTile from "@/components/base-components/BaseTile.vue";
export default {
  name: "TileEntity",
  components: {
    BaseTile
  }
};
</script>

<style></style>
