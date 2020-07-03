<template>
  <div class="columns">
    <div class="column is-half">
      <BaseCard class="question box">
        <template v-slot:headertext>
          <h2 class="title be-question-title is-4">
            {{ title }}
          </h2>
        </template>
        <template v-slot:bodytext>
          <p class="be-results-text">{{ body }}</p>
          <div>
            <h3 class="subtitle be-results-subtitle is-5">
              {{ $t("advantages") }}
            </h3>
            <ul class="be-results-text">
              <span v-html="advantages"></span>
            </ul>
          </div>
          <br />
          <div>
            <h3 class="subtitle be-results-subtitle is-5">
              {{ $t("disadvantages") }}
            </h3>
            <ul class="be-results-text">
              <span v-html="disadvantages"></span>
            </ul>
          </div>
        </template>
        <template v-slot:footertext>
          <a href="#" class="card-footer-item" @click="onClickButton">{{
            $t("restart")
          }}</a>
          <a href="#" class="card-footer-item" @click="printEntity">
            Print Results</a
          >
          <a href="#" class="card-footer-item">Print All Summaries</a>
        </template>
      </BaseCard>
    </div>
    <div class="column is-half"></div>

    <!-- modal for print view -->
    <b-modal
      :active.sync="isCardModalActive"
      :can-cancel="canCancel"
      full-screen
      aria-role="dialog"
      aria-modal
      class="be-print-modal"
    >
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head be-print-modal-head">
          <span class="be-modal-title">Results - Print View</span>
        </header>
        <section id="printBody" ref="PrintBody" class="be-modal-print-body">
          <div>
            <h1 class="subtitle is-3">Suggested Business Structure:</h1>
            <h2 class="subtitle is-4">
              {{ title }}
            </h2>
            <div>
              <p>{{ body }}</p>
              <br />
            </div>
            <div>
              <h3 class="subtitle is-5">{{ $t("advantages") }}</h3>
              <ul>
                <span v-html="advantages"></span>
              </ul>
              <br />
            </div>
            <div>
              <h3 class="subtitle is-5">{{ $t("disadvantages") }}</h3>
              <ul>
                <span v-html="disadvantages"></span>
              </ul>
              <br />
            </div>
          </div>
          <div>
            <h1 class="subtitle is-3">Questions/Anwers:</h1>
            <h2 class="subtitle is-4">
              Your answers are in
              <span class="has-text-weight-bold is-italic">
                bold and italic</span
              >.
            </h2>
            <ul>
              <template v-for="(value, index) in data.collection">
                <li v-bind:key="index">
                  <strong>{{ value[`question_${lang}`] }}</strong>
                  <ul class="be-answers">
                    <li
                      v-for="(answer, answerIndex) in value.answers"
                      v-bind:key="answerIndex"
                      v-bind:class="{
                        'be-selected': checkAnswer(index, answerIndex)
                      }"
                    >
                      {{ answer[`title_${lang}`] }}
                    </li>
                    <br />
                  </ul>
                </li>
              </template>
            </ul>
          </div>
        </section>
        <footer class="modal-card-foot">
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
      isCardModalActive: false,
      canCancel: false
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
    },
    onClickButton() {
      this.tempValue = false;
      this.$emit("clicked", this.tempValue);
    }
  }
};
</script>
<style scoped></style>
