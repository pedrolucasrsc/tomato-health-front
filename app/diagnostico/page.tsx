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
  CardContent,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Camera, { FACING_MODES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css'; // Estilos para a câmera
import { InstructionCard } from '../ui/instruction-card';
import ReactMarkdown from 'react-markdown';
import { environment } from '@/environment';

export default function DiagnosticoPage() {
  const [showCard, setShowCard] = useState(true);
  const [imageData, setImageData] = useState('');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [diagnosis, setDiagnosis] = useState('');
  const [llmOutput, setLlmOutput] = useState('');
  const [exampleImage, setExampleImage] = useState('');
  const classNames = ['mancha-de-alternaria', 'requeima']


  function dataURLtoFile(dataUrl: string, filename: string): File {
    let arr = dataUrl.split(',');
    let mime = arr[0].match(/:(.*?);/)?.[1] || '';
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  const handleHelpClick = () => {
    setShowCard(true);
  };

  const handleTakePhoto = (dataUri: string) => {
    setImageData(dataUri);
    setIsCameraActive(false);
  };

  const handleRetakePhoto = () => {
    setImageData('');
    setIsCameraActive(true);
    setDiagnosis('');
    setLlmOutput('');
    setExampleImage('');
  };

interface Response {
  llm_response: string;
  ml_result: MlResult;
}

interface MlResult {
  detected_objects: DetectedObject[];
  image_height: number;
  image_width: number;
}

interface DetectedObject {
  box: number[];
  class_index: string;
  class_name: string;
  score: number;
}


  function diagnosisImage(diagnosisName: string) {
    if (diagnosisExists(diagnosisName)) {
      return '/exemplos/'.concat(diagnosisName, '.webp');
    }
    return '/exemplos/not-found.webp';
  }

  function diagnosisExists(diagnosisName: string) {
    return classNames.includes(diagnosisName) 
  }

  const handleSendPhoto = async () => {
    if (!imageData) return;

    try {
      // Enviar a imagem para o servidor usando uma requisição POST
      console.log("1");
      const formData = new FormData();
      console.log("2");
      formData.append('image', dataURLtoFile(imageData, 'temp.jpg')); // imageData pode ser um Blob ou File
      console.log("3");
      const response = await fetch(`${environment.API_URL}/process_image`, {
        method: 'POST',
        body: formData,
      });
      console.log("resposta a seguir");
      console.log(`resposta: ${response}`);

      if (response.ok) {
        // Lidar com a resposta do servidor
        console.log("entrou aqui")
        const result: Response = await response.json();
        console.log(`result: ${result.llm_response}`)
        console.log("4")
        const diagnosis = result.ml_result.detected_objects[0].class_name;
        console.log("5")
        setDiagnosis(diagnosis);
        setLlmOutput(result.llm_response);

        // mudar para acomodar novos exemplos
        setExampleImage(diagnosisImage(diagnosis));
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

          {/* Se tivermos um diagnóstico, mostramos o resultado */}
          {diagnosis ? (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" gutterBottom>
                Seu tomateiro está com: {diagnosis}
              </Typography>
              <ReactMarkdown>
                {llmOutput}
              </ReactMarkdown>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Imagem tirada pelo usuário */}
                <Card sx={{ maxWidth: 345, m: 2 }}>
                  <CardMedia component="img" image={imageData} alt="Sua foto" />
                  <CardContent>
                    <Typography variant="subtitle1" align="center">
                      Sua Foto
                    </Typography>
                  </CardContent>
                </Card>

                {/* Imagem de exemplo da doença */}
                <Card sx={{ maxWidth: 345, m: 2 }}>
                  <CardMedia component="img" image={exampleImage} alt="Exemplo da doença" />
                  <CardContent>
                    <Typography variant="subtitle1" align="center">
                      Exemplo de {diagnosis}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={handleRetakePhoto}
                sx={{ mt: 2 }}
              >
                Diagnosticar novamente
              </Button>
            </Box>
          ) : (
            // Renderizações anteriores (câmera, confirmação de envio, etc.)
            <>
              {isCameraActive ? (
                <Camera
                  onTakePhoto={(dataUri: string) => handleTakePhoto(dataUri)}
                  idealFacingMode={FACING_MODES.ENVIRONMENT}
                />
              ) : imageData ? (
                <Card sx={{ maxWidth: 345, margin: 'auto' }}>
                  <CardMedia component="img" image={imageData} alt="Foto do tomate" />
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
            </>
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
