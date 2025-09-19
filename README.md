# Igrica Memorije – Veb Aplikacija

Ova veb aplikacija je interaktivna igra memorije namenjena za dva igrača. Omogućava korisnicima da se takmiče, prate svoje rezultate, pregledaju istoriju igara sa naprednim filterima, i po potrebi resetuju sve podatke.

---

## Pokretanje Projekta

Da biste pokrenuli aplikaciju na svojoj mašini, pratite sledeće korake:

1.  **Klonirajte repozitorijum:**
    ```bash
    git clone [https://github.com/elab-development/klijentske-veb-tehnologije-2024-2023-0013-veb-igrica-memorije](https://github.com/elab-development/klijentske-veb-tehnologije-2024-2023-0013-veb-igrica-memorije)
    ```

2.  **Uđite u folder projekta i otvorite ga u VS Code:**
    ```bash
    cd seminarski
    ```

3.  **Instalirajte zavisnosti:**
    U terminalu unutar VS Code-a pokrenite komandu:
    ```bash
    npm install
    ```

4.  **Pokrenite razvojni server:**
    ```bash
    npm start
    ```
    Aplikacija će se automatski otvoriti u vašem pregledaču na adresi **`http://localhost:3000`**.

---

## Tehnologije

* **React** – za izgradnju korisničkog interfejsa.
* **TypeScript** – za tipizaciju i bolju kontrolu podataka.
* **React Router** – za navigaciju između stranica.
* **CSS** – za stilizaciju.
* **LocalStorage** – za trajno čuvanje rezultata igara u pregledaču.

---

## Ključne Funkcionalnosti

* **Igra Memorije:** Igra za dva igrača sa praćenjem poena, broja pokušaja i čuvanjem rezultata.
* **Istorija Rezultata:**
    * Prikaz svih završenih igara.
    * Napredni **filteri** po pobedniku, minimalnom i maksimalnom broju pokušaja.
    * **Paginacija** sa prikazom više rezultata po stranici.
    * Opcija za brisanje svih rezultata.
* **Navigacija:** Jednostavna navigacija kroz stranice: Početna, Igra, Poslednji rezultat, Istorija rezultata i Uputstvo.
* **Reusable komponente:** Projekat koristi komponente poput `Dugme`, `Paginacija` i `Navigacija` za efikasnost i održivost koda.

---
