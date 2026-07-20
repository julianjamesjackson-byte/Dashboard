import React from 'react'
import { SignIn } from '@clerk/clerk-react'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-brand-blue selection:text-white relative overflow-hidden">
      
      {/* Decorative background blurs */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 flex flex-col items-center">
        {/* Brand Logo Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-4 bg-white/60 p-4 px-8 rounded-2xl shadow-sm border border-slate-200/50 backdrop-blur-md">
            <img src="/logo.jpg" alt="Argyle Medical Staffing Logo" className="h-14 w-auto object-contain" />
            <div className="flex flex-col justify-center">
              <h1 className="text-[32px] font-serif font-bold text-[#001c40] leading-none">
                Argyle
              </h1>
              <p className="text-[11px] font-sans tracking-[0.25em] text-[#337ab7] uppercase font-semibold mt-1 text-center">
                Medical Staffing
              </p>
            </div>
          </div>
          <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-[#0f172a]">
            Access the Intelligence Engine
          </h2>
          <p className="mt-2 text-center text-sm text-slate-500">
            Sign in to view your live campaigns and leads
          </p>
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white/80 py-10 px-6 shadow-xl sm:rounded-2xl sm:px-12 border border-slate-200/60 backdrop-blur-xl">
          <div className="flex justify-center">
            <SignIn 
              routing="hash" 
              fallbackRedirectUrl="/"
              appearance={{
                elements: {
                  formButtonPrimary: 
                    "bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-sm border-0 focus:ring-[#2563eb]",
                  card: "shadow-none bg-transparent m-0 p-0",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  logoBox: "hidden",
                  footer: "hidden",
                  footerAction: "hidden",
                  internal_securesBy: "hidden",
                  socialButtonsBlockButton: "border-slate-200 text-slate-600 hover:bg-slate-50",
                  socialButtonsBlockButtonText: "font-semibold",
                  dividerLine: "bg-slate-200",
                  dividerText: "text-slate-500 font-medium",
                  formFieldLabel: "text-slate-700 font-semibold",
                  formFieldInput: "rounded-xl border-slate-300 focus:border-[#2563eb] focus:ring-[#2563eb] text-slate-800 shadow-sm transition-all",
                  identityPreviewEditButtonIcon: "text-[#2563eb]",
                  formFieldAction: "text-[#2563eb] hover:text-[#1d4ed8] font-medium"
                }
              }}
            />
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-slate-400 font-medium">
          &copy; {new Date().getFullYear()} Argyle Medical Staffing. All rights reserved.
        </div>
      </div>
    </div>
  )
}
