// Array untuk menyimpan data keuangan
let keuangan = [];

// Menambahkan data keuangan ke dalam array
document.getElementById('keuangan-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const jenis = document.getElementById('jenis').value;
    const deskripsi = document.getElementById('deskripsi').value;
    const jumlah = parseFloat(document.getElementById('jumlah').value);

    if (isNaN(jumlah) || jumlah <= 0) {
        alert("Jumlah harus lebih besar dari 0 dan merupakan angka yang valid.");
        return;
    }

    // Menyimpan data ke array keuangan
    keuangan.push({ jenis, deskripsi, jumlah });

    // Mengupdate daftar keuangan dan total
    updateDaftarKeuangan();
    updateTotalKeuangan();
});

// Menampilkan daftar keuangan
function updateDaftarKeuangan() {
    const daftarKeuanganElement = document.getElementById('daftar-keuangan');
    daftarKeuanganElement.innerHTML = ''; // Reset daftar keuangan

    keuangan.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.jenis}</td>
            <td>${item.deskripsi}</td>
            <td>${formatRupiah(item.jumlah)}</td>
        `;
        daftarKeuanganElement.appendChild(row);
    });
}

// Mengupdate total keuangan (pengeluaran dan pendapatan)
function updateTotalKeuangan() {
    let totalPengeluaran = 0;
    let totalPendapatan = 0;

    // Menghitung total pengeluaran dan pendapatan
    keuangan.forEach(item => {
        if (item.jenis === 'pengeluaran') {
            totalPengeluaran += item.jumlah;
        } else if (item.jenis === 'pendapatan') {
            totalPendapatan += item.jumlah;
        }
    });

    // Menghitung total keuangan (pendapatan - pengeluaran)
    const totalKeuangan = totalPendapatan - totalPengeluaran;

    // Menampilkan total pengeluaran, pendapatan, dan keuangan dalam format Rupiah
    document.getElementById('total-pengeluaran').textContent = formatRupiah(totalPengeluaran);
    document.getElementById('total-pendapatan').textContent = formatRupiah(totalPendapatan);
    document.getElementById('total-keuangan').textContent = formatRupiah(totalKeuangan);
}

// Fungsi untuk memformat angka menjadi format Rupiah
function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(angka);
}