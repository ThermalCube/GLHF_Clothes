import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { $axios } from '@/plugins/axios';
import * as R from "ramda";
import hc from "@/assets/hairColors.js";

export const useComponentStore = defineStore("componentStore", () => {

    const componentModels = ref({});
    const components = ref(null);
    const maxVals = ref(null);
    const hairColors = ref(hc);

    async function tryInit() {
        if (components.value === null || maxVals.value === null) {
            await fetchData();
            initValues();
        }
    }

    async function fetchData() {
        if (import.meta.env.DEV) {
            components.value = (await import("@/dummy/components")).default;
            maxVals.value = (await import("@/dummy/maxVals")).default;
        } else {
            const resp = await $axios.post("fetchData");
            components.value = resp.data.components;
            maxVals.value = resp.data.maxVals;
        }
    }

    function initValues() {
        components.value.forEach((component) => {
            componentModels.value[component.name] =
                component.value ?? component.min;
        });
    }


    const getComponent = computed(() => (name) => {
        if (!components.value) return null;

        let comp = R.find(R.propEq(name, "name"))(components.value);

        return comp;
    });


    async function setComponent(component, value) {
        componentModels.value[component] = value;

        const resp = await $axios.post("updateComponent", {
            component: component,
            value: value,
        });
        if (resp.data) {
            Object.assign(maxVals.value, resp.data);
        }
    }



    return {
        componentModels, components, maxVals, hairColors,
        tryInit, fetchData, initValues, setComponent,
        getComponent
    };
});