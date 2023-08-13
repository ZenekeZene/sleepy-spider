#!/bin/bash

cd ../back

if lsof -i :3000; then
  echo "El puerto 3000 está ocupado. Matando el proceso..."

  # Obtener el ID del proceso que utiliza el puerto 3000
  PID=$(lsof -t -i :3000)

  # Matar el proceso
  kill $PID

  echo "Proceso terminado."
fi

npm run start
cd ../front
