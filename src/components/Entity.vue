<template>
  <div>
    <div class="columns">
      <div v-if="resultsShow == false" class="column is-three-fifths">
        <BaseCard class="be-question box">
          <template v-slot:headertext>
            <h2 class="title be-question-title">
              {{ $t("question") }} {{ currentCategoryIndex }} {{ $t("of") }}
              {{ totalCategories }}
            </h2>
          </template>
          <template v-slot:bodytext>
            <fieldset class="be-card-content">
              <legend
                class="be-question-text"
                v-html="
                  dataLocal.collection[`cat-${currentCategoryIndex}`][
                    `question_${locale}`
                  ]
                "
              ></legend>

              <br />
              <form class="be-question-form">
                <template v-for="(value, index) in current">
                  <div
                    v-bind:key="`${index}${currentCategoryIndex}`"
                    class="field"
                  >
                    <b-radio
                      type="is-info"
                      name="questions"
                      v-model="radioButton"
                      :id="index"
                      :native-value="index"
                      @click.native="onSelect(value, index)"
                      v-on:keyup.enter="onSelect(value, index)"
                    >
                      {{ value[`title_${locale}`] }}
                    </b-radio>
                  </div>
                </template>
              </form>
            </fieldset>
            <section class="be-context">
              <div v-if="!isHidden" class="columns is-mobile">
                <div class="column is-1 be-context-icon">
                  <font-awesome-icon :icon="['fas', 'exclamation-circle']" />
                </div>
                <div class="column is-11 be-context-text">
                  <p v-html="getQuestionContext"></p>
                </div>
              </div>
            </section>
          </template>
          <template v-slot:footertext>
            <span class="card-footer-item">
              <b-button class="be-form-button " @click="confirmRestart">{{
                $t("restart")
              }}</b-button>
            </span>
            <span class="card-footer-item">
              <b-button
                class="be-form-button "
                :disabled="!showPreviousButton"
                @click="previous()"
              >
                {{ $t("previous") }}</b-button
              >
            </span>

            <span class="card-footer-item">
              <b-button
                v-if="showFinishButton"
                class="be-form-button"
                @click="showResults()"
              >
                {{ $t("submit") }}</b-button
              >
              <b-button
                v-if="!showFinishButton"
                class="be-form-button"
                :disabled="!showNextButton"
                @click="next()"
              >
                {{ $t("next") }}
              </b-button>
            </span>
            <span class="card-footer-item">
              <b-button class="be-form-button" @click="printSummaries">
                {{ $t("print_summaries") }}
              </b-button>
            </span>
          </template>
        </BaseCard>
      </div>
      <div v-if="resultsShow == true" class="column is-three-fifths">
        <Results
          :data="dataLocal"
          :entities-id="bestEntitiesId"
          :entities-total="entitiesTotal"
          :user-answers="userSelectedAnswer"
          @clicked="restartEntity"
          :lang="locale"
        ></Results>
      </div>
      <!-- end left side -->
      <div class="column is-two-fifths be-progress-wrapper">
        <div class="column be-progress-box">
          <h2 class="subtitle be-progress-subtitle is-5">
            {{ $t("entity_title_one") }}
          </h2>
          <h2 class="subtitle be-progress-subtitle is-4">
            {{ $t("entity_title_two") }}
          </h2>
          <section>
            <template v-for="(value, index) in entitiesTotal">
              <div class="be-entitywrap" v-bind:key="index">
                <b-collapse
                  :open="isOpen == index"
                  @open="isOpen = index"
                  :aria-id="`contentIdFor${index}`"
                  animation="slide"
                >
                  <div
                    slot="trigger"
                    slot-scope="props"
                    role="button"
                    :aria-controls="`contentIdFor${index}`"
                    tabindex="0"
                    @keyup.enter="isOpen ? (isOpen = false) : (isOpen = index)"
                  >
                    <p class="be-emphasis">
                      {{ dataLocal.entities[index][`title_${locale}`] }}

                      <font-awesome-icon
                        class="be-carat-icon is-pulled-right fa-lg"
                        :icon="
                          props.open
                            ? ['fas', 'angle-up']
                            : ['fas', 'angle-down']
                        "
                      >
                      </font-awesome-icon>
                    </p>
                  </div>
                  <div class="notification be-notification">
                    <div class="content">
                      <p class="be-progress-summary">
                        {{ entitiesTotal[index][`summary_${locale}`] }}
                      </p>
                    </div>
                  </div>
                </b-collapse>
                <b-progress
                  size="is-small"
                  type="is-info"
                  class="be-progress"
                  :value="entitiesTotal[index].total"
                  min="0"
                ></b-progress>
              </div>
            </template>
          </section>
        </div>
      </div>
    </div>
    <b-modal
      :active.sync="isSummariesModalActive"
      :can-cancel="canCancel"
      full-screen
      aria-role="dialog"
      aria-modal
      class="be-print-modal"
    >
      <ModalSummary @clicked="closeModal()" :data="dataLocal"> </ModalSummary>
    </b-modal>
  </div>
