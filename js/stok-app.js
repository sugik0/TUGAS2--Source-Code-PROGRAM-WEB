var app = new Vue ({
  el: '#stok-app',
  data: {
      upbjjList: ["Jakarta", "Surabaya", "Makassar", "Padang", "Denpasar"],
      kategoriList: ["MK Wajib", "MK Pilihan", "Praktikum", "Problem-Based"],
      stok: [],
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
      bukuYangDiedit: null,
      isLoading: false,
      error: null

    },

  created: function() {
      this.ambilDataBuku();
    },

  computed: {

        stokTampil: function() {
            // 1. BUAT SALINAN DARI 'this.stok' DENGAN .slice()
            // 'daftar' sekarang adalah array baru yang aman untuk di-filter & sort
            let daftar = this.stok.slice(); 

            // 2. Terapkan filter (ini sudah benar)
            if (this.filterLokasi) {
                daftar = daftar.filter(buku => buku.upbjj === this.filterLokasi);
            }
            if (this.filterKategori) {
                daftar = daftar.filter(buku => buku.kategori === this.filterKategori);
            }
            if (this.filterHanyaMenipis) {
                daftar = daftar.filter(buku => buku.qty < buku.safety || buku.qty === 0);
            }
            
            // 3. Terapkan sort (ini sudah benar)
            if (this.urutkanBerdasarkan === 'judul') {
                daftar.sort((a, b) => a.judul.localeCompare(b.judul));
            } else if (this.urutkanBerdasarkan === 'harga') {
                daftar.sort((a, b) => a.harga - b.harga);
            } else if (this.urutkanBerdasarkan === 'stok') {
                daftar.sort((a, b) => a.qty - b.qty);
            }
            
            // 4. Kembalikan array yang sudah diolah
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

  watch: {
    filterLokasi: function(lokasiBaru) {
        this.filterKategori = '';
        this.urutkanBerdasarkan = 'judul';
        this.filterHanyaMenipis = false;
        },
    },

  methods: {

    ambilDataBuku: function() {
            var vm = this; 
            vm.isLoading = true;
            vm.error = null;

            axios.get('api/api-buku.php')
                .then(function (response) {

                    // --- TAMBAHKAN BARIS INI ---
                    console.log("API Berhasil! Data yang diterima:", response.data); 

                    vm.stok = response.data; 
                    vm.isLoading = false;
                })
                .catch(function (error) {
                    // --- TAMBAHKAN BARIS INI ---
                    console.error("API GAGAL:", error); 

                    vm.error = "Gagal memuat data buku dari server.";
                    vm.isLoading = false;
                });
        },

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
            this.modeModal = 'edit';
            
            // Simpan referensi ke buku *asli*
            this.bukuYangDiedit = buku; 
            
            // PENTING: Salin data buku ke 'bukuForm'
            // Kita pakai Object.assign({}, ...) untuk membuat SALINAN data.
            // Jika tidak disalin, form akan mengedit data asli secara langsung.
            this.bukuForm = Object.assign({}, buku);
            
            this.isModalBuka = true;
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