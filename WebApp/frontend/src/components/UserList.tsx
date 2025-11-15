import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

interface User {
  id: number
  name: string
  email: string
  createdAt: string
}

function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const API_URL = '/api/users'

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get<User[]>(API_URL)
      setUsers(response.data)
    } catch (error) {
      setError('Eroare la încărcarea utilizatorilor')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const createUser = async () => {
    if (!name || !email) {
      setError('Completează toate câmpurile')
      return
    }

    try {
      await axios.post(API_URL, { name, email })
      setName('')
      setEmail('')
      setError(null)
      fetchUsers()
    } catch (error) {
      setError('Eroare la crearea utilizatorului')
      console.error(error)
    }
  }

  const updateUser = async () => {
    if (!editingUser || !name || !email) return

    try {
      await axios.put(`${API_URL}/${editingUser.id}`, {
        id: editingUser.id,
        name,
        email,
        createdAt: editingUser.createdAt
      })
      setOpenDialog(false)
      setEditingUser(null)
      setName('')
      setEmail('')
      setError(null)
      fetchUsers()
    } catch (error) {
      setError('Eroare la actualizarea utilizatorului')
      console.error(error)
    }
  }

  const deleteUser = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      setError(null)
      fetchUsers()
    } catch (error) {
      setError('Eroare la ștergerea utilizatorului')
      console.error(error)
    }
  }

  const openEditDialog = (user: User) => {
    setEditingUser(user)
    setName(user.name)
    setEmail(user.email)
    setOpenDialog(true)
  }

  const closeDialog = () => {
    setOpenDialog(false)
    setEditingUser(null)
    setName('')
    setEmail('')
  }

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Adaugă Utilizator
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
            <TextField
              label="Nume"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <Button variant="contained" onClick={createUser}>
              Adaugă
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Lista Utilizatori ({users.length})
          </Typography>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : users.length === 0 ? (
            <Typography color="text.secondary" sx={{ p: 2 }}>
              Nu există utilizatori
            </Typography>
          ) : (
            <List>
              {users.map((user) => (
                <ListItem
                  key={user.id}
                  secondaryAction={
                    <Box>
                      <IconButton onClick={() => openEditDialog(user)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => deleteUser(user.id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemText primary={user.name} secondary={user.email} />
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={closeDialog}>
        <DialogTitle>Editează Utilizator</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column', mt: 2 }}>
            <TextField
              label="Nume"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Anulează</Button>
          <Button variant="contained" onClick={updateUser}>
            Salvează
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default UserList