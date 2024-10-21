import $ from "jquery";

const sendTelegram = async (message) => {
  $.ajax({
    type: "POST",
    url: window.location.href + "send.php",
    data: { message },
    success: (data) => Promise.resolve(data),
    error: (e) => Promise.reject(e.toString()),
  });
};

export { sendTelegram };
