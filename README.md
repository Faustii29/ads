# Koten Padel — Sistema de Reservas

## Estructura del proyecto

```
koten-padel/
├── src/
│   ├── main.jsx        → Punto de entrada (enruta / y /admin)
│   ├── App.jsx         → Web del cliente (reservas + cancelación)
│   ├── Admin.jsx       → Panel del administrador
│   └── supabase.js     → Cliente de Supabase
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
└── .env.example
```

---

## Paso 1 — Supabase

1. Crear cuenta en https://supabase.com
2. Crear un nuevo proyecto
3. Ir a **SQL Editor** y ejecutar el contenido de `supabase_setup.sql`
4. Ir a **Settings → API** y copiar:
   - **Project URL**
   - **anon public key**

---

## Paso 2 — Variables de entorno

Crear un archivo `.env` en la raíz del proyecto (copiar `.env.example`):

```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_KEY=tu-anon-key
```

---

## Paso 3 — Deploy en Vercel

### Opción A: desde GitHub (recomendada)
1. Subir esta carpeta a un repositorio de GitHub
2. Entrar a https://vercel.com → "New Project" → importar el repo
3. En la configuración del proyecto, ir a **Environment Variables** y agregar:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_KEY`
4. Click en **Deploy**

### Opción B: desde la terminal
```bash
npm install -g vercel
vercel
# Seguir las instrucciones y agregar las env vars cuando las pida
```

---

## Uso

- **Web clientes:** `https://tu-dominio.vercel.app/`
- **Panel admin:** `https://tu-dominio.vercel.app/admin`
  - Contraseña por defecto: `koten2025` (cambiarla en `Admin.jsx` línea 4)

---

## Cambiar contraseña del admin

En `src/Admin.jsx`, línea 4:
```js
const ADMIN_PASS = "koten2025"; // ← cambiar acá
```

---

## Desarrollo local

```bash
npm install
npm run dev
```
