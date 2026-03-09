# User Management Dashboard (e-booking)

Buenas chicos, cómo andan?  
Les dejo por acá la mini app del challenge. La idea fue hacer algo **simple pero prolijo**, priorizando lo importante

---

## Qué hace (lo que me pedían)
- **Lista de usuarios** consumiendo la API pública de JSONPlaceholder.
- **Filtro por nombre en tiempo real**.
- **Persistencia del filtro**: si apretás **F5**, el filtro se mantiene y la lista sigue filtrada (para que no se "pierda" el estado).
- **Detalle de usuario**: click en una fila → te lleva a la vista con teléfono, website y compañía.

---

## Cómo levantarlo local
bash (o la terminal que usen) 
cd app
npm install
npm run dev

## Abrís el navegador en: http://localhost:5173/users

Cositas para probar rápido (modo "checklist"): escribí algo en el filtro (ej: erv) y apretá F5 → debería seguir filtrado; click en un usuario: abre el detalle (/users/:id); volvés atrás y el filtro se mantiene.

Tests: metí lo mínimo que tiene sentido para que no se rompa el flujo principal: 1 unit test del filtro (search) y 1 integration test del flujo (filtrar → persistir → entrar al detalle). Para correrlos:

cd app
npm test


Decisiones técnicas: Vite para arrancar rápido sin pelearme con configs; TypeScript para que el editor me avise antes de mandarme una cagada y no enterarme por runtime; React Router para que lista/detalle tengan URLs reales (/users y /users/:id) y se puedan recargar/compartir; TanStack Query para manejar loading/error/cache sin hacer un festival electrónico de estados a mano; Material UI para no escribir CSS desde cero y tener algo consistente y usable


Mejoras futuras (si hubiese un ratito más): debounce del input si la lista fuese enorme, mejor feedback visual en loading (skeletons) y errores más prolijos, y si esto creciera: PAGINACIÓN (de una esto, mas que necesario) o virtualización de la tabla


Abrazo, cualquier cosa me dicen algo. y buena semana!
