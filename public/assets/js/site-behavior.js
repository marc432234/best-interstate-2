(function () {
  function closeQuotePopup(popup) {
    if (!popup || !popup.parentNode) {
      return;
    }

    popup.parentNode.removeChild(popup);
    document.removeEventListener("keydown", onQuotePopupKeydown);
    document.body.style.overflow = "";
  }

  function onQuotePopupKeydown(event) {
    if (event.key === "Escape") {
      closeQuotePopup(document.querySelector(".quote-popup-overlay"));
    }
  }

  function showQuotePopup(title, message, isError) {
    var existing = document.querySelector(".quote-popup-overlay");

    if (existing) {
      closeQuotePopup(existing);
    }

    var overlay = document.createElement("div");
    overlay.className = "quote-popup-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "quote-popup-title");
    overlay.style.position = "fixed";
    overlay.style.inset = "0";
    overlay.style.zIndex = "2147483647";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.padding = "20px";
    overlay.style.background = "rgba(5, 15, 35, 0.62)";

    var card = document.createElement("div");
    card.style.position = "relative";
    card.style.width = "100%";
    card.style.maxWidth = "460px";
    card.style.padding = "34px 28px 28px";
    card.style.borderRadius = "18px";
    card.style.background = "#ffffff";
    card.style.boxShadow = "0 24px 70px rgba(0, 0, 0, 0.28)";
    card.style.textAlign = "center";
    card.style.fontFamily = "Arial, Helvetica, sans-serif";

    var close = document.createElement("button");
    close.type = "button";
    close.setAttribute("aria-label", "Close message");
    close.textContent = "×";
    close.style.position = "absolute";
    close.style.top = "12px";
    close.style.right = "14px";
    close.style.border = "0";
    close.style.background = "transparent";
    close.style.color = "#6B7280";
    close.style.fontSize = "28px";
    close.style.lineHeight = "1";
    close.style.cursor = "pointer";

    var icon = document.createElement("div");
    icon.style.width = "62px";
    icon.style.height = "62px";
    icon.style.margin = "0 auto 18px";
    icon.style.borderRadius = "9999px";
    icon.style.display = "flex";
    icon.style.alignItems = "center";
    icon.style.justifyContent = "center";
    icon.style.background = isError ? "#FEE2E2" : "#E7F5EC";
    icon.style.color = isError ? "#B91C1C" : "#147D3C";
    icon.style.fontSize = "34px";
    icon.style.fontWeight = "700";
    icon.textContent = isError ? "!" : "✓";

    var heading = document.createElement("h2");
    heading.id = "quote-popup-title";
    heading.textContent = title;
    heading.style.margin = "0 0 10px";
    heading.style.color = isError ? "#B91C1C" : "#111822";
    heading.style.fontSize = "24px";
    heading.style.lineHeight = "1.25";

    var text = document.createElement("p");
    text.textContent = message;
    text.style.margin = "0 0 24px";
    text.style.color = "#4B5563";
    text.style.fontSize = "16px";
    text.style.lineHeight = "1.6";

    var button = document.createElement("button");
    button.type = "button";
    button.textContent = "Close";
    button.style.border = "0";
    button.style.borderRadius = "10px";
    button.style.padding = "12px 24px";
    button.style.background = "#0045B5";
    button.style.color = "#ffffff";
    button.style.fontSize = "15px";
    button.style.fontWeight = "700";
    button.style.cursor = "pointer";

    close.addEventListener("click", function () {
      closeQuotePopup(overlay);
    });

    button.addEventListener("click", function () {
      closeQuotePopup(overlay);
    });

    overlay.addEventListener("click", function (event) {
      if (event.target === overlay) {
        closeQuotePopup(overlay);
      }
    });

    document.addEventListener("keydown", onQuotePopupKeydown);
    document.body.style.overflow = "hidden";
    overlay.appendChild(card);
    card.appendChild(close);
    card.appendChild(icon);
    card.appendChild(heading);
    card.appendChild(text);
    card.appendChild(button);
    document.body.appendChild(overlay);
    button.focus();
  }

  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  function setDisplay(id, value) {
    var element = document.getElementById(id);

    if (element) {
      element.style.display = value;
    }
  }

  function setError(id, message) {
    var element = document.getElementById(id);

    if (!element) {
      return;
    }

    element.innerHTML = message;
    element.style.display = "block";
  }

  function hideError(id) {
    var element = document.getElementById(id);

    if (element) {
      element.style.display = "none";
    }
  }

  function focusField(id) {
    var element = document.getElementById(id);

    if (element) {
      element.focus();
    }
  }

  function applyHeaderState() {
    var navbarBrandImage = document.querySelector(".navbar-brand img");
    var navList = document.querySelector(".navbar-default .navbar-collapse .nav-list");
    var rightNavImage = document.querySelector(".navbar-default .rghtNav a img");
    var rightNavText = document.querySelector(".navbar-default .rghtNav .textSpan");
    var navbar = document.querySelector(".navbar-default");
    var navMobile = document.querySelector(".nav-mobile");
    var isMobile = window.innerWidth < 768;
    var isScrolled = window.scrollY > 100;

    if (!navbar) {
      return;
    }

    if (!isMobile) {
      if (navbarBrandImage) {
        navbarBrandImage.style.height = isScrolled ? "50px" : "82px";
      }
      if (navList) {
        navList.style.marginTop = "0";
      }
      if (rightNavImage) {
        rightNavImage.style.display = isScrolled ? "none" : "block";
      }
      if (rightNavText) {
        rightNavText.style.marginTop = "0";
      }
      navbar.style.minHeight = isScrolled ? "80px" : "96px";
      document.body.style.paddingTop = isScrolled ? "80px" : "96px";
      return;
    }

    if (navbarBrandImage) {
      navbarBrandImage.style.width = "auto";
      navbarBrandImage.style.height = isScrolled ? "48px" : "56px";
    }
    navbar.style.minHeight = isScrolled ? "82px" : "88px";
    document.body.style.paddingTop = isScrolled ? "82px" : "88px";

    if (navMobile) {
      navMobile.style.top = isScrolled ? "18px" : "18px";
    }
  }

  window.val = function val(str) {
    if (str === "apartment") {
      setDisplay("housedrp", "none");
      setDisplay("appdrp", "block");
    }

    if (str === "house") {
      setDisplay("housedrp", "block");
      setDisplay("appdrp", "none");
    }
  };

  window.validateForm = function validateForm() {
    var fromzipcode = document.getElementById("fromzipcode").value;
    var tozipcode = document.getElementById("tozipcode").value;
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var hs = document.getElementById("hs").value;
    var app = document.getElementById("app").value;
    var calender = document.getElementById("calender").value;
    var ph = /^([0-9-+]+)$/;

    if (/^[0-9]{5}(?:-[0-9]{4})?$/.test(fromzipcode)) {
      hideError("errfn");
    } else {
      focusField("fromzipcode");
      setError("errfn", "Invalid From Zip Code");
      return false;
    }

    if (/^[0-9]{5}(?:-[0-9]{4})?$/.test(tozipcode)) {
      hideError("errtozip");
    } else {
      focusField("tozipcode");
      setError("errtozip", "Invalid To Zip Code");
      return false;
    }

    if (firstname) {
      hideError("errfname");
    } else {
      focusField("firstname");
      setError("errfname", "Please Enter First Name");
      return false;
    }

    if (lastname) {
      hideError("errlname");
    } else {
      focusField("lastname");
      setError("errlname", "Please Enter Last Name");
      return false;
    }

    if (phone === "") {
      focusField("phone");
      setError("errph", "Please Enter Phone Number");
      return false;
    }

    if (!ph.test(phone) || phone.length !== 10) {
      focusField("phone");
      setError("errph", "Please Enter Valid Phone Number");
      return false;
    }

    hideError("errph");

    if (email) {
      hideError("erreml");
    } else {
      focusField("email");
      setError("erreml", "Please Enter Email");
      return false;
    }

    if (document.getElementById("house").checked === true && hs === "Move Size") {
      setError("errapp", "Please Select Moving Size");
      return false;
    }

    if (
      document.getElementById("apartment").checked === true &&
      app === "Move Size"
    ) {
      setError("errapp", "Please Select Moving Size");
      return false;
    }

    hideError("errapp");

    if (calender) {
      hideError("errcal");
      return true;
    }

    focusField("calender");
    setError("errcal", "Please Select Date");
    return false;
  };

  function quoteErrorContainer(field) {
    if (!field) {
      return null;
    }

    return field.closest(".relative") || field.parentElement;
  }

  function clearQuoteError(field) {
    var container = quoteErrorContainer(field);

    if (!container) {
      return;
    }

    var error = container.querySelector('[data-quote-error="true"]');

    if (error) {
      error.textContent = "";
    }
  }

  function showQuoteError(field, message) {
    var container = quoteErrorContainer(field);

    if (!container) {
      return;
    }

    var error = container.querySelector('[data-quote-error="true"]');

    if (!error) {
      error = document.createElement("span");
      error.setAttribute("data-quote-error", "true");
      error.style.position = "absolute";
      error.style.left = "0";
      error.style.bottom = "-24px";
      error.style.fontSize = "12px";
      error.style.fontWeight = "500";
      error.style.lineHeight = "1.4";
      error.style.color = "#dc2626";
      container.appendChild(error);
    }

    error.textContent = message;
  }

  function setQuoteCardSelected(card, selected) {
    if (!card) {
      return;
    }

    var radio = card.querySelector("div.flex.h-6.w-6");
    var dot = radio ? radio.querySelector("div.w-3.h-3") : null;

    if (selected) {
      card.style.backgroundColor = "#F0F7FF";
      card.style.borderColor = "#BFDBFE";
      card.style.boxShadow = "0 1px 2px 0 rgba(0, 0, 0, 0.05)";

      if (radio) {
        radio.style.borderColor = "#0045B5";
      }

      if (!dot && radio) {
        dot = document.createElement("div");
        dot.className = "w-3 h-3";
        dot.style.width = "12px";
        dot.style.height = "12px";
        dot.style.borderRadius = "9999px";
        dot.style.backgroundColor = "#0045B5";
        radio.appendChild(dot);
      }

      if (dot) {
        dot.style.display = "";
      }
    } else {
      card.style.backgroundColor = "#ffffff";
      card.style.borderColor = "#E5E7EB";
      card.style.boxShadow = "";

      if (radio) {
        radio.style.borderColor = "#D1D5DB";
      }

      if (dot) {
        dot.style.display = "none";
      }
    }
  }

  function setupExpressQuoteForm() {
    var form = document.getElementById("expressQuoteForm");

    if (!form) {
      return;
    }

    var houseIcon = form.querySelector('img[src*="house-icon.svg"]');
    var apartmentIcon = form.querySelector('img[src*="apartment-icon.svg"]');
    var houseCard =
      houseIcon && houseIcon.closest("div.cursor-pointer")
        ? houseIcon.closest("div.cursor-pointer")
        : null;
    var apartmentCard =
      apartmentIcon && apartmentIcon.closest("div.cursor-pointer")
        ? apartmentIcon.closest("div.cursor-pointer")
        : null;
    var houseSelect = document.getElementById("hs");
    var apartmentSelect = document.getElementById("app");
    var houseSelectWrapper = houseSelect ? houseSelect.parentElement : null;
    var apartmentSelectWrapper = apartmentSelect
      ? apartmentSelect.parentElement
      : null;
    var dateInput = document.getElementById("move-date");
    var dateButton = form.querySelector('button[aria-label="Open move date picker"]');
    var phoneInput = document.getElementById("phone");
    var moveType = "house";

    function formatPhoneNumber(value) {
      var digits = value.replace(/\D/g, "").slice(0, 10);

      if (digits.length <= 3) {
        return digits ? "(" + digits : "";
      }

      if (digits.length <= 6) {
        return "(" + digits.slice(0, 3) + ") " + digits.slice(3);
      }

      return (
        "(" +
        digits.slice(0, 3) +
        ") " +
        digits.slice(3, 6) +
        "-" +
        digits.slice(6)
      );
    }

    if (phoneInput) {
      phoneInput.placeholder = "(000) 000-0000";
      phoneInput.setAttribute("inputmode", "numeric");

      phoneInput.addEventListener("input", function () {
        var cursor = phoneInput.selectionStart || 0;
        var digitsBeforeCursor = phoneInput.value
          .slice(0, cursor)
          .replace(/\D/g, "").length;
        var formatted = formatPhoneNumber(phoneInput.value);
        var nextCursor = 0;
        var digitsSeen = 0;

        while (nextCursor < formatted.length && digitsSeen < digitsBeforeCursor) {
          if (/\d/.test(formatted.charAt(nextCursor))) {
            digitsSeen += 1;
          }
          nextCursor += 1;
        }

        phoneInput.value = formatted;
        phoneInput.setSelectionRange(nextCursor, nextCursor);
      });
    }

    ["fromzipcode", "tozipcode"].forEach(function (id) {
      var zipInput = document.getElementById(id);

      if (!zipInput) {
        return;
      }

      zipInput.setAttribute("inputmode", "numeric");
      zipInput.setAttribute("maxlength", "5");

      zipInput.addEventListener("input", function () {
        var cursor = zipInput.selectionStart || 0;
        var digitsBeforeCursor = zipInput.value
          .slice(0, cursor)
          .replace(/\D/g, "").length;
        var digits = zipInput.value.replace(/\D/g, "").slice(0, 5);
        var nextCursor = 0;
        var digitsSeen = 0;

        while (nextCursor < digits.length && digitsSeen < digitsBeforeCursor) {
          if (/\d/.test(digits.charAt(nextCursor))) {
            digitsSeen += 1;
          }
          nextCursor += 1;
        }

        zipInput.value = digits;
        zipInput.setSelectionRange(nextCursor, nextCursor);
      });
    });

    function applyMoveType(type) {
      moveType = type;
      setQuoteCardSelected(houseCard, type === "house");
      setQuoteCardSelected(apartmentCard, type === "apartment");

      if (houseSelectWrapper) {
        houseSelectWrapper.style.display = type === "house" ? "block" : "none";
      }

      if (apartmentSelectWrapper) {
        apartmentSelectWrapper.style.display =
          type === "apartment" ? "block" : "none";
      }

      if (houseSelect) {
        clearQuoteError(houseSelect);
      }

      if (apartmentSelect) {
        clearQuoteError(apartmentSelect);
      }
    }

    if (houseCard) {
      houseCard.addEventListener("click", function () {
        applyMoveType("house");
      });
    }

    if (apartmentCard) {
      apartmentCard.addEventListener("click", function () {
        applyMoveType("apartment");
      });
    }

    applyMoveType("house");

    if (dateInput) {
      var now = new Date();
      var today =
        now.getFullYear() +
        "-" +
        String(now.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(now.getDate()).padStart(2, "0");

      if (!dateInput.min || dateInput.min < today) {
        dateInput.min = today;
      }
    }

    if (dateButton && dateInput) {
      dateButton.addEventListener("click", function () {
        if (typeof dateInput.showPicker === "function") {
          dateInput.showPicker();
        } else {
          dateInput.focus();
        }
      });
    }

    var fieldsToClear = [
      "fromzipcode",
      "tozipcode",
      "firstname",
      "lastname",
      "phone",
      "email",
      "hs",
      "app",
      "move-date",
    ];

    fieldsToClear.forEach(function (id) {
      var field = document.getElementById(id);

      if (!field) {
        return;
      }

      field.addEventListener("input", function () {
        clearQuoteError(field);
      });

      field.addEventListener("change", function () {
        clearQuoteError(field);
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (form.dataset.submitting === "true") {
        return;
      }

      fieldsToClear.forEach(function (id) {
        clearQuoteError(document.getElementById(id));
      });

      var fromZip = document.getElementById("fromzipcode");
      var toZip = document.getElementById("tozipcode");
      var firstName = document.getElementById("firstname");
      var lastName = document.getElementById("lastname");
      var phone = document.getElementById("phone");
      var email = document.getElementById("email");
      var firstInvalid = null;
      var zipPattern = /^[0-9]{5}$/;

      function addError(field, message) {
        if (!field) {
          return;
        }

        showQuoteError(field, message);

        if (!firstInvalid) {
          firstInvalid = field;
        }
      }

      if (!fromZip || !zipPattern.test(fromZip.value.trim())) {
        addError(fromZip, "Invalid From Zip Code");
      }

      if (!toZip || !zipPattern.test(toZip.value.trim())) {
        addError(toZip, "Invalid To Zip Code");
      }

      if (!firstName || !firstName.value.trim()) {
        addError(firstName, "Please Enter First Name");
      }

      if (!lastName || !lastName.value.trim()) {
        addError(lastName, "Please Enter Last Name");
      }

      var phoneValue = phone ? phone.value.trim() : "";
      var phoneDigits = phoneValue.replace(/\D/g, "");

      if (!phoneValue) {
        addError(phone, "Please Enter Phone Number");
      } else if (phoneDigits.length !== 10) {
        addError(phone, "Please Enter Valid Phone Number");
      }

      if (!email || !email.value.trim()) {
        addError(email, "Please Enter Email");
      }

      if (!dateInput || !dateInput.value) {
        addError(dateInput, "Please Select Move Date");
      }

      var moveSize =
        moveType === "house"
          ? houseSelect
            ? houseSelect.value
            : ""
          : apartmentSelect
            ? apartmentSelect.value
            : "";

      if (moveType === "house" && (!moveSize || moveSize === "Move Size")) {
        addError(houseSelect, "Please Select Moving Size");
      }

      if (moveSize === "Move Size") {
        moveSize = "";
      }

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      var submitButton = form.querySelector('button[type="submit"]');
      var payload = {
        source: "Express Quote",
        page_url: window.location.href,
        from_zip_code: fromZip.value.trim(),
        to_zip_code: toZip.value.trim(),
        first_name: firstName.value.trim(),
        last_name: lastName.value.trim(),
        phone: phoneValue,
        email: email.value.trim(),
        move_type: moveType,
        move_size: moveSize,
        move_date: dateInput && dateInput.value ? dateInput.value : "",
      };

      form.dataset.submitting = "true";

      if (submitButton) {
        submitButton.disabled = true;
      }

      fetch("/api/quote/", {
        method: "POST",
        cache: "no-store",
        body: new URLSearchParams(payload),
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Webhook request failed");
          }
          form.reset();
          applyMoveType("house");
          showQuotePopup(
            "Thank You",
            "Thank you for your inquiry. We will contact you soon.",
            false,
          );
        })
        .catch(function () {
          showQuotePopup(
            "Submission Failed",
            "Sorry, we could not submit your request. Please try again.",
            true,
          );
        })
        .finally(function () {
          form.dataset.submitting = "false";

          if (submitButton) {
            submitButton.disabled = false;
          }
        });
    });
  }

  function setupMovingCalculator() {
    var road = document.querySelector(".moving-calculator-road");

    if (!road || road.dataset.calcReady === "true") {
      return;
    }

    road.dataset.calcReady = "true";

    var page = road.closest(".interior-page") || document;
    var homeOptions = {
      studio: { baseCost: 1400, crew: 2, boxes: 18, truck: "16-foot truck" },
      "one-bedroom": { baseCost: 2200, crew: 2, boxes: 34, truck: "20-foot truck" },
      "two-bedroom": {
        baseCost: 3600,
        crew: 3,
        boxes: 58,
        truck: "22 to 24-foot truck",
      },
      "three-bedroom": { baseCost: 5400, crew: 4, boxes: 82, truck: "26-foot truck" },
      "four-bedroom": { baseCost: 7600, crew: 5, boxes: 118, truck: "26-foot truck" },
    };
    var distanceOptions = {
      nearby: { multiplier: 0.92, days: "1 to 2 days", progress: 18 },
      regional: { multiplier: 1.14, days: "2 to 4 days", progress: 36 },
      "long-haul": { multiplier: 1.36, days: "4 to 6 days", progress: 60 },
      "cross-country": { multiplier: 1.65, days: "6 to 9 days", progress: 82 },
      extended: { multiplier: 1.92, days: "8 to 12 days", progress: 96 },
    };
    var accessOptions = {
      easy: { surcharge: 0 },
      stairs: { surcharge: 340 },
      elevator: { surcharge: 220 },
      both: { surcharge: 520 },
    };
    var seasonOptions = {
      flexible: { multiplier: 1 },
      standard: { multiplier: 1.05 },
      peak: { multiplier: 1.14 },
      rush: { multiplier: 1.1 },
    };

    function findSelectByOption(value) {
      var selects = page.querySelectorAll("select");
      var i;

      for (i = 0; i < selects.length; i += 1) {
        if (selects[i].querySelector('option[value="' + value + '"]')) {
          return selects[i];
        }
      }

      return null;
    }

    function findValueByLabel(label) {
      var paragraphs = page.querySelectorAll("p");
      var i;

      for (i = 0; i < paragraphs.length; i += 1) {
        if (paragraphs[i].textContent.trim() !== label) {
          continue;
        }

        var next = paragraphs[i].nextElementSibling;

        if (next && next.tagName === "P") {
          return next;
        }
      }

      return null;
    }

    function formatCurrency(value) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(value);
    }

    function setText(element, value) {
      if (element) {
        element.textContent = value;
      }
    }

    function setRangeValue(range, value) {
      if (!range || !range.parentElement) {
        return;
      }

      var labels = range.parentElement.querySelectorAll("span");

      if (labels.length >= 2) {
        labels[labels.length - 2].textContent = value;
      }
    }

    var homeSelect = findSelectByOption("studio");
    var distanceSelect = findSelectByOption("nearby");
    var accessSelect = findSelectByOption("elevator");
    var seasonSelect = findSelectByOption("rush");
    var rangeInputs = page.querySelectorAll('input[type="range"]');
    var storageRange = rangeInputs[0] || null;
    var autoRange = rangeInputs[1] || null;
    var specialtyRange = rangeInputs[2] || null;
    var checkboxInputs = page.querySelectorAll('input[type="checkbox"]');
    var packingCheckbox = checkboxInputs[0] || null;
    var protectionCheckbox = checkboxInputs[1] || null;
    var budgetOutput = findValueByLabel("Budget Window");
    var transitOutput = findValueByLabel("Transit Time");
    var crewOutput = findValueByLabel("Crew Recommendation");
    var asideTransit = findValueByLabel("Transit");
    var asideCrew = findValueByLabel("Crew");
    var asideTruck = findValueByLabel("Truck");
    var asideBoxes = findValueByLabel("Boxes");
    var truckMatch = findValueByLabel("Truck Match");
    var packingPlan = findValueByLabel("Packing Supply Plan");
    var storageAddon = findValueByLabel("Storage Add-on");
    var autoShipping = findValueByLabel("Auto Shipping");
    var truck = road.querySelector(".moving-calculator-truck");
    var liveEstimate = null;
    var aside = page.querySelector("aside");

    if (aside) {
      var asideParagraphs = aside.querySelectorAll("p");
      var i;

      for (i = 0; i < asideParagraphs.length; i += 1) {
        if (
          asideParagraphs[i].querySelector("span") &&
          asideParagraphs[i].textContent.indexOf(" to ") !== -1
        ) {
          liveEstimate = asideParagraphs[i];
          break;
        }
      }
    }

    var liveDividerClass =
      liveEstimate && liveEstimate.querySelector("span")
        ? liveEstimate.querySelector("span").className
        : "";

    function render() {
      var home =
        homeOptions[homeSelect ? homeSelect.value : "two-bedroom"] ||
        homeOptions["two-bedroom"];
      var distance =
        distanceOptions[distanceSelect ? distanceSelect.value : "long-haul"] ||
        distanceOptions["long-haul"];
      var access =
        accessOptions[accessSelect ? accessSelect.value : "easy"] ||
        accessOptions.easy;
      var season =
        seasonOptions[seasonSelect ? seasonSelect.value : "standard"] ||
        seasonOptions.standard;
      var storageWeeks = storageRange ? Number(storageRange.value) : 0;
      var autoVehicles = autoRange ? Number(autoRange.value) : 0;
      var specialtyItems = specialtyRange ? Number(specialtyRange.value) : 0;
      var includesPacking = packingCheckbox ? packingCheckbox.checked : false;
      var includesProtection = protectionCheckbox
        ? protectionCheckbox.checked
        : false;
      var cost = home.baseCost * distance.multiplier;

      if (includesPacking) {
        cost += home.baseCost * 0.18;
      }

      cost += access.surcharge;
      cost += 140 * storageWeeks;
      cost += 1050 * autoVehicles;
      cost += 295 * specialtyItems;

      if (includesProtection) {
        cost += home.baseCost * 0.08;
      }

      cost *= season.multiplier;

      var low = 10 * Math.round((0.93 * cost) / 10);
      var high = 10 * Math.round((1.11 * cost) / 10);
      var crewSize = Math.min(home.crew + (includesPacking ? 1 : 0), 6);
      var boxes = home.boxes + (includesPacking ? 10 : 0);
      var storageCost = 140 * storageWeeks;
      var autoCost = 1050 * autoVehicles;

      setText(
        budgetOutput,
        formatCurrency(low) + " to " + formatCurrency(high)
      );
      setText(transitOutput, distance.days);
      setText(crewOutput, crewSize + " movers");
      setText(asideTransit, distance.days);
      setText(asideCrew, crewSize + " movers");
      setText(asideTruck, home.truck);
      setText(asideBoxes, "~" + boxes);
      setText(truckMatch, home.truck);
      setText(packingPlan, "~" + boxes + " boxes");
      setText(storageAddon, formatCurrency(storageCost));
      setText(autoShipping, formatCurrency(autoCost));
      setRangeValue(storageRange, storageWeeks + " weeks");
      setRangeValue(autoRange, autoVehicles + " vehicles");
      setRangeValue(specialtyRange, specialtyItems + " items");

      if (truck) {
        truck.style.left = "calc(" + distance.progress + "% - 38px)";
      }

      if (liveEstimate) {
        liveEstimate.innerHTML =
          formatCurrency(low) +
          '<span class="' +
          liveDividerClass +
          '"> to </span>' +
          formatCurrency(high);
      }
    }

    [
      homeSelect,
      distanceSelect,
      accessSelect,
      seasonSelect,
      storageRange,
      autoRange,
      specialtyRange,
      packingCheckbox,
      protectionCheckbox,
    ].forEach(function (input) {
      if (!input) {
        return;
      }

      input.addEventListener("input", render);
      input.addEventListener("change", render);
    });

    render();
  }

  var movingCalculatorQueued = false;

  function queueMovingCalculatorSetup() {
    if (movingCalculatorQueued) {
      return;
    }

    movingCalculatorQueued = true;
    window.setTimeout(function () {
      movingCalculatorQueued = false;
      setupMovingCalculator();
    }, 50);
  }

  onReady(function () {
    setupExpressQuoteForm();
    setupMovingCalculator();

    if (window.MutationObserver && document.body) {
      new MutationObserver(queueMovingCalculatorSetup).observe(
        document.body,
        { childList: true, subtree: true }
      );
    }

    var quoteForm = document.querySelector(".rghtBannerfrm form");
    var selectorInputs = document.querySelectorAll('input[name="selector"]');
    var navToggle = document.getElementById("nav-toggle");
    var navbarCollapse = document.querySelector(".navbar-collapse");

    if (!navbarCollapse || navbarCollapse.dataset.reactNav !== "true") {
      if (navToggle) {
        navToggle.addEventListener("click", function (event) {
          event.preventDefault();
          if (!navbarCollapse) {
            return;
          }

          var isOpen = navbarCollapse.classList.contains("in");

          if (isOpen) {
            navbarCollapse.style.display = "";
            navbarCollapse.classList.remove("in");
          } else {
            navbarCollapse.style.display = "block";
            navbarCollapse.classList.add("in");
          }

          this.classList.toggle("active");
        });
      }

      document.querySelectorAll(".ForMob").forEach(function (trigger) {
        trigger.addEventListener("click", function () {
          if (window.innerWidth < 1181) {
            var item = trigger.parentElement;
            var dropdown = item ? item.querySelector(".nav-dropdown") : null;
            if (dropdown) {
              dropdown.style.display = dropdown.style.display === "block" ? "" : "block";
            }
          }
        });
      });

      document.querySelectorAll(".navbar-collapse a").forEach(function (link) {
        link.addEventListener("click", function () {
          if (window.innerWidth < 768 && !this.classList.contains("ForMob")) {
            if (navbarCollapse) {
              navbarCollapse.style.display = "";
              navbarCollapse.classList.remove("in");
            }
            if (navToggle) {
              navToggle.classList.remove("active");
            }
          }
        });
      });
    }

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 768) {
        if (navbarCollapse) {
          navbarCollapse.style.display = "";
          navbarCollapse.classList.remove("in");
        }
        if (navToggle) {
          navToggle.classList.remove("active");
        }
        document.querySelectorAll(".nav-dropdown").forEach(function (dropdown) {
          dropdown.removeAttribute("style");
        });
      }
    });

    window.addEventListener("scroll", applyHeaderState, { passive: true });
    window.addEventListener("resize", applyHeaderState);
    applyHeaderState();

    selectorInputs.forEach(function (input) {
      input.addEventListener("change", function () {
        window.val(this.value);
      });
    });

    if (quoteForm) {
      quoteForm.addEventListener("submit", function (event) {
        if (!window.validateForm()) {
          event.preventDefault();
        }
      });
    }

    var checkedSelector = document.querySelector('input[name="selector"]:checked');
    if (checkedSelector) {
      window.val(checkedSelector.value);
    }
  });
})();
