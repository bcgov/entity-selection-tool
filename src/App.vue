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
  <div id="app">
    <b-button @click="homeModal()">
      Start Business Structures Widget
    </b-button>
  </div>
</template>
<script>
import ModalHome from "@/components/ModalHome.vue";
import Vue from "vue";
import Buefy from "buefy";
Vue.use(Buefy);

import "buefy/dist/buefy.css";

Vue.use(Buefy);
export default {
  name: "BE",
  created(){
    this.$i18n.locale = "en";
  },
  methods: {
    homeModal: function() {
      this.$buefy.modal.open({
        parent: this,
        component: ModalHome,
        hasModalCard: true,
        customClass: "bet-modal"
      });
    }
  }
};
</script>
<style>
h1 {
  align-content: center;
  color: white;
  font-size: 30px;
}
.modal-card {
  width: 900px;
}
.modal-card-head {
  background-color: #274f6e;
  padding-bottom: 6px;
  height: 160px;
}
.modal-card-body {
  background-color: rgb(207, 232, 252);
  height: 360px;
  padding-bottom: 0px;
  padding-top: 0px;
}
.modal-card-foot {
  background-color: rgb(207, 232, 252);
  padding-bottom: 10px;
  padding-top: 10px;
  justify-content: flex-end;
}
.question.box {
  width: 520px;
  height: 480px;
  z-index: 50;
  position: absolute;
  top: 80px;
  left: 10px;
}
h3 {
  font-size: 16px;
}
h2 {
  font-size: 22px;
}
.be-subtitle {
  padding-bottom: 0px;
}
.card .custom-header {
  height: 60px;
}
.card .card-content {
  background-color: transparent;
  padding: 1rem;
  height: 320px;
}
/* .card .custom-footer {
  height: 60px;
  justify-content: space-between;
} */
.card .content .be-nonprofit-list {
  margin-top: 6px;
  margin-bottom: 6px;
}
</style>
