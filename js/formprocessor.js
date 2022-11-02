function parse_query_string(query) {
  var vars = query.split("&");
  var query_string = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    var key = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair[1]);
    // If first entry with this name
    if (typeof query_string[key] === "undefined") {
      query_string[key] = decodeURIComponent(value);
      // If second entry with this name
    } else if (typeof query_string[key] === "string") {
      var arr = [query_string[key], decodeURIComponent(value)];
      query_string[key] = arr;
      // If third or later entry with this name
    } else {
      query_string[key].push(decodeURIComponent(value));
    }
  }
  return query_string;
}

var query = window.location.search.substring(1);
var qs = parse_query_string(query);
var localStorage = window.localStorage;
if (qs.utm_source) localStorage.utm_source = qs.utm_source;
if (qs.utm_source) localStorage.utm_source = qs.utm_source;
if (qs.utm_medium) localStorage.utm_medium = qs.utm_medium;
if (qs.utm_campaign) localStorage.utm_campaign = qs.utm_campaign;
if (qs.utm_campaign_name) localStorage.utm_campaign_name = qs.utm_campaign_name;
if (qs.utm_source) localStorage.utm_term = qs.utm_term;
if (qs.utm_placement) localStorage.utm_placement = qs.utm_placement;
if (qs.utm_device) localStorage.utm_device = qs.utm_device;
if (qs.utm_region_name) localStorage.utm_region_name = qs.utm_region_name;
if (qs.yclid) localStorage.yclid = qs.yclid;

function getStoredItem(item) {
  if (
    !localStorage.getItem("lpg3746_" + item) &&
    localStorage.getItem("lpg3746_" + item) != "false"
  )
    return false;
  else return localStorage.getItem("lpg3746_" + item);
}
function setStoredItem(item, value) {
  if (value == null || value == "" || value == undefined) return false;
  else return localStorage.setItem("lpg3746_" + item, value);
}

function getField(name, array) {
  for (var i = array.length - 1; i >= 0; i--) {
    if (array[i].name == name) {
      return array[i].value;
    }
  }
  return false;
}

