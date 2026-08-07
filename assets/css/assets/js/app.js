/* =========================================================
   LOOP RECONCILER

   Universal CSV / Excel Data Reconciliation Tool

   Developer: beto-dev94
   Product: Loop Suite
========================================================= */

"use strict";


/* =========================================================
   TRANSLATIONS
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

    ready: "Pronto",

    chooseReportA: "Selecionar Relatório A",

    chooseReportB: "Selecionar Relatório B",

    matchingRules: "Regras de correspondência",

    comparisonConfiguration:
      "Configuração da comparação",

    matchingColumnA:
      "Coluna de referência — Relatório A",

    matchingColumnB:
      "Coluna de referência — Relatório B",

    selectColumn: "Selecione uma coluna",

    normalization:
      "Normalização dos dados",

    removeSpaces:
      "Remover espaços extras",

    ignoreCase:
      "Ignorar maiúsculas e minúsculas",

    ignoreEmpty:
      "Ignorar registros vazios",

    validation:
      "Validação",

    detectDuplicates:
      "Detectar duplicidades",

    compareFields:
      "Comparar campos dos registros",

    compareReports:
      "Comparar relatórios",

    reset:
      "Limpar",

    analysis:
      "Análise",

    resultsTitle:
      "Resultado da conciliação",

    resultsDescription:
      "Resumo da comparação entre os dois relatórios.",

    reportARecords:
      "Registros do Relatório A",

    reportBRecords:
      "Registros do Relatório B",

    matches:
      "Correspondências",

    differences:
      "Divergências",

    missingReportB:
      "Ausentes no Relatório B",

    missingReportA:
      "Ausentes no Relatório A",

    duplicates:
      "Duplicidades",

    matchRate:
      "Taxa de correspondência",

    searchResults:
      "Pesquisar resultados...",

    all:
      "Todos",

    missingAFilter:
      "Ausentes A",

    missingBFilter:
      "Ausentes B",

    exportCSV:
      "Exportar CSV",

    exportExcel:
      "Exportar Excel",

    status:
      "Status",

    key:
      "Chave",

    details:
      "Detalhes",

    noResults:
      "Nenhum resultado encontrado",

    changeFilter:
      "Tente alterar o filtro ou o termo pesquisado.",

    localProcessing:
      "Processamento local",

    localProcessingDescription:
      "O Loop Reconciler processa os arquivos diretamente no navegador. Seus relatórios não precisam ser enviados para um servidor remoto para realizar a comparação.",

    capabilities:
      "Capacidades",

    capabilitiesTitle:
      "Desenvolvido para validação prática de dados",

    csvSupport:
      "Suporte a CSV",

    csvSupportDescription:
      "Importe e analise conjuntos de dados em CSV.",

    excelSupport:
      "Suporte a Excel",

    excelSupportDescription:
      "Leia arquivos XLS e XLSX diretamente no navegador.",

    duplicateDetection:
      "Detecção de duplicidades",

    duplicateDetectionDescription:
      "Identifique chaves repetidas dentro de cada base.",

    missingRecords:
      "Registros ausentes",

    missingRecordsDescription:
      "Encontre registros existentes em apenas um dos relatórios.",

    fieldDifferences:
      "Diferenças entre campos",

    fieldDifferencesDescription:
      "Compare os dados internos de registros correspondentes.",

    exportResults:
      "Exportação de resultados",

    exportResultsDescription:
      "Gere relatórios de conciliação em CSV e Excel.",

    searchFilters:
      "Pesquisa e filtros",

    searchFiltersDescription:
      "Localize rapidamente resultados específicos.",

    responsiveInterface:
      "Interface responsiva",

    responsiveInterfaceDescription:
      "Compatível com computadores, tablets e smartphones.",

    footerDescription:
      "Ferramenta open source para conciliação de dados.",

    developer:
      "Desenvolvedor",

    sourceCode:
      "Código-fonte",

    footerMessage:
      "Desenvolvido para conciliação de dados e automação de processos.",

    recordDetails:
      "Detalhes do registro",

    readingFile:
      "Lendo arquivo",

    fileLoaded:
      "Arquivo carregado com sucesso.",

    records:
      "registros",

    unsupportedFormat:
      "Formato de arquivo não suportado.",

    emptyFile:
      "O arquivo selecionado não possui registros utilizáveis.",

    csvLibraryError:
      "Não foi possível carregar o leitor de CSV.",

    excelLibraryError:
      "Não foi possível carregar o leitor de Excel.",

    excelNoSheet:
      "O arquivo Excel não possui planilhas.",

    excelReadError:
      "Não foi possível ler o arquivo Excel.",

    selectMatchingColumns:
      "Selecione as colunas de referência dos dois relatórios.",

    comparing:
      "Comparando relatórios...",

    comparisonCompleted:
      "Comparação concluída.",

    resultsGenerated:
      "resultados gerados.",

    workspaceReset:
      "Área de trabalho limpa.",

    noExportResults:
      "Não existem resultados para exportar.",

    match:
      "Correspondência",

    different:
      "Divergente",

    missingInA:
      "Ausente no A",

    missingInB:
      "Ausente no B",

    duplicateInA:
      "Duplicado no A",

    duplicateInB:
      "Duplicado no B",

    notFound:
      "Não encontrado",

    viewDetails:
      "Ver detalhes",

    fieldDifferencesTitle:
      "Diferenças entre campos",

    duplicateRecords:
      "Registros duplicados",

    reportAValue:
      "Relatório A",

    reportBValue:
      "Relatório B"
  },


  en: {

    navCompare: "Compare",
    navResults: "Results",
    navFeatures: "Features",

    heroBadge:
      "Intelligent Data Reconciliation",

    heroTitle1:
      "Find differences.",

    heroTitle2:
      "Reconcile faster.",

    heroDescription:
      "Compare CSV and Excel reports, detect missing records, duplicates and inconsistencies, and review your data through a simple reconciliation dashboard.",

    startComparison:
      "Start Comparison",

    viewGithub:
      "View on GitHub",

    featureImportTitle:
      "Import",

    featureImportDescription:
      "Load CSV, XLS and XLSX reports directly from your computer.",

    featureCompareTitle:
      "Compare",

    featureCompareDescription:
      "Automatically compare datasets using a configurable matching column.",

    featureReviewTitle:
      "Review",

    featureReviewDescription:
      "Inspect matches, differences, missing records and duplicates.",

    workspaceLabel:
      "Workspace",

    workspaceTitle:
      "Compare your reports",

    workspaceDescription:
      "Your files are processed locally in your browser.",

    reportA:
      "Report A",

    reportB:
      "Report B",

    primaryDataset:
      "Primary dataset",

    comparisonDataset:
      "Comparison dataset",

    noFile:
      "No file",

    ready:
      "Ready",

    chooseReportA:
      "Choose Report A",

    chooseReportB:
      "Choose Report B",

    matchingRules:
      "Matching Rules",

    comparisonConfiguration:
      "Comparison configuration",

    matchingColumnA:
      "Matching column — Report A",

    matchingColumnB:
      "Matching column — Report B",

    selectColumn:
      "Select a column",

    normalization:
      "Data normalization",

    removeSpaces:
      "Remove extra spaces",

    ignoreCase:
      "Ignore uppercase/lowercase",

    ignoreEmpty:
      "Ignore empty records",

    validation:
      "Validation",

    detectDuplicates:
      "Detect duplicates",

    compareFields:
      "Compare matching record fields",

    compareReports:
      "Compare Reports",

    reset:
      "Reset",

    analysis:
      "Analysis",

    resultsTitle:
      "Reconciliation Results",

    resultsDescription:
      "Summary of the comparison between both reports.",

    reportARecords:
      "Report A Records",

    reportBRecords:
      "Report B Records",

    matches:
      "Matches",

    differences:
      "Differences",

    missingReportB:
      "Missing in Report B",

    missingReportA:
      "Missing in Report A",

    duplicates:
      "Duplicates",

    matchRate:
      "Match Rate",

    searchResults:
      "Search results...",

    all:
      "All",

    missingAFilter:
      "Missing A",

    missingBFilter:
      "Missing B",

    exportCSV:
      "Export CSV",

    exportExcel:
      "Export Excel",

    status:
      "Status",

    key:
      "Key",

    details:
      "Details",

    noResults:
      "No results found",

    changeFilter:
      "Try changing the active filter or search term.",

    localProcessing:
      "Local-first processing",

    localProcessingDescription:
      "Loop Reconciler processes supported reports directly inside your browser. Files do not need to be uploaded to a remote server for comparison.",

    capabilities:
      "Capabilities",

    capabilitiesTitle:
      "Built for practical data validation",

    csvSupport:
      "CSV Support",

    csvSupportDescription:
      "Import and analyze standard CSV datasets.",

    excelSupport:
      "Excel Support",

    excelSupportDescription:
      "Read XLS and XLSX spreadsheets directly.",

    duplicateDetection:
      "Duplicate Detection",

    duplicateDetectionDescription:
      "Identify repeated keys inside each dataset.",

    missingRecords:
      "Missing Records",

    missingRecordsDescription:
      "Detect records present in only one report.",

    fieldDifferences:
      "Field Differences",

    fieldDifferencesDescription:
      "Compare the contents of matching records.",

    exportResults:
      "Export Results",

    exportResultsDescription:
      "Generate reconciled CSV and Excel reports.",

    searchFilters:
      "Search & Filters",

    searchFiltersDescription:
      "Quickly isolate specific reconciliation results.",

    responsiveInterface:
      "Responsive Interface",

    responsiveInterfaceDescription:
      "Designed for desktop, tablet and mobile devices.",

    footerDescription:
      "Open-source data reconciliation tool.",

    developer:
      "Developer",

    sourceCode:
      "Source Code",

    footerMessage:
      "Built for data reconciliation and workflow automation.",

    recordDetails:
      "Record Details",

    readingFile:
      "Reading file",

    fileLoaded:
      "File loaded successfully.",

    records:
      "records",

    unsupportedFormat:
      "Unsupported file format.",

    emptyFile:
      "The selected file contains no usable records.",

    csvLibraryError:
      "CSV reader failed to load.",

    excelLibraryError:
      "Excel reader failed to load.",

    excelNoSheet:
      "Excel file contains no worksheets.",

    excelReadError:
      "Unable to read Excel file.",

    selectMatchingColumns:
      "Select matching columns for both reports.",

    comparing:
      "Comparing reports...",

    comparisonCompleted:
      "Comparison completed.",

    resultsGenerated:
      "results generated.",

    workspaceReset:
      "Workspace reset.",

    noExportResults:
      "There are no results to export.",

    match:
      "Match",

    different:
      "Different",

    missingInA:
      "Missing in A",

    missingInB:
      "Missing in B",

    duplicateInA:
      "Duplicate in A",

    duplicateInB:
      "Duplicate in B",

    notFound:
      "Not found",

    viewDetails:
      "View details",

    fieldDifferencesTitle:
      "Field differences",

    duplicateRecords:
      "Duplicate records",

    reportAValue:
      "Report A",

    reportBValue:
      "Report B"
  }

};


/* =========================================================
   LANGUAGE
========================================================= */

