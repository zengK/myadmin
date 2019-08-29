<template>
    <div v-html="apply">
        {{apply}}
    </div>
</template>

<script>
export default {
    name:"applyText",
    data() {
        return {
            apply: ''
        }
    },
    computed: {
    },
    created() {
    },
    mounted() {
        let form = this.$route.query.htmls
            this.apply = form;
            this.$nextTick(()=> {
                  document.forms[0].submit()
            })
    },
    watch: {
    },
    methods: {
    },
    components: {
    },
};
</script>
<style scoped>
</style>