import { useState } from 'react'
import './LoginPage.css'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  function validate() {
    const e = {}
    if (!form.email.trim()) e.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Enter a valid email address.'
    if (!form.password) e.password = 'Password is required.'
    else if (form.password.length < 6)
      e.password = 'Password must be at least 6 characters.'
    return e
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((err) => ({ ...err, [name]: '' }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setStatus('loading')
    // Simulate an API call
    await new Promise((r) => setTimeout(r, 1400))
    // Demo: treat anything as success unless email is "fail@test.com"
    if (form.email === 'fail@test.com') {
      setStatus('error')
    } else {
      setStatus('success')
    }
  }

  if (status === 'success') {
    return (
      <div className="lp-center">
        <div className="lp-card lp-success-card">
          <div className="lp-success-icon" aria-hidden="true">✓</div>
          <h2>Welcome back!</h2>
          <p>You have signed in as <strong>{form.email}</strong>.</p>
          <button className="lp-btn" onClick={() => { setStatus('idle'); setForm({ email: '', password: '' }) }}>
            Sign out
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="lp-center">
      <div className="lp-card">
        {/* Logo / brand */}
        <div className="lp-brand">
          <div className="lp-logo" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#6366f1" />
              <path d="M9 23L16 9l7 14H9z" fill="white" fillOpacity="0.9" />
            </svg>
          </div>
          <span className="lp-brand-name">Acme</span>
        </div>

        <h1 className="lp-title">Sign in to your account</h1>
        <p className="lp-subtitle">Welcome back — enter your details below.</p>

        <form className="lp-form" onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className={`lp-field ${errors.email ? 'lp-field--error' : ''}`}>
            <label htmlFor="email">Email address</label>
            <div className="lp-input-wrap">
              <svg className="lp-input-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
            </div>
            {errors.email && <span className="lp-error-msg" id="email-error" role="alert">{errors.email}</span>}
          </div>

          {/* Password */}
          <div className={`lp-field ${errors.password ? 'lp-field--error' : ''}`}>
            <label htmlFor="password">Password</label>
            <div className="lp-input-wrap">
              <svg className="lp-input-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
              />
              <button
                type="button"
                className="lp-eye-btn"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <span className="lp-error-msg" id="password-error" role="alert">{errors.password}</span>}
          </div>

          <div className="lp-row">
            <label className="lp-checkbox-label">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className="lp-link">Forgot password?</a>
          </div>

          {status === 'error' && (
            <div className="lp-alert" role="alert">
              Invalid credentials. Please try again.
            </div>
          )}

          <button
            type="submit"
            className="lp-btn lp-btn--full"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <>
                <span className="lp-spinner" aria-hidden="true" />
                Signing in…
              </>
            ) : 'Sign in'}
          </button>
        </form>

        <p className="lp-footer-text">
          Don&apos;t have an account?{' '}
          <a href="#" className="lp-link">Create one</a>
        </p>
      </div>
    </div>
  )
}
