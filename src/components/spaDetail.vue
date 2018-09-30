<template>
  
  {{ book }}

 <!--  <main class="container-fluid">
    <section v-if="selectedBook.id">
      <div class="mt-3">
        <img :src="selectedBook.thumbnail" class="figure-img img-fluid">
        <h3>{{ selectedBook.title }}</h3>
        <h5>R$ {{ selectedBook.price }}</h5>
        <div class="row">
          <a @click.prevent.stop="backBooks()" class="btn btn-dark text-light">Voltar</a>
          <a :href="selectedBook.permalink" target="_blank" class="btn btn-success mr-3">Comprar</a>
        </div>
      </div>
    </section>
  </main> -->


</template>

<script>
  /* eslint-disable */
  export default {
    name: 'spaDetail',

    // chamar a função
    created() {
      this.getDataItem();
    },
    
    // variáveis
    data() {
      return {
        book: {},
      }
    },

    // funções
    methods: {
      getDataItem() {
        const url = `https://api.mercadolibre.com/items/${this.route.params.bookDetail}/${this.route.params.info}`;
        const vm = this;
        
        axios.get(url).then((response) => {
          vm.book = response.data;
        });        
      },
    }
  }
</script>