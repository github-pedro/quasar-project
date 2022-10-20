<template>
  <q-page padding>
    <q-form @submit.prevent="dialog">
        <q-card>
          <q-card-section>
            <div class="text-h6 text-primary">{{$t('button.cadastropessoa')}}</div>
          </q-card-section>
          <q-card-section>
            <div class="q-mb-md">
              <q-input
                outlined
                v-model="form.FirstName"
                :label="$t('label.primeironome')"
                :hint="$t('label.digiteprimeironome')"
                lazy-rules
                :rules="[$rules.obrigatorio]"
              />
            </div>
            <div class="q-mb-md">
              <q-input
                outlined
                v-model="form.LastName"
                :label="$t('label.sobrenome')"
                :hint="$t('label.digitesobrenome')"
                lazy-rules
                :rules="[$rules.obrigatorio]"
              />
            </div>
            <div class="q-mb-md">
              <q-input
                outlined
                v-model="form.Address"
                :label="$t('label.endereco')"
                :hint="$t('label.digiteendereco')"
                lazy-rules
                :rules="[$rules.obrigatorio]"
              />
            </div>
            <div class="q-mb-md">
              <q-input
                outlined
                v-model="form.City"
                :label="$t('label.cidade')"
                :hint="$t('label.digitecidade')"
                lazy-rules
                :rules="[$rules.obrigatorio]"
              />
            </div>
          </q-card-section>
          <q-card-actions>
            <q-space/>
            <q-btn color="primary" type="submit">{{$t('button.cadastrar')}}</q-btn>
          </q-card-actions>
        </q-card>
    </q-form>
  </q-page>
</template>

<script>
import personApi from 'src/composables/PersonApi'
import { Dialog } from 'quasar'

export default {
  name: 'IncluirPessoa',
  data() {
    return {
      API: personApi(),
      form: {}
    }
  },
  computed: {
    temID() {
      return !!this.$route.params.id;
    }
  },
  mounted(){
    if(this.temID){
      this.buscarPessoaPorID(this.$route.params.id)
    }
  },
  methods: {
    async buscarPessoaPorID(id){
      try {
        const resp = await this.API.buscarPorID(id)
        this.form = {...resp[0]}
      } catch (error) {
        alert(error.message)
      }
    },
    dialog() {
      Dialog.create({
        title: this.$t('dialog.confirme'),
        message: this.$t('dialog.cadastro'),
        cancel: true,
        persistent: true
      }).onOk(async() => {
        this.salvar()
      })
    },
    async salvar(){
      try {
        if(this.form.id){
          await this.API.update(this.form)
        } else {
          await this.API.inserir(this.form)
        }
        Dialog.create({
        title: this.$t('dialog.sucesso'),
        message: this.$t('dialog.cadastrosucesso'),
        persistent: true
        }).onOk(() => {
          this.$router.push({ name: 'pesquisarpessoa' })
        })
      } catch (error) {
        alert(error.message)
      }
    }
  }
}
</script>

<style>

</style>
