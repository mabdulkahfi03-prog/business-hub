import { useState } from "react"

function App() {
  const [nama, setNama] = useState("")
  const [harga, setHarga] = useState("")
  const [produk, setProduk] = useState([])
  const [editIndex, setEditIndex] = useState(null)

  function simpanProduk() {
    if (nama === "" || harga === "") {
      alert("Nama produk dan harga wajib diisi")
      return
    }

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
    const dataBaru = produk.filter((_, i) => i !== index)
    setProduk(dataBaru)
  }

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>Produk Kahfi - Business Hub</h1>

      <input
        type="text"
        placeholder="Nama produk"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        style={{ padding: "10px", marginRight: "10px" }}
      />

      <input
        type="number"
        placeholder="Harga produk"
        value={harga}
        onChange={(e) => setHarga(e.target.value)}
        style={{ padding: "10px", marginRight: "10px" }}
      />

      <button onClick={simpanProduk} style={{ padding: "10px" }}>
        {editIndex !== null ? "Update Produk" : "Tambah Produk"}
      </button>

      <hr />

      <h2>Daftar Produk</h2>

      {produk.length === 0 ? (
        <p>Belum ada produk.</p>
      ) : (
        produk.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              padding: "12px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <h3>{item.nama}</h3>
            <p>Harga: Rp{item.harga}</p>

            <button onClick={() => editProduk(index)}>Edit</button>
            <button onClick={() => hapusProduk(index)} style={{ marginLeft: "10px" }}>
              Hapus
            </button>
          </div>
        ))
      )}
    </div>
  )
}

export default App