$(document).ready(function () {
  var nameReplacementEl = document.getElementsByClassName("thanks-name");
  var cityReplacementEl = document.getElementsByClassName("thanks-city");
  if (nameReplacementEl !== null) {
    if (getStoredItem("name")) {
      nameReplacementEl.innerText = getStoredItem("name") + ", ";
    } else {
      nameReplacementEl.innerText = "Уважаемый клиент, ";
    }
  }
  if (cityReplacementEl !== null) {
    if (getStoredItem("city")) {
      cityReplacementEl.innerText = getStoredItem("city") + ", ";
    } else {
      cityReplacementEl.innerText = "Не указано, ";
    }
  }

  //ValidationForm
  function validation(form) {
    let valOK = true;
    let formComponents = form.children;
    for (let i = 0; i < formComponents.length; i++) {
      if (formComponents[i].classList.contains("form__field")) {
        let formInputs = formComponents[i].children;
        for (let j = 0; j < formInputs.length; j++) {
          let activeInput = formInputs[j];
          if (activeInput.classList.contains("form__input-phone")) {
            let valueInput = activeInput.value;
            let numbers = [
              900, 901, 902, 903, 904, 905, 906, 907, 908, 909, 910, 911, 912,
              913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925,
              926, 927, 928, 929, 930, 931, 932, 933, 934, 935, 936, 937, 938,
              939, 940, 941, 942, 943, 944, 945, 946, 947, 948, 949, 950, 951,
              952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964,
              965, 966, 967, 968, 969, 970, 971, 972, 973, 974, 975, 976, 977,
              978, 979, 980, 981, 982, 983, 984, 985, 986, 987, 988, 989, 990,
              991, 992, 993, 994, 995, 996, 997, 998, 999,
            ];
            let inputCode = valueInput.substring(3, 6);
            contains(numbers, inputCode);
            function contains(numbers, inputCode) {
              let d = 0;
              for (let o = 0; o < numbers.length; o++) {
                if (d == 0) {
                  if (numbers[o] != inputCode) {
                    valOK = false;
                    activeInput.classList.add("validate");
                  } else {
                    if (activeInput.value.includes("_")) {
                      valOK = false;
                      activeInput.classList.add("validate");
                    } else {
                      activeInput.classList.remove("validate");
                      d = 5;
                      valOK = true;
                    }
                  }
                }
              }
            }
          }
          if (activeInput.classList.contains("form__input-email")) {
            let reg =
              /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if (reg.test(activeInput.value) == false) {
              valOK = false;
              activeInput.classList.add("validate");
            } else {
              activeInput.classList.remove("validate");
            }
          }
          if (activeInput.classList.contains("form__input-name")) {
            if (activeInput.value == "") {
              valOK = false;
              activeInput.classList.add("validate");
            } else {
              activeInput.classList.remove("validate");
            }
          }
          if (activeInput.classList.contains("form__input-city")) {
            if (activeInput.value == "") {
              valOK = false;
              activeInput.classList.add("validate");
            } else {
              activeInput.classList.remove("validate");
            }
          }
        }
      }
      /* if (formComponents[i].classList.contains('form__checkbox')) {
			let formCheckboxes = formComponents[i].children;
			for (let j = 0; j < formCheckboxes.length; j++) {
			  if (formCheckboxes[j].classList.contains('custom-checkbox')) {
				 if (formCheckboxes[j].checked) {
					console.log('OK');
				 }
				 else {
					valOK = false;
					formCheckboxes[j].classList.add('validate');
					return valOK;
				 }
			  }
			}
		 } */
    }
    return valOK;
  }

  // Form Process
  $(document).on("submit", "form", function (event) {
    event.preventDefault();
    var submitedFrom = $(this);
    let valOK = validation(submitedFrom[0]);

    if (valOK == true) {
      var data = submitedFrom.serializeArray();

      var formData = new FormData();
      var preloader = submitedFrom.find("div.preload__box");
      if (preloader == undefined) {
        preloader = false;
      }

      setStoredItem("name", getField("name", data));
      if (getField("city", data)) setStoredItem("city", getField("city", data));

      if (
        !getField("name", data) &&
        getStoredItem("name") != "false" &&
        getStoredItem("name")
      ) {
        data.push({ name: "name", value: getStoredItem("name") });
      }
      var cityInserted = false;
      if (
        !getField("city", data) &&
        getStoredItem("city") != "false" &&
        getStoredItem("city")
      ) {
        cityInserted = true;
        data.push({ name: "city", value: getStoredItem("city") });
      }

      if (
        localStorage.utm_source !== undefined &&
        localStorage.utm_source !== ""
      )
        data.push({ name: "utm_source", value: localStorage.utm_source });

      if (
        localStorage.utm_medium !== undefined &&
        localStorage.utm_medium !== ""
      )
        data.push({ name: "utm_medium", value: localStorage.utm_medium });

      if (
        localStorage.utm_campaign !== undefined &&
        localStorage.utm_campaign !== ""
      )
        data.push({ name: "utm_campaign", value: localStorage.utm_campaign });

      if (
        localStorage.utm_campaign_name !== undefined &&
        localStorage.utm_campaign_name !== ""
      )
        data.push({
          name: "utm_campaign_name",
          value: localStorage.utm_campaign_name,
        });

      if (localStorage.utm_term !== undefined && localStorage.utm_term !== "")
        data.push({ name: "utm_term", value: localStorage.utm_term });

      if (
        localStorage.utm_content !== undefined &&
        localStorage.utm_content !== ""
      )
        data.push({ name: "utm_content", value: localStorage.utm_content });

      if (
        localStorage.utm_placement !== undefined &&
        localStorage.utm_placement !== ""
      )
        data.push({ name: "utm_placement", value: localStorage.utm_placement });

      if (
        localStorage.utm_device !== undefined &&
        localStorage.utm_device !== ""
      )
        data.push({ name: "utm_device", value: localStorage.utm_device });

      if (
        localStorage.utm_region_name !== undefined &&
        localStorage.utm_region_name !== ""
      )
        data.push({
          name: "utm_region_name",
          value: localStorage.utm_region_name,
        });

      if (localStorage.yclid !== undefined && localStorage.yclid !== "")
        data.push({ name: "yclid", value: localStorage.yclid });

      var x = new Date();
      data.push({ name: "timezone", value: (-1 * x.getTimezoneOffset()) / 60 });

      // clicked button
      if ($.fancybox) {
        var fancy = $.fancybox.getInstance();
        if (fancy) {
          var title = fancy.current.opts.$orig[0].getAttribute("data-bttitle");
          data.push({ name: "bttitle", value: title });
        }
      }

      for (var i = data.length - 1; i >= 0; i--) {
        formData.append(data[i].name, data[i].value);
      }

      $.ajax({
        type: "POST",
        url: "php/formProcessor.php",
        data: formData,
        processData: false,
        contentType: false,
        dataType: "json",
        beforeSend: function (data) {
         console.log(data);
        },
        success: function (data) {
          if (data == 1) {
            if (submitedFrom[0].classList.contains("end-form")) {
              window.location.href = "thanks-two.html";
            } else {
              window.location.href = "thanks.html";
            }
          } else {
            alert("Something was wrong. Please, contact administrator.");
            if (preloader) {
              preloader.hide();
            }
          }
        },
      });
      return false;
    }
  });

  if (document.getElementById("thanksNameModal") != undefined) {
    $("#formCaller").trigger("click");
    if (getStoredItem("city") && getStoredItem("city") != "false")
      document.getElementById("city").value = getStoredItem("city").trim();

    if (getStoredItem("name") && getStoredItem("name") != "false") {
      var thankNameText = $("#thanksNameModal").text();
      $("#thanksNameModal").text(
        getStoredItem("name").trim() + ", " + thankNameText.toLowerCase()
      );
      $("#thanksName").text(getStoredItem("name").trim() + ",");
      document.title =
        "" + getStoredItem("name").trim() + ", спасибо! Ваша заявка принята";
    } else {
      $("#thanksNameModal").text("Спасибо!");
      $("#thanksName").text("Наши");
    }
  }
});
