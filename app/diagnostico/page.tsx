'use client';

import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Button,
  Card,
  CardMedia,
  CardActions,
  IconButton,
  CardContent,
  CircularProgress,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Camera, { FACING_MODES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css'; // Estilos para a câmera
import { InstructionCard } from '../ui/instruction-card';
import ReactMarkdown from 'react-markdown';
import { environment } from '@/environment';
import '@/app/globals.css'

export default function DiagnosticoPage() {
  const [showCard, setShowCard] = useState(true);
  const [imageData, setImageData] = useState('');
  const [file, setFile] = useState<File | null>(null); // Novo estado para armazenar o arquivo
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [diagnosis, setDiagnosis] = useState('');
  const [llmOutput, setLlmOutput] = useState('');
  const [exampleImage, setExampleImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
    setFile(null); // Limpa o arquivo selecionado
  };

  const handleRetakePhoto = () => {
    setImageData('');
    setFile(null); // Limpa o arquivo selecionado
    setIsCameraActive(false);
    setDiagnosis('');
    setLlmOutput('');
    setExampleImage('');
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImageData(reader.result as string); // Mostra a imagem na interface
      };
      reader.readAsDataURL(file);
      setIsCameraActive(false);
    }
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
    if (!imageData && !file) return;
    setIsLoading(true);

    try {
      const formData = new FormData();
      if (file) {
        formData.append('image', file);
      } else if (imageData) {
        formData.append('image', dataURLtoFile(imageData, 'temp.jpg'));
      }

      const response = await fetch(`${environment.API_URL}/process_image`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result: Response = await response.json();
        const diagnosis = result.ml_result.detected_objects[0].class_name;
        setDiagnosis(diagnosis);
        setLlmOutput(result.llm_response);
        setExampleImage(diagnosisImage(diagnosis));
      } else {
        alert('Falha ao enviar a foto.');
      }
    } catch (error) {
      console.error('Erro ao enviar a foto:', error);
    } finally {
      setIsLoading(false);
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

          {diagnosis ? (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" gutterBottom>
                Seu tomateiro está com: {diagnosis}
              </Typography>
              <ReactMarkdown>{llmOutput}</ReactMarkdown>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Card sx={{ maxWidth: 345, m: 2 }}>
                  <CardMedia component="img" image={imageData} alt="Sua foto" />
                  <CardContent>
                    <Typography variant="subtitle1" align="center">
                      Sua Foto
                    </Typography>
                  </CardContent>
                </Card>

                <Card sx={{ maxWidth: 345, m: 2 }}>
                  <CardMedia component="img" image={exampleImage} alt="Exemplo da doença" />
                  <CardContent>
                    <Typography variant="subtitle1" align="center">
                      Exemplo de {diagnosis}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
              <Button variant="contained" color="primary" onClick={handleRetakePhoto} sx={{ mt: 2 }}>
                Diagnosticar novamente
              </Button>
            </Box>
          ) : (
            <>
              {isCameraActive ? (
                <Camera
                  onTakePhoto={(dataUri: string) => handleTakePhoto(dataUri)}
                  idealFacingMode={FACING_MODES.ENVIRONMENT}
                />
              ) : imageData && isLoading ? (
                <Card sx={{ maxWidth: 345, margin: 'auto', position: 'relative' }}>
                  <CardMedia component="img" image={imageData} alt="Foto do tomate" />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(0, 0, 0, 0.2)', // Escurece levemente a imagem
                      zIndex: 1, // Coloca o overlay acima da imagem
                    }}
                  >
                    <CircularProgress />
                  </Box>
                  <CardActions sx={{ justifyContent: 'center' }}>
                      <Button variant="contained" onClick={handleRetakePhoto}>
                        Tentar novamente
                      </Button>
                      <Button variant="contained" color="primary" onClick={handleSendPhoto}>
                        Enviar foto
                      </Button>
                  </CardActions>
                </Card>
              ) : imageData ? (
                <Card sx={{ maxWidth: 345, margin: 'auto'}}>
                  <CardMedia component="img" image={imageData} alt="Foto do tomate" />
                  <CardActions sx={{ justifyContent: 'center' }}>
                      <Button variant="contained" onClick={handleRetakePhoto}>
                        Tentar novamente
                      </Button>
                      <Button variant="contained" color="primary" onClick={handleSendPhoto}>
                        Enviar foto
                      </Button>
                  </CardActions>
                </Card>
              ) : (
                <Box className="flex flex-col items-center justify-start min-h-screen mt-16 space-y-4">
                  <Button variant="contained" onClick={() => setIsCameraActive(true)}>
                    Acessar a câmera
                  </Button>
                  {/* Botão para escolher arquivo estilizado com Material-UI */}
                  <input
                    accept="image/*"
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: 'none' }} // Escondemos o input
                  />
                  <label htmlFor="file-upload">
                    <Button
                      variant="contained"
                      component="span" // Necessário para tornar o label clicável
                    >
                      Escolher arquivo
                    </Button>
                  </label>
                </Box>
              )}
            </>
          )}

          {/* {isLoading && ( */}
          {/* )} */}

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
