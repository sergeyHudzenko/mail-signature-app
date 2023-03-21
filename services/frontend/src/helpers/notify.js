function notify(that, type, response) {
  that.$root.$refs.$notify.init(type, response);
}

export default notify;
