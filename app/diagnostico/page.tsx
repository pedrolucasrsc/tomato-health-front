'use client';

import React, { useState } from 'react';
import {
  Typography,
  Box,
  Button,
  Card,
  CardMedia,
  CardActions,
  IconButton,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Camera, { FACING_MODES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css'; // Estilos para a câmera
import { InstructionCard } from '../ui/instruction-card';

export default function DiagnosticoPage() {
  const [showCard, setShowCard] = useState(true);
  const [imageData, setImageData] = useState("");
  const [isCameraActive, setIsCameraActive] = useState(false);

  const handleHelpClick = () => {
    setShowCard(true);
  };

  const handleTakePhoto = (dataUri: string) => {
    setImageData(dataUri);
    setIsCameraActive(false);
  };

  const handleRetakePhoto = () => {
    setImageData("");
    setIsCameraActive(true);
  };

  const handleSendPhoto = async () => {
    if (!imageData) return;

    try {
      // Enviar a imagem para o servidor usando uma requisição POST
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageData }),
      });

      if (response.ok) {
        // Lidar com a resposta do servidor
        const result = await response.json();
        alert(`Diagnóstico recebido: ${result.diagnosis}`);
      } else {
        alert('Falha ao enviar a foto.');
      }
    } catch (error) {
      console.error('Erro ao enviar a foto:', error);
    }
  };

  return (
    <Box sx={{ minHeight: '80vh', padding: 2 }}>
      {showCard ? (
        <InstructionCard setShowCard={setShowCard} />
      ) : (
        <Box sx={{ position: 'relative', minHeight: '80vh' }}>
          <Typography variant="h4" gutterBottom>
            Diagnostique seu tomate
          </Typography>

          {/* Renderiza a câmera se não houver imagem e a câmera estiver ativa */}
          {isCameraActive ? (
            <Camera
              onTakePhoto={(dataUri: string) => handleTakePhoto(dataUri)}
              idealFacingMode={FACING_MODES.ENVIRONMENT} // Câmera traseira
            />
          ) : imageData ? (
            <Card sx={{ maxWidth: 345, margin: 'auto' }}>
              <CardMedia
                component="img"
                image={imageData}
                alt="Foto do tomate"
              />
              <CardActions sx={{ justifyContent: 'center' }}>
                <Button variant="contained" onClick={handleRetakePhoto}>
                  Tirar outra foto
                </Button>
                <Button variant="contained" color="primary" onClick={handleSendPhoto}>
                  Enviar foto
                </Button>
              </CardActions>
            </Card>
          ) : (
            <Button variant="contained" onClick={() => setIsCameraActive(true)}>
              Acessar a câmera
            </Button>
          )}

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
                boxShadow: 3,
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
