const table = document.querySelector("#table");
const loader = document.querySelector("#loader");

const decode = (responseArrayBuffer) => {
  const dataView = new DataView(responseArrayBuffer),
    decoder = new TextDecoder("windows-1251");
  return decoder.decode(dataView);
};

fetch("nomenclature.csv")
  .then((response) => response.arrayBuffer())
  .then(decode)
  .then((data) => parse(data))
  .catch((err) => alert(err?.message));

const parse = (csv) => {
  const arrRows = csv.trim().split("\n");

  let _table = ``;

  arrRows.forEach((row, index) => {
    let _row = ``;

    if (index === 0) {
      row.split(";").forEach((cell) => (_row += `<th>${cell}</th>`));
    } else {
      row.split(";").forEach((cell, i) => {
        if (i !== 7) {
          _row += `<td>${cell}</td>`;
        } else {
          _row += `<td><image src="images/${cell}" /></td>`;
        }
      });
    }

    _table += `<tr>${_row}</tr>`;
  });

  table.innerHTML = _table;
  loader.innerHTML = "Успешно загружено!";
};
