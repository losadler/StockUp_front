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
    {
      path: '/tiendas/',
      url: 'tiendas.html',
    },
    {
      path: '/agregartarjeta/',
      url: 'agregartarjeta.html',
    },
    {
      path: '/logearnegocio/',
      url: 'logearnegocio.html',
    },
    {
      path: '/registrarnegocio/',
      url: 'registrarnegocio.html',
    },
    {
      path: '/deletenegocio/',
      url: 'deletenegocio.html',
    },
    {
      path: '/tiendaunica/',
      url: 'tiendaunica.html',
    },
  ]
  // ... other parameters
});


var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
  console.log("¡Estoy listo rey!");
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
  alert('Salí de acá');
})


// Manejo del botón de logout (global, ya que puede estar en varias páginas)
$$(document).on('click', '#boton-logout', function (e) {
  // Borrar datos de sesión
  localStorage.removeItem('user');  // Para usuarios
  localStorage.removeItem('comercio');  // Para negocios, por si acaso

  // Navegar al login
  mainView.router.navigate('/index/');  // O '/inicio/' si es tu página de bienvenida

  // Opcional: Mostrar mensaje
  app.dialog.alert('Sesión cerrada. ¡Hasta pronto!');
});

// Chequeo inicial de login al cargar la app
app.on('init', function () {
  const user = localStorage.getItem('user');
  if (user) {
    // Si ya logueado, redirigí a inicio (donde se ve navbar/toolbar)
    mainView.router.navigate('/inicio/');
  }
});

// O si preferís en page:init de index (para ser más preciso)
$$(document).on('page:init', '.page[data-name="index"]', function (e) {
  const user = localStorage.getItem('user');
  if (user) {
    mainView.router.navigate('/inicio/');
  }
});



$$(document).on('page:init', '.page[data-name="index"]', function (e) {

  $$('#botonlogin').on("click", function (e) {

    // Validación de campos vacíos antes de enviar
    const email = $$('#emaillog').val();
    const clave = $$('#passwordlog').val();

    if (!email || !clave) {
      app.dialog.alert("Debes completar todos los campos", "Error");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: email,
      clave: clave
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("https://StockUp.somee.com/api/Login", requestOptions)
      .then(response => response.json())
      .then(function (datos) {
        console.log("respuesta login:", datos);

        // --------------------------------------------
        // VALIDACIONES SEGÚN LA RESPUESTA DEL SERVIDOR
        // --------------------------------------------

        // Si el backend devuelve null, undefined o un error
        if (!datos || datos.error) {
          app.dialog.alert("Usuario o contraseña incorrectos", "Error");
          return;
        }

        // Si el backend devuelve un objeto vacío
        if (Object.keys(datos).length === 0) {
          app.dialog.alert("Usuario o contraseña incorrectos", "Error");
          return;
        }

        // Si llegó hasta acá → login válido
        localStorage.setItem('user', JSON.stringify(datos));
        app.dialog.alert("¡Bienvenido!", "Éxito");

        // navegar a inicio
        actualizarUI();

        mainView.router.navigate("/inicio/");
      })
      .catch((error) => {
        console.error(error);
        app.dialog.alert("Contraseña o usuario invalido", "Error");
      });

  });

});



$$(document).on('page:init', '.page[data-name="registro"]', function () {
  $$('#botonregistro').on('click', async function (e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();

    const email = ($$('#emailreg').val() || '').trim();
    const clave = $$('#passwordreg').val() || '';
    const nombre = ($$('#nombrereg').val() || '').trim();
    const apellido = ($$('#apellidoreg').val() || '').trim();

    if (!email || !clave || !nombre || !apellido) {
      app.dialog.alert('Completa todos los campos');
      return;
    }

    try {
      const resp = await fetch('https://StockUp.somee.com/api/Registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, clave, nombre, apellido }),
        redirect: 'follow'
      });

      const raw = await resp.text();
      let datos = null;
      try { datos = JSON.parse(raw); } catch (err) { /* no JSON */ }

      if (!resp.ok) {
        const msg = (datos && (datos.message || datos.error)) || raw || 'Error en registro';
        app.dialog.alert('Registro falló: ' + msg);
        return;
      }

      // Lo importante: crear un objeto user que combine respuesta del servidor + valores del form
      // Los valores del form (nombre/apellido/email) tienen prioridad si el servidor no los trae.
      const serverUser = (datos && (datos.usuario || datos.user)) || datos || {};
      const userToSave = Object.assign({}, serverUser, {
        email: serverUser.email || email,
        nombre: serverUser.nombre || nombre,
        apellido: serverUser.apellido || apellido
      });

      // No guardar contraseña
      if (userToSave.clave) delete userToSave.clave;

      localStorage.setItem('user', JSON.stringify(userToSave));
      console.log('Registro: guardado en localStorage.user =', localStorage.getItem('user'));

      // Navegar a cuenta (usa tu router)
      if (typeof mainView !== 'undefined' && mainView && mainView.router) {
        mainView.router.navigate('/inicio/');
      } else if (window.app && app.views && app.views.main && app.views.main.router) {
        app.views.main.router.navigate('/inicio/');
      } else {
        window.location.href = '/inicio/';
      }

      if (typeof window.updateAuthUI === 'function') window.updateAuthUI('inicio');

    } catch (err) {
      console.error('registro-handler: error', err);
      app.dialog.alert('Error al registrar: ' + (err.message || err));
    }
  });
});

