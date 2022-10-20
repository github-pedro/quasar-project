<template>
  <q-layout view="lHh Lpr lFf" class="background">
    <q-header elevated>
      <q-toolbar >

        <q-toolbar-title>
          Projeto Quasar
        </q-toolbar-title>
        <div >Ambiente em Desenvolvimento</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>


export default {
  name: 'MainLayout',
  data() {
    return {
    }
  },
  computed: {

  },

  methods: {

  }
}
</script>
