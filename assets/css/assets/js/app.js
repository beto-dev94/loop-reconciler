"use strict";

/* =========================================================
   LOOP RECONCILER — LANGUAGE TEST
========================================================= */

const translations = {
  pt: {
    navCompare: "Comparar",
    navResults: "Resultados",
    navFeatures: "Recursos",

    heroBadge: "Conciliação Inteligente de Dados",
    heroTitle1: "Encontre diferenças.",
    heroTitle2: "Concilie mais rápido.",

    heroDescription:
      "Compare relatórios CSV e Excel, encontre registros ausentes, duplicidades e inconsistências e analise os resultados através de um painel simples e eficiente.",

    startComparison: "Iniciar comparação",
    viewGithub: "Ver no GitHub",

    featureImportTitle: "Importar",
    featureImportDescription:
      "Carregue relatórios CSV, XLS e XLSX diretamente do seu computador.",

    featureCompareTitle: "Comparar",
    featureCompareDescription:
      "Compare automaticamente conjuntos de dados usando uma coluna de referência.",

    featureReviewTitle: "Analisar",
    featureReviewDescription:
      "Identifique correspondências, divergências, registros ausentes e duplicidades.",

    workspaceLabel: "Área de trabalho",
    workspaceTitle: "Compare seus relatórios",
    workspaceDescription:
      "Seus arquivos são processados localmente no navegador.",

    reportA: "Relatório A",
    reportB: "Relatório B",

    primaryDataset: "Base principal",
    comparisonDataset: "Base de comparação",

    noFile: "Nenhum arquivo",

    chooseReportA: "Selecionar Relatório A",
    chooseReportB: "Selecionar Relatório B",

    matchingRules: "Regras de correspondência",
    comparisonConfiguration: "Configuração da comparação",

    matchingColumnA: "Coluna de referência — Relatório A",
    matchingColumnB: "Coluna de referência — Relatório B",

    selectColumn: "Selecione uma coluna",

    normalization: "Normalização dos dados",
    removeSpaces: "Remover espaços extras",
    ignoreCase: "Ignorar maiúsculas e minúsculas",
    ignoreEmpty: "Ignorar registros vazios",

    validation: "Validação",
    detectDuplicates: "Detectar duplicidades",
    compareFields: "Comparar campos dos registros",

    compareReports: "Comparar relatórios",
    reset: "Limpar",

    analysis: "Análise",
    resultsTitle: "Resultado da conciliação",

    resultsDescription:
      "Resumo da comparação entre os dois relatórios.",

    reportARecords: "Registros do Relatório A",
    reportBRecords: "Registros do Relatório B",

    matches: "Correspondências",
    differences: "Divergências",

    missingReportB: "Ausentes no Relatório B",
    missingReportA: "Ausentes no Relatório A",

    duplicates: "Duplicidades",
    matchRate: "Taxa de correspondência",

    searchResults: "Pesquisar resultados...",

    all: "Todos",
    missingAFilter: "Ausentes A",
    missingBFilter: "Ausentes B",

    exportCSV: "Exportar CSV",
    exportExcel: "Exportar Excel",

    status: "Status",
    key: "Chave",
    details: "Detalhes",

    noResults: "Nenhum resultado encontrado",

    changeFilter:
      "Tente alterar o filtro ou o termo pesquisado.",

    localProcessing: "Processamento local",

    localProcessingDescription:
      "O Loop Reconciler processa os arquivos diretamente no navegador. Seus relatórios não precisam ser enviados para um servidor remoto para realizar a comparação.",

    capabilities: "Capacidades",

    capabilitiesTitle:
      "Desenvolvido para validação prática de dados",

    csvSupport: "Suporte a CSV",

    csvSupportDescription:
      "Importe e analise conjuntos de dados em CSV.",

    excelSupport: "Suporte a Excel",

    excelSupportDescription:
      "Leia arquivos XLS e XLSX diretamente no navegador.",

    duplicateDetection: "Detecção de duplicidades",

    duplicateDetectionDescription:
      "Identifique chaves repetidas dentro de cada base.",

    missingRecords: "Registros ausentes",

    missingRecordsDescription:
      "Encontre registros existentes em apenas um dos relatórios.",

    fieldDifferences: "Diferenças entre campos",

    fieldDifferencesDescription:
      "Compare os dados internos de registros correspondentes.",

    exportResults: "Exportação de resultados",

    exportResultsDescription:
      "Gere relatórios de conciliação em CSV e Excel.",

    searchFilters: "Pesquisa e filtros",

    searchFiltersDescription:
      "Localize rapidamente resultados específicos.",

    responsiveInterface: "Interface responsiva",

    responsiveInterfaceDescription:
      "Compatível com computadores, tablets e smartphones.",

    footerDescription:
      "Ferramenta open source para conciliação de dados.",

    developer: "Desenvolvedor",
    sourceCode: "Código-fonte",

    footerMessage:
      "Desenvolvido para conciliação de dados e automação de processos.",

    recordDetails: "Detalhes do registro"
  },

  en: {
    navCompare: "Compare",
    navResults: "Results",
    navFeatures: "Features",

    heroBadge: "Intelligent Data Reconciliation",
    heroTitle1: "Find differences.",
    heroTitle2: "Reconcile faster.",

    heroDescription:
      "Compare CSV and Excel reports, detect missing records, duplicates and inconsistencies, and review your data through a simple reconciliation dashboard.",

    startComparison: "Start Comparison",
    viewGithub: "View on GitHub",

    featureImportTitle: "Import",
    featureImportDescription:
      "Load CSV, XLS and XLSX reports directly from your computer.",

    featureCompareTitle: "Compare",
    featureCompareDescription:
      "Automatically compare datasets using a configurable matching column.",

    featureReviewTitle: "Review",
    featureReviewDescription:
      "Inspect matches, differences, missing records and duplicates.",

    workspaceLabel: "Workspace",
    workspaceTitle: "Compare your reports",
    workspaceDescription:
      "Your files are processed locally in your browser.",

    reportA: "Report A",
    reportB: "Report B",

    primaryDataset: "Primary dataset",
    comparisonDataset: "Comparison dataset",

    noFile: "No file",

    chooseReportA: "Choose Report A",
    chooseReportB: "Choose Report B",

    matchingRules: "Matching Rules",
    comparisonConfiguration: "Comparison configuration",

    matchingColumnA: "Matching column — Report A",
    matchingColumnB: "Matching column — Report B",

    selectColumn: "Select a column",

    normalization: "Data normalization",
    removeSpaces: "Remove extra spaces",
    ignoreCase: "Ignore uppercase/lowercase",
    ignoreEmpty: "Ignore empty records",

    validation: "Validation",
    detectDuplicates: "Detect duplicates",
    compareFields: "Compare matching record fields",

    compareReports: "Compare Reports",
    reset: "Reset",

    analysis: "Analysis",
    resultsTitle: "Reconciliation Results",

    resultsDescription:
      "Summary of the comparison between both reports.",

    reportARecords: "Report A Records",
    reportBRecords: "Report B Records",

    matches: "Matches",
    differences: "Differences",

    missingReportB: "Missing in Report B",
    missingReportA: "Missing in Report A",

    duplicates: "Duplicates",
    matchRate: "Match Rate",

    searchResults: "Search results...",

    all: "All",
    missingAFilter: "Missing A",
    missingBFilter: "Missing B",

    exportCSV: "Export CSV",
    exportExcel: "Export Excel",

    status: "Status",
    key: "Key",
    details: "Details",

    noResults: "No results found",

    changeFilter:
      "Try changing the active filter or search term.",

    localProcessing: "Local-first processing",

    localProcessingDescription:
      "Loop Reconciler processes supported reports directly inside your browser. Files do not need to be uploaded to a remote server for comparison.",

    capabilities: "Capabilities",

    capabilitiesTitle:
      "Built for practical data validation",

    csvSupport: "CSV Support",

    csvSupportDescription:
      "Import and analyze standard CSV datasets.",

    excelSupport: "Excel Support",

    excelSupportDescription:
      "Read XLS and XLSX spreadsheets directly.",

    duplicateDetection: "Duplicate Detection",

    duplicateDetectionDescription:
      "Identify repeated keys inside each dataset.",

    missingRecords: "Missing Records",

    missingRecordsDescription:
      "Detect records present in only one report.",

    fieldDifferences: "Field Differences",

    fieldDifferencesDescription:
      "Compare the contents of matching records.",

    exportResults: "Export Results",

    exportResultsDescription:
      "Generate reconciled CSV and Excel reports.",

    searchFilters: "Search & Filters",

    searchFiltersDescription:
      "Quickly isolate specific reconciliation results.",

    responsiveInterface: "Responsive Interface",

    responsiveInterfaceDescription:
      "Designed for desktop, tablet and mobile devices.",

    footerDescription:
      "Open-source data reconciliation tool.",

    developer: "Developer",
    sourceCode: "Source Code",

    footerMessage:
      "Built for data reconciliation and workflow automation.",

    recordDetails: "Record Details"
  }
};


