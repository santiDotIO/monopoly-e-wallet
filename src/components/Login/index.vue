<template>
<div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 class="mt-6 text-center text-3xl md:text-5xl leading-none font-extrabold text-gray-900">Monopoly E-Wallet</h1>
    </div>
    <div class="p-4">
        <!-- <CreateLobby v-on:submit="$emit('createLobby', $event)"></CreateLobby> -->
        <JoinLobby v-on:submit="$emit('joinLobby', $event)"></JoinLobby>
    </div>
</div>
</template>

<script>
// // import CreateLobby from "./CreateLobby";
import JoinLobby from "./JoinLobby";

export default {
    name: 'Login',
    components: {
        // CreateLobby,
        JoinLobby
    },
    props: {
        msg: String
    },
    methods: {
        handleCreateLobby($e) {
            console.log($e);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
