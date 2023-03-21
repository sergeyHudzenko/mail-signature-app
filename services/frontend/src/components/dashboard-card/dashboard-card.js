import MailAPI from "@/api/mail";

export default {
  name: "DashboardCard",
  created() {
    MailAPI.getSignatures(this);
  },
  methods: {
    remove(id) {
        MailAPI.removeSignatures(this, { id });
    }
  }
};
