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
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        fontFamily: "Arial",
        textAlign: "center",
        color: "white",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('/bg.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <h1 style={{ fontSize: "45px", marginBottom: "20px" }}>
        Warkop Pas-Pasan - Kahfi Business
      </h1>

      <div style={{ marginBottom: "25px" }}>
        <input
          placeholder="Nama produk"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          style={{
            padding: "10px",
            marginRight: "10px",
            borderRadius: "6px",
            border: "none",
          }}
        />

        <input
          placeholder="Harga produk"
          value={harga}
          onChange={(e) => setHarga(e.target.value)}
          style={{
            padding: "10px",
            marginRight: "10px",
            borderRadius: "6px",
            border: "none",
          }}
        />

        <button
          onClick={simpanProduk}
          style={{
            padding: "10px 15px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#f59e0b",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {editIndex !== null ? "Update Produk" : "Tambah Produk"}
        </button>
      </div>

      <h2>Daftar Produk</h2>

      {produk.length === 0 ? (
        <p>Belum ada produk.</p>
      ) : (
        produk.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "rgba(0,0,0,0.65)",
              color: "white",
              padding: "20px",
              margin: "20px auto",
              borderRadius: "15px",
              width: "400px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
            }}
          >
            <h3>{item.nama}</h3>
            <p>Harga: Rp{item.harga}</p>

            <button
              onClick={() => editProduk(index)}
              style={{
                marginRight: "10px",
                padding: "8px 15px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#22c55e",
                color: "white",
                cursor: "pointer",
              }}
            >
              Edit
            </button>

            <button
              onClick={() => hapusProduk(index)}
              style={{
                padding: "8px 15px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#ef4444",
                color: "white",
                cursor: "pointer",
              }}
            >
              Hapus
            </button>
          </div>
        ))
      )}
    </div>
  )
}

export default App