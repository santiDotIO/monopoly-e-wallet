<template>
<div class="flex">
    <input ref="input_field" type="number" required step="10" autocomplete="false" class="appearance-none block w-1/2 px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
    <span class="w-1/2 relative z-0 inline-flex shadow-sm space-x-4 pl-4">
        <button 
            v-if="showGet" 
            @click="transaction('onGet')" 
            type="button" 
            class="plus-button relative inline-flex items-center justify-center h-9 w-1/2 rounded-md  bg-blue-500 text-2xl leading-5 font-medium text-white hover:bg-blue-800 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-blue-100 transition ease-in-out duration-150" aria-label="Get"
        >Get</button>
        <button 
            v-if="showPay" 
            @click="transaction('onPay')" 
            type="button" 
            class="minus-button -ml-px relative inline-flex items-center justify-center h-9 w-1/2 rounded-md  bg-red-500 text-2xl leading-5 font-medium text-white hover:bg-red-800 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-blue-100 transition ease-in-out duration-150" 
            aria-label="Pay"
        >Pay</button>
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
        showPay: {
            type: Boolean,
            default: true
        },
        showGet: {
            type: Boolean,
            default: false
        },
    },
    methods:{
        transaction(type) {
            this.$emit(type, {
                player: this.playerID, 
                value: this.$refs.input_field.value
            });
            this.$refs.input_field.blur();
            this.$refs.input_field.value = '';
        },
    }
}
</script>