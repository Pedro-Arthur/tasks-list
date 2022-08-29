<template>
  <ButtonWrapper @click="$emit('click')" :type="type" :color="color">
    <mdicon v-if="icon !== null" :name="icon" />
    {{ text }}
  </ButtonWrapper>
</template>

<script>
import { ButtonWrapper } from "./style";

export default {
  name: "CButton",
  components: {
    ButtonWrapper,
  },
  props: {
    text: {
      type: String,
      default: "text",
    },
    color: {
      type: String,
      default: "primary",
    },
    type: {
      type: String,
      default: "button",
    },
    icon: {
      type: String,
      default: null,
    },
  },
};
</script>
