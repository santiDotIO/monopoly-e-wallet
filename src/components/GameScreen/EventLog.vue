<template>
<div class="bg-blue-100 mx-4 py-4 rounded shadow-inner overflow-y-scroll h-64">
    <p class="px-4 text-xl md:text-2xl leading-none font-extrabold text-gray-900">Event Log</p>
    <div v-for="event in events" :key="event.id" class="flex justify-center px-4 py-2 pointer-events-none sm:p-6 sm:items-start sm:justify-end">
        <div v-bind:class="event.data().color" class="w-full shadow-lg rounded-lg pointer-events-auto">
            <div class="flex rounded-lg shadow-xs">
                <div class="flex items-center p-2">
                    <p class="text-sm border-r-2 border-gray-900 pr-1 leading-none font-medium text-gray-900" >{{ logDate(event.data().time_created) }}</p>
                    <p class="ml-1 text-sm leading-none text-black" v-html="event.data().text" />
            </div>
        </div>
    </div>
</div>

</div>
</template>
<script>
export default {
    name: 'EventLog',
    props: {
        events: Array,
    },
    methods:{
        logDate(dateStr) {
            const date = new Date(dateStr);
            const rawHour = date.getHours();

            let prefix;
            let hour;
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();
            
            if (rawHour > 12) {
                hour = rawHour-12;
                prefix = 'PM';
            } else {
                hour = rawHour
                prefix = 'AM';
            }
            return `${hour}:${minutes}:${seconds} ${prefix}`;
        }
    }
}
</script>