<template>
  <form @submit.prevent="$emit('submit')">
    <input
      placeholder="Descrição"
      :value="value.description"
      @input="(event) => input(event.target.value, 'description')"
    />

    <input
      type="date"
      placeholder="Data"
      :value="value.date"
      @input="(event) => input(event.target.value, 'date')"
    />

    <input
      type="time"
      placeholder="Hora"
      :value="value.hour"
      @input="(event) => input(event.target.value, 'hour')"
    />

    <CButton type="submit" text="Adicionar" />
  </form>
</template>

<script>
import CButton from "../Button";

export default {
  name: "CForm",

  components: {
    CButton,
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
