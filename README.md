
# ZK-Proof Solidity

Repositori ini berisi implementasi dasar dari Zero-Knowledge Proof (ZK-Proof) menggunakan bahasa pemrograman Solidity. 
Tujuan dari proyek ini adalah mengeksplorasi integrasi konsep kriptografi ZK dalam pengembangan kontrak pintar di jaringan blockchain Ethereum.

## Fitur

- Implementasi sederhana dari konsep Zero-Knowledge Proof.
- Kontrak pintar menggunakan Solidity.
- Contoh verifikasi ZK secara on-chain.
- Struktur proyek yang modular dan mudah dikembangkan lebih lanjut.

## Struktur Proyek

- `contracts/` - Berisi kontrak Solidity utama, termasuk verifikator dan komponen pembukti.
- `test/` - Berisi skrip pengujian untuk kontrak menggunakan Hardhat atau framework lain.
- `scripts/` - Skrip deployment dan interaksi dengan kontrak pintar.
- `hardhat.config.js` - Konfigurasi untuk lingkungan pengembangan Hardhat.

## Prasyarat

- Node.js & npm/yarn
- Hardhat (Framework untuk pengembangan Ethereum)
- Solidity (versi 0.8.x atau sesuai konfigurasi)
- Metamask & jaringan pengujian (seperti Goerli)

## Instalasi

1. Klon repositori ini:
   ```bash
   git clone https://github.com/nesnyx/ZK-Proof-solidity.git
   cd ZK-Proof-solidity
   ```

2. Instal dependensi:
   ```bash
   npm install
   # atau
   yarn install
   ```

3. Jalankan pengujian:
   ```bash
   npx hardhat test
   ```

4. Deploy ke jaringan lokal atau testnet:
   ```bash
   npx hardhat run scripts/deploy.js --network <network-name>
   ```

## Contoh Penggunaan

Kontrak ini dapat digunakan untuk melakukan verifikasi bahwa suatu kondisi terpenuhi tanpa mengungkapkan data asli, sesuai prinsip ZK-Proof.

## Kontribusi

Kontribusi sangat terbuka! Silakan ajukan *issue* atau buat *pull request* untuk menambahkan fitur atau memperbaiki bug.

## Lisensi

Proyek ini menggunakan lisensi MIT. Lihat file [LICENSE](LICENSE) untuk informasi lebih lanjut.
