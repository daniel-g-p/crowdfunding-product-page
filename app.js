// DOM Elements

const overlay = document.querySelector("#overlay");
const main = document.querySelector("main");
const numberSection = document.querySelector("#numbers");
const statsContainer = document.querySelector("#numbers .container")
const progressBar = document.querySelector("#progressBar div");
const logo = document.querySelector("#logo");
const openNav = document.querySelector("#openNav");
const closeNav = document.querySelector("#closeNav");
const navToggles = [openNav, closeNav];
const mobileNav = document.querySelector("#mobileNav");
const desktoptNav = document.querySelector("#desktopNav");
const bookmark = document.querySelector("#bookmark");
const bookmarkLabel = document.querySelector("#bookmark p");
const openButtons = document.querySelectorAll("main button");
const specificButtons = { button1: "#bamboo", button2: "#black", button3: "#mahogany" };
const modal = document.querySelector("#modal");
const closeModal = document.querySelector("#closeModal");
const selects = document.querySelectorAll(".select input");
const inputConditions = { option1: 0, option2: 25, option3: 75, option4: 200 };
const continueButtons = document.querySelectorAll(".selection button");
const confirmation = document.querySelector("#confirmation");
const finalizeButton = document.querySelector("#confirmation button");
const totalRaised = document.querySelector("#totalRaised");
const totalBackers = document.querySelector("#totalBackers");

let pledge = 0;

// Helper Functions

const toggleOverlay = () => overlay.classList.toggle("active");

const toggleNav = () => {
    main.classList.toggle("inactive");
    mobileNav.classList.toggle("active");
    overlay.classList.toggle("active");
    navToggles.forEach(toggle => toggle.classList.toggle("active"));
};

const toggleModal = () => {
    modal.classList.toggle("active");
    logo.classList.toggle("inactive");
    openNav.classList.toggle("inactive");
    desktoptNav.classList.toggle("inactive");
};

const resetModal = () => {
    setTimeout(() => {
        clearSelect();
        closeModal.scrollIntoView();
    }, 500);
};

const clearSelect = () => {
    const currentSelection = document.querySelector(".selection.active");
    if (currentSelection) {
        const radio = document.querySelector(".selection.active .select input");
        const pledge = document.querySelector(".selection.active .pledge");
        const currentInput = document.querySelector(".selection.active .pledge input");
        currentSelection.classList.remove("active");
        radio.checked = false;
        pledge.style.maxHeight = 0;
        setTimeout(() => {
            currentInput.parentElement.parentElement.classList.remove("error");
            currentInput.value = "";
        }, 500);
    };
};

const selectNew = select => {
    const parentSelection = select.parentElement.parentElement;
    parentSelection.classList.toggle("active");
    const pledge = document.querySelector(".selection.active .pledge");
    pledge.style.maxHeight = pledge.scrollHeight + "px";
    select.checked = true;
    setTimeout(() => parentSelection.scrollIntoView({ behavior: "smooth" }), 500);
};

const updateStock = () => {
    const selector = document.querySelector(".selection.active .select input").getAttribute("value");;
    const options = document.querySelectorAll(`.option.${selector}`);
    const stock = document.querySelectorAll(`.option.${selector} h6`)
    if (selector !== "noReward") {
        const newStock = Number(stock[0].innerHTML) - 1;
        stock.forEach(s => {
            s.innerHTML = newStock.toString();
        });
        if (newStock === 0) {
            options.forEach(o => {
                o.classList.add("inactive");
                document.querySelectorAll(".option.inactive button").forEach(b => b.innerHTML = "Out of Stock");
            });
        };
    };;
};


// Overlay Close

overlay.addEventListener("click", () => {
    if (mobileNav.classList.contains("active")) {
        toggleNav();
        mobileNav.style.opacity = 0;
        mobileNav.style.maxHeight = 0;
    } else {
        resetModal();
        toggleModal();
        toggleOverlay();
    };
});


// Mobile Menu

openNav.addEventListener("click", () => {
    mobileNav.style.opacity = 1;
    mobileNav.style.maxHeight = mobileNav.scrollHeight + "px";
    toggleNav();
});

closeNav.addEventListener("click", () => {
    mobileNav.style.opacity = 0;
    mobileNav.style.maxHeight = 0;
    toggleNav();
});


// Bookmark Button

bookmark.addEventListener("click", () => {
    bookmark.classList.toggle("active");
    if (bookmark.classList.contains("active")) {
        bookmarkLabel.innerHTML = "Bookmarked";
    } else {
        bookmarkLabel.innerHTML = "Bookmark";
    };
});


// Modal

openButtons.forEach(b => {
    b.addEventListener("click", () => {
        toggleModal();
        toggleOverlay();
        if (b.classList.contains("specific")) {
            const inputID = specificButtons[b.id];
            const checkedOption = document.querySelector(inputID);
            checkedOption.checked = true;
            selectNew(checkedOption);
        };
    });
});

closeModal.addEventListener("click", () => {
    resetModal();
    toggleModal();
    toggleOverlay();
});


// Option Selection

selects.forEach(select => {
    select.addEventListener("change", () => {
        clearSelect();
        selectNew(select);
    });
});


// Form Validation

continueButtons.forEach(b => {
    b.addEventListener("click", event => {
        event.preventDefault();
        const input = document.querySelector(".selection.active .amount input");
        const inputID = input.id;
        pledge = Number(input.value);
        if (!pledge || pledge < inputConditions[inputID]) {
            input.parentElement.parentElement.classList.add("error");
        } else {
            input.parentElement.parentElement.classList.remove("error");
            updateStock();
            resetModal();
            overlay.classList.toggle("inactive");
            modal.classList.toggle("active");
            setTimeout(() => {
                confirmation.classList.toggle("active");
            }, 1000);
        };
    });
});


// Confirmation

finalizeButton.addEventListener("click", () => {
    overlay.classList.toggle("inactive");
    overlay.classList.toggle("active");
    confirmation.classList.toggle("active");
    logo.classList.toggle("inactive");
    openNav.classList.toggle("inactive");
    numberSection.classList.toggle("loading");
    const newTotal = Math.round(parseFloat(totalRaised.innerHTML.replace(",", "")) + pledge);
    let totalString = newTotal.toString();
    const newBackers = (parseFloat(totalBackers.innerHTML.replace(",", "")) + 1).toString();
    let backersString = newBackers.toString();
    for (let i = 3; i < totalString.length; i += 4) {
        totalString = totalString.slice(0, -i) + "," + totalString.slice(-i);
    }
    for (let i = 3; i < backersString.length; i += 3) {
        backersString = backersString.slice(0, -i) + "," + backersString.slice(-i);
    }
    setTimeout(() => {
        numberSection.scrollIntoView({ behavior: "smooth" });
        progressBar.style.transition = "width 0s ease-out";
        progressBar.style.maxWidth = 0;
        progressBar.style.width = 0;
        setTimeout(() => {
            totalRaised.innerHTML = totalString;
            totalBackers.innerHTML = backersString;
            numberSection.classList.toggle("loading");
            progressBar.style.maxWidth = "100%";
            let newWidth = newTotal * 100 / 100000;
            if (newWidth < 100) {
                progressBar.style.transition = `width ${newWidth * 0.01 * 2}s ease-out`;
                progressBar.style.width = newWidth + "%";
            } else {
                progressBar.style.transition = "width 2s ease-out";
                progressBar.style.width = "100%";
            };
        }, 500);
    }, 500);
});
