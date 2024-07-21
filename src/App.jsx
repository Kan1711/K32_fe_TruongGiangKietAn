import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import Layout from './pages/Layout'
import PrivateRoutes from './routes/PrivateRoutes'
import HomePage from './pages/movie/HomePage'
import MovieDetailPage from './pages/movie/MovieDetailPage'
import Login from './pages/user/Login'
import Register from './pages/user/Register'
import DashboardAdmin from './pages/user/DashboardAdmin'
import PageNotFound from './components/PageNotFound/PageNotFound'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<PrivateRoutes element={<HomePage />} />} />
          <Route path='/movies/:id' element={<PrivateRoutes element={<MovieDetailPage />}/>} />
          <Route path='/admin' element={<PrivateRoutes element={<DashboardAdmin />} />} />

          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>

        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App