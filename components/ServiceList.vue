<template>
    <v-container class="px-0">
        <v-row>
            <v-col
                v-for="service in services"
                :key="service.id"
                class="align-stretch"
                xl="4"
                lg="4"
                md="4"
                sm="4"
                cols="12"
            >
                <service-list-item
                    :title="service.title"
                    :description="service.description"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import ServiceListItem from "@/components/ServiceListItem.vue";

export default {
    name: "ServiceList",
    components: { ServiceListItem },
    props: {
        services: Array
    }
};
</script>
<style lang="scss">
/* global styles */
// @import "@/assets/styles/base.scss";
</style>

<style scoped lang="scss">
</style>