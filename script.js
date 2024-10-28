let wynikPoprawny;
let licznikPoprawnych = 0;
let maxLiczba = 10;
let czasPozostaly = 10;
let intervalId;
let tryb = 'mnozenie';

function ustawPoziom() {
    const poziom = document.getElementById("difficulty").value;
    if (poziom === "1") maxLiczba = 10;
    else if (poziom === "2") maxLiczba = 20;
    else if (poziom === "3") maxLiczba = 50;
}

function zmienTryb() {
    tryb = document.getElementById("tryb").value;
    document.getElementById("naglówek").textContent = tryb === 'mnozenie' ? "Mnożenie losowych liczb" :
                             tryb === 'dodawanie' ? "Dodawanie losowych liczb" : "Odejmowanie losowych liczb";
    document.getElementById("question").textContent = "Wciśnij przycisk, aby wylosować działanie";
    document.getElementById("feedback").textContent = "";
    licznikPoprawnych = 0;
    document.getElementById("licznik").textContent = `Poprawne odpowiedzi: ${licznikPoprawnych}`;
}

function wylosuj() {
    const liczba1 = Math.floor(Math.random() * maxLiczba) + 1;
    const liczba2 = Math.floor(Math.random() * maxLiczba) + 1;

    if (tryb === 'mnozenie') {
        wynikPoprawny = liczba1 * liczba2;
        document.getElementById("question").textContent = `Ile to jest ${liczba1} x ${liczba2}?`;
    } else if (tryb === 'dodawanie') {
        wynikPoprawny = liczba1 + liczba2;
        document.getElementById("question").textContent = `Ile to jest ${liczba1} + ${liczba2}?`;
    } else if (tryb === 'odejmowanie') {
        wynikPoprawny = liczba1 - liczba2;
        document.getElementById("question").textContent = `Ile to jest ${liczba1} - ${liczba2}?`;
    }

    document.getElementById("input-section").style.display = "block";
    document.getElementById("feedback").textContent = "";
    document.getElementById("user-result").value = "";
    document.getElementById("losuj-button").style.display = "none";
    startTimer();
}

function sprawdz() {
    const userWynik = parseInt(document.getElementById("user-result").value);
    const feedbackElement = document.getElementById("feedback");

    if (userWynik === wynikPoprawny) {
        clearInterval(intervalId);
        licznikPoprawnych++;
        feedbackElement.textContent = "Brawo! Podałeś poprawny wynik!";
        feedbackElement.style.color = "green";
        document.getElementById("losuj-button").style.display = "inline-block";
        document.getElementById("licznik").textContent = `Poprawne odpowiedzi: ${licznikPoprawnych}`;
        document.getElementById("correct-sound").play();
    } else {
        feedbackElement.textContent = "Niestety, to nie jest poprawny wynik.";
        feedbackElement.style.color = "red";
        document.getElementById("wrong-sound").play();
    }

    dodajDoHistorii(userWynik, userWynik === wynikPoprawny);
    document.getElementById("input-section").style.display = "none";
}

function dodajDoHistorii(wynik, poprawny) {
    const historiaList = document.getElementById("historia");
    const li = document.createElement("li");
    li.textContent = `${poprawny ? "✅" : "❌"} Wpisany wynik: ${wynik}`;
    historiaList.appendChild(li);
}

function startTimer() {
    czasPozostaly = 10;
    document.getElementById("czas").textContent = `Czas: ${czasPozostaly}s`;

    intervalId = setInterval(() => {
        czasPozostaly--;
        document.getElementById("czas").textContent = `Czas: ${czasPozostaly}s`;

        if (czasPozostaly <= 0) {
            clearInterval(intervalId);
            document.getElementById("feedback").textContent = "Czas minął! Spróbuj ponownie.";
            document.getElementById("feedback").style.color = "red";
            document.getElementById("losuj-button").style.display = "inline-block";
        }
    }, 1000);
}

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.style.left = sidebar.style.left === "0px" ? "-270px" : "0px";
}

// Funkcja do włączania/wyłączania ciemnego trybu
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");
}
