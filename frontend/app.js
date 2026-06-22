// Inicializar iconos de Feather
feather.replace();

const linksContainer = document.getElementById('links-container');

// Datos de prueba (Mock Data) - Más adelante esto vendrá de nuestra API de AWS
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
    }
];

// Función para simular una carga desde AWS (con un pequeño delay)
async function fetchLinks() {
    try {
        // TODO: Aquí pondremos el fetch() a nuestra API Gateway de AWS
        // const response = await fetch('URL_DE_TU_API_AWS');
        // const links = await response.json();
        
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockLinks);
            }, 1000); // Simulamos 1 segundo de carga
        });
    } catch (error) {
        console.error('Error al obtener los links:', error);
        return [];
    }
}

// Función para crear el HTML de cada tarjeta de link
function createLinkCard(link) {
    return `
        <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="link-card">
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
    links.forEach(link => {
        linksContainer.innerHTML += createLinkCard(link);
    });
    
    // Es necesario volver a inicializar los iconos para los elementos recién creados
    feather.replace();
}

// Iniciar la aplicación
renderPage();
