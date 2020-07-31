import { mount } from "@vue/test-utils";
import Vue from "vue";
import VueI18n from "vue-i18n";
import Entity from "@/components/Entity.vue";
import NonProfit from "@/components/NonProfit.vue"
import Results from "@/components/Results.vue"

Vue.use(VueI18n);

export const i18n= new VueI18n({
  locale: "en"
});

describe("Entity.vue", () => {

  it("Entity vue passes correct entity based on mocked content", () => {
    let mockedResults = {
      bestEntitiesId: [3]
    } 
    expect(wrapper.vm.$bestEntities).toEqual("3");
  });
});
