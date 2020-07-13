<template>
<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div class="sm:mx-auto sm:w-full sm:max-w-md mb-6">
            <h2 class="text-center text-2xl md:text-3xl leading-none font-extrabold text-gray-900">Join Game</h2>
        </div>
        <form @submit.prevent="$emit('submit', $event)">
            <div>
                <label for="lobby" class="block text-sm font-medium leading-5 text-gray-700">
                Name
                </label>
                <div class="mt-1 rounded-md shadow-sm">
                <input id="lobby" type="text" required autocomplete="false" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                </div>
            </div>
            <div class="mt-6">
                <span class="block w-full rounded-md shadow-sm">
                <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                    Join
                </button>
                </span>
            </div>
        </form>
    </div>
</div>
</template>
<script>
export default {
    name: 'JoinLobby',
    // props: {},
    // methods:{}
}
</script>