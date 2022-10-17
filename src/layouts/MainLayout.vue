<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar color="red">

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>
        <div v-show="!logado">Ambiente em Desenvolvimento</div>
        <div v-show="logado"> <q-icon name="person" size="1.3em" class="q-mr-sm" />{{user.email}}</div>
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
    },
    user(){
      return useAuthUser().user.value
    }
  },
  methods: {
     dialog() {
      Dialog.create({
        title: this.$t('dialog.confirme'),
        message: this.$t('dialog.logout'),
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
