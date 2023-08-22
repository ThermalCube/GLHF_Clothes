<script setup>
import { computed, ref } from "vue";

const props = defineProps({
	name: {
		type: String,
		required: false,
	},
	modelValue: {
		type: Number,
		required: true,
	},
	min: {
		type: Number,
		default: 0,
	},
	max: {
		type: Number,
		required: true,
	},
	options: {
		type: Object,
		required: true,
	},
});

const emit = defineEmits(["update:modelValue"]);

const value = computed({
	get() {
		return props.modelValue;
	},
	set(val) {
		const initVal = val;

		if (val === "") {
			val = props.min;
		}

		if (typeof val === "number") {
			val = Math.max(props.min, Math.min(props.max, val));
		}

		if (initVal !== val) {
			input.value.value = val;
		}

		emit("update:modelValue", val);
	},
});
</script>
<template>
	<div class="container">
		<div class="label">
			<span>{{ name }}</span>
		</div>
		<div class="swatches">
			<div
				class="swatch"
				v-for="(hex, id) in options"
				:key="id"
				:title="id"
				:style="{ backgroundColor: hex }"
				@click.prevent="value = parseInt(id)"
				:class="{ active: value == id }"
			></div>
		</div>
	</div>
</template>
<style scoped lang="scss">
@import "@/assets/_variables.scss";

.container {
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	justify-content: center;

	background-color: rgba(10, 10, 10, 0.5);
	border-radius: 15px;
	padding: 10px 15px;
	margin-bottom: 10px;

	& * {
		user-select: none;
	}
}

.swatches {
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
	margin-top: 5px;
}

$size: 25px;

.swatch {
	box-sizing: border-box;
	display: inline-block;
	width: $size;
	height: $size;
	border-radius: $size;
	border: 1px solid black;
	background-color: #ff007f;
	margin: 3px;
	cursor: pointer;

	&:hover {
		border-color: $accent;
	}
	&.active {
		border-color: $accent2;
	}
}

.label {
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	justify-content: space-between;

	color: hsla(0, 0%, 100%, 0.5);

	& span {
		flex-basis: 100%;

		&:nth-child(1) {
			text-align: left;
		}
	}
}
</style>