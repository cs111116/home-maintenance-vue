import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    profile: {}
  }),
  actions: {
    updateProfile(profile) {
      this.profile = profile;
    }
  }
});
