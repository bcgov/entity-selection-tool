<template>
  <div class="columns">
    <div v-if="!resultsShow" class="column is-half">
      <BaseCard class="question box">
        <!-- <b-button
      @click="toggleLocale()"
      size="is-small"
      style="background-color:pink"
    >
    {{ locale == "en" ? "Francais" : "English" }}
    </b-button> -->
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
            <b-button
              class="be-form-button "
              :disabled="disabledPreviousButton"
              @click="previous()"
            >
              {{ $t("previous") }}</b-button
            >
          </span>
          <span class="card-footer-item">
            <b-button
              class="be-form-button"
              :disabled="disabledNextButton"
              @click="next()"
            >
              {{ $t("next") }}
            </b-button>
          </span>
          <span class="card-footer-item">
            <b-button
              class="be-form-button"
              :disabled="disabledSubmitButton"
              @click="showResults()"
            >
              {{ $t("submit") }}</b-button
            >
          </span>
        </template>
      </BaseCard>
    </div>
    <div v-if="resultsShow" class="column is-half">
      <Results
        :data="data"
        :entity-id="bestEntity"
        :user-answers="userSelectedAnswer"
        @clicked="restartEntity"
        :lang="this.locale"
      ></Results>
    </div>
    <!-- end left side -->
    <div class="column is-half">
      <div class="column is-four-fifths is-pulled-right">
        <section>
          <template v-for="(value, index) in entitiesTotal">
            <div class="be-entitywrap" v-bind:key="index">
              <b-collapse :open="false" :aria-id="`contentIdFor${index}`" animation="slide">
                <div
                  slot="trigger"
                  slot-scope="props"
                  role="button"
                  :aria-controls="`contentIdFor${index}`"
                >
                  <!-- {{ props.open ? "-" : "+" }} -->
                  <em>{{ data.entities[index][`title_${locale}`] }}</em>
                  {{ displayPercentage(entitiesTotal[index].total) }}%
                  <font-awesome-icon
                    class="be-carat-icon is-pulled-right"
                    :icon="
                      props.open ? ['fas', 'angle-up'] : ['fas', 'angle-down']
                    "
                  >
                  </font-awesome-icon>
                </div>
                <div class="notification">
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
        submit: "Submit"
      },
      fr: {
        of: "de",
        previous: "Précédent",
        next: "Suivant",
        submit: "Soumettre"
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
      disabledNextButton: true,
      disabledSubmitButton: true,
      disabledPreviousButton: true,
      resultsShow: false,
      bestEntity: "",
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

      if (val == this.totalCategories) {
        this.disabledNextButton = true;
      } else {
        // disabeld next button if necessary
        this.disabledNextButton = (question.answerIndex=="notset") ? true : false;
        
      }
      this.disabledPreviousButton=(val==1) ? true : false;
      
      // set inital radio value  from user answer  
      this.radioButton = (question.answerIndex=="notset") ? "" : question.answerIndex;


    } // end currentCategoryIndex
  }, // end watch
  methods: {
    showResults: function() {
      this.resultsShow = true;
      // re-order to show from higher to lower for structure resultbundleRenderer.renderToStream
    
      let myEntities=this.entitiesTotal;
      let keysSorted = Object.keys(this.entitiesTotal).sort(function(a,b) {
        return myEntities[b]["total"]-myEntities[a]["total"]
      });
      let sortedEntities = {};
      let gotTopEntity = false;
      let bestEntitySelectionId = "";
      keysSorted.map(function(key) {
        if (!gotTopEntity) {
          bestEntitySelectionId = key;
          gotTopEntity = true;
        }
        sortedEntities[key]= myEntities[key];
      });
      this.bestEntity = bestEntitySelectionId;
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
      }
    }, // end previous
    //Saves the selected question option param {number} answer 
    //The index of the selected option
    onSelect: function(answer,answerIndex) {
      this.disabledNextButton = (this.currentCategoryIndex == this.totalCategories) ? true : false;
      if (this.currentCategoryIndex == this.totalCategories) {
        this.disabledSubmitButton = false;
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
em {
  color:#2C5671;
}
.be-progress {
  margin-bottom: 5px;
  margin-top: 5px;
  margin-right: 20px;
  margin-left: 20px;
}
.be-entitywrap{
  border-bottom-style: solid;
  border-bottom-color: #edf3f7;
  padding-top: 5px;
}
#be-results-list {
  list-style: none;
}
</style>
