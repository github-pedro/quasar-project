<template>
  <q-page padding class="background">
    <q-form class="row justify-center" @submit.prevent="register">
      <p class="col-12 text-h5 text-center q-mt-xl text-white text-bold"> Registro </p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-card>
            <q-card-section style="padding: 40px">
              <q-input
                style="margin-bottom: 40px"
                outlined
                v-model="form.name"
                :label="$t('label.nome')"
                :hint="$t('label.digitenome')"
                lazy-rules
                :rules="[$rules.obrigatorio]"
              />
              <q-input
                style="margin-bottom: 40px"
                outlined
                v-model="form.email"
                :label="$t('label.email')"
                :hint="$t('label.digiteemail')"
                lazy-rules
                :rules="[$rules.email, $rules.obrigatorio]"
              />
              <q-input
                style="margin-bottom: 40px"
                outlined
                v-model="form.password"
                :label="$t('label.senha')"
                :hint="$t('label.digitesenha')"
                lazy-rules
                :rules="[$rules.obrigatorio]"
              />
              <div>
                <q-btn outline color="primary" :label="$t('button.registrar')" type="submit" />
                <q-btn :label="$t('button.limpar')" type="reset" color="primary" flat class="q-ml-sm" />
              </div>
            </q-card-section>
        </q-card>
      </div>
    </q-form>
    <q-dialog v-model="dialogConfirm" persistent>
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ $t('registro.confirmeemail') }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup to="/login" />
        </q-card-section>

        <q-card-section>
          {{$t('registro.textconfirm')}}
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>

import useAuthUser from 'app/src/composables/UseAuthUser'
import { useRoute } from 'vue-router'

export default {
  name: 'RegisterUser',
  data() {
    return {
      form: {
        name: null,
        email: null,
        password: null
      },
      route: useRoute(),
      dialogConfirm: false
    }
  },
  methods: {
    async register(){
      const { register } = useAuthUser()
      try {
        await register(this.form)
        this.dialogConfirm = true
        /*
        this.route.push({
          name: 'email-confirmation',
          query: {email: this.form.email}
        })*/
      } catch (error) {

      }
    }
  }
}
</script>

<style>

</style>
