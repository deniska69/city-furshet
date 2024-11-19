import $ from "jquery";

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
  const url = import.meta.env.DEV ? import.meta.env.VITE_PRICE_URL_DEV : import.meta.env.VITE_PRICE_URL;

  const xhrArrayBuffer = new XMLHttpRequest();
  xhrArrayBuffer.responseType = "arraybuffer";

  let res = {};

  await $.ajax({
    url,
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

  let model = {
    category: null,
    category_description: null,
    image: null,
    title: null,
    title_description: null,
    price: null,
    description: null,
    description_second: null,
  };

  arr[0].split(";").forEach((item, index) => (model[item.trim()] = index));

  console.log("");
  console.log("CSV Model:");
  console.log(model);

  arr.forEach((el, index) => {
    if (index > 0) {
      const row = el.split(";");

      const categoryTitle = processingString(row[model["category"]]);
      const categoryDescription = processingString(row[model["category_description"]]);
      const categoryId = transliterate(categoryTitle);

      const title = processingString(row[model["title"]]);
      const titleDescription = processingString(row[model["title_description"]]);

      const price = processingString(row[model["price"]]);

      const id = `${categoryId}_${transliterate(title)}_${price}`;

      const description = processingString(row[model["description"]]);
      const descriptionSecond = processingString(row[model["description_second"]]);

      const image = processingString(row[model["image"]]);

      const item = {
        categoryId,
        categoryTitle,
        categoryDescription,
        id,
        image,
        title,
        titleDescription,
        price,
        description,
        descriptionSecond,
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
        description: item?.categoryDescription,
        items: temp.filter((el) => el?.categoryId === categoryId),
      };
    }
  });

  console.log("");
  console.log("Processed data.:");
  console.log(data);

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
