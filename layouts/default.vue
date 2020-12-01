<template>
    <v-app>
        <div class="alert-container">
            <v-fade-transition group>
                <v-alert
                    v-for="notification in notifications"
                    :key="notification.id"
                    :type="notification.type"
                    dismissible
                    tile
                    @input="remove(notification)"
                >
                    {{notification.message}}
                </v-alert>
            </v-fade-transition>
        </div>

        <v-progress-linear
            :active="loading"
            indeterminate
            absolute
            fixed
            color="light-blue "
        ></v-progress-linear>
        <v-slide-x-transition leave-absolute>
            <nuxt />
        </v-slide-x-transition>

    </v-app>

</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
    data() {
        return { snackbar: true }
    },
    computed: {
        ...mapGetters(['loading']),
        ...mapState('notifications', ['notifications']),
    },
    methods: {
        ...mapActions('notifications', ['remove']),
    },
}
</script>

<style lang="scss">
.alert-container {
    position: fixed;
    width: 100%;
    z-index: 99;
}
</style>