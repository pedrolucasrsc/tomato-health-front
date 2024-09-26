'use client';

import * as React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  Grid,
  Container,
  // Card,
  // CardContent,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SendIcon from '@mui/icons-material/Send';
import InsightsIcon from '@mui/icons-material/Insights';

export default function LandingPage() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const drawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem component="a" href="/login">
          <ListItemText primary="Login do Especialista" />
        </ListItem>
        {/* Add more list items as needed */}
      </List>
    </Box>
  );

  return (
    <React.Fragment>
      {/* App Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Tomato Health
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>

      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: '#f5f5f5',
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={4}>
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
            <Grid item xs={12} md={4}>
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
            <Grid item xs={12} md={4}>
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
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Rapidez
              </Typography>
              <Typography color="textSecondary">
                Obtenha diagnósticos em tempo real para agir imediatamente.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Precisão
              </Typography>
              <Typography color="textSecondary">
                Utilizamos tecnologia avançada para garantir resultados confiáveis.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Facilidade de Uso
              </Typography>
              <Typography color="textSecondary">
                Interface intuitiva que qualquer pessoa pode utilizar.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
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

      {/* Footer */}
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
    </React.Fragment>
  );
}
