import { createBrowserRouter, Navigate } from 'react-router-dom'
import Layout from '../components/Layout'
import HomePage from '../pages/HomePage'
import MuridPage from '../pages/MuridPage'
import AlumniPage from '../pages/AlumniPage'
import GalleryPage from '../pages/GalleryPage'
import TentangPage from '../pages/TentangPage'
import KontakPage from '../pages/KontakPage'
import SiswaDetailPage from '../pages/SiswaDetailPage'

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
      { path: 'alumni', element: <Navigate to="/alumni/2025" replace /> },
      { path: 'gallery', element: <GalleryPage /> },
      { path: 'tentang', element: <TentangPage /> },
      { path: 'kontak', element: <KontakPage /> },
    ],
  },
])

export default router
