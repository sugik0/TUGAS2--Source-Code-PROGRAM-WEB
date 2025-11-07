var app = new Vue({
  el: '#tracking-app',
  data: {
    // --- Data yang disalin dari dataBahanAjar.js ---
      pengirimanList: [
        { kode: "REG", nama: "Reguler (3-5 hari)" },
        { kode: "EXP", nama: "Ekspres (1-2 hari)" }
      ],
      paket: [
        { kode: "PAKET-UT-001", nama: "PAKET IPS Dasar", isi: ["EKMA4116","EKMA4115"], harga: 120000 },
        { kode: "PAKET-UT-002", nama: "PAKET IPA Dasar", isi: ["BIOL4201","FISIP4001"], harga: 140000 }
      ],
    // Data tracking yang sudah ada
      tracking: {
        "DO2025-0001": {
          nim: "123456789",
          nama: "Rina Wulandari",
          status: "Dalam Perjalanan",
          ekspedisi: "JNE",
          tanggalKirim: "2025-08-25",
          paket: "PAKET-UT-001",
          total: 120000,
          perjalanan: [
            { waktu: "2025-08-25 10:12:20", keterangan: "Penerimaan di Loket: TANGSEL" },
            { waktu: "2025-08-25 14:07:56", keterangan: "Tiba di Hub: JAKSEL" },
            { waktu: "2025-08-26 08:44:01", keterangan: "Diteruskan ke Kantor Tujuan" }
          ]
        }
      },

    // --- Data untuk Fitur Pencarian ---
    nomorDoCari: '', // v-model untuk input pencarian
    hasilPencarian: null, // Menyimpan hasil pencarian
    pencarianGagal: false, // Status jika DO tidak ditemukan

    // --- Data untuk Form Tambah DO Baru ---
    isModalDoBuka: false,
    doBaru: {
      nim: '',
      nama: '',
      ekspedisi: '',
      paketKode: '', // Kode paket yang dipilih dari select
      tanggalKirim: new Date().toISOString().slice(0, 10), // Tanggal hari ini
    },
    paketTerpilih: null, // Untuk menyimpan objek paket yang dipilih
  },
  computed: {
    /**
     * Membuat Nomor DO baru secara otomatis
     *
     */
    nomorDoOtomatis: function () {
      const tahun = new Date().getFullYear();
      // Hitung jumlah data tracking yang sudah ada
      const jumlahData = Object.keys(this.tracking).length;
      // Buat sequence number (misal: 001, 002)
      const sequence = (jumlahData + 1).toString().padStart(4, '0');
      return `DO${tahun}-${sequence}`;
    },
  },

  watch: {
    /**
     * Watcher untuk memantau perubahan pada 'doBaru.paketKode'
     * Ini untuk memenuhi syarat "detail paket muncul setelah dipilih"
     *
     */
    'doBaru.paketKode': function (kodePaketBaru) {
      if (kodePaketBaru) {
        // Cari objek paket di 'this.paket' berdasarkan kode yang dipilih
        this.paketTerpilih = this.paket.find(p => p.kode === kodePaketBaru);
      } else {
        this.paketTerpilih = null;
      }
    },
  },

  methods: {
    cariDO: function () {
      // Cari data di objek 'this.tracking'
      const hasil = this.tracking[this.nomorDoCari];

      if (hasil) {
        this.hasilPencarian = hasil;
        this.pencarianGagal = false;
      } else {
        // Jika tidak ketemu
        this.hasilPencarian = null;
        this.pencarianGagal = true;
        alert('Nomor Delivery Order tidak ditemukan!');
      }
    },

    bukaModalDoBaru: function() {
        // Reset form
        this.doBaru.nim = '';
        this.doBaru.nama = '';
        this.doBaru.ekspedisi = '';
        this.doBaru.paketKode = '';
        this.paketTerpilih = null;
        this.doBaru.tanggalKirim = new Date().toISOString().slice(0, 10);
        // Buka modal
        this.isModalDoBuka = true;
    },
    
    tutupModalDoBaru: function() {
        this.isModalDoBuka = false;
    },
        // --- Method untuk Fitur Tambah DO Baru ---
    tambahDOBaru: function () {
      // Validasi sederhana
      if (!this.doBaru.nim || !this.doBaru.nama || !this.doBaru.ekspedisi || !this.paketTerpilih) {
        alert('Semua field (NIM, Nama, Ekspedisi, Paket) wajib diisi!');
        return;
      }
      
      // Ambil nomor DO otomatis dari computed
      const nomorBaru = this.nomorDoOtomatis;

      // Buat objek data baru
      const dataBaru = {
        nim: this.doBaru.nim,
        nama: this.doBaru.nama,
        status: 'Baru Dibuat', // Status default
        ekspedisi: this.doBaru.ekspedisi,
        tanggalKirim: this.doBaru.tanggalKirim,
        paket: this.paketTerpilih.kode,
        total: this.paketTerpilih.harga, // Ambil harga dari paket terpilih
        perjalanan: [
          { waktu: new Date().toLocaleString('id-ID'), keterangan: 'Order DO berhasil dibuat.' }
        ]
      };
      
      // Masukkan data baru ke objek 'tracking'
      // Kita gunakan Vue.set agar reaktif
      Vue.set(this.tracking, nomorBaru, dataBaru);
      
      alert(`DO baru ${nomorBaru} berhasil dibuat untuk ${dataBaru.nama}!`);

      this.tutupModalDoBaru();
    }
  },
});