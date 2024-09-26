import { Fragment } from 'react';
import {
  Typography,
  Button,
  Box,
  // Grid,
  Container,
  // Card,
  // CardContent,
} from '@mui/material';
import Grid from '@mui/material/Grid2'
import Image from 'next/image';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SendIcon from '@mui/icons-material/Send';
import InsightsIcon from '@mui/icons-material/Insights';

export default function LandingPage() {

  return (
    <Fragment>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: '#f5f5f5',
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Grid container spacing={4} alignItems={'center'}>
            <Grid size={{xs: 12, md: 6}}>
              <Typography variant="h3" component="h1" gutterBottom sx={{ wordBreak: 'break-word',
                fontSize: {
                  xs: '2rem',
                  sm: '3rem',
                }
              }}>
                Identifique doenças em suas plantas de tomate instantaneamente
              </Typography>
              <Typography variant="h6" color="textSecondary" paragraph>
                Utilize nosso aplicativo para diagnosticar problemas e manter
                suas plantas saudáveis.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                href="/diagnostico"
              >
                Enviar Foto Agora
              </Button>
            </Grid>
            <Grid size={{xs: 12, md: 6}}>
              <Image
                width={897}
                height={897}
                src="/hero-mobile.png"
                alt="Folha de Tomate"
                style={{ width: '100%', borderRadius: 8 }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Como Funciona
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid size={{xs: 12, md: 4}}>
              <Box textAlign="center">
                <CameraAltIcon fontSize="large" color="primary" />
                <Typography variant="h6" gutterBottom>
                  Tire uma Foto
                </Typography>
                <Typography color="textSecondary">
                  Capture uma imagem da folha do tomateiro que apresenta sinais
                  de doença.
                </Typography>
              </Box>
            </Grid>
            <Grid size={{xs: 12, md: 4}}>
              <Box textAlign="center">
                <SendIcon fontSize="large" color="primary" />
                <Typography variant="h6" gutterBottom>
                  Envie para Nós
                </Typography>
                <Typography color="textSecondary">
                  Utilize nosso aplicativo para enviar a foto rapidamente.
                </Typography>
              </Box>
            </Grid>
            <Grid size={{xs: 12, md: 4}}>
              <Box textAlign="center">
                <InsightsIcon fontSize="large" color="primary" />
                <Typography variant="h6" gutterBottom>
                  Receba o Diagnóstico
                </Typography>
                <Typography color="textSecondary">
                  Obtenha resultados instantâneos sobre a saúde da sua planta.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Box sx={{ backgroundColor: '#f5f5f5', py: 8 }}>
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Por que Usar Nosso Aplicativo?
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid size={{xs: 12, md: 6}}>
              <Typography variant="h6" gutterBottom>
                Rapidez
              </Typography>
              <Typography color="textSecondary">
                Obtenha diagnósticos em tempo real para agir imediatamente.
              </Typography>
            </Grid>
            <Grid size={{xs: 12, md: 6}}>
              <Typography variant="h6" gutterBottom>
                Precisão
              </Typography>
              <Typography color="textSecondary">
                Utilizamos tecnologia avançada para garantir resultados confiáveis.
              </Typography>
            </Grid>
            <Grid size={{xs: 12, md: 6}}>
              <Typography variant="h6" gutterBottom>
                Facilidade de Uso
              </Typography>
              <Typography color="textSecondary">
                Interface intuitiva que qualquer pessoa pode utilizar.
              </Typography>
            </Grid>
            <Grid size={{xs: 12, md: 6}}>
              <Typography variant="h6" gutterBottom>
                Saúde das Plantas
              </Typography>
              <Typography color="textSecondary">
                Mantenha suas plantas saudáveis e produtivas.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section (Optional) */}
      {/* Uncomment if you have testimonials */}
      {/*
      <Box sx={{ py: 8 }}>
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            O que Nossos Usuários Dizem
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    João Silva
                  </Typography>
                  <Typography color="textSecondary">
                    "O aplicativo salvou minhas plantas! Recomendo a todos."
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            {/* Add more testimonials as needed */}
          {/*</Grid>
        </Container>
      </Box>
      */}
    </Fragment>
  );
}
