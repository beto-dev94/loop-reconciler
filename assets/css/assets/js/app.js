"use strict";

/* ============================================================
   LOOP RECONCILER
   Motor de conciliação multi-arquivo
   Desenvolvedor: beto-dev94
   Loop Suite
============================================================ */


/* ============================================================
   01. CONFIGURAÇÃO GLOBAL
============================================================ */

const APP_CONFIG = {
  version: "1.0.0",

  supportedExtensions: [
    "csv",
    "xls",
    "xlsx",
    "ods",
    "fods",
    "tsv",
    "txt"
  ],

  defaultPageSize: 50,

  maxDetailedPdfRows: 500,

  storageKeys: {
    theme: "loop-reconciler-theme",
    presets: "loop-reconciler-presets"
  }
};


/* ============================================================
   02. ESTADO
============================================================ */

const state = {

  mode: null,

  currentStep: 1,

  theme: "dark",

  baseA: createEmptyBase("A"),

  baseB: createEmptyBase("B"),

  matching: {
    columnA: "",
    columnB: "",

    compositeEnabled: false,

    compositePairs: [],

    mappings: []
  },

  results: [],

  filteredResults: [],

  filters: {
    status: "all",
    search: "",
    sort: "status"
  },

  pagination: {
    page: 1,
    pageSize: APP_CONFIG.defaultPageSize
  },

  analysis: {
    name: "",
    startedAt: null,
    completedAt: null
  },

  demonstration: false

};


function createEmptyBase(name) {
  return {
    name,

    files: [],

    records: [],

    columns: [],

    sheets: [],

    errors: []
  };
}


/* ============================================================
   03. ELEMENTOS
============================================================ */

const el = {

  themeToggle:
    document.getElementById("themeToggle"),

  themeIcon:
    document.getElementById("themeIcon"),

  themeText:
    document.getElementById("themeText"),

  themeColorMeta:
    document.getElementById("themeColorMeta"),


  startRealAnalysisButton:
    document.getElementById("startRealAnalysisButton"),

  startDemoButton:
    document.getElementById("startDemoButton"),

  openRealModeButton:
    document.getElementById("openRealModeButton"),

  openDemoModeButton:
    document.getElementById("openDemoModeButton"),

  runDemoButton:
    document.getElementById("runDemoButton"),

  downloadDemoFilesButton:
    document.getElementById("downloadDemoFilesButton"),


  activeModeBanner:
    document.getElementById("activeModeBanner"),

  activeModeLabel:
    document.getElementById("activeModeLabel"),

  activeModeTitle:
    document.getElementById("activeModeTitle"),

  activeModeDescription:
    document.getElementById("activeModeDescription"),

  changeModeButton:
    document.getElementById("changeModeButton"),


  workspace:
    document.getElementById("workspace"),

  workflowSteps:
    document.getElementById("workflowSteps"),


  stepFiles:
    document.getElementById("stepFiles"),

  stepMatching:
    document.getElementById("stepMatching"),

  stepConfiguration:
    document.getElementById("stepConfiguration"),

  stepAnalysis:
    document.getElementById("stepAnalysis"),

  stepResults:
    document.getElementById("stepResults"),


  fileInputA:
    document.getElementById("fileInputA"),

  fileInputB:
    document.getElementById("fileInputB"),

  dropZoneA:
    document.getElementById("dropZoneA"),

  dropZoneB:
    document.getElementById("dropZoneB"),

  baseAStatus:
    document.getElementById("baseAStatus"),

  baseBStatus:
    document.getElementById("baseBStatus"),

  baseASummary:
    document.getElementById("baseASummary"),

  baseBSummary:
    document.getElementById("baseBSummary"),

  baseAFileCount:
    document.getElementById("baseAFileCount"),

  baseBFileCount:
    document.getElementById("baseBFileCount"),

  baseASheetCount:
    document.getElementById("baseASheetCount"),

  baseBSheetCount:
    document.getElementById("baseBSheetCount"),

  baseARecordCount:
    document.getElementById("baseARecordCount"),

  baseBRecordCount:
    document.getElementById("baseBRecordCount"),

  fileListA:
    document.getElementById("fileListA"),

  fileListB:
    document.getElementById("fileListB"),

  goToMatchingButton:
    document.getElementById("goToMatchingButton"),


  matchingColumnA:
    document.getElementById("matchingColumnA"),

  matchingColumnB:
    document.getElementById("matchingColumnB"),

  enableCompositeKey:
    document.getElementById("enableCompositeKey"),

  compositeKeyBuilder:
    document.getElementById("compositeKeyBuilder"),

  compositeKeyList:
    document.getElementById("compositeKeyList"),

  addCompositeKeyButton:
    document.getElementById("addCompositeKeyButton"),

  columnMappingList:
    document.getElementById("columnMappingList"),

  addColumnMappingButton:
    document.getElementById("addColumnMappingButton"),

  goToConfigurationButton:
    document.getElementById("goToConfigurationButton"),


  trimValues:
    document.getElementById("trimValues"),

  ignoreCase:
    document.getElementById("ignoreCase"),

  ignoreAccents:
    document.getElementById("ignoreAccents"),

  ignoreSpecialCharacters:
    document.getElementById("ignoreSpecialCharacters"),

  normalizeLeadingZeros:
    document.getElementById("normalizeLeadingZeros"),

  detectDuplicates:
    document.getElementById("detectDuplicates"),

  compareFields:
    document.getElementById("compareFields"),

  ignoreEmptyRecords:
    document.getElementById("ignoreEmptyRecords"),

  detectTypeMismatch:
    document.getElementById("detectTypeMismatch"),

  normalizeDecimalSeparators:
    document.getElementById("normalizeDecimalSeparators"),

  ignoreCurrencySymbols:
    document.getElementById("ignoreCurrencySymbols"),

  normalizeThousandsSeparators:
    document.getElementById("normalizeThousandsSeparators"),

  normalizeDates:
    document.getElementById("normalizeDates"),

  ignoreTimeInDates:
    document.getElementById("ignoreTimeInDates"),

  savePresetButton:
    document.getElementById("savePresetButton"),

  loadPresetButton:
    document.getElementById("loadPresetButton"),

  goToAnalysisButton:
    document.getElementById("goToAnalysisButton"),


  analysisName:
    document.getElementById("analysisName"),

  reviewBaseAFiles:
    document.getElementById("reviewBaseAFiles"),

  reviewBaseARecords:
    document.getElementById("reviewBaseARecords"),

  reviewBaseBFiles:
    document.getElementById("reviewBaseBFiles"),

  reviewBaseBRecords:
    document.getElementById("reviewBaseBRecords"),

  reviewKeyA:
    document.getElementById("reviewKeyA"),

  reviewKeyB:
    document.getElementById("reviewKeyB"),

  analysisStatus:
    document.getElementById("analysisStatus"),

  analysisProgress:
    document.getElementById("analysisProgress"),

  analysisProgressFill:
    document.getElementById("analysisProgressFill"),

  analysisProgressText:
    document.getElementById("analysisProgressText"),

  analysisProgressPercent:
    document.getElementById("analysisProgressPercent"),

  runAnalysisButton:
    document.getElementById("runAnalysisButton"),


  resultsSubtitle:
    document.getElementById("resultsSubtitle"),

  newAnalysisButton:
    document.getElementById("newAnalysisButton"),

  metricTotalA:
    document.getElementById("metricTotalA"),

  metricTotalB:
    document.getElementById("metricTotalB"),

  metricMatches:
    document.getElementById("metricMatches"),

  metricDifferences:
    document.getElementById("metricDifferences"),

  metricMissingA:
    document.getElementById("metricMissingA"),

  metricMissingB:
    document.getElementById("metricMissingB"),

  metricDuplicates:
    document.getElementById("metricDuplicates"),

  metricMatchRate:
    document.getElementById("metricMatchRate"),

  showOnlyErrorsButton:
    document.getElementById("showOnlyErrorsButton"),

  resultsSearch:
    document.getElementById("resultsSearch"),

  resultsFilters:
    document.getElementById("resultsFilters"),

  resultsSort:
    document.getElementById("resultsSort"),

  resultsTableBody:
    document.getElementById("resultsTableBody"),

  resultsEmptyState:
    document.getElementById("resultsEmptyState"),

  paginationInfo:
    document.getElementById("paginationInfo"),

  previousPageButton:
    document.getElementById("previousPageButton"),

  nextPageButton:
    document.getElementById("nextPageButton"),

  currentPageLabel:
    document.getElementById("currentPageLabel"),

  pageSizeSelect:
    document.getElementById("pageSizeSelect"),


  exportExcelCompleteButton:
    document.getElementById("exportExcelCompleteButton"),

  exportErrorsExcelButton:
    document.getElementById("exportErrorsExcelButton"),

  exportODSButton:
    document.getElementById("exportODSButton"),

  exportCSVButton:
    document.getElementById("exportCSVButton"),

  exportJSONButton:
    document.getElementById("exportJSONButton"),

  exportSummaryPDFButton:
    document.getElementById("exportSummaryPDFButton"),

  exportDetailedPDFButton:
    document.getElementById("exportDetailedPDFButton"),


  detailsModal:
    document.getElementById("detailsModal"),

  detailsModalContent:
    document.getElementById("detailsModalContent"),

  closeDetailsModalButton:
    document.getElementById("closeDetailsModalButton"),


  fileErrorModal:
    document.getElementById("fileErrorModal"),

  fileErrorMessage:
    document.getElementById("fileErrorMessage"),

  fileErrorDetails:
    document.getElementById("fileErrorDetails"),

  closeFileErrorModalButton:
    document.getElementById("closeFileErrorModalButton"),


  presetModal:
    document.getElementById("presetModal"),

  presetModalContent:
    document.getElementById("presetModalContent"),

  closePresetModalButton:
    document.getElementById("closePresetModalButton"),


  toastContainer:
    document.getElementById("toastContainer")
};


/* ============================================================
   04. INICIALIZAÇÃO
============================================================ */

document.addEventListener(
  "DOMContentLoaded",
  initializeApplication
);


function initializeApplication() {

  initializeTheme();

  bindApplicationEvents();

  configureDropZone(
    el.dropZoneA,
    el.fileInputA,
    "A"
  );

  configureDropZone(
    el.dropZoneB,
    el.fileInputB,
    "B"
  );

  resetProgress();

  refreshBaseUI("A");

  refreshBaseUI("B");

  updateStepNavigation();

  console.log(
    `%cLoop Reconciler v${APP_CONFIG.version}`,
    "font-size:18px;font-weight:bold;color:#a78bfa"
  );

}


/* ============================================================
   05. TEMA CLARO / ESCURO
============================================================ */

function initializeTheme() {

  const savedTheme =
    localStorage.getItem(
      APP_CONFIG.storageKeys.theme
    );

  if (
    savedTheme === "light" ||
    savedTheme === "dark"
  ) {

    state.theme =
      savedTheme;

  }

  else {

    state.theme =
      window.matchMedia(
        "(prefers-color-scheme: light)"
      ).matches
        ? "light"
        : "dark";

  }

  applyTheme();

}


function toggleTheme() {

  state.theme =
    state.theme === "dark"
      ? "light"
      : "dark";

  localStorage.setItem(
    APP_CONFIG.storageKeys.theme,
    state.theme
  );

  applyTheme();

}


function applyTheme() {

  document
    .documentElement
    .setAttribute(
      "data-theme",
      state.theme
    );

  if (
    state.theme === "dark"
  ) {

    if (el.themeIcon) {
      el.themeIcon.textContent =
        "☾";
    }

    if (el.themeText) {
      el.themeText.textContent =
        "Tema escuro";
    }

    if (el.themeColorMeta) {
      el.themeColorMeta.content =
        "#07101d";
    }

  }

  else {

    if (el.themeIcon) {
      el.themeIcon.textContent =
        "☀";
    }

    if (el.themeText) {
      el.themeText.textContent =
        "Tema claro";
    }

    if (el.themeColorMeta) {
      el.themeColorMeta.content =
        "#f5f7fb";
    }

  }

}


/* ============================================================
   06. EVENTOS
============================================================ */

