<template> 
  <div class="columns">              
  <div class="column is-half is-offset-1">   
    <!-- <b-button
      @click="toggleLocale()"
      size="is-small"
      style="background-color:pink"
    >
    {{ locale == "en" ? "Francais" : "English" }}
    </b-button> -->

      <div class="column">  
        <h2>QUESTION {{ currentCategoryIndex}} of {{ totalCategories }}</h2>
        <br/>
          <!-- <h3>{{ weights[currentCategory] }}</h3> -->
        <h3>{{ data.collection[`cat-${currentCategoryIndex}`][`question_${locale}`] }}</h3>
        <br/>
        <form >
          <template v-for="(a, i) in current.answers">
            <label v-bind:key="a.id">
              <input
                type="radio"
                class="be-radio"
                v-model="tempImp"
                v-bind:value="a.impact"
                @click="onSelect(i)"
              />
              {{ $t(currentCategory + 1 + "-" + a.id) }}
              <br />
            </label>
          </template>
        </form>
            <br/>
        <section>
        <div class="buttons">
            <b-button
              size="is-medium"
              @click="previous()"
              :disabled="currentCategoryIndex == 0 && currentQuestionIndex == 0"
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
                          
            <b-button tag="router-link"
              v-if="allAnswered"
              size="is-medium"
              :to="{ name: 'results', params: { structure: maxCheck } }"
              >{{ $t("submit") }}</b-button
            >
        </div>
        </section>
    </div>

      <div class="column ">
        <!-- <button v-on:click="isHidden = !isHidden">
          More details/context
        </button> -->
        <p v-if="!isHidden">
          {{ $t("generic_context") }}
          
        </p>
      </div>
  </div> 
  <!-- end left side -->
  <div class="column is-one-quarter">
           <h2 style="color:#edf3f7" >{{ $t("entity_titles") }}</h2>
      <div class="column is-four-fifth">
          <section>
          <div class="be-entitywrap">
          <em>{{ $t(types[0]) }}</em> {{ total[0] }}%
          <br/>
          <b-progress size="is-small" type="is-info" class="uk-progress" :value="total[0]" min="0" max="100"></b-progress>
          </div>
                    <div class="be-entitywrap">
          <em>{{ $t(types[1]) }}</em> {{ total[1] }}%
                    <br/>
          <b-progress size="is-small" type="is-info" class="uk-progress" :value="total[1]" max="100"></b-progress>
                    </div>
                    <div class="be-entitywrap">
          <em>{{ $t(types[2]) }}</em> {{ total[2] }}%
                    <br/>
          <b-progress size="is-small" type="is-info" class="uk-progress" :value="total[2]" max="100"></b-progress>
                    </div>
                    <div class="be-entitywrap">
          <em>{{ $t(types[3]) }}</em> {{ total[3] }}%
                    <br/>
          <b-progress size="is-small" type="is-info" class="uk-progress" :value="total[3]" max="100"></b-progress>
                    </div>
                    <div class="be-entitywrap">
          <em>{{ $t(types[4]) }}</em> {{ total[4] }}%
                    <br/>
          <b-progress size="is-small" type="is-info" class="uk-progress" :value="total[4]" max="100"></b-progress>
                    </div>
                    <div class="be-entitywrap">
          <em>{{ $t(types[5]) }}</em> {{ total[5] }}%
                    <br/>
          <b-progress size="is-small" type="is-info" class="uk-progress" :value="total[5]" max="100"></b-progress>
                    </div>
          </section>          
          <br />
          {{ $t("disclaimer") }}
      </div>
  </div> 
   <div>
        <li v-for="(c, i) in data" v-bind:key="c.cid" style="color:#2C5671">
            <ul 
                v-for="(q, j) in c.questions"
                v-bind:key="q.qid"
                :class="
                  currentCategoryIndex == i && currentQuestionIndex == j
                    ? 'uk-active'
                    : ''
                "
              >
              </ul>
          </li>
  </div>
</div> 

</template>

<script>
import json from "@/data/be-json-v3-saya.json";
import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import UIkit from "uikit"

Vue.use(Buefy)
// import i18n from "@/i18n";
/* eslint-disable */ 

