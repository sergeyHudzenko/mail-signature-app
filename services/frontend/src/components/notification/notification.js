
export default {
  name: 'Notification',
  data: () => ({
    isVisible: false,
    item: {
      type: '',
      text: '',
    },
    timeout: 5000,
  }),
  methods: {
    init(type, text) {
      this.isVisible = true;
      this.item = {
        type,
        text,
      };

      setTimeout(() => this.close(), this.timeout);
    },
    close() {
      this.isVisible = false;
      this.reset();
    },
    reset() {
      this.item = {
        type: '',
        text: '',
      };
    },
  },
  created() {
    this.$root.$refs.$notify = this;
  },
};
