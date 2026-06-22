// Inicializar iconos de Feather
feather.replace();

const linksContainer = document.getElementById('links-container');

// Datos de prueba (Mock Data) - Más adelante esto vendrá de nuestra API de AWS
// o los usamos como fallback si la API falla para que la página nunca esté vacía
const mockLinks = [
    {
        id: '1',
        title: 'Mi Portafolio',
        subtitle: 'Mira mis proyectos más recientes',
        url: '#',
        icon: 'briefcase'
    },
    {
        id: '2',
        title: 'GitHub',
        subtitle: 'Revisa mi código abierto',
        url: 'https://github.com',
        icon: 'github'
    },
    {
        id: '3',
        title: 'LinkedIn',
        subtitle: 'Conectemos profesionalmente',
        url: 'https://linkedin.com',
        icon: 'linkedin'
    },
    {
        id: '4',
        title: 'Mi Canal de YouTube',
        subtitle: 'Tutoriales de AWS y programación',
        url: '#',
        icon: 'youtube'
    },
    {
        id: '5',
        title: 'Contáctame',
        subtitle: 'Envíame un correo directamente',
        url: 'mailto:contacto@ejemplo.com',
        icon: 'mail'
    }
];

// Función para simular una carga desde AWS
async function fetchLinks() {
    try {
        // Llamada real a tu API Gateway en AWS
        const response = await fetch('https://1fowuvoj4h.execute-api.us-east-1.amazonaws.com/Prod/links');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const links = await response.json();
        
        // Si la API devuelve un arreglo vacío, usamos los mockLinks para que se vea completo
        if (!links || links.length === 0) {
            console.log('La API no devolvió enlaces, usando datos de respaldo.');
            return mockLinks;
        }
        
        // DynamoDB puede devolver los items desordenados, opcionalmente los ordenamos
        return links.sort((a, b) => a.id.localeCompare(b.id));
    } catch (error) {
        console.error('Error al obtener los links:', error);
        // Fallback a mockLinks si hay un error
        return mockLinks;
    }
}

// Función para crear el HTML de cada tarjeta de link
function createLinkCard(link, index) {
    // Añadimos un pequeño delay de animación en línea si es necesario, 
    // aunque lo manejamos en CSS con :nth-child
    return `
        <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="link-card" style="animation-delay: ${index * 0.1}s">
            <div class="link-icon">
                <i data-feather="${link.icon}"></i>
            </div>
            <div class="link-content">
                <h2 class="link-title">${link.title}</h2>
                <p class="link-subtitle">${link.subtitle}</p>
            </div>
            <div class="link-arrow">
                <i data-feather="chevron-right"></i>
            </div>
        </a>
    `;
}

// Función principal que renderiza la página
async function renderPage() {
    const links = await fetchLinks();
    
    // Limpiamos el contenedor (quitamos el loader)
    linksContainer.innerHTML = '';
    
    // Inyectamos los links
    links.forEach((link, index) => {
        linksContainer.innerHTML += createLinkCard(link, index);
    });
    
    // Es necesario volver a inicializar los iconos para los elementos recién creados
    feather.replace();
}

// Iniciar la aplicación
renderPage();
