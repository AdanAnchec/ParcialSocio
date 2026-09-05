/* =========================================================
   SOCIOLOGÍA EN CONTEXTO — script.js
   Todo el contenido editable vive en los objetos de datos
   de más abajo (timelineData, thinkersData, theoriesData,
   quizData). Reemplázalos por el resumen semanal cuando
   lo tengas y el sitio se actualiza solo.
   ========================================================= */

/* ---------------------------------------------------------
   1. NAV MÓVIL
   --------------------------------------------------------- */
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');

if (navToggle && siteNav){
  const isMobileNav = () => window.matchMedia('(max-width: 900px)').matches;

  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    // respaldo inline por si algún estilo en caché interfiere con la clase CSS
    // (solo aplica al menú móvil; en escritorio el nav no usa transform)
    if (isMobileNav()){
      siteNav.style.transform = isOpen ? 'translateX(0)' : 'translateX(100%)';
    }
  });

  siteNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      if (isMobileNav()){
        siteNav.style.transform = 'translateX(100%)';
      }
    });
  });
}

/* ---------------------------------------------------------
   2. LÍNEA DE TIEMPO — Módulo 3 (contexto histórico + precursores)
   --------------------------------------------------------- */
const timelineData = [
  {
    year: "s. XVIII",
    kind: "contexto de origen",
    title: "La Ilustración",
    text: "Introduce el uso del método científico y la razón para erradicar la ignorancia, cuestionando la autoridad tradicional y religiosa como única fuente de verdad."
  },
  {
    year: "1789–1799",
    kind: "contexto de origen",
    title: "Revolución Francesa",
    text: "Provoca la caída de la monarquía y del sistema feudal, la separación de la Iglesia del poder político, y el surgimiento del Estado moderno y la República burguesa."
  },
  {
    year: "1760–1840",
    kind: "contexto de origen",
    title: "Revolución Industrial",
    text: "Introduce la máquina de vapor y el modo de producción capitalista, generando la división entre la burguesía —dueña de la maquinaria y el capital— y el proletariado, y desencadenando el conflicto de clases."
  },
  {
    year: "1760–1825",
    kind: "fundación",
    title: "Saint-Simon",
    text: "Precursor de la sociología: propuso estudiar la sociedad de manera científica mediante una 'fisiología social', organizada alrededor de la industria, la ciencia y la tecnología."
  },
  {
    year: "1798–1857",
    kind: "fundación",
    title: "Auguste Comte",
    text: "Acuña el término 'sociología' en 1838 y plantea la ley de los tres estados y el positivismo, sentando las bases metodológicas de la disciplina."
  },
  {
    year: "1820–1903",
    kind: "fundación",
    title: "Herbert Spencer",
    text: "Comparó la sociedad con un organismo biológico que evoluciona y cuyas partes cumplen funciones, y desarrolló el Darwinismo Social aplicando ideas de la evolución a las sociedades humanas."
  },
  {
    year: "1858–1917",
    kind: "fundación",
    title: "Émile Durkheim",
    text: "Consolida el método sociológico: trata los hechos sociales como 'cosas' externas al individuo, dotando a la sociología de un objeto y un método propios."
  },
  {
    year: "1818–1883",
    kind: "fundación",
    title: "Karl Marx",
    text: "Centró sus estudios en la desigualdad y la lucha de clases entre burguesía y proletariado, explicando la sociedad desde la economía y desarrollando el concepto de plusvalía."
  },
  {
    year: "1864–1920",
    kind: "fundación",
    title: "Max Weber",
    text: "Desarrolló el concepto de Verstehen —comprender las acciones desde el punto de vista de las personas— y estudió la burocracia, el poder y los tipos de dominación: carismática, tradicional y racional-legal."
  },
  {
    year: "s. XX",
    kind: "consolidación teórica",
    title: "Estructural Funcionalismo",
    text: "Parsons y Merton estudian la sociedad como un sistema de instituciones interdependientes orientado a mantener la estabilidad social."
  },
  {
    year: "s. XX",
    kind: "consolidación teórica",
    title: "Teoría del Conflicto",
    text: "Coser y Dahrendorf retoman la desigualdad y las luchas por los recursos como motor permanente de la vida social."
  },
  {
    year: "s. XX",
    kind: "consolidación teórica",
    title: "Interaccionismo Simbólico",
    text: "Mead y Blumer explican la construcción de significado a través de la interacción cotidiana entre las personas."
  },
  {
    year: "s. XX",
    kind: "consolidación teórica",
    title: "Teoría Crítica",
    text: "La Escuela de Frankfurt —Adorno, Horkheimer, Marcuse— cuestiona el capitalismo y la cultura de masas."
  },
  {
    year: "s. XX",
    kind: "aportes contemporáneos",
    title: "Bourdieu y Giddens",
    text: "Bourdieu analiza la dominación invisible mediante el habitus y los campos; Giddens propone la dualidad de la estructura entre agencia individual y estructura social."
  },
  {
    year: "s. XXI",
    kind: "desafíos globales",
    title: "Sociedad digital y globalización",
    text: "La sociología actual se enfoca en la globalización, la sociedad digital (IA, ciberacoso, identidad digital, privacidad), nuevas desigualdades, movimientos sociales y riesgos globales como el cambio climático y las pandemias."
  }
];