let currentLanguage =
  localStorage.getItem(
    "loopLanguage"
  ) || "pt";


function t(key) {

  return (
    translations[
      currentLanguage
    ][key]
    ||
    translations.pt[key]
    ||
    key
  );

}


function changeLanguage(language) {

  if (
    !translations[language]
  ) {
    return;
  }

  currentLanguage =
    language;

  localStorage.setItem(
    "loopLanguage",
    language
  );

  document.documentElement.lang =
    language === "pt"
      ? "pt-BR"
      : "en";

  document
    .querySelectorAll(
      "[data-i18n]"
    )
    .forEach(element => {

      const key =
        element.dataset.i18n;

      if (
        translations[
          language
        ][key]
      ) {

        element.textContent =
          translations[
            language
          ][key];

      }

    });


  document
    .querySelectorAll(
      "[data-i18n-placeholder]"
    )
    .forEach(element => {

      const key =
        element.dataset
          .i18nPlaceholder;

      if (
        translations[
          language
        ][key]
      ) {

        element.placeholder =
          translations[
            language
          ][key];

      }

    });


  document
    .querySelectorAll(
      ".language-button"
    )
    .forEach(button => {

      button.classList.toggle(
        "active",
        button.dataset.language ===
          language
      );

    });


  document.title =
    language === "pt"
      ? "Loop Reconciler | Conciliação de Dados"
      : "Loop Reconciler | Data Reconciliation";


  refreshDynamicLanguage();

}