$$(document).on('page:init', '.page[data-name="inicio"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
})

$$(document).on('page:init', '.page[data-name="olvidecontrasenia"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
})

$$(document).on('page:init', '.page[data-name="codeseis"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
})

$$(document).on('page:init', '.page[data-name="nuevacontrasenia"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
})

$$(document).on('page:init', '.page[data-name="codeseisdeuna"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
})

// cuenta-init.js (reemplaza tu page:init por esto)
// cuenta-init.js
$$(document).on('page:beforein', '.page[data-name="cuenta"]', function () {
  try {
    const userStr = localStorage.getItem('user');
    console.log('Cuenta: localStorage.user raw =', userStr);
    if (!userStr) {
      app.dialog.alert('No estás logueado. Inicia sesión', function () {
        if (typeof mainView !== 'undefined' && mainView && mainView.router) mainView.router.navigate('/');
        else if (window.app && app.views && app.views.main && app.views.main.router) app.views.main.router.navigate('/');
        else window.location.href = '/';
      });
      return;
    }

    const user = JSON.parse(userStr);

    $$('#nombreCuenta').text(user.nombre || user.name || '');
    $$('#apellidoCuenta').text(user.apellido || user.lastname || '');
    $$('#emailCuenta').text(user.email || '');

    if (user.clave) $$('#claveCuenta').text('•'.repeat(Math.min(12, String(user.clave).length)));
    else $$('#claveCuenta').text('');

  } catch (err) {
    console.error('cuenta-init: error cargando usuario', err);
  }
});



$$(document).on('page:init', '.page[data-name="cambiardatosperfil"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
})
$$(document).on('page:init', '.page[data-name="graciasnegocio"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
})
$$(document).on('page:init', '.page[data-name="tarjetas"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
})
$$(document).on('page:init', '.page[data-name="compras"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
})
$$(document).on('page:init', '.page[data-name="favoritos"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
})
$$(document).on('page:init', '.page[data-name="tiendaunica"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
})

// js/tiendas-init.js
$$(document).on('page:beforein', '.page[data-name="tiendas"]', async function (e, page) {
  const $list = $$('#tiendasList');
  const $loading = $$('#tiendas-loading');

  // Mostrar loader
  if ($loading.length) $loading.show();

  // Limpia contenedor (se reemplaza después)
  $list.html('<div id="tiendas-loading" class="block" style="text-align:center; padding: 1rem;">Cargando locales...</div>');

  try {
    // Si querés filtrar por tipo desde la query: ?tipo=comida
    // Framework7 coloca la query en page.route.query (puede variar por versión)
    const tipo = (page && page.route && page.route.query && page.route.query.tipo) ? page.route.query.tipo : null;

    // Configura headers (añade token si lo usás)
    const headers = { 'Accept': 'application/json' };
    const token = localStorage.getItem('token');
    if (token) headers['Authorization'] = 'Bearer ' + token;

    // Si tu API soporta GET para listar:
    let url = 'https://StockUp.somee.com/api/Comercios';
    // Si querés filtrar por tipo con query param:
    if (tipo) url += '?tipo=' + encodeURIComponent(tipo);

    // Si tu API requiere POST para filtrar, reemplazar por fetch con body (ver nota abajo)
    const resp = await fetch(url, { method: 'GET', headers });

    const text = await resp.text();
    let data;
    try { data = JSON.parse(text); } catch (err) { data = text; }

    if (!resp.ok) {
      const msg = (data && (data.message || data.error)) || text || 'Error al obtener locales';
      throw new Error(msg);
    }

    // Normalizar array: la API puede devolver un array directamente o un objeto con la lista
    const dataArray = Array.isArray(data) ? data : (data && (data.data || data.comercios || data.comerciosList || [])) || [];

    if (!dataArray.length) {
      $list.html('<div class="block"><p>No hay locales disponibles.</p></div>');
      return;
    }

    // Construir HTML con tarjetas por cada comercio
    let html = '';
    dataArray.forEach(item => {
      const nombre = item.nombre || item.razonSocial || item.nombreComercio || 'Sin nombre';
      const direccion = item.direccion || item.domicilio || '';
      const localidad = item.localidad || '';
      const provincia = item.provincia || '';
      const estado = item.estado || '';
      const email = item.email || '';

      html += `
        <a href="/tiendaunica/">
        <div class="card card-outline">
          <div class="card-header">${escapeHtml(nombre)}</div>
          <div class="card-content card-content-padding">
            <p style="font-size:0.9rem; color:#444; margin:0 0 .4rem;">
              <i class="f7-icons">map</i> ${escapeHtml(direccion)}
            </p>
            <br>
            <p style="font-size:0.8rem; color:#777; margin:0;">
              <i class="f7-icons">doc_person</i> ${escapeHtml(email)}
            </p>
            <br>
            <p style="font-size:0.9rem; color:#444; margin:0 0 .4rem;">
              <i class="f7-icons">stopwatch</i> ${escapeHtml(estado)}
            </p>
          </div>
        </div>
        </a> 

      `;
    });

    $list.html(html);

  } catch (err) {
    console.error('Error cargando comercios:', err);
    $list.html('<div class="block"><p>Error al cargar locales. Revisa la consola.</p></div>');
    // opcional: app.dialog.alert('Error: ' + (err.message || err));
  }
});