const timelineTrack = document.getElementById('timelineTrack');
const timelineDetail = document.getElementById('timelineDetail');

function renderTimeline(){
  timelineTrack.innerHTML = '';
  timelineData.forEach((item, i) => {
    const btn = document.createElement('button');
    btn.className = 'timeline-point';
    btn.type = 'button';
    btn.innerHTML = `
      <span class="timeline-point-year">${item.year}</span>
      <span class="timeline-point-title">${item.title}</span>
      <span class="timeline-point-kind">${item.kind}</span>
    `;
    btn.addEventListener('click', () => selectTimelinePoint(i));
    timelineTrack.appendChild(btn);
  });
}

function selectTimelinePoint(i){
  const item = timelineData[i];
  timelineTrack.querySelectorAll('.timeline-point').forEach((el, idx) => {
    el.classList.toggle('is-active', idx === i);
  });
  timelineDetail.innerHTML = `
    <p class="timeline-detail-year">${item.year} · ${item.kind}</p>
    <h3 class="timeline-detail-title">${item.title}</h3>
    <p class="timeline-detail-text">${item.text}</p>
  `;
}

renderTimeline();

/* ---------------------------------------------------------
   2.b PERSPECTIVAS DE AUTORES — Módulo 2 (acordeón)
   --------------------------------------------------------- */
const authorsData = [
  {
    tag: "1798–1857",
    title: "Auguste Comte",
    text: "Definió la sociología como ciencia positiva encargada de descubrir las leyes del orden (estática social) y del cambio (dinámica social), usando métodos empíricos como los de las ciencias naturales: observación, comparación, experimentación y verificación, en busca del bienestar de la humanidad."
  },
  {
    tag: "1858–1917",
    title: "Émile Durkheim",
    text: "Entendió la sociología como el estudio de los hechos sociales: modos de actuar, pensar y sentir externos al individuo que ejercen sobre él una fuerza coercitiva —leyes, religión, moral, idioma—. Es ciencia porque tiene un objeto específico y un método objetivo que evita prejuicios."
  },
  {
    tag: "1864–1920",
    title: "Max Weber",
    text: "Propuso una sociología comprensiva (Verstehende Soziologie) que interpreta y comprende la acción social para explicar su desarrollo y sus efectos, distinguiendo cuatro tipos de acción: racional con arreglo a fines, racional con arreglo a valores, afectiva y tradicional."
  },
  {
    tag: "1818–1883",
    title: "Karl Marx",
    text: "Sin definirse como sociólogo, concibió la sociedad a partir de las relaciones de producción y las contradicciones entre clases. Para él, la sociología debe estudiar las dinámicas de dominación y explotación del capitalismo para transformar la realidad social."
  },
  {
    tag: "contemporáneo",
    title: "Pierre Bourdieu",
    text: "Centra su análisis en las formas invisibles de dominación y desigualdad, explicando las prácticas sociales a través del habitus —esquemas interiorizados de percepción y acción— y los campos, espacios de competencia por distintos tipos de capital."
  },
  {
    tag: "contemporáneo",
    title: "Anthony Giddens",
    text: "Define la sociología como el estudio de la vida social humana, sus grupos y sociedades, y busca superar el dilema entre estructura e individuo con la dualidad de la estructura: las estructuras condicionan al individuo, pero los individuos también las crean y transforman."
  }
];

const authorAccordion = document.getElementById('authorAccordion');

function renderAuthors(){
  authorAccordion.innerHTML = '';
  authorsData.forEach(a => {
    const item = document.createElement('div');
    item.className = 'accordion-item';
    item.innerHTML = `
      <button class="accordion-trigger" type="button">
        <span class="accordion-trigger-label">
          <span>${a.title}</span>
          <span class="accordion-trigger-tag">${a.tag}</span>
        </span>
        <span class="accordion-plus">＋</span>
      </button>
      <div class="accordion-panel">
        <div class="accordion-panel-inner">${a.text}</div>
      </div>
    `;
    item.querySelector('.accordion-trigger').addEventListener('click', () => {
      item.classList.toggle('is-open');
    });
    authorAccordion.appendChild(item);
  });
}

