import { useState } from "react"

function App() {
  const [produk, setProduk] = useState([])
  const [nama, setNama] = useState("")
  const [harga, setHarga] = useState("")
  const [editIndex, setEditIndex] = useState(null)

  function simpanProduk() {
    if (nama === "" || harga === "") return alert("Nama dan harga wajib diisi")

    if (editIndex !== null) {
      const dataBaru = [...produk]
      dataBaru[editIndex] = { nama, harga }
      setProduk(dataBaru)
      setEditIndex(null)
    } else {
      setProduk([...produk, { nama, harga }])
    }

    setNama("")
    setHarga("")
  }

  function editProduk(index) {
    setNama(produk[index].nama)
    setHarga(produk[index].harga)
    setEditIndex(index)
  }

  function hapusProduk(index) {
    setProduk(produk.filter((_, i) => i !== index))
  }

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>CRUD Produk - Business Hub</h1>

      <input
        placeholder="Nama produk"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
      />

      <input
        placeholder="Harga"
        value={harga}
        onChange={(e) => setHarga(e.target.value)}
      />

      <button onClick={simpanProduk}>
        {editIndex !== null ? "Update" : "Tambah"}
      </button>

      <hr />

      <h2>Daftar Produk</h2>

      {produk.map((item, index) => (
        <div key={index}>
          <b>{item.nama}</b> - Rp{item.harga}
          <button onClick={() => editProduk(index)}>Edit</button>
          <button onClick={() => hapusProduk(index)}>Hapus</button>
        </div>
      ))}
    </div>
  )
}

export default App