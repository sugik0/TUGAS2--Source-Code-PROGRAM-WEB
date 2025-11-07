document.addEventListener("DOMContentLoaded", function () {

  setupLoginModal();
  setupLoginForm();
  setupHelpLinks();

  function setupLoginModal() {
    const loginModal = document.getElementById("loginModal");
    const loginBtn = document.getElementById("loginPopupBtn");
    const closeModalBtn = document.getElementById("closeLoginModal");

    if (loginBtn) {
      loginBtn.onclick = function (e) {
        e.preventDefault();
        if (loginModal) loginModal.style.display = "block";
      };
    }

    if (closeModalBtn) {
      closeModalBtn.onclick = function () {
        if (loginModal) loginModal.style.display = "none";
      };
    }

    window.onclick = function (event) {
      if (event.target == loginModal) {
        loginModal.style.display = "none";
      }
    };
  }

  function setupLoginForm() {
    const loginForm = document.getElementById("loginForm");

    if (!loginForm) return;

    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();


      if (typeof dataPengguna === "undefined" || !Array.isArray(dataPengguna)) {
        alert("Data pengguna belum dimuat. Pastikan data.js telah disertakan.");
        return;
      }

      const emailInput = document
        .getElementById("email")
        .value.trim()
        .toLowerCase();
      const passwordInput = document.getElementById("password").value;

      const user = dataPengguna.find(
        (u) =>
          (u.email || "").toLowerCase() === emailInput &&
          u.password === passwordInput
      );

      if (user) {
        alert("Login berhasil! Selamat datang, " + user.nama);
        localStorage.setItem("loggedInUser", user.nama);
        window.location.href = "dashboard.html";
      } else {
        alert("email/password yang anda masukkan salah");
      }
    });
  }

  function setupHelpLinks() {
    const lupaLink = document.getElementById("lupaPasswordLink");
    const daftarLink = document.getElementById("daftarLink");

    if (lupaLink) {
      lupaLink.onclick = function (e) {
        e.preventDefault();
        alert(
          "Silakan hubungi administrator sistem Anda untuk mereset password."
        );
      };
    }

    if (daftarLink) {
      daftarLink.onclick = function (e) {
        e.preventDefault();
        alert("Pendaftaran akun baru hanya dapat dilakukan oleh Admin Pusat.");
      };
    }
  }
});
