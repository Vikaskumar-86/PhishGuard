import React, { useState } from 'react';
import { Eye, EyeOff, Calendar, AlertCircle, CheckCircle2, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ButtonSpinner } from '../components/common/CyberShieldLoader';
import { TermsModal } from '../components/common/TermsModal';

interface RegisterPageProps {
  onNavigate: (path: string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
  const { register, isLoading } = useAuth();

  // Form states preserving user input
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    dob: '',
    gender: '',
    termsAccepted: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  // Field-specific validation errors
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    email?: string;
    password?: string;
    dob?: string;
    gender?: string;
    terms?: string;
    general?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};

    // 1. Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    // 2. Phone validation
    const phoneRegex = /^[\d+()\s-]{7,20}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your contact phone number.';
    } else if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number (digits, spaces, or dashes).';
    }

    // 3. Email validation
    const emailRegex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email format (e.g., alex@organization.com).';
    }

    // 4. Password validation
    if (!formData.password) {
      newErrors.password = 'Please create a secure password.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }

    // 5. Date of Birth validation
    if (!formData.dob) {
      newErrors.dob = 'Please provide your date of birth.';
    } else {
      const parsedDate = new Date(formData.dob);
      const today = new Date();
      if (isNaN(parsedDate.getTime())) {
        newErrors.dob = 'Please enter a valid calendar date.';
      } else if (parsedDate > today) {
        newErrors.dob = 'Date of birth cannot be in the future.';
      }
    }

    // 6. Gender dropdown validation
    if (!formData.gender) {
      newErrors.gender = 'Please select your gender.';
    }

    // 7. Critical: Mandatory Terms and Conditions checkbox
    if (!formData.termsAccepted) {
      newErrors.terms = 'Please accept the Terms and Conditions to continue.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    const res = await register(formData);
    if (res.success) {
      onNavigate('/dashboard');
    } else {
      setErrors((prev) => ({
        ...prev,
        general: res.error || 'Registration failed. Please check inputs.',
      }));
    }
  };

  const handleTermsAcceptFromModal = () => {
    setFormData((prev) => ({ ...prev, termsAccepted: true }));
    if (errors.terms) {
      setErrors((prev) => ({ ...prev, terms: undefined }));
    }
  };

  // Password strength check
  const getPasswordStrength = () => {
    const pwd = formData.password;
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    return score;
  };

  const pwdScore = getPasswordStrength();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-8 sm:py-12 bg-[var(--bg-page)]">
      {/* Centered mobile-optimized card reflecting the user's uploaded screenshot format */}
      <div className="w-full max-w-md bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-xl p-6 sm:p-8 transition-all">
        {/* Centered Heading */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">
            Registration Form
          </h1>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Create your educational security training profile
          </p>
        </div>

        {errors.general && (
          <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-600 dark:text-rose-400">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errors.general}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Field 1: Name */}
          <div>
            <label htmlFor="reg-name" className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
              Name
            </label>
            <input
              id="reg-name"
              type="text"
              placeholder="Enter Name"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] transition-colors focus:outline-none ${
                errors.name
                  ? 'border-rose-500 focus:border-rose-600'
                  : 'border-[var(--border-color)] focus:border-[var(--accent-color)]'
              }`}
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Field 2: Phone */}
          <div>
            <label htmlFor="reg-phone" className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
              Phone
            </label>
            <input
              id="reg-phone"
              type="tel"
              placeholder="Enter Phone"
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value });
                if (errors.phone) setErrors({ ...errors, phone: undefined });
              }}
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] transition-colors focus:outline-none ${
                errors.phone
                  ? 'border-rose-500 focus:border-rose-600'
                  : 'border-[var(--border-color)] focus:border-[var(--accent-color)]'
              }`}
              disabled={isLoading}
            />
            {errors.phone && (
              <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.phone}
              </p>
            )}
          </div>

          {/* Field 3: Email */}
          <div>
            <label htmlFor="reg-email" className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
              Email
            </label>
            <input
              id="reg-email"
              type="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] transition-colors focus:outline-none ${
                errors.email
                  ? 'border-rose-500 focus:border-rose-600'
                  : 'border-[var(--border-color)] focus:border-[var(--accent-color)]'
              }`}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Field 4: Password with Show/Hide toggle */}
          <div>
            <label htmlFor="reg-password" className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                id="reg-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  if (errors.password) setErrors({ ...errors, password: undefined });
                }}
                className={`w-full pl-3.5 pr-10 py-2.5 text-sm rounded-lg border bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] transition-colors focus:outline-none ${
                  errors.password
                    ? 'border-rose-500 focus:border-rose-600'
                    : 'border-[var(--border-color)] focus:border-[var(--accent-color)]'
                }`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {formData.password && (
              <div className="mt-1.5 flex items-center gap-1">
                <div className="h-1 flex-1 bg-[var(--border-subtle)] rounded-full overflow-hidden flex gap-1">
                  <div className={`h-full flex-1 ${pwdScore >= 1 ? 'bg-rose-500' : 'bg-transparent'}`} />
                  <div className={`h-full flex-1 ${pwdScore >= 2 ? 'bg-amber-500' : 'bg-transparent'}`} />
                  <div className={`h-full flex-1 ${pwdScore >= 3 ? 'bg-emerald-500' : 'bg-transparent'}`} />
                  <div className={`h-full flex-1 ${pwdScore >= 4 ? 'bg-emerald-600' : 'bg-transparent'}`} />
                </div>
                <span className="text-[10px] text-[var(--text-muted)] font-mono ml-1">
                  {pwdScore <= 1 ? 'Weak' : pwdScore <= 2 ? 'Fair' : pwdScore <= 3 ? 'Good' : 'Strong'}
                </span>
              </div>
            )}
            {errors.password && (
              <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.password}
              </p>
            )}
          </div>

          {/* Field 5: Date of Birth */}
          <div>
            <label htmlFor="reg-dob" className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
              Date of Birth
            </label>
            <div className="relative">
              <input
                id="reg-dob"
                type="date"
                max={new Date().toISOString().split('T')[0]}
                value={formData.dob}
                onChange={(e) => {
                  setFormData({ ...formData, dob: e.target.value });
                  if (errors.dob) setErrors({ ...errors, dob: undefined });
                }}
                className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] transition-colors focus:outline-none ${
                  errors.dob
                    ? 'border-rose-500 focus:border-rose-600'
                    : 'border-[var(--border-color)] focus:border-[var(--accent-color)]'
                }`}
                disabled={isLoading}
              />
            </div>
            {errors.dob && (
              <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.dob}
              </p>
            )}
          </div>

          {/* Field 6: Gender dropdown */}
          <div>
            <label htmlFor="reg-gender" className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
              Gender
            </label>
            <div className="relative">
              <select
                id="reg-gender"
                value={formData.gender}
                onChange={(e) => {
                  setFormData({ ...formData, gender: e.target.value });
                  if (errors.gender) setErrors({ ...errors, gender: undefined });
                }}
                className={`w-full appearance-none px-3.5 py-2.5 text-sm rounded-lg border bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] transition-colors focus:outline-none pr-9 ${
                  errors.gender
                    ? 'border-rose-500 focus:border-rose-600'
                    : 'border-[var(--border-color)] focus:border-[var(--accent-color)]'
                }`}
                disabled={isLoading}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-Binary">Non-Binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3 top-3 text-[var(--text-muted)] pointer-events-none" />
            </div>
            {errors.gender && (
              <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.gender}
              </p>
            )}
          </div>

          {/* Field 7: Mandatory Terms and Conditions checkbox */}
          {/* NOTICE: Explicitly NO comments field is rendered here as per prompt directive! */}
          <div className="pt-1">
            <div
              className={`p-3 rounded-xl border transition-colors ${
                errors.terms
                  ? 'border-rose-500 bg-rose-500/5'
                  : 'border-[var(--border-subtle)] bg-[var(--bg-surface-subtle)]'
              }`}
            >
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  id="reg-terms"
                  checked={formData.termsAccepted}
                  onChange={(e) => {
                    setFormData({ ...formData, termsAccepted: e.target.checked });
                    if (errors.terms) setErrors({ ...errors, terms: undefined });
                  }}
                  className="mt-0.5 w-4 h-4 rounded text-blue-600 border-[var(--border-color)] focus:ring-2 focus:ring-[var(--accent-color)] cursor-pointer"
                  disabled={isLoading}
                />
                <span className="text-xs text-[var(--text-primary)] leading-snug">
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={() => setTermsModalOpen(true)}
                    className="font-medium underline hover:text-[var(--accent-color)]"
                    style={{ color: 'var(--accent-color)' }}
                  >
                    terms and conditions
                  </button>
                  <span className="text-rose-500 ml-0.5">*</span>
                </span>
              </label>

              {errors.terms && (
                <div className="mt-2 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1.5 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.terms}</span>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-98 disabled:opacity-50"
              style={{ backgroundColor: 'var(--accent-color)' }}
            >
              {isLoading && <ButtonSpinner size="sm" />}
              {isLoading ? 'Creating Training Account...' : 'Complete Registration'}
            </button>
          </div>
        </form>

        {/* Navigation link to Login */}
        <div className="mt-6 text-center text-xs text-[var(--text-secondary)]">
          Already have an account?{' '}
          <button
            onClick={() => onNavigate('/login')}
            className="font-semibold underline hover:text-[var(--accent-color)]"
            style={{ color: 'var(--accent-color)' }}
          >
            Sign In
          </button>
        </div>
      </div>

      {/* Terms Modal - preserving inputs on close */}
      <TermsModal
        isOpen={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
        onAccept={handleTermsAcceptFromModal}
      />
    </div>
  );
};
