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

const input = ref(null);

function minus() {
	input.value.focus();

	value.value = Math.max(props.min, value.value - 1);
}

function plus() {
	input.value.focus();

	value.value = Math.min(props.max, value.value + 1);
}
</script>
<template>
	<div class="container">
		<div class="label">
			<span>{{ name }}</span>
			<span>{{ min }} | {{ max }}</span>
		</div>
		<div class="controls">
			<div class="minus" @click.prevent="minus">&#x2B9C;</div>
			<div class="slider">
				<input
					type="number"
					ref="input"
					v-model.number="value"
					:min="min"
					:max="max"
				/>
			</div>
			<div class="plus" @click.prevent="plus">&#x2B9E;</div>
		</div>
	</div>
</template>
<style scoped lang="scss">
@import "@/assets/_variables.scss";

.container {
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: center;

	background-color: rgba(10, 10, 10, 0.5);
	border-radius: 15px;
	padding: 10px 15px;
	margin-bottom: 10px;

	& * {
		user-select: none;
	}
}

input[type="number"] {
	-webkit-appearance: none;
	width: 100%;
	background: transparent;
	vertical-align: text-bottom;
	color: hsla(0, 0%, 100%, 0.5);
	color: $accent;
	text-align: center;
	border: 0;
	margin: 0;
	padding: 0;
	font-size: 1em;
	line-height: 1em;

	&:focus,
	&:hover {
		outline: none;
		color: #fff;
		color: $accent2;
	}

	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
}

.controls {
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	justify-content: space-between;

	.slider {
		flex-basis: 80%;
	}

	.minus,
	.plus {
		font-size: 1.4em;
		line-height: 1.4em;
		color: $accent;
		cursor: pointer;

		&:hover {
			color: $accent2;
		}
	}

	.minus {
		text-shadow: -1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
	}
	.plus {
		text-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
	}

	&:has(input:focus) .minus,
	&:has(input:focus) .plus {
		color: $accent2;
	}
}

.label {
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	justify-content: space-between;

	color: hsla(0, 0%, 100%, 0.5);

	& span {
		flex-basis: 50%;

		&:nth-child(1) {
			text-align: left;
		}

		&:nth-child(2) {
			text-align: right;
		}
	}
}
</style>