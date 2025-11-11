import { useEffect, useMemo, useState } from 'react'
import { api, getToken, setToken } from '../services/api.js'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [cart, setCart] = useState([])
  const total = useMemo(() => cart.reduce((s, it) => s + (it.price * it.quantity), 0), [cart])

  useEffect(() => {
    const fetchProducts = async () => {
      try { setLoading(true); setError('');
        const data = await api.getProducts()
        setProducts(data || [])
      } catch (e) { setError(e.message || 'Lỗi tải sản phẩm') }
      finally { setLoading(false) }
    }
    fetchProducts()
  }, [])

  const addToCart = (p) => {
    setCart((prev) => {
      const idx = prev.findIndex(x => x._id === p._id)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 }
        return next
      }
      return [...prev, { _id: p._id, name: p.name, price: p.price, quantity: 1 }]
    })
  }

  const createOrder = async () => {
    const userToken = getToken()
    if (!userToken) { alert('Vui lòng đăng nhập trước'); return }
    if (cart.length === 0) { alert('Giỏ hàng rỗng'); return }
    try { setError('')
      const items = cart.map(c => ({ productId: c._id, quantity: c.quantity }))
      const res = await api.createOrder(items)
      alert('Đặt hàng thành công: ' + res?.data?._id)
      setCart([])
    } catch (e) { setError(e.message) }
  }

  return (
    <div>
      <h2>Sản phẩm</h2>
      {loading && <p>Đang tải...</p>}
      {error && <p style={{ color:'red' }}>{error}</p>}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
        {products.map(p => (
          <div key={p._id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12 }}>
            <div style={{ fontWeight: 600 }}>{p.name}</div>
            <div>Brand: {p.brand}</div>
            <div>Price: {p.price}</div>
            <button onClick={() => addToCart(p)} style={{ marginTop: 8 }}>Thêm vào giỏ</button>
          </div>
        ))}
      </div>

      <section style={{ marginTop: 24 }}>
        <h3>Giỏ hàng</h3>
        {cart.length === 0 ? <p>Chưa có sản phẩm</p> : (
          <>
            <ul>
              {cart.map(item => (
                <li key={item._id}>{item.name} x {item.quantity} = {item.price * item.quantity}</li>
              ))}
            </ul>
            <div style={{ fontWeight: 700 }}>Tổng: {total}</div>
            <button onClick={createOrder}>Đặt hàng</button>
          </>
        )}
      </section>
    </div>
  )
}