/* =========================================================
   APPLICATION STATE
========================================================= */

const state = {

  reportA: {
    file: null,
    data: [],
    columns: []
  },

  reportB: {
    file: null,
    data: [],
    columns: []
  },

  results: [],

  filteredResults: [],

  currentFilter: "all",

  searchTerm: ""

};


/* =========================================================
   DOM ELEMENTS
========================================================= */

const elements = {

  languagePT:
    document.getElementById(
      "languagePT"
    ),

  languageEN:
    document.getElementById(
      "languageEN"
    ),

  startButton:
    document.getElementById(
      "startButton"
    ),

  comparisonSection:
    document.getElementById(
      "comparison"
    ),

  fileA:
    document.getElementById(
      "fileA"
    ),

  fileB:
    document.getElementById(
      "fileB"
    ),

  fileAStatus:
    document.getElementById(
      "fileAStatus"
    ),

  fileBStatus:
    document.getElementById(
      "fileBStatus"
    ),

  fileAInfo:
    document.getElementById(
      "fileAInfo"
    ),

  fileBInfo:
    document.getElementById(
      "fileBInfo"
    ),

  keyColumnA:
    document.getElementById(
      "keyColumnA"
    ),

  keyColumnB:
    document.getElementById(
      "keyColumnB"
    ),

  trimValues:
    document.getElementById(
      "trimValues"
    ),

  ignoreCase:
    document.getElementById(
      "ignoreCase"
    ),

  ignoreEmpty:
    document.getElementById(
      "ignoreEmpty"
    ),

  detectDuplicates:
    document.getElementById(
      "detectDuplicates"
    ),

  compareFields:
    document.getElementById(
      "compareFields"
    ),

  compareButton:
    document.getElementById(
      "compareButton"
    ),

  resetButton:
    document.getElementById(
      "resetButton"
    ),

  processStatus:
    document.getElementById(
      "processStatus"
    ),

  resultsSection:
    document.getElementById(
      "results"
    ),

  totalA:
    document.getElementById(
      "totalA"
    ),

  totalB:
    document.getElementById(
      "totalB"
    ),

  totalMatches:
    document.getElementById(
      "totalMatches"
    ),

  totalDifferences:
    document.getElementById(
      "totalDifferences"
    ),

  missingA:
    document.getElementById(
      "missingA"
    ),

  missingB:
    document.getElementById(
      "missingB"
    ),

  totalDuplicates:
    document.getElementById(
      "totalDuplicates"
    ),

  matchRate:
    document.getElementById(
      "matchRate"
    ),

  resultSearch:
    document.getElementById(
      "resultSearch"
    ),

  filterButtons:
    document.getElementById(
      "filterButtons"
    ),

  resultsTableBody:
    document.getElementById(
      "resultsTableBody"
    ),

  emptyResults:
    document.getElementById(
      "emptyResults"
    ),

  exportCsvButton:
    document.getElementById(
      "exportCsvButton"
    ),

  exportExcelButton:
    document.getElementById(
      "exportExcelButton"
    ),

  detailsModal:
    document.getElementById(
      "detailsModal"
    ),

  modalContent:
    document.getElementById(
      "modalContent"
    ),

  closeModalButton:
    document.getElementById(
      "closeModalButton"
    )

};


/* =========================================================
   LANGUAGE EVENTS
========================================================= */

elements.languagePT
  ?.addEventListener(
    "click",
    () => {
      changeLanguage("pt");
    }
  );


elements.languageEN
  ?.addEventListener(
    "click",
    () => {
      changeLanguage("en");
    }
  );


/* =========================================================
   APPLICATION EVENTS
========================================================= */

elements.startButton
  ?.addEventListener(
    "click",
    () => {

      elements
        .comparisonSection
        .scrollIntoView({
          behavior: "smooth"
        });

    }
  );


elements.fileA
  ?.addEventListener(
    "change",
    async event => {

      await handleFile(
        event.target.files[0],
        "A"
      );

    }
  );


elements.fileB
  ?.addEventListener(
    "change",
    async event => {

      await handleFile(
        event.target.files[0],
        "B"
      );

    }
  );


elements.keyColumnA
  ?.addEventListener(
    "change",
    validateComparison
  );


elements.keyColumnB
  ?.addEventListener(
    "change",
    validateComparison
  );


elements.compareButton
  ?.addEventListener(
    "click",
    runComparison
  );


elements.resetButton
  ?.addEventListener(
    "click",
    resetApplication
  );


elements.resultSearch
  ?.addEventListener(
    "input",
    event => {

      state.searchTerm =
        event.target.value
          .trim()
          .toLowerCase();

      applyResultFilters();

    }
  );


elements.filterButtons
  ?.addEventListener(
    "click",
    event => {

      const button =
        event.target.closest(
          ".filter-button"
        );

      if (!button) {
        return;
      }

      document
        .querySelectorAll(
          ".filter-button"
        )
        .forEach(item => {

          item.classList.remove(
            "active"
          );

        });

      button.classList.add(
        "active"
      );

      state.currentFilter =
        button.dataset.filter;

      applyResultFilters();

    }
  );


