/* =========================================================
   LOOP RECONCILER
   Universal CSV / Excel Data Reconciliation Tool

   Author: beto-dev94
   Project: Loop Suite
========================================================= */

"use strict";

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

  startButton:
    document.getElementById("startButton"),

  comparisonSection:
    document.getElementById("comparison"),

  fileA:
    document.getElementById("fileA"),

  fileB:
    document.getElementById("fileB"),

  fileAStatus:
    document.getElementById("fileAStatus"),

  fileBStatus:
    document.getElementById("fileBStatus"),

  fileAInfo:
    document.getElementById("fileAInfo"),

  fileBInfo:
    document.getElementById("fileBInfo"),

  keyColumnA:
    document.getElementById("keyColumnA"),

  keyColumnB:
    document.getElementById("keyColumnB"),

  trimValues:
    document.getElementById("trimValues"),

  ignoreCase:
    document.getElementById("ignoreCase"),

  ignoreEmpty:
    document.getElementById("ignoreEmpty"),

  detectDuplicates:
    document.getElementById("detectDuplicates"),

  compareFields:
    document.getElementById("compareFields"),

  compareButton:
    document.getElementById("compareButton"),

  resetButton:
    document.getElementById("resetButton"),

  processStatus:
    document.getElementById("processStatus"),

  resultsSection:
    document.getElementById("results"),

  totalA:
    document.getElementById("totalA"),

  totalB:
    document.getElementById("totalB"),

  totalMatches:
    document.getElementById("totalMatches"),

  totalDifferences:
    document.getElementById("totalDifferences"),

  missingA:
    document.getElementById("missingA"),

  missingB:
    document.getElementById("missingB"),

  totalDuplicates:
    document.getElementById("totalDuplicates"),

  matchRate:
    document.getElementById("matchRate"),

  resultSearch:
    document.getElementById("resultSearch"),

  filterButtons:
    document.getElementById("filterButtons"),

  resultsTableBody:
    document.getElementById("resultsTableBody"),

  emptyResults:
    document.getElementById("emptyResults"),

  exportCsvButton:
    document.getElementById("exportCsvButton"),

  exportExcelButton:
    document.getElementById("exportExcelButton"),

  detailsModal:
    document.getElementById("detailsModal"),

  modalContent:
    document.getElementById("modalContent"),

  closeModalButton:
    document.getElementById("closeModalButton")
};


/* =========================================================
   INITIAL EVENTS
========================================================= */

elements.startButton.addEventListener(
  "click",
  () => {

    elements.comparisonSection.scrollIntoView({
      behavior: "smooth"
    });

  }
);


elements.fileA.addEventListener(
  "change",
  async event => {

    await handleFile(
      event.target.files[0],
      "A"
    );

  }
);


elements.fileB.addEventListener(
  "change",
  async event => {

    await handleFile(
      event.target.files[0],
      "B"
    );

  }
);


elements.keyColumnA.addEventListener(
  "change",
  validateComparison
);


elements.keyColumnB.addEventListener(
  "change",
  validateComparison
);


elements.compareButton.addEventListener(
  "click",
  runComparison
);


elements.resetButton.addEventListener(
  "click",
  resetApplication
);


elements.resultSearch.addEventListener(
  "input",
  event => {

    state.searchTerm =
      event.target.value
        .trim()
        .toLowerCase();

    applyResultFilters();

  }
);


elements.filterButtons.addEventListener(
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


elements.exportCsvButton.addEventListener(
  "click",
  exportResultsToCSV
);


elements.exportExcelButton.addEventListener(
  "click",
  exportResultsToExcel
);


elements.closeModalButton.addEventListener(
  "click",
  closeModal
);


elements.detailsModal.addEventListener(
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

    if (event.key === "Escape") {
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
    `Reading ${file.name}...`
  );

  try {

    const extension =
      getFileExtension(
        file.name
      );

    let data;

    if (extension === "csv") {

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
        "Unsupported file format."
      );

    }

    data =
      cleanDataset(
        data
      );

    if (!data.length) {

      throw new Error(
        "The selected file contains no usable records."
      );

    }

    const columns =
      extractColumns(
        data
      );


    if (reportName === "A") {

      state.reportA.file =
        file;

      state.reportA.data =
        data;

      state.reportA.columns =
        columns;

      updateFileDisplay(
        "A",
        file,
        data
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
        "B",
        file,
        data
      );

      populateColumnSelect(
        elements.keyColumnB,
        columns
      );

    }


    autoSelectMatchingColumns();

    validateComparison();


    setStatus(
      `${file.name} loaded successfully.`
    );

  }

  catch (error) {

    console.error(error);

    setStatus(
      `Error: ${error.message}`,
      true
    );

  }

}


