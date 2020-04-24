/* Add your Application JavaScript */
Vue.component('app-header', {
    template: `
        <header>
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
              <a class="navbar-brand" href="#">VueJS App</a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item active">
                    <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">News</a>
                  </li>
                </ul>
              </div>
            </nav>
        </header>    
    `,
    data: function() {
      return {};
    }
});

Vue.component('app-footer', {
    template: `
        <footer>
            <div class="container">
                <p>Copyright &copy {{ year }} Flask Inc.</p>
            </div>
        </footer>
    `,
    data: function() {
        return {
            year: (new Date).getFullYear()
        }
    }
})

Vue.component('news-list',{
  template:`
      <div class="news">
        <h2>News</h2>
        <ul class="news__list">
          <!-- <news-item v-for="news in news_items"> {{ news.name}}</news-item> -->
          <!--  <li v-for="article in articles"  class="news__item">{{ article.title }}</li> -->
          <li  v-for="article in articles" class="news__item">
            <div>
              <h1>{{ article.title }}</h1>
              <img :src="article.urlToImage">
              <p>{{ article.description }}</p>
            </div>
          </li>
         
        </ul>
      </div>
  `,

  created(){
    let self = this;
    fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=396d347383c247d4a61e28f1807751df')
    .then(function(response) {
      return response.json();
    }).then(function(data) {
      console.log(data);
      self.articles = data.articles;
    });
  },
  
  data(){
    return{
      news_items:[
        {name:'News item 1'},
        {name:'News item 2'},
        {name:'News item 3'}
      ],
      articles: [] 
    }
  },

});

Vue.component('news-item',{
  template:`
      <li class="news__item"><slot></slot></li> 
  `,
});


let app = new Vue({
    el: '#app',
    data: {
        welcome: 'Hello World! Welcome to VueJS'
    }
});

