# Panduan Update Aplikasi (Konsep app_config)

Dokumen ini menjelaskan alur pembaruan (update) aplikasi menggunakan tabel `app_config` di Supabase.

## Alur Pembaruan

Jadi selalu ingat urutan ini: 
**Kode ➔ Build ➔ Upload Storage ➔ Update Database**

### Langkah 1: Edit version.ts 📝
Lakukan ini pertama kali. Buka file `src/lib/version.ts` dan ubah angka versinya (misalnya menjadi `1.0.1`). Ini sangat penting karena kode inilah yang akan dibungkus ke dalam file APK/dist baru Anda nantinya.

### Langkah 2: Build Aplikasi 🏗️
Setelah versi di kode diubah, buat (build) file rilis terbarunya dengan menjalankan perintah:
```bash
npm run build
```
*(Jika Anda membangun APK Android dengan Capacitor, jalankan build Capacitor Anda sesuai prosedur).*

### Langkah 3: Upload Rilis ☁️
Upload file rilis/APK baru ke server hosting Anda atau Supabase Storage (jika Anda menggunakan Supabase Storage untuk menaruh file instalasi/APK). Pastikan tautannya dapat diunduh secara publik.

### Langkah 4: Update Database Supabase (Tahap Akhir) 🚀
Buka menu SQL Editor di Supabase, lalu jalankan perintah ini (sesuaikan dengan versi baru Anda):

```sql
UPDATE app_config 
SET value = '1.0.1', updated_at = NOW() 
WHERE key = 'app_version_latest';
```

Kenapa harus urut seperti ini? Jika Anda meng-update Supabase (Langkah 4) sebelum meng-upload APK baru (Langkah 3), maka pengguna akan mendapat popup "Update Tersedia", namun ketika mereka mengklik download, mereka malah mendownload file aplikasi versi yang lama.

---

## Variabel app_config Tambahan

Anda juga dapat memperbarui variabel konfigurasi lain di Supabase SQL Editor:

**Force Update** (Pengguna tidak bisa skip):
```sql
UPDATE app_config SET value = 'true', updated_at = NOW() WHERE key = 'force_update';
```

**Ubah Link Download**:
```sql
UPDATE app_config SET value = 'https://link-baru.com/app.apk', updated_at = NOW() WHERE key = 'download_url';
```

**Ubah Judul dan Pesan Dialog**:
```sql
UPDATE app_config SET value = 'Pembaruan Penting! ⚡', updated_at = NOW() WHERE key = 'update_title';
UPDATE app_config SET value = 'Segera update untuk pengalaman terbaik.', updated_at = NOW() WHERE key = 'update_message';
```

**Ubah Changelog** (Format JSON Array):
```sql
UPDATE app_config SET value = '["Fitur baru A","Perbaikan bug B","UI lebih baik"]', updated_at = NOW() WHERE key = 'update_changelog';
```
