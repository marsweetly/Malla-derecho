const malla = {
  "Semestre 1": [
    "Jurisdicción",
    "Sistema Jurídico",
    "Historia del Derecho",
    "Teoría Constitucional",
    "Educación Física y Salud",
    "Comunicación Oral y Escrita"
  ],
  "Semestre 2": [
    "Razonamiento Jurídico",
    "Historia del Derecho Chileno",
    "Conceptos Fundamentales del Derecho Privado",
    "Introducción a la Profesión Jurídica",
    "Derecho Constitucional Orgánico"
  ],
  "Semestre 3": [
    "Teoría de la Justicia",
    "Acto Jurídico",
    "Análisis Jurisprudencional",
    "Economía",
    "Derechos Fundamentales",
    "Proceso Civil Ordinario"
  ],
  "Semestre 4": [
    "Bienes",
    "Taller de Resolución de Casos Prácticos",
    "Derecho Internacional de los Derechos Humanos",
    "Derecho Económico",
    "Derecho Procesal Constitucional",
    "Derecho Probatorio",
    "Optativo de Formación General"
  ],
  "Semestre 5": [
    "Derecho Societario",
    "Obligaciones",
    "Análisis Doctrinal",
    "Introducción al Derecho Penal",
    "Bases del Derecho Administrativo",
    "Procedimientos Especiales y Recursos Civiles",
    "Optativo de Formación Profesional I"
  ],
  "Semestre 6": [
    "Contratos",
    "Teoría del Delito",
    "Derecho Tributario",
    "Control y Responsabilidad de la Administración",
    "Regulaciones Ambientales y de Recursos Naturales",
    "Redacción de Instrumentos Administrativos",
    "Optativo de Formación Profesional II"
  ],
  "Semestre 7": [
    "Redacción de Contratos",
    "Derecho Individual del Trabajo",
    "Responsabilidad Civil",
    "Delitos",
    "Mercados Regulados",
    "Proceso Penal",
    "Optativo de Formación III"
  ],
  "Semestre 8": [
    "Resolución de Conflictos del Trabajo",
    "Títulos de Crédito e Insolvencia",
    "Derecho y Procedimientos de Familia",
    "Derecho y Procedimientos de Consumo",
    "Informe Jurídico",
    "Litigación Penal",
    "Optativo de Formación Profesional IV"
  ],
  "Semestre 9": [
    "Ética y Responsabilidad Profesional",
    "Derecho Sucesorio",
    "Pasantía Profesional",
    "Litigación"
  ],
  "Semestre 10": [
    "Examen de Licenciatura"
  ]
};

const prerrequisitos = {
  "Razonamiento Jurídico": ["Sistema Jurídico"],
  "Derecho Constitucional Orgánico": ["Teoría Constitucional"],
  "Acto Jurídico": ["Conceptos Fundamentales del Derecho Privado"],
  "Análisis Jurisprudencional": ["Razonamiento Jurídico", "Comunicación Oral y Escrita"],
  "Derechos Fundamentales": ["Teoría Constitucional"],
  "Bienes": ["Acto Jurídico"],
  "Taller de Resolución de Casos Prácticos": ["Acto Jurídico"],
  "Derecho Internacional de los Derechos Humanos": ["Derechos Fundamentales"],
  "Derecho Económico": ["Economía"],
  "Derecho Procesal Constitucional": ["Jurisdicción"],
  "Derecho Societario": ["Conceptos Fundamentales del Derecho Privado"],
  "Obligaciones": ["Acto Jurídico"],
  "Análisis Doctrinal": ["Análisis Jurisprudencional"],
  "Introducción al Derecho Penal": ["Derechos Fundamentales"],
  "Bases del Derecho Administrativo": ["Derecho Constitucional Orgánico"],
  "Procedimientos Especiales y Recursos Civiles": ["Proceso Civil Ordinario"],
  "Contratos": ["Acto Jurídico"],
  "Teoría del Delito": ["Introducción al Derecho Penal"],
  "Derecho Tributario": ["Bases del Derecho Administrativo"],
  "Control y Responsabilidad de la Administración": ["Bases del Derecho Administrativo"],
  "Regulaciones Ambientales y de Recursos Naturales": ["Bases del Derecho Administrativo"],
  "Redacción de Instrumentos Administrativos": ["Bases del Derecho Administrativo", "Comunicación Oral y Escrita"],
  "Redacción de Contratos": ["Contratos", "Comunicación Oral y Escrita"],
  "Derecho Individual del Trabajo": ["Acto Jurídico"],
  "Responsabilidad Civil": ["Obligaciones"],
  "Delitos": ["Teoría del Delito"],
  "Mercados Regulados": ["Bases del Derecho Administrativo"],
  "Proceso Penal": ["Jurisdicción", "Teoría del Delito"],
  "Resolución de Conflictos del Trabajo": ["Derecho Individual del Trabajo", "Proceso Civil Ordinario"],
  "Títulos de Crédito e Insolvencia": ["Obligaciones"],
  "Derecho y Procedimientos de Familia": ["Obligaciones", "Proceso Civil Ordinario"],
  "Derecho y Procedimientos de Consumo": ["Proceso Civil Ordinario", "Responsabilidad Civil"],
  "Informe Jurídico": ["Análisis Doctrinal"],
  "Litigación Penal": ["Delitos", "Proceso Penal", "Comunicación Oral y Escrita"],
  "Ética y Responsabilidad Profesional": ["Proceso Penal", "Responsabilidad Civil"],
  "Derecho Sucesorio": ["Bienes"],
  "Pasantía Profesional": [
    "Derecho y Procedimientos de Consumo",
    "Derecho y Procedimientos de Familia",
    "Litigación Penal",
    "Resolución de Conflictos del Trabajo"
  ],
  "Litigación": [
    "Derecho y Procedimientos de Familia",
    "Litigación Penal",
    "Resolución de Conflictos del Trabajo"
  ],
  "Examen de Licenciatura": Object.values(malla).flat() // todos los ramos
};

const aprobados = new Set();

const container = document.getElementById("malla");
const elementosRamos = {}; // para acceder por nombre

function crearMalla() {
  Object.entries(malla).forEach(([semestre, ramos]) => {
    const col = document.createElement("div");
    col.classList.add("semestre");

    const title = document.createElement("h2");
    title.textContent = semestre;
    col.appendChild(title);

    ramos.forEach(ramo => {
      const div = document.createElement("div");
      div.classList.add("ramo");
      div.textContent = ramo;

      if (tienePrerrequisitos(ramo)) {
        div.classList.add("oculto");
      }

      div.addEventListener("click", () => {
        div.classList.toggle("aprobado");
        if (div.classList.contains("aprobado")) {
          aprobados.add(ramo);
        } else {
          aprobados.delete(ramo);
        }
        actualizarRamosVisibles();
      });

      col.appendChild(div);
      elementosRamos[ramo] = div;
    });

    container.appendChild(col);
  });

  actualizarRamosVisibles();
}

function tienePrerrequisitos(ramo) {
  return Array.isArray(prerrequisitos[ramo]) && prerrequisitos[ramo].length > 0;
}

function actualizarRamosVisibles() {
  Object.keys(elementosRamos).forEach(ramo => {
    const requisitos = prerrequisitos[ramo] || [];
    const visible = requisitos.every(r => aprobados.has(r));
    const elemento = elementosRamos[ramo];
    if (tienePrerrequisitos(ramo)) {
      elemento.classList.toggle("oculto", !visible);
    }
  });
}

crearMalla();
