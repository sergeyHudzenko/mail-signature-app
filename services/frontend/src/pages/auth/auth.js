import AuthAPI from "@/api/auth";
import notify from "@/helpers/notify";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength
} from "vuelidate/lib/validators";

export default {
  name: "Auth",
  mixins: [validationMixin],
  data: () => ({
    loginView: false,
    form: {
      fullname: null,
      password: null,
      email: null,
    },
    userSaved: false,
    sending: false,
    lastUser: null,
  }),
  validations: {
    form: {
      fullname: {
        required,
        minLength: minLength(3),
      },
      password: {
        required,
        minLength: minLength(3),
      },
      email: {
        required,
        email,
      },
    },
  },
  methods: {
    checkValidFields(fields) {
      if (fields.length > 0) {
        for (let field of fields) {
          if(this.$v.form[field].$invalid) {
            return field
          }
        }
      }
    },
    submit(kind = 'signup') {
      
      if(kind === 'signup') {
        if(this.checkValidFields(['email', 'fullname', 'password'])) { 
          notify(this, 'error', 'Some fields filled not correctly. Please check!')
          return;
        }
        AuthAPI.register(this)
      } else if (kind === 'signin') {
        if(this.checkValidFields(['email', 'password'])) { 
          notify(this, 'error', 'Some fields filled not correctly. Please check!')
          return;
        }
        AuthAPI.login(this)
      }

      this.$refs.form.reset()
    },
    doLogin() {
      this.loginView = true
    },
    doRegistration() {
      this.loginView = false
    },
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
      this.form.firstName = null;
      this.form.lastName = null;
      this.form.age = null;
      this.form.gender = null;
      this.form.email = null;
    },
    saveUser() {
      this.sending = true;

      // Instead of this timeout, here you can call your API
      window.setTimeout(() => {
        this.lastUser = `${this.form.firstName} ${this.form.lastName}`;
        this.userSaved = true;
        this.sending = false;
        this.clearForm();
      }, 1500);
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveUser();
      }
    },
  },
};