/* =========================================================
   CHANGE LANGUAGE
========================================================= */

function changeLanguage(language) {
  const languageData = translations[language];

  if (!languageData) {
    return;
  }

  document.documentElement.lang =
    language === "pt"
      ? "pt-BR"
      : "en";

  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.getAttribute("data-i18n");

    if (languageData[key] !== undefined) {
      element.textContent = languageData[key];
    }
  });

  document
    .querySelectorAll("[data-i18n-placeholder]")
    .forEach(element => {
      const key =
        element.getAttribute(
          "data-i18n-placeholder"
        );

      if (languageData[key] !== undefined) {
        element.placeholder = languageData[key];
      }
    });

  document
    .querySelectorAll(".language-button")
    .forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.language === language
      );
    });

  document.title =
    language === "pt"
      ? "Loop Reconciler | Conciliação de Dados"
      : "Loop Reconciler | Data Reconciliation";

  localStorage.setItem(
    "loopLanguage",
    language
  );
}


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    const buttonPT =
      document.getElementById(
        "languagePT"
      );

    const buttonEN =
      document.getElementById(
        "languageEN"
      );

    if (!buttonPT || !buttonEN) {
      console.error(
        "Language buttons not found."
      );

      return;
    }

    buttonPT.addEventListener(
      "click",
      () => {
        changeLanguage("pt");
      }
    );

    buttonEN.addEventListener(
      "click",
      () => {
        changeLanguage("en");
      }
    );

    const savedLanguage =
      localStorage.getItem(
        "loopLanguage"
      );

    changeLanguage(
      savedLanguage === "en"
        ? "en"
        : "pt"
    );

    console.log(
      "Loop Reconciler language system loaded."
    );
  }
);
