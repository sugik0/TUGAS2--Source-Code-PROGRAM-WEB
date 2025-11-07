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
      }
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
        }
    }
});