function bindApplicationEvents() {

  el.themeToggle?.addEventListener(
    "click",
    toggleTheme
  );


  el.startRealAnalysisButton?.addEventListener(
    "click",
    () => activateMode("real")
  );

  el.openRealModeButton?.addEventListener(
    "click",
    () => activateMode("real")
  );


  el.startDemoButton?.addEventListener(
    "click",
    runDemonstration
  );

  el.openDemoModeButton?.addEventListener(
    "click",
    runDemonstration
  );

  el.runDemoButton?.addEventListener(
    "click",
    runDemonstration
  );


  el.downloadDemoFilesButton?.addEventListener(
    "click",
    downloadDemoFiles
  );


  el.changeModeButton?.addEventListener(
    "click",
    resetToModeSelection
  );


  el.fileInputA?.addEventListener(
    "change",
    event =>
      handleSelectedFiles(
        Array.from(
          event.target.files
        ),
        "A"
      )
  );


  el.fileInputB?.addEventListener(
    "change",
    event =>
      handleSelectedFiles(
        Array.from(
          event.target.files
        ),
        "B"
      )
  );


  el.goToMatchingButton?.addEventListener(
    "click",
    () => goToStep(2)
  );


  el.matchingColumnA?.addEventListener(
    "change",
    () => {

      state.matching.columnA =
        el.matchingColumnA.value;

      validateMatching();

    }
  );


  el.matchingColumnB?.addEventListener(
    "change",
    () => {

      state.matching.columnB =
        el.matchingColumnB.value;

      validateMatching();

    }
  );


  el.enableCompositeKey?.addEventListener(
    "change",
    handleCompositeModeChange
  );


  el.addCompositeKeyButton?.addEventListener(
    "click",
    addCompositeKeyRow
  );


  el.addColumnMappingButton?.addEventListener(
    "click",
    addColumnMappingRow
  );


  el.goToConfigurationButton?.addEventListener(
    "click",
    () => goToStep(3)
  );


  el.savePresetButton?.addEventListener(
    "click",
    saveCurrentPreset
  );


  el.loadPresetButton?.addEventListener(
    "click",
    openPresetManager
  );


  el.goToAnalysisButton?.addEventListener(
    "click",
    () => {

      updateReview();

      goToStep(4);

    }
  );


  el.analysisName?.addEventListener(
    "input",
    event => {

      state.analysis.name =
        event.target.value.trim();

    }
  );


  el.runAnalysisButton?.addEventListener(
    "click",
    executeAnalysis
  );


  document
    .querySelectorAll(
      "[data-go-step]"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            const step =
              Number(
                button.dataset.goStep
              );

            goToStep(
              step
            );

          }
        );

      }
    );


  el.workflowSteps?.addEventListener(
    "click",
    event => {

      const button =
        event.target.closest(
          ".workflow-step"
        );

      if (!button) {
        return;
      }

      const step =
        Number(
          button.dataset.step
        );

      if (
        step <=
        state.currentStep
      ) {

        goToStep(
          step
        );

      }

    }
  );


  el.showOnlyErrorsButton?.addEventListener(
    "click",
    showOnlyErrors
  );


  el.resultsSearch?.addEventListener(
    "input",
    event => {

      state.filters.search =
        event.target.value
          .trim()
          .toLowerCase();

      state.pagination.page =
        1;

      applyResultFilters();

    }
  );


  el.resultsFilters?.addEventListener(
    "click",
    event => {

      const button =
        event.target.closest(
          "[data-result-filter]"
        );

      if (!button) {
        return;
      }

      setResultFilter(
        button.dataset.resultFilter
      );

    }
  );


  el.resultsSort?.addEventListener(
    "change",
    event => {

      state.filters.sort =
        event.target.value;

      state.pagination.page =
        1;

      applyResultFilters();

    }
  );


  el.previousPageButton?.addEventListener(
    "click",
    () => {

      if (
        state.pagination.page > 1
      ) {

        state.pagination.page--;

        renderResults();

      }

    }
  );


  el.nextPageButton?.addEventListener(
    "click",
    () => {

      const maxPage =
        getTotalPages();

      if (
        state.pagination.page <
        maxPage
      ) {

        state.pagination.page++;

        renderResults();

      }

    }
  );


  el.pageSizeSelect?.addEventListener(
    "change",
    event => {

      state.pagination.pageSize =
        Number(
          event.target.value
        );

      state.pagination.page =
        1;

      renderResults();

    }
  );


  el.newAnalysisButton?.addEventListener(
    "click",
    startNewAnalysis
  );


  el.exportExcelCompleteButton?.addEventListener(
    "click",
    exportCompleteExcel
  );


  el.exportErrorsExcelButton?.addEventListener(
    "click",
    exportErrorsExcel
  );


  el.exportODSButton?.addEventListener(
    "click",
    exportODS
  );


  el.exportCSVButton?.addEventListener(
    "click",
    exportCSV
  );


  el.exportJSONButton?.addEventListener(
    "click",
    exportJSON
  );


  el.exportSummaryPDFButton?.addEventListener(
    "click",
    exportSummaryPDF
  );


  el.exportDetailedPDFButton?.addEventListener(
    "click",
    exportDetailedPDF
  );


  el.closeDetailsModalButton?.addEventListener(
    "click",
    () => closeModal(
      el.detailsModal
    )
  );


  el.closeFileErrorModalButton?.addEventListener(
    "click",
    () => closeModal(
      el.fileErrorModal
    )
  );


  el.closePresetModalButton?.addEventListener(
    "click",
    () => closeModal(
      el.presetModal
    )
  );


  [
    el.detailsModal,
    el.fileErrorModal,
    el.presetModal
  ]
    .filter(Boolean)
    .forEach(
      modal => {

        modal.addEventListener(
          "click",
          event => {

            if (
              event.target === modal
            ) {

              closeModal(
                modal
              );

            }

          }
        );

      }
    );


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape"
      ) {

        closeModal(
          el.detailsModal
        );

        closeModal(
          el.fileErrorModal
        );

        closeModal(
          el.presetModal
        );

      }

    }
  );

}


/* ============================================================
   07. MODO REAL / DEMONSTRAÇÃO
============================================================ */

function activateMode(mode) {

  state.mode =
    mode;

  state.demonstration =
    mode === "demo";

  if (el.activeModeBanner) {

    el.activeModeBanner.hidden =
      false;

  }


  if (
    mode === "real"
  ) {

    el.activeModeLabel.textContent =
      "USO REAL";

    el.activeModeTitle.textContent =
      "Análise com seus arquivos";

    el.activeModeDescription.textContent =
      "Os arquivos selecionados serão processados localmente no navegador.";

  }

  else {

    el.activeModeLabel.textContent =
      "DEMONSTRAÇÃO";

    el.activeModeTitle.textContent =
      "Modo demonstração";

    el.activeModeDescription.textContent =
      "Somente dados fictícios estão sendo utilizados.";

  }


  if (el.workspace) {

    el.workspace.hidden =
      false;

  }


  goToStep(1);


  el.workspace?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

}


function resetToModeSelection() {

  if (
    state.results.length ||
    state.baseA.files.length ||
    state.baseB.files.length
  ) {

    const confirmed =
      window.confirm(
        "Trocar de modo limpará a análise atual. Deseja continuar?"
      );

    if (!confirmed) {
      return;
    }

  }

  resetAllData();

  state.mode =
    null;

  state.demonstration =
    false;

  el.workspace.hidden =
    true;

  el.activeModeBanner.hidden =
    true;

  document
    .getElementById(
      "usar"
    )
    ?.scrollIntoView({
      behavior: "smooth"
    });

}


/* ============================================================
   08. DEMONSTRAÇÃO
============================================================ */

async function runDemonstration() {

  resetAllData();

  activateMode("demo");


  const demoA =
    createDemoBaseA();

  const demoB =
    createDemoBaseB();


  state.baseA.records =
    demoA.map(
      record => ({
        ...record,
        __sourceFile:
          "base-referencia-demo.xlsx",
        __sourceSheet:
          "Dados"
      })
    );


  state.baseB.records =
    demoB.map(
      record => ({
        ...record,
        __sourceFile:
          "base-comparacao-demo.xlsx",
        __sourceSheet:
          "Dados"
      })
    );


  state.baseA.files = [
    createVirtualFile(
      "base-referencia-demo.xlsx"
    )
  ];

  state.baseB.files = [
    createVirtualFile(
      "base-comparacao-demo.xlsx"
    )
  ];


  state.baseA.sheets = [
    {
      file:
        "base-referencia-demo.xlsx",

      sheet:
        "Dados"
    }
  ];


  state.baseB.sheets = [
    {
      file:
        "base-comparacao-demo.xlsx",

      sheet:
        "Dados"
    }
  ];


  updateBaseColumns(
    state.baseA
  );

  updateBaseColumns(
    state.baseB
  );


  refreshBaseUI("A");

  refreshBaseUI("B");


  populateMatchingSelectors();


  state.matching.columnA =
    "ID";

  state.matching.columnB =
    "ID";

  el.matchingColumnA.value =
    "ID";

  el.matchingColumnB.value =
    "ID";


  validateFilesStep();

  validateMatching();


  showToast(
    "Demonstração carregada com dados fictícios.",
    "success"
  );


  goToStep(4);

  updateReview();


  el.analysisName.value =
    "Demonstração Loop Reconciler";

  state.analysis.name =
    el.analysisName.value;


  await executeAnalysis();

}


function createDemoBaseA() {

  return [
    {
      ID: "1001",
      Cliente: "Ana Souza",
      Documento: "DOC001",
      Serviço: "Consultoria",
      Data: "01/08/2026",
      Valor: "250,00"
    },
    {
      ID: "1002",
      Cliente: "Bruno Lima",
      Documento: "DOC002",
      Serviço: "Instalação",
      Data: "01/08/2026",
      Valor: "180,00"
    },
    {
      ID: "1003",
      Cliente: "Carla Mendes",
      Documento: "DOC003",
      Serviço: "Manutenção",
      Data: "02/08/2026",
      Valor: "320,00"
    },
    {
      ID: "1004",
      Cliente: "Diego Alves",
      Documento: "DOC004",
      Serviço: "Configuração",
      Data: "02/08/2026",
      Valor: "150,00"
    },
    {
      ID: "1005",
      Cliente: "Elisa Rocha",
      Documento: "DOC005",
      Serviço: "Consultoria",
      Data: "03/08/2026",
      Valor: "400,00"
    },
    {
      ID: "1006",
      Cliente: "Fabio Costa",
      Documento: "DOC006",
      Serviço: "Instalação",
      Data: "03/08/2026",
      Valor: "220,00"
    },
    {
      ID: "1007",
      Cliente: "Gabriela Reis",
      Documento: "DOC007",
      Serviço: "Manutenção",
      Data: "04/08/2026",
      Valor: "275,00"
    },
    {
      ID: "1008",
      Cliente: "Hugo Martins",
      Documento: "DOC008",
      Serviço: "Configuração",
      Data: "04/08/2026",
      Valor: "190,00"
    },
    {
      ID: "1009",
      Cliente: "Isabela Nunes",
      Documento: "DOC009",
      Serviço: "Consultoria",
      Data: "05/08/2026",
      Valor: "350,00"
    },
    {
      ID: "1010",
      Cliente: "João Ribeiro",
      Documento: "DOC010",
      Serviço: "Instalação",
      Data: "05/08/2026",
      Valor: "210,00"
    }
  ];

}


function createDemoBaseB() {

  return [
    {
      ID: "1001",
      Cliente: "Ana Souza",
      Documento: "DOC001",
      Serviço: "Consultoria",
      Data: "01/08/2026",
      Valor: "250,00"
    },
    {
      ID: "1002",
      Cliente: "Bruno Lima",
      Documento: "DOC002",
      Serviço: "Instalação",
      Data: "01/08/2026",
      Valor: "180,00"
    },
    {
      ID: "1003",
      Cliente: "Carla Mendes",
      Documento: "DOC003",
      Serviço: "Manutenção",
      Data: "02/08/2026",
      Valor: "300,00"
    },
    {
      ID: "1004",
      Cliente: "Diego Alves",
      Documento: "DOC004",
      Serviço: "Configuração",
      Data: "02/08/2026",
      Valor: "150,00"
    },
    {
      ID: "1006",
      Cliente: "Fabio Costa",
      Documento: "DOC006",
      Serviço: "Instalação",
      Data: "03/08/2026",
      Valor: "220,00"
    },
    {
      ID: "1007",
      Cliente: "Gabriela Reis",
      Documento: "DOC007",
      Serviço: "Manutenção",
      Data: "04/08/2026",
      Valor: "275,00"
    },
    {
      ID: "1008",
      Cliente: "Hugo Martins",
      Documento: "DOC008",
      Serviço: "Configuração",
      Data: "04/08/2026",
      Valor: "190,00"
    },
    {
      ID: "1009",
      Cliente: "Isabela Nunes",
      Documento: "DOC009",
      Serviço: "Consultoria Premium",
      Data: "05/08/2026",
      Valor: "350,00"
    },
    {
      ID: "1010",
      Cliente: "João Ribeiro",
      Documento: "DOC010",
      Serviço: "Instalação",
      Data: "05/08/2026",
      Valor: "210,00"
    },
    {
      ID: "1011",
      Cliente: "Karen Dias",
      Documento: "DOC011",
      Serviço: "Manutenção",
      Data: "06/08/2026",
      Valor: "290,00"
    },
    {
      ID: "1011",
      Cliente: "Karen Dias",
      Documento: "DOC011",
      Serviço: "Manutenção",
      Data: "06/08/2026",
      Valor: "290,00"
    }
  ];

}


function createVirtualFile(
  name
) {

  return {
    name,
    size: 0,
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    virtual: true
  };

}


/* ============================================================
   09. DOWNLOAD DOS ARQUIVOS DEMO
============================================================ */

function downloadDemoFiles() {

  if (
    typeof XLSX ===
    "undefined"
  ) {

    showToast(
      "A biblioteca de planilhas não foi carregada.",
      "error"
    );

    return;
  }


  const workbook =
    XLSX.utils.book_new();


  const sheetA =
    XLSX.utils.json_to_sheet(
      createDemoBaseA()
    );


  const sheetB =
    XLSX.utils.json_to_sheet(
      createDemoBaseB()
    );


  XLSX.utils.book_append_sheet(
    workbook,
    sheetA,
    "Base_A"
  );


  XLSX.utils.book_append_sheet(
    workbook,
    sheetB,
    "Base_B"
  );


  XLSX.writeFile(
    workbook,
    "loop-reconciler-demonstracao.xlsx"
  );

}


/* ============================================================
   10. ETAPAS
============================================================ */

