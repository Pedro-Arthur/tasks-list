import { mount } from "@vue/test-utils";
import Button from "../../src/components/Button";

describe("button", () => {
  it("should be a vue instance", () => {
    const wrapper = mount(Button, {
      propsData: {
        task: {
          text: "teste",
        },
      },
    });

    expect(wrapper.vm).toBeDefined();
  });
});
