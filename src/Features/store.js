import { configureStore } from "@reduxjs/toolkit";
import theme from "./globalUiVars/theme";
import changeQuality from "./globalUiVars/quality";
const store = configureStore({
  reducer: {
    theme,
    changeQuality,
  },
});

export default store;
