document.addEventListener('DOMContentLoaded', function() {
  
  const userName = localStorage.getItem('loggedInUser');
  
  if (!userName) {
    alert('Anda harus login terlebih dahulu.');
    window.location.href = 'index.html';
    return; 
  }

  const greetingElement = document.getElementById('greeting');
  const now = new Date();
  const hour = now.getHours();
  let greetingText = '';

  if (hour < 11) {
    greetingText = 'Selamat Pagi';
  } else if (hour < 15) {
    greetingText = 'Selamat Siang';
  } else if (hour < 19) {
    greetingText = 'Selamat Sore';
  } else {
    greetingText = 'Selamat Malam';
  }
  
    if (greetingElement) {
        greetingElement.textContent = `${greetingText}, ${userName}!`;
    }
  
  const userNameDisplay = document.getElementById('userNameDisplay');
  if (userNameDisplay) {
    userNameDisplay.textContent = userName;
  }
  
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault(); 
      
      localStorage.removeItem('loggedInUser');
      
      alert('Anda telah berhasil logout.');
      
      window.location.href = 'index.html';
    });
  }

  const clockElement = document.getElementById('liveClock');
  
  function updateClock() {
    if (!clockElement) return;
    
    const now = new Date();
    
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    
    const timeString = now.toLocaleTimeString('id-ID', options).replace(/\./g, ':');
    
    clockElement.textContent = timeString;
  }
  
  updateClock();
  
  setInterval(updateClock, 1000);

function muatCuacaSederhana() {
    // Ambil elemen "wadah" yang kita buat di HTML
    const widgetCuaca = document.getElementById("cuaca-widget");
    if (!widgetCuaca) return; // Keluar jika elemen tidak ada

    const urlApi = 'https://wttr.in/?format=4'; 

    fetch(urlApi)
      .then(function(response) {
        return response.text();
      })
      .then(function(dataTeks) {
        // dataTeks = "Klungkung, Indonesia: ⛅️ 🌡️+30°C 🌬️→4km/h"
        
        // 1. Pecah string di tanda ': '
        const parts = dataTeks.split(': ');

        if (parts.length === 2) {
          // parts[0] = "Klungkung, Indonesia"
          // parts[1] = "⛅️ 🌡️+30°C 🌬️→4km/h"
          const lokasi = parts[0];
          const detailCuaca = parts[1];

          // 2. Buat HTML baru dengan <span> dan class
          const htmlBaru = `
            <span class="cuaca-lokasi">${lokasi}</span>
            <span class="cuaca-detail">${detailCuaca}</span>
          `;

          // 3. Gunakan .innerHTML untuk memasukkan HTML baru
          widgetCuaca.innerHTML = htmlBaru;

        } else {
          // Fallback jika formatnya aneh
          widgetCuaca.textContent = dataTeks; 
        }
      })
      .catch(function(error) {
        console.error("Gagal memuat cuaca:", error);
        widgetCuaca.textContent = "Gagal memuat cuaca";
      });
  }

  // Panggil fungsi (kode ini sudah ada)
  muatCuacaSederhana();



}); 