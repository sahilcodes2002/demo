import {BrowserRouter, Routes, Route } from 'react-router-dom'
import {Signup} from "./pages/Signup"
import {Signin} from "./pages/Signin"
import { Dashboard } from './pages/Dashboard'
import { Settings } from './pages/Settings'
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil"
import { Homepage } from './pages/Home'
function App() {

  return (
    <div>
      <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path='/demo' element={<Homepage/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/signin' element={<Signin/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
          <Route path='/settings' element={<Settings/>}></Route>
        </Routes>
      </BrowserRouter>
      </RecoilRoot>
        
    </div>
  )
}

export default App
