<template>
  <FormWrapper @submit.prevent="$emit('submit')">
    <FormTitle>Nova tarefa</FormTitle>

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
  </FormWrapper>
</template>

<script>
import CButton from "../Button";
import { FormWrapper, InputWrapper, FormTitle } from "./style";

export default {
  name: "CForm",

  components: {
    CButton,
    FormWrapper,
    InputWrapper,
    FormTitle,
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
