// Fondo animado de partículas
particlesJS('particles-js', {
    particles: {
      number: { value: 80 },
      color: { value: "#ff00cc" },
      shape: { type: "circle" },
      opacity: { value: 0.5 },
      size: { value: 3 },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#ff00cc",
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "repulse"
        },
        onclick: {
          enable: true,
          mode: "push"
        }
      },
      modes: {
        repulse: { distance: 100 },
        push: { particles_nb: 4 }
      }
    },
    retina_detect: true
  });
  
  // Función para cargar vouchs al contenedor visible
  function cargarVouchs() {
    const lista = document.getElementById('vouchs-lista');
    const carrusel = document.getElementById('vouchs-carousel');
    const vouchs = JSON.parse(localStorage.getItem('vouchs')) || [];
  
    if (lista) lista.innerHTML = '';
    if (carrusel) carrusel.innerHTML = '';
  
    vouchs.forEach(vouch => {
      const div = document.createElement('div');
      div.className = 'vouch';
      div.innerHTML = `<strong>${vouch.nombre}:</strong> ${vouch.mensaje}`;
      if (lista) lista.prepend(div);
    });
  
    // Si existe carrusel duplicamos para efecto infinito
    if (carrusel) {
      const duplicados = [...vouchs, ...vouchs];
      duplicados.forEach(vouch => {
        const card = document.createElement('div');
        card.className = 'vouch-card';
        card.innerHTML = `<strong style="color:#ff00ff">${vouch.nombre}:</strong> ${vouch.mensaje}`;
        carrusel.appendChild(card);
      });
    }
  }
  
  // Llamar al cargar la página
  window.addEventListener('DOMContentLoaded', cargarVouchs);
  
  // Envío de vouch
  document.getElementById('vouch-form').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const nombre = document.getElementById('nombre').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
  
    if (!nombre || !mensaje) return;
  
    // 1. Guardar en localStorage
    const vouchs = JSON.parse(localStorage.getItem('vouchs')) || [];
    vouchs.push({ nombre, mensaje });
    localStorage.setItem('vouchs', JSON.stringify(vouchs));
    actualizarContadorVouchs();

  
    // 2. Mostrar en pantalla inmediatamente
    cargarVouchs();
  
    // 3. Enviar a Discord por webhook
    const webhookURL = 'https://discord.com/api/webhooks/1365844755258282065/yex12GkpxREZq7-KPTKy8N8eYCNk9H5UMhKi9KMGxBObLzSgMx0ih4drW0hc9nCJtT7A';
  
    const data = {
      username: 'Vouch Rosa Web',
      avatar_url: 'https://i.imgur.com/Hh7Qyfj.png',
      embeds: [
        {
          title: '📝 Nuevo Vouch desde la Web',
          color: 0xff00cc,
          fields: [
            {
              name: '👤 Usuario',
              value: nombre,
              inline: true
            },
            {
              name: '💬 Mensaje',
              value: mensaje,
              inline: false
            }
          ],
          timestamp: new Date()
        }
      ]
    };
  
    try {
      await fetch(webhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } catch (err) {
      console.error('Error al enviar vouch a Discord:', err);
    }

    function actualizarContadorVouchs() {
        const contador = document.getElementById('contador-vouchs');
        if (!contador) return;
      
        const vouchs = JSON.parse(localStorage.getItem('vouchs')) || [];
        contador.textContent = `(${vouchs.length})`;
      }
      
      // Llamar al cargar
      window.addEventListener('DOMContentLoaded', actualizarContadorVouchs);
      
      // Actualizar cada minuto
      setInterval(actualizarContadorVouchs, 60000);      
  
    // 4. Limpiar formulario
    document.getElementById('nombre').value = '';
    document.getElementById('mensaje').value = '';
  });
