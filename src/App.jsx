import { useState, useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ChatProvider } from './context/ChatContext'
import { ToastProvider } from './components/Toast'

import router from './router'
import LoadingScreen from './components/LoadingScreen'

const App = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <AuthProvider>
        <ChatProvider>
          <ToastProvider>
            <RouterProvider router={router} />
          </ToastProvider>
        </ChatProvider>
      </AuthProvider>
    </>
  )
}

export default App