export default {
  name: "Entity",
  data: function() {
    return {
      total: [0, 0, 0, 0, 0, 0],
      tempImp: [0, 0, 0, 0, 0, 0],
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
      ],
      exquestions: [
        "Where will your business operate?",
        "How much risk is there in your industry or profession?",
        "How do you feel about personal risk?",
        "How many owners will there be?",
        "Including yourself, how many employees will you have?",
        "How will you finance your organization?",
        "How do you feel about setup and administrative costs for the first few years?",
        "What's your financial forecast for your organization?",
        "How important is protecting your organization's name?"
      ]
    };
  },
  methods: {
    /**
     * Updates the totals based on the currently selected answer
     */
    updateTotal: function() {
      this.updateSelectedImp();
      for (let i = 0; i < 8; i++) {
        this.total[i] = this.total[i] + this.tempImp[i] - this.selectedImp[i];
      }
    },
    /**
     * Changes the current question
     * @param {number} c The category number
     * @param {number} q The question number
     * @param {boolean} open Whether current category nav is open, default true
     */
    changeCurrent: function(c, q, open = true) {
      if (this.currentCategoryIndex !== c && open)
        UIkit.nav(this.navElement).toggle(c);
      this.currentCategoryIndex = c;
      this.currentQuestionIndex = q;
      this.updateSelectedImp();
      this.tempImp = this.selectedImp;
      this.updateTotal();
    },
    /**
     * Checks how many questions are completed out of the category
     * @param {number} category The category number
     * @returns {number} The number of completed questions in the category
     */
    categoryCompletion: function(category) {
      let tally = 0;
      for (let i = 0; i < this.data[category].questions.length; i++)
        if (this.data[category].questions[i].completed > -1) tally++;
      return tally;
    },
    /**
     * Updates the impact selected on question change (could probably be a computed property instead)
     */
    updateSelectedImp: function() {
      if (this.current.completed == -1) this.selectedImp = [0, 0, 0, 0, 0, 0];
      else
        this.selectedImp = this.current.answers[this.current.completed].impact;
    },
    /**
     * Advances to the next question
     */
    next: function() {
      if (
        this.currentQuestionIndex ==
        this.data[this.currentCategoryIndex].questions.length - 1
      ) {
        if (this.currentCategoryIndex != this.data.length - 1)
          this.changeCurrent(this.currentCategoryIndex + 1, 0);
      } else this.changeCurrent(this.currentCategoryIndex, this.currentQuestionIndex + 1);
    },
    /**
     * Goes back to the previous question
     */
    previous: function() {
      if (this.currentQuestionIndex == 0) {
        if (this.currentCategoryIndex != 0)
          this.changeCurrent(
            this.currentCategoryIndex - 1,
            this.data[this.currentCategoryIndex - 1].questions.length - 1
          );
      } else this.changeCurrent(this.currentCategoryIndex, this.currentQuestionIndex - 1);
    },
    /**
     * Saves the selected question option
     * @param {number} answer The index of the selected option
     */
    onSelect: function(answer) {
      this.tempImp = this.current.answers[answer].impact;
      this.updateTotal();
      console.log("onselect");
      console.log(answer)
      console.log(this.current)
      this.current.completed = answer;
    },
    /**
     * Toggles display language
     */
    toggleLocale: function() {
      this.$i18n.locale = this.locale == "en" ? "fr" : "en";
    }
  },
  computed: {
    /**
     * @returns The data for the current question
     */
    current: function() {
      //return this.data[this.currentCategory].questions[this.currentQuestionIndex];
      console.log(this.data)
      return this.data.collection[`cat-${this.currentCategoryIndex}`].answers[`a${this.currentQuestionIndex}`];
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
   
  },
  mounted() {
    this.navElement = document.getElementById("nav");
    UIkit.nav(this.navElement).toggle(0); // Toggles the first nav open

  
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
h2{
  text-align: left;
  font-size: 30px;
}
p {
  font-weight: 50;
  color: #edf3f7;
}
em {
  color: #edf3f7;
}
.uk-progress {
  margin-bottom: 15px;
  margin-top: 15px;
  margin-right: 20px;
  margin-left: 20px;
  height: 7px;
  border-color: #edf3f7;
}
.uk-button-group {
  border-style: solid;
  border: #edf3f7;
}
.uk-button {
  border-style: solid;
  border-color: #2C5671;  
}
.be-entitywrap{
  border-style: solid;
  border-color: #edf3f7;
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
/* div{
  border-style: solid;
  border-color: pink;
} */
</style>
