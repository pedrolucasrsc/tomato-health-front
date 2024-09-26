import {
    Box,
    Container,
    Grid,
    Typography,
    Button,
} from '@mui/material'

export function Footer() {
  return (
    <Box sx={{ backgroundColor: '#333', color: '#fff', py: 4 }}>
    <Container maxWidth="md">
        <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
            Tomato Health
            </Typography>
            <Typography>
            Soluções inovadoras para a saúde das suas plantas.
            </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
            Links Úteis
            </Typography>
            <Button color="inherit" href="/sobre">
            Sobre Nós
            </Button>
            <Button color="inherit" href="/contato">
            Contato
            </Button>
            <Button color="inherit" href="/politica">
            Política de Privacidade
            </Button>
        </Grid>
        </Grid>
        <Box textAlign="center" sx={{ mt: 4 }}>
        <Typography variant="body2">
            &copy; {new Date().getFullYear()} Tomato Health. Todos os direitos reservados.
        </Typography>
        </Box>
    </Container>
    </Box>
  )
}