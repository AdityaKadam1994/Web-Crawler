<template>
  <div class="scrapper">
    <h1>Scrapper</h1>
    <div class="row">
      <table class="table table-responsive">
        <thead>
          <tr>
            {{returnedScrapData}}
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import 'bootstrap/dist/css/bootstrap.css'

export default {
  props: {
    msg: String
  },
  data () {
    return {
      headers: [],
      items: []
    }
  },
  computed: {
    ...mapGetters([
      'fetchedScrapData'
    ]),
    returnedScrapData () {
      const data = this.fetchedScrapData
      this.formatTableData(data)
      return data
    }
  },
  methods: {
    formatTableData (data) {
      console.log(data)
    }
  },
  created () {
    this.$store.dispatch('getScrapData')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
</style>
