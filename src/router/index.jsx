import { createBrowserRouter, Navigate } from 'react-router-dom'
import Layout from '../components/Layout'
import ProtectedRoute from '../components/ProtectedRoute'
import HomePage from '../pages/HomePage'
import MuridPage from '../pages/MuridPage'
import AlumniPage from '../pages/AlumniPage'
import AlumniDetailPage from '../pages/AlumniDetailPage'
import GalleryPage from '../pages/GalleryPage'
import TentangPage from '../pages/TentangPage'
import KontakPage from '../pages/KontakPage'
import SiswaDetailPage from '../pages/SiswaDetailPage'
import AdminLogin from '../pages/admin/Login'
import AdminDashboard from '../pages/admin/Dashboard'
import AdminSiswaForm from '../pages/admin/SiswaForm'
import AdminAlumniList from '../pages/admin/AlumniList'
import AdminAlumniForm from '../pages/admin/AlumniForm'
import AdminSiswaList from '../pages/admin/SiswaList'
import AdminChat from '../pages/admin/AdminChat'
import AdminChatDetail from '../pages/admin/AdminChatDetail'
import ChatPage from '../pages/ChatPage'
import ChatLogin from '../pages/ChatLogin'
import ChatRegister from '../pages/ChatRegister'
import NotFoundPage from '../pages/NotFoundPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'murid', element: <Navigate to="/murid/kelas10" replace /> },
      { path: 'murid/:kelas/:id', element: <SiswaDetailPage /> },
      { path: 'murid/:kelas', element: <MuridPage /> },
      { path: 'alumni/:tahun', element: <AlumniPage /> },
      { path: 'alumni/:tahun/:id', element: <AlumniDetailPage /> },
      { path: 'alumni', element: <Navigate to="/alumni/2026" replace /> },
      { path: 'gallery', element: <GalleryPage /> },
      { path: 'tentang', element: <TentangPage /> },
      { path: 'kontak', element: <KontakPage /> },
      { path: 'chat', element: <ChatPage /> },
      { path: 'chat/login', element: <ChatLogin /> },
      { path: 'chat/register', element: <ChatRegister /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  { path: '/admin/login', element: <AdminLogin /> },
  {
    path: '/admin/dashboard',
    element: <ProtectedRoute><AdminDashboard /></ProtectedRoute>,
  },
  {
    path: '/admin/siswa',
    element: <ProtectedRoute><AdminSiswaList /></ProtectedRoute>,
  },
  {
    path: '/admin/siswa/tambah',
    element: <ProtectedRoute><AdminSiswaForm /></ProtectedRoute>,
  },
  {
    path: '/admin/siswa/edit/:id',
    element: <ProtectedRoute><AdminSiswaForm /></ProtectedRoute>,
  },
  {
    path: '/admin/alumni',
    element: <ProtectedRoute><AdminAlumniList /></ProtectedRoute>,
  },
  {
    path: '/admin/alumni/tambah',
    element: <ProtectedRoute><AdminAlumniForm /></ProtectedRoute>,
  },
  {
    path: '/admin/alumni/edit/:id',
    element: <ProtectedRoute><AdminAlumniForm /></ProtectedRoute>,
  },
  {
    path: '/admin/chat',
    element: <ProtectedRoute><AdminChat /></ProtectedRoute>,
  },
  {
    path: '/admin/chat/:id',
    element: <ProtectedRoute><AdminChatDetail /></ProtectedRoute>,
  },
])

export default router
