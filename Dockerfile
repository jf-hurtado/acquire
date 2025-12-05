# Imagen base con Node 22
FROM mongo:7.0

# Directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiamos primero manifiestos para cachear dependencias
COPY package*.json ./

# Instalamos dependencias de producción
#RUN npm ci --omit=dev

# Copiamos el resto del código (incluye /model)
COPY . .

# El servicio escucha en 3002
EXPOSE 27018:27017

# Comando de arranque
EXPOSE 3001
CMD [mongoose.connect({mongodb://localhost:27017/data})]