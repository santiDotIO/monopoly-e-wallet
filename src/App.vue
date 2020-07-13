<template>
  <div id="app">
    <Login v-if="loaded && !inGame" v-on:createLobby="createLobby" v-on:joinLobby="joinLobby" />
    <GameScreen 
        v-if="loaded && inGame"
        v-bind:user="user" 
        v-bind:lobby="lobby"
        v-on:money_change="money_change"
    />
    <!-- v-on:minus="minus" -->
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import Login from './components/Login'
import GameScreen from './components/GameScreen'

export default {
    name: 'App',
    components: {
        Login,
        GameScreen
    },
    data: function () {
        return{
            db: undefined,
            lobby: undefined,
            inGame: false,
            user: undefined,
            loaded: false,
            colors: [
                'gray-600', //'#718096',
                'red-600', //'#E53E3E',
                'orange-600', //'#DD6B20',
                'yellow-600', //'#D69E2E',
                'green-600', //'#38A169',
                'teal-600', //'#319795',
                'blue-600', //'#3182CE',
                'indigo-600', //'#5A67D8',
                'purple-600', //'#805AD5',
                'pink-600', //'#D53F8C',
            ],
        }
    },
    beforeCreate: async function() {
        // Initialize Cloud Firestore through Firebase
        firebase.initializeApp({
            apiKey: process.env.VUE_APP_API_KEY,
            authDomain: process.env.VUE_APP_AUTH_DOMAIN,
            projectId: process.env.VUE_APP_PROJECT_ID,
        });
        this.db = await firebase.firestore();
        await this.checkIfInGame();
        this.loaded = true;
    },
    methods: {
        async createLobby(/* $e */) {
        //     await this.auth;
        //     const user = await firebase.auth().currentUser;
        //     const name = this.askName();
        },
        async joinLobby($e) {
            const name = $e.srcElement.elements[0].value
            
            this.user = await firebase.auth().currentUser;
            await this.user.updateProfile({displayName: name});
            this.player = await this.db.collection('lobby').doc(this.user.uid);

            await this.player.set({
                name: name,
                money: 1500,
                color: this.getColor(),
            });
            this.inGame = true;
        },
        async checkIfInGame() {
            await firebase.auth().signInAnonymously();
            this.user = await firebase.auth().currentUser;
            const userInLobby = await this.db.collection('lobby').doc(this.user.uid).get();
            this.inGame = userInLobby.exists;
            this.db.collection('lobby').onSnapshot(this.handelLobbyUpdate.bind(this));
        },
        handelLobbyUpdate(collection) {
            this.lobby = collection.docs;
        },
        getColor() {
            const index = Math.floor(Math.random() * this.colors.length-1);
            return this.colors[index];
        },
        async money_change({giving, receiving}){
            if (receiving) {
                await  this.db.collection('lobby').doc(receiving.id).update({
                    money: receiving.value
                });
            }

            if (giving) {
                await this.db.collection('lobby').doc(giving.id).update({
                    money: giving.value
                });
            }
        },
    }
}
</script>

<style>
</style>
