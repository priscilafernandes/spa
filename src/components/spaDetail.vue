<template>
  <main class="container-fluid">
    <section v-if="book.id">
      <div class="mt-3">
        <img :src="book.thumbnail" class="figure-img img-fluid">
        <h3>{{ book.title }}</h3>
        <h5>R$ {{ book.price }}</h5>
        <div class="row">
          <a href="javascript:history.go(-1)" class="btn btn-dark text-light">Voltar</a>
          <a :href="book.permalink" target="_blank" class="btn btn-success mr-3">Comprar</a>
        </div>
      </div>
    </section>
  </main>
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
        const url = `https://api.mercadolibre.com/items/${this.route.params.bookDetail}`;
        const vm = this;
        
        axios.get(url).then((response) => {
          vm.book = response.data;
        });        
      },
    }
  }
</script>