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
          <h2>QUESTION {{ currentCategoryIndex }} of {{ totalCategories }}</h2>
          <br />
          <!-- <h3>{{ weights[currentCategory] }}</h3> -->
          <h3>
            {{
              data.collection[`cat-${currentCategoryIndex}`][
                `question_${locale}`
              ]
            }}
          </h3>
          <br />
        </template>
        <template v-slot:bodytext>
          <form>
            <template v-for="(value, index) in current">
              <label v-bind:key="`${index}${currentCategoryIndex}`">
                <b-radio
                  type="is-info"
                  name="questions"
                  v-model="radioButton"
                  :id="index"
                  :native-value="
                    index ===
                      userSelectedAnswer[`cat-${currentCategoryIndex}`]
                        .answerIndex
                  "
                  @click.native="onSelect(value, index)"
                />
                {{ value[`title_${locale}`] }}
                <br />
              </label>
            </template>
          </form>
          <br />
          <section>
            <div class="buttons">
              <b-button
                size="is-medium"
                @click="previous()"
                :disabled="
                  currentCategoryIndex == 0 && currentQuestionIndex == 0
                "
              >
                Previous
              </b-button>
              <b-button
                size="is-medium"
                @click="next()"
                :disabled="
                  currentCategoryIndex == data.length - 1 &&
                    currentQuestionIndex ==
                      data[data.length - 1].questions.length - 1
                "
              >
                Next
              </b-button>
              <!-- change v-if allAnswered to true after testing -->
              <b-button
                v-if="!allAnswered"
                size="is-medium"
                @click="showResults()"
                >{{ $t("submit") }}</b-button
              >
            </div>
            <!-- :to="{ name: 'results', params: { structure: maxCheck } }" -->
          </section>
        </template>
        <template v-slot:footertext>
          <section>
            <p v-if="!isHidden">
              {{ $t("generic_context") }}
            </p>
          </section>
          <!-- <button v-on:click="isHidden = !isHidden">
          More details/context
        </button> -->
        </template>
      </BaseCard>
    </div>
    <div v-if="resultsShow" class="column is-half">
      <Results></Results>
    </div>
    <!-- end left side -->
    <div class="column is-half">
      <!--  <h2 style="color: #2C5671">{{ $t("entity_titles") }}</h2> -->
      <div class="column is-four-fifths is-pulled-right">
        <section>
          <template v-for="(value, index) in data.entities">
            <div class="be-entitywrap" v-bind:key="index">
              <em>{{ value[`title_${locale}`] }}</em>
              {{ entitiesTotal[index].total }}%
              <br />
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
        <!--   <br />
        {{ $t("disclaimer") }} -->
      </div>
    </div>
    <div>
      <ul
        id="test"
        v-for="(c, i) in data"
        v-bind:key="c.cid"
        style="color:#2C5671"
      >
        <li
          id="test2"
          v-for="(q, j) in c.questions"
          v-bind:key="q.qid"
          :class="
            currentCategoryIndex == i && currentQuestionIndex == j
              ? 'uk-active'
              : ''
          "
        ></li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import json from "@/data/be-json-v4.2-BC.json";
import Results from "@/components/Results.vue";
import UIkit from "uikit";
import BaseCard from "@/components/base-components/BaseCard.vue";
// import i18n from "@/i18n";
/* eslint-disable */ 

