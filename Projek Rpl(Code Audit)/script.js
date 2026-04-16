// Konstanta untuk nilai awal
const INITIAL_TOTAL = 0;

// Array untuk menyimpan data transaksi keuangan
let daftarKeuangan = [];

// Fungsi untuk menambah data transaksi keuangan
function tambahTransaksiKeuangan(jenis, deskripsi, jumlah) {
    daftarKeuangan.push({ jenis, deskripsi, jumlah });
}

// Fungsi untuk memperbarui daftar transaksi keuangan
function updateDaftarKeuangan() {
    const daftarKeuanganElement = document.getElementById('daftar-keuangan');
    daftarKeuanganElement.innerHTML = ''; // Reset daftar transaksi

    daftarKeuangan.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.jenis}</td>
            <td>${item.deskripsi}</td>
            <td>${formatRupiah(item.jumlah)}</td>
        `;
        daftarKeuanganElement.appendChild(row);
    });
}

// Fungsi untuk menghitung total berdasarkan jenis (pengeluaran/pendapatan)
function hitungTotal(jenis) {
    return daftarKeuangan.filter(item => item.jenis === jenis)
                          .reduce((total, item) => total + item.jumlah, INITIAL_TOTAL);
}

// Fungsi untuk memperbarui elemen total
function updateTotalDisplay(elementId, value) {
    document.getElementById(elementId).textContent = formatRupiah(value);
}

// Fungsi untuk mengupdate total keuangan (menghitung total pengeluaran, pendapatan, dan total keuangan)
function updateTotalKeuangan() {
    let totalPengeluaran = hitungTotal('pengeluaran');
    let totalPendapatan = hitungTotal('pendapatan');
    let totalKeuangan = totalPendapatan - totalPengeluaran;

    updateTotalDisplay('total-pengeluaran', totalPengeluaran);
    updateTotalDisplay('total-pendapatan', totalPendapatan);
    updateTotalDisplay('total-keuangan', totalKeuangan);
}

// Fungsi untuk memformat angka menjadi format Rupiah
function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(angka);
}

// Menambahkan data keuangan saat form disubmit
document.getElementById('keuangan-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const jenis = document.getElementById('jenis').value;
    const deskripsi = document.getElementById('deskripsi').value;
    const jumlah = parseFloat(document.getElementById('jumlah').value);

    if (isNaN(jumlah) || jumlah <= 0) {
        alert("Jumlah harus lebih besar dari 0 dan merupakan angka yang valid.");
        return;
    }

    // Menambahkan data keuangan dan mengupdate tampilan
    tambahTransaksiKeuangan(jenis, deskripsi, jumlah);
    updateDaftarKeuangan();
    updateTotalKeuangan();
});