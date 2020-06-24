<template>
  <div class="tile is-ancestor">
    <div class="tile box">
      <div class="home">
        <div v-if="!started && !nonProfit" class="columns">
          <div class="column">
            <div>
              <p>
                Which of these statements best describes the main purpose of
                your new organization?
              </p>
              <b-radio
                @click.native="start()"
                name="purpose"
                native-value="profit"
              >
                <label for="profit">Generate a profit for owners</label>
              </b-radio>

              <br />
              <b-radio
                @click.native="start()"
                name="purpose"
                native-value="services"
              >
                <label for="services"
                  >Provide services as a licensed professional</label
                >
              </b-radio>

              <br />
              <b-radio
                @click.native="showNonProfit()"
                name="purpose"
                native-value="charitable"
              >
                <label for="charitable"
                  >Charitable cause or public benefit</label
                >
              </b-radio>

              <br />
              <b-radio
                @click.native="showNonProfit()"
                name="purpose"
                native-value="cooperative"
              >
                <label for="cooperative"
                  >Provide shared benefit for members through a cooperative
                  association</label
                >
              </b-radio>

              <br />
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
    </div>
  </div>
</template>

<script>
import Entity from "@/components/Entity.vue";
import NonProfit from "@/components/NonProfit.vue";
export default {
  name: "TileHome",
  components: {
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
