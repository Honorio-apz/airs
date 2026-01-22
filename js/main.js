document.addEventListener('DOMContentLoaded', () => {
    
    /* =======================
       THEME TOGGLE
       ======================= */
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    } else {
        html.setAttribute('data-theme', systemTheme);
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    
    /* =======================
       LANGUAGE TOGGLE
       ======================= */
    const langToggle = document.getElementById('lang-toggle');
    const langText = langToggle.querySelector('.lang-text');
    let currentLang = localStorage.getItem('lang') || 'es'; // Default to Spanish
    
    // Function to update DOM based on language
    const updateLanguage = (lang) => {
        const esElements = document.querySelectorAll('.es');
        const enElements = document.querySelectorAll('.en');
        
        if (lang === 'en') {
            esElements.forEach(el => el.classList.add('hidden'));
            enElements.forEach(el => el.classList.remove('hidden'));
            langText.textContent = 'ES'; // Show button to switch BACK to ES
            document.documentElement.lang = 'en';
        } else {
            enElements.forEach(el => el.classList.add('hidden'));
            esElements.forEach(el => el.classList.remove('hidden'));
            langText.textContent = 'EN'; // Show button to switch TO EN
            document.documentElement.lang = 'es';
        }
        
        localStorage.setItem('lang', lang);
    };
    
    // Initial Load
    updateLanguage(currentLang);
    
    // Event Listener
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'es' ? 'en' : 'es';
        updateLanguage(currentLang);
    });
    
    
    /* =======================
       SCROLL ANIMATIONS
       ======================= */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Select elements to animate
    document.querySelectorAll('.fade-in, .fade-up').forEach(el => {
        el.style.animationPlayState = 'paused'; // Pause initially
        observer.observe(el);
    });
    
});
