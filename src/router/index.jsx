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
import BeritaPage from '../pages/BeritaPage'
import BeritaDetailPage from '../pages/BeritaDetailPage'
import PengumumanPage from '../pages/PengumumanPage'
import AdminLogin from '../pages/admin/Login'
import AdminDashboard from '../pages/admin/Dashboard'
import AdminSiswaForm from '../pages/admin/SiswaForm'
import AdminAlumniList from '../pages/admin/AlumniList'
import AdminAlumniForm from '../pages/admin/AlumniForm'
import AdminSiswaList from '../pages/admin/SiswaList'
import AdminChat from '../pages/admin/AdminChat'
import AdminChatDetail from '../pages/admin/AdminChatDetail'
import AdminBeritaList from '../pages/admin/BeritaList'
import AdminBeritaForm from '../pages/admin/BeritaForm'
import AdminPengumumanList from '../pages/admin/PengumumanList'
import AdminPengumumanForm from '../pages/admin/PengumumanForm'
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
      { path: 'berita', element: <BeritaPage /> },
      { path: 'berita/:slug', element: <BeritaDetailPage /> },
      { path: 'pengumuman', element: <PengumumanPage /> },
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
  {
    path: '/admin/berita',
    element: <ProtectedRoute><AdminBeritaList /></ProtectedRoute>,
  },
  {
    path: '/admin/berita/tambah',
    element: <ProtectedRoute><AdminBeritaForm /></ProtectedRoute>,
  },
  {
    path: '/admin/berita/edit/:id',
    element: <ProtectedRoute><AdminBeritaForm /></ProtectedRoute>,
  },
  {
    path: '/admin/pengumuman',
    element: <ProtectedRoute><AdminPengumumanList /></ProtectedRoute>,
  },
  {
    path: '/admin/pengumuman/tambah',
    element: <ProtectedRoute><AdminPengumumanForm /></ProtectedRoute>,
  },
  {
    path: '/admin/pengumuman/edit/:id',
    element: <ProtectedRoute><AdminPengumumanForm /></ProtectedRoute>,
  },
])

export default router
