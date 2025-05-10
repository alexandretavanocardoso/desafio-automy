import { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getBatteries } from '../services/api';
import type { Battery } from '../services/api';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`battery-tabpanel-${index}`}
      aria-labelledby={`battery-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function BatteryList() {
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [scheduledBatteries, setScheduledBatteries] = useState<Battery[]>([]);
  const [pastBatteries, setPastBatteries] = useState<Battery[]>([]);
  const [showPastBatteries, setShowPastBatteries] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchBatteries = async () => {
    try {
      setLoading(true);
      const response = await getBatteries(showPastBatteries);
      setScheduledBatteries(response.scheduled);
      setPastBatteries(response.past);
      setError(null);
      setSuccess('Dados disponíveis na grid');
    } catch (err) {
      setError('Erro ao carregar as baterias. Por favor, tente novamente mais tarde.');
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowPastBatteries(event.target.checked);
  };

  const handleCloseError = () => {
    setError(null);
  };

  const handleCloseSuccess = () => {
    setSuccess(null);
  };

  // Função para formatar o horário
  const formatHorario = (horario: string) => horario.replace('h', ':00');
  // Função para formatar o telefone
  const formatTelefone = (telefone: string) => {
    if (!telefone || telefone.length < 12) return telefone;
    const ddd = telefone.slice(2, 4);
    const numero = telefone.slice(4);
    return `+55 (${ddd}) ${numero}`;
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      position: 'relative',
      p: isMobile ? 1 : 3
    }}>
      <Box sx={{ width: '100%', maxWidth: 1200, p: isMobile ? 1 : 3, background: '#fff', borderRadius: 2, boxShadow: 3, position: 'relative' }}>
        {loading && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 9999
            }}
          >
            <CircularProgress sx={{ color: 'white' }} />
          </Box>
        )}

        <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'stretch' : 'center', mb: isMobile ? 1 : 3, gap: isMobile ? 1 : 0 }}>
          <Typography variant={isMobile ? 'h6' : 'h4'}>
            Gerenciamento de Baterias
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexDirection: isMobile ? 'column' : 'row', mt: isMobile ? 1 : 0 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showPastBatteries}
                  onChange={handleCheckboxChange}
                />
              }
              label="Trazer corridas anteriores"
            />
            <Button 
              variant="contained" 
              onClick={fetchBatteries}
              startIcon={<SearchIcon />}
              sx={{ 
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#1565c0'
                },
                width: isMobile ? '100%' : 'auto'
              }}
            >
              Pesquisar
            </Button>
          </Box>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="battery tabs">
            <Tab label="Baterias Agendadas" />
            <Tab label="Baterias Anteriores" />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <TableContainer component={Paper} sx={{ boxShadow: 1, overflowX: 'auto' }}>
            <Table size={isMobile ? 'small' : 'medium'}>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: isMobile ? 12 : 14, px: isMobile ? 0.5 : 2, py: isMobile ? 0.5 : 1 }}>Data Agendamento</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: isMobile ? 12 : 14, px: isMobile ? 0.5 : 2, py: isMobile ? 0.5 : 1 }}>Data Formulário</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: isMobile ? 12 : 14, px: isMobile ? 0.5 : 2, py: isMobile ? 0.5 : 1 }}>Horário</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: isMobile ? 12 : 14, px: isMobile ? 0.5 : 2, py: isMobile ? 0.5 : 1 }}>Nome</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: isMobile ? 12 : 14, px: isMobile ? 0.5 : 2, py: isMobile ? 0.5 : 1 }}>Email</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: isMobile ? 12 : 14, px: isMobile ? 0.5 : 2, py: isMobile ? 0.5 : 1 }}>Telefone</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: isMobile ? 12 : 14, px: isMobile ? 0.5 : 2, py: isMobile ? 0.5 : 1 }}>Quantidade de Pessoas</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {scheduledBatteries.map((battery, index) => (
                  <TableRow key={index}>
                    <TableCell align="center" sx={{ fontSize: isMobile ? 12 : 14, px: isMobile ? 0.5 : 2, py: isMobile ? 0.5 : 1 }}>{battery.data_agendamento}</TableCell>
                    <TableCell align="center" sx={{ fontSize: isMobile ? 12 : 14, px: isMobile ? 0.5 : 2, py: isMobile ? 0.5 : 1 }}>{battery.datetime_formulario}</TableCell>
                    <TableCell align="center" sx={{ fontSize: isMobile ? 12 : 14, px: isMobile ? 0.5 : 2, py: isMobile ? 0.5 : 1 }}>{formatHorario(battery.horario_agendamento)}</TableCell>
                    <TableCell align="center" sx={{ fontSize: isMobile ? 12 : 14, px: isMobile ? 0.5 : 2, py: isMobile ? 0.5 : 1 }}>{battery.nome}</TableCell>
                    <TableCell align="center" sx={{ fontSize: isMobile ? 12 : 14, px: isMobile ? 0.5 : 2, py: isMobile ? 0.5 : 1 }}>{battery.email}</TableCell>
                    <TableCell align="center" sx={{ fontSize: isMobile ? 12 : 14, px: isMobile ? 0.5 : 2, py: isMobile ? 0.5 : 1 }}>{formatTelefone(battery.telefone)}</TableCell>
                    <TableCell align="center" sx={{ fontSize: isMobile ? 12 : 14, px: isMobile ? 0.5 : 2, py: isMobile ? 0.5 : 1 }}>{battery.qtde_pessoas}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <TableContainer component={Paper} sx={{ boxShadow: 1, overflowX: 'auto' }}>
            <Table size={isMobile ? 'small' : 'medium'}>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: isMobile ? 12 : 14, px: isMobile ? 0.5 : 2, py: isMobile ? 0.5 : 1 }}>Data Agendamento</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: isMobile ? 12 : 14, px: isMobile ? 0.5 : 2, py: isMobile ? 0.5 : 1 }}>Data Formulário</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: isMobile ? 12 : 14, px: isMobile ? 0.5 : 2, py: isMobile ? 0.5 : 1 }}>Horário</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: isMobile ? 12 : 14, px: isMobile ? 0.5 : 2, py: isMobile ? 0.5 : 1 }}>Nome</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: isMobile ? 12 : 14, px: isMobile ? 0.5 : 2, py: isMobile ? 0.5 : 1 }}>Email</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: isMobile ? 12 : 14, px: isMobile ? 0.5 : 2, py: isMobile ? 0.5 : 1 }}>Telefone</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: isMobile ? 12 : 14, px: isMobile ? 0.5 : 2, py: isMobile ? 0.5 : 1 }}>Quantidade de Pessoas</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pastBatteries.map((battery, index) => (
                  <TableRow key={index}>
                    <TableCell align="center" sx={{ fontSize: isMobile ? 12 : 14, px: isMobile ? 0.5 : 2, py: isMobile ? 0.5 : 1 }}>{battery.data_agendamento}</TableCell>
                    <TableCell align="center" sx={{ fontSize: isMobile ? 12 : 14, px: isMobile ? 0.5 : 2, py: isMobile ? 0.5 : 1 }}>{battery.datetime_formulario}</TableCell>
                    <TableCell align="center" sx={{ fontSize: isMobile ? 12 : 14, px: isMobile ? 0.5 : 2, py: isMobile ? 0.5 : 1 }}>{formatHorario(battery.horario_agendamento)}</TableCell>
                    <TableCell align="center" sx={{ fontSize: isMobile ? 12 : 14, px: isMobile ? 0.5 : 2, py: isMobile ? 0.5 : 1 }}>{battery.nome}</TableCell>
                    <TableCell align="center" sx={{ fontSize: isMobile ? 12 : 14, px: isMobile ? 0.5 : 2, py: isMobile ? 0.5 : 1 }}>{battery.email}</TableCell>
                    <TableCell align="center" sx={{ fontSize: isMobile ? 12 : 14, px: isMobile ? 0.5 : 2, py: isMobile ? 0.5 : 1 }}>{formatTelefone(battery.telefone)}</TableCell>
                    <TableCell align="center" sx={{ fontSize: isMobile ? 12 : 14, px: isMobile ? 0.5 : 2, py: isMobile ? 0.5 : 1 }}>{battery.qtde_pessoas}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <Snackbar
          open={!!error}
          autoHideDuration={5000}
          onClose={handleCloseError}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>

        <Snackbar
          open={!!success}
          autoHideDuration={5000}
          onClose={handleCloseSuccess}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
            {success}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
} 