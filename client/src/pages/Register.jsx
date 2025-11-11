import { useState } from 'react'
import { api } from '../services/api.js'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [telegramId, setTelegramId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [userId, setUserId] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password || !telegramId) { setError('Điền đủ email, mật khẩu, telegramId'); return }
    try { setLoading(true); setError('')
      const res = await api.signup({ email, password, telegramId })
      setUserId(res?.userId || '')
      alert('Đăng ký thành công. Kiểm tra Telegram để lấy OTP. Lưu userId để xác thực!')
    } catch (e) { setError(e.message) }
    finally { setLoading(false) }
  }

  return (
    <div>
      <h2>Đăng ký</h2>
      <form onSubmit={onSubmit} style={{ display:'grid', gap: 8, maxWidth: 360 }}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Mật khẩu" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <input placeholder="Telegram ID" value={telegramId} onChange={e=>setTelegramId(e.target.value)} />
        {error && <small style={{ color:'red' }}>{error}</small>}
        <button type="submit" disabled={loading}>{loading ? 'Đang đăng ký...' : 'Đăng ký'}</button>
      </form>
      {userId && <p>UserId: <code>{userId}</code></p>}
    </div>
  )
}







