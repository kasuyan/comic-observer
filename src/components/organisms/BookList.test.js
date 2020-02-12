import { shallowMount } from "@vue/test-utils";
import BookList from "./BookList.vue";

describe("BookList.vue", () => {
  it("matches snapshot", () => {
    const items = ["item 1", "item 2"];
    const wrapper = shallowMount(BookList, {
      bookData: items
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