</template>

<script>
import Vue from "vue";
import Results from "@/components/Results.vue";
import BaseCard from "@/components/base-components/BaseCard.vue";
import VueI18nEntity from "vue-i18n";
import ModalSummary from "./ModalSummary.vue";
/* eslint-disable */ 

Vue.use(VueI18nEntity);

// Create VueI18n instance with options
export const i18n = new VueI18nEntity({
  locale: process.env.VUE_APP_I18N_LOCALE || "en",
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en"
});

export default {
  name: "Entity",
  components: {
    BaseCard,
    Results,
    ModalSummary
  },
  i18n: {
    locale: "en",
    messages: {
      en: {
        question: "QUESTION",
        of: "of",
        previous: "Back",
        next: "Next",
        submit: "Finish",
        restart: "Restart",
        entity_title: "Suggested Business Structure",
        entity_title_one: "Suggested",
        entity_title_two: "Business Structure",
         print_summaries: "See All Structures",
      },
      fr: {
        question: "QUESTION",
        of: "de",
        previous: "Précédent",
        next: "Suivant",
        submit: "Terminer",
        restart: "Redémarrer",
        entity_title: "Structure d'entreprise suggérée",
        entity_title_one: "Structure d'entreprise",
        entity_title_two: "suggérée",
         print_summaries: "See All Structures (FR)",
      }
    }
  }, // end i18n
   props: {
    lang: {
      type: String,
      default: "en"
    },
    sgc: {
      type: String,
      default: "59"
    },
    data: {
      type: Object
    }
  }, 
  // generic error capture for the component
   errorCaptured(err,vm,info) {
    console.log(`Error in Entity.vue: ${err.toString()}\ninfo: ${info}`); 
     return false;
  },
  data: function() {
    return {
      isOpen: false,
      langLocal: this.lang,
      radioButton: "",
      showNextButton: false,
      showFinishButton: false,
      showPreviousButton: false,
      resultsShow: false,
      bestEntitiesId: [],
      // this will be dynamicallly created
      userSelectedAnswer: {},
      entitiesTotal: {},
      totalCategories: 0,
      dataLocal: this.data,
      currentCategoryIndex: 1,
      navElement: "",
      isHidden: false,
      sgcLocal: this.sgc,
      isSummariesModalActive: false,
       canCancel: false
    };
  }, // end data
  created: function() {
    this.dataLocal = this.dataLocal[`pid-${this.sgcLocal}`];

    try {
      this.totalCategories = Object.keys(this.dataLocal.collection).length;
      // here all the variables that are needed to be created via the json file.

      // to track user selection
      for (let [key, value] of Object.entries(this.dataLocal.collection)) {
        // use set to make it  reactive 
        Vue.set(this.userSelectedAnswer, key, {
          answerIndex:"notset",
          impact:[]
        })
      }
      // to track entities total and added summary for quick access to it
      for (let [key, value] of Object.entries(this.dataLocal.entities)) {
        // use set to make it  reactive 
        Vue.set(this.entitiesTotal, key, {
          total: 0,
          summary_en: value["summary_en"] || "",
          summary_fr: value["summary_fr"] || ""
        })   
      }
    } catch(e) {
      console.log("error with data structure.")
      //return false;
    }
  }, // end created
  mounted: function() {
    this.$i18n.locale = this.langLocal;
  }, // end mounted
  computed: {
    getTotal: function(entityKey) {
      return (this.entitiesTotal[entityKey]) ? this.entitiesTotal[entityKey].total : 0;
    },
    // returns The dataLocal for the current question
    current: function() {
      return this.dataLocal.collection[`cat-${this.currentCategoryIndex}`].answers;
    },
    getQuestionContext: function() {
      return this.dataLocal.collection[`cat-${this.currentCategoryIndex}`][`context_${this.locale}`] || "";
    },
    // returns The current language
    locale: function() {
      return this.langLocal;
    },
    
  }, //end computed
  watch: {
    currentCategoryIndex: function(val) {
      // retrieved user answer for thequestion
      let question = this.userSelectedAnswer[`cat-${val}`];
      if (val == this.totalCategories && question.answerIndex!="notset")  {
        this.showNextButton = false;
        this.showFinishButton = true;
      } else {
        // disabeld next button if necessary
        this.showNextButton = (question.answerIndex=="notset") ? false : true;
      }
      // disable previous button on question 1
      if (val <= 1){
        this.showPreviousButton = false;
      }
      // set inital radio value  from user answer  
      this.radioButton = (question.answerIndex=="notset") ? "" : question.answerIndex;
    }// end currentCategoryIndex
  }, // end watch
  methods: {
    confirmRestart: function() {
      this.$buefy.dialog.confirm({
        message: 'Do you wish to restart the wizard? All saved data will be lost.',
        type: 'is-danger',
        hasIcon: true,
        icon: 'exclamation-circle',
        iconPack: 'fas',
        ariaRole: 'alertdialog',
        ariaModal: true,
        onConfirm: () => this.onClickRestart()
      })
    }, // end confirmRestart
    onClickRestart: function() {
      this.tempValue = false;
      this.$emit("clicked", this.tempValue);
    },
    onClickPrevious: function() {
      this.tempValue = true;
      this.$emit("clicked", this.tempValue);
    },
    showResults: function() {
      this.resultsShow = true;
      // re-order to show from higher to lower for structure resultbundleRenderer.renderToStream
    
      let myEntities=this.entitiesTotal;
      let keysSorted = Object.keys(this.entitiesTotal).sort(function(a,b) {
        return myEntities[b]["total"]-myEntities[a]["total"]
      });
      let sortedEntities = {};
      let topEntitiesId = [];
      let topEntitiesTotal = [];
      let gotTopEntity = false;
      let iteration = 1;
      //let bestEntitySelectionId = "";
      keysSorted.map(function(key) {
        if (!gotTopEntity) {
          //bestEntitySelectionId = key;
          topEntitiesId.push(key)
          //topEntitiesId.push("e1") // to testing
          topEntitiesTotal.push(myEntities[key]["total"])
          gotTopEntity = true;
        }
        sortedEntities[key]= myEntities[key];
        //check if we have tie for top entity suggestion
        if(iteration > 1){
          if(topEntitiesTotal.pop() == myEntities[key]["total"]){
            topEntitiesId.push(key);
          }
        }
        iteration++;
      });
      this.bestEntitiesId = topEntitiesId;
      this.entitiesTotal = sortedEntities;
    }, // end showResults
    // Advances to the next question
    next: function() {
      if (this.currentCategoryIndex < this.totalCategories) {
        this.isOpen = false;
        this.currentCategoryIndex++;
      }
      // show previous button when greater than question 1
      if (this.currentCategoryIndex >= 2){
        this.showPreviousButton = true;
      }
    }, // end next
    // Goes back to the previous question
    previous: function() {
      if (this.currentCategoryIndex <= 1 ) {
        this.showPreviousButton = false;
        this.isOpen = false;
        return;
      }
       
      if (this.currentCategoryIndex>1) {
        this.isOpen = false;
        this.currentCategoryIndex--;
        this.showFinishButton = false;
        return;
      }
    }, // end previous
    //Saves the selected question option param {number} answer 
    //The index of the selected option
    onSelect: function(answer,answerIndex) {
      this.showNextButton = (this.currentCategoryIndex == this.totalCategories) ? false : true;
      if (this.currentCategoryIndex == this.totalCategories) {
        this.showFinishButton = true;
      }
      // record user answer index and impact to variable 
      this.userSelectedAnswer[`cat-${this.currentCategoryIndex}`].answerIndex = answerIndex;
      this.userSelectedAnswer[`cat-${this.currentCategoryIndex}`].impact = answer.impact;

      for (let [entityKey, value] of Object.entries(this.dataLocal.entities)) {
        let totalImpact=0;
        // go throught all recoreded answers to find impact for that Entity
        for (let [key, answerValue] of Object.entries(this.userSelectedAnswer)) {
          if (value.answerIndex != "notset") {
            let impactValue = answerValue.impact[entityKey] || 0;
            totalImpact = totalImpact + impactValue;
          }
        }
        this.entitiesTotal[entityKey].total = totalImpact;
      }
    }, // end onSelect
    //If restart clicked, restart tool
    restartEntity: function(value) {
      if (value == false) {
        this.$parent.started = value;
        //this.$parent.introGate = value;
        this.$parent.welcomeGate = true;
      }
      //if previous clicked, close results
      if (value == true) {
        this.resultsShow = false;
      }
    },
    // Display percentage value on progress bar
    displayPercentage: function(value) {
      let displayValue = value;
      let minValue = 0;
      if (displayValue <= -1 ) {
        return minValue;
      }
      else {
        return displayValue;
      }
    }, // end displayPercentage
    printSummaries: function() {
      this.isSummariesModalActive = true;
    },
     closeModal(value) {
      this.isSummariesModalActive = value;
    }
  } // end methods
};
</script>
<style scoped>

</style>