function goToStep(step) {

  if (
    step < 1 ||
    step > 5
  ) {
    return;
  }


  state.currentStep =
    step;


  document
    .querySelectorAll(
      "[data-workspace-step]"
    )
    .forEach(
      section => {

        section.hidden =
          Number(
            section.dataset.workspaceStep
          ) !== step;

      }
    );


  updateStepNavigation();


  const target =
    document.querySelector(
      `[data-workspace-step="${step}"]`
    );


  target?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

}


function updateStepNavigation() {

  document
    .querySelectorAll(
      ".workflow-step"
    )
    .forEach(
      button => {

        const step =
          Number(
            button.dataset.step
          );


        button.classList.toggle(
          "is-active",
          step ===
          state.currentStep
        );


        button.classList.toggle(
          "is-complete",
          step <
          state.currentStep
        );

      }
    );

}


/* ============================================================
   11. DRAG AND DROP
============================================================ */

function configureDropZone(
  zone,
  input,
  baseName
) {

  if (
    !zone ||
    !input
  ) {
    return;
  }


  [
    "dragenter",
    "dragover"
  ]
    .forEach(
      eventName => {

        zone.addEventListener(
          eventName,
          event => {

            event.preventDefault();

            zone.classList.add(
              "is-dragging"
            );

          }
        );

      }
    );


  [
    "dragleave",
    "drop"
  ]
    .forEach(
      eventName => {

        zone.addEventListener(
          eventName,
          event => {

            event.preventDefault();

            zone.classList.remove(
              "is-dragging"
            );

          }
        );

      }
    );


  zone.addEventListener(
    "drop",
    event => {

      const files =
        Array.from(
          event.dataTransfer.files
        );


      handleSelectedFiles(
        files,
        baseName
      );

    }
  );

}


/* ============================================================
   12. ARQUIVOS
============================================================ */

async function handleSelectedFiles(
  files,
  baseName
) {

  if (
    !files.length
  ) {
    return;
  }


  const base =
    getBase(
      baseName
    );


  for (
    const file of files
  ) {

    try {

      validateFileExtension(
        file
      );


      const duplicate =
        base.files.some(
          item =>
            item.name ===
              file.name
            &&
            item.size ===
              file.size
        );


      if (duplicate) {

        showToast(
          `${file.name} já foi adicionado à Base ${baseName}.`,
          "warning"
        );

        continue;

      }


      showToast(
        `Lendo ${file.name}...`,
        "info"
      );


      const parsed =
        await parseFile(
          file
        );


      base.files.push(
        {
          name:
            file.name,

          size:
            file.size,

          type:
            file.type,

          originalFile:
            file,

          sheetCount:
            parsed.sheets.length,

          recordCount:
            parsed.records.length
        }
      );


      base.records.push(
        ...parsed.records
      );


      base.sheets.push(
        ...parsed.sheets
      );


      showToast(
        `${file.name} carregado: ${formatNumber(
          parsed.records.length
        )} registros.`,
        "success"
      );

    }

    catch (error) {

      console.error(
        error
      );


      base.errors.push(
        {
          file:
            file.name,

          error:
            error.message
        }
      );


      openFileError(
        file.name,
        error.message
      );

    }

  }


  updateBaseColumns(
    base
  );


  refreshBaseUI(
    baseName
  );


  populateMatchingSelectors();


  validateFilesStep();

}


/* ============================================================
   13. VALIDAÇÃO DO FORMATO
============================================================ */

function validateFileExtension(
  file
) {

  const extension =
    getExtension(
      file.name
    );


  if (
    !APP_CONFIG
      .supportedExtensions
      .includes(
        extension
      )
  ) {

    throw new Error(
      `Formato .${extension} não suportado.`
    );

  }

}


/* ============================================================
   14. LEITOR UNIVERSAL
============================================================ */

async function parseFile(
  file
) {

  const extension =
    getExtension(
      file.name
    );


  switch (
    extension
  ) {

    case "csv":
      return parseDelimitedFile(
        file,
        null
      );


    case "tsv":
      return parseDelimitedFile(
        file,
        "\t"
      );


    case "txt":
      return parseDelimitedFile(
        file,
        null
      );


    case "xls":
    case "xlsx":
    case "ods":
      return parseSpreadsheetFile(
        file
      );


    case "fods":
      return parseFODSFile(
        file
      );


    default:

      throw new Error(
        "Formato de arquivo não reconhecido."
      );

  }

}


/* ============================================================
   15. CSV / TSV / TXT
============================================================ */

function parseDelimitedFile(
  file,
  forcedDelimiter = null
) {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      if (
        typeof Papa ===
        "undefined"
      ) {

        reject(
          new Error(
            "PapaParse não foi carregado."
          )
        );

        return;
      }


      const config = {

        header: true,

        skipEmptyLines:
          "greedy",

        dynamicTyping:
          false,

        transformHeader:
          header =>
            String(
              header ?? ""
            )
              .replace(
                /^\uFEFF/,
                ""
              )
              .trim(),

        complete:
          results => {

            try {

              const records =
                results.data
                  .filter(
                    row =>
                      isUsefulRecord(
                        row
                      )
                  )
                  .map(
                    (
                      row,
                      index
                    ) =>
                      addMetadata(
                        row,
                        {
                          file:
                            file.name,

                          sheet:
                            "Arquivo",

                          row:
                            index + 2
                        }
                      )
                  );


              resolve(
                {
                  records,

                  sheets: [
                    {
                      file:
                        file.name,

                      sheet:
                        "Arquivo",

                      records:
                        records.length
                    }
                  ]
                }
              );

            }

            catch (error) {

              reject(
                error
              );

            }

          },

        error:
          error => {

            reject(
              new Error(
                `Erro ao ler ${file.name}: ${error.message}`
              )
            );

          }

      };


      if (
        forcedDelimiter
      ) {

        config.delimiter =
          forcedDelimiter;

      }


      Papa.parse(
        file,
        config
      );

    }
  );

}


/* ============================================================
   16. XLS / XLSX / ODS
============================================================ */

function parseSpreadsheetFile(
  file
) {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      if (
        typeof XLSX ===
        "undefined"
      ) {

        reject(
          new Error(
            "SheetJS/XLSX não foi carregado."
          )
        );

        return;
      }


      const reader =
        new FileReader();


      reader.onload =
        event => {

          try {

            const workbook =
              XLSX.read(
                event.target.result,
                {
                  type: "array",
                  cellDates: true
                }
              );


            if (
              !workbook
                .SheetNames
                .length
            ) {

              throw new Error(
                "A planilha não possui abas utilizáveis."
              );

            }


            const records = [];

            const sheets = [];


            workbook
              .SheetNames
              .forEach(
                sheetName => {

                  const worksheet =
                    workbook
                      .Sheets[
                        sheetName
                      ];


                  const rows =
                    XLSX.utils
                      .sheet_to_json(
                        worksheet,
                        {
                          defval: "",
                          raw: false
                        }
                      );


                  const usefulRows =
                    rows.filter(
                      row =>
                        isUsefulRecord(
                          row
                        )
                    );


                  usefulRows.forEach(
                    (
                      row,
                      index
                    ) => {

                      records.push(
                        addMetadata(
                          row,
                          {
                            file:
                              file.name,

                            sheet:
                              sheetName,

                            row:
                              index + 2
                          }
                        )
                      );

                    }
                  );


                  sheets.push(
                    {
                      file:
                        file.name,

                      sheet:
                        sheetName,

                      records:
                        usefulRows.length
                    }
                  );

                }
              );


            resolve(
              {
                records,
                sheets
              }
            );

          }

          catch (error) {

            reject(
              new Error(
                `Não foi possível ler ${file.name}: ${error.message}`
              )
            );

          }

        };


      reader.onerror =
        () => {

          reject(
            new Error(
              `Falha ao acessar ${file.name}.`
            )
          );

        };


      reader.readAsArrayBuffer(
        file
      );

    }
  );

}


/* ============================================================
   17. FODS
============================================================ */

async function parseFODSFile(
  file
) {

  const text =
    await file.text();


  const parser =
    new DOMParser();


  const xml =
    parser.parseFromString(
      text,
      "application/xml"
    );


  if (
    xml.querySelector(
      "parsererror"
    )
  ) {

    throw new Error(
      "O arquivo FODS contém XML inválido."
    );

  }


  const tables =
    Array.from(
      xml.getElementsByTagNameNS(
        "*",
        "table"
      )
    );


  if (
    !tables.length
  ) {

    throw new Error(
      "Nenhuma planilha foi encontrada no FODS."
    );

  }


  const allRecords = [];

  const sheets = [];


  tables.forEach(
    (
      table,
      tableIndex
    ) => {

      const sheetName =
        table.getAttributeNS(
          "*",
          "name"
        )
        ||
        table.getAttribute(
          "table:name"
        )
        ||
        `Planilha ${tableIndex + 1}`;


      const rows =
        Array.from(
          table.getElementsByTagNameNS(
            "*",
            "table-row"
          )
        );


      const matrix = [];


      rows.forEach(
        row => {

          const values = [];


          const cells =
            Array.from(
              row.children
            )
              .filter(
                child =>
                  child.localName ===
                    "table-cell"
                  ||
                  child.localName ===
                    "covered-table-cell"
              );


          cells.forEach(
            cell => {

              const repeat =
                Number(
                  cell.getAttributeNS(
                    "*",
                    "number-columns-repeated"
                  )
                  ||
                  cell.getAttribute(
                    "table:number-columns-repeated"
                  )
                  ||
                  1
                );


              const textValue =
                Array.from(
                  cell.getElementsByTagNameNS(
                    "*",
                    "p"
                  )
                )
                  .map(
                    paragraph =>
                      paragraph.textContent
                  )
                  .join(
                    "\n"
                  );


              for (
                let i = 0;
                i < repeat;
                i++
              ) {

                values.push(
                  textValue
                );

              }

            }
          );


          if (
            values.some(
              value =>
                String(
                  value
                ).trim()
            )
          ) {

            matrix.push(
              values
            );

          }

        }
      );


      if (
        matrix.length <
        2
      ) {

        sheets.push(
          {
            file:
              file.name,

            sheet:
              sheetName,

            records:
              0
          }
        );

        return;

      }


      const headers =
        makeUniqueHeaders(
          matrix[0]
        );


      let recordCount =
        0;


      matrix
        .slice(1)
        .forEach(
          (
            values,
            rowIndex
          ) => {

            const record = {};


            headers.forEach(
              (
                header,
                index
              ) => {

                record[
                  header
                ] =
                  values[index]
                  ?? "";

              }
            );


            if (
              isUsefulRecord(
                record
              )
            ) {

              allRecords.push(
                addMetadata(
                  record,
                  {
                    file:
                      file.name,

                    sheet:
                      sheetName,

                    row:
                      rowIndex + 2
                  }
                )
              );


              recordCount++;

            }

          }
        );


      sheets.push(
        {
          file:
            file.name,

          sheet:
            sheetName,

          records:
            recordCount
        }
      );

    }
  );


  return {
    records:
      allRecords,

    sheets
  };

}


/* ============================================================
   18. METADADOS
============================================================ */

function addMetadata(
  record,
  metadata
) {

  return {
    ...record,

    __sourceFile:
      metadata.file,

    __sourceSheet:
      metadata.sheet,

    __sourceRow:
      metadata.row
  };

}


/* ============================================================
   19. COLUNAS
============================================================ */

function updateBaseColumns(
  base
) {

  const columns =
    new Set();


  base.records.forEach(
    record => {

      Object.keys(
        record
      )
        .filter(
          key =>
            !key.startsWith(
              "__"
            )
        )
        .forEach(
          key =>
            columns.add(
              key
            )
        );

    }
  );


  base.columns =
    Array.from(
      columns
    );

}


/* ============================================================
   20. ATUALIZAÇÃO VISUAL DAS BASES
============================================================ */

function refreshBaseUI(
  baseName
) {

  const base =
    getBase(
      baseName
    );


  const elements =
    baseName === "A"
      ? {
          status:
            el.baseAStatus,

          summary:
            el.baseASummary,

          files:
            el.baseAFileCount,

          sheets:
            el.baseASheetCount,

          records:
            el.baseARecordCount,

          list:
            el.fileListA
        }
      : {
          status:
            el.baseBStatus,

          summary:
            el.baseBSummary,

          files:
            el.baseBFileCount,

          sheets:
            el.baseBSheetCount,

          records:
            el.baseBRecordCount,

          list:
            el.fileListB
        };


  const hasFiles =
    base.files.length > 0;


  elements.status.textContent =
    hasFiles
      ? "Pronta"
      : "Vazia";


  elements.status.classList.toggle(
    "is-ready",
    hasFiles
  );


  elements.summary.hidden =
    !hasFiles;


  elements.files.textContent =
    formatNumber(
      base.files.length
    );


  elements.sheets.textContent =
    formatNumber(
      base.sheets.length
    );


  elements.records.textContent =
    formatNumber(
      base.records.length
    );


  renderFileList(
    baseName
  );

}


/* ============================================================
   21. LISTA DE ARQUIVOS
============================================================ */

