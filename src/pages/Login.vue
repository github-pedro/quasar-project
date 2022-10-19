<template>
  <q-page padding class="background">
    <q-form class="row justify-center" @submit.prevent="onSubmit">
      <p class="col-12 text-h5 text-center q-mt-xl text-white text-bold"> BEM VINDO </p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-card>
            <q-card-section style="padding: 40px">
              <q-input
                style="margin-bottom: 40px"
                outlined
                v-model="form.email"
                :label="$t('label.email')"
                hint="Digite o seu email"
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
                <q-btn outline color="primary" :label="$t('button.entrar')" type="submit" />
                <q-btn :label="$t('button.limpar')" type="reset" color="primary" flat class="q-ml-sm" />
              </div>
            </q-card-section>
        </q-card>
        <div class="full-width q-gutter-y-sm">
          <q-btn
            :label="$t('button.registrar')"
            class="full-width text-white"
            flat
            to="/register"
            size="sm"
          />
          <q-btn
            :label="$t('button.resetsenha')"
            class="full-width text-white"
            flat
            :to="{ name: 'forgot-password'}"
            size="sm"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>

import useAuthUser from 'app/src/composables/UseAuthUser'
import { useRoute } from 'vue-router'

export default {
  name: 'LoginApp',
  data() {
    return {
      form: {
        email: null,
        password: null
      }
    }
  },
  methods: {
    async onSubmit () {
      const { login } = useAuthUser()
      const router = useRoute()
      try {
        await login(this.form)
        this.$router.push('/home')
      } catch (error) {
        alert(error)
      }
    },

    onReset () {
      this.email = null
      this.password = null
    }
  }
}
</script>
<style>

</style>
