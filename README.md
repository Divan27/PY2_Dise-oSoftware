# Propuesta TSE — Rediseño de Interfaz

Prototipo de rediseño de la interfaz del [Tribunal Supremo de Elecciones de Costa Rica](https://www.tse.go.cr/index.html), desarrollado como proyecto académico del curso Diseño de Software.

---

## Tecnologías

- React + Vite
- CSS Modules
- API pública de cédulas: [apis.gometa.org](https://apis.gometa.org)

---

## Funcionalidades

- Consulta de datos civiles por número de cédula o nombre
- Filtro de noticias y comunicados oficiales
- Alternancia de tema oscuro / claro
- Diseño responsivo

---

## Limitantes legales y de uso

### 1. Proyecto académico — sin afiliación oficial
Este prototipo es un ejercicio universitario y **no tiene ninguna relación, aval ni afiliación con el Tribunal Supremo de Elecciones de Costa Rica**. El nombre, logotipo e identidad visual del TSE se utilizan únicamente con fines educativos y demostrativos.

### 2. Datos personales y privacidad
La información que se muestra en las consultas civiles proviene de una API de terceros ([apis.gometa.org](https://apis.gometa.org)) que a su vez consume datos del Ministerio de Hacienda de Costa Rica, los cuales son de **carácter público** según la legislación costarricense. Sin embargo:

- Este prototipo **no almacena, registra ni procesa** ningún dato consultado.
- Las consultas se realizan en tiempo real directamente desde el navegador del usuario.
- El uso de esta información debe enmarcarse dentro de lo permitido por la **Ley de Protección de la Persona frente al Tratamiento de sus Datos Personales (Ley 8968)** de Costa Rica.

### 3. Limitantes de la API de consulta
- La API de gometa.org tiene un límite de **20 solicitudes por IP cada 5 minutos** en su capa gratuita.
- Los datos pueden tener un desfase de hasta 7 días respecto a la base de datos oficial.
- La disponibilidad del servicio depende de un tercero y no está garantizada.

### 4. Prohibición de uso comercial o malicioso
Este prototipo no puede ser utilizado para:
- Suplantar o hacerse pasar por el sitio oficial del TSE.
- Recolectar, almacenar o comercializar datos personales de ciudadanos.
- Cualquier actividad que contravenga la legislación costarricense vigente.

### 5. Propiedad intelectual
El logotipo y marca del Tribunal Supremo de Elecciones son propiedad del Estado costarricense. Su uso en este proyecto es estrictamente académico y no implica ningún derecho de reproducción comercial.

---

## Autor
Derrick Aarón Gonzalez Silva
Dilan Zamora Sánchez

## Instituto Tecnológico de Costa Rica