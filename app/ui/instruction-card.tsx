import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Card,
  CardMedia,
  Typography,
  List,
  CardContent,
  Button,
} from '@mui/material' 
import { Dispatch } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export function InstructionCard({ setShowCard }: { 
    setShowCard: Dispatch<React.SetStateAction<boolean>>;
 }) {

  const handleEntendiClick = () => {
    setShowCard(false);
  };

  return (
    <Box
        sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        }}
    >
        <Card sx={{ maxWidth: 600, width: '100%', margin: 2 }}>
        <CardMedia
            component="img"
            height="300"
            image="/instruction-image.webp" // Atualize o caminho da imagem
            alt="Como tirar sua foto"
        />
        <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
            Como tirar sua foto
            </Typography>
            <List>
            <ListItem>
                <ListItemIcon>
                <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Boa iluminação" />
            </ListItem>
            <ListItem>
                <ListItemIcon>
                <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Dê preferência à luz natural e sem sombra direta" />
            </ListItem>
            <ListItem>
                <ListItemIcon>
                <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Evite distrações no fundo" />
            </ListItem>
            <ListItem>
                <ListItemIcon>
                <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Distância adequada" />
            </ListItem>
            <ListItem>
                <ListItemIcon>
                <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Mostre as áreas da folha afetadas" />
            </ListItem>
            </List>
        </CardContent>
        <Box sx={{ textAlign: 'center', pb: 2 }}>
            <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleEntendiClick}
            >
            Entendi
            </Button>
        </Box>
        </Card>
    </Box>
  )
}