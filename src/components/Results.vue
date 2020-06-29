<template>
  <div class="columns">
    <div class="column is-half">
      <BaseCard class="question box">
        <template v-slot:headertext>
          <h2>
            {{ title }}
          </h2>
        </template>
        <template v-slot:bodytext>
          <p class="be-results-text">{{ body }}</p>
          <div>
            <h6>{{ $t("advantages") }}</h6>
            <ul class="be-results-text">
              <span v-html="advantages"></span>
            </ul>
          </div>
          <br />
          <div>
            <h6>{{ $t("disadvantages") }}</h6>
            <ul class="be-results-text">
              <span v-html="disadvantages"></span>
            </ul>
          </div>
        </template>
        <template v-slot:footertext>
          <a href="#" class="card-footer-item">{{ $t("restart") }}</a>
          <a href="#" class="card-footer-item" @click="printEntity">
            Print Results</a
          >
          <a href="#" class="card-footer-item">Print All Entity Summaries</a>
        </template>
      </BaseCard>
    </div>
    <div class="column is-half"></div>

    <b-modal
      :active.sync="isCardModalActive"
      full-screen
      aria-role="dialog"
      aria-modal
      class="print-modal"
    >
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head be-print-modal-head">
          <span class="modal-card-title be-print-modal-title">Results</span>
        </header>
        <section id="printBody" ref="PrintBody" class="modal-card-body">
          <div>
            <h1 class="title">Suggested Business Structure</h1>
            <h2 class="subtitle has-text-weight-bold">
              {{ title }}
            </h2>
            <div>
              <p>{{ body }}</p>
            </div>
            <div>
              <h2 class="has-text-weight-bold">{{ $t("advantages") }}</h2>
              <ul>
                <span v-html="advantages"></span>
              </ul>
            </div>
            <div>
              <h2 class="has-text-weight-bold">{{ $t("disadvantages") }}</h2>
              <ul>
                <span v-html="disadvantages"></span>
              </ul>
            </div>
          </div>
          <div>
            <h1 class="title">Questions/Anwers</h1>
            <h2 class="subtitle">
              Your answers are in
              <span class="has-text-weight-bold is-italic">
                bold and italic </span
              >.
            </h2>
            <ul>
              <template v-for="(value, index) in data.collection">
                <li v-bind:key="index">
                  <strong>{{ value[`question_${lang}`] }}</strong>
                  <ul class="answers">
                    <li
                      v-for="(answer, answerIndex) in value.answers"
                      v-bind:key="answerIndex"
                      v-bind:class="{
                        'has-text-weight-bold is-italic': checkAnswer(
                          index,
                          answerIndex
                        )
                      }"
                    >
                      {{ answer[`title_${lang}`] }}
                    </li>
                  </ul>
                </li>
              </template>
            </ul>
          </div>
        </section>
        <footer class="be-print-modal-foot">
          <button class="button" type="button" @click="print()">
            Print
          </button>
          <button
            class="button"
            type="button"
            @click="isCardModalActive = false"
          >
            Close
          </button>
        </footer>
      </div>
    </b-modal>
  </div>
</template>
<script>
import BaseCard from "@/components/base-components/BaseCard.vue";
import Printd from "printd";

export default {
  name: "Results",
  components: {
    BaseCard
  },
  props: {
    data: Object,
    entityId: String,
    userAnswers: Object
  },
  data: function() {
    return {
      entity: {},
      lang: "en",
      isCardModalActive: false
    };
  },
  created: function() {
    // get top Entity from data
    this.entity = this.data.entities[this.entityId] || {};
  },
  computed: {
    title: function() {
      return this.entity[`title_${this.lang}`] || "N/A";
    },
    body: function() {
      return this.entity[`summary_${this.lang}`] || "N/A";
    },
    advantages: function() {
      return this.entity[`advantage_${this.lang}`] || "N/A";
    },
    disadvantages: function() {
      return this.entity[`disadvantage_${this.lang}`] || "N/A";
    }
  },
  methods: {
    printEntity: function() {
      this.isCardModalActive = true;
    },
    checkAnswer: function(questionIndex, answerIndex) {
      let userAnswerIndex = this.userAnswers[questionIndex].answerIndex;
      return userAnswerIndex == answerIndex ? true : false;
    },
    print: function() {
      const d = new Printd();
      d.print(this.$refs.PrintBody);
    }
  }
};
</script>
<style scoped>
.print-modal {
  z-index: 100000;
}
.be-print-modal-head {
  height: 75px !important;
  padding-top: 5px !important;
  padding-bottom: 5px !important;
}
.be-print-modal-title {
  color: white !important;
  padding-bottom: 0 !important;
  margin-bottom: 0 !important;
}
.be-print-modal-foot {
  padding-top: 10px !important;
  padding-bottom: 10px !important;
  padding-left: 10px !important;
}
.answers {
  list-style: disc;
  margin-left: 3%;
  padding: 2px;
}
</style>
