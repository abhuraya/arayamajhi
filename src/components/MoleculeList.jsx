import * as React from 'react';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const storageKey = 'abhudaya-molecule-list';
const theme = createTheme({
  palette: {
    primary: { main: '#276749' },
    background: { default: '#f7f8f5', paper: '#ffffff' },
    text: { primary: '#20352e', secondary: '#65756e' },
  },
  shape: { borderRadius: 12 },
  typography: { fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", sans-serif' },
});

function readMolecules() {
  try {
    const saved = window.localStorage.getItem(storageKey);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function MoleculeList() {
  const [molecules, setMolecules] = React.useState(readMolecules);
  const [name, setName] = React.useState('');
  const [size, setSize] = React.useState('');

  React.useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(molecules));
  }, [molecules]);

  function handleSubmit(event) {
    event.preventDefault();
    const moleculeName = name.trim();
    const parsedSize = Number(size);
    if (!moleculeName || size === '' || !Number.isFinite(parsedSize) || parsedSize < 0) return;

    setMolecules((items) => [...items, { name: moleculeName, size: parsedSize }]);
    setName('');
    setSize('');
  }

  function handleRemove(indexToRemove) {
    setMolecules((items) => items.filter((_, index) => index !== indexToRemove));
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Container maxWidth="md" sx={{ py: { xs: 3, sm: 6 } }}>
          <Box
            component="nav"
            aria-label="Portfolio navigation"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
              pb: 2,
              mb: { xs: 5, sm: 8 },
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography component="a" href="#home" variant="subtitle1" sx={{ color: 'text.primary', fontWeight: 700, textDecoration: 'none' }}>
              Abhudaya Rayamajhi
            </Typography>
            <Button component="a" href="#home" color="inherit" size="small">
              Home
            </Button>
          </Box>

          <Box sx={{ maxWidth: 720, mx: 'auto' }}>
            <Typography variant="overline" color="primary.main" sx={{ fontWeight: 700, letterSpacing: '.14em' }}>
              Reference
            </Typography>
            <Typography component="h1" variant="h3" sx={{ mt: 0.5, mb: 1, fontWeight: 700, letterSpacing: '-.035em' }}>
              Molecule list
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
              A personal reference for molecules and their sizes.
            </Typography>

            <Paper component="form" variant="outlined" onSubmit={handleSubmit} sx={{ p: { xs: 2, sm: 2.5 }, mb: 2.5 }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 0.65fr auto' }, gap: 1.5, alignItems: 'start' }}>
                <TextField
                  label="Molecule"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  inputProps={{ maxLength: 120 }}
                  size="small"
                  fullWidth
                />
                <TextField
                  label="Size (Da)"
                  type="number"
                  value={size}
                  onChange={(event) => setSize(event.target.value)}
                  required
                  inputProps={{ min: 0, step: 'any' }}
                  size="small"
                  fullWidth
                />
                <Button type="submit" variant="contained" sx={{ minHeight: 40, whiteSpace: 'nowrap', boxShadow: 'none' }}>
                  Add molecule
                </Button>
              </Box>
            </Paper>

            <TableContainer component={Paper} variant="outlined">
              <Table aria-label="Molecule sizes">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Molecule</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>Size (Da)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {molecules.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={2} align="center" sx={{ py: 5, color: 'text.secondary' }}>
                        Your list is empty. Add a molecule above to get started.
                      </TableCell>
                    </TableRow>
                  ) : (
                    molecules.map((molecule, index) => (
                      <TableRow key={index} hover>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                            <span>{molecule.name}</span>
                            <IconButton
                              aria-label={'Remove ' + molecule.name}
                              size="small"
                              onClick={() => handleRemove(index)}
                              sx={{ color: 'text.secondary' }}
                            >
                              <DeleteOutlineIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </TableCell>
                        <TableCell align="right" sx={{ fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
                          {molecule.size}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1.5 }}>
              Entries are saved in this browser on this device.
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
