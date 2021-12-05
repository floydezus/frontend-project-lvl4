import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import routes from '../routes.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('user'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async () => {
    try {
      const resp = await axios.get(routes.dataPath(), {
        headers: getAuthHeader(),
      });
      console.log(resp.data);
    } catch (err) {
      console.error(err);
    }
  }
)

const channelSlice = createSlice({
  name: channels,
  initialState: {
    channels: [],
  },
  reducers: {
    setChannels() {},
    addChannel() {},
    renameChannel() {},
    removeChannel() {},
  },
  extraReducers: {
    [fetchChannels.pending]: (state, action) => {},
    [fetchChannels.rejected]: (state, action) => {},
    [fetchChannels.fulfilled]: (state, action) => {},

  },

});

export const { setChannels, addChannel, renameChannel, removeChannel } = channelSlice.actions;

export default channelSlice.reducer;
