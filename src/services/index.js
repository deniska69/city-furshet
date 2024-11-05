import $ from "jquery";
import mockePrice from "./mockePrice.json";

export const sendOrder = async (dataSend) => {
  await $.ajax({
    type: "POST",
    url: import.meta.env.VITE_SEND_URL,
    data: dataSend,
    success: (data) => Promise.resolve(data),
    error: (e) => Promise.reject(e),
  });
};

export const getPrice = async () => {
  if (import.meta.env.DEV) return Promise.resolve(mockePrice);

  const xhrArrayBuffer = new XMLHttpRequest();
  xhrArrayBuffer.responseType = "arraybuffer";

  let res = {};

  await $.ajax({
    url: import.meta.env.VITE_PRICE_URL,
    method: "GET",
    xhr: () => xhrArrayBuffer,
    success: (data) => (res = processingCSV(decodeCSV(data))),
  });

  return Promise.resolve(res);
};

const decodeCSV = (responseArrayBuffer) => {
  const dataView = new DataView(responseArrayBuffer);
  const decoder = new TextDecoder("windows-1251");
  return decoder.decode(dataView);
};

const processingCSV = (string) => {
  let arr = string.split("\n");
  let data = {};
  let temp = [];

  arr.forEach((el, index) => {
    if (index > 0) {
      const row = el.split(";");

      const categoryId = processingString(transliterate(row[0]));
      const id = categoryId + "_" + processingString(transliterate(row[2])) + "_" + processingString(row[3]);

      const item = {
        categoryId,
        categoryTitle: processingString(row[0]),
        id,
        image: processingString(row[1]) || "city-furshet.ru/images/image_placeholder.jpg",
        title: processingString(row[2]),
        price: processingString(row[3]),
        subtitle: processingString(row[4]),
        description: processingString(row[5]),
      };

      if (item?.title && item?.categoryTitle) temp.push(item);
    }
  });

  temp.forEach((item) => {
    const categoryId = item?.categoryId;

    if (!data.hasOwnProperty(categoryId)) {
      data[categoryId] = {
        id: categoryId,
        title: item?.categoryTitle,
        items: temp.filter((el) => el?.categoryId === categoryId),
      };
    }
  });

  return data;
};

const processingString = (s) => {
  return s ? s.trim().replaceAll("  ", " ").replaceAll("\n", "").replaceAll("\r") : s;
};

const cyryllic_symbols = {
  Ё: "YO",
  Й: "I",
  Ц: "TS",
  У: "U",
  К: "K",
  Е: "E",
  Н: "N",
  Г: "G",
  Ш: "SH",
  Щ: "SCH",
  З: "Z",
  Х: "H",
  Ъ: "",
  ё: "yo",
  й: "i",
  ц: "ts",
  у: "u",
  к: "k",
  е: "e",
  н: "n",
  г: "g",
  ш: "sh",
  щ: "sch",
  з: "z",
  х: "h",
  ъ: "",
  Ф: "F",
  Ы: "I",
  В: "V",
  А: "A",
  П: "P",
  Р: "R",
  О: "O",
  Л: "L",
  Д: "D",
  Ж: "ZH",
  Э: "E",
  ф: "f",
  ы: "i",
  в: "v",
  а: "a",
  п: "p",
  р: "r",
  о: "o",
  л: "l",
  д: "d",
  ж: "zh",
  э: "e",
  Я: "Ya",
  Ч: "CH",
  С: "S",
  М: "M",
  И: "I",
  Т: "T",
  Ь: "",
  Б: "B",
  Ю: "YU",
  я: "ya",
  ч: "ch",
  с: "s",
  м: "m",
  и: "i",
  т: "t",
  ь: "",
  б: "b",
  ю: "yu",
};

const transliterate = (string) => {
  if (!string) return string;

  return string
    .split("")
    .map((char) => cyryllic_symbols[char] || "")
    .join("")
    .replaceAll(" ", "");
};
