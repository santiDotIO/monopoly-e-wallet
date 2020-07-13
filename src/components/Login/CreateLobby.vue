<template>
<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div class="sm:mx-auto sm:w-full sm:max-w-md mb-6">
            <h2 class="text-center text-2xl md:text-3xl leading-9 font-extrabold text-gray-900">Create Game</h2>
        </div>
        <form @submit.prevent="$emit('submit', $event)">
        <div class="mt-6">
            <span class="block w-full rounded-md shadow-sm">
            <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                Create
            </button>
            </span>
        </div>
        </form>
    </div>
</div>
</template>

<script>
export default {
    name: 'CreateLobby',
    props: {},
    methods:{
        submit() {
            // this.
        }
    }
}
</script>