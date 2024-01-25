import { mount } from "@vue/test-utils";

import Modal from "../../src/components/Modal";
import { ModalClose } from "../../src/components/Modal/style";

import localVue from "../localVue";

describe("modal", () => {
  it("should be a vue instance", () => {
    const wrapper = mount(Modal, {
      localVue,
      propsData: {
        title: "teste",
      },
    });

    expect(wrapper.vm).toBeDefined();
  });

  it("should have the correct title", () => {
    const modalTitle = "Teste";

    const wrapper = mount(Modal, {
      localVue,
      propsData: {
        title: modalTitle,
      },
    });

    const modalComponent = wrapper.findComponent(Modal);
    expect(modalComponent.props("title")).toBe(modalTitle);
  });

  it("should emit close event on click", async () => {
    const wrapper = mount(Modal, {
      localVue,
      propsData: {
        title: "teste",
      },
    });

    const closeBtn = wrapper.findComponent(ModalClose);
    await closeBtn.trigger("click");

    expect(wrapper.emitted().close).toBeTruthy();
  });
});
