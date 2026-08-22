#ifndef OPERATIONS_H
#define OPERATIONS_H

/*
    operations.h

    Zadanie na kolokwium:

    Nalezy zaimplementowac prosty kalkulator liczb calkowitych, ktorzy:
      1) wczytuje dzialania z pliku tekstowego,
      2) oblicza wyniki,
      3) zapisuje dzialania wraz z wynikami do drugiego pliku tekstowego.

    Format pliku wejsciowego (tekst):
      - Linia 1: liczba calkowita N (liczba dzialan)
      - Nastepne N linii: "A OP B =" gdzie:
            A oraz B to liczby calkowite (moga byc ujemne),
            OP to znak '+' albo '-',
            znak '=' musi wystepowac na koncu linii.
        Przyklad:
            3
            2 + 2 =
            10 - 7 =
            -5 + 12 =

    Format pliku wyjsciowego (tekst):
      - N linii: "A OP B = WYNIK"
        Przyklad:
            2 + 2 = 4
            10 - 7 = 3
            -5 + 12 = 7

    Zasady ogolne:
      - Nalezy uzyt dynamicznej alokacji pamieci dla tablicy struktur.
      - Nalezy obsluzyt bledy: funkcje maja zwracac wartosci zgodne z opisem.
      - W main(void) nalezy zwolnic zaalokowana pamiec (free()).
*/

/* Struktura opisujaca jedno dzialanie wczytane z pliku wejsciowego. */
typedef struct {
    int left;     /* Pierwszy operand A. */
    int right;    /* Drugi operand B. */
    char op;      /* Operator: '+' lub '-'. */
    int result;   /* Wynik dzialania. */
} Operation;

/*
    Odczytuje z pierwszej linii pliku wejsciowego liczbe dzialan N.

    Parametry:
      - inputPath: sciezka do pliku wejsciowego.

    Zwraca:
      - N (N > 0), jesli plik otwarto poprawnie i pierwsza linia zawiera poprawne N.
      - -1 w razie bledu (brak pliku, n <= 0).
*/
int get_operation_count(const char *inputPath);

/*
    Alokuje pamiec dla tablicy N struktur Operation.

    Parametry:
      - n: liczba elementow do alokacji (oczekiwane: n > 0).

    Zwraca:
      - wskaznik do zaalokowanej tablicy (Operation*) w razie sukcesu.
      - NULL w razie bledu (n <= 0 lub brak pamieci).
*/
Operation *allocate_operations(int n);

/*
    Wczytuje N dzialan z pliku wejsciowego do przekazanej tablicy.

    Wymagania:
      - Funkcja ma ponownie otworzyc plik.
      - Funkcja ma ponownie odczytac i zweryfikowac pierwsza linie (N z pliku ma byc rowne n).
      - Kazdal inia dzialania ma byc w formacie: A OP B = (podpowiedz: funkcja fscanf() zwraca liczbe poprawnie wczytanych elementow).
      - Dozwolone operatory: tylko '+' i '-'.

    Parametry:
      - inputPath: sciezka do pliku wejsciowego.
      - ops: wskaznik do wczesniej zaalokowanej tablicy Operation.
      - n: liczba dzialan do wczytania.

    Zwraca:
      - 1 w razie sukcesu (wczytano poprawnie wszystkie N dzialan).
      - 0 w razie bledu (zly format, blad otwarcia pliku, zly operator).
*/
int load_operations(const char *inputPath, Operation *ops, int n);

/*
    Oblicza wyniki dla wszystkich dzialan w tablicy.

    Wymagania:
      - Dla kazdego elementu: wyliczyt ops[i].result na podstawie ops[i].left, ops[i].op, ops[i].right.
      - Jesli napotakno niedozwolony operator, zakonczyc i zgloszic blad.

    Parametry:
      - ops: wskaznik do tablicy Operation.
      - n: rozmiar tablicy.

    Zwraca:
      - 1 w razie sukcesu (obliczono wszystkie wyniki).
      - 0 w razie bledu (ops == NULL, n <= 0, niedozwolony operator).
*/
int compute_results(Operation *ops, int n);

/*
    Zapisuje dzialania wraz z wynikami do pliku wyjsciowego.

    Wymagania:
      - Utworzyc / nadpisac plik wyjsciowy.
      - Dla kazdego dzialania zapisac jedna linie dokladnie w formacie: A OP B = WYNIK

    Parametry:
      - outputPath: sciezka do pliku wyjsciowego.
      - ops: wskaznik do tablicy Operation z obliczonymi wynikami.
      - n: rozmiar tablicy.

    Zwraca:
      - 1 w razie sukcesu (zapisano wszystkie linie).
      - 0 w razie bledu (blad otwarcia pliku wyjsciowego, n <= 0).
*/
int write_results(const char *outputPath, const Operation *ops, int n);

#endif