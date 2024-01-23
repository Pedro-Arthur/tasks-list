import { mount } from "@vue/test-utils";
import Card from "../../src/components/Card";
import { CardLine, CardTitle, CardWrapper } from "../../src/components/Card/style";

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

  it("should throw an error if task prop is not provided", () => {
    let error;

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    try {
      mount(Card, {
        propsData: {},
      });
    } catch (e) {
      error = e;
    } finally {
      consoleErrorSpy.mockRestore();
    }

    expect(error).toBeDefined();
    expect(error.message.startsWith("Cannot read properties of undefined")).toBe(true);
  });

  it("should format the date correctly", () => {
    const wrapper = mount(Card, {
      propsData: {
        task: {
          description: "test",
          hour: "12:12",
          date: "2022-08-29",
        },
      },
    });
    expect(wrapper.vm.formattedDate).toBe("29/08/2022");
  });

  it("should render the correct DOM structure", () => {
    const wrapper = mount(Card, {
      propsData: {
        task: {
          description: "test",
          hour: "12:12",
          date: "2022-08-29",
        },
      },
    });

    expect(wrapper.findComponent(CardWrapper).exists()).toBeTruthy();
    expect(wrapper.findComponent(CardTitle).exists()).toBeTruthy();
    expect(wrapper.findComponent(CardLine).exists()).toBeTruthy();
    expect(wrapper.findAll("p").wrappers.length).toBe(2);
    expect(wrapper.findAll("svg").wrappers.length).toBe(2); // mdi icons
  });
});
