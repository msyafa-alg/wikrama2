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
    ],
  },
  { path: '/admin/login', element: <AdminLogin /> },
  {
    path: '/admin/dashboard',
    element: <ProtectedRoute><AdminDashboard /></ProtectedRoute>,
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
])

export default router
