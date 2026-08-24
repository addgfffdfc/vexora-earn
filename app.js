// Vexora Earn Telegram Mini App

const tg = window.Telegram?.WebApp;

if (tg) {
    tg.ready();
    tg.expand();

    document.documentElement.style.setProperty(
        "--tg-bg",
        tg.backgroundColor || "#0b1020"
    );
}


// App elements
const app = document.querySelector(".app");
const welcome = document.querySelector(".welcome-card");
const stats = document.querySelector(".stats");
const section = document.querySelector(".section");
const navItems = document.querySelectorAll(".nav-item");


// Dynamic page
const pageBox = document.createElement("section");

pageBox.id = "dynamic-page";

pageBox.style.display = "none";

app.insertBefore(
    pageBox,
    document.querySelector(".bottom-nav")
);


// Telegram user information
function getUserInfo() {

    if (
        tg &&
        tg.initDataUnsafe &&
        tg.initDataUnsafe.user
    ) {

        const user = tg.initDataUnsafe.user;

        return {

            name:
                user.first_name ||
                "Telegram User",

            username:
                user.username
                    ? "@" + user.username
                    : "No username"

        };

    }

    return {

        name: "Telegram User",

        username: "No username"

    };
}


// Task
function startTask(taskName) {

    if (tg) {
        tg.HapticFeedback?.impactOccurred("light");
    }

    alert(
        taskName +
        "\n\nTask opened.\nComplete the task and come back to claim your reward."
    );
}


// Home
function showHome() {

    welcome.style.display = "";
    stats.style.display = "";
    section.style.display = "";

    pageBox.style.display = "none";
}


// Tasks
function showTasks() {

    welcome.style.display = "none";
    stats.style.display = "none";
    section.style.display = "block";

    pageBox.style.display = "none";

    const title =
        section.querySelector(".section-title h2");

    if (title) {
        title.textContent = "Available Tasks";
    }
}


// Referral
function showReferral() {

    welcome.style.display = "none";
    stats.style.display = "none";
    section.style.display = "none";

    pageBox.style.display = "block";

    pageBox.innerHTML = `

        <div class="page-card">

            <h2>👥 Referral</h2>

            <p>
                Invite friends and earn rewards.
            </p>

            <div class="referral-box">

                <p>Your Referral Link</p>

                <div class="referral-link">
                    Coming Soon
                </div>

                <button
                    class="action-button"
                    onclick="alert('Referral system will be available soon.')"
                >
                    Invite Friends
                </button>

            </div>

        </div>

    `;
}


// Profile
function showProfile() {

    welcome.style.display = "none";
    stats.style.display = "none";
    section.style.display = "none";

    pageBox.style.display = "block";

    const user = getUserInfo();

    pageBox.innerHTML = `

        <div class="profile-page">

            <div class="profile-header">

                <div class="profile-avatar">
                    👤
                </div>

                <div class="profile-name">

                    <h2>${user.name}</h2>

                    <p>${user.username}</p>

                </div>

            </div>


            <div class="profile-status">

                <div>
                    <span>LEVEL</span>
                    <strong>Level 1</strong>
                </div>

                <div>
                    <span>STATUS</span>
                    <strong>Active</strong>
                </div>

            </div>


            <div class="profile-card braxr-card">

    <div class="braxr-title">
        <div class="braxr-logo">B</div>
        <span>BRAXR Token</span>
    </div>

    <div class="braxr-label">
        Available Balance
    </div>

    <div class="braxr-balance" data-braxr-balance>
        0.00 BRAXR
    </div>
<div class="profile-card dollar-card">

    <div class="dollar-title">
        <div class="dollar-logo">$</div>

        <span>Dollar Balance</span>
    </div>

    <div class="dollar-label">
        Available Balance
    </div>

    <div class="dollar-balance" data-dollar-balance>
        $0.00
    </div>

</div>
</div>


            <div class="profile-card">

                <h3>💰 Withdraw</h3>

                <p>
                    Withdraw your available balance.
                </p>

                <button
                    class="action-button"
                    onclick="alert('Withdrawal will be available soon.')"
                >
                    Withdraw
                </button>

            </div>


            <div class="profile-card community-card">

                <h3>🌐 Community</h3>

                <p>
                    Join our community and stay updated.
                </p>

                <button
                    class="action-button"
                    onclick="alert('Community link will be added soon.')"
                >
                    Join Community
                </button>

            </div>

        </div>

    `;
}


// Navigation
navItems.forEach(function(button) {

    button.addEventListener("click", function() {

        navItems.forEach(function(item) {

            item.classList.remove("active");

        });

        this.classList.add("active");

        const page =
            this.dataset.page;

        if (page === "home") {
            showHome();
        }

        else if (page === "tasks") {
            showTasks();
        }

        else if (page === "referral") {
            showReferral();
        }

        else if (page === "profile") {
            showProfile();
        }

        if (tg) {
            tg.HapticFeedback?.selectionChanged();
        }

    });

});


// Start on Home
showHome();


// Telegram Main Button
if (tg) {
    tg.MainButton.hide();
}
/* =========================================
   VEXORA THEME FIX
   Referral + Profile
   ========================================= */

