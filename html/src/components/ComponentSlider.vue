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
	step: {
		type: Number,
		default: 1,
	},
	isPercent: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits(["update:modelValue"]);

const value = computed({
	get() {
		return props.modelValue;
	},
	set(val) {
		emit("update:modelValue", val);
	},
});

const valueText = computed(() => {
	if (props.isPercent) {
		return ~~(value.value * 100) / 100 + "%";
	} else {
		return ~~value.value;
	}
});

const input = ref(null);

function minus() {
	input.value.focus();

	value.value = Math.max(props.min, value.value - props.step);
}

function plus() {
	input.value.focus();

	value.value = Math.min(props.max, value.value + props.step);
}
</script>
<template>
	<div class="container">
		<div class="label">
			<span>{{ name }}</span>
			<span>{{ valueText }}</span>
			<span>{{ min }} | {{ max }}</span>
		</div>
		<div class="controls">
			<div class="minus" @click.prevent="minus">&#x2B9C;</div>
			<div class="slider">
				<input
					type="range"
					ref="input"
					v-model.number="value"
					:min="min"
					:max="max"
					:step="step"
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

input[type="range"] {
	-webkit-appearance: none;
	width: 100%;
	background: transparent;
	vertical-align: text-bottom;
	margin-left: 0;

	&:focus {
		outline: none;

		&::-webkit-slider-thumb {
			background: $accent2;
		}

		&::-webkit-slider-runnable-track {
			background: $accent2;
		}
	}

	&::-webkit-slider-thumb {
		-webkit-appearance: none;
		border: 1px solid #000000;
		height: 16px;
		width: 16px;
		border-radius: 50%;
		background: $accent;
		cursor: pointer;
		margin-top: -8px;
		box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
	}

	&::-webkit-slider-runnable-track {
		width: 100%;
		height: 1px;
		cursor: pointer;
		box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
		background: $accent;
		border-radius: 1.3px;
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
		flex-basis: 33%;

		&:nth-child(1) {
			text-align: left;
		}

		&:nth-child(2) {
			text-align: center;
		}

		&:nth-child(3) {
			text-align: right;
		}
	}
}
</style>