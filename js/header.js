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
      const widgetCuaca = document.getElementById("cuaca-widget");
      if (!widgetCuaca) return;

      const urlApi = 'https://wttr.in/?format=4'; 

      fetch(urlApi)
        .then(function(response) {
          return response.text();
        })
        .then(function(dataTeks) {
          const parts = dataTeks.split(': ');

          if (parts.length === 2) {
            const lokasi = parts[0];
            const detailCuaca = parts[1];
            const htmlBaru = `
              <span class="cuaca-lokasi">${lokasi}</span>
              <span class="cuaca-detail">${detailCuaca}</span>
            `;
            widgetCuaca.innerHTML = htmlBaru;

          } else {
            widgetCuaca.textContent = dataTeks; 
          }
        })
        .catch(function(error) {
          console.error("Gagal memuat cuaca:", error);
          widgetCuaca.textContent = "Gagal memuat cuaca";
        });
    }
    muatCuacaSederhana();
}); 