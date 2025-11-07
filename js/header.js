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

}); 