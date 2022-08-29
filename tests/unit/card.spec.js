import { mount } from "@vue/test-utils";
import Card from "../../src/components/Card";

describe("card", () => {
  it("should be a vue instance", () => {
    const wrapper = mount(Card, {
      propsData: {
        task: {
          description: "test",
          hour: "12:12",
          date: "2022-08-29",
        },
      },
    });

    expect(wrapper.vm).toBeDefined();
  });
});
