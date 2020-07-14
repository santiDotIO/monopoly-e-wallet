<template>
<div class="flex">
    <input ref="input_field" type="number" required autocomplete="false" class="appearance-none block w-1/2 px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
    <span class="w-1/2 relative z-0 inline-flex shadow-sm space-x-4 pl-4">
        <button @click="plus" type="button" class="plus-button relative inline-flex items-center justify-center h-9 w-1/2 rounded-md  bg-blue-500 text-2xl leading-5 font-medium text-white hover:bg-blue-800 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-100 transition ease-in-out duration-150" aria-label="plus">
            +
        </button>
        <button v-if="showMinus" @click="minus" type="button" class="minus-button -ml-px relative inline-flex items-center justify-center h-9 w-1/2 rounded-md  bg-red-500 text-2xl leading-5 font-medium text-white hover:bg-red-800 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-100 transition ease-in-out duration-150" aria-label="minus">
            -
        </button>
    </span>
</div>
</template>
<script>
export default {
    name: 'PlusMinus',
    props: {
        // player: Object,
        playerID: String,
        playerMoney: Number,
        showMinus: Boolean
    },
    methods:{
        plus() {
            this.$emit('plus', {
                player: this.playerID, 
                value: this.$refs.input_field.value
            });
            this.$refs.input_field.blur();
        },
        minus() { 
            this.$emit('minus', { 
                player: this.playerID, 
                value: this.$refs.input_field.value
            });
            this.$refs.input_field.blur();
        },
    }
}
</script>