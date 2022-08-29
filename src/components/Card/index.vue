<template>
  <CardWrapper>
    <CardLine>
      <mdicon name="pencil-outline" />
      <p>Descrição: {{ task.description }}</p>
    </CardLine>

    <CardLine>
      <mdicon name="calendar" />
      <p>Data: {{ task.date }}</p>
    </CardLine>

    <CardLine>
      <mdicon name="clock-outline" />
      <p>Hora: {{ task.hour }}</p>
    </CardLine>

    <slot name="actions"></slot>
  </CardWrapper>
</template>

<script>
import { CardWrapper, CardLine } from "./style";

export default {
  name: "CCard",

  components: {
    CardWrapper,
    CardLine,
  },

  props: {
    task: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
