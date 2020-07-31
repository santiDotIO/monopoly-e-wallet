<template>
<div v-bind:class="[fixed && 'fixed top-0 left-0 w-full']" class="flex justify-center px-4 py-2 pointer-events-none sm:p-6 sm:items-start sm:justify-end">
    <div class="w-full shadow-lg rounded-lg pointer-events-auto bg-white">
        <div class="flex rounded-lg shadow-xs">
            <div class="flex items-center p-2">
                <p class="text-sm border-r-2 border-gray-900 pr-1 leading-none font-medium text-gray-900" >{{ new Date(event.data().time_created) | dateFormat('hh:mm:ssA') }}</p>
                <p class="ml-1 text-sm leading-none text-black" v-html="event.data().text" />
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'EventItem',
    props: {
        event: Object,
        fixed: {
            type: Boolean,
            default: false,
        },
    },
    methods:{}
}
</script>