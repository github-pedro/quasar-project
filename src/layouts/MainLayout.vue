<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar color="red">

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Ambiente em desenvolvimento</div>
        <q-btn v-show="logado" icon="logout" class="q-ml-md" @click="dialog()"/>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>

import useAuthUser from 'app/src/composables/UseAuthUser'
import { Dialog } from 'quasar'

export default {
  name: 'MainLayout',
  data() {
    return {}
  },
  computed: {
    logado(){
      return useAuthUser().isLoggedIn()
    }
  },
  methods: {
     dialog() {
      Dialog.create({
        title: 'Confirme',
        message: 'Deseja sair do sistema?',
        cancel: true,
        persistent: true
      }).onOk(async() => {
        this.logout()
      })
    },
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
