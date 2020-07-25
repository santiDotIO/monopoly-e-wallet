<template>
<div class="bg-blue-100 mx-4 py-4 rounded shadow-inner">
    <p class="px-4 text-xl md:text-2xl leading-none font-extrabold text-gray-900">Event Log</p>
    <div v-for="event in events" :key="event.id" class="flex justify-center px-4 py-2 pointer-events-none sm:p-6 sm:items-start sm:justify-end">
        <div class="w-full bg-green-300 shadow-lg rounded-lg pointer-events-auto">
            <div class="flex rounded-lg shadow-xs">
                <div class="w-0 flex-1 p-4">
                    <div class="flex items-start">
                        <div class="ml-3 w-0 flex-1">
                            <p class="text-sm leading-5 font-medium text-gray-900" >{{ logDate(event.data().time_created) }}</p>
                            <p class="mt-1 text-sm leading-5 text-gray-600" v-html="event.data().text" />
                    </div>
                </div>
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