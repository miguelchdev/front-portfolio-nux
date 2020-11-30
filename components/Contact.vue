<template>
    <div class="bg-dark full-view">
        <v-container class="px-sm-12 px-5 padding-y parent-height d-flex flex-column">
            <v-lazy
                v-if="ready"
                :options="{threshold: 1}"
                min-height="50px"
                transition="scroll-x-transition"
            >
                <h1
                    v-if="title"
                    class="text-sm-justify text-center"
                >
                    {{ title }}
                </h1>
            </v-lazy>
            <v-lazy
                v-if="ready"
                :options="{threshold: 1}"
                min-height="50px"
                transition="scroll-x-transition"
            >
                <p class="description-services">
                    {{ page_contents.description }}
                </p>
            </v-lazy>
            <v-container>
                <v-lazy
                    v-if="ready"
                    :options="{threshold: 0.25}"
                    min-height="300px"
                    transition="scroll-x-transition"
                >
                    <v-form
                        ref="form"
                        v-model="valid"
                    >
                        <v-row>
                            <v-col
                                cols="12"
                                md="4"
                            >
                                <v-text-field
                                    v-model="contact.name"
                                    :rules="nameRules"
                                    class="mb-3"
                                    required
                                    type="text"
                                    dark
                                >
                                    <template v-slot:label>
                                        {{ $t("contact.name") }}
                                    </template>
                                </v-text-field>
                            </v-col>
                            <v-col
                                md="4"
                                cols="12"
                            >
                                <v-text-field
                                    dark
                                    v-model="contact.email"
                                    :rules="emailRules"
                                    class="mb-3"
                                    required
                                    type="email"
                                >
                                    <template v-slot:label>
                                        {{ $t("contact.email") }}
                                    </template>
                                </v-text-field>
                            </v-col>
                            <v-col
                                md="8"
                                cols="12"
                            >
                                <v-textarea
                                    dark
                                    auto-grow
                                    class="mb-3"
                                    v-model="contact.message"
                                    :rules="mensajeRules"
                                >
                                    <template v-slot:label>
                                        {{ $t("contact.message") }}
                                    </template>
                                </v-textarea>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-lazy>

                <v-lazy
                    v-if="ready"
                    :options="{threshold: 1}"
                    min-height="50px"
                    transition="scroll-x-transition"
                >
                    <v-btn
                        :disabled="!valid"
                        dark
                        large
                        class="mt-4 mx-auto"
                        @click="validate"
                    >{{ $t("contact.send") }}</v-btn>
                </v-lazy>
                <v-dialog
                    v-model="showDialog"
                    width="500"
                    dark
                >
                    <v-card>
                        <v-card-title primary-title>
                            <h1 class="display-1">{{ $t(dialog.title) }}</h1>
                        </v-card-title>
                        <v-spacer></v-spacer>
                        <v-card-text>{{ $t(dialog.body) }}</v-card-text>
                    </v-card>
                </v-dialog>
            </v-container>
        </v-container>
    </div>
</template>

<script>
import portfolioApi from "@/services/portfolioApi";

import { checkEmail, checkName } from "@/helpers";

export default {
    name: "Contact",
    props: { title: String, images: Object, page_contents: Object },
    data() {
        return {
            showDialog: false,
            fields: {
                name: "name",
                email: "email",
                message: "message"
            },
            contact: {
                name: "",
                message: "",
                email: ""
            },
            postState: "error",
            valid: false
        };
    },
    watch: {
        "$i18n.locale": function(value) {
            this.setNameFields();
        }
    },
    computed: {
        nameRules() {
            const {
                fields: { name },
                getErrorMessage
            } = this;
            const missing = getErrorMessage("missing_input", name);
            const invalid = getErrorMessage("invalid_input", name);

            return [v => !!v || missing, v => checkName(v) || invalid];
        },
        emailRules() {
            const {
                fields: { email },
                getErrorMessage
            } = this;
            const missing = getErrorMessage("missing_input", email);
            const invalid = getErrorMessage("invalid_input", email);
            return [v => !!v || missing, v => checkEmail(v) || invalid];
        },
        mensajeRules() {
            const {
                fields: { message },
                getErrorMessage
            } = this;
            const missing = getErrorMessage("missing_input", message);
            const too_short = getErrorMessage("too_short", message);
            return [v => !!v || missing, v => v.length > 20 || too_short];
        },
        formValues() {
            const { email, message, name } = this.contact;
            return {
                from_email: email,
                to_email: "miguelchdev@gmail.com",
                body: message,
                subject: `Nuevo mensaje  de: ${name}`
            };
        },
        dialog() {
            const body = `contact.dialog.${this.postState}.body`;
            const title = `contact.dialog.${this.postState}.title`;
            return { title, body };
        },
        ready() {
            return this.$store.getters['pages/ready'];
        }
    },
    methods: {
        async validate() {
            if (this.$refs.form.validate()) {
                try {
                    let response = await portfolioApi.sendEmail(
                        this.formValues
                    );
                    this.postState = "success";
                } catch (error) {}

                this.showDialog = true;
            }
        },
        getErrorMessage(message, field) {
            return this.$root.$t(`errors.${message}`, {
                field: field
            });
        },
        setNameFields() {
            const { $root } = this;
            this.fields.name = $root.$t("contact.name");
            this.fields.email = $root.$t("contact.email");
            this.fields.message = $root.$t("contact.message");
        }
    },
    created() {
        this.setNameFields();
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/responsive-breakpoints.scss";
.description-services {
    font-weight: 400;
    font-size: 1rem;
    color: var(--v-darkText-base);
    padding: 5% 0 3% 0%;
    word-wrap: break-word;
}
@include respond-above(sm) {
    @media (orientation: portrait) {
        .full-view {
            min-height: 70vh;
            height: auto;
        }
        .parent-height {
            min-height: inherit;
        }
    }
    @media (orientation: landscape) {
        .full-view {
            min-height: 100vh;
            height: auto;
        }
    }
}
</style>