function renderFileList(
  baseName
) {

  const base =
    getBase(
      baseName
    );


  const container =
    baseName === "A"
      ? el.fileListA
      : el.fileListB;


  container.innerHTML =
    "";


  base.files.forEach(
    (
      file,
      index
    ) => {

      const item =
        document.createElement(
          "div"
        );


      item.className =
        "file-item";


      const extension =
        getExtension(
          file.name
        )
          .toUpperCase();


      item.innerHTML =
        `
        <div class="file-item__main">

          <span class="file-item__icon">
            ${escapeHTML(extension)}
          </span>

          <span class="file-item__text">

            <strong title="${escapeHTML(
              file.name
            )}">
              ${escapeHTML(
                file.name
              )}
            </strong>

            <small>
              ${formatNumber(
                file.recordCount ?? 0
              )} registros ·
              ${formatNumber(
                file.sheetCount ?? 0
              )} aba(s)
            </small>

          </span>

        </div>

        <div class="file-item__actions">

          <button
            type="button"
            class="file-item__remove"
            title="Remover arquivo"
            aria-label="Remover arquivo"
          >
            ×
          </button>

        </div>
        `;


      item
        .querySelector(
          ".file-item__remove"
        )
        .addEventListener(
          "click",
          () =>
            removeFile(
              baseName,
              index
            )
        );


      container.appendChild(
        item
      );

    }
  );

}


/* ============================================================
   22. REMOVER ARQUIVO
============================================================ */

async function removeFile(
  baseName,
  fileIndex
) {

  const base =
    getBase(
      baseName
    );


  base.files.splice(
    fileIndex,
    1
  );


  await rebuildBaseFromFiles(
    baseName
  );


  showToast(
    `Arquivo removido da Base ${baseName}.`,
    "success"
  );

}


/* ============================================================
   23. RECONSTRUIR BASE
============================================================ */

async function rebuildBaseFromFiles(
  baseName
) {

  const base =
    getBase(
      baseName
    );


  const files =
    [
      ...base.files
    ];


  base.records = [];

  base.sheets = [];

  base.errors = [];


  for (
    const fileInfo of files
  ) {

    if (
      fileInfo.virtual
    ) {

      continue;

    }


    if (
      !fileInfo.originalFile
    ) {

      continue;

    }


    try {

      const parsed =
        await parseFile(
          fileInfo.originalFile
        );


      base.records.push(
        ...parsed.records
      );


      base.sheets.push(
        ...parsed.sheets
      );


      fileInfo.recordCount =
        parsed.records.length;


      fileInfo.sheetCount =
        parsed.sheets.length;

    }

    catch (error) {

      base.errors.push(
        {
          file:
            fileInfo.name,

          error:
            error.message
        }
      );

    }

  }


  updateBaseColumns(
    base
  );


  refreshBaseUI(
    baseName
  );


  populateMatchingSelectors();


  validateFilesStep();

}


/* ============================================================
   24. VALIDAÇÃO DA ETAPA DE ARQUIVOS
============================================================ */

function validateFilesStep() {

  const valid =
    state.baseA.records.length > 0
    &&
    state.baseB.records.length > 0;


  el.goToMatchingButton.disabled =
    !valid;

}


/* ============================================================
   25. SELECTS DE MATCHING
============================================================ */

function populateMatchingSelectors() {

  preserveAndPopulateSelect(
    el.matchingColumnA,
    state.baseA.columns,
    state.matching.columnA
  );


  preserveAndPopulateSelect(
    el.matchingColumnB,
    state.baseB.columns,
    state.matching.columnB
  );


  autoSuggestMatchingColumns();


  renderCompositeKeyRows();

  renderColumnMappingRows();

}


/* ============================================================
   26. SUGESTÃO AUTOMÁTICA DE CHAVE
============================================================ */

function autoSuggestMatchingColumns() {

  if (
    state.matching.columnA ||
    state.matching.columnB
  ) {

    return;

  }


  const commonA =
    state.baseA.columns.find(
      columnA =>

        state.baseB.columns.some(
          columnB =>

            normalizeColumnName(
              columnA
            )
            ===
            normalizeColumnName(
              columnB
            )

        )
    );


  if (!commonA) {
    return;
  }


  const commonB =
    state.baseB.columns.find(
      columnB =>

        normalizeColumnName(
          columnB
        )
        ===
        normalizeColumnName(
          commonA
        )
    );


  state.matching.columnA =
    commonA;


  state.matching.columnB =
    commonB ?? "";


  el.matchingColumnA.value =
    state.matching.columnA;


  el.matchingColumnB.value =
    state.matching.columnB;


  validateMatching();

}


/* ============================================================
   27. CHAVE COMPOSTA
============================================================ */

function handleCompositeModeChange() {

  state.matching.compositeEnabled =
    el.enableCompositeKey.checked;


  el.compositeKeyBuilder.hidden =
    !state.matching.compositeEnabled;


  if (
    state.matching.compositeEnabled
    &&
    !state.matching.compositePairs.length
  ) {

    addCompositeKeyRow();

  }


  validateMatching();

}


function addCompositeKeyRow() {

  state.matching.compositePairs.push(
    {
      columnA: "",
      columnB: ""
    }
  );


  renderCompositeKeyRows();

}


function removeCompositeKeyRow(
  index
) {

  state.matching.compositePairs.splice(
    index,
    1
  );


  renderCompositeKeyRows();


  validateMatching();

}


function renderCompositeKeyRows() {

  if (
    !el.compositeKeyList
  ) {
    return;
  }


  el.compositeKeyList.innerHTML =
    "";


  state.matching
    .compositePairs
    .forEach(
      (
        pair,
        index
      ) => {

        const row =
          document.createElement(
            "div"
          );


        row.className =
          "composite-key-row";


        const selectA =
          createColumnSelect(
            state.baseA.columns,
            pair.columnA
          );


        const connector =
          document.createElement(
            "span"
          );


        connector.textContent =
          "↔";


        const selectB =
          createColumnSelect(
            state.baseB.columns,
            pair.columnB
          );


        const remove =
          createRemoveButton();


        selectA.addEventListener(
          "change",
          () => {

            pair.columnA =
              selectA.value;

            validateMatching();

          }
        );


        selectB.addEventListener(
          "change",
          () => {

            pair.columnB =
              selectB.value;

            validateMatching();

          }
        );


        remove.addEventListener(
          "click",
          () =>
            removeCompositeKeyRow(
              index
            )
        );


        row.append(
          selectA,
          connector,
          selectB,
          remove
        );


        el.compositeKeyList.appendChild(
          row
        );

      }
    );

}


/* ============================================================
   28. MAPEAMENTO DE COLUNAS
============================================================ */

function addColumnMappingRow() {

  state.matching.mappings.push(
    {
      columnA: "",
      columnB: ""
    }
  );


  renderColumnMappingRows();

}


function removeColumnMappingRow(
  index
) {

  state.matching.mappings.splice(
    index,
    1
  );


  renderColumnMappingRows();

}


function renderColumnMappingRows() {

  if (
    !el.columnMappingList
  ) {
    return;
  }


  el.columnMappingList.innerHTML =
    "";


  state.matching
    .mappings
    .forEach(
      (
        mapping,
        index
      ) => {

        const row =
          document.createElement(
            "div"
          );


        row.className =
          "column-mapping-row";


        const selectA =
          createColumnSelect(
            state.baseA.columns,
            mapping.columnA
          );


        const connector =
          document.createElement(
            "span"
          );


        connector.textContent =
          "↔";


        const selectB =
          createColumnSelect(
            state.baseB.columns,
            mapping.columnB
          );


        const remove =
          createRemoveButton();


        selectA.addEventListener(
          "change",
          () => {

            mapping.columnA =
              selectA.value;

          }
        );


        selectB.addEventListener(
          "change",
          () => {

            mapping.columnB =
              selectB.value;

          }
        );


        remove.addEventListener(
          "click",
          () =>
            removeColumnMappingRow(
              index
            )
        );


        row.append(
          selectA,
          connector,
          selectB,
          remove
        );


        el.columnMappingList.appendChild(
          row
        );

      }
    );

}


/* ============================================================
   29. VALIDAÇÃO DE MATCHING
============================================================ */

function validateMatching() {

  let valid =
    Boolean(
      state.matching.columnA
      &&
      state.matching.columnB
    );


  if (
    state.matching.compositeEnabled
  ) {

    valid =
      valid
      &&
      state.matching
        .compositePairs
        .length > 0
      &&
      state.matching
        .compositePairs
        .every(
          pair =>
            pair.columnA
            &&
            pair.columnB
        );

  }


  el.goToConfigurationButton.disabled =
    !valid;

}


/* ============================================================
   30. CONFIGURAÇÕES
============================================================ */

function getSettings() {

  return {
    trimValues:
      Boolean(
        el.trimValues?.checked
      ),

    ignoreCase:
      Boolean(
        el.ignoreCase?.checked
      ),

    ignoreAccents:
      Boolean(
        el.ignoreAccents?.checked
      ),

    ignoreSpecialCharacters:
      Boolean(
        el.ignoreSpecialCharacters?.checked
      ),

    normalizeLeadingZeros:
      Boolean(
        el.normalizeLeadingZeros?.checked
      ),

    detectDuplicates:
      Boolean(
        el.detectDuplicates?.checked
      ),

    compareFields:
      Boolean(
        el.compareFields?.checked
      ),

    ignoreEmptyRecords:
      Boolean(
        el.ignoreEmptyRecords?.checked
      ),

    detectTypeMismatch:
      Boolean(
        el.detectTypeMismatch?.checked
      ),

    normalizeDecimalSeparators:
      Boolean(
        el.normalizeDecimalSeparators?.checked
      ),

    ignoreCurrencySymbols:
      Boolean(
        el.ignoreCurrencySymbols?.checked
      ),

    normalizeThousandsSeparators:
      Boolean(
        el.normalizeThousandsSeparators?.checked
      ),

    normalizeDates:
      Boolean(
        el.normalizeDates?.checked
      ),

    ignoreTimeInDates:
      Boolean(
        el.ignoreTimeInDates?.checked
      )
  };

}


/* ============================================================
   31. NORMALIZAÇÃO
============================================================ */

function normalizeValue(
  value
) {

  const settings =
    getSettings();


  if (
    value === null ||
    value === undefined
  ) {

    return "";

  }


  let result =
    String(
      value
    );


  if (
    settings.trimValues
  ) {

    result =
      result.trim();

  }


  if (
    settings.ignoreCurrencySymbols
  ) {

    result =
      result.replace(
        /[R$€£¥]/gi,
        ""
      );

  }


  if (
    settings.ignoreAccents
  ) {

    result =
      result
        .normalize(
          "NFD"
        )
        .replace(
          /[\u0300-\u036f]/g,
          ""
        );

  }


  if (
    settings.ignoreCase
  ) {

    result =
      result.toLowerCase();

  }


  if (
    settings.ignoreSpecialCharacters
  ) {

    result =
      result.replace(
        /[^a-zA-Z0-9À-ÿ\s.,/-]/g,
        ""
      );

  }


  if (
    settings.normalizeDates
  ) {

    const normalizedDate =
      tryNormalizeDate(
        result,
        settings.ignoreTimeInDates
      );


    if (
      normalizedDate !== null
    ) {

      result =
        normalizedDate;

    }

  }


  if (
    settings.normalizeDecimalSeparators
  ) {

    const normalizedNumber =
      tryNormalizeNumber(
        result
      );


    if (
      normalizedNumber !== null
    ) {

      result =
        normalizedNumber;

    }

  }


  if (
    settings.normalizeLeadingZeros
    &&
    /^\d+$/.test(
      result
    )
  ) {

    result =
      result.replace(
        /^0+(?=\d)/,
        ""
      );

  }


  return result;

}


/* ============================================================
   32. NÚMEROS
============================================================ */

function tryNormalizeNumber(
  value
) {

  let string =
    String(
      value
    )
      .trim()
      .replace(
        /\s+/g,
        ""
      );


  if (
    !/[0-9]/.test(
      string
    )
  ) {

    return null;

  }


  string =
    string.replace(
      /[R$€£¥]/gi,
      ""
    );


  const hasComma =
    string.includes(
      ","
    );


  const hasDot =
    string.includes(
      "."
    );


  if (
    hasComma &&
    hasDot
  ) {

    const lastComma =
      string.lastIndexOf(
        ","
      );


    const lastDot =
      string.lastIndexOf(
        "."
      );


    if (
      lastComma >
      lastDot
    ) {

      string =
        string
          .replace(
            /\./g,
            ""
          )
          .replace(
            ",",
            "."
          );

    }

    else {

      string =
        string.replace(
          /,/g,
          ""
        );

    }

  }

  else if (
    hasComma
  ) {

    string =
      string.replace(
        ",",
        "."
      );

  }


  if (
    !/^-?\d+(\.\d+)?$/.test(
      string
    )
  ) {

    return null;

  }


  const number =
    Number(
      string
    );


  if (
    !Number.isFinite(
      number
    )
  ) {

    return null;

  }


  return String(
    number
  );

}


/* ============================================================
   33. DATAS
============================================================ */

function tryNormalizeDate(
  value,
  ignoreTime = false
) {

  const string =
    String(
      value
    ).trim();


  if (
    !string
  ) {

    return null;

  }


  let match =
    string.match(
      /^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{4})(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?)?$/
    );


  if (
    match
  ) {

    const day =
      match[1]
        .padStart(
          2,
          "0"
        );


    const month =
      match[2]
        .padStart(
          2,
          "0"
        );


    const year =
      match[3];


    let result =
      `${year}-${month}-${day}`;


    if (
      !ignoreTime &&
      match[4]
    ) {

      const hour =
        match[4]
          .padStart(
            2,
            "0"
          );


      const minute =
        match[5]
        ??
        "00";


      const second =
        match[6]
        ??
        "00";


      result +=
        `T${hour}:${minute}:${second}`;

    }


    return result;

  }


  match =
    string.match(
      /^(\d{4})-(\d{1,2})-(\d{1,2})(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?)?$/
    );


  if (
    match
  ) {

    const year =
      match[1];


    const month =
      match[2]
        .padStart(
          2,
          "0"
        );


    const day =
      match[3]
        .padStart(
          2,
          "0"
        );


    let result =
      `${year}-${month}-${day}`;


    if (
      !ignoreTime &&
      match[4]
    ) {

      result +=
        `T${match[4].padStart(
          2,
          "0"
        )}:${match[5] ?? "00"}:${match[6] ?? "00"}`;

    }


    return result;

  }


  return null;

}