renderAuthors();

/* ---------------------------------------------------------
   3. PERFILES DE PENSADORES — Módulo 4
   --------------------------------------------------------- */
const thinkersData = [
  {
    name: "Henri de Saint-Simon",
    years: "1760 – 1825",
    tagline: "Precursor de la fisiología social",
    text: "Uno de los precursores de la sociología. Propuso estudiar la sociedad de manera científica mediante una 'fisiología social'. Consideraba que la sociedad moderna debía organizarse alrededor de la industria, la ciencia y la tecnología, y defendió una sociedad más cooperativa e igualitaria."
  },
  {
    name: "Auguste Comte",
    years: "1798 – 1857",
    tagline: "El padre de la sociología",
    text: "Considerado el padre de la Sociología: utilizó el término por primera vez en 1838 y defendía que la sociedad podía estudiarse científicamente. Su principal teoría es la Ley de los Tres Estados: (1) Teológico, donde los fenómenos se explican por Dios o fuerzas sobrenaturales; (2) Metafísico, con fuerzas o conceptos abstractos; y (3) Positivo, que utiliza la observación, la experimentación y el método científico."
  },
  {
    name: "Herbert Spencer",
    years: "1820 – 1903",
    tagline: "La sociedad como organismo",
    text: "Comparó la sociedad con un organismo biológico, porque consideraba que ambas evolucionan y tienen partes que cumplen funciones. También desarrolló el Darwinismo Social, que aplicaba las ideas de la evolución a las sociedades humanas."
  },
  {
    name: "Émile Durkheim",
    years: "1858 – 1917",
    tagline: "El método sociológico",
    text: "Estableció formalmente la sociología como disciplina académica. Su concepto principal es el hecho social: formas de actuar, pensar o comportarse que ejercen influencia sobre los individuos, como la religión, el idioma, las leyes, la cultura y las costumbres."
  },
  {
    name: "Karl Marx",
    years: "1818 – 1883",
    tagline: "Lucha de clases y economía",
    text: "Centró sus estudios en la desigualdad y la lucha de clases, entendiendo que la sociedad está influenciada principalmente por la economía. Identificó dos grandes clases en el capitalismo: la burguesía, dueña de los medios de producción, y el proletariado, que vende su fuerza de trabajo. Desarrolló también el concepto de plusvalía: el valor producido por el trabajador que termina beneficiando al capitalista."
  },
  {
    name: "Max Weber",
    years: "1864 – 1920",
    tagline: "Sociología comprensiva",
    text: "Estudió la sociedad desde el significado que las personas dan a sus acciones. Desarrolló la teoría de la acción social y el concepto de Verstehen —comprender las acciones poniéndose en el lugar de las personas—, identificando cuatro tipos: racional con fines, racional con valores, afectiva y tradicional. También estudió la burocracia, el poder y los tipos de dominación: carismática, tradicional y racional-legal."
  }
];

const profileGrid = document.getElementById('profileGrid');

function renderThinkers(){
  profileGrid.innerHTML = '';
  thinkersData.forEach(t => {
    const card = document.createElement('article');
    card.className = 'profile-card';
    card.innerHTML = `
      <div class="profile-card-head">
        <div>
          <p class="profile-name">${t.name}</p>
          <span class="profile-years">${t.years}</span>
        </div>
        <span class="profile-toggle">＋</span>
      </div>
      <p class="profile-tagline">${t.tagline}</p>
      <div class="profile-body">
        <div class="profile-body-inner">${t.text}</div>
      </div>
    `;
    card.addEventListener('click', () => {
      const wasOpen = card.classList.contains('is-open');
      profileGrid.querySelectorAll('.profile-card').forEach(c => {
        c.classList.remove('is-open');
        c.querySelector('.profile-toggle').textContent = '＋';
      });
      if (!wasOpen){
        card.classList.add('is-open');
        card.querySelector('.profile-toggle').textContent = '－';
      }
    });
    profileGrid.appendChild(card);
  });
}

renderThinkers();

/* ---------------------------------------------------------
   4. CORRIENTES TEÓRICAS — Módulo 5 (acordeón)
   --------------------------------------------------------- */
