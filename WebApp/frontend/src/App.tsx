import { Container, Typography, Box } from '@mui/material'
import UserList from './components/UserList.tsx'

function App() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Sistem de Gestionare Utilizatori
        </Typography>
        <UserList />
      </Box>
    </Container>
  )
}

export default App