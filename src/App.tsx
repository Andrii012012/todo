import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import { HOME_PATH } from './routes/routes';
import Home from './pages/Home/Home';
import { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

export const UserContext = createContext(null);

function App() {

  const [user, setUser] = useState<any>();

  useEffect(() => {

    const tokenLocal = localStorage.getItem('tokenUser');
    if (tokenLocal) {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const token = await user.getIdToken();
          if (token === tokenLocal) {
            setUser(user);
          }
        }
      });
    }
  }, []);

  return (
    <Layout>
      <UserContext.Provider value={user}>
        <Routes>
          <Route path={HOME_PATH} element={<Home setUser={setUser} />} />
        </Routes>
      </UserContext.Provider>
    </Layout>
  );
}

export default App;
