<template>
  <main class="container-fluid">
    <header class="navbar navbar-expand-lg bg-dark d-flex justify-content-around">
      <h1 class="text-light mr-3">Bookstore</h1>
      <nav class="col-sm">
        <div class="row mt-3">
          <form class="col-sm">
            <div class="form-group">
              <input v-model="search" type="text" class="form-control" placeholder="Procure seu livro...">
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
          <!-- se a quantidade for positiva -->
          <tr v-if="!!books.length" v-for="book in books" :key="book.thumbnail">
            <th scope="row"><img :src="book.thumbnail"></th>
            <td>{{ book.title }}</td>
            <td>R$ {{ book.price }}</td>
            <!-- Vue Router -->
            <!-- <router-link :to="{ 
              name: spaDetail, 
              params: { 
                bookDetail: book.id, 
              } 
            }">{{ book.id }}</router-link> -->
            <td><a @click.prevent.stop="getDataItem(book.id)" :href="book.id" class="badge badge-dark">Mais Detalhes</a></td>
            <td><a :href="book.permalink" target="_blank" class="text-success"><i class="fas fa-shopping-cart"></i></a></td>
          </tr>
          <!-- se a quantidade for negativa -->
          <tr v-if="!!!books.length">
            <td colspan="5">Sem resultados...</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- detalhe do produto -->
    <section v-if="selectedBook.id">
      <div class="justify-content-around mt-3">
        <img :src="selectedBook.thumbnail" class="figure-img img-fluid">
        <h3>{{ selectedBook.title }}</h3>
        <h5>R$ {{ selectedBook.price }}</h5>
        <div class="row">
          <a @click.prevent.stop="backBooks()" class="btn btn-dark text-light col col-lg-2 mr-3">Voltar</a>
          <a :href="selectedBook.permalink" target="_blank" class="btn btn-success col col-lg-2">Comprar</a>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
  /* eslint-disable */
  export default {
    name: 'spa',
    
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