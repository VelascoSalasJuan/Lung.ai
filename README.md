# Lung.AI

Aplicación web responsiva para detección de enfermedades respiratorias mediante análisis de audio.

## Descripción del Proyecto

Lung.AI es un prototipo MVP que utiliza inteligencia artificial para detectar enfermedades respiratorias analizando grabaciones de audio de la respiración y tos de los usuarios.

## Estructura del Proyecto

```
src/
├── components/          # Componentes principales de la aplicación
│   ├── layout/        # Componentes de layout (Header, Footer, Navigation)
│   │   ├── Header/
│   │   ├── Footer/
│   │   └── Navigation/
│   ├── home/          # Página de inicio
│   │   ├── Hero/
│   │   └── Features/
│   ├── recording/     # Funcionalidad de grabación de audio
│   │   ├── AudioRecorder/
│   │   └── RecordingControls/
│   ├── analysis/      # Análisis y resultados
│   │   ├── ResultsDisplay/
│   │   └── DiseaseInfo/
│   └── about/         # Información del proyecto
│       ├── Team/
│       └── Contact/
├── assets/           # Imágenes y recursos estáticos
├── styles/           # Estilos globales
├── utils/            # Funciones utilitarias
├── hooks/            # Custom hooks de React
├── contexts/         # Contextos de React
├── App.jsx           # Componente principal
└── main.jsx          # Punto de entrada
```

## Tecnologías

- React 18
- Vite
- ESLint

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Build

```bash
npm run build
```
