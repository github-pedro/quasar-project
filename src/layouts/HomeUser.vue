<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar color="red">
        <q-btn
          v-if="logado"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>
        <div v-show="!logado">Ambiente em Desenvolvimento</div>
        <div v-if="logado"> <q-icon name="person" size="1.3em" class="q-mr-sm" />{{user.email}}</div>
        <q-btn v-show="logado" icon="logout" class="q-ml-md" @click="dialog()"/>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      v-if="logado"
    >
      <q-list>
        <q-item-label
          header
        >
          Menu
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import useAuthUser from 'app/src/composables/UseAuthUser'
import { Dialog } from 'quasar'

export default {
  name: 'MainLayout',
  components: {
    EssentialLink,
  },
  data() {
    return {
      leftDrawerOpen: false,
      linksList: [
        {
          title: 'Home',
          caption: '',
          icon: 'home',
          routeName: 'me',
          link: '/home'
        },
        {
          title: 'Cadastro',
          caption: '',
          icon: 'how_to_reg',
          routeName: '/cadastro'
        }
      ]
    }
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
    toggleLeftDrawer () {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
  }
}
</script>
