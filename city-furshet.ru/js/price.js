const decode = (responseArrayBuffer) => {
  const dataView = new DataView(responseArrayBuffer);
  const decoder = new TextDecoder("windows-1251");
  return decoder.decode(dataView);
};

const xhrArrayBuffer = new XMLHttpRequest();
xhrArrayBuffer.responseType = "arraybuffer";

$.ajax({
  url: "city-furshet.ru/Price.csv",
  method: "GET",
  xhr: () => xhrArrayBuffer,
  success: (data) => processing(decode(data)),
});

const processingString = (s) => s.trim().replaceAll("  ", "").replaceAll("\n", "").replaceAll("\r");

const processing = (string) => {
  let arr = string.split("\n");
  let data = {};

  arr.forEach((el, index) => {
    if (index > 0) {
      const row = el.split(";");

      if (row[0]) {
        if (!data[row[0]]) {
          data[row[0]] = [];
        }

        data[processingString(row[0])].push({
          image: processingString(row[1]),
          title: processingString(row[2]),
          price: processingString(row[3]),
          subtitle: processingString(row[4]),
          description: processingString(row[5]),
        });
      }
    }
  });

  console.log(data);
};