export default {
  name: "Entity",
  components: {
    BaseCard,
    Results
  },
  data: function() {
    return {
      radioButton: "",
      resultsShow: false,
      total: [0, 0, 0, 0, 0, 0],
      tempImp: [0, 0, 0, 0, 0, 0],
      // this will be dynamicallly created
      userSelectedAnswer:{},
      entitiesTotal:{},
      selectedImp: [0, 0, 0, 0, 0, 0],
      totalCategories:0,
      data: json,
      currentCategoryIndex: 1,
      currentQuestionIndex: 1,
      navElement: "",
      isHidden: false,
      types: [
        "sole_proprietorship",
        "gen_partnership",
        "bc_corporation",
        "fed_corporation",
        "lim_partnership",
        "lim_liability_partnership"
      ],
      weights: [
        "Geographic Reach",
        "Risk level of industry",
        "Risks to owners",
        "Number of owners",
        "Number of employees",
        "Financing wants/needs",
        "Set-up and ongoing costs",
        "Anticipated profits",
        "Name Protection"
      ]
    };
  },
  methods: {
   showResults: function() {
this.resultsShow = true;
   },
    /**
     * Advances to the next question
     */
    next: function() {
      /*
      if (
        this.currentQuestionIndex ==
        this.data[this.currentCategoryIndex].questions.length - 1
      ) {
        if (this.currentCategoryIndex != this.data.length - 1)
          this.changeCurrent(this.currentCategoryIndex + 1, 0);
      } else this.changeCurrent(this.currentCategoryIndex, this.currentQuestionIndex + 1);
      */

       if(this.currentCategoryIndex < this.totalCategories){
           this.currentCategoryIndex++;
       }

    },
    /**
     * Goes back to the previous question
     */
    previous: function() {
      /*
      if (this.currentQuestionIndex == 0) {
        if (this.currentCategoryIndex != 0)
          this.changeCurrent(
            this.currentCategoryIndex - 1,
            this.data[this.currentCategoryIndex - 1].questions.length - 1
          );
      } else this.changeCurrent(this.currentCategoryIndex, this.currentQuestionIndex - 1);
      */
      if(this.currentCategoryIndex>1) this.currentCategoryIndex--
    },
    /**
     * Saves the selected question option
     * @param {number} answer The index of the selected option
     */
    onSelect: function(answer,answerIndex) {
 
      // recourd user answer index and impact to variable 
      this.userSelectedAnswer[`cat-${this.currentCategoryIndex}`].answerIndex = answerIndex;
      this.userSelectedAnswer[`cat-${this.currentCategoryIndex}`].impact = answer.impact;

    for (let [entityKey, value] of Object.entries(this.data.entities)){

      let totalImpact=0;

         // go throught all recoreded anwers to find impact for that Entity
          for (let [key, answerValue] of Object.entries(this.userSelectedAnswer)){
            if(value.answerIndex !="notset"){
              let impactValue = answerValue.impact[entityKey] || 0;
               totalImpact = totalImpact + impactValue;
            }
          }

       this.entitiesTotal[entityKey].total = totalImpact;

     }//entities


     // this.current.completed = answer;
    },
    /**
     * Toggles display language
     */
    toggleLocale: function() {
      this.$i18n.locale = this.locale == "en" ? "fr" : "en";
    }
  },
  computed: {
    getTotal: function(entityKey){
      return (this.entitiesTotal[entityKey]) ? this.entitiesTotal[entityKey].total:0;
    },
    /**
     * @returns The data for the current question
     */
    current: function() {
      //return this.data[this.currentCategory].questions[this.currentQuestionIndex];

      //return this.data.collection[`cat-${this.currentCategoryIndex}`].answers[`a${this.currentQuestionIndex}`];
      return this.data.collection[`cat-${this.currentCategoryIndex}`].answers;
    },
    /**
     * @returns The current language
     */
    locale: function() {
      return this.$i18n.locale;
    },
    /**
     * @returns percentage completed
     */
    progress: function() {
      let tally = 0;
      for (let i = 0; i < this.data.length; i++) {
        tally += this.categoryCompletion(i);
      }
      return tally * (100 / 9);
    },
    /**
     * Whether the submit button should be showing
     * @returns True if done, False otherwise
     */
    allAnswered: function() {
      return this.progress >= 100;
    },
    /**
     * @returns The category the most full
     */
    maxCheck: function() {
      let a = this.total;
      let maxIndex = a.reduce(
        (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
        0
      );
      return this.types[maxIndex];
    }
  },
  created(){
    this.data= this.data["pid-59"]
    this.totalCategories = Object.keys(this.data.collection).length

    // here all the variables that are needed to be created
    // via the json file.

      // to track user selection
     for (let [key, value] of Object.entries(this.data.collection)){
        // use set to make it  reactive 
        Vue.set(this.userSelectedAnswer, key, {
         answerIndex:"notset",
         impact:[]
       })
     }

     // to track entities total
     for (let [key, value] of Object.entries(this.data.entities)){
        // use set to make it  reactive 
        Vue.set(this.entitiesTotal, key, {
          total:0,
       })   
     }

   
   
  },
  mounted() {
    this.navElement = document.getElementById("nav");
    UIkit.nav(this.navElement).toggle(0); // Toggles the first nav open
   // this.userSelectedAnswer="a2"

  
  }
};
</script>
<style scoped>
#Entity{
  background-color:pink;
}
h3 {
  text-align: left;
  font-size: 25px;
}

p {
  font-weight: 50;
  color:#2C5671;
}
em {
  color:#2C5671;
}
.be-progress {
  margin-bottom: 5px;
  margin-top: 5px;
  margin-right: 20px;
  margin-left: 20px;
 
  border-color: #2C5671;
}
.uk-button-group {
  border-style: solid;
  border: #2C5671;
}
.uk-button {
  border-style: solid;
  border-color: #2C5671;  
}
.be-entitywrap{
  border-bottom-style: solid;
  border-bottom-color: #edf3f7;
  padding-top: 5px;
  /* padding-left: 15px;
  padding-right: 15px;
  padding-top: 20px;
  padding-bottom: 20px; */
}
.be-toolbar{
  background-color: #edf3f7 ;
}
.be-qestion-header{
  border-style: solid;
  border-color: #2C5671;
  background-color: #d0e9f9;
}
#test2 {
  list-style: none;
}
/* div{
  border-style: solid;
  border-color: pink;
} */
</style>
