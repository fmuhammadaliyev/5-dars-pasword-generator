const passwordInput = document.getElementById("input");
const copyBtn = document.getElementById("btn");
const copyStatus = document.createElement("span");
copyStatus.style.marginLeft = "10px";
copyBtn.parentNode.insertBefore(copyStatus, copyBtn.nextSibling);

let copyTimeout;

copyBtn.addEventListener("click", () => {
  navigator.clipboard
    .writeText(passwordInput.value)
    .then(() => {
      copyStatus.textContent = "Copied!";
      copyStatus.style.opacity = "1";

      if (copyTimeout) clearTimeout(copyTimeout);

      copyTimeout = setTimeout(() => {
        copyStatus.style.opacity = "0";
        copyTimeout = null;
      }, 2000);
    })
    .catch(() => {
      copyStatus.textContent = "Copy failed!";
      copyStatus.style.opacity = "1";
      setTimeout(() => {
        copyStatus.style.opacity = "0";
      }, 2000);
    });
});

const charGenerators = {
  getUpperCase: () => String.fromCharCode(Math.floor(Math.random() * 26) + 65),
  getLowerCase: () => String.fromCharCode(Math.floor(Math.random() * 26) + 97),
  getNumber: () => String(Math.floor(Math.random() * 10)),
  getSymbol: () => {
    const symbols = [
      ...Array.from({ length: 15 }, (_, i) => 33 + i),
      ...Array.from({ length: 6 }, (_, i) => 58 + i),
      ...Array.from({ length: 4 }, (_, i) => 91 + i),
      ...Array.from({ length: 4 }, (_, i) => 123 + i),
    ];
    return String.fromCharCode(
      symbols[Math.floor(Math.random() * symbols.length)]
    );
  },
};

const form = document.getElementById("form");
const lengthInput = document.getElementById("range");
const lengthDisplay = document.getElementById("characterLength");

lengthInput.addEventListener("input", (e) => {
  lengthDisplay.textContent = e.target.value;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const passwordLength = parseInt(lengthInput.value);
  const selectedGenerators = [];

  if (formData.get("upperCase") === "on")
    selectedGenerators.push(charGenerators.getUpperCase);
  if (formData.get("lowerCase") === "on")
    selectedGenerators.push(charGenerators.getLowerCase);
  if (formData.get("numbers") === "on")
    selectedGenerators.push(charGenerators.getNumber);
  if (formData.get("symbols") === "on")
    selectedGenerators.push(charGenerators.getSymbol);

  if (selectedGenerators.length === 0) return;
  let password = "";
  for (let i = 0; i < passwordLength; i++) {
    const randomFunc =
      selectedGenerators[Math.floor(Math.random() * selectedGenerators.length)];
    password += randomFunc();
  }

  passwordInput.value = password;
});
