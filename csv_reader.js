const content = document.querySelector("#content");

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

  let _content = ``;

  arrRows.forEach((row, index) => {
    if (index > 0) {
      const rowArr = row.split(";");
      let card = ``;

      card += `<img src="images/${rowArr[7]}" />`;
      card += `<span id="title">${rowArr[1]}</span>`;
      card += `<span id="description">${rowArr[2]}</span>`;
      card += `<span id="count_of_persons">Количество персон: ${rowArr[3]}</span>`;
      card += `<span id="weight">Вес: ${rowArr[4]} г.</span>`;
      card += `<span id="price">${rowArr[5]}</span>`;

      _content += `<div id="card">${card}</div>`;
    }
  });

  content.innerHTML = _content;
};
