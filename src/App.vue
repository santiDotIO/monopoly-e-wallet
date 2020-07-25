<template>
  <div id="app">
    <Login 
        v-if="loaded && !inGame" 
        v-on:createLobby="createLobby" 
        v-on:joinLobby="joinLobby" />
    <GameScreen 
        v-if="loaded && inGame"
        v-bind:user="user" 
        v-bind:players="players"
        v-bind:events="events"
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
            // lobby: undefined,
            players: undefined,
            events: undefined,
            inGame: false,
            user: undefined,
            loaded: false,
            colors: [
                'bg-gray-600', //'#718096',
                'bg-red-600', //'#E53E3E',
                'bg-orange-600', //'#DD6B20',
                'bg-yellow-600', //'#D69E2E',
                'bg-green-600', //'#38A169',
                'bg-teal-600', //'#319795',
                'bg-blue-600', //'#3182CE',
                'bg-indigo-600', //'#5A67D8',
                'bg-purple-600', //'#805AD5',
                'bg-pink-600', //'#D53F8C',
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
            this.player = await this.db.collection(`lobby/${this.lobbyName()}/players`).doc(this.user.uid);
            
            await this.player.set({
                name: name,
                money: 1500,
                color: this.getColor(),
            });
            await this.registerEvent('new_player');
            this.inGame = true;
        },

        async checkIfInGame() {
            await firebase.auth().signInAnonymously();
            this.user = await firebase.auth().currentUser;
            const userInLobby = await this.db.collection(`lobby/${this.lobbyName()}/players`).doc(this.user.uid).get();
            this.inGame = userInLobby.exists;
            
            this.db.collection(`lobby/${this.lobbyName()}/players`)
                .onSnapshot(this.handlePlayerUpdate.bind(this));

            this.db.collection(`lobby/${this.lobbyName()}/events`)
                .orderBy('time_created', 'desc')
                .onSnapshot(this.handleEventsUpdate.bind(this));
        },
        handlePlayerUpdate(collection) {
            this.players = collection.docs;
        },
        handleEventsUpdate(collection) {
            this.events = collection.docs;
        },
        getColor() {
            const index = Math.floor(Math.random() * this.colors.length-1);
            return this.colors[index];
        },
        async money_change({giving, receiving, change}){
            if (receiving) {
                await this.db.collection(`lobby/${this.lobbyName()}/players`).doc(receiving.id).update({
                    money: receiving.value
                });
            }

            if (giving) {
                await this.db.collection(`lobby/${this.lobbyName()}/players`).doc(giving.id).update({
                    money: giving.value
                });
            }

            this.registerEvent('money_transaction', {giving, receiving, change});
        },
        registerEvent(eventType, transaction) {
            const time_created = new Date().getTime();
            const event = { time_created };
            if (eventType.includes('new_player')) {
                event.text = `${this.user.displayName} Joined the Game!`;
            } else if(eventType.includes('money_transaction')) {
                event.text = this.getMoneyTransactionText(transaction);
            }
            
            if (typeof event.text == 'undefined') return;

            return this.db
                .collection(`lobby/${this.lobbyName()}/events`)
                .doc(String(time_created))
                .set(event);
        },
        getMoneyTransactionText(transaction) {
            const giverDefined = typeof transaction.giving != 'undefined';
            const receivingDefined = typeof transaction.receiving != 'undefined';
            const changeCurr = this.$options.filters.currency(transaction.change);
            let giverName;
            let receivingPlayer;
            
            if (giverDefined) {
                giverName = this.players
                    .find( player => player.id == transaction.giving.id)
                    .data().name;
            }

            if (receivingDefined) {
                receivingPlayer = this.players
                    .find( player => player.id == transaction.receiving.id )
                    .data().name;
            }
            
            if (giverDefined && receivingDefined) {
                return `<strong>${giverName}</strong> payed <strong>${changeCurr}</strong> to <strong>${receivingPlayer}</strong>`;
            }

            // player payed Bank
            if (giverDefined && !receivingDefined) {
                return `<strong>${giverName}</strong> payed <strong>${changeCurr}</strong> to <strong>Bank</strong>`;
            }
            
            // Bank Payed player
            if (!giverDefined && receivingDefined) {
                return `<strong>Bank</strong> payed <strong>${changeCurr}</strong> to <strong>${receivingPlayer}</strong>`;
            }
        },
        lobbyName() {
            const date = new Date();
            return `${date.getFullYear()}${date.getMonth()}${date.getDate()}`;
        }
    }
}
</script>

<style>
</style>