/* ============================================================
   34. PRESETS
============================================================ */

function saveCurrentPreset() {

  const name =
    window.prompt(
      "Nome da configuração:"
    );


  if (
    !name?.trim()
  ) {
    return;
  }


  const presets =
    getStoredPresets();


  presets.push(
    {
      id:
        crypto.randomUUID
          ? crypto.randomUUID()
          : String(
              Date.now()
            ),

      name:
        name.trim(),

      createdAt:
        new Date()
          .toISOString(),

      matching:
        JSON.parse(
          JSON.stringify(
            state.matching
          )
        ),

      settings:
        getSettings()
    }
  );


  localStorage.setItem(
    APP_CONFIG.storageKeys.presets,
    JSON.stringify(
      presets
    )
  );


  showToast(
    "Configuração salva.",
    "success"
  );

}


function openPresetManager() {

  const presets =
    getStoredPresets();


  el.presetModalContent.innerHTML =
    "";


  if (
    !presets.length
  ) {

    el.presetModalContent.innerHTML =
      `
        <p>
          Nenhuma configuração foi salva ainda.
        </p>
      `;

  }

  else {

    presets.forEach(
      preset => {

        const block =
          document.createElement(
            "div"
          );


        block.className =
          "detail-block";


        block.innerHTML =
          `
          <strong>
            ${escapeHTML(
              preset.name
            )}
          </strong>

          <p>
            ${formatDateTime(
              preset.createdAt
            )}
          </p>

          <div
            style="
              display:flex;
              gap:8px;
              margin-top:10px;
              flex-wrap:wrap;
            "
          >

            <button
              type="button"
              class="button button--primary preset-load"
            >
              Carregar
            </button>

            <button
              type="button"
              class="button button--danger-soft preset-delete"
            >
              Excluir
            </button>

          </div>
          `;


        block
          .querySelector(
            ".preset-load"
          )
          .addEventListener(
            "click",
            () => {

              loadPreset(
                preset
              );

              closeModal(
                el.presetModal
              );

            }
          );


        block
          .querySelector(
            ".preset-delete"
          )
          .addEventListener(
            "click",
            () => {

              deletePreset(
                preset.id
              );

              openPresetManager();

            }
          );


        el.presetModalContent.appendChild(
          block
        );

      }
    );

  }


  openModal(
    el.presetModal
  );

}


function getStoredPresets() {

  try {

    const stored =
      JSON.parse(
        localStorage.getItem(
          APP_CONFIG.storageKeys.presets
        )
        ||
        "[]"
      );


    return Array.isArray(
      stored
    )
      ? stored
      : [];

  }

  catch {

    return [];

  }

}


function deletePreset(
  id
) {

  const presets =
    getStoredPresets()
      .filter(
        preset =>
          preset.id !== id
      );


  localStorage.setItem(
    APP_CONFIG.storageKeys.presets,
    JSON.stringify(
      presets
    )
  );

}


function loadPreset(
  preset
) {

  state.matching =
    {
      columnA:
        preset.matching
          ?.columnA
        ?? "",

      columnB:
        preset.matching
          ?.columnB
        ?? "",

      compositeEnabled:
        Boolean(
          preset.matching
            ?.compositeEnabled
        ),

      compositePairs:
        preset.matching
          ?.compositePairs
        ?? [],

      mappings:
        preset.matching
          ?.mappings
        ?? []
    };


  const settings =
    preset.settings
    ?? {};


  Object.entries(
    settings
  )
    .forEach(
      (
        [
          key,
          value
        ]
      ) => {

        if (
          el[key]
          &&
          "checked" in
            el[key]
        ) {

          el[key].checked =
            Boolean(
              value
            );

        }

      }
    );


  el.enableCompositeKey.checked =
    state.matching.compositeEnabled;


  el.compositeKeyBuilder.hidden =
    !state.matching.compositeEnabled;


  populateMatchingSelectors();


  showToast(
    `Configuração "${preset.name}" carregada.`,
    "success"
  );

}


/* ============================================================
   35. REVISÃO
============================================================ */

function updateReview() {

  el.reviewBaseAFiles.textContent =
    `${formatNumber(
      state.baseA.files.length
    )} arquivo(s)`;


  el.reviewBaseARecords.textContent =
    `${formatNumber(
      state.baseA.records.length
    )} registros`;


  el.reviewBaseBFiles.textContent =
    `${formatNumber(
      state.baseB.files.length
    )} arquivo(s)`;


  el.reviewBaseBRecords.textContent =
    `${formatNumber(
      state.baseB.records.length
    )} registros`;


  el.reviewKeyA.textContent =
    describeKey(
      "A"
    );


  el.reviewKeyB.textContent =
    describeKey(
      "B"
    );

}


/* ============================================================
   36. EXECUÇÃO DA ANÁLISE
============================================================ */

async function executeAnalysis() {

  try {

    validateBeforeAnalysis();


    el.runAnalysisButton.disabled =
      true;


    state.analysis.startedAt =
      new Date();


    state.analysis.name =
      el.analysisName.value.trim()
      ||
      `Análise ${formatDateTime(
        new Date()
      )}`;


    setAnalysisStatus(
      "Preparando análise...",
      ""
    );


    showProgress(
      true
    );


    updateProgress(
      10,
      "Preparando registros..."
    );


    await nextFrame();


    const indexA =
      buildRecordIndex(
        state.baseA.records,
        "A"
      );


    updateProgress(
      35,
      "Indexando Base A..."
    );


    await nextFrame();


    const indexB =
      buildRecordIndex(
        state.baseB.records,
        "B"
      );


    updateProgress(
      55,
      "Indexando Base B..."
    );


    await nextFrame();


    state.results =
      reconcileIndexes(
        indexA,
        indexB
      );


    updateProgress(
      80,
      "Calculando resultados..."
    );


    await nextFrame();


    state.analysis.completedAt =
      new Date();


    state.pagination.page =
      1;


    state.filters.status =
      "all";


    state.filters.search =
      "";


    if (
      el.resultsSearch
    ) {

      el.resultsSearch.value =
        "";

    }


    setActiveFilterButton(
      "all"
    );


    applyResultFilters();


    updateMetrics();


    updateProgress(
      100,
      "Concluído"
    );


    setAnalysisStatus(
      `Análise concluída: ${formatNumber(
        state.results.length
      )} chave(s) avaliadas.`,
      "success"
    );


    if (
      el.resultsSubtitle
    ) {

      el.resultsSubtitle.textContent =
        `${state.analysis.name} · ${formatDateTime(
          state.analysis.completedAt
        )}`;

    }


    await delay(
      250
    );


    goToStep(
      5
    );


    showToast(
      "Conciliação concluída.",
      "success"
    );

  }

  catch (error) {

    console.error(
      error
    );


    setAnalysisStatus(
      error.message,
      "error"
    );


    showToast(
      error.message,
      "error"
    );

  }

  finally {

    el.runAnalysisButton.disabled =
      false;

  }

}


/* ============================================================
   37. VALIDAÇÃO ANTES DA ANÁLISE
============================================================ */

function validateBeforeAnalysis() {

  if (
    !state.baseA.records.length
  ) {

    throw new Error(
      "A Base A não possui registros."
    );

  }


  if (
    !state.baseB.records.length
  ) {

    throw new Error(
      "A Base B não possui registros."
    );

  }


  if (
    !state.matching.columnA ||
    !state.matching.columnB
  ) {

    throw new Error(
      "Defina as colunas principais de correspondência."
    );

  }


  if (
    state.matching.compositeEnabled
  ) {

    const invalid =
      state.matching
        .compositePairs
        .some(
          pair =>
            !pair.columnA
            ||
            !pair.columnB
        );


    if (
      invalid
    ) {

      throw new Error(
        "Complete todas as colunas da chave composta."
      );

    }

  }

}


/* ============================================================
   38. GERAR CHAVE
============================================================ */

function buildKey(
  record,
  side
) {

  const mainColumn =
    side === "A"
      ? state.matching.columnA
      : state.matching.columnB;


  const components = [
    normalizeValue(
      record[
        mainColumn
      ]
    )
  ];


  if (
    state.matching.compositeEnabled
  ) {

    state.matching
      .compositePairs
      .forEach(
        pair => {

          const column =
            side === "A"
              ? pair.columnA
              : pair.columnB;


          components.push(
            normalizeValue(
              record[
                column
              ]
            )
          );

        }
      );

  }


  return components.join(
    "||"
  );

}


/* ============================================================
   39. ÍNDICE
============================================================ */

function buildRecordIndex(
  records,
  side
) {

  const index =
    new Map();


  const settings =
    getSettings();


  records.forEach(
    record => {

      const key =
        buildKey(
          record,
          side
        );


      if (
        settings.ignoreEmptyRecords
        &&
        isEmptyKey(
          key
        )
      ) {

        return;

      }


      if (
        !index.has(
          key
        )
      ) {

        index.set(
          key,
          []
        );

      }


      index
        .get(
          key
        )
        .push(
          record
        );

    }
  );


  return index;

}


/* ============================================================
   40. RECONCILIAÇÃO
============================================================ */

function reconcileIndexes(
  indexA,
  indexB
) {

  const settings =
    getSettings();


  const allKeys =
    new Set([
      ...indexA.keys(),
      ...indexB.keys()
    ]);


  const results = [];


  allKeys.forEach(
    key => {

      const recordsA =
        indexA.get(
          key
        )
        ?? [];


      const recordsB =
        indexB.get(
          key
        )
        ?? [];


      const displayKey =
        getDisplayKey(
          recordsA,
          recordsB
        );


      if (
        !recordsA.length
      ) {

        results.push(
          createResult({
            type:
              "missing-a",

            key:
              displayKey,

            normalizedKey:
              key,

            recordsA,

            recordsB,

            differences:
              []
          })
        );

        return;

      }


      if (
        !recordsB.length
      ) {

        results.push(
          createResult({
            type:
              "missing-b",

            key:
              displayKey,

            normalizedKey:
              key,

            recordsA,

            recordsB,

            differences:
              []
          })
        );

        return;

      }


      if (
        settings.detectDuplicates
        &&
        (
          recordsA.length > 1
          ||
          recordsB.length > 1
        )
      ) {

        results.push(
          createResult({
            type:
              "duplicate",

            key:
              displayKey,

            normalizedKey:
              key,

            recordsA,

            recordsB,

            differences:
              compareBestRecordPair(
                recordsA,
                recordsB
              )
          })
        );

        return;

      }


      const differences =
        settings.compareFields
          ? compareRecords(
              recordsA[0],
              recordsB[0]
            )
          : [];


      results.push(
        createResult({
          type:
            differences.length
              ? "different"
              : "match",

          key:
            displayKey,

          normalizedKey:
            key,

          recordsA,

          recordsB,

          differences
        })
      );

    }
  );


  return results;

}


/* ============================================================
   41. RESULTADO
============================================================ */

function createResult(
  data
) {

  return {
    ...data,

    sourcesA:
      getSources(
        data.recordsA
      ),

    sourcesB:
      getSources(
        data.recordsB
      )
  };

}


/* ============================================================
   42. MELHOR PAR DUPLICADO
============================================================ */

function compareBestRecordPair(
  recordsA,
  recordsB
) {

  if (
    !recordsA.length ||
    !recordsB.length
  ) {

    return [];

  }


  let best = null;


  recordsA.forEach(
    recordA => {

      recordsB.forEach(
        recordB => {

          const differences =
            compareRecords(
              recordA,
              recordB
            );


          if (
            !best
            ||
            differences.length <
            best.length
          ) {

            best =
              differences;

          }

        }
      );

    }
  );


  return best
    ?? [];

}


/* ============================================================
   43. COMPARAÇÃO CAMPO A CAMPO
============================================================ */

function compareRecords(
  recordA,
  recordB
) {

  const mappings =
    buildComparisonMappings(
      recordA,
      recordB
    );


  const settings =
    getSettings();


  const differences = [];


  mappings.forEach(
    mapping => {

      if (
        isKeyColumn(
          mapping.columnA,
          mapping.columnB
        )
      ) {

        return;

      }


      const valueA =
        mapping.columnA
          ? recordA[
              mapping.columnA
            ]
          : "";


      const valueB =
        mapping.columnB
          ? recordB[
              mapping.columnB
            ]
          : "";


      const normalizedA =
        normalizeValue(
          valueA
        );


      const normalizedB =
        normalizeValue(
          valueB
        );


      const valueDifferent =
        normalizedA !==
        normalizedB;


      const typeDifferent =
        settings.detectTypeMismatch
        &&
        typeof valueA !==
          typeof valueB
        &&
        String(valueA) !==
          String(valueB);


      if (
        valueDifferent
        ||
        typeDifferent
      ) {

        differences.push(
          {
            columnA:
              mapping.columnA,

            columnB:
              mapping.columnB,

            label:
              mapping.columnA
              ||
              mapping.columnB
              ||
              "Campo",

            valueA,

            valueB,

            normalizedA,

            normalizedB,

            typeDifferent
          }
        );

      }

    }
  );


  return differences;

}


