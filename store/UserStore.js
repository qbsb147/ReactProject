import axios from 'axios';
import { create } from 'zustand';

const UserStore = create((set) => ({
  login: null,
  loading: false,
  error: null,

  getUser: async () => {
    set({ loading: true, error: null });

    try {
      const response = await axios.get('http://localhost:3001/users');

      set({ login: response.data, loading: false });
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },
}));

export default UserStore;
