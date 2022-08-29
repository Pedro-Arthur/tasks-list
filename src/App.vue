<template>
  <ThemeProvider :theme="theme">
    <IndexPage />
  </ThemeProvider>
</template>

<script>
import { ThemeProvider } from "vue-styled-components";
import theme from "./theme/theme";
import IndexPage from "./pages/index.vue";

export default {
  name: "App",

  data() {
    return {
      theme,
    };
  },

  components: {
    IndexPage,
    ThemeProvider,
  },
};
</script>
