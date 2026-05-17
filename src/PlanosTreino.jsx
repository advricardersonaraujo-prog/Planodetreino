import { useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "./supabaseClient";

const PLANOS_BASE = {
  adaptacao: {
    id: "adaptacao",
    nome: "ADAPTACAO",
    subtitulo: "Semanas 1-4 - Retorno progressivo",
    cor: "#22d3ee",
    corBg: "#083344",
    corBorder: "#0e7490",
    icon: "↻",
    descricao:
      "Reativacao neuromuscular apos pausa. Cargas moderadas (60-70% 1RM), foco em tecnica, amplitude total e reconexao mente-musculo. Volumes baixos para evitar overreaching.",
    parametros: { series: "3", reps: "12-15", descanso: "60s", intensidade: "60-70% 1RM" },
    dias: [
      {
        dia: "A",
        label: "Seg - Peito + Triceps",
        grupos: ["Peito", "Triceps"],
        exercicios: [
          { id: "a1", nome: "Supino Reto com Halteres", series: 3, reps: "12-15", carga: "", obs: "Foco em amplitude total, cotovelos a 45 graus" },
          { id: "a2", nome: "Supino Inclinado com Halteres", series: 3, reps: "12-15", carga: "", obs: "Angulo 30-45 graus, nao forcar ombro" },
          { id: "a3", nome: "Crucifixo na Polia (cross-over)", series: 3, reps: "15", carga: "", obs: "Amplitude controlada, sem travamento" },
          { id: "a4", nome: "Triceps Pulley (corda)", series: 3, reps: "15", carga: "", obs: "Cotovelo fixo, extensao completa" },
          { id: "a5", nome: "Triceps Testa com Halteres", series: 3, reps: "12", carga: "", obs: "Movimento lento na descida" },
        ],
      },
      {
        dia: "B",
        label: "Ter - Costas + Biceps",
        grupos: ["Costas", "Biceps"],
        exercicios: [
          { id: "b1", nome: "Puxada Frontal (pegada aberta)", series: 3, reps: "12-15", carga: "", obs: "Nao travar na extensao, retracao escapular" },
          { id: "b2", nome: "Remada Curvada com Barra", series: 3, reps: "12", carga: "", obs: "Coluna neutra, puxada no umbigo" },
          { id: "b3", nome: "Remada Cavalinho (unilateral)", series: 3, reps: "12", carga: "", obs: "Apoio firme, cotovelo proximo ao tronco" },
          { id: "b4", nome: "Rosca Direta com Barra", series: 3, reps: "12-15", carga: "", obs: "Sem balanco, cotovelo fixo" },
          { id: "b5", nome: "Rosca Martelo Alternada", series: 3, reps: "12", carga: "", obs: "Pronacao neutra, nao abrir cotovelo" },
        ],
      },
      {
        dia: "C",
        label: "Qui - Pernas",
        grupos: ["Pernas", "Gluteos"],
        exercicios: [
          { id: "c1", nome: "Agachamento Livre", series: 3, reps: "12-15", carga: "", obs: "Profundidade paralela, joelhos alinhados" },
          { id: "c2", nome: "Leg Press 45 graus", series: 3, reps: "15", carga: "", obs: "Nao travar joelhos, pes no centro" },
          { id: "c3", nome: "Cadeira Extensora", series: 3, reps: "15", carga: "", obs: "Contracao no topo, descer controlado" },
          { id: "c4", nome: "Cadeira Flexora", series: 3, reps: "15", carga: "", obs: "Quadril fixo no banco" },
          { id: "c5", nome: "Panturrilha em Pe (Smith)", series: 3, reps: "20", carga: "", obs: "Amplitude maxima, pausa no estiramento" },
        ],
      },
      {
        dia: "D",
        label: "Sex - Ombros + Abdomen",
        grupos: ["Ombros", "Abdomen"],
        exercicios: [
          { id: "d1", nome: "Desenvolvimento com Halteres", series: 3, reps: "12-15", carga: "", obs: "Nao hiperestender lombar" },
          { id: "d2", nome: "Elevacao Lateral com Halteres", series: 3, reps: "15", carga: "", obs: "Cotovelo levemente flexionado, sem balanco" },
          { id: "d3", nome: "Elevacao Frontal (polia baixa)", series: 3, reps: "12", carga: "", obs: "Ate altura dos ombros, controlado" },
          { id: "d4", nome: "Face Pull na Polia", series: 3, reps: "15", carga: "", obs: "Retracao escapular, maos na tempora" },
          { id: "d5", nome: "Prancha Frontal", series: 3, reps: "30-40s", carga: "", obs: "Quadril neutro, respiracao constante" },
          { id: "d6", nome: "Abdominal Crunch na Polia", series: 3, reps: "15", carga: "", obs: "Flexao de tronco, nao puxar com bracos" },
        ],
      },
    ],
  },
  manutencao: {
    id: "manutencao",
    nome: "MANUTENCAO",
    subtitulo: "Semanas 5-10 - Hipertrofia controlada",
    cor: "#a78bfa",
    corBg: "#2e1065",
    corBorder: "#7c3aed",
    icon: "◆",
    descricao:
      "Estimulo moderado-alto para manter e reconstruir massa magra. Progressao de carga semanal, tecnicas como drop-set introduzidas gradualmente. Deficit calorico leve permitido.",
    parametros: { series: "4", reps: "8-12", descanso: "75-90s", intensidade: "70-80% 1RM" },
    dias: [
      {
        dia: "A",
        label: "Seg - Peito + Triceps",
        grupos: ["Peito", "Triceps"],
        exercicios: [
          { id: "ma1", nome: "Supino Reto com Barra", series: 4, reps: "8-10", carga: "", obs: "Progressao de carga semanal obrigatoria" },
          { id: "ma2", nome: "Supino Inclinado com Halteres", series: 4, reps: "10-12", carga: "", obs: "Ultima serie drop-set a partir da semana 7" },
          { id: "ma3", nome: "Crossover (polia alta)", series: 3, reps: "12", carga: "", obs: "Cruzar na frente, squeeze no pico" },
          { id: "ma4", nome: "Mergulho (paralelas com carga)", series: 4, reps: "8-10", carga: "", obs: "Peso extra no cinto se necessario" },
          { id: "ma5", nome: "Triceps Frances com Haltere", series: 3, reps: "10-12", carga: "", obs: "Extensao unilateral, cotovelo vertical" },
        ],
      },
      {
        dia: "B",
        label: "Ter - Costas + Biceps",
        grupos: ["Costas", "Biceps"],
        exercicios: [
          { id: "mb1", nome: "Barra Fixa com Carga", series: 4, reps: "6-8", carga: "", obs: "Pegada pronada, amplitude total" },
          { id: "mb2", nome: "Remada Curvada com Barra", series: 4, reps: "8-10", carga: "", obs: "Progressao linear semanal" },
          { id: "mb3", nome: "Serrote com Halter (unilateral)", series: 3, reps: "10-12", carga: "", obs: "Cotovelo ultrapassando o tronco" },
          { id: "mb4", nome: "Puxada Pegada Neutra (triangulo)", series: 3, reps: "10-12", carga: "", obs: "Cotovelos puxados para o quadril" },
          { id: "mb5", nome: "Rosca Scott com Barra EZ", series: 4, reps: "8-10", carga: "", obs: "Pico de contracao, descer lento" },
          { id: "mb6", nome: "Rosca Concentrada", series: 3, reps: "12", carga: "", obs: "Isolamento total, sem compensacao" },
        ],
      },
      {
        dia: "C",
        label: "Qui - Pernas",
        grupos: ["Pernas", "Gluteos"],
        exercicios: [
          { id: "mc1", nome: "Agachamento Livre", series: 4, reps: "6-8", carga: "", obs: "Carga principal do treino - progressao obrigatoria" },
          { id: "mc2", nome: "Leg Press 45 graus", series: 4, reps: "10-12", carga: "", obs: "Posicao alta para gluteo, baixa para quad" },
          { id: "mc3", nome: "Stiff com Barra", series: 4, reps: "8-10", carga: "", obs: "Joelhos levemente flexionados, lombar neutra" },
          { id: "mc4", nome: "Afundo com Halteres (passadas)", series: 3, reps: "12 cada", carga: "", obs: "Joelho traseiro quase no chao" },
          { id: "mc5", nome: "Panturrilha Sentado", series: 4, reps: "15-20", carga: "", obs: "Soleus - joelho flexionado isola o musculo" },
        ],
      },
      {
        dia: "D",
        label: "Sex - Ombros + Abs + Cardio",
        grupos: ["Ombros", "Abdomen"],
        exercicios: [
          { id: "md1", nome: "Desenvolvimento Arnold", series: 4, reps: "8-10", carga: "", obs: "Rotacao completa, recrutamento de deltoide anterior e medial" },
          { id: "md2", nome: "Elevacao Lateral na Maquina", series: 4, reps: "12-15", carga: "", obs: "Maquina isola melhor que halter para hipertrofia" },
          { id: "md3", nome: "Encolhimento de Ombros com Halteres", series: 3, reps: "12-15", carga: "", obs: "Trapezio superior, pausa no topo" },
          { id: "md4", nome: "Face Pull com Corda", series: 3, reps: "15", carga: "", obs: "Saude do manguito rotador - nao negligenciar" },
          { id: "md5", nome: "Abdominal Reto (polia alta)", series: 4, reps: "12-15", carga: "", obs: "Flexao de tronco pura" },
          { id: "md6", nome: "Obliquo na Polia (unilateral)", series: 3, reps: "15 cada", carga: "", obs: "Rotacao de tronco controlada" },
        ],
      },
    ],
  },
  queima: {
    id: "queima",
    nome: "QUEIMA",
    subtitulo: "Semanas 11-16 - Definicao + Lipolise",
    cor: "#f97316",
    corBg: "#431407",
    corBorder: "#c2410c",
    icon: "▲",
    descricao:
      "Alto volume, menor descanso, cardio HIIT integrado. Manter carga para preservar massa. Supersets e trisets para elevar EPOC. Deficit calorico moderado (300-500 kcal).",
    parametros: { series: "4-5", reps: "12-20", descanso: "30-45s", intensidade: "65-75% 1RM + tecnicas avancadas" },
    dias: [
      {
        dia: "A",
        label: "Seg - Peito + Triceps (Superset)",
        grupos: ["Peito", "Triceps"],
        exercicios: [
          { id: "qa1", nome: "SUPERSET: Supino Reto + Triceps Pulley", series: 4, reps: "12 + 15", carga: "", obs: "Sem descanso entre os dois; 45s apos o par" },
          { id: "qa2", nome: "SUPERSET: Crucifixo Inclinado + Mergulho", series: 4, reps: "12 + falha", carga: "", obs: "Falha controlada nas paralelas" },
          { id: "qa3", nome: "Crossover Baixo -> Alto (bi-direcional)", series: 3, reps: "15 cada direcao", carga: "", obs: "Continuo sem parar entre direcoes" },
          { id: "qa4", nome: "Flexao de Braco (fechada - triceps)", series: 3, reps: "maximo", carga: "", obs: "Ate falha, ritmo controlado" },
          { id: "qa5", nome: "HIIT - Corda ou Bike", series: 1, reps: "10 min", carga: "", obs: "20s sprint / 40s moderado x 10 ciclos" },
        ],
      },
      {
        dia: "B",
        label: "Ter - Costas + Biceps (Superset)",
        grupos: ["Costas", "Biceps"],
        exercicios: [
          { id: "qb1", nome: "SUPERSET: Puxada Frontal + Rosca Direta", series: 4, reps: "12 + 12", carga: "", obs: "Sem descanso entre os dois" },
          { id: "qb2", nome: "SUPERSET: Remada Curvada + Rosca Martelo", series: 4, reps: "10 + 12", carga: "", obs: "Manter forma na fadiga - reduzir carga se necessario" },
          { id: "qb3", nome: "Pullover na Polia (reto)", series: 3, reps: "15", carga: "", obs: "Grande dorsal - cotovelo fixo levemente flexionado" },
          { id: "qb4", nome: "Rosca 21s com Barra EZ", series: 3, reps: "21 (7+7+7)", carga: "", obs: "7 meios movimentos baixos + 7 altos + 7 completos" },
          { id: "qb5", nome: "HIIT - Eliptico", series: 1, reps: "10 min", carga: "", obs: "Nivel alto / baixo alternados a cada 30s" },
        ],
      },
      {
        dia: "C",
        label: "Qui - Pernas Completo (Triset)",
        grupos: ["Pernas", "Gluteos"],
        exercicios: [
          { id: "qc1", nome: "TRISET: Agachamento + Cadeira Ext. + Leg Press", series: 4, reps: "10 + 12 + 15", carga: "", obs: "Triset sem descanso - devastador para quad" },
          { id: "qc2", nome: "SUPERSET: Stiff + Cadeira Flexora", series: 4, reps: "10 + 12", carga: "", obs: "Posterior da coxa - isquiotibiais e gluteo" },
          { id: "qc3", nome: "Afundo com Salto (plyometrico)", series: 3, reps: "10 cada", carga: "", obs: "Explosao no salto, aterrissagem suave" },
          { id: "qc4", nome: "Panturrilha em Pe (drop-set)", series: 3, reps: "15+15+15", carga: "", obs: "3 quedas de carga seguidas sem parar" },
          { id: "qc5", nome: "HIIT - Esteira Inclinada", series: 1, reps: "12 min", carga: "", obs: "Inclinacao 8-12%, alternar caminhada rapida e corrida" },
        ],
      },
      {
        dia: "D",
        label: "Sex - Ombros + Core + HIIT Final",
        grupos: ["Ombros", "Abdomen"],
        exercicios: [
          { id: "qd1", nome: "SUPERSET: Desenvolvimento + Elevacao Lateral", series: 4, reps: "10 + 15", carga: "", obs: "Pre-exaustao do medial antes do desenvolvimento" },
          { id: "qd2", nome: "SUPERSET: Face Pull + Elevacao Frontal", series: 3, reps: "15 + 12", carga: "", obs: "Equilibrio anterior-posterior do ombro" },
          { id: "qd3", nome: "TRISET: Prancha + Crunch + Obliquo", series: 4, reps: "30s + 15 + 15", carga: "", obs: "Core completo sem pausa" },
          { id: "qd4", nome: "Mountain Climber", series: 3, reps: "30s", carga: "", obs: "Cardio + core simultaneo, ritmo alto" },
          { id: "qd5", nome: "HIIT Final - Burpee ou Bike", series: 1, reps: "15 min", carga: "", obs: "Ultimo esforco da semana - maxima intensidade" },
        ],
      },
    ],
  },
};

const STORAGE_KEY = "planos_treino_v2";
const HISTORY_KEY = "planos_treino_historico_v1";
const DEFAULT_REST_SECONDS = 50;
const CARDIO_OPTIONS = [
  "Esteira - caminhada inclinada",
  "Esteira - corrida",
  "Bike ergometrica",
  "Eliptico",
  "Remo",
  "Escada / simulador",
  "Corda",
  "HIIT livre",
];
const CARDIO_EMPTY = { tipo: CARDIO_OPTIONS[0], minutos: "", distancia: "", intensidade: "", obs: "" };
const WEEK_LABELS = [
  { dia: "A", prefix: "Dom", nome: "Domingo" },
  { dia: "B", prefix: "Seg", nome: "Segunda" },
  { dia: "C", prefix: "Ter", nome: "Terca" },
  { dia: "D", prefix: "Qua", nome: "Quarta" },
];

function cloneBase() {
  return JSON.parse(JSON.stringify(PLANOS_BASE));
}

function getExtraDay(planoId) {
  const extras = {
    adaptacao: {
      dia: "E",
      label: "Sex - Full Body + Cardio leve",
      grupos: ["Full Body", "Cardio"],
      exercicios: [
        { id: "e1", nome: "Circuito Tecnico Full Body", series: 3, reps: "12 cada", carga: "", cargaNotas: "", obs: "Agachamento goblet, remada baixa e flexao inclinada com tecnica limpa" },
        { id: "e2", nome: "Mobilidade de Quadril e Ombros", series: 3, reps: "40s", carga: "", cargaNotas: "", obs: "Amplitude confortavel, sem dor articular" },
        { id: "e3", nome: "Cardio Zona 2", series: 1, reps: "20 min", carga: "", cargaNotas: "", obs: "Ritmo sustentavel, respiracao controlada" },
      ],
    },
    manutencao: {
      dia: "E",
      label: "Sex - Full Body + Pontos fracos",
      grupos: ["Full Body", "Cardio"],
      exercicios: [
        { id: "me1", nome: "Levantamento Terra Romeno", series: 4, reps: "8-10", carga: "", cargaNotas: "", obs: "Posterior e gluteo, coluna neutra" },
        { id: "me2", nome: "Supino Fechado ou Flexao com Carga", series: 3, reps: "10-12", carga: "", cargaNotas: "", obs: "Triceps e peitoral, sem perder controle escapular" },
        { id: "me3", nome: "Remada Baixa Neutra", series: 3, reps: "10-12", carga: "", cargaNotas: "", obs: "Puxar cotovelos para tras, pausa curta na contracao" },
        { id: "me4", nome: "Cardio Moderado", series: 1, reps: "15 min", carga: "", cargaNotas: "", obs: "Bike, esteira ou eliptico em ritmo controlado" },
      ],
    },
    queima: {
      dia: "E",
      label: "Sex - Metabolico + Core",
      grupos: ["Full Body", "Abdomen"],
      exercicios: [
        { id: "qe1", nome: "Circuito Metabolico: Remo + Agacho + Push Press", series: 4, reps: "12 + 12 + 10", carga: "", cargaNotas: "", obs: "Descanso curto, manter forma mesmo em fadiga" },
        { id: "qe2", nome: "Farmer Walk", series: 4, reps: "40m", carga: "", cargaNotas: "", obs: "Tronco firme, passos curtos e controlados" },
        { id: "qe3", nome: "Core Anti-rotacao na Polia", series: 3, reps: "12 cada", carga: "", cargaNotas: "", obs: "Pallof press, segurar 1s na extensao" },
        { id: "qe4", nome: "HIIT Bike", series: 1, reps: "12 min", carga: "", cargaNotas: "", obs: "30s forte / 60s leve" },
      ],
    },
  };

  return JSON.parse(JSON.stringify(extras[planoId] || extras.adaptacao));
}

function normalizePlanos(data) {
  const planos = JSON.parse(JSON.stringify(data || PLANOS_BASE));

  Object.values(planos).forEach((plano) => {
    plano.parametros = { ...plano.parametros, descanso: "50s" };
    plano.dias = Array.isArray(plano.dias) ? plano.dias : [];

    WEEK_LABELS.forEach((week, index) => {
      if (!plano.dias[index]) return;
      const parts = String(plano.dias[index].label || "").split(" - ");
      const treino = parts[1] || plano.dias[index].label || `Treino ${week.dia}`;
      plano.dias[index].dia = week.dia;
      plano.dias[index].label = `${week.prefix} - ${treino}`;
    });

    if (!plano.dias.some((dia) => dia.dia === "E")) {
      plano.dias.push(getExtraDay(plano.id));
    }

    plano.dias.forEach((dia) => {
      dia.exercicios = (dia.exercicios || []).map((ex) => ({
        cargaNotas: "",
        ...ex,
      }));
    });
  });

  return planos;
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return normalizePlanos(raw ? JSON.parse(raw) : cloneBase());
  } catch {
    return normalizePlanos(cloneBase());
  }
}

