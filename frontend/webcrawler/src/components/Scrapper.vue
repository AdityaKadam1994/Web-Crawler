<template>
  <div class="scrapper">
    <h1>Scrapper</h1>
    <div class="container-fluid">
      <div class="row">
        {{returnedScrapData}}
        <table class="table table-responsive">
          <thead>
            <tr>
              <th v-for="header in headers" :key="header">{{header}}</th>
            </tr>
          </thead>
          <tbody>
            <!-- <tr v-for="(item, index) in items" :key="index">
              <td>{{item.h2}}</td>
            </tr> -->
          </tbody>
        </table>
      </div>
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
      const headers = []
      const items = []
      data.map(head => {
        Object.keys(head.scrapData).forEach(item => {
          headers.push(item)
        })
        return items.push(Object.assign({}, JSON.parse(head.scrapData)))
      })
      headers.push('url')
      this.headers = headers
      this.items = items
      console.log(headers)
      console.log(items)
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
