<template>
<div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-3xl md:text-5xl leading-none font-extrabold text-gray-900">{{ user.displayName }}</h2>
    </div>
    <div class="p-4">
        <ul v-if="players" class="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2">
            <li v-for="player in players" :key="player.id" v-bind:class="orderClass(player)" class="col-span-1 flex items-center bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
                <div v-bind:class="colorTile(player)" class="flex-shrink-0 flex items-center justify-center w-24 h-24 text-white text-center text-sm leading-5 font-medium"></div>
                <div class="flex-1 px-4 py-2 truncate">
                    <p class="text-gray-900 text-lg leading-5 font-medium pb-2">
                        <strong v-if="user.uid != player.id">{{ player.data().name }}:</strong> 
                        <strong v-else>You:</strong>
                        {{ player.data().money | currency }}
                    </p>
                    <PlusMinus 
                        v-if="user.uid != player.id" 
                        v-bind:playerID="player.id" 
                        v-bind:playerMoney="getUserMoney(player.id)" 
                        v-bind:showMinus="false" 
                        
                        v-on:onPay="handlePay"
                        v-on:onGet="handleGet"
                    />
                    <button 
                        v-if="user.uid == player.id" 
                        @click="handlePassedGo" 
                        type="button" 
                        class="plus-button relative inline-flex items-center justify-center h-9 w-1/2 rounded-md  bg-green-500 text-2xl leading-5 font-medium text-white hover:bg-green-800 focus:z-10 focus:outline-none focus:border-green-300 focus:shadow-outline-blue active:bg-green-100 active:text-gray-100 transition ease-in-out duration-150" 
                        aria-label="Pass Go"
                    >Pass Go</button>
                </div>
            </li>
        </ul>
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <div class="sm:mx-auto sm:w-full sm:max-w-md mb-6">
                    <h2 class="text-center text-2xl md:text-3xl leading-none font-extrabold text-gray-900">Get / Give Money: Bank</h2>
                </div>
                <PlusMinus 
                    v-bind:playerID="user.uid" 
                    v-bind:playerMoney="getUserMoney(user.id)"
                    v-bind:showGet="true" 
                    v-on:onGet="handleGetMoneyBank"
                    v-on:onPay="handlePay($event, false)"
                />
            </div>
        </div>
    </div>
    <EventLog v-bind:events="events" />
</div>
</template>

<script>
import PlusMinus from "./PlusMinus";
import EventLog from "./EventLog";

export default {
    name: 'GameScreen',
    components: {
        PlusMinus,
        EventLog
    },
    props: {
        user: Object,
        // array of Firestore documents
        players: Array,
        events: Array,
    },
    methods: {
        colorTile(player) {
            const defaultColor = 'bg-gray-600';
            const playerColor = player.data().color;
            
            return playerColor ? playerColor : defaultColor;
        },
        orderClass(player) {
            return this.user.uid == player.id ? 'order-0' : 'order-1'
        },
        getUserMoney(id) {
            const player = this.players ? this.players.find((player)=>player.id == id) : undefined;
            return player ? player.money : 0;
        },
        handlePay($e, payPLayer=true) {
            const givingUserDoc = this.players.find((player)=>player.id == this.user.uid)
            const receivingUserDoc = this.players.find((player)=>player.id == $e.player)
            const data = {
                change: Number($e.value),
                giving:{
                    id: this.user.uid,
                    value: Number(givingUserDoc.data().money) - Number($e.value),
                }
            }
            if (payPLayer) {
                data.receiving = {
                    id: receivingUserDoc.id,
                    value: Number(receivingUserDoc.data().money) + Number($e.value),
                };
            }
            this.$emit('money_change', data);
        },
        handleGet($e) {
            const player = this.players.find((player)=>player.id == $e.player)
            this.$emit('money_change', {
                change: Number($e.value),
                giving: {
                    id: player.id,
                    value: Number(player.data().money) - Number($e.value),
                }
            });
        },
        handleGetMoneyBank($e) {
            const player = this.players.find((player)=>player.id == $e.player)
            this.$emit('money_change', {
                change: Number($e.value),
                receiving: {
                    id: player.id,
                    value: Number(player.data().money) + Number($e.value),
                }
            });
        },
        handlePassedGo() {
            const currentMoney = Number( this.players.find( ({ id }) => id == this.user.uid).data().money );
            this.$emit('passed_go',  (currentMoney + 200));
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
