import { useState, useEffect } from "react"

function App() {
  const [nama, setNama] = useState("")
  const [harga, setHarga] = useState("")
  const [editIndex, setEditIndex] = useState(null)

  const [produk, setProduk] = useState(() => {
    const data = localStorage.getItem("produk")
    return data ? JSON.parse(data) : []
  })

  useEffect(() => {
    localStorage.setItem("produk", JSON.stringify(produk))
  }, [produk])

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
    setProduk(produk.filter((_, i) => i !== index))
  }

  return (
    <div style={{ padding: "30px", fontFamily: "Arial", textAlign: "center" }}>
      <h1>Produk Kahfi - Business Hub</h1>

      <input
        placeholder="Nama produk"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
      />

      <input
        placeholder="Harga produk"
        value={harga}
        onChange={(e) => setHarga(e.target.value)}
      />

      <button onClick={simpanProduk}>
        {editIndex !== null ? "Update Produk" : "Tambah Produk"}
      </button>

      <hr />

      <h2>Daftar Produk</h2>

      {produk.length === 0 ? (
        <p>Belum ada produk.</p>
      ) : (
        produk.map((item, index) => (
          <div key={index}>
            <h3>{item.nama}</h3>
            <p>Harga: Rp{item.harga}</p>
            <button onClick={() => editProduk(index)}>Edit</button>
            <button onClick={() => hapusProduk(index)}>Hapus</button>
          </div>
        ))
      )}
    </div>
  )
}

export default App