elements.exportCsvButton
  ?.addEventListener(
    "click",
    exportResultsToCSV
  );


elements.exportExcelButton
  ?.addEventListener(
    "click",
    exportResultsToExcel
  );


elements.closeModalButton
  ?.addEventListener(
    "click",
    closeModal
  );


elements.detailsModal
  ?.addEventListener(
    "click",
    event => {

      if (
        event.target ===
        elements.detailsModal
      ) {

        closeModal();

      }

    }
  );


document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      closeModal();

    }

  }
);


/* =========================================================
   FILE HANDLING
========================================================= */

async function handleFile(
  file,
  reportName
) {

  if (!file) {
    return;
  }

  setStatus(
    `${t("readingFile")}: ${file.name}...`
  );


  try {

    const extension =
      getFileExtension(
        file.name
      );

    let data;


    if (
      extension === "csv"
    ) {

      data =
        await readCSV(
          file
        );

    }

    else if (
      extension === "xlsx" ||
      extension === "xls"
    ) {

      data =
        await readExcel(
          file
        );

    }

    else {

      throw new Error(
        t(
          "unsupportedFormat"
        )
      );

    }


    data =
      cleanDataset(
        data
      );


    if (!data.length) {

      throw new Error(
        t(
          "emptyFile"
        )
      );

    }


    const columns =
      extractColumns(
        data
      );


    if (
      reportName === "A"
    ) {

      state.reportA.file =
        file;

      state.reportA.data =
        data;

      state.reportA.columns =
        columns;


      updateFileDisplay(
        "A"
      );


      populateColumnSelect(
        elements.keyColumnA,
        columns
      );

    }

    else {

      state.reportB.file =
        file;

      state.reportB.data =
        data;

      state.reportB.columns =
        columns;


      updateFileDisplay(
        "B"
      );


      populateColumnSelect(
        elements.keyColumnB,
        columns
      );

    }


    autoSelectMatchingColumns();

    validateComparison();


    setStatus(
      `${file.name}: ${t(
        "fileLoaded"
      )}`,
      "success"
    );

  }

  catch (error) {

    console.error(
      error
    );

    setStatus(
      error.message,
      "error"
    );

  }

}


/* =========================================================
   CSV READER
========================================================= */

function readCSV(file) {

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
            t(
              "csvLibraryError"
            )
          )
        );

        return;
      }


      Papa.parse(
        file,
        {

          header: true,

          skipEmptyLines: true,

          dynamicTyping: false,

          complete:
            results => {

              resolve(
                results.data
              );

            },

          error:
            error => {

              reject(
                error
              );

            }

        }
      );

    }
  );

}


/* =========================================================
   EXCEL READER
========================================================= */

function readExcel(file) {

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
            t(
              "excelLibraryError"
            )
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
                  type: "array"
                }
              );


            const sheetName =
              workbook
                .SheetNames[0];


            if (!sheetName) {

              throw new Error(
                t(
                  "excelNoSheet"
                )
              );

            }


            const worksheet =
              workbook
                .Sheets[
                  sheetName
                ];


            const data =
              XLSX
                .utils
                .sheet_to_json(
                  worksheet,
                  {
                    defval: ""
                  }
                );


            resolve(
              data
            );

          }

          catch (error) {

            reject(
              error
            );

          }

        };


      reader.onerror =
        () => {

          reject(
            new Error(
              t(
                "excelReadError"
              )
            )
          );

        };


      reader.readAsArrayBuffer(
        file
      );

    }
  );

}


/* =========================================================
   CLEAN DATA
========================================================= */

function cleanDataset(data) {

  return data
    .filter(
      row => {

        if (
          !row ||
          typeof row !==
            "object"
        ) {

          return false;

        }


        return Object
          .values(row)
          .some(value => {

            return String(
              value ?? ""
            )
              .trim()
              .length > 0;

          });

      }
    )
    .map(
      row => {

        const result = {};


        Object
          .entries(row)
          .forEach(
            ([
              key,
              value
            ]) => {

              const cleanKey =
                String(key)
                  .trim();


              if (!cleanKey) {
                return;
              }


              result[
                cleanKey
              ] =
                value ?? "";

            }
          );


        return result;

      }
    );

}


/* =========================================================
   COLUMNS
========================================================= */

function extractColumns(
  data
) {

  const columns =
    new Set();


  data.forEach(
    row => {

      Object
        .keys(row)
        .forEach(
          key => {

            columns.add(
              key
            );

          }
        );

    }
  );


  return Array.from(
    columns
  );

}


/* =========================================================
   POPULATE COLUMN SELECT
========================================================= */

function populateColumnSelect(
  selectElement,
  columns
) {

  const previous =
    selectElement.value;


  selectElement.innerHTML =
    "";


  const firstOption =
    document.createElement(
      "option"
    );


  firstOption.value =
    "";

  firstOption.textContent =
    t(
      "selectColumn"
    );


  selectElement.appendChild(
    firstOption
  );


  columns.forEach(
    column => {

      const option =
        document.createElement(
          "option"
        );


      option.value =
        column;

      option.textContent =
        column;


      selectElement.appendChild(
        option
      );

    }
  );


  if (
    columns.includes(
      previous
    )
  ) {

    selectElement.value =
      previous;

  }

}


/* =========================================================
   AUTO COLUMN MATCHING
========================================================= */

