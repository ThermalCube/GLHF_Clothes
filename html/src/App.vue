<script setup>
import { computed, inject, onMounted, ref, watch } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useEventListener } from "@vueuse/core";
import { useComponentStore } from "@/stores/componentStore";
import Menu from "@/components/ui/Menu.vue";

if (false && import.meta.env.DEV) {
	import("@/assets/dev.css");
}

const componentStore = useComponentStore();

const rootcontainer = ref(null);

function hasScrollbar() {
	if (!rootcontainer.value) return false;
	return rootcontainer.value.scrollHeight > rootcontainer.value.clientHeight;
}

const isVisible = ref(false);

useEventListener(window, "message", function (evt) {
	const item = evt.data || evt.detail;

	if (item && item.type) {
		console.log(item);

		switch (item.type) {
			case "toggleShow":
				isVisible.value = !isVisible.value;
				break;
			case "setPlayerID":
				break;
		}
	}
});

onMounted(async () => {
	await componentStore.tryInit();
});
</script>

<template>
	<div class="rootwrapper" v-if="isVisible">
		<Menu />
		<div
			class="rootcontainer"
			ref="rootcontainer"
			:class="{ scroll: hasScrollbar() }"
		>
			<router-view></router-view>
		</div>
	</div>
</template>

<style scoped lang="scss">
@import "@/assets/_variables.scss";

$scrollbarsize: 10px;

.rootwrapper {
	position: absolute;
	display: block;
	box-sizing: border-box;
	top: 50px;
	right: 225px;
	bottom: 150px;
	width: 600px;
	height: calc(100% - 50px - 150px);
	color: #fff;
	z-index: 5;
}

.rootcontainer {
	position: relative;
	display: inline-block;
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	background-color: rgba(10, 10, 10, 0.5);
	border-radius: 15px;
	padding: 15px;
	color: #fff;
	overflow-x: hidden;
	overflow-y: auto;
	background-clip: padding-box;
	z-index: 10;

	&.scroll {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
		padding-right: calc(15px - #{$scrollbarsize});

		&::-webkit-scrollbar {
			width: $scrollbarsize;
			border-radius: 15px;

			&-track {
				background-color: rgba(10, 10, 10, 0.5);
				border-top-right-radius: 15px;
				border-bottom-right-radius: 15px;
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
