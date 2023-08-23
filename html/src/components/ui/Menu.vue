<script setup>
import { computed, inject, onMounted, ref, watch } from "vue";
import { RouterLink, RouterView } from "vue-router";

const props = defineProps({
	items: {
		type: Array,
		required: true,
		default: () => [
			"fa-solid fa-fingerprint",
			"fa-regular fa-face-smile",
			"fa-solid fa-person",
			"fa-solid fa-shoe-prints",
			"fa-solid fa-shoe-prints",
		],
	},
});
</script>
<template>
	<div class="menu">
		<div class="menu__item" v-for="item in items">
			<fa :icon="item" size="2x" fixed-width />
		</div>
	</div>
</template>
<style lang="scss" scoped>
@import "@/assets/_variables.scss";

$size: 50px;

.menu {
	position: absolute;
	display: flex;
	width: $size;
	min-height: 50px;
	left: -($size + 15px);
	background-color: rgba(10, 10, 10, 0.5);
	border-radius: 15px;
	padding-top: 15px;
	padding-bottom: 15px;
	padding: 5px;
	box-sizing: border-box;
	flex-direction: column;
	justify-content: center;

	&__item {
		display: inline-flex;
		flex-direction: column;
		justify-content: center;
		width: $size;
		height: $size;
		box-sizing: border-box;
		color: $accent;

		&:hover {
			color: $accent2;
		}
	}
}
</style>