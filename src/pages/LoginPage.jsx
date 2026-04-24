import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertCircle, Loader2, Lock, Mail, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { BRAND_LOGO_PATH, BRAND_NAME, BRAND_TAGLINE } from '@/config/brand';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup, resetPassword } = useAuth();

  const [isSignup, setIsSignup] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  });

  const from = location.state?.from?.pathname || '/dashboard/pdv';

  const inputClass =
    'w-full bg-[var(--layout-bg)] border border-[var(--layout-border)] rounded-none ag-cut-sm pl-10 pr-4 py-3 text-[var(--layout-text)] placeholder-[var(--layout-text-muted)] focus:border-[var(--layout-accent)] focus:outline-none';

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.email) {
      nextErrors.email = 'Email obrigatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nextErrors.email = 'Email invalido';
    }

    if (!isRecovery) {
      if (!formData.password) {
        nextErrors.password = 'Senha obrigatoria';
      } else if (formData.password.length < 6) {
        nextErrors.password = 'Senha deve ter pelo menos 6 caracteres';
      }

      if (isSignup) {
        if (!formData.name) {
          nextErrors.name = 'Nome obrigatorio';
        }
        if (formData.password !== formData.confirmPassword) {
          nextErrors.confirmPassword = 'As senhas nao conferem';
        }
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setAuthError(null);

    if (!validateForm()) return;

    setLoading(true);
    try {
      if (isRecovery) {
        const { error } = await resetPassword(formData.email);
        if (error) {
          setAuthError(error.message);
        } else {
          setIsRecovery(false);
          setFormData({ email: '', password: '', name: '', confirmPassword: '' });
        }
      } else if (isSignup) {
        const { error } = await signup(formData.email, formData.password, formData.name);
        if (error) setAuthError(error.message);
      } else {
        const { error } = await login(formData.email, formData.password);
        if (error) {
          setAuthError(error.message);
        } else {
          navigate(from, { replace: true });
        }
      }
    } catch {
      setAuthError('Ocorreu um erro inesperado.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (authError) setAuthError(null);
  };

  const switchMode = ({ signup = false, recovery = false }) => {
    setIsSignup(signup);
    setIsRecovery(recovery);
    setErrors({});
    setAuthError(null);
  };

  return (
    <div
      className="login-bg ag-speedlines relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--layout-bg)] p-4 sm:p-6"
      style={{
        backgroundImage:
          "linear-gradient(130deg, color-mix(in srgb, var(--layout-bg) 82%, transparent), color-mix(in srgb, var(--layout-surface) 85%, transparent)), url('/tutu.png')",
      }}
    >
      <Helmet>
        <title>{isSignup ? 'Cadastro' : isRecovery ? 'Recuperar Senha' : 'Login'} - {BRAND_NAME}</title>
        <meta name="description" content="Sistema de gestao comercial e ponto de venda" />
      </Helmet>

      <div className="ag-enter relative z-[2] w-full max-w-md ag-cut ag-panel p-1">
        <div className="ag-cut bg-[var(--layout-surface)]/94 p-6 sm:p-8">
          <div className="mb-8 text-center">
            <div className="ag-cut-sm mx-auto mb-4 inline-flex h-20 w-20 items-center justify-center border border-[var(--layout-border)] bg-[var(--layout-elevated)] shadow-[0_20px_30px_-22px_var(--layout-accent)]">
              <img src={BRAND_LOGO_PATH} alt={BRAND_NAME} className="h-16 w-16 object-cover" />
            </div>
            <h1 className="ag-heading text-5xl leading-none text-[var(--layout-text)]">{BRAND_NAME}</h1>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--layout-text-muted)]">
              {BRAND_TAGLINE}
            </p>
          </div>

          <div className="ag-cut ag-panel p-5 sm:p-6">
            <h2 className="ag-heading mb-5 text-3xl leading-none text-[var(--layout-text)]">
              {isRecovery ? 'Recuperar Senha' : isSignup ? 'Criar Conta' : 'Entrar'}
            </h2>

            {authError ? (
              <div className="ag-cut-sm mb-5 flex items-start gap-3 border border-red-500/45 bg-red-500/10 p-4">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                <p className="text-sm leading-relaxed text-red-300">{authError}</p>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignup && !isRecovery ? (
                <div>
                  <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.08em] text-[var(--layout-text-muted)]">
                    Nome Completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--layout-text-muted)]" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Seu nome"
                    />
                  </div>
                  {errors.name ? <p className="mt-1 text-sm text-red-400">{errors.name}</p> : null}
                </div>
              ) : null}

              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.08em] text-[var(--layout-text-muted)]">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--layout-text-muted)]" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="seu@email.com"
                  />
                </div>
                {errors.email ? <p className="mt-1 text-sm text-red-400">{errors.email}</p> : null}
              </div>

              {!isRecovery ? (
                <>
                  <div>
                    <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.08em] text-[var(--layout-text-muted)]">
                      Senha
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--layout-text-muted)]" />
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="••••••••"
                      />
                    </div>
                    {errors.password ? <p className="mt-1 text-sm text-red-400">{errors.password}</p> : null}
                  </div>

                  {isSignup ? (
                    <div>
                      <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.08em] text-[var(--layout-text-muted)]">
                        Confirmar Senha
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--layout-text-muted)]" />
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="••••••••"
                        />
                      </div>
                      {errors.confirmPassword ? (
                        <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
                      ) : null}
                    </div>
                  ) : null}
                </>
              ) : null}

              <Button type="submit" disabled={loading} className="mt-2 flex w-full items-center justify-center py-3">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : isRecovery ? (
                  'Enviar Email'
                ) : isSignup ? (
                  'Cadastrar'
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>

            <div className="mt-6 space-y-3">
              {!isRecovery && !isSignup ? (
                <button
                  type="button"
                  onClick={() => switchMode({ signup: false, recovery: true })}
                  className="mx-auto block text-sm font-semibold uppercase tracking-[0.11em] text-[var(--layout-accent)] hover:text-[var(--layout-accent-strong)]"
                >
                  Esqueceu sua senha?
                </button>
              ) : null}

              <div className="border-t border-[var(--layout-border)] pt-4">
                <button
                  type="button"
                  onClick={() => switchMode({ signup: !isSignup, recovery: false })}
                  className="mx-auto block text-sm font-semibold uppercase tracking-[0.08em] text-[var(--layout-text-muted)] hover:text-[var(--layout-text)]"
                >
                  {isSignup ? 'Ja tem conta? Entrar' : 'Nao tem conta? Cadastre-se'}
                </button>
              </div>

              {isRecovery ? (
                <button
                  type="button"
                  onClick={() => switchMode({ signup: false, recovery: false })}
                  className="mx-auto block text-sm font-semibold uppercase tracking-[0.08em] text-[var(--layout-text-muted)] hover:text-[var(--layout-text)]"
                >
                  Voltar para o login
                </button>
              ) : null}
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-[var(--layout-text-muted)]">
            {'(c)'} 2026 {BRAND_NAME}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
