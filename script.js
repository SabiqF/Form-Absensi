const formAbsensi = document.getElementById("formAbsensi");
const panelHasil = document.getElementById("hasil");

// EVENT 1: Memproses form ketika tombol Simpan Absensi ditekan.
formAbsensi.addEventListener("submit", function (event) {
  event.preventDefault();

  // Variabel bertipe String: mengambil data dari form.
  const nama = document.getElementById("nama").value.trim();
  const nim = document.getElementById("nim").value.trim();
  const kelas = document.getElementById("kelas").value;
  const status = document.getElementById("status").value;
  const jamMasuk = document.getElementById("jamMasuk").value;

  // Validasi input menggunakan perbandingan dan NOT (!).
  const namaValid = /^[a-zA-Z\s'.-]+$/.test(nama);
  const nimValid = /^\d{5,}$/.test(nim);

  if (nama === "" || nim === "" || kelas === "" ||
      status === "" || jamMasuk === "") {
    alert("Semua kolom wajib diisi.");
    return;
  }

  if (!namaValid) {
    alert("Nama hanya boleh berisi huruf, spasi, titik, petik, atau tanda hubung.");
    return;
  }

  if (!nimValid) {
    alert("NIM harus berupa angka dengan minimal 5 digit.");
    return;
  }

  // Tipe data Number: mengubah jam dan menit menjadi angka.
  const bagianWaktu = jamMasuk.split(":");
  const jam = Number(bagianWaktu[0]);
  const menit = Number(bagianWaktu[1]);

  // Operator aritmatika (+ dan *) untuk menghitung total menit.
  const totalMenit = jam * 60 + menit;
  const batasWaktu = 8 * 60; // Batas waktu pukul 08.00.

  // Operator perbandingan menghasilkan Boolean.
  const terlambat = totalMenit > batasWaktu;
  const selisihMenit = totalMenit - batasWaktu;

  // Operator AND (&&), OR (||), dan NOT (!) digunakan di sini.
  const bolehDihitung = status === "Hadir" && terlambat;
  const tidakHadir = status === "Izin" ||
                     status === "Sakit" ||
                     status === "Alpa";

  let pesanHasil = "";

  if (bolehDihitung) {
    pesanHasil = `Anda terlambat ${selisihMenit} menit.`;
  } else if (status === "Hadir" && !terlambat) {
    pesanHasil = "Anda hadir tepat waktu.";
  } else if (tidakHadir) {
    pesanHasil = `Kehadiran tercatat sebagai ${status}.`;
  }

  // Menampilkan output pada panel hasil.
  document.getElementById("outNama").textContent = nama;
  document.getElementById("outNim").textContent = nim;
  document.getElementById("outKelas").textContent = `Kelas ${kelas}`;
  document.getElementById("outStatus").textContent = status;
  document.getElementById("outJam").textContent = jamMasuk;
  document.getElementById("outTerlambat").textContent =
    bolehDihitung ? `${selisihMenit} menit` : "0 menit";
  document.getElementById("pesan").textContent = pesanHasil;

  panelHasil.hidden = false;
});

// EVENT 2: Menyembunyikan hasil ketika form di-reset.
formAbsensi.addEventListener("reset", function () {
  panelHasil.hidden = true;
});
