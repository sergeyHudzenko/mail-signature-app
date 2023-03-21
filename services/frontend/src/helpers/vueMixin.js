import store from '@/store';
import Vue from 'vue';

Vue.mixin({
    computed: {
        console: () => console,
        state: () => store.getters,
    }
})
  