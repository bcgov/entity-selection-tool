<template>
  <div class="columns">
    <div v-if="!resultsShow" class="column is-three-fifths">
      <BaseCard class="question box">
        <template v-slot:headertext>
          <h2 class="title be-question-title is-4">
            QUESTION {{ currentCategoryIndex }} {{ $t("of") }}
            {{ totalCategories }}
          </h2>
        </template>
        <template v-slot:bodytext>
          <fieldset class="be-card-content">
            <legend class="be-question-text">
              {{
                data.collection[`cat-${currentCategoryIndex}`][
                  `question_${locale}`
                ]
              }}
            </legend>

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
            <p v-if="!isHidden">
              {{ getQuestionContext }}
            </p>
          </section>
        </template>
        <template v-slot:footertext>
          <span class="card-footer-item">
            <b-button class="be-form-button " @click="onClickButton">{{
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
        </template>
      </BaseCard>
    </div>
    <div v-if="resultsShow" class="column is-three-fifths">
      <Results
        :data="data"
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
                :open="false"
                :aria-id="`contentIdFor${index}`"
                animation="slide"
              >
                <div
                  slot="trigger"
                  slot-scope="props"
                  role="button"
                  :aria-controls="`contentIdFor${index}`"
                >
                  <em class="be-emphasis"
                    >{{ data.entities[index][`title_${locale}`] }}
                    {{ displayPercentage(entitiesTotal[index].total) }}</em
                  >
                  <font-awesome-icon
                    class="be-carat-icon is-pulled-right"
                    :icon="
                      props.open ? ['fas', 'angle-up'] : ['fas', 'angle-down']
                    "
                  >
                  </font-awesome-icon>
                </div>
                <div class="notification be-notification">
                  <div class="content">
                    <p>{{ entitiesTotal[index][`summary_${locale}`] }}</p>
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
</template>

<script>
import Vue from "vue";
import json from "@/data/be-json-v5.0.json";
import Results from "@/components/Results.vue";
import BaseCard from "@/components/base-components/BaseCard.vue";
import VueI18nEntity from "vue-i18n";
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
    Results
  },
  i18n: {
    locale: "en",
    messages: {
      en: {
        of: "of",
        previous: "Previous",
        next: "Next",
        submit: "Finish",
        restart: "Restart",
        entity_title: "Suggested Business Structure",
        entity_title_one: "Suggested",
        entity_title_two: "Business Structure",
      },
      fr: {
        of: "de",
        previous: "Précédent",
        next: "Suivant",
        submit: "Terminer",
        restart: "Redémarrer",
        entity_title: "Structure d'entreprise suggérée",
        entity_title_one: "Structure d'entreprise",
        entity_title_two: "suggérée"
        
      }
    }
  }, // end i18n
   props: {
    lang: {
      type: String,
      default: "en"
    }
  }, 
  data: function() {
    return {
      langLocal:this.lang,
      radioButton: "",
      showNextButton: false,
      showFinishButton: false,
      showPreviousButton: true,
      resultsShow: false,
      bestEntitiesId: [],
      // this will be dynamicallly created
      userSelectedAnswer: {},
      entitiesTotal: {},
      totalCategories: 0,
      data: json,
      currentCategoryIndex: 1,
      navElement: "",
      isHidden: false,
    };
  }, // end data
  created: function() {
    this.data = this.data["pid-59"];
    this.totalCategories = Object.keys(this.data.collection).length;
    // here all the variables that are needed to be created via the json file.

    // to track user selection
    for (let [key, value] of Object.entries(this.data.collection)) {
      // use set to make it  reactive 
      Vue.set(this.userSelectedAnswer, key, {
        answerIndex:"notset",
        impact:[]
      })
    }
    // to track entities total and added summary for quick access to it
    for (let [key, value] of Object.entries(this.data.entities)) {
      // use set to make it  reactive 
      Vue.set(this.entitiesTotal, key, {
        total: 0,
        summary_en: value["summary_en"] || "",
        summary_fr: value["summary_fr"] || ""
      })   
    }
  }, // end created
  mounted: function() {
    this.$i18n.locale = this.langLocal;
  }, // end mounted
  computed: {
    getTotal: function(entityKey) {
      return (this.entitiesTotal[entityKey]) ? this.entitiesTotal[entityKey].total : 0;
    },
    // returns The data for the current question
    current: function() {
      return this.data.collection[`cat-${this.currentCategoryIndex}`].answers;
    },
    getQuestionContext: function() {
      return this.data.collection[`cat-${this.currentCategoryIndex}`][`context_${this.locale}`] || "";
    },
    // returns The current language
    locale: function() {
      return this.langLocal;
    }
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
      //this.showPreviousButton=(val==0) ? false : true;
      
      // set inital radio value  from user answer  
      this.radioButton = (question.answerIndex=="notset") ? "" : question.answerIndex;

    } // end currentCategoryIndex
  }, // end watch
  methods: {
    onClickButton: function() {
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
        this.currentCategoryIndex++;
      }
    }, // end next
    // Goes back to the previous question
    previous: function() {
      if (this.currentCategoryIndex>1) {
        this.currentCategoryIndex--;
        this.showFinishButton = false;
      }
      //if on the first question, it returns to the introGate card
      if (this.currentCategoryIndex <= 1) {
        this.onClickPrevious();
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

      for (let [entityKey, value] of Object.entries(this.data.entities)) {
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
    //Restarts business entity tool
    restartEntity: function(value) {
      this.$parent.started = value;
      this.$parent.introGate = value;
      this.$parent.welcomeGate = true;
    },
    displayPercentage: function(value) {
      let displayValue = value;
      let minValue = 0;
      if (displayValue <= -1 ) {
        return minValue;
      }
      else {
        return displayValue;
      }
    } // end displayPercentage
  } // end methods
};
</script>
<style scoped>

</style>
