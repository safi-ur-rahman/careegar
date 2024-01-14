import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import { SearchProvider } from '../context/searchContext'
import { UserContextProvider } from '../context/userContext'
import Profile from './pages/Profile'
import Search from './pages/Search'
import SupplierStore from './pages/SupplierStore'
import MechanicWorkshop from './pages/MechanicWorkshop'
import CustomizerWorkshop from './pages/CustomizerWorkshop'
import Configurator from './pages/3DConfigurator'
import Layout from './layout'
import CarOwnerProfileModal from './components/carownerProfileModal'
import SupplierProfileModal from './components/supplierProfileModal'
import MechanicProfileModal from './components/mechanicProfileModal'
import CustomizerProfileModal from './components/customizerProfileModel'

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <SearchProvider>
        <Toaster position='bottom-center' toastOptions={{duration: 3000}} />
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home />} />
            <Route path='/search' element={<Search />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/supplierStore' element={<SupplierStore />} />
            <Route path='/mechanicWorkshop' element={<MechanicWorkshop />} />
            <Route path='/customizerWorkshop' element={<CustomizerWorkshop />} />
            <Route path='/3dConfigurator' element={<Configurator />} />
            <Route path="/carownerProfileModal" element={<CarOwnerProfileModal />} />
            <Route path="/supplierProfileModal" element={<SupplierProfileModal />} />
            <Route path="/mechanicProfileModal" element={<MechanicProfileModal />} />
            <Route path="/customizerProfileModal" element={<CustomizerProfileModal />} />
          </Route>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </SearchProvider>
    </UserContextProvider>
  )
}

export default App
