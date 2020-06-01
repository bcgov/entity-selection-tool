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
          <template v-for="(value, index) in current">
            <label v-bind:key="`${index}${currentCategoryIndex}`">
              <input
                type="radio"
                class="be-radio"
                name="questions"
                :id="index"
               :checked="index === userSelectedAnswer[`cat-${currentCategoryIndex}`].answerIndex"
                @click="onSelect(value,index)"
              />
             {{value[`title_${locale}`]}}
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


          <template v-for="(value, index) in data.entities">
           
            

               <div class="be-entitywrap"  v-bind:key="index">
                   <em>{{value[`title_${locale}`] }}</em> {{ entitiesTotal[index].total }}%
               <br/>
                <b-progress size="is-small" type="is-info" class="uk-progress" :value="entitiesTotal[index].total" min="0"></b-progress>
               </div>

          
          </template>


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
import json from "@/data/be-json-v4-david-BC.json";
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
    //  this.tempImp = this.current.answers[answer].impact;
      //this.updateTotal();
      //record user selection
      this.userSelectedAnswer[`cat-${this.currentCategoryIndex}`].answerIndex = answerIndex;
       this.userSelectedAnswer[`cat-${this.currentCategoryIndex}`].impact = answer.impact;


       //console.log(this.userSelectedAnswer)

       // calculated new total for all:
    let entitiesIndex=0; // position of entitity in impact array
    for (let [key, value] of Object.entries(this.data.entities)){

      let totalImpact=0;

    
          for (let [key, value] of Object.entries(this.userSelectedAnswer)){
            if(value.answerIndex !="notset"){
              let anwserImpact = value.impact
              let impactValue = anwserImpact[entitiesIndex] || 0;
               totalImpact = totalImpact + impactValue;
            }
          }
       
       //}// end for 
       entitiesIndex++;
       this.entitiesTotal[key].total = totalImpact;

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
