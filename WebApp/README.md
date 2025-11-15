# 🚀 WebApp Template - Full Stack cu Docker

Template profesional pentru aplicații web full-stack cu React, .NET și PostgreSQL, complet dockerizat.

## 📋 Stack Tehnologic

- **Frontend:** React 18 + TypeScript + Material-UI + Vite
- **Backend:** .NET 8 + C# + Entity Framework Core
- **Database:** PostgreSQL 15
- **Containerizare:** Docker + Docker Compose

## 🎯 Caracteristici

✅ Complet dockerizat - deploy pe orice device  
✅ Separare clară între frontend și backend  
✅ API service layer pentru integrări externe  
✅ Health checks pentru toate serviciile  
✅ Hot-reload pentru development  
✅ Configurare prin variabile de mediu  
✅ Exemplu de integrare Google Maps  

## 🚀 Quick Start

### 1. Clone și Setup

```bash
git clone <repository-url>
cd my-webapp-template

# Copiază template-ul de variabile de mediu
cp .env.example .env

# Editează .env cu setările tale
```

### 2. Pornește cu Docker

```bash
# Build și pornește toate serviciile
docker-compose up -d --build

# Vezi logurile
docker-compose logs -f

# Oprește tot
docker-compose down
```

### 3. Accesează Aplicația

- **Frontend:** http://localhost
- **Backend API:** http://localhost:5000
- **Swagger:** http://localhost:5000/swagger
- **Database:** localhost:5432

## 🛠️ Development Mode

### Backend Development

```bash
cd backend/WebAppBackend
dotnet watch run
```

Modificările în cod vor fi reload-uite automat.

### Frontend Development

```bash
cd frontend
npm run dev
```

Hot-reload activat la http://localhost:5173

## 📦 Structură Proiect

```
my-webapp-template/
├── docker-compose.yml      # Orchestrare servicii
├── .env.example           # Template configurare
├── backend/
│   ├── Dockerfile
│   └── WebAppBackend/
│       ├── Controllers/   # API endpoints
│       ├── Data/         # Database context
│       ├── Models/       # Data models
│       └── Services/     # External API integrations
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── src/
│       ├── components/   # React components
│       └── services/     # API calls
└── docs/                 # Documentație echipă
```

## 🔧 Adăugare Funcționalități Noi

### Backend - Adaugă un nou Controller

1. Creează `Controllers/YourController.cs`:
```csharp
[ApiController]
[Route("api/[controller]")]
public class YourController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok("Hello");
    }
}
```

2. Rebuild container:
```bash
docker-compose up -d --build backend
```

### Frontend - Adaugă un nou Component

1. Creează `src/components/YourComponent.tsx`
2. Importă în `App.tsx`
3. Rebuild container:
```bash
docker-compose up -d --build frontend
```

## 🗺️ Integrare API Externe (Exemplu: Google Maps)

### 1. Configurare Backend

```bash
# Adaugă API key în .env
GOOGLE_MAPS_API_KEY=your_key_here
```

### 2. Service Backend (deja creat)

`Services/GoogleMapsService.cs` - gestionează apelurile către Google Maps

### 3. Controller Backend (deja creat)

`Controllers/MapsController.cs` - expune endpoint `/api/maps/geocode`

### 4. Frontend Usage

```typescript
import { mapsApi } from './services/api'

const result = await mapsApi.geocode('Timisoara, Romania')
console.log(result.data) // { address, latitude, longitude }
```

## 🔐 Variabile de Mediu

Editează `.env` pentru configurare:

```bash
# Project
PROJECT_NAME=myapp
ENVIRONMENT=Development

# Database
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=webapp_db

# API Keys
GOOGLE_MAPS_API_KEY=your_key_here
```

## 📊 Database Migrations

```bash
# Creează migrare nouă
cd backend/WebAppBackend
dotnet ef migrations add YourMigrationName

# Aplică migrația
dotnet ef database update

# Sau lasă docker să o aplice automat la pornire
```

## 🐳 Comenzi Docker Utile

```bash
# Rebuild toate serviciile
docker-compose up -d --build

# Rebuild un singur serviciu
docker-compose up -d --build backend

# Vezi loguri
docker-compose logs -f backend
docker-compose logs -f frontend

# Restart serviciu
docker-compose restart backend

# Oprește și șterge volume-uri (ATENȚIE: șterge datele!)
docker-compose down -v

# Verifică health
curl http://localhost:5000/health
```

## 👥 Colaborare în Echipă

### Pentru Backend Developers

1. Faceți modificări în `backend/WebAppBackend/`
2. Testați local cu `dotnet run`
3. Commit și push
4. Echipa va rula `docker-compose up -d --build backend`

### Pentru Frontend Developers

1. Faceți modificări în `frontend/src/`
2. Testați local cu `npm run dev`
3. Commit și push
4. Echipa va rula `docker-compose up -d --build frontend`

### Workflow Git Recomandat

```bash
# Creează branch pentru feature
git checkout -b feature/google-maps-integration

# Fă modificările
# ...

# Commit
git add .
git commit -m "Add Google Maps integration"

# Push
git push origin feature/google-maps-integration

# Creează Pull Request pe GitHub/GitLab
```

## 🧪 Testing

```bash
# Backend tests
cd backend/WebAppBackend
dotnet test

# Frontend tests
cd frontend
npm test
```

## 📝 Documentație Adițională

- [Backend Setup Guide](./docs/BACKEND_SETUP.md)
- [Frontend Setup Guide](./docs/FRONTEND_SETUP.md)
- [API Integration Guide](./docs/API_INTEGRATION.md)

## ❓ Troubleshooting

### Backend nu se conectează la database

```bash
# Verifică dacă PostgreSQL rulează
docker ps | grep postgres

# Vezi logurile
docker logs webapp_postgres

# Restart PostgreSQL
docker-compose restart postgres
```

### Frontend nu vede API-ul

1. Verifică CORS în `backend/Program.cs`
2. Verifică `nginx.conf` pentru proxy settings
3. Verifică variabila `VITE_API_URL` în `.env`

