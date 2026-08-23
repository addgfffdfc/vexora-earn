// Telegram Mini App
const tg = window.Telegram?.WebApp;

// Telegram Mini App initialize
if (tg) {
    tg.ready();
    tg.expand();

    // Telegram theme অনুযায়ী কিছু তথ্য
    document.documentElement.style.setProperty(
        "--tg-bg",
        tg.backgroundColor || "#0b1020"
    );
}

// Task button
function startTask(taskName) {
    if (tg) {
        tg.HapticFeedback?.impactOccurred("light");
    }

    alert(
        taskName +
        "\n\nTask opened.\nComplete the task and come back to claim your reward."
    );
}

// Bottom navigation
document.querySelectorAll(".nav-item").forEach((button) => {

    button.addEventListener("click", function () {

        document.querySelectorAll(".nav-item").forEach((item) => {
            item.classList.remove("active");
        });

        this.classList.add("active");

        const page = this.innerText.trim();

        if (tg) {
            tg.HapticFeedback?.selectionChanged();
        }

        console.log("Navigation:", page);
    });

});

// Start Telegram Mini App
if (tg) {
    tg.MainButton.hide();
}

// Prevent accidental text selection on buttons
document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });
});