/* =========================================================
   CSV READER
========================================================= */

function readCSV(file) {

  return new Promise(
    (resolve, reject) => {

      if (
        typeof Papa ===
        "undefined"
      ) {

        reject(
          new Error(
            "CSV library failed to load."
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

              if (
                results.errors &&
                results.errors.length
              ) {

                console.warn(
                  "CSV parsing warnings:",
                  results.errors
                );

              }

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
    (resolve, reject) => {

      if (
        typeof XLSX ===
        "undefined"
      ) {

        reject(
          new Error(
            "Excel library failed to load."
          )
        );

        return;
      }


      const reader =
        new FileReader();


      reader.onload =
        event => {

          try {

            const arrayBuffer =
              event.target.result;

            const workbook =
              XLSX.read(
                arrayBuffer,
                {
                  type: "array"
                }
              );


            const firstSheetName =
              workbook.SheetNames[0];


            if (!firstSheetName) {

              throw new Error(
                "Excel file contains no worksheets."
              );

            }


            const worksheet =
              workbook.Sheets[
                firstSheetName
              ];


            const data =
              XLSX.utils.sheet_to_json(
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
              "Unable to read Excel file."
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
   DATA CLEANING
========================================================= */

function cleanDataset(data) {

  return data
    .filter(
      row => {

        if (
          !row ||
          typeof row !== "object"
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

        const cleanRow = {};

        for (
          const [
            key,
            value
          ]
          of Object.entries(row)
        ) {

          const cleanKey =
            String(key)
              .trim();

          if (!cleanKey) {
            continue;
          }

          cleanRow[
            cleanKey
          ] =
            value ?? "";

        }

        return cleanRow;

      }
    );

}


/* =========================================================
   COLUMN EXTRACTION
========================================================= */

function extractColumns(data) {

  const columns =
    new Set();


  data.forEach(
    row => {

      Object
        .keys(row)
        .forEach(
          key => {
            columns.add(key);
          }
        );

    }
  );


  return Array.from(
    columns
  );

}


/* =========================================================
   COLUMN SELECT
========================================================= */

function populateColumnSelect(
  selectElement,
  columns
) {

  selectElement.innerHTML =
    '<option value="">Select a column</option>';


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

}


/* =========================================================
   AUTOMATIC MATCHING COLUMN
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


  const commonColumn =
    columnsA.find(
      columnA => {

        return columnsB.some(
          columnB => {

            return normalizeColumnName(
              columnA
            ) ===
            normalizeColumnName(
              columnB
            );

          }
        );

      }
    );


  if (!commonColumn) {
    return;
  }


  const matchB =
    columnsB.find(
      columnB => {

        return normalizeColumnName(
          columnB
        ) ===
        normalizeColumnName(
          commonColumn
        );

      }
    );


  if (
    !elements.keyColumnA.value
  ) {

    elements.keyColumnA.value =
      commonColumn;

  }


  if (
    !elements.keyColumnB.value
  ) {

    elements.keyColumnB.value =
      matchB;

  }

}


/* =========================================================
   NORMALIZATION
========================================================= */

function normalizeColumnName(value) {

  return String(
    value ?? ""
  )
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    )
    .replace(
      /[^a-z0-9]/g,
      ""
    );

}


function normalizeValue(value) {

  let normalized =
    String(
      value ?? ""
    );


  if (
    elements.trimValues.checked
  ) {

    normalized =
      normalized.trim();

  }


  if (
    elements.ignoreCase.checked
  ) {

    normalized =
      normalized.toLowerCase();

  }


  return normalized;

}


/* =========================================================
   VALIDATE COMPARISON
========================================================= */

function validateComparison() {

  const valid =
    state.reportA.data.length > 0 &&
    state.reportB.data.length > 0 &&
    elements.keyColumnA.value &&
    elements.keyColumnB.value;


  elements.compareButton.disabled =
    !valid;

}


/* =========================================================
   FILE DISPLAY
========================================================= */

function updateFileDisplay(
  report,
  file,
  data
) {

  const size =
    formatFileSize(
      file.size
    );


  if (report === "A") {

    elements.fileAStatus.textContent =
      "Ready";

    elements.fileAInfo.textContent =
      `${file.name} · ${data.length.toLocaleString()} records · ${size}`;

  }

  else {

    elements.fileBStatus.textContent =
      "Ready";

    elements.fileBInfo.textContent =
      `${file.name} · ${data.length.toLocaleString()} records · ${size}`;

  }

}


/* =========================================================
   RUN COMPARISON
========================================================= */

function runComparison() {

  try {

    setStatus(
      "Comparing reports..."
    );


    const keyA =
      elements.keyColumnA.value;

    const keyB =
      elements.keyColumnB.value;


    if (
      !keyA ||
      !keyB
    ) {

      throw new Error(
        "Select matching columns for both reports."
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


    /* ---------------------------------------------------------
       DUPLICATES
    --------------------------------------------------------- */

    if (
      elements.detectDuplicates.checked
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


    /* ---------------------------------------------------------
       REPORT A -> REPORT B
    --------------------------------------------------------- */

    indexA.records.forEach(
      (
        recordA,
        normalizedKey
      ) => {

        if (
          elements.ignoreEmpty.checked &&
          !normalizedKey
        ) {

          return;

        }


        const recordB =
          indexB.records.get(
            normalizedKey
          );


        if (!recordB) {

          results.push(
            {

              type:
                "missing-b",

              status:
                "Missing in B",

              key:
                getDisplayKey(
                  recordA,
                  keyA
                ),

              recordA:
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
          elements.compareFields.checked
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

              status:
                "Different",

              key:
                getDisplayKey(
                  recordA,
                  keyA
                ),

              recordA:
                recordA,

              recordB:
                recordB,

              differences:
                differences

            }
          );

        }

        else {

          results.push(
            {

              type:
                "match",

              status:
                "Match",

              key:
                getDisplayKey(
                  recordA,
                  keyA
                ),

              recordA:
                recordA,

              recordB:
                recordB,

              differences:
                []

            }
          );

        }

      }
    );


    /* ---------------------------------------------------------
       REPORT B -> REPORT A
    --------------------------------------------------------- */

    indexB.records.forEach(
      (
        recordB,
        normalizedKey
      ) => {

        if (
          elements.ignoreEmpty.checked &&
          !normalizedKey
        ) {
          return;
        }


        if (
          indexA.records.has(
            normalizedKey
          )
        ) {
          return;
        }


        results.push(
          {

            type:
              "missing-a",

            status:
              "Missing in A",

            key:
              getDisplayKey(
                recordB,
                keyB
              ),

            recordA:
              null,

            recordB:
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


    elements.resultsSection.hidden =
      false;


    setStatus(
      `Comparison completed. ${results.length.toLocaleString()} results generated.`
    );


    elements.resultsSection.scrollIntoView(
      {
        behavior: "smooth"
      }
    );

  }

  catch (error) {

    console.error(error);

    setStatus(
      `Error: ${error.message}`,
      true
    );

  }

}


/* =========================================================
   CREATE DATASET INDEX
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

      const originalKey =
        record[
          keyColumn
        ];


      const normalizedKey =
        normalizeValue(
          originalKey
        );


      if (
        elements.ignoreEmpty.checked &&
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
   DUPLICATE RESULTS
========================================================= */

function addDuplicateResults(
  results,
  index,
  report
) {

  index.duplicates.forEach(
    (
      duplicateRecords,
      normalizedKey
    ) => {

      results.push(
        {

          type:
            "duplicate",

          status:
            `Duplicate in ${report}`,

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

          duplicateRecords:
            duplicateRecords,

          duplicateReport:
            report,

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


  const mappedColumns =
    buildColumnMapping(
      recordA,
      recordB
    );


  mappedColumns.forEach(
    mapping => {

      const columnA =
        mapping.columnA;

      const columnB =
        mapping.columnB;


      if (
        columnA === keyA ||
        columnB === keyB
      ) {

        return;

      }


      const valueA =
        columnA
          ?
        recordA[
          columnA
        ]
          :
        "";


      const valueB =
        columnB
          ?
        recordB[
          columnB
        ]
          :
        "";


      const normalizedA =
        normalizeValue(
          valueA
        );


      const normalizedB =
        normalizeValue(
          valueB
        );


      if (
        normalizedA !==
        normalizedB
      ) {

        differences.push(
          {

            column:
              columnA ||
              columnB,

            columnA:
              columnA,

            columnB:
              columnB,

            valueA:
              valueA,

            valueB:
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
              !usedB.has(candidate) &&
              normalizeColumnName(
                candidate
              ) === normalizedA
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

          columnB:
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
    state.results.filter(
      result =>
        result.type ===
        "match"
    ).length;


  const differences =
    state.results.filter(
      result =>
        result.type ===
        "different"
    ).length;


  const missingA =
    state.results.filter(
      result =>
        result.type ===
        "missing-a"
    ).length;


  const missingB =
    state.results.filter(
      result =>
        result.type ===
        "missing-b"
    ).length;


  const duplicates =
    state.results.filter(
      result =>
        result.type ===
        "duplicate"
    ).length;


  const comparable =
    matches +
    differences +
    missingA +
    missingB;


  const rate =
    comparable
      ?
      (
        matches /
        comparable *
        100
      )
      :
      0;


  elements.totalA.textContent =
    state.reportA.data.length
      .toLocaleString();


  elements.totalB.textContent =
    state.reportB.data.length
      .toLocaleString();


  elements.totalMatches.textContent =
    matches.toLocaleString();


  elements.totalDifferences.textContent =
    differences.toLocaleString();


  elements.missingA.textContent =
    missingA.toLocaleString();


  elements.missingB.textContent =
    missingB.toLocaleString();


  elements.totalDuplicates.textContent =
    duplicates.toLocaleString();


  elements.matchRate.textContent =
    `${rate.toFixed(1)}%`;

}


/* =========================================================
   RESULT FILTERS
========================================================= */

function applyResultFilters() {

  const filtered =
    state.results.filter(
      result => {

        const filterMatch =
          state.currentFilter ===
            "all"
            ||
          result.type ===
            state.currentFilter;


        if (!filterMatch) {
          return false;
        }


        if (!state.searchTerm) {
          return true;
        }


        const searchable =
          [
            result.status,
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


  state.filteredResults =
    filtered;


  renderResults();

}


/* =========================================================
   RENDER RESULTS
========================================================= */

function renderResults() {

  elements.resultsTableBody.innerHTML =
    "";


  if (
    !state.filteredResults.length
  ) {

    elements.emptyResults.hidden =
      false;

    return;

  }


  elements.emptyResults.hidden =
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
        result.status;


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
        "Not found";


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
        "Not found";


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
        "View details";


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


  elements.resultsTableBody.appendChild(
    fragment
  );

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


  if (!entries.length) {
    return "—";
  }


  return entries
    .slice(0, 3)
    .map(
      ([key, value]) =>
        `${key}: ${value}`
    )
    .join(" · ");

}


/* =========================================================
   RESULT DETAILS MODAL
========================================================= */

function openResultDetails(
  result
) {

  elements.modalContent.innerHTML =
    "";


  const status =
    document.createElement(
      "p"
    );


  status.innerHTML =
    `<strong>Status:</strong> ${escapeHTML(
      result.status
    )}`;


  const key =
    document.createElement(
      "p"
    );


  key.innerHTML =
    `<strong>Key:</strong> ${escapeHTML(
      result.key || "—"
    )}`;


  elements.modalContent.append(
    status,
    key
  );


  if (
    result.differences &&
    result.differences.length
  ) {

    const title =
      document.createElement(
        "h3"
      );

    title.textContent =
      "Field differences";

    title.style.marginTop =
      "24px";

    title.style.marginBottom =
      "12px";


    elements.modalContent.appendChild(
      title
    );


    result.differences.forEach(
      difference => {

        const block =
          document.createElement(
            "div"
          );


        block.style.padding =
          "14px";

        block.style.marginBottom =
          "10px";

        block.style.border =
          "1px solid rgba(255,255,255,0.09)";

        block.style.borderRadius =
          "12px";


        block.innerHTML =
          `
          <strong>${escapeHTML(
            difference.column
          )}</strong>

          <p style="margin-top:8px;color:#94a3b8">
            Report A:
            ${escapeHTML(
              difference.valueA
            )}
          </p>

          <p style="margin-top:4px;color:#94a3b8">
            Report B:
            ${escapeHTML(
              difference.valueB
            )}
          </p>
          `;


        elements.modalContent.appendChild(
          block
        );

      }
    );

  }


  if (
    result.type ===
    "duplicate" &&
    result.duplicateRecords
  ) {

    const duplicateTitle =
      document.createElement(
        "h3"
      );


    duplicateTitle.textContent =
      `Duplicate records in Report ${result.duplicateReport}`;


    duplicateTitle.style.marginTop =
      "24px";


    elements.modalContent.appendChild(
      duplicateTitle
    );


    result.duplicateRecords.forEach(
      (
        record,
        index
      ) => {

        const pre =
          document.createElement(
            "pre"
          );


        pre.textContent =
          `Record ${index + 1}\n\n${JSON.stringify(
            record,
            null,
            2
          )}`;


        pre.style.whiteSpace =
          "pre-wrap";

        pre.style.marginTop =
          "12px";

        pre.style.padding =
          "14px";

        pre.style.background =
          "rgba(255,255,255,0.03)";

        pre.style.borderRadius =
          "12px";


        elements.modalContent.appendChild(
          pre
        );

      }
    );

  }


  elements.detailsModal.hidden =
    false;

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeModal() {

  elements.detailsModal.hidden =
    true;

}


/* =========================================================
   CSV EXPORT
========================================================= */

function exportResultsToCSV() {

  if (
    !state.results.length
  ) {

    setStatus(
      "There are no results to export.",
      true
    );

    return;

  }


  const exportData =
    buildExportData();


  const csv =
    Papa.unparse(
      exportData
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
      "There are no results to export.",
      true
    );

    return;

  }


  if (
    typeof XLSX ===
    "undefined"
  ) {

    setStatus(
      "Excel library is not available.",
      true
    );

    return;

  }


  const exportData =
    buildExportData();


  const worksheet =
    XLSX.utils.json_to_sheet(
      exportData
    );


  const workbook =
    XLSX.utils.book_new();


  XLSX.utils.book_append_sheet(
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
   BUILD EXPORT DATA
========================================================= */

function buildExportData() {

  return state.results.map(
    result => {

      return {

        Status:
          result.status,

        Key:
          result.key,

        "Report A":
          result.recordA
            ?
          JSON.stringify(
            result.recordA
          )
            :
          "",

        "Report B":
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
              difference =>
                `${difference.column}: "${difference.valueA}" -> "${difference.valueB}"`
            )
            .join(" | ")
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
   EXPORT FILE NAME
========================================================= */

function createExportFilename(
  extension
) {

  const date =
    new Date();


  const year =
    date.getFullYear();


  const month =
    String(
      date.getMonth() + 1
    ).padStart(
      2,
      "0"
    );


  const day =
    String(
      date.getDate()
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


  elements.fileAStatus.textContent =
    "No file";

  elements.fileBStatus.textContent =
    "No file";


  elements.fileAInfo.textContent =
    "";

  elements.fileBInfo.textContent =
    "";


  elements.keyColumnA.innerHTML =
    '<option value="">Select a column</option>';

  elements.keyColumnB.innerHTML =
    '<option value="">Select a column</option>';


  elements.compareButton.disabled =
    true;


  elements.resultsSection.hidden =
    true;


  elements.resultsTableBody.innerHTML =
    "";


  elements.resultSearch.value =
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


  resetMetrics();


  setStatus(
    "Workspace reset."
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


  const units = [
    "B",
    "KB",
    "MB",
    "GB"
  ];


  const index =
    Math.min(
      Math.floor(
        Math.log(bytes) /
        Math.log(1024)
      ),
      units.length - 1
    );


  const value =
    bytes /
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

  const value =
    record[
      keyColumn
    ];


  return String(
    value ?? ""
  );

}


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


function setStatus(
  message,
  error = false
) {

  elements.processStatus.textContent =
    message;


  elements.processStatus.style.color =
    error
      ?
      "#fca5a5"
      :
      "";

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
   READY
========================================================= */

console.log(
  "%cLoop Reconciler",
  "font-size:20px;font-weight:bold;color:#a78bfa"
);


console.log(
  "Data reconciliation engine initialized."
);
