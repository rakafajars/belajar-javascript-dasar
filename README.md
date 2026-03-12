# Belajar JavaScript Dasar dan DOM Manipulation

Proyek ini adalah hasil belajar saya membuat aplikasi *To-Do List* (Daftar Kegiatan) sederhana menggunakan HTML, CSS, dan JavaScript murni (Vanilla JS).

## 🚀 Apa Saja yang Sudah Saya Pelajari?

Melalui proyek ini, saya telah mempelajari dan mempraktikkan beberapa konsep dasar namun sangat penting dalam pengembangan web frontend:

### 1. Struktur Dasar dan Desain Web
- **HTML5:** Membuat struktur antarmuka pengguna seperti formulir (`<form>`), input teks (`<input>`), tombol (`<button>`), dan daftar kosong (`<ul>`) yang siap diisi oleh JavaScript.
- **CSS Flexbox:** Saya belajar menggunakan `display: flex;` untuk menyusun elemen secara rapi. Beberapa teknik jitu yang dipelajari:
  - `flex-direction: column` untuk menyusun item dari atas ke bawah.
  - `justify-content: space-between` untuk membuat jarak maksimal di tengah (elemen terdorong ke paling kiri dan paling kanan).
  - Trik `margin: 0 auto;` untuk membuat kotak (container) berada pas di tengah layar.
- **Micro-Interactions UI:** Membuat interaksi gaya *checkbox* yang responsif mengubah warna latar belakang (`background-color`) saat keadaan kegiatan sudah selesai dicentang.

### 2. Manipulasi DOM (Document Object Model) 
- Menangkap interaksi *user*, seperti menekan tombol *submit* pada form, dan mematikan sifat *refresh* bawaan browser menggunakan `event.preventDefault()`.
- Menangkap nilai ketikan dari input teks (`.value`).
- Membuat elemen HTML baru secara virtual (contohnya kotak `<li>`) murni dari Javascript menggunakan `document.createElement()`.
- Menyisipkan kerangka HTML buatan itu ke layar secara dinamis menggunakan sintaks modern *Template Literals* (menggunakan *backtick* ``` ` ```).

### 3. Logika JavaScript & State Management
- Menulis dan memanggil Fungsi Dasar (Functions) untuk merapikan alur kode seperti `addTask()`, `deleteTask()`, dan `renderTasks()`.
- **Validasi Sederhana:** Mengecek kelebihan spasi ketik menggunakan `.trim()` dan mencegah agar judul tugas yang kosong tidak dapat disimpan.
- **Array dan Objek:** Menyimpan state kumpulan daftar kegiatan ke dalam variabel bertipe data `Array` dan memanipulasi struktur kerangka datanya berupa kumpulan `Object` seperti `{ id, title, checked }`.
- **Metode Looping Array:** Menggunakan `Array.prototype.forEach()` untuk mengulang proses pembuatan elemen *list* ke layar sebanyak jumlah isi data saat itu.
- **Menghapus dan Update Posisi:** Saya menggunakan trik Array `splice(index, 1)` untuk menghapus hanya satu elemen spesifik di posisi angka/index tertentu.

### 4. Penyimpanan Lokal Browser (Local Storage)
- Membedakan perbedaan penyimpanan memori sementara dengan penyimpanan abadi.
- Mengubah format Javascript ke teks panjang dengan `JSON.stringify()` saat hendak menyimpannya ke `localStorage`.
- Mengembalikan / Extract teks tersebut kembali hidup menjadi bentuk struktur kode aslinya dengan membongkarnya memakai `JSON.parse()`.

---

> Proyek ini hanyalah versi pembuka untuk nantinya melangkah ke dalam pembelajaran React.js.
