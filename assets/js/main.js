/* initwaza.sh — theme toggle + boot sequence */
(function () {
  "use strict";

  /* ---- theme ---- */
  var root = document.documentElement;
  var stored = null;
  try { stored = localStorage.getItem("theme"); } catch (e) {}
  if (stored === "light") root.setAttribute("data-theme", "light");

  var btn = document.getElementById("theme-toggle");
  if (btn) {
    btn.addEventListener("click", function () {
      var light = root.getAttribute("data-theme") === "light";
      if (light) root.removeAttribute("data-theme");
      else root.setAttribute("data-theme", "light");
      try { localStorage.setItem("theme", light ? "dark" : "light"); } catch (e) {}
    });
  }

  /* ---- boot sequence (homepage only, first visit per session) ---- */
  var boot = document.getElementById("boot");
  var tty = document.getElementById("tty");
  if (!boot || !tty) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var seen = false;
  try { seen = sessionStorage.getItem("booted") === "1"; } catch (e) {}
  if (reduced || seen) return;

  var lines = [
    "initwaza.sh v1.0 — bringing system up",
    "[ <span class=\"ok\">OK</span> ] mounted /home/warren",
    "[ <span class=\"ok\">OK</span> ] started azure-sovereign-cloud.service",
    "[ <span class=\"ok\">OK</span> ] started interests.target (local-ai, making, klipper)",
    "[ <span class=\"ok\">OK</span> ] reached target multi-user.target",
    "&nbsp;"
  ];

  tty.style.display = "none";
  var i = 0;
  (function next() {
    if (i < lines.length) {
      var p = document.createElement("p");
      p.style.margin = "0";
      p.innerHTML = lines[i++];
      boot.appendChild(p);
      setTimeout(next, 140);
    } else {
      tty.style.display = "";
      try { sessionStorage.setItem("booted", "1"); } catch (e) {}
    }
  })();
})();
