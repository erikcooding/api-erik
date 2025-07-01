// Variabel global untuk menyimpan semua data menu setelah dimuat
let allMenuData = [];

// ---
// Fungsi untuk Menampilkan Menu berdasarkan Kategori
// ---
function tampilkanMenu(kategoriFilter) {
    // Kosongkan konten di dalam div #isinya sebelum menambahkan yang baru
    $('#isinya').empty(); 

    let content = ''; // Variabel untuk menampung HTML menu yang akan dibuat

    // Loop melalui setiap item di 'allMenuData' (data yang sudah dimuat)
    $.each(allMenuData, function(i, item) {
        // Cek jika kategoriFilter adalah 'all' ATAU jika kategori item cocok dengan filter
        if (kategoriFilter === 'all' || item.kategori.toLowerCase() === kategoriFilter.toLowerCase()) {
            // Gunakan Template Literals (``) untuk membuat HTML lebih mudah dibaca
            content += `
                <div class="col-md-4 mb-4">
                    <div class="card h-100">
                        <img src="img/pizza/${item.gambar}" class="card-img-top" alt="${item.nama}">
                        <div class="card-body">
                            <h5 class="card-title">${item.nama}</h5>
                            <p class="card-text">${item.deskripsi}</p>
                            <h5 class="card-title">Rp ${item.harga.toLocaleString('id-ID')}</h5> <a href="#" class="btn btn-primary">Pesan Sekarang</a>
                        </div>
                    </div>
                </div>
            `;
        }
    });
    // Masukkan HTML yang sudah dibuat ke dalam div #isinya
    $('#isinya').html(content);
}

// ---
// Jalankan kode setelah seluruh dokumen siap (DOM sudah dimuat sepenuhnya)
// ---
$(document).ready(function() {
    // 1. Muat Data JSON SEKALI saat halaman dimuat
    $.getJSON('pizza.json', function(response) {
        allMenuData = response.menu; // Simpan array menu ke variabel global

        // Tampilkan semua menu secara default saat halaman pertama kali dimuat
        tampilkanMenu('all'); 
        $('#menu-title').html('All Menu'); // Atur judul awal
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        // Penanganan error jika file JSON tidak ditemukan (404) atau ada masalah lain
        console.error("Error memuat JSON:", textStatus, errorThrown);
        $('#isinya').html('<p class="text-danger text-center">Gagal memuat menu. Silakan periksa koneksi atau file JSON Anda.</p>');
    });

    // 2. Event Listener untuk Navigasi (Filter Kategori)
    $('.nav-link').on('click', function(e) {
        e.preventDefault(); // Mencegah perilaku default link (misalnya, scroll ke atas)

        // Hapus kelas 'active' dari semua nav-link
        $('.nav-link').removeClass('active');
        // Tambahkan kelas 'active' ke nav-link yang diklik
        $(this).addClass('active');

        // Ambil kategori dari atribut data-category di HTML
        let kategoriFilter = $(this).data('category'); // Ini lebih baik daripada .html()
        let kategoriText = $(this).html(); // Ambil teks dari link untuk dijadikan judul

        $('#menu-title').html(kategoriText); // Ubah judul h1

        // Panggil fungsi tampilkanMenu dengan kategori yang dipilih
        tampilkanMenu(kategoriFilter);
    });
});