<template>
    <div>
        <md-button class="md-raised md-primary" @click="() => {showDialog = true; sending = false;}">Add Signature</md-button>

        <md-dialog :md-active.sync="showDialog" class="main-dialog">
            <md-dialog-title>Adding Signature</md-dialog-title>
            <div class="dialog-conent">
                <form novalidate class="md-layout">
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100">
                            <md-field :class="getValidationClass('fullName')">
                                <label for="full-name">Full Name</label>
                                <md-input name="full-name" id="full-name" autocomplete="full-name"
                                    v-model="form.fullName" :disabled="sending" />
                                <span class="md-error" v-if="!$v.form.fullName.required">The full name is required</span>
                                <span class="md-error" v-else-if="!$v.form.fullName.minlength">Invalid full name</span>
                            </md-field>
                        </div>

                        <div class="md-layout-item md-small-size-100">
                            <md-field :class="getValidationClass('title')">
                                <label for="title">Title</label>
                                <md-input name="title" id="title" autocomplete="title" v-model="form.title"
                                    :disabled="sending" />
                                <span class="md-error" v-if="!$v.form.title.required">The title is required</span>
                                <span class="md-error" v-else-if="!$v.form.title.minlength">Invalid title</span>
                            </md-field>
                        </div>

                        <div class="md-layout-item md-small-size-100">
                            <md-field :class="getValidationClass('company')">
                                <label for="company">Company</label>
                                <md-input name="company" id="company" autocomplete="company" v-model="form.company"
                                    :disabled="sending" />
                                <span class="md-error" v-if="!$v.form.company.required">The company is required</span>
                                <span class="md-error" v-else-if="!$v.form.company.minlength">Invalid company</span>
                            </md-field>
                        </div>

                        <div class="md-layout-item md-small-size-100">
                            <md-field :class="getValidationClass('phone')">
                                <label for="phone">Phone</label>
                                <md-input name="phone" id="phone" autocomplete="phone" v-model="form.phone"
                                    :disabled="sending" />
                                <span class="md-error" v-if="!$v.form.phone.required">The phone is required</span>
                                <span class="md-error" v-else-if="!$v.form.phone.minlength">Invalid phone</span>
                            </md-field>
                        </div>

                        <div class="md-layout-item md-small-size-100">
                            <md-field :class="getValidationClass('address')">
                                <label for="address">Address</label>
                                <md-input name="address" id="address" autocomplete="address" v-model="form.address"
                                    :disabled="sending" />
                                <span class="md-error" v-if="!$v.form.address.required">The address is required</span>
                                <span class="md-error" v-else-if="!$v.form.address.minlength">Invalid address</span>
                            </md-field>
                        </div>
                    </div>

                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100">
                            <md-field :class="getValidationClass('layout')">
                                <label for="layout">Layout</label>
                                <md-select name="layout" id="layout" v-model="form.layout" md-dense :disabled="sending">
                                    <md-option></md-option>
                                    <md-option value="1">First</md-option>
                                    <md-option value="2">Second</md-option>
                                </md-select>
                                <span class="md-error">The layout is required</span>
                            </md-field>
                        </div>
                    </div>

                    <md-field :class="getValidationClass('email')">
                        <label for="email">Email</label>
                        <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email"
                            :disabled="sending" />
                        <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
                        <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
                    </md-field>


                    <md-snackbar :md-active.sync="entitySaved">The signature was saved with success!</md-snackbar>

                    <md-dialog-actions>
                        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
                        <md-button class="md-primary" @click="() => validateEntity()">Save</md-button>
                    </md-dialog-actions>
                </form>
            </div>


        </md-dialog>
    </div>
</template>

<script src="./add-entity.js"></script>

<style lang="scss">
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }

  .dialog-conent {
    width: 400px;
    padding: 0 25px;
  }

  .main-dialog .md-dialog-container{
    overflow-y: auto !important;
  }
</style>