import '@mantine/core/styles.css';

import { AppShell, MantineProvider } from '@mantine/core';
import './App.css';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Authentication from './components/Authentication';
import ProtectedRoute from './components/ProtectedRoute';
import ContactsTable from './components/Contacts';

function App() {

  return (
    <MantineProvider>
      <AppShell
        padding="md"
        header={{ height: 80 }}
      >
        <AppShell.Header>
          <Header />
        </AppShell.Header>
        <AppShell.Main>
          <Routes>
            <Route path="/" element={<Authentication />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <ContactsTable />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  )
}

export default App
