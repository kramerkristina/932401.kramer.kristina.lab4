const userName = prompt("Как вас зовут?", "Кристина");
const displayName = userName && userName.trim() !== "" ? userName.trim() : "Киноман";
alert(`Привет, ${displayName}! Добро пожаловать на страницу любителя кино и сериалов.`);

const movieDurations = [25, 142, 38, 195, 110, 155, 18];
console.log("Исходный список длительностей фильмов (мин):", movieDurations);

function getMaxDuration(durations) {
    if (durations.length === 0) return 0;
    let max = durations[0];
    for (let i = 1; i < durations.length; i++) {
        if (durations[i] > max) max = durations[i];
    }
    return max;
}

function filterFeatureFilms(durations, minDuration = 120) {
    const filtered = [];
    for (let i = 0; i < durations.length; i++) {
        if (durations[i] > minDuration) filtered.push(durations[i]);
    }
    return filtered;
}

function calculateTotalDuration(durations) {
    let sum = 0;
    for (let i = 0; i < durations.length; i++) sum += durations[i];
    return sum;
}

function analyzeShortFilms(durations, maxShortDuration = 40) {
    let count = 0, totalShortDuration = 0;
    for (let i = 0; i < durations.length; i++) {
        if (durations[i] <= maxShortDuration) {
            count++;
            totalShortDuration += durations[i];
        }
    }
    return { count, totalShortDuration };
}

console.log(`Общая длительность просмотра – ${calculateTotalDuration(movieDurations)} минут.`);
console.log(`Максимальная длительность: ${getMaxDuration(movieDurations)} минут.`);

document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-toggle');
    const toggleTableBtn = document.getElementById('toggle-table-btn');
    const tableContainer = document.getElementById('table-container');
    const tbody = document.getElementById('movies-tbody');
    
    const titleInput = document.querySelector('#movie-title');
    const yearInput = document.querySelector('#movie-year');
    const statusInput = document.querySelector('#movie-status');
    const addBtn = document.querySelector('#add-movie-btn');
    const clearBtn = document.querySelector('#clear-movies-btn');

    if (!tbody || !addBtn || !clearBtn) {
        console.error("Ошибка: Не найдены элементы управления таблицей!");
        return; 
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }

    let movies = JSON.parse(localStorage.getItem('moviesList')) || [];
    
    function renderTable() {
        tbody.innerHTML = ''; 
        movies.forEach(movie => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${movie.title}</td>
                <td>${movie.year}</td>
                <td>${movie.status}</td>
            `;
            tbody.appendChild(tr);
        });

        const rows = document.querySelectorAll('#movies-tbody tr');
        console.log(`Текущее количество фильмов в таблице: ${rows.length}`);
    }
    
    renderTable();

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            if (document.body.classList.contains('light-theme')) {
                localStorage.setItem('theme', 'light');
            } else {
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    if (toggleTableBtn && tableContainer) {
        toggleTableBtn.addEventListener('click', () => {
            tableContainer.classList.toggle('hidden');
        });
    }

    addBtn.addEventListener('click', () => {
        const title = titleInput.value.trim();
        const year = yearInput.value.trim();
        const status = statusInput.value;

        if (title === '' || year === '') {
            alert('Пожалуйста, заполните название и год.');
            return;
        }

        movies.push({ title, year, status });
        localStorage.setItem('moviesList', JSON.stringify(movies));
        
        renderTable();

        titleInput.value = '';
        yearInput.value = '';
    });

    clearBtn.addEventListener('click', () => {
        if (confirm('Точно очистить весь список?')) {
            movies = [];
            localStorage.setItem('moviesList', JSON.stringify(movies));
            renderTable();
        }
    });
});