/* ============================================================
   44. MAPEAR CAMPOS PARA COMPARAÇÃO
============================================================ */

function buildComparisonMappings(
  recordA,
  recordB
) {

  const mappings = [];

  const usedA =
    new Set();

  const usedB =
    new Set();


  state.matching
    .mappings
    .filter(
      mapping =>
        mapping.columnA
        &&
        mapping.columnB
    )
    .forEach(
      mapping => {

        mappings.push(
          {
            columnA:
              mapping.columnA,

            columnB:
              mapping.columnB
          }
        );


        usedA.add(
          mapping.columnA
        );


        usedB.add(
          mapping.columnB
        );

      }
    );


  const columnsA =
    getBusinessColumns(
      recordA
    );


  const columnsB =
    getBusinessColumns(
      recordB
    );


  columnsA.forEach(
    columnA => {

      if (
        usedA.has(
          columnA
        )
      ) {
        return;
      }


      const matchB =
        columnsB.find(
          columnB =>

            !usedB.has(
              columnB
            )
            &&
            normalizeColumnName(
              columnA
            )
            ===
            normalizeColumnName(
              columnB
            )
        );


      if (
        matchB
      ) {

        mappings.push(
          {
            columnA,
            columnB:
              matchB
          }
        );


        usedA.add(
          columnA
        );


        usedB.add(
          matchB
        );

      }

      else {

        mappings.push(
          {
            columnA,
            columnB:
              null
          }
        );


        usedA.add(
          columnA
        );

      }

    }
  );


  columnsB.forEach(
    columnB => {

      if (
        usedB.has(
          columnB
        )
      ) {
        return;
      }


      mappings.push(
        {
          columnA:
            null,

          columnB
        }
      );

    }
  );


  return mappings;

}


/* ============================================================
   45. IDENTIFICAR COLUNA-CHAVE
============================================================ */

function isKeyColumn(
  columnA,
  columnB
) {

  if (
    columnA ===
      state.matching.columnA
    ||
    columnB ===
      state.matching.columnB
  ) {

    return true;

  }


  if (
    state.matching.compositeEnabled
  ) {

    return state.matching
      .compositePairs
      .some(
        pair =>
          pair.columnA ===
            columnA
          ||
          pair.columnB ===
            columnB
      );

  }


  return false;

}


/* ============================================================
   46. MÉTRICAS
============================================================ */

function updateMetrics() {

  const count =
    type =>
      state.results
        .filter(
          result =>
            result.type ===
            type
        )
        .length;


  const matches =
    count(
      "match"
    );


  const differences =
    count(
      "different"
    );


  const missingA =
    count(
      "missing-a"
    );


  const missingB =
    count(
      "missing-b"
    );


  const duplicates =
    count(
      "duplicate"
    );


  const total =
    state.results.length;


  const rate =
    total
      ? (
          matches /
          total
        ) * 100
      : 0;


  el.metricTotalA.textContent =
    formatNumber(
      state.baseA.records.length
    );


  el.metricTotalB.textContent =
    formatNumber(
      state.baseB.records.length
    );


  el.metricMatches.textContent =
    formatNumber(
      matches
    );


  el.metricDifferences.textContent =
    formatNumber(
      differences
    );


  el.metricMissingA.textContent =
    formatNumber(
      missingA
    );


  el.metricMissingB.textContent =
    formatNumber(
      missingB
    );


  el.metricDuplicates.textContent =
    formatNumber(
      duplicates
    );


  el.metricMatchRate.textContent =
    `${rate.toFixed(
      1
    )}%`;

}


/* ============================================================
   47. FILTRAGEM
============================================================ */

function setResultFilter(
  filter
) {

  state.filters.status =
    filter;


  state.pagination.page =
    1;


  setActiveFilterButton(
    filter
  );


  applyResultFilters();

}


function setActiveFilterButton(
  filter
) {

  document
    .querySelectorAll(
      "[data-result-filter]"
    )
    .forEach(
      button => {

        button.classList.toggle(
          "is-active",
          button.dataset.resultFilter ===
            filter
        );

      }
    );

}


function showOnlyErrors() {

  state.filters.status =
    "errors";


  state.pagination.page =
    1;


  document
    .querySelectorAll(
      "[data-result-filter]"
    )
    .forEach(
      button =>
        button.classList.remove(
          "is-active"
        )
    );


  applyResultFilters();


  showToast(
    "Exibindo somente inconsistências.",
    "info"
  );

}


function applyResultFilters() {

  let results =
    [
      ...state.results
    ];


  if (
    state.filters.status ===
    "errors"
  ) {

    results =
      results.filter(
        result =>
          result.type !==
            "match"
      );

  }

  else if (
    state.filters.status !==
    "all"
  ) {

    results =
      results.filter(
        result =>
          result.type ===
            state.filters.status
      );

  }


  if (
    state.filters.search
  ) {

    const search =
      state.filters.search;


    results =
      results.filter(
        result =>

          buildResultSearchText(
            result
          )
            .includes(
              search
            )
      );

  }


  sortResults(
    results,
    state.filters.sort
  );


  state.filteredResults =
    results;


  const totalPages =
    getTotalPages();


  if (
    state.pagination.page >
    totalPages
  ) {

    state.pagination.page =
      Math.max(
        totalPages,
        1
      );

  }


  renderResults();

}


/* ============================================================
   48. ORDENAÇÃO
============================================================ */

function sortResults(
  results,
  sort
) {

  const statusOrder = {
    "different": 1,
    "missing-a": 2,
    "missing-b": 3,
    "duplicate": 4,
    "match": 5
  };


  switch (
    sort
  ) {

    case "key-asc":

      results.sort(
        (
          a,
          b
        ) =>
          String(
            a.key
          )
            .localeCompare(
              String(
                b.key
              ),
              "pt-BR",
              {
                numeric: true
              }
            )
      );

      break;


    case "key-desc":

      results.sort(
        (
          a,
          b
        ) =>
          String(
            b.key
          )
            .localeCompare(
              String(
                a.key
              ),
              "pt-BR",
              {
                numeric: true
              }
            )
      );

      break;


    case "source":

      results.sort(
        (
          a,
          b
        ) =>
          String(
            a.sourcesA
            ||
            a.sourcesB
          )
            .localeCompare(
              String(
                b.sourcesA
                ||
                b.sourcesB
            ),
              "pt-BR"
            )
      );

      break;


    case "status":
    default:

      results.sort(
        (
          a,
          b
        ) =>
          (
            statusOrder[
              a.type
            ]
            ?? 99
          )
          -
          (
            statusOrder[
              b.type
            ]
            ?? 99
          )
      );

  }

}


/* ============================================================
   49. RENDERIZAÇÃO DA TABELA
============================================================ */

function renderResults() {

  el.resultsTableBody.innerHTML =
    "";


  const total =
    state.filteredResults.length;


  if (
    !total
  ) {

    el.resultsEmptyState.hidden =
      false;


    updatePaginationUI();

    return;

  }


  el.resultsEmptyState.hidden =
    true;


  const start =
    (
      state.pagination.page -
      1
    )
    *
    state.pagination.pageSize;


  const end =
    start
    +
    state.pagination.pageSize;


  const pageResults =
    state.filteredResults.slice(
      start,
      end
    );


  const fragment =
    document.createDocumentFragment();


  pageResults.forEach(
    result => {

      const row =
        document.createElement(
          "tr"
        );


      row.innerHTML =
        `
        <td>
          <span
            class="status-badge ${getStatusClass(
              result.type
            )}"
          >
            ${escapeHTML(
              getStatusText(
                result.type
              )
            )}
          </span>
        </td>

        <td>
          ${escapeHTML(
            result.key
            || "—"
          )}
        </td>

        <td>
          ${escapeHTML(
            result.sourcesA
            || "—"
          )}
        </td>

        <td>
          ${escapeHTML(
            result.sourcesB
            || "—"
          )}
        </td>

        <td>
          ${escapeHTML(
            summarizeRecords(
              result.recordsA
            )
          )}
        </td>

        <td>
          ${escapeHTML(
            summarizeRecords(
              result.recordsB
            )
          )}
        </td>

        <td>
          <button
            type="button"
            class="button button--ghost details-button"
          >
            Ver detalhes
          </button>
        </td>
        `;


      row
        .querySelector(
          ".details-button"
        )
        .addEventListener(
          "click",
          () =>
            openResultDetails(
              result
            )
        );


      fragment.appendChild(
        row
      );

    }
  );


  el.resultsTableBody.appendChild(
    fragment
  );


  updatePaginationUI();

}


/* ============================================================
   50. PAGINAÇÃO
============================================================ */

function getTotalPages() {

  return Math.max(
    1,
    Math.ceil(
      state.filteredResults.length
      /
      state.pagination.pageSize
    )
  );

}


function updatePaginationUI() {

  const total =
    state.filteredResults.length;


  const totalPages =
    getTotalPages();


  const start =
    total
      ? (
          state.pagination.page -
          1
        )
        *
        state.pagination.pageSize
        +
        1
      : 0;


  const end =
    Math.min(
      total,
      state.pagination.page
      *
      state.pagination.pageSize
    );


  el.paginationInfo.textContent =
    total
      ? `${formatNumber(
          start
        )}–${formatNumber(
          end
        )} de ${formatNumber(
          total
        )} resultados`
      : "0 resultados";


  el.currentPageLabel.textContent =
    `Página ${state.pagination.page} de ${totalPages}`;


  el.previousPageButton.disabled =
    state.pagination.page <= 1;


  el.nextPageButton.disabled =
    state.pagination.page >=
    totalPages;

}


/* ============================================================
   51. DETALHES
============================================================ */

function openResultDetails(
  result
) {

  el.detailsModalContent.innerHTML =
    "";


  const summary =
    document.createElement(
      "div"
    );


  summary.className =
    "detail-block";


  summary.innerHTML =
    `
      <strong>
        ${escapeHTML(
          getStatusText(
            result.type
          )
        )}
      </strong>

      <p>
        Chave:
        ${escapeHTML(
          result.key
          || "—"
        )}
      </p>

      <p>
        Origem Base A:
        ${escapeHTML(
          result.sourcesA
          || "—"
        )}
      </p>

      <p>
        Origem Base B:
        ${escapeHTML(
          result.sourcesB
          || "—"
        )}
      </p>
    `;


  el.detailsModalContent.appendChild(
    summary
  );


  if (
    result.differences
      ?.length
  ) {

    const heading =
      document.createElement(
        "h3"
      );


    heading.textContent =
      "Divergências encontradas";


    heading.style.marginTop =
      "22px";


    el.detailsModalContent.appendChild(
      heading
    );


    result.differences.forEach(
      difference => {

        const block =
          document.createElement(
            "div"
          );


        block.className =
          "detail-block";


        block.innerHTML =
          `
          <strong>
            ${escapeHTML(
              difference.label
            )}
          </strong>

          <p>
            Base A:
            ${escapeHTML(
              valueToDisplay(
                difference.valueA
              )
            )}
          </p>

          <p>
            Base B:
            ${escapeHTML(
              valueToDisplay(
                difference.valueB
              )
            )}
          </p>
          `;


        el.detailsModalContent.appendChild(
          block
        );

      }
    );

  }


  renderDetailedRecords(
    "Base A",
    result.recordsA,
    el.detailsModalContent
  );


  renderDetailedRecords(
    "Base B",
    result.recordsB,
    el.detailsModalContent
  );


  openModal(
    el.detailsModal
  );

}


/* ============================================================
   52. REGISTROS DETALHADOS
============================================================ */

function renderDetailedRecords(
  title,
  records,
  container
) {

  const heading =
    document.createElement(
      "h3"
    );


  heading.style.marginTop =
    "22px";


  heading.textContent =
    `${title} — ${records.length} registro(s)`;


  container.appendChild(
    heading
  );


  if (
    !records.length
  ) {

    const empty =
      document.createElement(
        "p"
      );


    empty.textContent =
      "Nenhum registro.";


    empty.style.marginTop =
      "8px";


    container.appendChild(
      empty
    );

    return;

  }


  records.forEach(
    (
      record,
      index
    ) => {

      const block =
        document.createElement(
          "div"
        );


      block.className =
        "detail-block";


      const business =
        Object.fromEntries(
          Object.entries(
            record
          )
            .filter(
              ([key]) =>
                !key.startsWith(
                  "__"
                )
            )
        );


      block.innerHTML =
        `
        <strong>
          Registro ${index + 1}
        </strong>

        <p>
          Arquivo:
          ${escapeHTML(
            record.__sourceFile
            || "—"
          )}
        </p>

        <p>
          Aba:
          ${escapeHTML(
            record.__sourceSheet
            || "—"
          )}
        </p>

        <p>
          Linha:
          ${escapeHTML(
            record.__sourceRow
            || "—"
          )}
        </p>

        <pre
          style="
            margin-top:10px;
            white-space:pre-wrap;
            word-break:break-word;
          "
        >${escapeHTML(
          JSON.stringify(
            business,
            null,
            2
          )
        )}</pre>
        `;


      container.appendChild(
        block
      );

    }
  );

}


/* ============================================================
   53. EXPORTAÇÃO
============================================================ */

