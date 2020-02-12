import { shallowMount } from "@vue/test-utils";
import BookListItem from "./BookListItem.vue";

describe("BookListItem.vue", () => {
  it("BookListItem has imageUrl", () => {
    const wrapper = shallowMount(BookListItem, {
      propsData: {
        data: {
          name: "name",
          iamge: "https://iss.ndl.go.jp/thumbnail/9784091285607"
        }
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("BookListItem does not have imageUrl", () => {
    const wrapper = shallowMount(BookListItem, {
      propsData: {
        data: {
          name: "name",
          iamge: ""
        }
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
