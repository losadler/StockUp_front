// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'My App',
  // App id
  id: 'com.myapp.test',
  // Enable swipe panel
  panel: {
    swipe: 'left',
  },
  // Add default routes
  routes: [
    {
      path: '/index/',
      url: 'index.html',
    },
    {
      path: '/about/',
      url: 'about.html',
    },
    {
      path: '/registro/',
      url: 'registro.html',
    },
    {
      path: '/inicio/',
      url: 'inicio.html',
    },
    {
      path: '/olvidecontrasenia/',
      url: 'olvidecontrasenia.html',
    },
    {
      path: '/codeseis/',
      url: 'codeseis.html',
    },
    {
      path: '/nuevacontrasenia/',
      url: 'nuevacontrasenia.html',
    },
    {
      path: '/codeseisdeuna/',
      url: 'codeseisdeuna.html',
    },
    {
      path: '/cuenta/',
      url: 'cuenta.html',
    },
    {
      path: '/negocio/',
      url: 'negocio.html',
    },
    {
      path: '/registrarnegocio/',
      url: 'registrarnegocio.html',
    },
    {
      path: '/cambiardatosperfil/',
      url: 'cambiardatosperfil.html',
    },
    {
      path: '/graciasnegocio/',
      url: 'graciasnegocio.html',
    },
    {
      path: '/tarjetas/',
      url: 'tarjetas.html',
    },
    {
      path: '/compras/',
      url: 'compras.html',
    },
    {
      path: '/favoritos/',
      url: 'favoritos.html',
    },
  ]
  // ... other parameters
});

var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
  console.log("Device is ready!");
});
// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
  // Do something here when page loaded and initialized
  console.log(e);
})
// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="about"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  alert('Hello');
})
$$(document).on('page:init', '.page[data-name="registro"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  alert('entrando a registro');
})
$$(document).on('page:init', '.page[data-name="inicio"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  alert('entrando a inicio');
})

$$(document).on('page:init', '.page[data-name="olvidecontrasenia"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  alert('entrando a olvidecontrasenia');
})

$$(document).on('page:init', '.page[data-name="codeseis"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  alert('entrando a codeseis');
})

$$(document).on('page:init', '.page[data-name="nuevacontrasenia"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  alert('entrando a nuevacontrasenia');
})

$$(document).on('page:init', '.page[data-name="codeseisdeuna"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  alert('entrando a codeseisdeuna');
})

$$(document).on('page:init', '.page[data-name="cuenta"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  alert('entrando a cuenta');
})

$$(document).on('page:init', '.page[data-name="negocio"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  alert('entrando a negocio');
})
$$(document).on('page:init', '.page[data-name="cambiardatosperfil"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  alert('entrando a cambiardatosperfil');
})
$$(document).on('page:init', '.page[data-name="registrarnegocio"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  alert('entrando a registrarnegocio');
})
$$(document).on('page:init', '.page[data-name="graciasnegocio"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  alert('entrando a graciasnegocio');
})
$$(document).on('page:init', '.page[data-name="tarjetas"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  alert('entrando a tarjetas');
})
$$(document).on('page:init', '.page[data-name="compras"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  alert('entrando a compras');
})
$$(document).on('page:init', '.page[data-name="favoritos"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  alert('entrando a favoritos');
})