function ensureResults() {

  if (
    !state.results.length
  ) {

    showToast(
      "Execute uma análise antes de exportar.",
      "error"
    );

    return false;

  }


  return true;

}


/* ============================================================
   54. EXCEL COMPLETO
============================================================ */

function exportCompleteExcel() {

  if (
    !ensureResults()
    ||
    typeof XLSX ===
      "undefined"
  ) {

    return;

  }


  const workbook =
    createResultsWorkbook(
      state.results
    );


  XLSX.writeFile(
    workbook,
    createExportFilename(
      "xlsx"
    )
  );

}


/* ============================================================
   55. EXCEL SOMENTE ERROS
============================================================ */

function exportErrorsExcel() {

  if (
    !ensureResults()
    ||
    typeof XLSX ===
      "undefined"
  ) {

    return;

  }


  const errors =
    state.results.filter(
      result =>
        result.type !==
          "match"
    );


  const workbook =
    createResultsWorkbook(
      errors
    );


  XLSX.writeFile(
    workbook,
    createExportFilename(
      "erros.xlsx"
    )
  );

}


/* ============================================================
   56. ODS
============================================================ */

function exportODS() {

  if (
    !ensureResults()
    ||
    typeof XLSX ===
      "undefined"
  ) {

    return;

  }


  const workbook =
    createResultsWorkbook(
      state.results
    );


  XLSX.writeFile(
    workbook,
    createExportFilename(
      "ods"
    ),
    {
      bookType: "ods"
    }
  );

}


/* ============================================================
   57. WORKBOOK
============================================================ */

function createResultsWorkbook(
  results
) {

  const workbook =
    XLSX.utils.book_new();


  appendWorksheet(
    workbook,
    "Resumo",
    buildSummaryExport()
  );


  appendWorksheet(
    workbook,
    "Correspondencias",
    results
      .filter(
        item =>
          item.type ===
            "match"
      )
      .map(
        flattenResult
      )
  );


  appendWorksheet(
    workbook,
    "Divergencias",
    results
      .filter(
        item =>
          item.type ===
            "different"
      )
      .map(
        flattenResult
      )
  );


  appendWorksheet(
    workbook,
    "Ausentes Base A",
    results
      .filter(
        item =>
          item.type ===
            "missing-a"
      )
      .map(
        flattenResult
      )
  );


  appendWorksheet(
    workbook,
    "Ausentes Base B",
    results
      .filter(
        item =>
          item.type ===
            "missing-b"
      )
      .map(
        flattenResult
      )
  );


  appendWorksheet(
    workbook,
    "Duplicidades",
    results
      .filter(
        item =>
          item.type ===
            "duplicate"
      )
      .map(
        flattenResult
      )
  );


  return workbook;

}


/* ============================================================
   58. ABA
============================================================ */

function appendWorksheet(
  workbook,
  name,
  data
) {

  const safeData =
    data.length
      ? data
      : [
          {
            Informação:
              "Nenhum registro."
          }
        ];


  const worksheet =
    XLSX.utils.json_to_sheet(
      safeData
    );


  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    name.slice(
      0,
      31
    )
  );

}


/* ============================================================
   59. CSV
============================================================ */

function exportCSV() {

  if (
    !ensureResults()
    ||
    typeof Papa ===
      "undefined"
  ) {

    return;

  }


  const data =
    state.results.map(
      flattenResult
    );


  const csv =
    Papa.unparse(
      data
    );


  downloadBlob(
    new Blob(
      [
        "\uFEFF",
        csv
      ],
      {
        type:
          "text/csv;charset=utf-8;"
      }
    ),
    createExportFilename(
      "csv"
    )
  );

}


/* ============================================================
   60. JSON
============================================================ */

function exportJSON() {

  if (
    !ensureResults()
  ) {

    return;

  }


  const data = {

    application:
      "Loop Reconciler",

    version:
      APP_CONFIG.version,

    analysis:
      {
        name:
          state.analysis.name,

        startedAt:
          state.analysis.startedAt,

        completedAt:
          state.analysis.completedAt
      },

    bases:
      {
        A:
          {
            files:
              state.baseA.files.map(
                file =>
                  file.name
              ),

            records:
              state.baseA.records.length
          },

        B:
          {
            files:
              state.baseB.files.map(
                file =>
                  file.name
              ),

            records:
              state.baseB.records.length
          }
      },

    results:
      state.results

  };


  downloadBlob(
    new Blob(
      [
        JSON.stringify(
          data,
          null,
          2
        )
      ],
      {
        type:
          "application/json;charset=utf-8;"
      }
    ),
    createExportFilename(
      "json"
    )
  );

}


/* ============================================================
   61. PDF RESUMIDO
============================================================ */

function exportSummaryPDF() {

  if (
    !ensureResults()
  ) {
    return;
  }


  const jsPDF =
    window.jspdf
      ?.jsPDF;


  if (
    !jsPDF
  ) {

    showToast(
      "Biblioteca de PDF não disponível.",
      "error"
    );

    return;

  }


  const doc =
    new jsPDF({
      orientation:
        "portrait",

      unit:
        "mm",

      format:
        "a4"
    });


  const metrics =
    calculateMetrics();


  doc.setFontSize(
    20
  );


  doc.text(
    "Loop Reconciler",
    15,
    20
  );


  doc.setFontSize(
    12
  );


  doc.text(
    state.analysis.name
    ||
    "Relatório de conciliação",
    15,
    29
  );


  doc.setFontSize(
    9
  );


  doc.text(
    `Gerado em: ${formatDateTime(
      new Date()
    )}`,
    15,
    36
  );


  const summaryRows = [
    [
      "Registros Base A",
      state.baseA.records.length
    ],
    [
      "Registros Base B",
      state.baseB.records.length
    ],
    [
      "Correspondências",
      metrics.matches
    ],
    [
      "Divergências",
      metrics.differences
    ],
    [
      "Ausentes Base A",
      metrics.missingA
    ],
    [
      "Ausentes Base B",
      metrics.missingB
    ],
    [
      "Duplicidades",
      metrics.duplicates
    ],
    [
      "Taxa de correspondência",
      `${metrics.matchRate.toFixed(
        1
      )}%`
    ]
  ];


  doc.autoTable({
    startY: 43,

    head: [
      [
        "Indicador",
        "Valor"
      ]
    ],

    body:
      summaryRows
  });


  const errors =
    state.results
      .filter(
        result =>
          result.type !==
            "match"
      )
      .slice(
        0,
        50
      )
      .map(
        result => [
          getStatusText(
            result.type
          ),
          result.key,
          result.sourcesA,
          result.sourcesB
        ]
      );


  if (
    errors.length
  ) {

    doc.autoTable({
      startY:
        doc.lastAutoTable
          .finalY
        +
        10,

      head: [
        [
          "Status",
          "Chave",
          "Origem A",
          "Origem B"
        ]
      ],

      body:
        errors,

      styles: {
        fontSize: 7
      }
    });

  }


  doc.save(
    createExportFilename(
      "resumo.pdf"
    )
  );

}


/* ============================================================
   62. PDF DETALHADO
============================================================ */

function exportDetailedPDF() {

  if (
    !ensureResults()
  ) {
    return;
  }


  const jsPDF =
    window.jspdf
      ?.jsPDF;


  if (
    !jsPDF
  ) {

    showToast(
      "Biblioteca de PDF não disponível.",
      "error"
    );

    return;

  }


  const available =
    state.results.slice(
      0,
      APP_CONFIG.maxDetailedPdfRows
    );


  if (
    state.results.length >
    APP_CONFIG.maxDetailedPdfRows
  ) {

    showToast(
      `O PDF detalhado exibirá os primeiros ${APP_CONFIG.maxDetailedPdfRows} resultados para evitar um arquivo excessivamente grande.`,
      "warning"
    );

  }


  const doc =
    new jsPDF({
      orientation:
        "landscape",

      unit:
        "mm",

      format:
        "a4"
    });


  doc.setFontSize(
    18
  );


  doc.text(
    "Loop Reconciler — Relatório detalhado",
    12,
    15
  );


  doc.setFontSize(
    9
  );


  doc.text(
    state.analysis.name
    ||
    "Análise",
    12,
    22
  );


  const rows =
    available.map(
      result => [
        getStatusText(
          result.type
        ),

        result.key,

        result.sourcesA,

        result.sourcesB,

        result.differences
          ?.map(
            difference =>
              `${difference.label}: ${valueToDisplay(
                difference.valueA
              )} → ${valueToDisplay(
                difference.valueB
              )}`
          )
          .join(
            " | "
          )
        ||
        ""
      ]
    );


  doc.autoTable({
    startY: 28,

    head: [
      [
        "Status",
        "Chave",
        "Origem A",
        "Origem B",
        "Divergências"
      ]
    ],

    body:
      rows,

    styles: {
      fontSize: 6
    }
  });


  doc.save(
    createExportFilename(
      "detalhado.pdf"
    )
  );

}


/* ============================================================
   63. RESUMO PARA EXPORTAÇÃO
============================================================ */

function buildSummaryExport() {

  const metrics =
    calculateMetrics();


  return [
    {
      Indicador:
        "Nome da análise",

      Valor:
        state.analysis.name
    },
    {
      Indicador:
        "Data",

      Valor:
        formatDateTime(
          state.analysis.completedAt
          ||
          new Date()
        )
    },
    {
      Indicador:
        "Arquivos Base A",

      Valor:
        state.baseA.files.length
    },
    {
      Indicador:
        "Arquivos Base B",

      Valor:
        state.baseB.files.length
    },
    {
      Indicador:
        "Registros Base A",

      Valor:
        state.baseA.records.length
    },
    {
      Indicador:
        "Registros Base B",

      Valor:
        state.baseB.records.length
    },
    {
      Indicador:
        "Correspondências",

      Valor:
        metrics.matches
    },
    {
      Indicador:
        "Divergências",

      Valor:
        metrics.differences
    },
    {
      Indicador:
        "Ausentes Base A",

      Valor:
        metrics.missingA
    },
    {
      Indicador:
        "Ausentes Base B",

      Valor:
        metrics.missingB
    },
    {
      Indicador:
        "Duplicidades",

      Valor:
        metrics.duplicates
    },
    {
      Indicador:
        "Taxa de correspondência",

      Valor:
        `${metrics.matchRate.toFixed(
          1
        )}%`
    }
  ];

}


/* ============================================================
   64. FLATTEN RESULT
============================================================ */

function flattenResult(
  result
) {

  return {
    Status:
      getStatusText(
        result.type
      ),

    Chave:
      result.key,

    Origem_A:
      result.sourcesA,

    Origem_B:
      result.sourcesB,

    Quantidade_A:
      result.recordsA.length,

    Quantidade_B:
      result.recordsB.length,

    Divergencias:
      result.differences
        ?.map(
          difference =>
            `${difference.label}: "${valueToDisplay(
              difference.valueA
            )}" -> "${valueToDisplay(
              difference.valueB
            )}"`
        )
        .join(
          " | "
        )
      ||
      "",

    Registro_A:
      result.recordsA.length
        ? JSON.stringify(
            removeMetadata(
              result.recordsA[0]
            )
          )
        : "",

    Registro_B:
      result.recordsB.length
        ? JSON.stringify(
            removeMetadata(
              result.recordsB[0]
            )
          )
        : ""
  };

}


/* ============================================================
   65. MÉTRICAS CALCULADAS
============================================================ */

function calculateMetrics() {

  const count =
    type =>
      state.results
        .filter(
          result =>
            result.type ===
            type
        )
        .length;


  const matches =
    count(
      "match"
    );


  const total =
    state.results.length;


  return {
    matches,

    differences:
      count(
        "different"
      ),

    missingA:
      count(
        "missing-a"
      ),

    missingB:
      count(
        "missing-b"
      ),

    duplicates:
      count(
        "duplicate"
      ),

    matchRate:
      total
        ? (
            matches /
            total
          )
          *
          100
        : 0
  };

}


/* ============================================================
   66. NOVA ANÁLISE
============================================================ */

function startNewAnalysis() {

  const confirmed =
    window.confirm(
      "Deseja iniciar uma nova análise? Os resultados atuais serão limpos."
    );


  if (
    !confirmed
  ) {
    return;
  }


  resetAllData();


  activateMode(
    "real"
  );

}


/* ============================================================
   67. RESET
============================================================ */

function resetAllData() {

  state.baseA =
    createEmptyBase(
      "A"
    );


  state.baseB =
    createEmptyBase(
      "B"
    );


  state.matching = {
    columnA: "",
    columnB: "",
    compositeEnabled: false,
    compositePairs: [],
    mappings: []
  };


  state.results = [];

  state.filteredResults = [];


  state.filters = {
    status: "all",
    search: "",
    sort: "status"
  };


  state.pagination = {
    page: 1,
    pageSize:
      APP_CONFIG.defaultPageSize
  };


  state.analysis = {
    name: "",
    startedAt: null,
    completedAt: null
  };


  if (
    el.fileInputA
  ) {
    el.fileInputA.value =
      "";
  }


  if (
    el.fileInputB
  ) {
    el.fileInputB.value =
      "";
  }


  if (
    el.analysisName
  ) {
    el.analysisName.value =
      "";
  }


  if (
    el.resultsSearch
  ) {
    el.resultsSearch.value =
      "";
  }


  if (
    el.enableCompositeKey
  ) {
    el.enableCompositeKey.checked =
      false;
  }


  if (
    el.compositeKeyBuilder
  ) {
    el.compositeKeyBuilder.hidden =
      true;
  }


  refreshBaseUI(
    "A"
  );


  refreshBaseUI(
    "B"
  );


  populateMatchingSelectors();


  validateFilesStep();


  resetProgress();


  setActiveFilterButton(
    "all"
  );

}


