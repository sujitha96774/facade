import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  ArrowRight,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  KeyRound,
  UserPlus,
  LogIn,
  ChevronDown
} from 'lucide-react';

export const PERSONAS = [
  {
    id: 'jury',
    name: 'SIH Jury Evaluator',
    role: 'Autodesk Grand Finale Judge',
    avatar: 'JE',
    color: 'from-amber-500 to-yellow-600',
    borderColor: 'border-amber-500/40',
    description: 'Full access to BIM metrics, structural drawings, Forma climate studies, and IoT telemetry.',
    badge: 'Evaluation Access'
  },
  {
    id: 'architect',
    name: 'Lead BIM Architect',
    role: 'Autodesk Revit Specialist',
    avatar: 'RA',
    color: 'from-cyan-500 to-blue-600',
    borderColor: 'border-cyan-500/40',
    description: 'Direct control over 3D model exploded views, kinetic facade parametric louver angles, and rebar detailing.',
    badge: 'Design Authority'
  },
  {
    id: 'facility',
    name: 'Facility Operations Manager',
    role: 'Smart Building Administrator',
    avatar: 'FM',
    color: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-500/40',
    description: 'Monitor Basement EV fast charging loads, IoT energy telemetry, greywater recycling, and system alerts.',
    badge: 'Ops Control'
  },
  {
    id: 'resident',
    name: 'Resident & Commercial Visitor',
    role: 'Apartment Owner / Shop Tenant',
    avatar: 'RV',
    color: 'from-purple-500 to-pink-600',
    borderColor: 'border-purple-500/40',
    description: 'Explore room finder, commercial retail shop availability, courtyard biophilic gardens, and EV slot booking.',
    badge: 'Public Portal'
  }
];

export default function LoginView({ onLoginSuccess, onNavigate }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regRole, setRegRole] = useState('jury');

  // Error state
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    // Find matching persona by role id or default to first
    const persona = PERSONAS[0];
    const avatarInitials = loginEmail.substring(0, 2).toUpperCase();
    onLoginSuccess({
      ...persona,
      name: loginEmail.split('@')[0] || 'User',
      avatar: avatarInitials
    });
    onNavigate('home');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    if (!regName.trim() || !regEmail.trim() || !regPassword.trim() || !regConfirmPassword.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (regPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    // Find persona based on selected role
    const persona = PERSONAS.find(p => p.id === regRole) || PERSONAS[0];
    const avatarInitials = regName.substring(0, 2).toUpperCase();
    onLoginSuccess({
      ...persona,
      name: regName,
      avatar: avatarInitials
    });
    onNavigate('home');
  };

  const inputClass = "w-full bg-slate-50 border border-slate-300 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition";

  return (
    <div className="min-h-[calc(100dvh-4rem)] flex items-center justify-center relative overflow-hidden bg-slate-50 bg-grid-pattern p-3 sm:p-4 py-6 sm:py-10">
      {/* Background glow effects */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md z-10">
        
        {/* Logo & Branding Header */}
        <div className="text-center mb-8 space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25 mx-auto">
            <Building2 className="w-9 h-9 text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              URBAN FACADE <span className="text-cyan-400">360</span>
            </h1>
            <p className="text-slate-500 text-xs mt-1">
              Mixed-Use Building BIM & Operations Dashboard (B+G+9)
            </p>
          </div>
        </div>

        {/* Auth Card */}
        <div className="glass-panel rounded-2xl border border-slate-200 overflow-hidden shadow-xl shadow-slate-200/50">
          
          {/* Tab Switcher */}
          <div className="flex border-b border-slate-200">
            <button
              onClick={() => { setActiveTab('login'); setError(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold transition ${
                activeTab === 'login'
                  ? 'text-cyan-400 border-b-2 border-cyan-400 bg-slate-50'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </button>
            <button
              onClick={() => { setActiveTab('register'); setError(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold transition ${
                activeTab === 'register'
                  ? 'text-cyan-400 border-b-2 border-cyan-400 bg-slate-50'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Register</span>
            </button>
          </div>

          {/* Form Body */}
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
            
            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* ─── LOGIN FORM ─── */}
            {activeTab === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                
                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 pl-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className={inputClass}
                      autoFocus
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 pl-1">Password</label>
                  <div className="relative">
                    <KeyRound className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className={`${inputClass} pr-11`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 transition"
                    >
                      {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                    </button>
                  </div>
                </div>

                {/* Forgot password link */}
                <div className="flex justify-end">
                  <button type="button" className="text-xs text-cyan-400 hover:text-cyan-500 font-medium transition">
                    Forgot Password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm transition shadow-lg shadow-cyan-200/50 flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In to Dashboard</span>
                </button>

              </form>
            )}

            {/* ─── REGISTER FORM ─── */}
            {activeTab === 'register' && (
              <form onSubmit={handleRegister} className="space-y-4">
                
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 pl-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className={inputClass}
                      autoFocus
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 pl-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Role Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 pl-1">Select Role</label>
                  <div className="relative">
                    <Lock className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-3.5" />
                    <select
                      value={regRole}
                      onChange={(e) => setRegRole(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-11 pr-10 py-3 text-sm text-slate-800 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition appearance-none cursor-pointer"
                    >
                      <option value="jury" className="bg-white text-slate-800">SIH Jury Evaluator</option>
                      <option value="architect" className="bg-white text-slate-800">Lead BIM Architect</option>
                      <option value="facility" className="bg-white text-slate-800">Facility Operations Manager</option>
                      <option value="resident" className="bg-white text-slate-800">Resident / Visitor</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-4 pointer-events-none" />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 pl-1">Password</label>
                  <div className="relative">
                    <KeyRound className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Min. 6 characters"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className={`${inputClass} pr-11`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 transition"
                    >
                      {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 pl-1">Confirm Password</label>
                  <div className="relative">
                    <KeyRound className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Re-enter your password"
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      className={`${inputClass} pr-11`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 transition"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm transition shadow-lg shadow-cyan-200/50 flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Create Account & Enter</span>
                </button>

              </form>
            )}

            {/* Separator */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                {activeTab === 'login' ? 'New user?' : 'Already registered?'}
              </span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Toggle Link */}
            <button
              onClick={() => { setActiveTab(activeTab === 'login' ? 'register' : 'login'); setError(''); }}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-900 font-semibold text-xs transition text-center"
            >
              {activeTab === 'login' ? 'Create a new account' : 'Sign in to existing account'}
            </button>

          </div>
        </div>

        {/* Footer Compliance Badge */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Autodesk Revit BIM Standard • All dimensions in mm</span>
          </div>
        </div>

      </div>
    </div>
  );
}
