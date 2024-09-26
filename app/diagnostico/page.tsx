'use client';

import {
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useState } from 'react';
import { InstructionCard } from '../ui/instruction-card';

export default function DiagnosticoPage() {
  const [showCard, setShowCard] = useState(true);

  const handleHelpClick = () => {
    setShowCard(true);
  };

  return (
    <Box sx={{ minHeight: '80vh', padding: 2 }}>
      {showCard ? (
        // Renderiza o Card
        <InstructionCard setShowCard={setShowCard}/>
      ) : (
        // Renderiza o conteúdo principal com o botão de interrogação
        <Box sx={{ position: 'relative', minHeight: '80vh' }}>
          {/* Conteúdo principal aqui */}
          <Typography variant="h4" gutterBottom>
            Diagnostique seu tomate
          </Typography>

          {/* Botão de interrogação */}
          <Box
            sx={{
              position: 'fixed',
              bottom: 16,
              right: 16,
            }}
          >
            <IconButton
              color="primary"
              aria-label="Ajuda"
              onClick={handleHelpClick}
              sx={{
                  backgroundColor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                      backgroundColor: '#f0f0f0',
                  },
                  boxShadow: 3, // Adiciona uma sombra suave
               }}
            >
              <HelpOutlineIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
}
