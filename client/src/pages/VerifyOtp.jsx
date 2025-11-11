import { useState } from 'react'
import { api } from '../services/api.js'

export default function VerifyOtp() {
  const [userId, setUserId] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!userId || !otp) { setError('Nhập userId và OTP'); return }
    try { setLoading(true); setError('')
      await api.verifyOtp({ userId, otp })
      alert('Xác thực thành công. Giờ bạn có thể đăng nhập.')
    } catch (e) { setError(e.message) }
    finally { setLoading(false) }
  }

  return (
    <div>
      <h2>Xác thực OTP</h2>
      <form onSubmit={onSubmit} style={{ display:'grid', gap: 8, maxWidth: 360 }}>
        <input placeholder="User ID" value={userId} onChange={e=>setUserId(e.target.value)} />
        <input placeholder="OTP" value={otp} onChange={e=>setOtp(e.target.value)} />
        {error && <small style={{ color:'red' }}>{error}</small>}
        <button type="submit" disabled={loading}>{loading ? 'Đang xác thực...' : 'Xác thực'}</button>
      </form>
    </div>
  )
}







