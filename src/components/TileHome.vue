<template>
  <BaseTile>
    <template v-slot:tileheader>
      <p class="title is-4">
        {{ $t("") }}
      </p>
    </template>
    <template v-slot:tilebody>
      <div class="home">
        <div v-if="!started && !nonProfit" class="columns">
          <div class="column is-one-fourth">
            <div>
              <p>"For-profit/not-for-profit gate"</p>
              <p>
                Which of these statements best describes the main purpose of
                your new organization?
              </p>
              <b-button @click="start()">
                a) Generate a profit for owners
              </b-button>
              <br />
              <b-button @click="start()">
                b) Provide services as a licensed professional
              </b-button>
              <br />
              <b-button @click="showNonProfit()"
                >c) Charitable cause or public benifit</b-button
              >
              <br />
              <b-button @click="showNonProfit()"
                >d) Provide shared benefit for members through a cooperative
                association</b-button
              >
            </div>
          </div>
        </div>
        <div v-if="nonProfit">
          <NonProfit></NonProfit>
        </div>
        <div v-if="started">
          <Entity></Entity>
        </div>
      </div>
    </template>
    <template v-slot:tilefooter> </template>
  </BaseTile>
</template>

<script>
import BaseTile from "@/components/base-components/BaseTile.vue";
import Entity from "@/components/Entity.vue";
import NonProfit from "@/components/NonProfit.vue";
export default {
  name: "TileHome",
  components: {
    BaseTile,
    Entity,
    NonProfit
  },
  data: function() {
    return {
      started: false,
      nonProfit: false
    };
  },
    created(){
    this.$i18n.locale = "en";
  },
  methods: {
    start: function() {
      this.started = true;
    },
    showNonProfit: function() {
      this.nonProfit = true;
    }
  }
};
</script>

<style></style>
