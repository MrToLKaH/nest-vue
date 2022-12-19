<template>
  <div class="navbar">
    <div @click="$router.push('/')">Logo</div>
    <div class="navbar__btns">
      <app-button v-if='!$store.getters.isAuthenticated' style="margin-left: 20px" @click="$router.push('/login')">Login</app-button>
      <app-button v-if='!$store.getters.isAuthenticated' style="margin-left: 20px" @click="$router.push('/registration')">Registration</app-button>
      <app-button v-else style="margin-left: 20px" @click="$store.dispatch('logout')">Logout</app-button>
    </div>
  </div>
</template>

<script>

export default {
}
</script>

<style scoped>
.navbar {
  height: 50px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}
.navbar__btns {
  margin-left: auto;
}
</style>