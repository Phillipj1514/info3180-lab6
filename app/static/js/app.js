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
                    <router-link to="/" class="nav-link">Home</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link to="/news" class="nav-link">News</router-link>
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

const NewsList = Vue.component('news-list',{
  template:`
      <div class="news">
        <h2 class = "text-center">News</h2>
        <div class="form-inline d-flex justify-content-center">
          <div class="form-group mx-sm-3 mb-2">
            <label class="sr-only" for="search">Search</label>
            <input type="search" name="search" v-model="searchTerm"id="search" class="form-control mb-2 mr-sm-2" placeholder="Enter search term here" />
            <p>You are searching for <b>{{ searchTerm }}</b></p>
          </div>
        </div>
        <div class = "d-flex justify-content-center">
          <button class="btn btn-primary mb-2 searchbtn" @click="searchNews">Search</button>
        </div>
        <div class="news__list d-flex align-content-start justify-content-center flex-wrap">
          <!-- <news-item v-for="news in news_items"> {{ news.name}}</news-item> -->
          <!--  <li v-for="article in articles"  class="news__item">{{ article.title }}</li> -->
          <div  v-for="article in articles" class="news__item  article ">
          <div class = "tstrip  bg-primary border-top"></div>
            <div class = "container border-bottom border-right border-left">
              <h5>{{ article.title }}</h5>
              <div class = "text-center">  
                <img class= "img-fluid rounded":src="article.urlToImage">
              </div>
              <p>{{ article.description }}</p>
            </div>
          </div>
         
        </div>
      </div>
  `,

  created(){
    let self = this;
    fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=<key>')
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
      articles: [],
      searchTerm: '' 
    }
  },

  methods: {
    searchNews: function() {
      let self = this;
      fetch('https://newsapi.org/v2/everything?q='+self.searchTerm + '&language=en&apiKey=<key>')
      .then(function(response) {
        return response.json();
      }).then(function(data) {
        console.log(data);
        self.articles = data.articles;
      });
    }
  } 

});

Vue.component('news-item',{
  template:`
      <li class="news__item"><slot></slot></li> 
  `,
});

const Home = Vue.component('home', {
  template: `
        <div class="home">
        <img src="/static/images/logo.png" alt="VueJS Logo">
        <h1>{{ welcome }}</h1>
        </div>
  `,
  data(){
    return {
      welcome: 'Hello World! Welcome to VueJS'
    }
  }
 });

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/news', component: NewsList }
  ]
});

let app = new Vue({
    el: '#app',
    router
});