function autoSelectMatchingColumns() {

  const columnsA =
    state.reportA.columns;

  const columnsB =
    state.reportB.columns;


  if (
    !columnsA.length ||
    !columnsB.length
  ) {

    return;

  }


  const commonA =
    columnsA.find(
      columnA => {

        return columnsB.some(
          columnB => {

            return (
              normalizeColumnName(
                columnA
              )
              ===
              normalizeColumnName(
                columnB
              )
            );

          }
        );

      }
    );


  if (!commonA) {
    return;
  }


  const commonB =
    columnsB.find(
      columnB => {

        return (
          normalizeColumnName(
            columnB
          )
          ===
          normalizeColumnName(
            commonA
          )
        );

      }
    );


  if (
    !elements
      .keyColumnA
      .value
  ) {

    elements
      .keyColumnA
      .value =
        commonA;

  }


  if (
    !elements
      .keyColumnB
      .value
  ) {

    elements
      .keyColumnB
      .value =
        commonB || "";

  }

}


/* =========================================================
   NORMALIZATION
========================================================= */

function normalizeColumnName(
  value
) {

  return String(
    value ?? ""
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


function normalizeValue(
  value
) {

  let normalized =
    String(
      value ?? ""
    );


  if (
    elements
      .trimValues
      .checked
  ) {

    normalized =
      normalized.trim();

  }


  if (
    elements
      .ignoreCase
      .checked
  ) {

    normalized =
      normalized
        .toLowerCase();

  }


  return normalized;

}


/* =========================================================
   VALIDATE COMPARISON
========================================================= */

function validateComparison() {

  const valid =
    state.reportA.data.length > 0
    &&
    state.reportB.data.length > 0
    &&
    elements.keyColumnA.value
    &&
    elements.keyColumnB.value;


  elements
    .compareButton
    .disabled =
      !valid;

}


/* =========================================================
   FILE DISPLAY
========================================================= */

function updateFileDisplay(
  report
) {

  const reportData =
    report === "A"
      ? state.reportA
      : state.reportB;


  const statusElement =
    report === "A"
      ? elements.fileAStatus
      : elements.fileBStatus;


  const infoElement =
    report === "A"
      ? elements.fileAInfo
      : elements.fileBInfo;


  if (
    !reportData.file
  ) {

    statusElement.textContent =
      t(
        "noFile"
      );

    statusElement
      .classList
      .remove(
        "ready"
      );

    infoElement.textContent =
      "";

    return;
  }


  statusElement.textContent =
    t(
      "ready"
    );

  statusElement
    .classList
    .add(
      "ready"
    );


  infoElement.textContent =
    `${reportData.file.name} · ${reportData.data.length.toLocaleString()} ${t(
      "records"
    )} · ${formatFileSize(
      reportData.file.size
    )}`;

}


/* =========================================================
   RUN COMPARISON
========================================================= */

function runComparison() {

  try {

    setStatus(
      t(
        "comparing"
      )
    );


    const keyA =
      elements
        .keyColumnA
        .value;


    const keyB =
      elements
        .keyColumnB
        .value;


    if (
      !keyA ||
      !keyB
    ) {

      throw new Error(
        t(
          "selectMatchingColumns"
        )
      );

    }


    const indexA =
      createDatasetIndex(
        state.reportA.data,
        keyA
      );


    const indexB =
      createDatasetIndex(
        state.reportB.data,
        keyB
      );


    const results = [];


    if (
      elements
        .detectDuplicates
        .checked
    ) {

      addDuplicateResults(
        results,
        indexA,
        "A"
      );


      addDuplicateResults(
        results,
        indexB,
        "B"
      );

    }


    indexA.records.forEach(
      (
        recordA,
        normalizedKey
      ) => {

        if (
          elements
            .ignoreEmpty
            .checked
          &&
          !normalizedKey
        ) {

          return;

        }


        const recordB =
          indexB
            .records
            .get(
              normalizedKey
            );


        if (!recordB) {

          results.push(
            {

              type:
                "missing-b",

              key:
                getDisplayKey(
                  recordA,
                  keyA
                ),

              recordA,

              recordB:
                null,

              differences:
                []

            }
          );

          return;

        }


        const differences =
          elements
            .compareFields
            .checked
          ?
            compareRecords(
              recordA,
              recordB,
              keyA,
              keyB
            )
          :
            [];


        if (
          differences.length
        ) {

          results.push(
            {

              type:
                "different",

              key:
                getDisplayKey(
                  recordA,
                  keyA
                ),

              recordA,

              recordB,

              differences

            }
          );

        }

        else {

          results.push(
            {

              type:
                "match",

              key:
                getDisplayKey(
                  recordA,
                  keyA
                ),

              recordA,

              recordB,

              differences:
                []

            }
          );

        }

      }
    );


    indexB.records.forEach(
      (
        recordB,
        normalizedKey
      ) => {

        if (
          elements
            .ignoreEmpty
            .checked
          &&
          !normalizedKey
        ) {

          return;

        }


        if (
          indexA
            .records
            .has(
              normalizedKey
            )
        ) {

          return;

        }


        results.push(
          {

            type:
              "missing-a",

            key:
              getDisplayKey(
                recordB,
                keyB
              ),

            recordA:
              null,

            recordB,

            differences:
              []

          }
        );

      }
    );


    state.results =
      results;


    state.filteredResults =
      results;


    updateMetrics();

    applyResultFilters();


    elements
      .resultsSection
      .hidden =
        false;


    setStatus(
      `${t(
        "comparisonCompleted"
      )} ${results.length.toLocaleString()} ${t(
        "resultsGenerated"
      )}`,
      "success"
    );


    elements
      .resultsSection
      .scrollIntoView({
        behavior: "smooth"
      });

  }

  catch (error) {

    console.error(
      error
    );

    setStatus(
      error.message,
      "error"
    );

  }

}


/* =========================================================
   DATASET INDEX
========================================================= */

function createDatasetIndex(
  data,
  keyColumn
) {

  const records =
    new Map();


  const duplicates =
    new Map();


  data.forEach(
    record => {

      const normalizedKey =
        normalizeValue(
          record[
            keyColumn
          ]
        );


      if (
        elements
          .ignoreEmpty
          .checked
        &&
        !normalizedKey
      ) {

        return;

      }


      if (
        records.has(
          normalizedKey
        )
      ) {

        if (
          !duplicates.has(
            normalizedKey
          )
        ) {

          duplicates.set(
            normalizedKey,
            [
              records.get(
                normalizedKey
              )
            ]
          );

        }


        duplicates
          .get(
            normalizedKey
          )
          .push(
            record
          );

      }

      else {

        records.set(
          normalizedKey,
          record
        );

      }

    }
  );


  return {
    records,
    duplicates
  };

}


/* =========================================================
   DUPLICATES
========================================================= */

function addDuplicateResults(
  results,
  index,
  report
) {

  index
    .duplicates
    .forEach(
      (
        duplicateRecords,
        normalizedKey
      ) => {

        results.push(
          {

            type:
              "duplicate",

            duplicateReport:
              report,

            key:
              normalizedKey,

            recordA:
              report === "A"
                ? duplicateRecords[0]
                : null,

            recordB:
              report === "B"
                ? duplicateRecords[0]
                : null,

            duplicateRecords,

            differences:
              []

          }
        );

      }
    );

}


/* =========================================================
   RECORD COMPARISON
========================================================= */

function compareRecords(
  recordA,
  recordB,
  keyA,
  keyB
) {

  const differences = [];


  const mappings =
    buildColumnMapping(
      recordA,
      recordB
    );


  mappings.forEach(
    mapping => {

      const columnA =
        mapping.columnA;


      const columnB =
        mapping.columnB;


      if (
        columnA === keyA
        ||
        columnB === keyB
      ) {

        return;

      }


      const valueA =
        columnA
          ? recordA[
              columnA
            ]
          : "";


      const valueB =
        columnB
          ? recordB[
              columnB
            ]
          : "";


      if (
        normalizeValue(
          valueA
        )
        !==
        normalizeValue(
          valueB
        )
      ) {

        differences.push(
          {

            column:
              columnA ||
              columnB,

            columnA,

            columnB,

            valueA,

            valueB

          }
        );

      }

    }
  );


  return differences;

}


/* =========================================================
   COLUMN MAPPING
========================================================= */

function buildColumnMapping(
  recordA,
  recordB
) {

  const columnsA =
    Object.keys(
      recordA
    );


  const columnsB =
    Object.keys(
      recordB
    );


  const mappings = [];

  const usedB =
    new Set();


  columnsA.forEach(
    columnA => {

      const normalizedA =
        normalizeColumnName(
          columnA
        );


      const columnB =
        columnsB.find(
          candidate => {

            return (
              !usedB.has(
                candidate
              )
              &&
              normalizeColumnName(
                candidate
              )
              ===
              normalizedA
            );

          }
        );


      if (columnB) {

        usedB.add(
          columnB
        );

      }


      mappings.push(
        {

          columnA,

          columnB:
            columnB || null

        }
      );

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


/* =========================================================
   METRICS
========================================================= */

function updateMetrics() {

  const matches =
    countResultsByType(
      "match"
    );


  const differences =
    countResultsByType(
      "different"
    );


  const missingA =
    countResultsByType(
      "missing-a"
    );


  const missingB =
    countResultsByType(
      "missing-b"
    );


  const duplicates =
    countResultsByType(
      "duplicate"
    );


  const comparable =
    matches
    +
    differences
    +
    missingA
    +
    missingB;


  const rate =
    comparable > 0
      ?
        (
          matches /
          comparable
        ) * 100
      :
        0;


  elements.totalA.textContent =
    state.reportA.data.length
      .toLocaleString();


  elements.totalB.textContent =
    state.reportB.data.length
      .toLocaleString();


  elements.totalMatches.textContent =
    matches
      .toLocaleString();


  elements.totalDifferences.textContent =
    differences
      .toLocaleString();


  elements.missingA.textContent =
    missingA
      .toLocaleString();


  elements.missingB.textContent =
    missingB
      .toLocaleString();


  elements.totalDuplicates.textContent =
    duplicates
      .toLocaleString();


  elements.matchRate.textContent =
    `${rate.toFixed(
      1
    )}%`;

}


function countResultsByType(
  type
) {

  return state.results.filter(
    item =>
      item.type === type
  ).length;

}


/* =========================================================
   FILTERS
========================================================= */

function applyResultFilters() {

  state.filteredResults =
    state.results.filter(
      result => {

        const matchesFilter =
          state.currentFilter ===
            "all"
          ||
          result.type ===
            state.currentFilter;


        if (!matchesFilter) {

          return false;

        }


        if (
          !state.searchTerm
        ) {

          return true;

        }


        const searchable =
          [
            getStatusLabel(
              result
            ),

            result.key,

            JSON.stringify(
              result.recordA || {}
            ),

            JSON.stringify(
              result.recordB || {}
            )
          ]
            .join(" ")
            .toLowerCase();


        return searchable.includes(
          state.searchTerm
        );

      }
    );


  renderResults();

}


/* =========================================================
   RESULT RENDERING
========================================================= */

function renderResults() {

  elements
    .resultsTableBody
    .innerHTML =
      "";


  if (
    !state
      .filteredResults
      .length
  ) {

    elements
      .emptyResults
      .hidden =
        false;

    return;

  }


  elements
    .emptyResults
    .hidden =
      true;


  const fragment =
    document.createDocumentFragment();


  state.filteredResults.forEach(
    result => {

      const row =
        document.createElement(
          "tr"
        );


      const statusCell =
        document.createElement(
          "td"
        );


      const badge =
        document.createElement(
          "span"
        );


      badge.className =
        `status-badge ${getStatusClass(
          result.type
        )}`;


      badge.textContent =
        getStatusLabel(
          result
        );


      statusCell.appendChild(
        badge
      );


      const keyCell =
        document.createElement(
          "td"
        );


      keyCell.textContent =
        result.key || "—";


      const reportACell =
        document.createElement(
          "td"
        );


      reportACell.textContent =
        result.recordA
          ?
            summarizeRecord(
              result.recordA
            )
          :
            t(
              "notFound"
            );


      const reportBCell =
        document.createElement(
          "td"
        );


      reportBCell.textContent =
        result.recordB
          ?
            summarizeRecord(
              result.recordB
            )
          :
            t(
              "notFound"
            );


      const detailsCell =
        document.createElement(
          "td"
        );


      const detailsButton =
        document.createElement(
          "button"
        );


      detailsButton.type =
        "button";


      detailsButton.className =
        "secondary-action";


      detailsButton.textContent =
        t(
          "viewDetails"
        );


      detailsButton.addEventListener(
        "click",
        () => {

          openResultDetails(
            result
          );

        }
      );


      detailsCell.appendChild(
        detailsButton
      );


      row.append(
        statusCell,
        keyCell,
        reportACell,
        reportBCell,
        detailsCell
      );


      fragment.appendChild(
        row
      );

    }
  );


  elements
    .resultsTableBody
    .appendChild(
      fragment
    );

}


/* =========================================================
   STATUS LABEL
========================================================= */

function getStatusLabel(
  result
) {

  switch (
    result.type
  ) {

    case "match":

      return t(
        "match"
      );


    case "different":

      return t(
        "different"
      );


    case "missing-a":

      return t(
        "missingInA"
      );


    case "missing-b":

      return t(
        "missingInB"
      );


    case "duplicate":

      return (
        result.duplicateReport ===
          "A"
        ?
          t(
            "duplicateInA"
          )
        :
          t(
            "duplicateInB"
          )
      );


    default:

      return result.type;

  }

}


/* =========================================================
   STATUS CLASS
========================================================= */

function getStatusClass(
  type
) {

  switch (type) {

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


/* =========================================================
   RECORD SUMMARY
========================================================= */

function summarizeRecord(
  record
) {

  const entries =
    Object.entries(
      record
    );


  if (
    !entries.length
  ) {

    return "—";

  }


  return entries
    .slice(
      0,
      3
    )
    .map(
      ([
        key,
        value
      ]) => {

        return `${key}: ${value}`;

      }
    )
    .join(
      " · "
    );

}


/* =========================================================
   DETAILS MODAL
========================================================= */

function openResultDetails(
  result
) {

  elements
    .modalContent
    .innerHTML =
      "";


  const status =
    document.createElement(
      "p"
    );


  status.innerHTML =
    `<strong>${escapeHTML(
      t(
        "status"
      )
    )}:</strong> ${escapeHTML(
      getStatusLabel(
        result
      )
    )}`;


  const key =
    document.createElement(
      "p"
    );


  key.innerHTML =
    `<strong>${escapeHTML(
      t(
        "key"
      )
    )}:</strong> ${escapeHTML(
      result.key || "—"
    )}`;


  elements.modalContent.append(
    status,
    key
  );


  if (
    result.differences
    &&
    result.differences.length
  ) {

    const title =
      document.createElement(
        "h3"
      );


    title.textContent =
      t(
        "fieldDifferencesTitle"
      );


    title.style.marginTop =
      "24px";


    elements.modalContent.appendChild(
      title
    );


    result.differences.forEach(
      difference => {

        const block =
          document.createElement(
            "div"
          );


        block.className =
          "detail-block";


        const column =
          document.createElement(
            "strong"
          );


        column.textContent =
          difference.column;


        const valueA =
          document.createElement(
            "p"
          );


        valueA.textContent =
          `${t(
            "reportAValue"
          )}: ${difference.valueA ?? ""}`;


        const valueB =
          document.createElement(
            "p"
          );


        valueB.textContent =
          `${t(
            "reportBValue"
          )}: ${difference.valueB ?? ""}`;


        block.append(
          column,
          valueA,
          valueB
        );


        elements
          .modalContent
          .appendChild(
            block
          );

      }
    );

  }


  if (
    result.type ===
      "duplicate"
    &&
    result.duplicateRecords
  ) {

    const title =
      document.createElement(
        "h3"
      );


    title.textContent =
      `${t(
        "duplicateRecords"
      )} — ${result.duplicateReport}`;


    title.style.marginTop =
      "24px";


    elements
      .modalContent
      .appendChild(
        title
      );


    result
      .duplicateRecords
      .forEach(
        (
          record,
          index
        ) => {

          const pre =
            document.createElement(
              "pre"
            );


          pre.className =
            "record-json";


          pre.textContent =
            `#${index + 1}\n${JSON.stringify(
              record,
              null,
              2
            )}`;


          elements
            .modalContent
            .appendChild(
              pre
            );

        }
      );

  }


  elements
    .detailsModal
    .hidden =
      false;

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeModal() {

  if (
    elements.detailsModal
  ) {

    elements
      .detailsModal
      .hidden =
        true;

  }

}


/* =========================================================
   CSV EXPORT
========================================================= */

function exportResultsToCSV() {

  if (
    !state.results.length
  ) {

    setStatus(
      t(
        "noExportResults"
      ),
      "error"
    );

    return;

  }


  if (
    typeof Papa ===
    "undefined"
  ) {

    setStatus(
      t(
        "csvLibraryError"
      ),
      "error"
    );

    return;

  }


  const data =
    buildExportData();


  const csv =
    Papa.unparse(
      data
    );


  const blob =
    new Blob(
      [
        "\uFEFF",
        csv
      ],
      {
        type:
          "text/csv;charset=utf-8;"
      }
    );


  downloadBlob(
    blob,
    createExportFilename(
      "csv"
    )
  );

}


/* =========================================================
   EXCEL EXPORT
========================================================= */

function exportResultsToExcel() {

  if (
    !state.results.length
  ) {

    setStatus(
      t(
        "noExportResults"
      ),
      "error"
    );

    return;

  }


  if (
    typeof XLSX ===
    "undefined"
  ) {

    setStatus(
      t(
        "excelLibraryError"
      ),
      "error"
    );

    return;

  }


  const data =
    buildExportData();


  const worksheet =
    XLSX
      .utils
      .json_to_sheet(
        data
      );


  const workbook =
    XLSX
      .utils
      .book_new();


  XLSX
    .utils
    .book_append_sheet(
      workbook,
      worksheet,
      "Reconciliation"
    );


  XLSX.writeFile(
    workbook,
    createExportFilename(
      "xlsx"
    )
  );

}


/* =========================================================
   EXPORT DATA
========================================================= */

function buildExportData() {

  return state.results.map(
    result => {

      return {

        Status:
          getStatusLabel(
            result
          ),

        Key:
          result.key,

        Report_A:
          result.recordA
            ?
              JSON.stringify(
                result.recordA
              )
            :
              "",

        Report_B:
          result.recordB
            ?
              JSON.stringify(
                result.recordB
              )
            :
              "",

        Differences:
          result.differences
            ?.map(
              difference => {

                return (
                  `${difference.column}: `
                  +
                  `"${difference.valueA}" -> `
                  +
                  `"${difference.valueB}"`
                );

              }
            )
            .join(
              " | "
            )
          ||
          ""

      };

    }
  );

}


/* =========================================================
   DOWNLOAD
========================================================= */

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


  URL.revokeObjectURL(
    url
  );

}


/* =========================================================
   EXPORT FILENAME
========================================================= */

function createExportFilename(
  extension
) {

  const now =
    new Date();


  const year =
    now.getFullYear();


  const month =
    String(
      now.getMonth() + 1
    ).padStart(
      2,
      "0"
    );


  const day =
    String(
      now.getDate()
    ).padStart(
      2,
      "0"
    );


  return (
    `loop-reconciliation-${year}-${month}-${day}.${extension}`
  );

}


/* =========================================================
   RESET
========================================================= */

function resetApplication() {

  state.reportA = {
    file: null,
    data: [],
    columns: []
  };


  state.reportB = {
    file: null,
    data: [],
    columns: []
  };


  state.results = [];

  state.filteredResults = [];

  state.currentFilter =
    "all";

  state.searchTerm =
    "";


  elements.fileA.value =
    "";


  elements.fileB.value =
    "";


  elements
    .keyColumnA
    .innerHTML =
      "";


  elements
    .keyColumnB
    .innerHTML =
      "";


  populateColumnSelect(
    elements.keyColumnA,
    []
  );


  populateColumnSelect(
    elements.keyColumnB,
    []
  );


  elements
    .compareButton
    .disabled =
      true;


  elements
    .resultsSection
    .hidden =
      true;


  elements
    .resultsTableBody
    .innerHTML =
      "";


  elements
    .resultSearch
    .value =
      "";


  document
    .querySelectorAll(
      ".filter-button"
    )
    .forEach(
      button => {

        button.classList.toggle(
          "active",
          button.dataset.filter ===
            "all"
        );

      }
    );


  updateFileDisplay(
    "A"
  );


  updateFileDisplay(
    "B"
  );


  resetMetrics();


  setStatus(
    t(
      "workspaceReset"
    ),
    "success"
  );

}


/* =========================================================
   RESET METRICS
========================================================= */

function resetMetrics() {

  elements.totalA.textContent =
    "0";

  elements.totalB.textContent =
    "0";

  elements.totalMatches.textContent =
    "0";

  elements.totalDifferences.textContent =
    "0";

  elements.missingA.textContent =
    "0";

  elements.missingB.textContent =
    "0";

  elements.totalDuplicates.textContent =
    "0";

  elements.matchRate.textContent =
    "0%";

}


/* =========================================================
   DYNAMIC LANGUAGE REFRESH
========================================================= */

function refreshDynamicLanguage() {

  populateColumnSelect(
    elements.keyColumnA,
    state.reportA.columns
  );


  populateColumnSelect(
    elements.keyColumnB,
    state.reportB.columns
  );


  updateFileDisplay(
    "A"
  );


  updateFileDisplay(
    "B"
  );


  if (
    state.results.length
  ) {

    updateMetrics();

    applyResultFilters();

  }

}


/* =========================================================
   UTILITIES
========================================================= */

function getFileExtension(
  filename
) {

  return filename
    .split(".")
    .pop()
    .toLowerCase();

}


function formatFileSize(
  bytes
) {

  if (!bytes) {

    return "0 B";

  }


  const units =
    [
      "B",
      "KB",
      "MB",
      "GB"
    ];


  const index =
    Math.min(
      Math.floor(
        Math.log(bytes)
        /
        Math.log(1024)
      ),
      units.length - 1
    );


  const value =
    bytes
    /
    Math.pow(
      1024,
      index
    );


  return (
    `${value.toFixed(
      index === 0
        ? 0
        : 1
    )} ${units[index]}`
  );

}


function getDisplayKey(
  record,
  keyColumn
) {

  return String(
    record[
      keyColumn
    ]
    ??
    ""
  );

}


function setStatus(
  message,
  type = ""
) {

  elements
    .processStatus
    .textContent =
      message;


  elements
    .processStatus
    .classList
    .remove(
      "error",
      "success"
    );


  if (
    type === "error"
    ||
    type === "success"
  ) {

    elements
      .processStatus
      .classList
      .add(
        type
      );

  }

}


function escapeHTML(
  value
) {

  const element =
    document.createElement(
      "div"
    );


  element.textContent =
    String(
      value ?? ""
    );


  return element.innerHTML;

}


/* =========================================================
   INITIALIZATION
========================================================= */

changeLanguage(
  currentLanguage
);


resetMetrics();


console.log(
  "%cLoop Reconciler",
  "font-size:20px;font-weight:bold;color:#a78bfa"
);


console.log(
  "Loop Reconciler initialized."
);
