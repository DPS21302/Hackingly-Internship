// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/provider/redux//authSlice";
import userProfileReducer from "@/provider/redux/userProfileSlice";
import listOppSliceReducer from "./listOppSlice";
import orgDetailsSliceReducer from "./orgDetailsSlice";
import orgUserSliceReducer from "./orgUserSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    userProfile: userProfileReducer,
    listOpp: listOppSliceReducer,
    orgDetails: orgDetailsSliceReducer,
    orgUsers: orgUserSliceReducer,
  },
});

export default store;
