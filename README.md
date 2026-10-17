# 🐷 PiggyBank Frontend (Next.js 14 App Router)

Interfaz web moderna, fluida y con estética de casino premium para la plataforma de sorteos **PiggyBank**, construida con Next.js 14, Tailwind CSS, animaciones dinámicas con Framer Motion, sincronización en tiempo real vía Socket.io Client y pasarela de pago Wompi El Salvador.

* **Repositorio GitHub:** [https://github.com/nevorasoftware/piggy-bank-frontend.git](https://github.com/nevorasoftware/piggy-bank-frontend.git)
* **Backend Relacionado:** [https://github.com/nevorasoftware/piggy-bank-backend.git](https://github.com/nevorasoftware/piggy-bank-backend.git)

---

## 🎨 Características Principales

1. **Sala del Jugador Interactiva (`/rooms/[id]`):**
   * Animación interactiva del cerdito alcancía con Framer Motion (monedas de oro cayendo, cerdito verde cuando está activo, rojo brillante si se llena o expira).
   * Contador regresivo en tiempo real sincronizado por Socket.io.
   * Pase Digital con nombre del jugador, DUI, número de boleto y QR visual.
   * Ruleta de sorteo en vivo con animación de giro, fuegos artificiales (confetti) y proclamación del ganador.
2. **Autenticación Salvadoreña:**
   * Registro con validación en tiempo real del formato y dígito verificador del DUI (`00000000-0`).
   * Verificación por código OTP (WhatsApp Business Cloud API y Correo).
3. **Perfil de Usuario & Cobros:**
   * Registro y actualización de cuenta bancaria para transferencias de premios ganados.
   * Visualización del límite diario de participaciones (reglas 6/3).
4. **Panel de Administración Completo (`/admin`):**
   * `/admin/rooms`: CRUD completo de salas (Nombre, Premio, Costo, Capacidad, Horas de apertura y sorteo, Estado).
   * `/admin/config`: Configuración en caliente de las reglas de juego (`MAX_PARTICIPACIONES_DIA` y `MAX_VICTORIAS_DIA`).
   * `/admin/users`: Directorio de usuarios con DUI, teléfonos y cuentas bancarias.
   * `/admin/sorteos`: Historial de ganadores con botón de acción **"Pago Aplicado"** que dispara la confirmación oficial al banco y WhatsApp.
   * Dashboard con métricas clave: recaudación, boletos vendidos y usuarios del día.

---

## 🚀 Despliegue en Railway (Paso a Paso)

Este proyecto cuenta con `railway.json` y `Dockerfile` multi-stage preparados para producción con healthcheck en `/api/health`.

### 1. Conectar Repositorio en Railway
1. En tu proyecto de Railway (donde ya creaste el backend y Postgres), haz clic en **"New"** -> **"GitHub Repo"**.
2. Selecciona `nevorasoftware/piggy-bank-frontend`.

### 2. Configurar Variables de Entorno en Railway
En la pestaña **Variables** del servicio frontend, define:

| Variable | Descripción | Valor de Ejemplo |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | URL pública de tu servicio Backend en Railway | `https://piggy-bank-backend.up.railway.app` |
| `NEXT_PUBLIC_SOCKET_URL` | URL para WebSockets (mismo host del backend) | `https://piggy-bank-backend.up.railway.app` |
| `NEXT_PUBLIC_WOMPI_PUBLIC_KEY` | Llave pública de Wompi El Salvador | `pub_prod_xxxxxxxxxxxx` |

> 💡 **Nota Importante:** Si modificas variables que inicien con `NEXT_PUBLIC_`, debes disparar un nuevo **Redeploy** para que Next.js compile los valores en el bundle cliente.

### 3. Generar Dominio Público
1. En la pestaña **Settings** -> **Networking**, haz clic en **"Generate Domain"**.
2. Obtendrás un dominio similar a `piggy-bank-frontend.up.railway.app`.
3. Asegúrate de copiar este dominio a la variable `FRONTEND_URL` en el servicio del backend para la configuración de CORS.

---

## 💻 Desarrollo Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/nevorasoftware/piggy-bank-frontend.git
cd piggy-bank-frontend

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno locales
cp .env.example .env.local
# Asegúrate de que NEXT_PUBLIC_API_URL apunte a http://localhost:3000

# 4. Iniciar servidor de desarrollo Next.js
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📦 Comandos Git de Inicialización y Publicación

Para inicializar y enviar este repositorio a GitHub:

```bash
cd /Users/jgiron/Documents/PiggyBank/piggy-bank-frontend
git init
git remote add origin https://github.com/nevorasoftware/piggy-bank-frontend.git
git add .
git commit -m "feat: interfaz web PiggyBank con Next.js 14, Tailwind, Framer Motion, Socket.io y panel admin"
git branch -M main
git push -u origin main
```
