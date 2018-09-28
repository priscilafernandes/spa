<template>
  <main class="container-fluid">
    <h1>Busca</h1>

    <div class="row">
      <form class="col">
        <div class="form-group">
          <input v-model="search" type="text" class="form-control" placeholder="Busque aqui...">
        </div>
      </form>
      
      <div class="col-3">
        <div class="form-group">
          <button @click.prevent.stop="getData()" type="submit" class="btn btn-primary">Buscar</button>
        </div>
      </div>
    </div>

    <div>
      <p>Você buscou por "{{ search }}"</p>
    </div>

    <template>
      <ul class="list-group list-group-flush" v-if="!!results.length" v-for="result in results" :key="result.thumbnail">
        <li class="list-group-item">{{ result.title }}</li>
        <li><img :src="result.thumbnail"></li>
        <!-- <li class="list-group-item"><a @click.prevent.stop="getDataItem(result.id)" href="">{{ result.id }}</a></li> -->
      </ul>
    </template>

    <!-- <template>
      <ul class="list-group list-group-flush" v-if="!!results.length" v-for="result in results" :key="result.id">
        <li class="list-group-item"><a href="">{{ result.id }}</a>
        <li class="list-group-item">{{ result.name }}</li>
      </ul>
    </template> -->

    <ul class="list-group list-group-flush" v-if="!!!results.length">
      <li class="list-group-item"><p>Resultado não encontrado</p></li>
    </ul>

  </main>
</template>

<script>
  /* eslint-disable */

  export default {
    name: 'SPA',
    
    data() {
      return {
        search: '',
        results: [],
        selectedItem: {},
      }
    },

    methods: {
      getData() {
        if(this.search) {
          const vm = this;

          const url = `https://api.mercadolibre.com/sites/MLB/search?category=MLB3281`;
          // const url = `https://api.mercadolibre.com/sites/MLB/categories`;
  
          axios.get(url).then((response) => {
            vm.results = response.data.results;
            // vm.results = response.data;
          });
        }
      },


      /*
      getDataItem(item) {
        if(this.search) {
          const vm = this;
          // const url = `https://jsonplaceholder.typicode.com/posts/${item}`;
          // const url = `https://api.mercadolibre.com/sites/MLB/search?category=${item}`;
          
          axios.get(url).then((response) => {
            vm.selectedItem = response.data;
          });
        }
      },
      */

    }
  }
</script>