function applyVexoraTheme() {

    document.querySelectorAll("button").forEach(button => {

        const text = button.innerText.trim().toLowerCase();

        if (
            text.includes("invite") ||
            text.includes("referral")
        ) {
            button.classList.add("referral-button");
        }

        if (
            text.includes("withdraw")
        ) {
            button.classList.add("profile-withdraw");
        }
    });

    document.querySelectorAll("div, section").forEach(el => {

        const text = el.innerText?.trim() || "";

        if (
            text.includes("Your Referral Link") &&
            text.includes("Invite Friends")
        ) {
            el.classList.add("referral-card");
        }

        if (
            text.includes("Available Balance") &&
            text.includes("Withdraw")
        ) {
            el.classList.add("profile-wallet");
        }

        if (
            text.includes("Community") &&
            text.includes("Join Community")
        ) {
            el.classList.add("profile-community");
        }
    });
}

applyVexoraTheme();

/* ===== BRAXR SYSTEM ===== */

const BRAXR_SYSTEM = {

    tokenBalance: Number(
        localStorage.getItem("braxr_balance") || 0
    ),

    dollarBalance: Number(
        localStorage.getItem("dollar_balance") || 0
    ),

    levels: [
        { level: 1, min: 0, max: 199 },
        { level: 2, min: 200, max: 499 },
        { level: 3, min: 500, max: 999 },
        { level: 4, min: 1000, max: 1999 },
        { level: 5, min: 2000, max: 3999 },
        { level: 6, min: 4000, max: Infinity }
    ],

    tasks: []
};


/* SAVE BALANCE */

function saveBRAXR() {

    localStorage.setItem(
        "braxr_balance",
        BRAXR_SYSTEM.tokenBalance
    );

    localStorage.setItem(
        "dollar_balance",
        BRAXR_SYSTEM.dollarBalance
    );
}


/* FIND LEVEL */

function getBRAXRLevel(tokens) {

    for (const level of BRAXR_SYSTEM.levels) {

        if (
            tokens >= level.min &&
            tokens <= level.max
        ) {
            return level.level;
        }
    }

    return 1;
}


/* ADD TOKEN */

function addBRAXR(amount) {

    BRAXR_SYSTEM.tokenBalance += Number(amount);

    saveBRAXR();
    updateBRAXRUI();
}


/* ADD DOLLAR */

function addDollar(amount) {

    BRAXR_SYSTEM.dollarBalance += Number(amount);

    saveBRAXR();
    updateBRAXRUI();
}


/* UPDATE BALANCE */

function updateBRAXRUI() {

    const token =
        BRAXR_SYSTEM.tokenBalance.toFixed(2);

    const dollar =
        BRAXR_SYSTEM.dollarBalance.toFixed(2);

    const level =
        getBRAXRLevel(
            BRAXR_SYSTEM.tokenBalance
        );


    document
        .querySelectorAll("[data-braxr-balance]")
        .forEach(el => {

            el.textContent =
                token + " BRAXR";

        });


    document
        .querySelectorAll("[data-dollar-balance]")
        .forEach(el => {

            el.textContent =
                "$" + dollar;

        });


    document
        .querySelectorAll("[data-braxr-level]")
        .forEach(el => {

            el.textContent =
                "Level " + level;

        });
}


/* TELEGRAM USER */

function loadTelegramProfile() {

    if (
        typeof Telegram === "undefined" ||
        !Telegram.WebApp
    ) {
        return;
    }

    const user =
        Telegram.WebApp.initDataUnsafe?.user;

    if (!user) return;


    document
        .querySelectorAll("[data-telegram-name]")
        .forEach(el => {

            el.textContent =
                  document
        .querySelectorAll("[data-telegram-photo]")
        .forEach(el => {
            if (user.photo_url) {
                el.src = user.photo_url;
            }
        });  (
                    user.first_name || ""
                ) +
                (
                    user.last_name
                        ? " " + user.last_name
                        : ""
                );

        });


    document
        .querySelectorAll("[data-telegram-username]")
        .forEach(el => {

            el.textContent =
                user.username
                    ? "@" + user.username
                    : "Telegram User";

        });


    if (user.photo_url) {

        document
            .querySelectorAll("[data-telegram-photo]")
            .forEach(img => {

                img.src = user.photo_url;

            });
    }
}


/* NO TASK / TASK LIST */

function renderAvailableTasks() {

    const container =
        document.querySelector(
            "[data-available-tasks]"
        );

    if (!container) return;


    if (
        !BRAXR_SYSTEM.tasks ||
        BRAXR_SYSTEM.tasks.length === 0
    ) {

        container.innerHTML = `
            <div class="no-tasks">
                <strong>No Tasks Available</strong>
                Check back later for new tasks.
            </div>
        `;

        return;
    }


    container.innerHTML =
        BRAXR_SYSTEM.tasks.map(task => `

            <div class="task-card">

                <div class="task-icon">
                    ${task.icon || "🎯"}
                </div>

                <div class="task-info">

                    <h3>
                        ${task.title}
                    </h3>

                    <p>
                        ${task.description || ""}
                    </p>

                </div>

                <div class="task-reward">

                    <strong>
                        +${task.token} BRAXR
                    </strong>

                    <strong>
                        +$${Number(
                            task.dollar || 0
                        ).toFixed(2)}
                    </strong>

                    <button
                        onclick="completeBRAXRTask('${task.id}')"
                    >
                        Start
                    </button>

                </div>

            </div>

        `).join("");
}


/* COMPLETE TASK */

function completeBRAXRTask(taskId) {

    const task =
        BRAXR_SYSTEM.tasks.find(
            x => x.id === taskId
        );

    if (!task) return;


    addBRAXR(task.token);

    addDollar(task.dollar);


    BRAXR_SYSTEM.tasks =
        BRAXR_SYSTEM.tasks.filter(
            x => x.id !== taskId
        );


    renderAvailableTasks();
}


/* START SYSTEM */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateBRAXRUI();

        loadTelegramProfile();

        renderAvailableTasks();

    }
);
