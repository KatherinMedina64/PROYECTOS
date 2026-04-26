const SITE_AUTOR = 'Katherin Medina';
const API_BASE = 'https://jsonplaceholder.typicode.com';
const POKE_API = 'https://pokeapi.co/api.v2';
const WATHER_API = 'https://restcountries.com/v3.1';

let currentFilter = 'all';
let pokemonPage = 0;

const greep = (name) => `Hola de el portafolio de ${name}`;
console.log(greep(SITE_AUTOR));

const formatPrice = (amount) => `${Number(amount).toLocaleString('en-BO')}`;
const devProfile = {
    name: 'Katherin Medina',
    role: 'Desarrolladora web',
    skills: ['JavaScript', 'HTML', 'CSS', 'Python', 'Laravel'],
    location: 'La Paz, Bolivia',
};
const { name, role, skills } = devProfile;
const [mainSkill, ...otherSkils] = skills;

console.log(`${name} - ${role}`);
console.log(`Habilidades principales: ${mainSkill}`);
console.log(`Otras habilidades: ${otherSkils}`);

const frontEnd = ['react', 'vue', 'Angular'];
const backEnd = ['NodeJs', 'Others'];
const allTechnologies = [...frontEnd, ...backEnd];
console.log('Todas las tecnologias: ', allTechnologies);

const UpdateProfile = { ...devProfile, available: true };
console.log('Perfil actualizado: ', UpdateProfile);

// CLASE ES6 + OBJETOS

class Project {
    #id;
    constructor({ id, title, description, techs, emoji, category }) {
        this.#id = id;
        this.title = title;
        this.desciption = description;
        this.techs = techs;
        this.emoji = emoji;
        this.category = category;
    }
    toHTML() {
        const badges = this.techs
            .map(t => `<span class="tech-badge">${t}</span>`)
            .join('');

        return `
      <article class="project-card" data-filter="${this.category}">
        <div class="project-img">${this.emoji}</div>
        <div class="project-info">
          <h3>${this.title}</h3>
          <p>${this.description}</p>
          <div>${badges}</div>
        </div>
      </article>
    `;
    }
}

const localProjects = [
    new Project({
        id: 1, category: 'prog', emoji: '💻',
        title: 'Programación I',
        description: 'Fundamentos de programación, estructuras básicas, algoritmos y lógica computacional.',
        techs: ['Pseudocódigo', 'Java', 'Estructuras Secuenciales'],
    }),
    new Project({
        id: 2, category: 'prog', emoji: '⚙️',
        title: 'Programación II',
        description: 'Programación orientada a objetos, uso de clases, pilas, colas y estructuras dinámicas.',
        techs: ['Java', 'POO', 'Estructuras de Datos'],
    }),
    new Project({
        id: 3, category: 'bd', emoji: '🗄️',
        title: 'Base de Datos I',
        description: 'Diseño de bases de datos, modelo entidad-relación y consultas SQL.',
        techs: ['SQL', 'MySQL', 'Modelo ER'],
    }),
    new Project({
        id: 4, category: 'mat', emoji: '➕',
        title: 'Álgebra I',
        description: 'Operaciones algebraicas, matrices, determinantes y sistemas de ecuaciones.',
        techs: ['Matrices', 'Determinantes', 'Ecuaciones'],
    }),
    new Project({
        id: 5, category: 'mat', emoji: '📈',
        title: 'Cálculo I',
        description: 'Límites, derivadas y análisis de funciones en una variable.',
        techs: ['Límites', 'Derivadas', 'Funciones'],
    }),
];

// console.log(localProjects);
// // Filtrar proyectos por categoria
// const filterProjects = (category) => 
//     category === 'all' ? localProjects
//     : localProjects.filter(p => p.category === category);

//     // Extraer solo los titulos
// const getTitles = () => localProjects.map(p => p.title);

// // Cuenta projectos por categoria
// const countByProjects = localProjects.reduce((acc, p) => {
//     acc[p.category] = (acc[p.category] || 0) + 1;
//     return acc;
// }, {});

// // Busca projectos por ID
// const findProject = (id) => localProjects.find(p => p.id === id);

// console.log('Titulos', getTitles());
// console.log('Por categoria', countByProjects);

// SELECCION C=DOM + MANIPULACION

const projectsGrid = document.getElementById('projects-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const PokeSection = document.getElementById('poke-section');
const pokeGrid = document.getElementById('poke-grid');
const pokeBtnNext = document.getElementById('poke-next');
const countryInput = document.getElementById('country-search');
const countryResult = document.getElementById('country-result');

// RENDENRIZADO DOM
function renderProjects(category = 'all') {
    if (!projectsGrid) return;

    const filtered = category === 'all'
        ? localProjects
        : localProjects.filter(p => p.category === category);

    projectsGrid.innerHTML = filtered.map(p => p.toHTML()).join('');

    filterButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === category);
    });
}

renderProjects();
/**
 * FILTROS
 */
filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        currentFilter = e.target.dataset.filter;
        renderProjects(currentFilter);
    });
});

/**
 * FETCH BASE
 */
async function fetchJSON(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Error HTTP');
    return res.json();
}

/**
 * POKEMON
 */
async function fetchPokemon(offset = 0) {
    if (!pokeGrid) return;

    pokeGrid.innerHTML = '<p>Cargando...</p>';

    try {
        const data = await fetchJSON(`${POKE_API}/pokemon?limit=6&offset=${offset}`);

        const details = await Promise.all(
            data.results.map(p => fetchJSON(p.url))
        );

        pokeGrid.innerHTML = details.map(p => `
        <div class="poke-card">
            <img src="${p.sprites.front_default}" />
            <p>${p.name}</p>
        </div>
    `).join('');

    } catch {
        pokeGrid.innerHTML = '<p>Error al cargar</p>';
    }
}

if (pokeBtnNext) {
    pokeBtnNext.addEventListener('click', () => {
        pokeOffset += 6;
        fetchPokemon(pokeOffset);
    });
}

/**
 * PAISES (CORREGIDO)
 */
async function fetchCountry(query) {
    if (!countryResult || !query.trim()) return;

    countryResult.innerHTML = '<p>Buscando...</p>';

    try {
        const [country] = await fetchJSON(
            `${WEATHER_API}/name/${query}?fields=name,capital,population,flags,region`
        );

        const {
            name: { common },
            capital: [capital] = ['N/A'],
            population,
            flags: { svg },
            region
        } = country;

        countryResult.innerHTML = `
        <div class="project-card">
            <img src="${svg}" style="width:100%">
            <h3>${common}</h3>
            <p>Capital: ${capital}</p>
            <p>Región: ${region}</p>
            <p>Población: ${population.toLocaleString()}</p>
        </div>
    `;

    } catch {
        countryResult.innerHTML = '<p>No encontrado</p>';
    }
}

/**
 * BUSCADOR
 */
let timer;
if (countryInput) {
    countryInput.addEventListener('input', (e) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fetchCountry(e.target.value);
        }, 500);
    });
}

/**
 * INIT
 */
document.addEventListener('DOMContentLoaded', () => {
    fetchPokemon(0);
});