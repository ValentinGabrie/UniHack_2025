# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj and restore dependencies
COPY WebAppBackend/*.csproj ./WebAppBackend/
RUN dotnet restore WebAppBackend/WebAppBackend.csproj

# Copy everything else and build
COPY WebAppBackend/ ./WebAppBackend/
WORKDIR /src/WebAppBackend
RUN dotnet publish -c Release -o /app/publish

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copy published files
COPY --from=build /app/publish .

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl --fail http://localhost:5000/health || exit 1

# Run application
ENTRYPOINT ["dotnet", "WebAppBackend.dll"]