const theoriesData = [
  {
    tag: "Parsons",
    title: "Estructural Funcionalismo",
    text: "Concibe la sociedad como un sistema complejo cuyas partes —instituciones, roles— trabajan interdependientemente para mantener el orden. El esquema AGIL de Talcott Parsons resume sus cuatro funciones: Adaptación (economía/tecnología), Goal attainment o alcance de metas (política), Integración (leyes y normas) y Latencia (educación y familia). Conceptos clave: status, rol, grupo social, estratificación y socialización. Se le critica ser estático, ignorar el conflicto y ver al individuo como un 'títere' del sistema."
  },
  {
    tag: "Marx",
    title: "Materialismo Histórico y Modos de Producción",
    text: "La historia cambia por la contradicción entre las fuerzas productivas y las relaciones de producción, a través de cuatro formaciones económico-sociales: Comunismo Primitivo (sin propiedad privada, economía tribal de subsistencia), Esclavismo (amo vs. esclavo), Feudalismo (señor feudal vs. siervo) y Capitalismo (burguesía vs. proletariado, trabajo asalariado y extracción de plusvalía)."
  },
  {
    tag: "Coser · Dahrendorf",
    title: "Teoría del Conflicto",
    text: "Sostiene que el conflicto es intrínseco a la sociedad, por la escasez de recursos y el choque de intereses. Se nutre de Marx (lucha de clases), Weber (lucha por el poder y la dominación) y la Escuela de Frankfurt (teoría crítica). Analiza las relaciones de poder, la distribución desigual de la riqueza, las estructuras que perpetúan la desigualdad y las ideologías."
  },
  {
    tag: "Weber",
    title: "La Acción Social: cuatro tipos ideales",
    text: "Racional con arreglo a fines: cálculo de costo-beneficio para lograr una meta (un empresario que invierte para maximizar ganancias). Racional con arreglo a valores: convicciones éticas o religiosas, sin importar las consecuencias (el capitán que se hunde con su barco). Afectiva: dictada por emociones del momento (reaccionar con ira). Tradicional: basada en la costumbre o el hábito (seguir una tradición familiar sin cuestionarla)."
  }
];

const theoryAccordion = document.getElementById('theoryAccordion');

function renderTheories(){
  theoryAccordion.innerHTML = '';
  theoriesData.forEach(th => {
    const item = document.createElement('div');
    item.className = 'accordion-item';
    item.innerHTML = `
      <button class="accordion-trigger" type="button">
        <span class="accordion-trigger-label">
          <span>${th.title}</span>
          <span class="accordion-trigger-tag">${th.tag}</span>
        </span>
        <span class="accordion-plus">＋</span>
      </button>
      <div class="accordion-panel">
        <div class="accordion-panel-inner">${th.text}</div>
      </div>
    `;
    item.querySelector('.accordion-trigger').addEventListener('click', () => {
      item.classList.toggle('is-open');
    });
    theoryAccordion.appendChild(item);
  });
}

renderTheories();

/* ---------------------------------------------------------
   5. QUIZ — evaluación corta
   --------------------------------------------------------- */
const quizData = [
  {
    question: "¿Cuál de las siguientes es una característica de la ciencia?",
    options: [
      "Fáctica: describe los hechos tal y como son",
      "Improvisada: no sigue un plan",
      "Dogmática: no admite revisión",
      "Subjetiva: depende del punto de vista de cada quien"
    ],
    correct: 0,
    explain: "La ciencia es fáctica, metódica, sistemática y explicativa; no es dogmática, improvisada ni subjetiva."
  },
  {
    question: "Según Durkheim, ¿qué es un hecho social?",
    options: [
      "Una opinión personal sobre la sociedad",
      "Un modo de actuar, pensar o sentir externo al individuo, capaz de ejercer sobre él una coacción",
      "Un experimento de laboratorio",
      "Una ley matemática"
    ],
    correct: 1,
    explain: "Durkheim define el hecho social por su exterioridad y su capacidad de coacción sobre el individuo, más allá de sus manifestaciones particulares."
  },
  {
    question: "¿Qué transformación introdujo la Revolución Industrial y qué conflicto desencadenó?",
    options: [
      "El modo de producción capitalista, y el conflicto entre burguesía y proletariado",
      "El sistema feudal, y el conflicto entre señor y siervo",
      "La imprenta, y el conflicto entre Iglesia y Estado",
      "La democracia directa, y el conflicto entre ciudadanos y nobleza"
    ],
    correct: 0,
    explain: "La Revolución Industrial introdujo la máquina de vapor y el capitalismo, dividiendo a la sociedad entre burguesía y proletariado."
  },
  {
    question: "¿Quién acuñó el término 'sociología' y con qué corriente se le asocia?",
    options: [
      "Karl Marx, con el materialismo histórico",
      "Max Weber, con la sociología comprensiva",
      "Auguste Comte, con el positivismo",
      "Émile Durkheim, con el estructural funcionalismo"
    ],
    correct: 2,
    explain: "Auguste Comte acuñó el término 'sociología' en 1838 y fundó el positivismo como su método."
  },
  {
    question: "¿Qué esquema propuso Talcott Parsons para explicar cómo se mantiene la estabilidad social?",
    options: [
      "El esquema AGIL: Adaptación, alcance de metas, Integración y Latencia",
      "La ley de los tres estados",
      "El materialismo histórico",
      "La dualidad de la estructura"
    ],
    correct: 0,
    explain: "El esquema AGIL de Parsons describe cuatro funciones —Adaptación, Goal attainment, Integración y Latencia— necesarias para la estabilidad de un sistema social."
  },
  {
    question: "Actuar siguiendo una tradición familiar, sin cuestionarla, corresponde al tipo de acción social que Weber llama...",
    options: [
      "Racional con arreglo a fines",
      "Racional con arreglo a valores",
      "Afectiva",
      "Tradicional"
    ],
    correct: 3,
    explain: "La acción tradicional se basa en la costumbre o el hábito, no en un cálculo de fines ni en una convicción de valor explícita."
  }
];