// Helper para escapar HTML simple
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

$$(document).on('page:init', '.page[data-name="agregartarjeta"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
})


$$(document).on('page:init', '.page[data-name="deletenegocio"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
})



$$(document).on('page:init', '.page[data-name="logearnegocio"]', function (e) {
  $$('#botonlogearnegocio').on("click", function (e) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      "email": $$('#logearnegocioemail').val(),
      "clave": $$('#logearnegocioclave').val()
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };


    fetch("https://StockUp.somee.com/api/Comercios/login", requestOptions)
      .then(response => response.json()) // parseamos JSON directamente
      .then(function (datos) {
        console.log("comercio", datos);
        // Guardar el objeto comercio (o token) en localStorage
        localStorage.setItem('comercio', JSON.stringify(datos));
        // navegar a negocio
        mainView.router.navigate("/negocio/");
      })
      .catch((error) => console.error(error));

  });
});



$$(document).on('page:init', '.page[data-name="registrarnegocio"]', function () {
  $$('#botonregistronegocio').on('click', async function (e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();

    const email = ($$('#negocioemail').val() || '').trim();
    const clave = $$('#negocioclave').val() || '';
    const nombre = ($$('#negocionombre').val() || '').trim();
    const categoria = ($$('#negociocategoria').val() || '').trim();
    const direccion = ($$('#negociodireccion').val() || '').trim();
    const localidad = ($$('#negociolocalidad').val() || '').trim();
    const provincia = ($$('#negocioprovincia').val() || '').trim();
    const horarios = ($$('#negociohorarios').val() || '').trim();
    const foto = ($$('#negociofoto').val() || '').trim();

    if (!email || !clave || !nombre || !categoria || !direccion || !localidad || !provincia || !horarios || !foto) {
      app.dialog.alert('Completa todos los campos');
      return;
    }

    try {
      const resp = await fetch('https://StockUp.somee.com/api/Comercios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, clave, nombre, categoria, direccion, localidad, provincia, horarios, foto }),
        redirect: 'follow'
      });

      const raw = await resp.text();
      let datos = null;
      try { datos = JSON.parse(raw); } catch (err) { /* no JSON */ }

      if (!resp.ok) {
        const msg = (datos && (datos.message || datos.error)) || raw || 'Error en registro';
        app.dialog.alert('Registro falló: ' + msg);
        return;
      }

      // Crear objeto comercio combinando respuesta del server + valores del form
      const serverComercio = (datos && (datos.comercio || datos.business)) || datos || {};
      const comercioToSave = Object.assign({}, serverComercio, {
        email: serverComercio.email || email,
        nombre: serverComercio.nombre || nombre,
        categoria: serverComercio.categoria || categoria,
        direccion: serverComercio.direccion || direccion,
        localidad: serverComercio.localidad || localidad,
        provincia: serverComercio.provincia || provincia,
        horarios: serverComercio.horarios || horarios,
        foto: serverComercio.foto || foto
      });

      // No guardar contraseña
      if (comercioToSave.clave) delete comercioToSave.clave;

      localStorage.setItem('comercio', JSON.stringify(comercioToSave));
      console.log('Registro: guardado en localStorage.comercio =', localStorage.getItem('comercio'));

      // Navegar a negocio
      if (typeof mainView !== 'undefined' && mainView && mainView.router) {
        mainView.router.navigate('/negocio/');
      } else if (window.app && app.views && app.views.main && app.views.main.router) {
        app.views.main.router.navigate('/negocio/');
      } else {
        window.location.href = '/negocio/';
      }

      if (typeof window.updateAuthUI === 'function') window.updateAuthUI('negocio');

    } catch (err) {
      console.error('registro-handler: error', err);
      app.dialog.alert('Error al registrar: ' + (err.message || err));
    }
  });
});





$$(document).on('page:init', function () {
  actualizarUI();
});

function actualizarUI() {
  const user = localStorage.getItem("user");

  if (user && user !== "null" && user !== "{}") {
    // Usuario logueado → mostrar
    $$('#app-navbar').show();
    $$('#app-panel').show();
    $$('#app-toolbar').show();
  } else {
    // Usuario no logueado → ocultar
    $$('#app-navbar').hide();
    $$('#app-panel').hide();
    $$('#app-toolbar').hide();
  }
}


$$(document).on('page:init', function () {
  actualizarUI();
});


