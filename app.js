// 1. Inisialisasi Data: Mengambil data tugas dari 'localStorage' (tempat nyimpen data di browser agak gak hilang pas di-refresh).
// localStorage cuma bisa nyimpen teks string. Kita pakai JSON.parse() untuk membedahnya kembali berubah jadi Array [].
// Kalau datanya nggak ada (user baru pertama kali buka), maka kasih array kosong aja [].
let tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];

// 2. Menghubungkan objek dari HTML dengan memanggil ID-nya supaya bisa dimanipulasi sama JS
const tasksList = document.getElementById("tasksList");
const taskForm = document.getElementById("taskForm");

// 3. Menambahkan "pendengar" kejadian. Saat form 'disubmit' (tombol Simpan diklik atau user nekan Enter), jalankan fungsi di bawah ini.
taskForm.addEventListener("submit", function (event) {
    // Mematikan sifat bawaan browser nge-refresh halaman ganti URL saat nge-submit form
    event.preventDefault();
    // Memanggil/menjalankan fungsi addTask() yang kita rangkai di bawah
    addTask();
});

// Fungsi untuk proses penambahan kegiatan/tugas baru
function addTask() {
    // Tarik nilai kalimat teks dari dalam input box
    const taskTitleValue = document.getElementById("taskTitle").value;

    // Validasi singkat: Kalau user iseng ngetik spasi doang atau bener-bener kosong, jangan biarkan masuk (dicegah)
    if (taskTitleValue.trim() == "") {
        alert("Judul tugas tidak boleh kosong");
        return; // Hentikan eksekusi kode di fungsi ini, jangan lanjut jalan ke bawah
    }

    // Merakit format objek untuk satu tugas baru (punya id, judul, dan nantinya bisa ditambah "checked: false")
    const newTask = {
        id: tasks.length + 1, // Bikin ID sederhana pake rumus urutan jumlah data (opsional sih)
        title: taskTitleValue.trim() // Teks yang bener bener bersih gak ada spasi nyasar dari user
    };

    // Tolakkan/push objek tugas bary nya ke dalam gerbong Array 'tasks' kita ujung belakang
    tasks.push(newTask);

    // Sesudah terinput ghaib ke dalam array, kosongkan input box nya lagi di web biar visual nya masuk akal
    document.getElementById("taskTitle").value = "";

    // Array tugas kita barusan kan nambah 1 barang, nah kita update & save ulang 'tasks' tersebut ke dalem localStorage biar nangkring menetap
    // Array dirubah dulu jadi string teks pakai JSON.stringify(). Karena localstorage rewel, ngga mau array mentah
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Terakhir: Gambar ulang semuanya ke layar visual webnya
    renderTasks();
}


// Fungsi super vital: kerjanya nyusun balok lego HTML berdasarkan data di dalam array 'tasks' yang kita punya
function renderTasks() {
    // Kosongin aja layar HTML list awalnya. Biar pas digambar satu-satu pake JS gak ada yang tercetak tumpang tindih (Doubleing)
    tasksList.innerHTML = "";

    // Logika tambahan: Kalo kebetulan tugas di dalam array nggak ada isinya alias = 0...
    if (tasks.length == 0) {
        // Maka JS bikin balok "<li>" (bikin elemen) baru secara virtual
        const li = document.createElement("li");
        li.classList.add("tasks-list-item");

        // Terus isinya dinjejelin pesan keren HTML "Tidak ada kegiatan"
        li.innerHTML = `
        <div class="tasks"> 
            <div class="task-title">
                Tidak ada kegiatan
            </div>
        </div>`;

        // "appendChild" artinya tempelkan kotak li virtual ini ke dalam elemen 'tasksList' wadah <ul> yang ada di index.html
        tasksList.appendChild(li);
    }

    // Melakukan perulangan (looping) ke dalam array 'tasks'.
    // `task` mewakili  barangnya saat itu berputar, dan `index` mewakili posisi urutan barang tersebut (contoh barang ke-0, ke-1)
    tasks.forEach(
        (task, index) => {
            const li = document.createElement("li");
            li.classList.add("tasks-list-item");

            // Jika secara data dia punya status checked (udah kelar) itu warna true, tempelin juga gaya class "checked" tambahan (buat ngubah warna background ijo)
            if (task.checked == true) {
                li.classList.add("checked");
            }

            // Menyusung template komponen tugas pakai gaya Backtick (`). Bisa nulis variabel js di dalam ${ ... }
            li.innerHTML = `
                <div class="task">
                    <div>
                        <!-- Naro listener "onchange" biar begitu dicentang trigger fungsi checkTask, dan status 'checked' menyesuaikan data ${task.checked} -->
                        <input type="checkbox" onchange="checkTask(${index})" id="checkTask${index}" ${task.checked ? "checked" : ""}  />
                    </div>

                    <div class="task-title">
                        ${task.title}
                    </div>

                    <!-- Kalo tombol HTML ini diklik panggil trigger fungsi deleteTask dan passing nomor urutan barang (index) ke dalam fungsinya biar tau mana yg didelete -->
                    <button class="button" onclick="deleteTask(${index})" >Hapus</button>
                </div>
            `;

            li.id = `task${index}`;

            // Jika balok <li> nya beres dibikin, cantolin masukin ke <ul> list-nya html pakai ini
            tasksList.appendChild(li);
        }
    );
}

// Fungsi nge-delete yang bereaksi misal ditekan tombol Hapus HTML per-tugas nya
function deleteTask(index) {
    // Array 'tasks' dibolongin/dibuang baranya tepat pada letak deretan index pakai "splice()" sebanyak 1 barang saja.
    tasks.splice(index, 1);

    // Karena udah kurang sebiji, kita balikin/timpa simpanan terupdate ke localStorage biar abadi.
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Karena secara simpenan data array kita tugasnya udah ilang, perintahkan gambarin ulang layarnya biar item yg diklik ikutan lenyap.
    renderTasks();
}

// Fungsi kecentang / kelar / nggak sengaja terpencet hapus tanda 
function checkTask(index) {
    // Ubah data yang awalnya 'true' misal terbalik jadi 'false' pakai awalan seruan (!) nge-flip logic doang 
    tasks[index].checked = !tasks[index].checked;

    // Seperti biasa, kalo sudah ngerubah Data State array, disimpen rekap update an nya ke localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Gambar ulang buat mancing ngerubah visual background (ingat baris looping perulangan class css ada yg namae 'checked')
    renderTasks();
}

// Fungsi utama penjalan script awal yang keburu dipanggil saat web selesai nge load HTML script index pertamakali
function main() {
    renderTasks();
}

// Panggil jalankan mesin script utama
main();