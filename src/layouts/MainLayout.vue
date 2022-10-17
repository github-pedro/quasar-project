<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar color="red">

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Ambiente em desenvolvimento</div>
        <q-btn v-show="user" icon="logout" class="q-ml-md" @click="logout"/>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>

import useAuthUser from 'app/src/composables/UseAuthUser'

export default {
  name: 'MainLayout',
  data() {
    return {
      user: false,
    }
  },
  mounted(){
    const { isLoggedIn } = useAuthUser()
    console.log(isLoggedIn)
  },
  methods: {
    async logout () {
      const { logout } = useAuthUser()
      try {
        await logout(this.form)
        this.$router.push('/login')
      } catch (error) {
        alert(error)
      }
    },
  }
}
</script>
