<template>
  <div class="columns">
    <div class="column is-half">
      <BaseCard class="question box">
        <template v-slot:headertext>
          <p>This is the Non Profit Summary Page</p>
        </template>
        <template v-slot:bodytext>
          <h6>Cooperative Association</h6>
          <ul class="be-nonprofit-list">
            <li>1</li>
            <li>2</li>
          </ul>
          <h6>Incorporated Society</h6>
          <ul class="be-nonprofit-list">
            <li>1</li>
            <li>2</li>
          </ul>
          <h6>Non-Registered Society</h6>
          <ul class="be-nonprofit-list">
            <li>1</li>
            <li>2</li>
          </ul>
        </template>
      </BaseCard>
    </div>
    <div class="column is-half"></div>
  </div>
</template>

<script>
import BaseCard from "@/components/base-components/BaseCard.vue";
export default {
  name: "NonProfit",
  components: {
    BaseCard
  }
};
</script>

<style></style>
