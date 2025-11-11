import { useState } from 'react'
import { api } from '../services/api.js'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) { setError('Vui lòng nhập email và mật khẩu'); return }
    try { setLoading(true); setError('')
      await api.login({ email, password })
      alert('Đăng nhập thành công')
    } catch (e) { setError(e.message) }
    finally { setLoading(false) }
  }

  return (
    <div>
      <h2>Đăng nhập</h2>
      <form onSubmit={onSubmit} style={{ display:'grid', gap: 8, maxWidth: 360 }}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Mật khẩu" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        {error && <small style={{ color:'red' }}>{error}</small>}
        <button type="submit" disabled={loading}>{loading ? 'Đang đăng nhập...' : 'Đăng nhập'}</button>
      </form>
    </div>
  )
}


