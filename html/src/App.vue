<script setup>
import { computed, inject, onMounted, ref, watch } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useEventListener } from "@vueuse/core";
import * as R from "ramda";
import ComponentSlider from "@/components/ComponentSlider.vue";
import ComponentInput from "@/components/ComponentInput.vue";
import ComponentColor from "@/components/ComponentColor.vue";
import hc from "@/assets/hairColors.js";
import * as Restrictions from "@/assets/restrictions.js";
import {
	slider as CT_Slider,
	color as CT_Color,
} from "@/assets/controlTypes.js";

if (import.meta.env.DEV) {
	import("@/assets/dev.css");
}

const $axios = inject("$axios");

const rootcontainer = ref(null);

function hasScrollbar() {
	if (!rootcontainer.value) return false;
	return rootcontainer.value.scrollHeight > rootcontainer.value.clientHeight;
}

const isVisible = ref(false);
const playerId = ref(null);

const msg = computed(() => {
	if (playerId.value != null) {
		return `Deine PlayerId ist: ${playerId.value}`;
	} else {
		return "Deine PlayerId wird geladen";
	}
});

useEventListener(window, "message", function (evt) {
	const item = evt.data || evt.detail;

	if (item && item.type) {
		console.log(item);

		switch (item.type) {
			case "toggleShow":
				isVisible.value = !isVisible.value;
				break;
			case "setPlayerID":
				playerId.value = item.data;
				break;
		}
	}
});

onMounted(async () => {
	await fetchData();
	initValues();
});

const components = ref(null);
const maxVals = ref(null);

const componentNames = computed(() => {
	if (components.value == null) return null;
	let result = [];
	for (let i = 0; i < components.value.length; i++) {
		const component = components.value[i];
		result.push(component.name);
	}
	return result;
});

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

function getComponent(name) {
	if (!components.value) return null;

	let comp = R.find(R.propEq(name, "name"))(components.value);

	return comp;
}

const componentModels = ref({});

let unwatch;

function initValues() {
	if (unwatch) unwatch();

	components.value.forEach((component) => {
		componentModels.value[component.name] =
			component.value ?? component.min;
	});
}

async function componentUpdate(component, value) {
	componentModels.value[component] = value;

	const resp = await $axios.post("updateComponent", {
		component: component,
		value: value,
	});
	if (resp.data) {
		Object.assign(maxVals.value, resp.data);
	}
}

const hairColors = ref(hc);
</script>

<template>
	<div
		class="rootcontainer"
		ref="rootcontainer"
		v-if="isVisible"
		:class="{ scroll: hasScrollbar() }"
	>
		<p>{{ msg }}</p>
		<!--<pre>{{ componentNames }}</pre>-->
		<div
			v-for="comp in Restrictions.all"
			:key="comp"
			:set="(component = getComponent(comp))"
		>
			<template v-if="CT_Slider.indexOf(comp) > -1">
				<component-slider
					:modelValue="componentModels[comp]"
					@update:modelValue="
						(newValue) => componentUpdate(comp, newValue)
					"
					:min="component.min"
					:max="maxVals[comp]"
					:isPercent="maxVals[comp] == 100"
					:name="component.label"
				/>
			</template>
			<template v-else-if="CT_Color.indexOf(comp) > -1">
				<component-color
					:modelValue="componentModels[comp]"
					@update:modelValue="
						(newValue) => componentUpdate(comp, newValue)
					"
					:min="component.min"
					:max="maxVals[comp]"
					:name="component.label"
					:options="hairColors"
				/>
			</template>
			<template v-else>
				<component-input
					:modelValue="componentModels[comp]"
					@update:modelValue="
						(newValue) => componentUpdate(comp, newValue)
					"
					:min="component.min"
					:max="maxVals[comp]"
					:name="component.label"
				/>
			</template>
		</div>
	</div>
</template>

<style scoped lang="scss">
@import "@/assets/_variables.scss";

$scrollbarsize: 10px;

.rootcontainer {
	position: absolute;
	display: block;
	box-sizing: border-box;
	top: 50px;
	right: 225px;
	bottom: 150px;
	width: 600px;
	height: calc(100% - 50px - 150px);
	background-color: rgba(10, 10, 10, 0.5);
	border-radius: 15px;
	padding: 15px;
	color: #fff;
	overflow-x: hidden;
	overflow-y: auto;
	background-clip: padding-box;

	&.scroll {
		border-radius: 0 15px;
		padding-right: calc(15px - #{$scrollbarsize});

		&::-webkit-scrollbar {
			width: $scrollbarsize;
			border-radius: 15px;

			&-track {
				background-color: rgba(10, 10, 10, 0.5);
				border-radius: 15px 0;
				background-clip: content-box;
			}

			&-thumb {
				background-color: $accent;
				border-radius: 15px;
				border: 2px solid transparent;
				background-clip: content-box;

				&:active,
				&:hover {
					background-color: $accent2;
				}
			}
		}
	}
}
</style>