function save(d) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
  } catch {
    // localStorage may be unavailable in restricted browser contexts.
  }
}

function loadHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveHistory(history) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {
    // localStorage may be unavailable in restricted browser contexts.
  }
}

function secondsFromRest(rest) {
  const values = String(rest).match(/\d+/g)?.map(Number) || [];
  return values.length ? Math.max(...values) : DEFAULT_REST_SECONDS;
}

function formatSeconds(total) {
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function formatDateTime(value) {
  try {
    return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(value));
  } catch {
    return value;
  }
}

function mergeHistory(localHistory, remoteHistory) {
  const byId = new Map();
  [...remoteHistory, ...localHistory].forEach((item) => {
    if (item?.id) byId.set(item.id, item);
  });

  return Array.from(byId.values())
    .sort((a, b) => new Date(b.startedAt || b.created_at || 0).getTime() - new Date(a.startedAt || a.created_at || 0).getTime())
    .slice(0, 120);
}

export default function PlanosTreino() {
  const [planos, setPlanos] = useState(load);
  const [planoAtivo, setPlanoAtivo] = useState("adaptacao");
  const [diaAberto, setDiaAberto] = useState(null);
  const [editando, setEditando] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [tab, setTab] = useState("planos");
  const [aiInput, setAiInput] = useState("");
  const [aiMessages, setAiMessages] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [treinoSessao, setTreinoSessao] = useState(null);
  const [historico, setHistorico] = useState(loadHistory);
  const [cardioForm, setCardioForm] = useState(CARDIO_EMPTY);
  const [authEmail, setAuthEmail] = useState("");
  const [authUser, setAuthUser] = useState(null);
  const [syncStatus, setSyncStatus] = useState(isSupabaseConfigured ? "Entre para sincronizar" : "Sync nao configurado");
  const [syncLoading, setSyncLoading] = useState(false);
  const [seriesConcluidas, setSeriesConcluidas] = useState({});
  const [timerX, setTimerX] = useState(12);
  const [timerDrag, setTimerDrag] = useState(null);
  const [timerMinimizado, setTimerMinimizado] = useState(false);
  const [sessionNow, setSessionNow] = useState(Date.now());
  const [timer, setTimer] = useState({
    duration: DEFAULT_REST_SECONDS,
    remaining: DEFAULT_REST_SECONDS,
    running: false,
    label: "Descanso",
    targetKey: null,
    autoCompletePending: false,
  });

  const persist = (updated) => {
    const normalized = normalizePlanos(updated);
    setPlanos(normalized);
    save(normalized);
  };

  const plano = planos[planoAtivo];
  const descansoPadrao = DEFAULT_REST_SECONDS;
  const timerPercent = timer.duration ? Math.max(0, Math.min(100, (timer.remaining / timer.duration) * 100)) : 0;
  const treinoAtivo = Boolean(treinoSessao);
  const activeDayKey = treinoSessao ? `${treinoSessao.planoId}:${treinoSessao.diaIdx}` : null;
  const treinoDuracaoMin = treinoSessao ? Math.max(0, Math.round((sessionNow - new Date(treinoSessao.startedAt).getTime()) / 60000)) : 0;

  const exerciseKey = (planoId, diaIdx, exIdx) => `${planoId}:${diaIdx}:${exIdx}`;
  const dayKey = (planoId, diaIdx) => `${planoId}:${diaIdx}`;

  const getCompletedSeries = (key) => seriesConcluidas[key] || 0;

  const persistHistory = (updated) => {
    const merged = mergeHistory(updated, []);
    setHistorico(merged);
    saveHistory(merged);
  };

  const completeSeries = (key, maxSeries = 99) => {
    if (!key) return;
    setSeriesConcluidas((current) => ({
      ...current,
      [key]: Math.min(maxSeries, (current[key] || 0) + 1),
    }));
  };

  const updateExercicioField = (planoId, diaIdx, exIdx, field, value) => {
    const updated = JSON.parse(JSON.stringify(planos));
    updated[planoId].dias[diaIdx].exercicios[exIdx][field] = value;
    persist(updated);
  };

  useEffect(() => {
    if (!timer.running) return undefined;

    const interval = window.setInterval(() => {
      setTimer((current) => {
        if (current.remaining <= 1) {
          return { ...current, remaining: 0, running: false, autoCompletePending: Boolean(current.targetKey) };
        }

        return { ...current, remaining: current.remaining - 1 };
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [timer.running]);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return undefined;

    supabase.auth.getSession().then(({ data }) => {
      setAuthUser(data.session?.user || null);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthUser(session?.user || null);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!treinoSessao) return undefined;

    const interval = window.setInterval(() => {
      setSessionNow(Date.now());
    }, 30000);

    return () => window.clearInterval(interval);
  }, [treinoSessao]);

  useEffect(() => {
    if (!authUser) return;
    syncHistoryFromCloud(authUser);
  }, [authUser]);

  useEffect(() => {
    if (!timer.autoCompletePending || !timer.targetKey) return;
    const [, diaIdx, exIdx] = timer.targetKey.split(":");
    const ex = plano.dias[Number(diaIdx)]?.exercicios[Number(exIdx)];
    completeSeries(timer.targetKey, Number(ex?.series) || 99);
    setTimer((current) => ({ ...current, autoCompletePending: false }));
  }, [timer.autoCompletePending, timer.targetKey, plano.dias]);

  useEffect(() => {
    if (!timerDrag) return undefined;

    const move = (event) => {
      const panelWidth = 320;
      const maxX = Math.max(12, window.innerWidth - panelWidth - 12);
      const nextX = timerDrag.startX + event.clientX - timerDrag.pointerX;
      setTimerX(Math.max(12, Math.min(maxX, nextX)));
    };

    const stop = () => setTimerDrag(null);

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", stop);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", stop);
    };
  }, [timerDrag]);

  const startTimer = (seconds = descansoPadrao, label = "Descanso", targetKey = null) => {
    setTimerMinimizado(false);
    setTimer({
      duration: seconds,
      remaining: seconds,
      running: true,
      label,
      targetKey,
      autoCompletePending: false,
    });
  };

  const suggestRestTimer = (label = "Descanso sugerido", targetKey = null) => {
    setTimerMinimizado(false);
    setTimer({
      duration: descansoPadrao,
      remaining: descansoPadrao,
      running: false,
      label,
      targetKey,
      autoCompletePending: false,
    });
  };

  const iniciarTreinoDia = (diaIdx) => {
    if (treinoSessao && activeDayKey !== dayKey(planoAtivo, diaIdx)) {
      window.alert("Ja existe um treino em andamento. Encerre o treino atual antes de iniciar outro dia.");
      return;
    }

    setTreinoSessao({
      planoId: planoAtivo,
      diaIdx,
      startedAt: new Date().toISOString(),
      cardio: [],
    });
    setSessionNow(Date.now());
    setSeriesConcluidas({});
    setDiaAberto(diaIdx);
    suggestRestTimer(`Descanso sugerido - Dia ${plano.dias[diaIdx]?.dia || ""}`);
  };

  const encerrarTreino = () => {
    if (!treinoSessao) return;

    const sessaoPlano = planos[treinoSessao.planoId];
    const sessaoDia = sessaoPlano?.dias[treinoSessao.diaIdx];
    const finishedAt = new Date().toISOString();
    const duracaoMin = Math.max(1, Math.round((new Date(finishedAt).getTime() - new Date(treinoSessao.startedAt).getTime()) / 60000));
    const registro = {
      id: `treino_${Date.now()}`,
      startedAt: treinoSessao.startedAt,
      finishedAt,
      duracaoMin,
      planoId: treinoSessao.planoId,
      planoNome: sessaoPlano?.nome || "",
      dia: sessaoDia?.dia || "",
      diaLabel: sessaoDia?.label || "",
      series: { ...seriesConcluidas },
      cardio: treinoSessao.cardio || [],
      exercicios: (sessaoDia?.exercicios || []).map((ex, exIdx) => ({
        id: ex.id,
        nome: ex.nome,
        series: ex.series,
        reps: ex.reps,
        carga: ex.carga || "",
        cargaNotas: ex.cargaNotas || "",
        feitas: seriesConcluidas[exerciseKey(treinoSessao.planoId, treinoSessao.diaIdx, exIdx)] || 0,
      })),
    };

    const updatedHistory = [registro, ...historico].slice(0, 120);
    persistHistory(updatedHistory);
    if (authUser) {
      syncHistoryToCloud(updatedHistory, authUser)
        .then(() => setSyncStatus(`Sincronizado: ${updatedHistory.length} registros`))
        .catch((error) => {
          console.error("Erro ao enviar treino:", error);
          setSyncStatus("Treino salvo localmente; sync pendente");
        });
    }
    setTreinoSessao(null);
    setTimer((current) => ({ ...current, running: false }));
    setTab("historico");
  };

  const registrarCardio = () => {
    if (!treinoSessao) return;
    const minutos = Number(cardioForm.minutos);
    if (!cardioForm.tipo || !minutos || minutos <= 0) {
      window.alert("Informe o tipo de cardio e o tempo em minutos.");
      return;
    }

    const item = {
      id: `cardio_${Date.now()}`,
      tipo: cardioForm.tipo,
      minutos,
      distancia: cardioForm.distancia,
      intensidade: cardioForm.intensidade,
      obs: cardioForm.obs,
      registradoEm: new Date().toISOString(),
    };

    setTreinoSessao((current) => ({ ...current, cardio: [...(current?.cardio || []), item] }));
    setCardioForm(CARDIO_EMPTY);
  };

  const toggleTimer = () => {
    if (timer.remaining === 0) {
      startTimer(timer.duration || descansoPadrao, timer.label, timer.targetKey);
      return;
    }

    setTimer((current) => ({ ...current, running: !current.running }));
  };

  const adjustTimer = (delta) => {
    setTimer((current) => {
      const nextRemaining = Math.max(0, current.remaining + delta);
      const nextDuration = Math.max(current.duration, nextRemaining);
      return { ...current, remaining: nextRemaining, duration: nextDuration, running: nextRemaining > 0 && current.running };
    });
  };

  const syncHistoryToCloud = async (items = historico, user = authUser) => {
    if (!isSupabaseConfigured || !supabase || !user) return;
    if (!items.length) return;

    const rows = items.map((item) => ({
      id: item.id,
      user_id: user.id,
      started_at: item.startedAt,
      finished_at: item.finishedAt || null,
      payload: item,
      updated_at: new Date().toISOString(),
    }));

    const { error } = await supabase.from("workout_history").upsert(rows, { onConflict: "id" });
    if (error) throw error;
  };

  const syncHistoryFromCloud = async (user = authUser) => {
    if (!isSupabaseConfigured || !supabase || !user) return;

    setSyncLoading(true);
    setSyncStatus("Sincronizando...");
    try {
      const { data, error } = await supabase
        .from("workout_history")
        .select("payload")
        .order("started_at", { ascending: false })
        .limit(120);

      if (error) throw error;

      const remoteHistory = (data || []).map((row) => row.payload).filter(Boolean);
      const merged = mergeHistory(historico, remoteHistory);
      persistHistory(merged);
      await syncHistoryToCloud(merged, user);
      setSyncStatus(`Sincronizado: ${merged.length} registros`);
    } catch (error) {
      console.error("Erro ao sincronizar historico:", error);
      setSyncStatus("Erro ao sincronizar");
    } finally {
      setSyncLoading(false);
    }
  };

  const enviarLinkLogin = async () => {
    if (!isSupabaseConfigured || !supabase) {
      window.alert("Configure o Supabase no Vercel antes de ativar o login.");
      return;
    }

    if (!authEmail.trim()) {
      window.alert("Informe seu e-mail para receber o link de acesso.");
      return;
    }

    setSyncLoading(true);
    setSyncStatus("Enviando link de acesso...");
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: authEmail.trim(),
        options: {
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) throw error;
      setSyncStatus("Link enviado. Abra o e-mail neste aparelho para entrar.");
    } catch (error) {
      console.error("Erro no login:", error);
      setSyncStatus("Nao foi possivel enviar o link");
    } finally {
      setSyncLoading(false);
    }
  };

  const sairDaConta = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setAuthUser(null);
    setSyncStatus("Entre para sincronizar");
  };

  const startEdit = (planoId, diaIdx, exIdx) => {
    const ex = planos[planoId].dias[diaIdx].exercicios[exIdx];
    setEditForm({ ...ex });
    setEditando({ planoId, diaIdx, exIdx });
  };

  const saveEdit = () => {
    if (!editando) return;
    const { planoId, diaIdx, exIdx } = editando;
    const updated = JSON.parse(JSON.stringify(planos));
    updated[planoId].dias[diaIdx].exercicios[exIdx] = { ...editForm };
    persist(updated);
    setEditando(null);
  };

  const addExercicio = (planoId, diaIdx) => {
    const updated = JSON.parse(JSON.stringify(planos));
    updated[planoId].dias[diaIdx].exercicios.push({
      id: `custom_${Date.now()}`,
      nome: "Novo exercicio",
      series: 3,
      reps: "12",
      carga: "",
      cargaNotas: "",
      obs: "",
    });
    persist(updated);
  };

  const removeExercicio = (planoId, diaIdx, exIdx) => {
    const updated = JSON.parse(JSON.stringify(planos));
    updated[planoId].dias[diaIdx].exercicios.splice(exIdx, 1);
    persist(updated);
  };

  const resetPlano = (planoId) => {
    const updated = JSON.parse(JSON.stringify(planos));
    updated[planoId] = normalizePlanos({ [planoId]: PLANOS_BASE[planoId] })[planoId];
    persist(updated);
  };

  const askAI = async (msg) => {
    const userMsg = msg || aiInput.trim();
    if (!userMsg) return;
    const newMessages = [...aiMessages, { role: "user", text: userMsg }];
    setAiMessages(newMessages);
    setAiInput("");
    setAiLoading(true);

    const planoResumo = Object.values(planos).map((pl) => ({
      plano: pl.nome,
      fase: pl.subtitulo,
      dias: pl.dias.map((d) => ({
        dia: d.label,
        exercicios: d.exercicios.map((e) => `${e.nome} ${e.series}x${e.reps}${e.carga ? ` ${e.carga}` : ""}`),
      })),
    }));

    const reply = `✅ Boa pergunta. Para este app local, estou usando uma resposta offline porque chamadas diretas para APIs de IA no navegador precisam de uma chave protegida no servidor.\n\nPlano ativo: ${plano.nome}\nFase: ${plano.subtitulo}\n\n⚡ Use progressao conservadora: aumente carga apenas quando completar todas as series com tecnica limpa.\n⚠️ Se dor articular aparecer, reduza carga ou amplitude e priorize execucao.`;

    console.info("Resumo enviado ao coach offline:", planoResumo);
    await new Promise((resolve) => setTimeout(resolve, 450));
    setAiMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    setAiLoading(false);
  };

  const p = plano;

  const S = {
    app: {
      minHeight: "100vh",
      background: "#080c14",
      color: "#e2e8f0",
      fontFamily: "Arial, Helvetica, sans-serif",
      paddingBottom: 270,
      fontSize: 17,
    },
    header: {
      background: `linear-gradient(160deg, ${p.corBg} 0%, #0d1117 60%)`,
      padding: "20px 16px 14px",
      borderBottom: `1px solid ${p.corBorder}33`,
      transition: "background 0.4s",
    },
    pill: (cor) => ({
      display: "inline-block",
      background: `${cor}22`,
      color: cor,
      border: `1px solid ${cor}44`,
      borderRadius: 20,
      padding: "5px 14px",
      fontSize: 14,
      letterSpacing: 2,
      textTransform: "uppercase",
      marginBottom: 6,
    }),
    card: {
      background: "#0d1117",
      border: "1px solid #1e2938",
      borderRadius: 8,
      padding: 14,
      marginBottom: 10,
    },
    diaCard: (aberto) => ({
      background: aberto ? `${p.corBg}88` : "#0d1117",
      border: `1px solid ${aberto ? p.corBorder : "#1e2938"}`,
      borderRadius: 8,
      marginBottom: 10,
      overflow: "hidden",
      transition: "all 0.3s",
    }),
    diaHeader: {
      padding: "16px 16px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      cursor: "pointer",
      gap: 10,
    },
    exRow: {
      padding: "14px 16px 14px 12px",
      borderTop: "1px solid #1e293822",
      display: "flex",
      gap: 10,
      alignItems: "flex-start",
    },
    badge: (cor) => ({
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: `${cor}22`,
      color: cor,
      border: `1px solid ${cor}44`,
      borderRadius: 6,
      padding: "4px 10px",
      fontSize: 14,
      fontWeight: 700,
      whiteSpace: "nowrap",
    }),
    btn: (cor) => ({
      background: cor,
      color: "#fff",
      border: "none",
      borderRadius: 8,
      padding: "13px 18px",
      fontWeight: 700,
      fontSize: 15,
      letterSpacing: 1,
      cursor: "pointer",
      fontFamily: "inherit",
    }),
    btnGhost: {
      background: "none",
      color: "#64748b",
      border: "1px solid #1e2938",
      borderRadius: 6,
      padding: "8px 12px",
      fontSize: 14,
      cursor: "pointer",
      fontFamily: "inherit",
    },
    input: {
      background: "#161b27",
      border: "1px solid #2d3748",
      borderRadius: 8,
      padding: "12px 14px",
      color: "#e2e8f0",
      fontSize: 16,
      width: "100%",
      boxSizing: "border-box",
      fontFamily: "inherit",
      outline: "none",
    },
    label: {
      fontSize: 13,
      color: "#64748b",
      letterSpacing: 2,
      textTransform: "uppercase",
      marginBottom: 6,
      display: "block",
    },
    navBtn: (active, cor) => ({
      flex: 1,
      padding: "12px 4px",
      border: "none",
      background: "none",
      color: active ? cor : "#64748b",
      fontSize: 12,
      letterSpacing: 1,
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 3,
      borderTop: active ? `2px solid ${cor}` : "2px solid transparent",
      transition: "all 0.2s",
    }),
    timerPanel: {
      position: "fixed",
      left: timerX,
      bottom: 76,
      zIndex: 90,
      width: "min(320px, calc(100vw - 24px))",
      background: "#0d1117f2",
      border: `1px solid ${timer.remaining === 0 ? "#34d399" : p.corBorder}`,
      borderRadius: 8,
      padding: 12,
      boxShadow: "0 14px 40px #00000066",
      backdropFilter: "blur(10px)",
    },
    timerBtn: {
      background: "#111827",
      color: "#e2e8f0",
      border: "1px solid #243044",
      borderRadius: 6,
      padding: "8px 10px",
      fontSize: 13,
      cursor: "pointer",
      fontFamily: "inherit",
      fontWeight: 700,
    },
  };

  return (
    <div style={S.app}>
      <style>{`* { box-sizing: border-box; -webkit-tap-highlight-color: transparent; } body { margin: 0; background: #080c14; font-family: Arial, Helvetica, sans-serif; } button, input, textarea { font-family: Arial, Helvetica, sans-serif; } button:disabled { cursor: wait; } ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #080c14; } ::-webkit-scrollbar-thumb { background: #1e2938; border-radius: 4px; } @keyframes pulse { 0%,100%{opacity:0.3;transform:scale(0.8)} 50%{opacity:1;transform:scale(1)} }`}</style>

      <div style={S.header}>
        <span style={S.pill(p.cor)}>
          {p.icon} {p.nome}
        </span>
        <h1 style={{ margin: 0, fontSize: 29, fontWeight: 700, color: "#f8fafc" }}>Planos de Treino</h1>
        <p style={{ margin: "4px 0 0", fontSize: 15, color: "#94a3b8" }}>{p.subtitulo}</p>
      </div>

      <div style={{ padding: "12px 16px 0", display: "flex", gap: 8 }}>
        {Object.values(planos).map((pl) => (
          <button
            key={pl.id}
            style={{
              flex: 1,
              padding: "12px 4px",
              background: planoAtivo === pl.id ? `${pl.cor}22` : "#0d1117",
              border: `1px solid ${planoAtivo === pl.id ? pl.cor : "#1e2938"}`,
              borderRadius: 8,
              color: planoAtivo === pl.id ? pl.cor : "#64748b",
              fontSize: 12,
              letterSpacing: 1,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.2s",
            }}
            onClick={() => {
              setPlanoAtivo(pl.id);
              setDiaAberto(null);
            }}
          >
            <div style={{ fontSize: 22, marginBottom: 4 }}>{pl.icon}</div>
            {pl.nome}
          </button>
        ))}
      </div>

      <div style={{ padding: "12px 16px 0", display: "flex", gap: 6 }}>
        {[
          ["planos", "Exercicios"],
          ["cronograma", "Cronograma"],
          ["historico", "Historico"],
        ].map(([id, label]) => (
          <button
            key={id}
            style={{
              padding: "9px 16px",
              borderRadius: 20,
              background: tab === id ? `${p.cor}22` : "none",
              border: `1px solid ${tab === id ? p.cor : "#1e2938"}`,
              color: tab === id ? p.cor : "#64748b",
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "inherit",
              letterSpacing: 1,
            }}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
        <button
          style={{ ...S.btnGhost, marginLeft: "auto", fontSize: 13 }}
          onClick={() => {
            if (window.confirm("Resetar este plano para o padrao?")) resetPlano(planoAtivo);
          }}
        >
          Reset
        </button>
      </div>

      {tab === "planos" && (
        <div style={{ padding: "12px 16px 0" }}>
          <div style={{ ...S.card, borderLeft: `3px solid ${p.cor}` }}>
            <p style={{ margin: "0 0 10px", fontSize: 14, color: "#94a3b8", lineHeight: 1.6 }}>{p.descricao}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {Object.entries(p.parametros).map(([k, v]) => (
                <span key={k} style={S.badge(p.cor)}>
                  {k}: {v}
                </span>
              ))}
            </div>
            <button style={{ ...S.btn(p.corBorder), width: "100%", marginTop: 12 }} onClick={() => startTimer(descansoPadrao, `Descanso ${p.nome}`)}>
              Iniciar descanso padrao - {formatSeconds(descansoPadrao)}
            </button>
          </div>

          {p.dias.map((dia, diaIdx) => (
            <div key={dia.dia} style={S.diaCard(diaAberto === diaIdx)}>
              <div style={S.diaHeader} onClick={() => setDiaAberto(diaAberto === diaIdx ? null : diaIdx)}>
                <div>
                  <span style={{ ...S.badge(p.cor), marginRight: 8 }}>DIA {dia.dia}</span>
                  <span style={{ fontSize: 14, color: "#94a3b8" }}>{dia.label}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 13, color: "#64748b" }}>{dia.exercicios.length} ex.</span>
                  <span style={{ color: p.cor, fontSize: 16 }}>{diaAberto === diaIdx ? "▲" : "▼"}</span>
                </div>
              </div>

              {diaAberto === diaIdx && (
                <div>
                  {(() => {
                    const estaAtivo = activeDayKey === dayKey(planoAtivo, diaIdx);
                    const outroAtivo = treinoSessao && !estaAtivo;

                    return (
                      <div style={{ ...S.card, margin: "0 12px 12px", borderColor: estaAtivo ? `${p.cor}88` : "#1e2938" }}>
                        <p style={{ ...S.label, color: estaAtivo ? p.cor : "#64748b" }}>{estaAtivo ? `Treino iniciado - Dia ${dia.dia}` : `Sessao do Dia ${dia.dia}`}</p>
                        <p style={{ margin: "0 0 12px", color: "#94a3b8", fontSize: 15, lineHeight: 1.5 }}>
                          {estaAtivo
                            ? `Tempo registrado ate agora: ${treinoDuracaoMin} min. Ao finalizar um timer de exercicio, uma serie sera concluida automaticamente.`
                            : outroAtivo
                              ? "Existe outro dia em andamento. Encerre o treino atual para iniciar este."
                              : "Inicie este dia para acompanhar series, cardio e tempo total do treino."}
                        </p>

                        <div style={{ display: "grid", gridTemplateColumns: estaAtivo ? "1fr 1fr" : "1fr", gap: 8 }}>
                          <button
                            style={{ ...S.btn(estaAtivo ? "#334155" : p.corBorder), width: "100%", opacity: outroAtivo ? 0.55 : 1 }}
                            onClick={estaAtivo ? encerrarTreino : () => iniciarTreinoDia(diaIdx)}
                            disabled={Boolean(outroAtivo)}
                          >
                            {estaAtivo ? "Encerrar e salvar treino" : `Iniciar Treino - Dia ${dia.dia}`}
                          </button>
                          {estaAtivo && (
                            <button style={{ ...S.btn(p.cor), width: "100%" }} onClick={() => suggestRestTimer(`Descanso sugerido - Dia ${dia.dia}`)}>
                              Sugerir Timer - {formatSeconds(descansoPadrao)}
                            </button>
                          )}
                        </div>

                        {estaAtivo && (
                          <div style={{ borderTop: "1px solid #1e2938", marginTop: 12, paddingTop: 12 }}>
                            <p style={{ ...S.label, color: "#34d399" }}>Registrar cardio</p>
                            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.7fr", gap: 8, marginBottom: 8 }}>
                              <select
                                style={S.input}
                                value={cardioForm.tipo}
                                onChange={(event) => setCardioForm((current) => ({ ...current, tipo: event.target.value }))}
                              >
                                {CARDIO_OPTIONS.map((item) => (
                                  <option key={item} value={item}>
                                    {item}
                                  </option>
                                ))}
                              </select>
                              <input
                                style={S.input}
                                type="number"
                                min="1"
                                placeholder="min"
                                value={cardioForm.minutos}
                                onChange={(event) => setCardioForm((current) => ({ ...current, minutos: event.target.value }))}
                              />
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
                              <input
                                style={S.input}
                                placeholder="Distancia (opcional)"
                                value={cardioForm.distancia}
                                onChange={(event) => setCardioForm((current) => ({ ...current, distancia: event.target.value }))}
                              />
                              <input
                                style={S.input}
                                placeholder="Intensidade / FC"
                                value={cardioForm.intensidade}
                                onChange={(event) => setCardioForm((current) => ({ ...current, intensidade: event.target.value }))}
                              />
                            </div>
                            <textarea
                              style={{ ...S.input, minHeight: 58, resize: "vertical", marginBottom: 8 }}
                              placeholder="Observacoes do cardio"
                              value={cardioForm.obs}
                              onChange={(event) => setCardioForm((current) => ({ ...current, obs: event.target.value }))}
                            />
                            <button style={{ ...S.btn("#16a34a"), width: "100%" }} onClick={registrarCardio}>
                              Registrar cardio
                            </button>
                            {(treinoSessao.cardio || []).length > 0 && (
                              <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
                                {treinoSessao.cardio.map((item) => (
                                  <div key={item.id} style={{ ...S.badge("#34d399"), justifyContent: "space-between", whiteSpace: "normal" }}>
                                    <span>{item.tipo}</span>
                                    <span>{item.minutos} min</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  {dia.exercicios.map((ex, exIdx) => {
                    const key = exerciseKey(planoAtivo, diaIdx, exIdx);
                    const done = getCompletedSeries(key);
                    const totalSeries = Number(ex.series) || 0;
                    const diaTreinoAtivo = activeDayKey === dayKey(planoAtivo, diaIdx);

                    return (
                    <div key={ex.id} style={S.exRow}>
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: "0 0 6px", fontSize: 16, color: "#f1f5f9", fontWeight: 700 }}>{ex.nome}</p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: ex.obs ? 6 : 8 }}>
                          <span style={S.badge("#22d3ee")}>{ex.series} series</span>
                          <span style={S.badge("#a78bfa")}>{ex.reps} reps</span>
                          {ex.carga && <span style={S.badge("#f97316")}>{ex.carga}</span>}
                          {diaTreinoAtivo && <span style={S.badge(done >= totalSeries && totalSeries > 0 ? "#34d399" : "#64748b")}>{done}/{ex.series} feitas</span>}
                        </div>
                        {ex.obs && <p style={{ margin: "0 0 10px", fontSize: 14, color: "#64748b", lineHeight: 1.5, fontStyle: "italic" }}>{ex.obs}</p>}
                        <label style={{ ...S.label, marginTop: 4 }}>Observacoes de carga / progressao</label>
                        <textarea
                          style={{ ...S.input, minHeight: 64, resize: "vertical", fontSize: 15 }}
                          placeholder="Ex: 20kg cada halter; proxima meta 22kg; RPE 8"
                          value={ex.cargaNotas || ""}
                          onChange={(event) => updateExercicioField(planoAtivo, diaIdx, exIdx, "cargaNotas", event.target.value)}
                        />
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <button style={{ ...S.btnGhost, padding: "7px 10px", fontSize: 14 }} onClick={() => startEdit(planoAtivo, diaIdx, exIdx)}>
                          Editar
                        </button>
                        <button style={{ ...S.btnGhost, padding: "7px 10px", fontSize: 14, color: p.cor }} onClick={() => startTimer(descansoPadrao, ex.nome, key)}>
                          Timer
                        </button>
                        {diaTreinoAtivo && (
                          <button style={{ ...S.btnGhost, padding: "7px 10px", fontSize: 14, color: "#34d399" }} onClick={() => completeSeries(key, totalSeries || 99)}>
                            Serie +
                          </button>
                        )}
                        <button style={{ ...S.btnGhost, padding: "7px 10px", fontSize: 14, color: "#ef4444" }} onClick={() => removeExercicio(planoAtivo, diaIdx, exIdx)}>
                          Excluir
                        </button>
                      </div>
                    </div>
                    );
                  })}
                  <div style={{ padding: "12px 16px 16px" }}>
                    <button style={{ ...S.btn(p.corBorder), width: "100%", opacity: 0.85 }} onClick={() => addExercicio(planoAtivo, diaIdx)}>
                      + Adicionar Exercicio
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === "cronograma" && (
        <div style={{ padding: "12px 16px 0" }}>
          <div style={S.card}>
            <p style={{ ...S.label, marginBottom: 12 }}>Progressao sugerida - 16 semanas</p>
            {[
              { semanas: "1-4", plano: "ADAPTACAO", cor: "#22d3ee", icon: "↻", desc: "Reativacao, tecnica, volume baixo. Cargas 60-70%." },
              { semanas: "5-10", plano: "MANUTENCAO", cor: "#a78bfa", icon: "◆", desc: "Hipertrofia controlada, progressao linear. 70-80%." },
              { semanas: "11-16", plano: "QUEIMA", cor: "#f97316", icon: "▲", desc: "Alto volume, supersets, HIIT integrado. Deficit leve." },
            ].map((item, i) => (
              <div key={item.plano} style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "flex-start" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", background: `${item.cor}22`, border: `2px solid ${item.cor}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{item.icon}</div>
                  {i < 2 && <div style={{ width: 2, height: 24, background: "#1e2938", margin: "4px 0" }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6 }}>
                    <span style={S.badge(item.cor)}>SEM {item.semanas}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: item.cor }}>{item.plano}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: "#64748b", lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={S.card}>
            <p style={{ ...S.label, marginBottom: 12 }}>Semana-tipo - 5 dias</p>
            {[
              { dia: "DOM", label: "Treino A", sub: "Peito + Triceps", cor: "#f97316" },
              { dia: "SEG", label: "Treino B", sub: "Costas + Biceps", cor: "#a78bfa" },
              { dia: "TER", label: "Treino C", sub: "Pernas + Gluteos", cor: "#22d3ee" },
              { dia: "QUA", label: "Treino D", sub: "Ombros + Core", cor: "#34d399" },
              { dia: "QUI", label: "Descanso Ativo", sub: "Caminhada 30min ou mobilidade", cor: "#64748b" },
              { dia: "SEX", label: "Treino E", sub: "Full body + cardio", cor: "#f97316" },
              { dia: "SAB", label: "Descanso", sub: "Recuperacao total", cor: "#64748b" },
            ].map((item) => (
              <div key={item.dia} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ ...S.badge(item.cor), width: 48, justifyContent: "center" }}>{item.dia}</span>
                <div>
                  <p style={{ margin: 0, fontSize: 14, color: "#f1f5f9" }}>{item.label}</p>
                  <p style={{ margin: 0, fontSize: 12, color: "#64748b" }}>{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ ...S.card, borderColor: "#22d3ee33" }}>
            <p style={{ ...S.label, color: "#22d3ee" }}>Dicas de progressao</p>
            {[
              "Aumente 2.5-5kg quando completar todas as series/reps na forma correta.",
              "Se nao completar 2/3 das series, mantenha a carga por mais uma semana.",
              "Deload a cada 4-6 semanas: reduza volume em 40% por 1 semana.",
              "Priorize sono (7-9h) e proteina (1.8-2.2g/kg de peso corporal).",
              "Fase de queima: nao reduza carga; reduza descanso e aumente volume.",
            ].map((tip) => (
              <p key={tip} style={{ margin: "0 0 8px", fontSize: 13, color: "#64748b", lineHeight: 1.6 }}>
                <span style={{ color: "#22d3ee" }}>▸ </span>
                {tip}
              </p>
            ))}
          </div>
        </div>
      )}

      {tab === "historico" && (
        <div style={{ padding: "12px 16px 0" }}>
          <div style={{ ...S.card, borderLeft: `3px solid ${p.cor}` }}>
            <p style={{ ...S.label, color: p.cor }}>Historico de treinos</p>
            <p style={{ margin: 0, fontSize: 15, color: "#94a3b8", lineHeight: 1.5 }}>
              Os treinos encerrados ficam salvos neste aparelho e, com login ativo, tambem sincronizam na nuvem para consulta em qualquer celular ou computador.
            </p>
          </div>

          <div style={{ ...S.card, borderColor: authUser ? "#34d39955" : "#1e2938" }}>
            <p style={{ ...S.label, color: authUser ? "#34d399" : p.cor }}>Sincronizacao na nuvem</p>
            {!isSupabaseConfigured ? (
              <p style={{ margin: 0, color: "#94a3b8", fontSize: 15, lineHeight: 1.5 }}>
                O app ja esta pronto para sincronizar. Falta configurar as variaveis do Supabase no Vercel e criar a tabela do arquivo supabase.sql.
              </p>
            ) : authUser ? (
              <div>
                <p style={{ margin: "0 0 10px", color: "#94a3b8", fontSize: 15 }}>
                  Conectado como <strong style={{ color: "#e2e8f0" }}>{authUser.email}</strong>
                </p>
                <p style={{ margin: "0 0 12px", color: "#64748b", fontSize: 13 }}>{syncStatus}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <button style={{ ...S.btn("#16a34a"), opacity: syncLoading ? 0.6 : 1 }} onClick={() => syncHistoryFromCloud(authUser)} disabled={syncLoading}>
                    Sincronizar agora
                  </button>
                  <button style={S.btnGhost} onClick={sairDaConta}>
                    Sair
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p style={{ margin: "0 0 10px", color: "#94a3b8", fontSize: 15, lineHeight: 1.5 }}>
                  Entre com seu e-mail para salvar o historico na nuvem e recuperar os treinos em outro aparelho.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8 }}>
                  <input
                    style={S.input}
                    type="email"
                    placeholder="seu@email.com"
                    value={authEmail}
                    onChange={(event) => setAuthEmail(event.target.value)}
                  />
                  <button style={{ ...S.btn(p.corBorder), opacity: syncLoading ? 0.6 : 1 }} onClick={enviarLinkLogin} disabled={syncLoading}>
                    Enviar link
                  </button>
                </div>
                <p style={{ margin: "8px 0 0", color: "#64748b", fontSize: 13 }}>{syncStatus}</p>
              </div>
            )}
          </div>

          {historico.length === 0 ? (
            <div style={S.card}>
              <p style={{ margin: 0, color: "#94a3b8", fontSize: 15 }}>Nenhum treino registrado ainda. Abra um dia, toque em Iniciar Treino e finalize para salvar o registro.</p>
            </div>
          ) : (
            historico.map((registro) => (
              <div key={registro.id} style={S.card}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                  <div>
                    <p style={{ margin: "0 0 4px", fontSize: 16, color: "#f8fafc", fontWeight: 700 }}>{registro.diaLabel}</p>
                    <p style={{ margin: 0, fontSize: 13, color: "#64748b" }}>
                      {registro.planoNome} - {formatDateTime(registro.startedAt)}
                    </p>
                  </div>
                  <span style={S.badge(p.cor)}>{registro.duracaoMin} min</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {(registro.exercicios || []).map((ex) => (
                    <div key={`${registro.id}-${ex.id}`} style={{ borderTop: "1px solid #1e2938", paddingTop: 8 }}>
                      <p style={{ margin: "0 0 4px", color: "#e2e8f0", fontSize: 14, fontWeight: 700 }}>{ex.nome}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                        <span style={S.badge("#34d399")}>{ex.feitas}/{ex.series} series</span>
                        <span style={S.badge("#a78bfa")}>{ex.reps} reps</span>
                        {ex.carga && <span style={S.badge("#f97316")}>{ex.carga}</span>}
                      </div>
                      {ex.cargaNotas && <p style={{ margin: "6px 0 0", color: "#94a3b8", fontSize: 13, lineHeight: 1.5 }}>{ex.cargaNotas}</p>}
                    </div>
                  ))}
                </div>

                {(registro.cardio || []).length > 0 && (
                  <div style={{ borderTop: "1px solid #1e2938", marginTop: 10, paddingTop: 10 }}>
                    <p style={{ ...S.label, color: "#34d399" }}>Cardio</p>
                    {(registro.cardio || []).map((item) => (
                      <p key={item.id} style={{ margin: "0 0 6px", color: "#94a3b8", fontSize: 14 }}>
                        {item.tipo} - {item.minutos} min{item.distancia ? ` - ${item.distancia}` : ""}{item.intensidade ? ` - ${item.intensidade}` : ""}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {tab === "coach" && (
        <div style={{ padding: "12px 16px 0", display: "flex", flexDirection: "column" }}>
          {aiMessages.length === 0 && (
            <div style={{ marginBottom: 12 }}>
              <p style={{ ...S.label, color: "#a78bfa", marginBottom: 10 }}>Coach IA personalizado</p>
              <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 14px", lineHeight: 1.6 }}>Seu coach conhece seus 3 planos e responde duvidas sobre treino, progressao e execucao.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  "Estou na semana 1 - como devo controlar as cargas no plano de Adaptacao?",
                  "Qual a diferenca entre os 3 planos e como sei que estou pronto para avancar?",
                  "Como faco os supersets do plano de Queima sem perder a forma?",
                  "Preciso de suplementacao para esses 3 planos?",
                ].map((q) => (
                  <button key={q} style={{ ...S.btnGhost, textAlign: "left", lineHeight: 1.5, padding: "10px 14px", fontSize: 13, color: "#94a3b8" }} onClick={() => askAI(q)}>
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 12 }}>
            {aiMessages.map((m, i) => (
              <div key={`${m.role}-${i}`} style={{ display: "flex", gap: 8, flexDirection: m.role === "user" ? "row-reverse" : "row", alignItems: "flex-start" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", flexShrink: 0, background: m.role === "user" ? "#1e2938" : "#2e1065", border: `1px solid ${m.role === "user" ? "#334155" : "#7c3aed"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>
                  {m.role === "user" ? "EU" : "AI"}
                </div>
                <div style={{ background: m.role === "user" ? "#1e2938" : "#0d1117", border: `1px solid ${m.role === "user" ? "#334155" : "#7c3aed44"}`, borderRadius: m.role === "user" ? "8px 4px 8px 8px" : "4px 8px 8px 8px", padding: "10px 14px", maxWidth: "80%", fontSize: 13, color: "#e2e8f0", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                  {m.text}
                </div>
              </div>
            ))}
            {aiLoading && (
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#2e1065", border: "1px solid #7c3aed", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>AI</div>
                <div style={{ background: "#0d1117", border: "1px solid #7c3aed44", borderRadius: "4px 8px 8px 8px", padding: "12px 16px" }}>
                  <div style={{ display: "flex", gap: 4 }}>
                    {[0, 1, 2].map((i) => (
                      <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "#a78bfa", animation: "pulse 1.2s ease-in-out infinite", animationDelay: `${i * 0.2}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div style={{ position: "sticky", bottom: 80, background: "#080c14", paddingBottom: 8, paddingTop: 4 }}>
            <div style={{ display: "flex", gap: 8 }}>
              <textarea
                style={{ ...S.input, flex: 1, minHeight: 44, maxHeight: 120, resize: "none", padding: "12px 14px", lineHeight: 1.4 }}
                placeholder="Pergunte ao coach..."
                value={aiInput}
                rows={1}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    askAI();
                  }
                }}
              />
              <button style={{ ...S.btn("#7c3aed"), padding: "12px 16px", flexShrink: 0, opacity: aiLoading ? 0.5 : 1 }} onClick={() => askAI()} disabled={aiLoading}>
                Enviar
              </button>
            </div>
            {aiMessages.length > 0 && (
              <button style={{ ...S.btnGhost, marginTop: 6, fontSize: 11, width: "100%" }} onClick={() => setAiMessages([])}>
                Limpar conversa
              </button>
            )}
          </div>
        </div>
      )}

      {editando && (
        <div style={{ position: "fixed", inset: 0, background: "#000000dd", zIndex: 300, display: "flex", alignItems: "flex-end" }}>
          <div style={{ background: "#0d1117", border: `1px solid ${p.corBorder}`, borderRadius: "8px 8px 0 0", padding: 20, width: "100%", maxHeight: "80vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 17, color: p.cor }}>Editar Exercicio</h3>
              <button style={{ ...S.btnGhost, padding: "6px 12px", fontSize: 15 }} onClick={() => setEditando(null)}>
                Fechar
              </button>
            </div>

            <label style={S.label}>Nome do exercicio</label>
            <input style={{ ...S.input, marginBottom: 12 }} value={editForm.nome || ""} onChange={(e) => setEditForm((f) => ({ ...f, nome: e.target.value }))} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
              <div>
                <label style={S.label}>Series</label>
                <input style={S.input} type="number" value={editForm.series || ""} onChange={(e) => setEditForm((f) => ({ ...f, series: e.target.value }))} />
              </div>
              <div>
                <label style={S.label}>Repeticoes</label>
                <input style={S.input} value={editForm.reps || ""} onChange={(e) => setEditForm((f) => ({ ...f, reps: e.target.value }))} />
              </div>
            </div>

            <label style={S.label}>Carga atual (kg)</label>
            <input style={{ ...S.input, marginBottom: 12 }} placeholder="Ex: 40kg" value={editForm.carga || ""} onChange={(e) => setEditForm((f) => ({ ...f, carga: e.target.value }))} />

            <label style={S.label}>Observacoes de carga / progressao</label>
            <textarea
              style={{ ...S.input, minHeight: 74, resize: "vertical", marginBottom: 12 }}
              placeholder="Ex: 20kg cada halter; 3x12 limpo; subir carga na proxima semana"
              value={editForm.cargaNotas || ""}
              onChange={(e) => setEditForm((f) => ({ ...f, cargaNotas: e.target.value }))}
            />

            <label style={S.label}>Observacoes / notas</label>
            <textarea style={{ ...S.input, minHeight: 70, resize: "vertical", marginBottom: 18 }} value={editForm.obs || ""} onChange={(e) => setEditForm((f) => ({ ...f, obs: e.target.value }))} />

            <button style={{ ...S.btn(p.cor), width: "100%" }} onClick={saveEdit}>
              Salvar alteracoes
            </button>
          </div>
        </div>
      )}

      {timerMinimizado ? (
        <button
          style={{ ...S.timerPanel, width: "min(190px, calc(100vw - 24px))", padding: "10px 12px", textAlign: "left", cursor: "pointer" }}
          onClick={() => setTimerMinimizado(false)}
          aria-label="Abrir timer de descanso"
        >
          <span style={{ ...S.label, margin: 0, color: timer.remaining === 0 ? "#34d399" : p.cor }}>Timer</span>
          <strong style={{ display: "block", color: timer.remaining === 0 ? "#34d399" : "#f8fafc", fontSize: 26, lineHeight: 1 }}>{formatSeconds(timer.remaining)}</strong>
          <span style={{ display: "block", color: "#94a3b8", fontSize: 12 }}>Toque para abrir</span>
        </button>
      ) : (
        <section style={S.timerPanel} aria-label="Timer de descanso">
          <div
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 10, cursor: timerDrag ? "grabbing" : "grab", userSelect: "none" }}
            onPointerDown={(event) => setTimerDrag({ pointerX: event.clientX, startX: timerX })}
          >
            <div style={{ minWidth: 0 }}>
              <p style={{ ...S.label, margin: 0, color: timer.remaining === 0 ? "#34d399" : p.cor }}>Timer de descanso</p>
              <p style={{ margin: "3px 0 0", color: "#94a3b8", fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{timer.label}</p>
              <p style={{ margin: "2px 0 0", color: "#475569", fontSize: 12 }}>Arraste para esquerda ou direita</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <strong style={{ color: timer.remaining === 0 ? "#34d399" : "#f8fafc", fontSize: 28, lineHeight: 1 }}>{formatSeconds(timer.remaining)}</strong>
              <button
                style={{ ...S.timerBtn, padding: "6px 8px", fontSize: 12 }}
                onPointerDown={(event) => event.stopPropagation()}
                onClick={() => setTimerMinimizado(true)}
              >
                Min
              </button>
            </div>
          </div>

          <div style={{ height: 6, background: "#1e2938", borderRadius: 999, overflow: "hidden", marginBottom: 10 }}>
            <div style={{ width: `${timerPercent}%`, height: "100%", background: timer.remaining === 0 ? "#34d399" : p.cor, transition: "width 0.25s linear" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 6 }}>
            <button style={S.timerBtn} onClick={() => adjustTimer(-15)}>-15s</button>
            <button style={S.timerBtn} onClick={toggleTimer}>{timer.running ? "Pausar" : timer.remaining === 0 ? "Repetir" : "Iniciar"}</button>
            <button style={S.timerBtn} onClick={() => startTimer(descansoPadrao, `Descanso ${p.nome}`)}>{formatSeconds(descansoPadrao)}</button>
            <button style={S.timerBtn} onClick={() => adjustTimer(15)}>+15s</button>
            <button style={{ ...S.timerBtn, color: "#ef4444" }} onClick={() => setTimer((current) => ({ ...current, remaining: current.duration, running: false }))}>Reset</button>
          </div>
        </section>
      )}

      <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#080c14", borderTop: "1px solid #1e2938", display: "flex", zIndex: 100 }}>
        {Object.values(planos).map((pl) => (
          <button
            key={pl.id}
            style={S.navBtn(planoAtivo === pl.id && tab === "planos", pl.cor)}
            onClick={() => {
              setPlanoAtivo(pl.id);
              setDiaAberto(null);
              setTab("planos");
            }}
          >
            <span style={{ fontSize: 22 }}>{pl.icon}</span>
            <span>{pl.nome}</span>
          </button>
        ))}
        <button style={S.navBtn(tab === "coach", "#a78bfa")} onClick={() => setTab("coach")}>
          <span style={{ fontSize: 22 }}>AI</span>
          <span>COACH</span>
        </button>
      </nav>
    </div>
  );
}
