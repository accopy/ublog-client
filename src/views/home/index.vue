<template>
    <div class="homecontainer">
        <div class="userCard">
            <UserCard></UserCard>
        </div>
        <div class="main">

            <router-view></router-view>
        </div>


    </div>


</template>
<script setup>
import { ref, defineComponent } from 'vue';
import UserCard from '../../components/UserCard/UserCard.vue';




</script>
<style scoped>
.homecontainer {
    display: flex;
    background-color: #F9FAFB;
}

.userCard {
    height: 100%;



    position: sticky;

    top: 0;

}

.main {
    flex: 1;
    margin: 0 20px;
    /* .navbar {
        position: sticky;

        top: 0;
    }

    .content {
        overflow: hidden;
    } */

}
</style>