var app = new Vue ({
  el: '#stok-app',
  data: {
      upbjjList: ["Jakarta", "Surabaya", "Makassar", "Padang", "Denpasar"],
      kategoriList: ["MK Wajib", "MK Pilihan", "Praktikum", "Problem-Based"],
      stok: [
        {
          kode: "EKMA4116",
          judul: "Pengantar Manajemen",
          kategori: "MK Wajib",
          upbjj: "Jakarta", 
          lokasiRak: "R1-A3",
          harga: 65000,
          qty: 28,
          safety: 20,
          catatanHTML: "<em>Edisi 2024, cetak ulang</em>",
          cover: "img/ekma4116.jpg"
        },
        {
          kode: "EKMA4115",
          judul: "Pengantar Akuntansi",
          kategori: "MK Wajib",
          upbjj: "Jakarta",
          lokasiRak: "R1-A4",
          harga: 60000,
          qty: 7,
          safety: 15,
          catatanHTML: "<strong>Cover baru</strong>",
          cover: "img/ekma4115.jpg"
        },
        {
          kode: "BIOL4110",
          judul: "Biologi Umum (Praktikum)",
          kategori: "Praktikum",
          upbjj: "Surabaya",
          lokasiRak: "R3-B2",
          harga: 80000,
          qty: 12,
          safety: 10,
          catatanHTML: "Butuh <u>pendingin</u> untuk kit basah",
          cover: "img/biol4110.jpg"
        },
        {
          kode: "ISIP4110",
          judul: "Pengantar Sosiologi",
          kategori: "MK Pilihan",
          upbjj: "Makassar",
          lokasiRak: "R2-C1",
          harga: 55000,
          qty: 2,
          safety: 8,
          catatanHTML: "Stok <i>menipis</i>, prioritaskan reorder",
          cover: "img/isip4110.jpg"
        }
      ],
      filterLokasi: '',
      filterKategori: '',
      filterHanyaMenipis: false,
      urutkanBerdasarkan: 'judul',


      isModalBuka: false,
      modeModal: 'tambah',
      bukuForm: {
            kode: '',
            judul: '',
            kategori: '',
            upbjj: '',
            lokasiRak: '',
            harga: 0,
            qty: 0,
            safety: 10,
            catatanHTML: '',
            cover: 'img/std_buku.jpg',
            edisi: 1
      },
      bukuYangDiedit: null  

    },



  computed: {

      stokTampil: function() {
            let daftar = this.stok;
            if (this.filterLokasi) {
                daftar = daftar.filter(buku => buku.upbjj === this.filterLokasi);
            }
            if (this.filterKategori) {
                daftar = daftar.filter(buku => buku.kategori === this.filterKategori);
            }
            if (this.filterHanyaMenipis) {
                daftar = daftar.filter(buku => buku.qty < buku.safety || buku.qty === 0);
            }
            if (this.urutkanBerdasarkan === 'judul') {
                daftar.sort((a, b) => a.judul.localeCompare(b.judul));
            } else if (this.urutkanBerdasarkan === 'harga') {
                daftar.sort((a, b) => a.harga - b.harga);
            } else if (this.urutkanBerdasarkan === 'stok') {
                daftar.sort((a, b) => a.qty - b.qty);
            }
            return daftar;
        },

      judulModal: function() {
            if (this.modeModal === 'tambah') {
                return 'Tambah Data Stok Baru';
            } else {
                return 'Edit Data Stok';
            }
        },


    },
    
  methods: {
      getStatusClass: function(buku) {
          
        if (buku.qty === 0) {
            return 'status-kosong';
        } else if (buku.qty < buku.safety) {
            return 'status-menipis';
        } else {
            return 'status-aman';
        }
      },

      resetFilter: function() {
            this.filterLokasi = '';
            this.filterKategori = '';
            this.filterHanyaMenipis = false;
            this.urutkanBerdasarkan = 'judul';
        },

      bukaModeTambah: function() {
          this.modeModal = 'tambah';
          // Reset form ke kondisi kosong
          this.bukuForm = { 
                      kode: '',
                      judul: '',
                      kategori: '',
                      upbjj: '',
                      lokasiRak: '',
                      harga: 0,
                      qty: 0,
                      safety: 10,
                      catatanHTML: '',
                      cover: 'img/std_buku.jpg',
                      edisi: 1
          };
          this.bukuYangDiedit = null;
          this.isModalBuka = true;
      },

      bukaModeEdit: function(buku) {
            console.log("Fungsi bukaModeEdit() DIPANGGIL!");
            this.modeModal = 'edit';
            
            // Simpan referensi ke buku *asli*
            this.bukuYangDiedit = buku; 
            
            // PENTING: Salin data buku ke 'bukuForm'
            // Kita pakai Object.assign({}, ...) untuk membuat SALINAN data.
            // Jika tidak disalin, form akan mengedit data asli secara langsung.
            this.bukuForm = Object.assign({}, buku);
            
            this.isModalBuka = true;
            console.log("isModalBuka sekarang:", this.isModalBuka);
        },
      tutupModal: function() {
            this.isModalBuka = false;
        },

      simpanForm: function() {
          // 1. Validasi Sederhana
          if (!this.bukuForm.kode || !this.bukuForm.judul) {
              alert('Kode dan Judul wajib diisi!');
              return;
          }

          if (this.modeModal === 'tambah') {
              // --- LOGIKA TAMBAH BARU ---
              
              // Cek duplikat kode
              const duplikat = this.stok.find(b => b.kode === this.bukuForm.kode);
              if (duplikat) {
                  alert('Kode buku sudah ada! Gunakan kode lain.');
                  return;
              }
              
              // Tambahkan data baru (sebagai salinan) ke array 'stok'
              this.stok.push(Object.assign({}, this.bukuForm));
              alert('Data buku baru berhasil ditambahkan!');

          } else {
              // --- LOGIKA EDIT ---
              
              // Salin nilai dari 'bukuForm' (yang ada di form)
              // ke 'bukuYangDiedit' (data asli di array 'stok').
              Object.assign(this.bukuYangDiedit, this.bukuForm);
              alert('Data buku berhasil diperbarui!');
          }
          
          // Tutup modal setelah selesai
          this.tutupModal();
      }

    }
});