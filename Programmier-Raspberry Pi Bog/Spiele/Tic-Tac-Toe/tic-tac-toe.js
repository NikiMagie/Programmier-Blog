const SPIELFELD_KLASSE = "spielfeld";
const SPIELANZEIGE_KLASSE = "spielanzeige";
const FELD_KLASSE = "feld";
const SPIELER_KLASSE = "spieler";
const GEGNER_KLASSE = "gegner";

const spielfeld = document.querySelector("." + SPIELFELD_KLASSE);
const spielanzeige = document.querySelector("." + SPIELANZEIGE_KLASSE);

const felder = document.querySelectorAll("." + FELD_KLASSE);

let aktuelleKlasse;

spielStarten();

function klickVerarbeiten(ereignis) {
    // Ermittelln, welches Feld angeklickt wurde
    const feld = ereignis.target;

    // Spielstein auf dieses Feld setzen
    spielsteinSetzen(feld);

    // Beende den Zug, wenn der Spielstein erfolgreich gesetzt wurde
    if (spielsteinSetzen(feld) === true) {
        // Beende den Zug, wenn der Spielstein erfolgreich gesetzt wurde
        zugBeenden();
    }
}

function spielsteinSetzen(feld) {
    // Prüfen, ob das Feld schon betzetzt ist
    if (
        feld.classList.contains(SPIELER_KLASSE) ||
        feld.classList.contains(GEGNER_KLASSE)
    ) {
        // Verhindern, dass ein Spielstein gesetzt wird
        return false;
    }

    // Dem Feld die Klassse des Spielers anhängen, der gerade an der Reihe ist
    feld.classList.add(aktuelleKlasse);

    // Das Feld deaktivieren, um weitere Klicks zu verhindern
    feld.disabled = true;

    // Signalisieren, dass der Spielstein erfolgreich gesetzt wurde
    return true;
}

function spielStarten() {
    // Die Liste der Felder durchgehen
    for (const feld of felder) {
        // Jedem Feld sagen, was beim Klick darauf passieren soll
        feld.addEventListener("click", klickVerarbeiten);
    }

    // Festlegen, wer beginnen darf
    zugBeenden();
}

function zugBeenden() {
    if (aktuelleKlasse === SPIELER_KLASSE) {
        // Spieler beendet seinen Zug -> zum Gegner wechseln
        aktuelleKlasse = GEGNER_KLASSE;
    } else if (aktuelleKlasse === GEGNER_KLASSE) {
        // Gegner beendet seinen Zug -> zum Spieler wechseln
        aktuelleKlasse = SPIELER_KLASSE;
    } else {
        // Es ist noch niemand am Zug -> auswürfeln, wer beginnt
        aktuelleKlasse = Math.random() < 0.5 ? SPIELER_KLASSE : GEGNER_KLASSE;
    }
}