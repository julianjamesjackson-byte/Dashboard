import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { SignedIn, SignedOut } from '@clerk/clerk-react'

import Dashboard from './pages/Dashboard'
import LoginPage from './pages/LoginPage'

export default function App() {
  return (
    <Routes>
      <Route 
        path="/sign-in" 
        element={
          <SignedOut>
            <LoginPage />
          </SignedOut>
        } 
      />
      <Route 
        path="/*" 
        element={
          <>
            <SignedIn>
              <Dashboard />
            </SignedIn>
            <SignedOut>
              <Navigate to="/sign-in" replace />
            </SignedOut>
          </>
        } 
      />
    </Routes>
  )
}
