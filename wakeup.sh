#!/bin/bash
# Especificar la versión requerida de Node
REQUIRED_VERSION="v18.0.0"

# Cargar NVM
. ~/.nvm/nvm.sh

# Verificar si NVM está instalado
if ! command -v nvm &> /dev/null; then
    echo "NVM no está instalado. Por favor, instala NVM para cambiar la versión de Node."
    exit 1
fi

# Verificar la versión de Node
NODE_VERSION=$(node -v)

if [[ $(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1) != "$REQUIRED_VERSION" ]]; then
    echo "La versión de Node no cumple con el requisito mínimo de $REQUIRED_VERSION. Cambiando la versión..."

    # Instalar o cambiar a la versión requerida de Node
    nvm install $REQUIRED_VERSION

    if [ $? -ne 0 ]; then
        echo "Ocurrió un error al cambiar a la versión de Node requerida."
        exit 1
    fi

    # Establecer la versión requerida de Node como predeterminada
    nvm use $REQUIRED_VERSION

    if [ $? -ne 0 ]; then
        echo "Ocurrió un error al establecer la versión de Node como predeterminada."
        exit 1
    fi

    echo "Versión de Node cambiada a $REQUIRED_VERSION."
fi

# Verificar si se proporcionó el parámetro "debug"
if [[ "$1" == "debug" ]]; then
    export DEBUG=true
else
    export DEBUG=false
fi

# Instalar dependencias:
# Carpeta sleepy-spider-front
cd front

# Instalar dependencias si no están instaladas
if [ ! -d "node_modules" ]; then
    echo "🚀 Instalando frontend."
    npm install
    echo "Dependencias de /front instaladas."
else
    echo "Dependencias de /front ya están instaladas."
fi

# Carpeta sleepy-spider-back
cd ../back

# Instalar dependencias si no están instaladas
if [ ! -d "node_modules" ]; then
    echo "🚀 Instalando Backend."
    npm install
    echo "Dependencias de /back instaladas."
else
    echo "Dependencias de /back ya están instaladas."
fi

# Carpeta sleepy-spider-front
cd ../front
nvm use $REQUIRED_VERSION
# Comprobar si el puerto 8000 está ocupado
if lsof -i :8000; then
    echo "El puerto 8000 está ocupado. Matando el proceso..."

    # Obtener el ID del proceso que utiliza el puerto 3000
    PID=$(lsof -t -i :8000)

    # Matar el proceso
    kill $PID

    echo "Proceso terminado."
fi

if $DEBUG ; then
    npm run dev:debug &
else
    npm run dev &
fi
echo "🚀 Frontend iniciado."

# Carpeta sleepy-spider-back
cd ../back
nvm use $REQUIRED_VERSION
# Comprobar si el puerto 3000 está ocupado
if lsof -i :3000; then
    echo "El puerto 3000 está ocupado. Matando el proceso..."

    # Obtener el ID del proceso que utiliza el puerto 3000
    PID=$(lsof -t -i :3000)

    # Matar el proceso
    kill $PID

    echo "Proceso terminado."
fi

# Ejecutar el servidor Node.js
npm run start &
echo "🚀 Backend iniciado."
