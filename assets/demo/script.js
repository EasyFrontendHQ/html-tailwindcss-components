const colorSchemes = [
  { label: "Light", value: "light", style: 'background-color: #fff' },
  { label: "Gray", value: "gray", style: 'background-color: #d8e2ef' },
  { label: "Dark Gray", value: "dark-gray", style: 'background-color: #5e6e82' },
  { label: "Dark", value: "dark", style: 'background-color: #000' },
];

const primaryColorSchemes = [
  { label: "Primary", value: "primary", style: 'background-color: rgb(0, 122, 255);' },
  { label: "Orange", value: "orange", style: 'background-color: rgb(245, 158, 11);' },
  { label: "Red", value: "red", style: 'background-color: rgb(178, 39, 39);' },
];

const bootstrapHeadInfo = [
  //   { url: "../../assets/packages/bootstrap/bootstrap.min.css", type: "style" },
  { url: "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css", type: "style" },
  //   { url: "../../assets/packages/bootstrap/bootstrap.bundle.min.js", type: "script" },
  { url: "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js", type: "script" },
];
const tailwindHeadInfo = [
  { url: "../../assets/packages/tailwind/tailwind.css", type: 'style' },
];
const headInfo = [
  // demo color scheme (REQUIRED)
  { url: "https://fonts.googleapis.com/css2?family=DM+Serif+Display&amp;display=swap", type: "style" },
  { url: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap", type: "style" },
  { url: "../../assets/demo/style.css", type: "style" },

  { url: "../../assets/packages/jquery-3.6.0.min.js", type: "script" },
  { url: "https://fonts.googleapis.com/css2?family=Roboto&display=swap", type: "style" },
  { url: "../../assets/packages/fontawesome/all.min.css", type: "style" },
  // {url: '../../assets/packages/owl-carousel/owl.carousel.min.js', type: 'script'},
];

document.addEventListener("DOMContentLoaded", function () {
  var body = document.getElementsByTagName("body")[0];
  var topNavbar = document.createElement("div");
  var topNavbarLeft = document.createElement("div");
  var topNavbarRight = document.createElement("div");
  topNavbar.classList = "demo-top-navbar";


  var colorSchemeContent = document.createElement("div");
  colorSchemeContent.classList = "ezy-color-scheme-group";
  colorSchemes.forEach(function (item) {
    var button = document.createElement("button");
    button.title = item.label;
    button.style = item.style;
    button.onclick = function () {
      changeColorScheme(item.value);
    };
    colorSchemeContent.append(button);
  });
  topNavbarLeft.append(colorSchemeContent);

  // var primaryColorSchemeContent = document.createElement("div");
  // primaryColorSchemeContent.classList = "ezy-primary-color-scheme-group";
  // primaryColorSchemes.forEach(function (item) {
  //   var button = document.createElement("button");
  //   button.title = item.label;
  //   button.style = item.style;
  //   button.onclick = function () {
  //     changePrimaryColorScheme(item.value);
  //   };
  //   primaryColorSchemeContent.append(button);
  // });
  // topNavbarLeft.append(primaryColorSchemeContent);

  // var backButton = document.createElement("a");
  // backButton.innerHTML = "Back";
  // backButton.href = "../../";
  // backButton.classList = "back-button";

  var typeChangeButton = document.createElement("button");
  typeChangeButton.title = "Check Typo";
  typeChangeButton.innerHTML = "Aa";
  typeChangeButton.onclick = function () {
    if (document.body.classList.contains("ezy-checktypo")) {
      document.body.classList.remove("ezy-checktypo");
    } else {
      document.body.classList.add("ezy-checktypo");
    }
  };

  topNavbarRight.append(typeChangeButton);
  // topNavbarRight.append(backButton);

  topNavbar.append(topNavbarLeft);
  topNavbar.append(topNavbarRight);
  body.append(topNavbar);

  changeColorScheme(window.localStorage.getItem("colorScheme") || "light");
  changePrimaryColorScheme(window.localStorage.getItem("primaryColorScheme") || "primary");

  // $elements = document.querySelectorAll('/(ezy__[a-z]*[0-9]*)([\s\"])/');
  var elements = document.querySelectorAll('[class^="ezy"]');
  var existingElements = [];

  elements.forEach(function (e) {
    if (typeof e.className === "string") {
      var matchClasses = e.className.match(/(ezy__[a-z]*[0-9]*)(\s|\"|$)/i);

      if (matchClasses && matchClasses[0] && !existingElements.includes(matchClasses[0])) {
        var optionCardId = matchClasses[0];
        var componentName = optionCardId.replace("ezy__", ``);
        var componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
        existingElements.push(optionCardId);

        var optionCard = document.createElement("div");
        optionCard.classList = "ezy-option-card";
        optionCard.innerHTML = `<span>ID: <b>${optionCardId}</b></span><span>Component Name: <b>${componentName}</b></span>`;

        e.parentNode.insertBefore(optionCard, e);
      }
    }
  });
});

function appendHeadInfo(frame) {
  if (frame === "bootstrap") {
    bootstrapHeadInfo.forEach(function (item) {
      _addHeadInfo(item);
    });
  } else if (frame === "tailwind") {
    tailwindHeadInfo.forEach(function (item) {
      _addHeadInfo(item);
    });
  }

  headInfo.forEach(function (item) {
    _addHeadInfo(item);
  });
}

function _addHeadInfo(item) {
  var head = document.getElementsByTagName("head")[0];

  var element;
  if (item.type === "script") {
    element = document.createElement("script");
    element.src = item.url;
  } else if (item.type === "style") {
    element = document.createElement("link");
    element.href = item.url;
    element.rel = "stylesheet";
  }

  element && head.append(element);
}

function changeColorScheme(color) {
  document.body.classList.remove("light", "gray", "dark", "dark-gray");

  switch (color) {
    case "light":
      document.body.classList.add("light");
      window.localStorage.setItem("colorScheme", "light");
      break;
    case "gray":
      document.body.classList.add("gray");
      window.localStorage.setItem("colorScheme", "gray");
      break;
    case "dark":
      document.body.classList.add("dark");
      window.localStorage.setItem("colorScheme", "dark");
      break;
    case "dark-gray":
      document.body.classList.add("dark-gray");
      window.localStorage.setItem("colorScheme", "dark-gray");
      break;
    default:
      break;
  }
}

function changePrimaryColorScheme(color) {
  document.body.classList.remove("ezy-primary", "ezy-orange", "ezy-red");

  switch (color) {
    case "primary":
      document.body.classList.add("ezy-primary");
      window.localStorage.setItem("primaryColorScheme", "primary");
      break;
    case "orange":
      document.body.classList.add("ezy-orange");
      window.localStorage.setItem("primaryColorScheme", "orange");
      break;
    case "red":
      document.body.classList.add("ezy-red");
      window.localStorage.setItem("primaryColorScheme", "red");
      break;
    default:
      break;
  }
}

var checkReady = function (callback) {
  if (window.jQuery) {
    callback(jQuery);
  } else {
    window.setTimeout(function () {
      checkReady(callback);
    }, 1000);
  }
};
