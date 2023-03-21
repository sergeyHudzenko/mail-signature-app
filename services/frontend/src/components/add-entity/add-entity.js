import MailAPI from "@/api/mail";
import { validationMixin } from "vuelidate";
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  name: "AddEntity",
  data: () => ({
    showDialog: false,
    form: {
      fullName: null,
      title: null,
      company: null,
      phone: null,
      email: null,
      address: null,
      layout: null,
    },
    entitySaved: false,
    sending: false
  }),
  mixins: [validationMixin],
  validations: {
    form: {
      fullName: {
        required,
        minLength: minLength(3),
      },
      title: {
        required,
        minLength: minLength(3),
      },
      company: {
        required,
        minLength: minLength(3),
      },
      phone: {
        required,
        minLength: minLength(3),
      },
      address: {
        required,
        minLength: minLength(3),
      },
      layout: {
        required,
      },
      email: {
        required,
        email,
      },
    },
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.fullName = null,
      this.form.title = null,
      this.form.company = null,
      this.form.phone = null,
      this.form.email = null,
      this.form.address = null,
      this.form.layout = null
    },
    async saveEntity() {
      this.sending = true;

      await MailAPI.saveSignature(this, this.form);
    },
    validateEntity() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveEntity();
      }
    },
  },
};
