<template>
  <div class="home">
    <div v-if="!started" class="columns" >
      <div class="column is-one-fourth">
        <div >
          <p>"First Gate_EN"</p>
          <p>What is the main purpose of your new organization?</p>
          <b-button @click="start()">
            a) Generate a profit for owners
          </b-button>
          <br/>
          <b-button @click="start()">
            b) Provide services as a licensed professional
          </b-button>
          <br/>
          <b-button router-link to='/nonprofit' tag="button">c) Charitable cause or public benifit</b-button>
          <br/>
          <b-button router-link to='/nonprofit' tag="button">d) Provide shared benefit for members</b-button>
        </div>
      </div>
    </div>
    <Entity v-else />
  </div>
</template>

<script>
// import Structures from "@/components/Structures.vue";
import Vue from 'vue'
import Entity from "@/components/Entity.vue";
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

export default {
  name: "home",
  components: {
    Entity
  },
  data: function() {
    return {
      started: false
    };
  },
  methods: {
    start: function() {
      this.started = true;
    }
  }
};
</script>

<style scoped>
.uk-button-small {
  justify-content: right;
}
.home {
  background-color:rgba(39,79,110,1);
}
.uk-card {
  border-style: solid;
  border-color: pink;
}
</style>
