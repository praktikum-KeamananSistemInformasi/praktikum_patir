// app.js

// Data untuk setiap aset
const dataAset = {
    server: {
      deskripsi: "Menjalankan layanan web perusahaan logistik.",
      stride: ["Tampering: Modifikasi konfigurasi server", "DoS: Membanjiri server dengan permintaan"],
      dread: { damage: 4, reproducibility: 3, exploitability: 2, affectedUsers: 5, discoverability: 4 },
      mitigasi: ["Rate-limiting", "WAF", "Monitoring performa server"]
    },
    database: {
      deskripsi: "Menyimpan data penting (pelanggan, pengiriman, transaksi).",
      stride: ["Information Disclosure: Kebocoran data pengguna", "Elevation of Privilege: Pengguna tanpa izin mengakses data administratif"],
      dread: { damage: 5, reproducibility: 2, exploitability: 3, affectedUsers: 5, discoverability: 3 },
      mitigasi: ["Enkripsi data", "IDS (Intrusion Detection System)"]
    },
    dataPengguna: {
      deskripsi: "Informasi pribadi pelanggan (alamat, rincian pembayaran, dll).",
      stride: ["Information Disclosure: Pencurian data pengguna"],
      dread: { damage: 5, reproducibility: 2, exploitability: 4, affectedUsers: 5, discoverability: 3 },
      mitigasi: ["Enkripsi proteksi", "Autentikasi multi-faktor"]
    },
    apiEksternal: {
      deskripsi: "Terhubung dengan layanan pihak ketiga (gateway pembayaran).",
      stride: ["Spoofing: Penyerang meniru API", "DoS: Membanjiri API dengan permintaan palsu"],
      dread: { damage: 3, reproducibility: 3, exploitability: 3, affectedUsers: 4, discoverability: 4 },
      mitigasi: ["Validasi sertifikat API", "Autentikasi API", "Monitoring"]
    },
    jaringan: {
      deskripsi: "Infrastruktur jaringan untuk komunikasi antara server dan klien.",
      stride: ["DoS: Serangan yang menyebabkan infrastruktur lumpuh"],
      dread: { damage: 4, reproducibility: 3, exploitability: 3, affectedUsers: 4, discoverability: 4 },
      mitigasi: ["Firewall", "Load balancing"]
    }
  };
  
  // Fungsi untuk Menampilkan Data Aset Terpilih
  function tampilkanInfoAset(aset) {
    const infoDiv = document.getElementById("info");
    if (!aset) {
      infoDiv.innerHTML = "<p>Pilih aset untuk melihat detailnya.</p>";
      return;
    }
  
    const data = dataAset[aset];
    infoDiv.innerHTML = `
      <h3>Deskripsi Aset</h3>
      <p>${data.deskripsi}</p>
      <h3>Ancaman STRIDE</h3>
      <ul>${data.stride.map(ancaman => `<li>${ancaman}</li>`).join('')}</ul>
      <h3>Mitigasi Risiko</h3>
      <ul>${data.mitigasi.map(mitigasi => `<li>${mitigasi}</li>`).join('')}</ul>
    `;
  
    updateGraph(data.dread);
  }
  
  // Grafik DREAD
  const ctx = document.getElementById("riskGraph").getContext("2d");
  const riskChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Damage", "Reproducibility", "Exploitability", "Affected Users", "Discoverability"],
      datasets: [{
        label: "DREAD Score",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        data: [] // Kosongkan dulu, diisi saat aset dipilih
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true, max: 5 }
      }
    }
  });
  
  // Fungsi untuk Memperbarui Grafik sesuai Data DREAD yang Dipilih
  function updateGraph(dreadData) {
    riskChart.data.datasets[0].data = Object.values(dreadData);
    riskChart.update();
  }
  
  // Event Listener untuk Dropdown Aset
  document.getElementById("dropdownAset").addEventListener("change", function() {
    tampilkanInfoAset(this.value);
  });
  
  // app.js

// Menampilkan konten utama ketika tombol Mulai ditekan
document.getElementById("startButton").addEventListener("click", function() {
    document.getElementById("mainContent").style.display = "block";
    document.querySelector("header").style.display = "none";
  });
  
  // Logika dropdown dan grafik tetap sama
  // ...
  