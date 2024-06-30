import { HashRouter, Routes, Route } from 'react-router-dom';
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { Dashboard } from './pages/Dashboard';
import { Settings } from './pages/Settings';
import { RecoilRoot } from 'recoil';
import { Homepage } from './pages/Home';
import { Messages } from './pages/Messages';
import { Conversation } from './pages/Conversation';


function App() {
  return (
    <div>
      <RecoilRoot>
        <HashRouter>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/messages' element={<Messages />} />
            <Route path='/conversations/:userId' element={<Conversation />} />
          </Routes>
        </HashRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
