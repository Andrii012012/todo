import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import { HOME_PATH } from './routes/routes';
import Home from './pages/Home/Home';
import { createContext, useState } from 'react';

export const UserContext = createContext(null);

function App() {

  const [user, setUser] = useState<any>();

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
