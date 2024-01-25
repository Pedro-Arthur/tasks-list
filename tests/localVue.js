import { createLocalVue } from "@vue/test-utils";

import mdiVue from "mdi-vue/v2";
import * as mdijs from "@mdi/js";

import Vuex from "vuex";

const localVue = createLocalVue();

localVue.use(mdiVue, { icons: mdijs });

localVue.use(Vuex);

export default localVue;