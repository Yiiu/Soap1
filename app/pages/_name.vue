<template>
    <div>2</div>
</template>
<script>
export default {
    fetch ({store, params, req}) {
        // console.log(req)
        store.dispatch('userInfo/getOneInfo')
    }
}
</script>