/* ============================================================
   68. PROGRESSO
============================================================ */

function showProgress(
  visible
) {

  el.analysisProgress.hidden =
    !visible;

}


function updateProgress(
  percent,
  text
) {

  const safePercent =
    Math.max(
      0,
      Math.min(
        100,
        percent
      )
    );


  el.analysisProgressFill.style.width =
    `${safePercent}%`;


  el.analysisProgressPercent.textContent =
    `${safePercent}%`;


  el.analysisProgressText.textContent =
    text;

}


function resetProgress() {

  showProgress(
    false
  );


  if (
    el.analysisProgressFill
  ) {

    el.analysisProgressFill.style.width =
      "0%";

  }


  if (
    el.analysisProgressPercent
  ) {

    el.analysisProgressPercent.textContent =
      "0%";

  }

}


/* ============================================================
   69. STATUS DA ANÁLISE
============================================================ */

function setAnalysisStatus(
  message,
  type
) {

  el.analysisStatus.textContent =
    message;


  el.analysisStatus.classList.remove(
    "is-success",
    "is-error"
  );


  if (
    type === "success"
  ) {

    el.analysisStatus.classList.add(
      "is-success"
    );

  }


  if (
    type === "error"
  ) {

    el.analysisStatus.classList.add(
      "is-error"
    );

  }

}


/* ============================================================
   70. MODAL DE ERRO
============================================================ */

function openFileError(
  filename,
  message
) {

  el.fileErrorMessage.textContent =
    `Não foi possível processar "${filename}".`;


  el.fileErrorDetails.innerHTML =
    `
      <strong>
        Motivo
      </strong>

      <p>
        ${escapeHTML(
          message
        )}
      </p>

      <p>
        Formatos aceitos:
        CSV, XLS, XLSX, ODS, FODS, TSV e TXT.
      </p>
    `;


  openModal(
    el.fileErrorModal
  );

}


/* ============================================================
   71. MODAIS
============================================================ */

function openModal(
  modal
) {

  if (
    modal
  ) {

    modal.hidden =
      false;

  }

}


function closeModal(
  modal
) {

  if (
    modal
  ) {

    modal.hidden =
      true;

  }

}


/* ============================================================
   72. TOASTS
============================================================ */

function showToast(
  message,
  type = "info",
  duration = 3500
) {

  if (
    !el.toastContainer
  ) {
    return;
  }


  const toast =
    document.createElement(
      "div"
    );


  toast.className =
    `toast toast--${type}`;


  toast.textContent =
    message;


  el.toastContainer.appendChild(
    toast
  );


  window.setTimeout(
    () => {

      toast.remove();

    },
    duration
  );

}


/* ============================================================
   73. FONTES
============================================================ */

function getSources(
  records
) {

  if (
    !records?.length
  ) {

    return "";

  }


  const sources =
    new Set();


  records.forEach(
    record => {

      const file =
        record.__sourceFile
        ||
        "Arquivo";


      const sheet =
        record.__sourceSheet;


      if (
        sheet &&
        sheet !== "Arquivo"
      ) {

        sources.add(
          `${file} / ${sheet}`
        );

      }

      else {

        sources.add(
          file
        );

      }

    }
  );


  return Array
    .from(
      sources
    )
    .join(
      ", "
    );

}


/* ============================================================
   74. CHAVE PARA EXIBIÇÃO
============================================================ */

function getDisplayKey(
  recordsA,
  recordsB
) {

  const record =
    recordsA[0]
    ??
    recordsB[0];


  if (!record) {
    return "";
  }


  const side =
    recordsA.length
      ? "A"
      : "B";


  const column =
    side === "A"
      ? state.matching.columnA
      : state.matching.columnB;


  return valueToDisplay(
    record[
      column
    ]
  );

}


/* ============================================================
   75. RESUMO DO REGISTRO
============================================================ */

function summarizeRecords(
  records
) {

  if (
    !records?.length
  ) {

    return "Não encontrado";

  }


  const record =
    removeMetadata(
      records[0]
    );


  const summary =
    Object.entries(
      record
    )
      .slice(
        0,
        3
      )
      .map(
        (
          [
            key,
            value
          ]
        ) =>
          `${key}: ${valueToDisplay(
            value
          )}`
      )
      .join(
        " · "
      );


  if (
    records.length >
    1
  ) {

    return `${summary} · ${records.length} ocorrências`;

  }


  return summary;

}


/* ============================================================
   76. BUSCA
============================================================ */

function buildResultSearchText(
  result
) {

  return [
    result.type,

    getStatusText(
      result.type
    ),

    result.key,

    result.sourcesA,

    result.sourcesB,

    JSON.stringify(
      result.recordsA
    ),

    JSON.stringify(
      result.recordsB
    ),

    JSON.stringify(
      result.differences
    )
  ]
    .join(
      " "
    )
    .toLowerCase();

}


/* ============================================================
   77. STATUS
============================================================ */

function getStatusText(
  type
) {

  const labels = {
    match:
      "Correspondência",

    different:
      "Divergência",

    "missing-a":
      "Ausente na Base A",

    "missing-b":
      "Ausente na Base B",

    duplicate:
      "Duplicidade"
  };


  return labels[
    type
  ]
  ??
  type;

}


function getStatusClass(
  type
) {

  switch (
    type
  ) {

    case "match":
      return "status-match";

    case "different":
      return "status-different";

    case "duplicate":
      return "status-duplicate";

    case "missing-a":
    case "missing-b":
      return "status-missing";

    default:
      return "";
  }

}


/* ============================================================
   78. DESCREVER CHAVE
============================================================ */

function describeKey(
  side
) {

  const main =
    side === "A"
      ? state.matching.columnA
      : state.matching.columnB;


  if (!main) {
    return "—";
  }


  const columns = [
    main
  ];


  if (
    state.matching.compositeEnabled
  ) {

    state.matching
      .compositePairs
      .forEach(
        pair => {

          const column =
            side === "A"
              ? pair.columnA
              : pair.columnB;


          if (
            column
          ) {

            columns.push(
              column
            );

          }

        }
      );

  }


  return columns.join(
    " + "
  );

}


/* ============================================================
   79. COLUNAS COMERCIAIS
============================================================ */

function getBusinessColumns(
  record
) {

  return Object.keys(
    record
  )
    .filter(
      key =>
        !key.startsWith(
          "__"
        )
    );

}


/* ============================================================
   80. REMOVER METADADOS
============================================================ */

function removeMetadata(
  record
) {

  return Object.fromEntries(
    Object.entries(
      record
    )
      .filter(
        ([key]) =>
          !key.startsWith(
            "__"
          )
      )
  );

}


/* ============================================================
   81. NORMALIZAR NOME DA COLUNA
============================================================ */

function normalizeColumnName(
  value
) {

  return String(
    value
    ?? ""
  )
    .trim()
    .toLowerCase()
    .normalize(
      "NFD"
    )
    .replace(
      /[\u0300-\u036f]/g,
      ""
    )
    .replace(
      /[^a-z0-9]/g,
      ""
    );

}


/* ============================================================
   82. BASE
============================================================ */

function getBase(
  baseName
) {

  return baseName === "A"
    ? state.baseA
    : state.baseB;

}


/* ============================================================
   83. UTILIDADES DE SELECT
============================================================ */

function preserveAndPopulateSelect(
  select,
  options,
  selected
) {

  if (!select) {
    return;
  }


  select.innerHTML =
    "";


  const empty =
    document.createElement(
      "option"
    );


  empty.value =
    "";

  empty.textContent =
    "Selecione uma coluna";


  select.appendChild(
    empty
  );


  options.forEach(
    optionValue => {

      const option =
        document.createElement(
          "option"
        );


      option.value =
        optionValue;

      option.textContent =
        optionValue;


      select.appendChild(
        option
      );

    }
  );


  if (
    selected
    &&
    options.includes(
      selected
    )
  ) {

    select.value =
      selected;

  }

}


function createColumnSelect(
  columns,
  selected
) {

  const select =
    document.createElement(
      "select"
    );


  preserveAndPopulateSelect(
    select,
    columns,
    selected
  );


  return select;

}


function createRemoveButton() {

  const button =
    document.createElement(
      "button"
    );


  button.type =
    "button";


  button.className =
    "file-item__remove";


  button.textContent =
    "×";


  button.title =
    "Remover";


  return button;

}


/* ============================================================
   84. CABEÇALHOS ÚNICOS
============================================================ */

function makeUniqueHeaders(
  headers
) {

  const used =
    new Map();


  return headers.map(
    (
      header,
      index
    ) => {

      let name =
        String(
          header
          ?? ""
        ).trim();


      if (
        !name
      ) {

        name =
          `Coluna ${index + 1}`;

      }


      const count =
        used.get(
          name
        )
        ??
        0;


      used.set(
        name,
        count + 1
      );


      return count
        ? `${name} (${count + 1})`
        : name;

    }
  );

}


/* ============================================================
   85. REGISTRO ÚTIL
============================================================ */

function isUsefulRecord(
  record
) {

  if (
    !record
    ||
    typeof record !==
      "object"
  ) {

    return false;

  }


  return Object.entries(
    record
  )
    .filter(
      ([key]) =>
        !key.startsWith(
          "__"
        )
    )
    .some(
      ([, value]) =>

        String(
          value
          ?? ""
        )
          .trim()
          .length > 0
    );

}


/* ============================================================
   86. CHAVE VAZIA
============================================================ */

function isEmptyKey(
  key
) {

  return key
    .split(
      "||"
    )
    .every(
      part =>
        !part.trim()
    );

}


/* ============================================================
   87. EXTENSÃO
============================================================ */

function getExtension(
  filename
) {

  const pieces =
    String(
      filename
    ).split(
      "."
    );


  return pieces.length > 1
    ? pieces
        .pop()
        .toLowerCase()
    : "";

}


/* ============================================================
   88. TAMANHO
============================================================ */

function formatFileSize(
  bytes
) {

  if (
    !bytes
  ) {

    return "0 B";

  }


  const units = [
    "B",
    "KB",
    "MB",
    "GB"
  ];


  const index =
    Math.min(
      Math.floor(
        Math.log(
          bytes
        )
        /
        Math.log(
          1024
        )
      ),
      units.length -
      1
    );


  return `${
    (
      bytes
      /
      Math.pow(
        1024,
        index
      )
    ).toFixed(
      index
        ? 1
        : 0
    )
  } ${units[index]}`;

}


/* ============================================================
   89. NÚMERO
============================================================ */

function formatNumber(
  value
) {

  return Number(
    value
    ?? 0
  )
    .toLocaleString(
      "pt-BR"
    );

}


/* ============================================================
   90. DATA/HORA
============================================================ */

function formatDateTime(
  value
) {

  if (!value) {
    return "—";
  }


  const date =
    value instanceof Date
      ? value
      : new Date(
          value
        );


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {

    return String(
      value
    );

  }


  return date.toLocaleString(
    "pt-BR"
  );

}


/* ============================================================
   91. VALOR PARA EXIBIÇÃO
============================================================ */

function valueToDisplay(
  value
) {

  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {

    return "—";

  }


  if (
    value instanceof Date
  ) {

    return formatDateTime(
      value
    );

  }


  if (
    typeof value ===
    "object"
  ) {

    return JSON.stringify(
      value
    );

  }


  return String(
    value
  );

}


/* ============================================================
   92. NOME DO ARQUIVO EXPORTADO
============================================================ */

function createExportFilename(
  extension
) {

  const now =
    new Date();


  const stamp =
    [
      now.getFullYear(),

      String(
        now.getMonth() + 1
      ).padStart(
        2,
        "0"
      ),

      String(
        now.getDate()
      ).padStart(
        2,
        "0"
      )
    ]
      .join(
        "-"
      );


  const safeName =
    (
      state.analysis.name
      ||
      "loop-reconciler"
    )
      .normalize(
        "NFD"
      )
      .replace(
        /[\u0300-\u036f]/g,
        ""
      )
      .replace(
        /[^a-zA-Z0-9]+/g,
        "-"
      )
      .replace(
        /^-+|-+$/g,
        ""
      )
      .toLowerCase();


  return `${safeName || "loop-reconciler"}-${stamp}.${extension}`;

}


/* ============================================================
   93. BLOB DOWNLOAD
============================================================ */

function downloadBlob(
  blob,
  filename
) {

  const url =
    URL.createObjectURL(
      blob
    );


  const link =
    document.createElement(
      "a"
    );


  link.href =
    url;


  link.download =
    filename;


  document.body.appendChild(
    link
  );


  link.click();


  link.remove();


  window.setTimeout(
    () =>
      URL.revokeObjectURL(
        url
      ),
    100
  );

}


/* ============================================================
   94. ESCAPE HTML
============================================================ */

function escapeHTML(
  value
) {

  const div =
    document.createElement(
      "div"
    );


  div.textContent =
    String(
      value
      ?? ""
    );


  return div.innerHTML;

}


/* ============================================================
   95. FRAME / DELAY
============================================================ */

function nextFrame() {

  return new Promise(
    resolve =>
      requestAnimationFrame(
        () =>
          resolve()
      )
  );

}


function delay(
  ms
) {

  return new Promise(
    resolve =>
      setTimeout(
        resolve,
        ms
      )
  );

}