(function () {
  // Prevent the script from executing if it's running inside the iframe
  if (window !== window.top) return;

  const appUrl =
    window.location.hostname === "localhost"
      ? "http://localhost:3000"
      : "https://www.hiither.com";

  let cachedMaxZIndex;

  const getMaxZIndex = () => {
    if (cachedMaxZIndex) return cachedMaxZIndex;

    cachedMaxZIndex = Array.from(document.querySelectorAll("*"))
      .map((el) => parseFloat(window.getComputedStyle(el).zIndex) || 0)
      .reduce((max, z) => Math.max(max, z), 0);

    return cachedMaxZIndex;
  };

  const injectStyles = () => {
    if (!document.querySelector("#panel-styles")) {
      const style = document.createElement("style");
      style.id = "panel-styles";
      style.textContent = `
        .panel-window {
          position: fixed;
          top: 0;
          right: 0;
          max-width: 500px;
          height: 100%;
          border: none;
          border-top-left-radius: 12px;
          border-bottom-left-radius: 12px;
          transition: transform 0.25s ease-in-out;
          transform: translateX(100%);
        }
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.2);
          z-index: 2147483646;
        }
        body.panel-open {
          overflow: hidden;
        }
      `;
      document.head.append(style);
    }
  };

  const initializePanel = function () {
    const existingIframe = document.querySelector(".panel-window");
    if (existingIframe) existingIframe.remove();

    const iframe = document.createElement("iframe");
    const overlay = document.createElement("div");

    iframe.src = appUrl + "/embed?loc=" + window.location;
    iframe.classList.add("panel-window");
    overlay.classList.add("overlay");

    iframe.style.zIndex = getMaxZIndex() + 1;
    overlay.style.zIndex = iframe.style.zIndex - 1;

    injectStyles();

    document.body.appendChild(iframe);

    window.addEventListener("message", (e) => {
      if (e.origin !== appUrl) return;

      const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;

      if (data.width && data.height) {
        iframe.style.width = data.width;
        iframe.style.height = data.height;
      }

      if (data.closeButtonClicked) {
        overlay.click();
        iframe.contentWindow.postMessage({ buttonClicked: true }, appUrl);
      }
    });

    const handleLinkClick = (link) => {
      document.body.appendChild(overlay);
      document.body.classList.add("panel-open");

      iframe.contentWindow.postMessage({ panelId: link.hash.slice(5) }, appUrl);
      iframe.style.transform = "translateX(0)";

      overlay.addEventListener(
        "click",
        () => {
          iframe.style.transform = "translateX(100%)";
          iframe.addEventListener(
            "transitionend",
            () => {
              if (document.body.contains(overlay)) {
                document.body.removeChild(overlay);
                document.body.classList.remove("panel-open");
              }
            },
            { once: true },
          );
        },
        { once: true },
      );
    };

    const setupLinkListeners = () => {
      const links = Array.from(document.querySelectorAll("a")).filter((link) =>
        link.hash.includes("#hii-"),
      );

      links.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();

          handleLinkClick(link);
        });
      });
    };

    setupLinkListeners();

    const observer = new MutationObserver((mutationsList) => {
      mutationsList.forEach((mutation) => {
        if (
          Array.from(mutation.addedNodes).some((node) => node.tagName === "A")
        ) {
          setupLinkListeners();
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  };

  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    initializePanel();
  } else {
    document.addEventListener("DOMContentLoaded", initializePanel);
  }

  // Avoid redundant re-initialization on route changes
  const debounce = (func, delay) => {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  };

  // Re-run initialization on every route change using popstate
  const debouncedInitializePanel = debounce(initializePanel, 200);
  window.addEventListener("popstate", debouncedInitializePanel);
})();
