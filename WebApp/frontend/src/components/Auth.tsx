import { Page } from '../App';
import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { api } from '../services/api';

interface AuthProps {
  onNavigate: (page: Page) => void;
}

export function Auth({ onNavigate }: AuthProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        // Login
        const response = await api.auth.login({
          email: formData.email,
          password: formData.password
        });

        // Save token and user info
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('user', JSON.stringify({
          username: response.data.username,
          email: response.data.email,
          userId: response.data.userId
        }));

        console.log('✅ Login successful!', response.data);
        onNavigate('home');

      } else {
        // Register
        if (formData.password !== formData.confirmPassword) {
          setError('Parolele nu coincid!');
          setLoading(false);
          return;
        }

        const response = await api.auth.register({
          username: formData.name,
          email: formData.email,
          password: formData.password
        });

        // Save token and user info
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('user', JSON.stringify({
          username: response.data.username,
          email: response.data.email,
          userId: response.data.userId
        }));

        console.log('✅ Registration successful!', response.data);
        onNavigate('home');
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.status === 400) {
        setError('Date invalide. Verifică formularul.');
      } else if (err.response?.status === 401) {
        setError('Email sau parolă incorectă.');
      } else {
        setError('A apărut o eroare. Încearcă din nou.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #4AA5FF 0%, #7C80F6 50%, #FC87F6 100%)'
    }}>
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-30 translate-x-1/3 -translate-y-1/3" style={{ backgroundColor: '#FBED4F' }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 -translate-x-1/3 translate-y-1/3" style={{ backgroundColor: '#5ECCAD' }} />
      <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full blur-3xl opacity-20" style={{ backgroundColor: '#FF2E1E' }} />

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-20 py-10">
        <button
          onClick={() => onNavigate('home')}
          className="text-5xl transition-colors hover:opacity-80"
          style={{ color: '#FBED4F', fontFamily: 'Retail Heavy, Montserrat, sans-serif', fontWeight: 900 }}
        >
          CeFacemDiseara?
        </button>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white px-8 py-4 rounded-full hover:opacity-90 transition-all text-lg header-button"
            style={{ backgroundColor: '#5ECCAD' }}
          >
            Menu
          </button>
        </div>
      </header>

      {/* Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm" style={{ backgroundColor: 'rgba(124, 128, 246, 0.5)' }}>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-8 right-8 text-white text-6xl hover:text-yellow-300 transition-colors"
          >
            ×
          </button>
          <nav className="flex flex-col items-center gap-8">
            <button
              onClick={() => { onNavigate('home'); setIsMenuOpen(false); }}
              className="text-6xl text-white transition-colors hover:opacity-80"
              style={{ fontFamily: 'Retail Heavy, Montserrat, sans-serif', fontWeight: 900 }}
            >
              Home
            </button>
            <button
              onClick={() => { onNavigate('events'); setIsMenuOpen(false); }}
              className="text-6xl text-white transition-colors hover:opacity-80"
              style={{ fontFamily: 'Retail Heavy, Montserrat, sans-serif', fontWeight: 900 }}
            >
              Events
            </button>
            <button
              onClick={() => { onNavigate('spots'); setIsMenuOpen(false); }}
              className="text-6xl text-white transition-colors hover:opacity-80"
              style={{ fontFamily: 'Retail Heavy, Montserrat, sans-serif', fontWeight: 900 }}
            >
              Best Spots
            </button>
            <button
              onClick={() => { onNavigate('map'); setIsMenuOpen(false); }}
              className="text-6xl text-white transition-colors hover:opacity-80"
              style={{ fontFamily: 'Retail Heavy, Montserrat, sans-serif', fontWeight: 900 }}
            >
              Map
            </button>
            <button
              onClick={() => { onNavigate('contact'); setIsMenuOpen(false); }}
              className="text-6xl text-white transition-colors hover:opacity-80"
              style={{ fontFamily: 'Retail Heavy, Montserrat, sans-serif', fontWeight: 900 }}
            >
              Contact
            </button>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Auth Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-2xl">
            {/* Toggle */}
            <div className="flex gap-2 mb-8 p-1 rounded-full" style={{ backgroundColor: '#FCFAF5' }}>
              <button
                onClick={() => {
                  setIsLogin(true);
                  setError(null);
                }}
                className="flex-1 py-3 rounded-full transition-all text-lg header-button"
                style={{
                  backgroundColor: isLogin ? '#7C80F6' : 'transparent',
                  color: isLogin ? 'white' : '#1F2937',
                  fontFamily: isLogin ? 'Retail Heavy, Montserrat, sans-serif' : 'Montserrat, sans-serif',
                  fontWeight: isLogin ? 900 : 400
                }}
              >
                Login
              </button>
              <button
                onClick={() => {
                  setIsLogin(false);
                  setError(null);
                }}
                className="flex-1 py-3 rounded-full transition-all text-lg header-button"
                style={{
                  backgroundColor: !isLogin ? '#7C80F6' : 'transparent',
                  color: !isLogin ? 'white' : '#1F2937',
                  fontFamily: !isLogin ? 'Retail Heavy, Montserrat, sans-serif' : 'Montserrat, sans-serif',
                  fontWeight: !isLogin ? 900 : 400
                }}
              >
                Register
              </button>
            </div>

            {/* Title */}
            <h2 className="text-5xl mb-3 text-center" style={{ color: '#7C80F6', fontFamily: 'Retail Heavy, Montserrat, sans-serif', fontWeight: 900 }}>
              {isLogin ? 'Bine ai venit!' : 'Hai cu noi!'}
            </h2>
            <p className="text-gray-600 text-center mb-8">
              {isLogin 
                ? 'Intră în cont pentru a-ți salva locurile preferate' 
                : 'Creează un cont și descoperă cele mai tari locuri din Timișoara'
              }
            </p>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 rounded-2xl" style={{ backgroundColor: '#FEE2E2', color: '#991B1B' }}>
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div>
                  <label className="block text-gray-700 mb-2">Nume</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-4 border-2 rounded-2xl focus:outline-none focus:border-opacity-100 transition-colors"
                    style={{ borderColor: 'rgba(124, 128, 246, 0.3)' }}
                    placeholder="Numele tău"
                    required={!isLogin}
                    disabled={loading}
                  />
                </div>
              )}

              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-4 border-2 rounded-2xl focus:outline-none focus:border-opacity-100 transition-colors"
                  style={{ borderColor: 'rgba(74, 165, 255, 0.3)' }}
                  placeholder="email@exemplu.com"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Parolă</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-4 border-2 rounded-2xl focus:outline-none focus:border-opacity-100 transition-colors"
                  style={{ borderColor: 'rgba(94, 204, 173, 0.3)' }}
                  placeholder="••••••••"
                  required
                  disabled={loading}
                />
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-gray-700 mb-2">Confirmă Parola</label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-4 border-2 rounded-2xl focus:outline-none focus:border-opacity-100 transition-colors"
                    style={{ borderColor: 'rgba(252, 135, 246, 0.3)' }}
                    placeholder="••••••••"
                    required={!isLogin}
                    disabled={loading}
                  />
                </div>
              )}

              {isLogin && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-sm transition-colors hover:opacity-80"
                    style={{ color: '#7C80F6' }}
                  >
                    Ai uitat parola?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl text-white text-lg transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed hea"
                style={{ 
                  backgroundColor: loading ? '#9CA3AF' : '#FBED4F',
                  color: '#1F2937',
                  fontFamily: 'Retail Heavy, Montserrat, sans-serif',
                  fontWeight: 900
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.backgroundColor = '#5ECCAD';
                    e.currentTarget.style.color = 'white';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.backgroundColor = '#FBED4F';
                    e.currentTarget.style.color = '#1F2937';
                  }
                }}
              >
                {loading ? 'Se încarcă...' : (isLogin ? 'Intră în cont' : 'Creează cont')}
                {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>
          </div>

          {/* Bottom Text */}
          <p className="text-center mt-6 text-white text-lg">
            {isLogin ? "Nu ai cont? " : "Ai deja cont? "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
              }}
              className="transition-colors hover:opacity-80"
              style={{ color: '#FBED4F', fontFamily: 'Retail Heavy, Montserrat, sans-serif', fontWeight: 900 }}
            >
              {isLogin ? 'Înregistrează-te' : 'Intră în cont'}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}