const quizBox = document.getElementById('quizBox');
let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;

function renderQuiz(){
  if (quizIndex >= quizData.length){
    renderQuizResult();
    return;
  }
  const q = quizData[quizIndex];
  quizAnswered = false;

  quizBox.innerHTML = `
    <p class="quiz-progress">pregunta ${quizIndex + 1} de ${quizData.length} · aciertos: ${quizScore}</p>
    <div class="quiz-card">
      <p class="quiz-question">${q.question}</p>
      <div class="quiz-options">
        ${q.options.map((opt, i) => `<button class="quiz-option" data-i="${i}" type="button">${opt}</button>`).join('')}
      </div>
      <p class="quiz-feedback"></p>
      <div class="quiz-nav">
        <button class="quiz-next" type="button">siguiente →</button>
      </div>
    </div>
  `;

  const optionButtons = quizBox.querySelectorAll('.quiz-option');
  const feedback = quizBox.querySelector('.quiz-feedback');
  const nextBtn = quizBox.querySelector('.quiz-next');

  optionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (quizAnswered) return;
      quizAnswered = true;
      const chosen = Number(btn.dataset.i);
      const isCorrect = chosen === q.correct;
      if (isCorrect) quizScore++;

      optionButtons.forEach((b, i) => {
        if (i === q.correct) b.classList.add('is-correct');
        else if (i === chosen) b.classList.add('is-wrong');
      });

      feedback.textContent = (isCorrect ? '✓ correcto — ' : '✗ no exactamente — ') + q.explain;
      nextBtn.classList.add('is-visible');
    });
  });

  nextBtn.addEventListener('click', () => {
    quizIndex++;
    renderQuiz();
  });
}

function renderQuizResult(){
  quizBox.innerHTML = `
    <div class="quiz-result">
      <p class="quiz-result-score">${quizScore} / ${quizData.length}</p>
      <p class="quiz-result-text">${quizResultMessage(quizScore, quizData.length)}</p>
      <button class="quiz-restart" type="button">volver a intentar</button>
    </div>
  `;
  quizBox.querySelector('.quiz-restart').addEventListener('click', () => {
    quizIndex = 0;
    quizScore = 0;
    renderQuiz();
  });
}

function quizResultMessage(score, total){
  const ratio = score / total;
  if (ratio === 1) return "Expediente completo. Dominas los cinco temas de la unidad.";
  if (ratio >= 0.6) return "Buen manejo del tema, con algún detalle por repasar.";
  return "Vale la pena repasar los módulos antes de la evaluación formal.";
}

renderQuiz();

/* ---------------------------------------------------------
   6. APARICIÓN AL HACER SCROLL
   Da vida al sitio: los bloques, tarjetas y puntos de la
   línea de tiempo aparecen suavemente al entrar en pantalla.
   --------------------------------------------------------- */
function initScrollReveal(){
  const selectors = [
    '.module-block',
    '.index-card',
    '.info-card',
    '.compare-card',
    '.origin-step',
    '.profile-card',
    '.accordion-item',
    '.timeline-point'
  ];
  const targets = document.querySelectorAll(selectors.join(', '));
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)){
    targets.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach((el, i) => {
    el.classList.add('reveal-init');
    el.style.transitionDelay = `${Math.min(i % 6, 5) * 0.06}s`;
    observer.observe(el);
  });
}

initScrollReveal();
