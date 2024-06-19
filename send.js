$("#basket_label").on("click", function (e) {
  e.preventDefault();

  console.log(basketArr);

  $.ajax({
    type: "POST",
    url: "send.php",
    data: { data: JSON.stringify(basketArr) },
    success: function (data) {
      console.log(data);
    },
    error: function (error) {
      console.log(error);
    },
  });
});
