let selectedGroups = 2;

function generatePassword(groups) {
  const consonants = "bcdfghjklmnpqrstvwxyz";
  const vowels = "aeiou";
  const numbers = "0123456789";
  const bannedWords = new Set(ban_worlds);
  let password = "";
  const numberPosition = Math.floor(Math.random() * groups);
  const uppercasePosition = Math.floor(Math.random() * groups);

  for (let i = 0; i < groups; i++) {
    let group;
    do {
      group = `${getRandomChar(consonants)}${getRandomChar(
        vowels
      )}${getRandomChar(consonants)}${getRandomChar(vowels)}${getRandomChar(
        consonants
      )}`;
    } while (bannedWords.has(group));

    if (i === numberPosition) {
      group += getRandomChar(numbers);
    } else {
      group += getRandomChar(consonants);
    }

    if (i === uppercasePosition) {
      group = group.charAt(0).toUpperCase() + group.slice(1);
    }

    password += group + (i < groups - 1 ? "-" : "");
  }

  return password;
}

function getRandomChar(characters) {
  return characters.charAt(Math.floor(Math.random() * characters.length));
}

function generateDefaultPassword() {
  const password = generatePassword(selectedGroups);
  document.querySelector("#password").textContent = password;
  resetIcon();
}

function resetIcon() {
  const copyIcon = document.querySelector("#copy-icon");
  copyIcon.setAttribute("data-lucide", "copy");
  lucide.createIcons();
}

function handleTabClick(event) {
  document
    .querySelectorAll(".tab")
    .forEach((btn) => btn.classList.remove("active"));
  event.currentTarget.classList.add("active");
  selectedGroups = parseInt(event.currentTarget.getAttribute("data-value"));
  handleGenerateClick();
}

function handleGenerateClick() {
  const password = generatePassword(selectedGroups);
  document.querySelector("#password").textContent = password;
  resetIcon();
}

function handlePasswordContainerClick() {
  const passwordText = document.querySelector("#password").textContent;
  navigator.clipboard.writeText(passwordText).then(() => {
    const copyIcon = document.querySelector("#copy-icon");
    copyIcon.setAttribute("data-lucide", "check");
    lucide.createIcons();
    const passwordContainer = document.querySelector("#password-container");
    const rect = passwordContainer.getBoundingClientRect();

    confetti({
      particleCount: 80,
      spread: 60,
      origin: {
        y: (rect.top + rect.height / 2) / window.innerHeight,
        x: (rect.left + rect.width / 2) / window.innerWidth,
      },
    });

    setTimeout(resetIcon, 5000);
  });
}

document.querySelectorAll(".tab").forEach((button) => {
  button.addEventListener("click", handleTabClick);
});

document
  .querySelector("#generate")
  .addEventListener("click", handleGenerateClick);

document
  .querySelector("#password-container")
  .addEventListener("click", handlePasswordContainerClick);

window.onload = generateDefaultPassword;
