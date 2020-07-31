<template>
<div class="bg-blue-100 mx-4 py-4 rounded shadow-inner overflow-y-scroll h-64">
    <p class="px-4 text-xl md:text-2xl leading-none font-extrabold text-gray-900">Event Log</p>
    <EventItem 
        v-bind:event="events[0]"
        v-bind:fixed="true"
    />
    <EventItem 
        v-for="event in events" 
        v-bind:key="event.id"  
        v-bind:event="event"
    />
</div>
</template>
<script>
import EventItem from './EventItem';

export default {
    name: 'EventLog',
    components:{ 
        EventItem 
    },
    props: {
        events: Array,
    },
    methods:{}
}
</script>