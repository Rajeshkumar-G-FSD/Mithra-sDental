/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { ShieldCheck, Eye, EyeOff, Lock, User, AlertCircle, RefreshCw } from "lucide-react";

interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export function AdminLogin({ isOpen, onClose, onLoginSuccess }: AdminLoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsVerifying(true);

    // Simulated short diagnostic delay for production professional premium feel
    setTimeout(() => {
      setIsVerifying(false);
      if (username.trim() === "Admin" && password === "1234") {
        onLoginSuccess();
        onClose();
        setUsername("");
        setPassword("");
      } else {
        setError("Invalid Administration Credentials. Please review and try again.");
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-60 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 w-full max-w-md"
      >
        {/* Visual Top Accent Card Banner */}
        <div className="bg-[#1C1242] p-8 text-white relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#5D57A5]/40 rounded-full blur-2xl" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="p-3 bg-yellow-400 text-slate-900 rounded-2xl mb-3 shadow-md">
              <ShieldCheck size={28} className="stroke-[2.5]" />
            </div>
            <h3 className="text-xl font-serif font-bold tracking-tight text-white uppercase sm:text-2xl">
              Administrator Access
            </h3>
            <p className="text-xs text-slate-300 font-mono mt-1 tracking-wider uppercase">
              Mithra's Dental Hospital ERP
            </p>
          </div>
        </div>

        {/* Credentials Form Box */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 bg-red-50 text-red-700 rounded-xl border border-red-200/50 flex items-start gap-2.5 text-xs font-medium"
            >
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
              Username ID
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                <User size={15} />
              </span>
              <input
                type="text"
                required
                placeholder="Enter 'Admin'"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-[#5D57A5] focus:ring-2 focus:ring-[#5D57A5]/10 font-medium transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                Security Password
              </label>
              <span className="text-[10px] font-mono text-slate-400">Pass: 1234</span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                <Lock size={15} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter '1234'"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-[#5D57A5] focus:ring-2 focus:ring-[#5D57A5]/10 font-mono tracking-wider transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isVerifying}
              className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isVerifying}
              className="flex-1 py-2.5 bg-[#5D57A5] text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#4C4691] transition-all shadow-md active:scale-95 disabled:opacity-50 flex items-center justify-center gap-1.5"
            >
              {isVerifying ? (
                <>
                  <RefreshCw size={13} className="animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <span>Verify Access</span>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
