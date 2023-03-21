<template>
    <div class="md-layout">
        <div class="md-layout-item"></div>
        <div class="md-layout-item">
            <form ref="form" novalidate class="md-layout" @submit.prevent="validateUser">
            <md-card class="md-layout-item ">
                <md-card-header>
                    <div v-if="!loginView" class="md-title">Sgin up to Mail Signature App</div>
                    <div v-else class="md-title">Sgin in to Mail Signature App</div>
                </md-card-header>

                <md-card-content>
                    <md-field v-if="!loginView" :class="getValidationClass('fullname')">
                        <label for="fullname">Your name</label>
                        <md-input type="fullname" name="fullname" id="fullname" autocomplete="fullname" v-model="form.fullname"
                            :disabled="sending" />
                            <span class="md-hint" v-if="!$v.form.fullname.required">The field is required</span>
                    </md-field>

                    <md-field :class="getValidationClass('email')">
                        <label for="email">Email</label>
                        <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email"
                            :disabled="sending" />
                        <span class="md-hint" v-if="!$v.form.email.required">The email is required</span>
                        <span class="md-hint" v-if="!$v.form.email.email">Invalid email</span>
                    </md-field>

                    <md-field :class="getValidationClass('password')">
                        <label for="password">password</label>
                        <md-input type="password" name="password" id="password" autocomplete="password" v-model="form.password"
                            :disabled="sending" />
                            <span class="md-hint" v-if="!$v.form.password.required">The password is required</span>
                    </md-field>
                </md-card-content>

                <md-progress-bar md-mode="indeterminate" v-if="sending" />

                <md-card-actions>
                    <md-button v-if="!loginView" type="button" @click="doLogin" class="md-secondary" :disabled="sending">Login</md-button>
                    <md-button v-else type="button" @click="doRegistration" class="md-secondary" :disabled="sending">Sign Up</md-button>

                    <md-button v-if="!loginView" type="button" @click="() => submit('signup')" class="md-primary" :disabled="sending">Create user</md-button>
                    <md-button v-else type="button"  @click="() => submit('signin')" class="md-primary" :disabled="sending">Sign In</md-button>
                </md-card-actions>
            </md-card>

            <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
        </form>
        </div>
        <div class="md-layout-item"></div>
        
    </div>
</template>

<script src="./auth.js"></script>

<style lang="scss" scoped>
.md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
}</style>