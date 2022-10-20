<template>
  <q-page padding>
    <div class="q-pa-md">
    <div class="row q-mb-md">
      <div class="col-md-10">
      <q-input v-model="search" dense :label="$t('label.filtrar')" outlined ></q-input>
      </div>
      <div class="column col-md-2" >
        <div class="col self-end">
          <q-btn outlined color="primary" @click="$router.push('/incluir-pessoa')">{{$t('button.cadastropessoa')}}</q-btn>
        </div>
      </div>
    </div>
    <q-table
      title="Pessoas Cadastradas"
      :rows="rows"
      :columns="columns"
      :filter="search"
      color="primary"
      row-key="name"
      :loading="loading"
    >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn icon="edit" color="primary" dense size="sm" :to="`/editar-pessoa/${props.row.id}`">
              <q-tooltip>
                {{$t('button.editar')}}
              </q-tooltip>
            </q-btn>
            <q-btn icon="delete" color="negative" dense size="sm" @click="dialog(props.row.id)">
              <q-tooltip>
                {{$t('button.deletar')}}
              </q-tooltip>
            </q-btn>
          </q-td>
        </template>
    </q-table>
  </div>
  </q-page>
</template>

<script>
import personApi from 'src/composables/PersonApi'
import { Dialog } from 'quasar'
export default {
  name: 'PesquisarPessoa',
  data() {
    return {
      loading: false,
      search: '',
      API: personApi(),
      columns: [
        { name: 'id', align: 'center', label: 'ID', field: 'id' },
        { name: 'FirstName', align: 'center', label: 'First Name', field: 'FirstName' },
        { name: 'LastName', align: 'center', label: 'Last Name', field: 'LastName' },
        { name: 'Address', align: 'center', label: 'Address', field: 'Address' },
        { name: 'City', align: 'center', label: 'City', field: 'City' },
        { name: 'created_at', align: 'center', label: 'Created Date', field: 'created_at' },
        { name: 'actions', align: 'center', label: 'Ações', field: 'actions' },
      ],
      rows: []
    }
  },
  mounted(){
    this.listarPessoas();
  },
  methods: {
    dialog(id) {
      Dialog.create({
        title: this.$t('dialog.atencao'),
        message: this.$t('dialog.deletar'),
        cancel: true,
      }).onOk(async() => {
        this.deletar(id)
      })
    },
    async listarPessoas(){
      try {
        this.loading = true
        this.rows = await this.API.listar()
        this.loading = false
      } catch (error) {
        alert(error.message)
      }
    },
    async deletar(id){
      try {
        this.loading = true
        await this.API.deletar(id)
        this.loading = false
        this.listarPessoas();
      } catch (error) {
        alert(error.message)
      }
    },
  }
}
</script>

<style>

</style>
