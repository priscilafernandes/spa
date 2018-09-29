<template>
  <main class="container-fluid">
    <header class="navbar navbar-expand-lg bg-dark">
      <h1 class="text-light">Bookstore</h1>
      <nav class="col-sm">
        <div class="row mt-3">
          <form class="col-sm">
            <div class="form-group">
              <input v-model="search" type="text" class="form-control" placeholder="Digite aqui...">
            </div>
          </form>        
          <div class="col-sm-3">
            <div class="form-group">
              <button @click.prevent.stop="getData()" type="submit" class="btn btn-outline-light">Buscar</button>
            </div>
          </div>
        </div>
      </nav>
    </header>

    <section class="table-responsive" v-if="!selectedBook.id">
      <div class="navbar navbar-expand-lg">
        <p>Você buscou por "<b>{{ search }}</b>"</p>
      </div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col-sm">Capa</th>
            <th scope="col-sm">Título</th>
            <th scope="col-sm">Preço</th>
            <th scope="col-sm">Info</th>
            <th scope="col-sm">Comprar</th>
          </tr>
        </thead>
        <tbody>
          <!-- se quantidade for positiva -->
          <tr v-if="!!books.length" v-for="book in books" :key="book.thumbnail">
            <th scope="row"><img :src="book.thumbnail"></th>
            <td>{{ book.title }}</td>
            <td>R$ {{ book.price }}</td>
            <td><a @click.prevent.stop="getDataItem(book.id)" :href="book.id" class="badge badge-info">Mais Detalhes {{ book.id }}</a></td>
            <td><a :href="book.permalink" target="_blank">Comprar</a></td>
          </tr>
          <!-- se quantidade for negativa -->
          <tr v-if="!!!books.length">
            <td colspan="5">Sem resultados...</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- detalhe do produto -->
    <section class="results-field" v-if="selectedBook.id">
      <div>
        <div><img :src="selectedBook.pictures.secure_url"></div>
        <h2>{{ selectedBook.title }}</h2>        
        <p>R$ {{ selectedBook.price }}</p>
        <p><a :href="selectedBook.permalink" target="_blank">Comprar</a></p>
        <button @click.prevent.stop="backBooks()"></button>
      </div>
    </section>
  </main>
</template>

<script>
  /* eslint-disable */

  export default {
    name: 'SPA',
    
    // variáveis
    data() {
      return {
        search: '',
        books: [],
        selectedBook: {},
      }
    },

    // funções
    methods: {
      getData() {
        if(this.search) {          
          const url = `https://api.mercadolibre.com/sites/MLB/search?q=${this.search}&category=MLB1196`;
          const vm = this;

          axios.get(url).then((response) => {
            vm.books = response.data.results;
          });
        }
      },

      getDataItem(item) {
        if(this.search) {
          const url = `https://api.mercadolibre.com/items/${item}`;
          const vm = this;
          
          axios.get(url).then((response) => {
            vm.selectedBook = response.data;
          });
        }
      },

      backBooks() {
        this.selectedBook = {};
      }

    }
  }
</script>