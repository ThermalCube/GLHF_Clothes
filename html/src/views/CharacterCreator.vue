<script setup>
import { computed, inject, onMounted, ref, watch } from "vue";
import { RouterLink, RouterView } from "vue-router";

import ComponentSlider from "@/components/ComponentSlider.vue";
import ComponentInput from "@/components/ComponentInput.vue";
import ComponentColor from "@/components/ComponentColor.vue";
import * as Restrictions from "@/assets/restrictions.js";
import {
	slider as CT_Slider,
	color as CT_Color,
} from "@/assets/controlTypes.js";

import { useComponentStore } from "@/stores/componentStore";

const componentStore = useComponentStore();

onMounted(async () => {
	await componentStore.tryInit();
});
</script>
<template>
	<div>
		<div
			v-for="comp in Restrictions.all"
			:key="comp"
			:set="(component = componentStore.getComponent(comp))"
		>
			<template v-if="CT_Slider.indexOf(comp) > -1">
				<component-slider
					:modelValue="componentStore.componentModels[comp]"
					@update:modelValue="
						(newValue) =>
							componentStore.setComponent(comp, newValue)
					"
					:min="component.min"
					:max="componentStore.maxVals[comp]"
					:isPercent="componentStore.maxVals[comp] == 100"
					:name="component.label"
				/>
			</template>
			<template v-else-if="CT_Color.indexOf(comp) > -1">
				<component-color
					:modelValue="componentStore.componentModels[comp]"
					@update:modelValue="
						(newValue) =>
							componentStore.setComponent(comp, newValue)
					"
					:min="component.min"
					:max="componentStore.maxVals[comp]"
					:name="component.label"
					:options="componentStore.hairColors"
				/>
			</template>
			<template v-else>
				<component-input
					:modelValue="componentStore.componentModels[comp]"
					@update:modelValue="
						(newValue) =>
							componentStore.setComponent(comp, newValue)
					"
					:min="component.min"
					:max="componentStore.maxVals[comp]"
					:name="component.label"
				/>
			</template>
		</div>
	</div>
</template>

<style lang="scss" scoped>
</style>