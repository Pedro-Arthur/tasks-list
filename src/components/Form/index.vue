<template>
  <form @submit.prevent="$emit('submit')">
    <InputWrapper
      placeholder="Descrição"
      :value="value.description"
      @input="(v) => input(v, 'description')"
      required
    />

    <InputWrapper
      type="date"
      placeholder="Data"
      :value="value.date"
      @input="(v) => input(v, 'date')"
      required
    />

    <InputWrapper
      type="time"
      placeholder="Hora"
      :value="value.hour"
      @input="(v) => input(v, 'hour')"
      required
    />

    <CButton type="submit" icon="plus" text="Adicionar" />
  </form>
</template>

<script>
import CButton from "../Button";
import { InputWrapper } from "./style";

export default {
  name: "CForm",

  components: {
    CButton,
    InputWrapper,
  },

  props: {
    value: {
      type: Object,
      default: () => {},
    },
  },

  methods: {
    input(value, key) {
      this.$emit("input", { ...this.value, [key]: value });
    },
  },
};
</script>
