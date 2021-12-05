import { configureStore } from "@reduxjs/toolkit";
import channelReduces from "./channelSlice";

export default configureStore({
  reducer: {
    channels: channelReduces,
  }
});
