# Testowanie i jakość oprogramowania

**L#06:** Code Smells.

## Wprowadzenie

**Code Smell** to termin używany w programowaniu do opisywania pewnych
cech kodu źródłowego, które wskazują na potencjalne problemy z jego
jakością. Niekoniecznie oznaczają one błędy, ale często prowadzą do
trudniejszego utrzymania kodu.

## Cel

Głównym celem laboratorium jest identyfikacja najczęstszych "zapachów"
kodu (ang. Code Smells) oraz nauka ich eliminowania poprzez odpowiednią
refaktoryzację struktury kodu.

## Rozrosty

- **Długa metoda:** Jeżeli metoda jest dłuższa niż 10-20 linii dziel na
  mniejsze metody.
- **Długa lista parametrów:** Jeżeli funkcja ma więcej niż 3-4
  parametry, rozważ użycie obiektu.
- **Obsesja na punkcie prymitywów:** Używanie powiązanych ze sobą typów
  prymitywnych zamiast klas. Stwórz klasę / strukturę, która będzie
  agregować te parametry.

## Zbędne elementy

- **Zduplikowany kod:** Powtarzający się kod w kilku miejscach wyciągnij
  do wspólnej metody.
- **Martwy kod:** Nieużywane zmienne lub funkcje, usuń je.
- **Leniwa klasa:** Klasa, która nie robi nic szczególnego, połącz ją z
  inną klasą lub usuń.

## Łatwe do wykrycia powiązania

- **Zbitki danych:** Duplikacja tych samych parametrów w kilku
  miejscach. Stwórz logiczną struktrę, która będzie agregować te
  parametry.
- **Zazdrość o funkcje:** Metoda operuje głównie na danych innej klasy.
  Przenieś ją do klasy, których danych używa.

## Nadużycia

- **Instrukcje warunkowe:** Długi switch/if-else zastąp polimorfizmem
  lub mapą.
- **Magiczne liczby:** Stałe jak 42 bez wyjaśnienia zdefiniuj jako
  nazwane stałe.

## Zadanie rekrutacyjne

Wykorzystaj dotychczas zdobytą wiedzę i postaraj się rozwiązać problem.
Napisz testy oraz zaimplementuj rozwiązanie.

Proszę zaimplementować program, który będzie odpowiedzialny za
wyszukiwanie zbiorów liczb powtarzających się elementów o ściśle
określonym rozmiarze. Dla podanego zbioru liczb (lista elementów o
dowolnej długości) użytkownik powinien przekazać również rozmiar
wyszukiwanych zbiorów. Funkcja powinna zwracać listę składającą się z
pojedynczych elementów reprezentujących wyszukiwane zbiory.

| PARAMETRY FUNKCJI LOTTERY | EFEKT DZIAŁANIA | REZULTAT |
|----|----|----|
| `[1, 1, 3, 2, 2, 2, 4, 5]`, `2` | `[`**`1`**`, `**`1`**`, 3, 2, 2, 2, 4, 5]` | `[1]` |
| `[1, 1, 2, 2, 2, 3, 4, 5]`, `3` | `[1, 1, `**`2`**`, `**`2`**`, `**`2`**`, 3, 4, 5]` | `[2]` |
| `[1, 2, 2, 2, 3, 4, 5, 5, 1]`, `2` | `[`**`1`**`, 2, 2, 2, 3, 4, `**`5`**`, `**`5`**`, `**`1`**`]` | `[1, 5]` |
| `None`, `1` | `[]` | `[]` |
| `[1, 2, 3]`, `None` | `[]` | `[]` |
| `None`, `None` | `[]` | `[]` |
| `[1, 1, 2, 2, 2, 3, 4, 5]`, `7` | `[]` | `[]` |

*Realne zadanie rekrutacyjne do firmy
[schibsted](https://www.schibsted.pl).*

## Pojazd księżycowy

Jako inżynier firmy [NASA](https://www.nasa.gov) zostałeś poproszony o
zaprojektowanie, przetestowanie oraz implementację ruchu pojazdu
księżycowego. Musisz być świadomy ograniczeń, które zostały uwzględnione
w specyfikacji technicznej.

![space vehicle](./static/img/tijo-lab06-space-vehicle.png)

Specyfikacja techniczna pojazdu księżycowego:

| PRZESTRZEŃ PRACY | ZACHOWANIE W PRZESTRZENI 2D |
|----|----|
| Jazda do przodu. | Możliwa o dowolną liczbę pól. |
| Jazda do tyłu. | Możliwa o dowolną liczbę pól. |
| Skręt w lewo. | Brak tradycyjnego mechanizmu skrętu. |
| Skręt w prawo | Brak tradycyjnego mechanizmu skrętu. |
| Rotacja / obrót wokół własnej osi. | Możliwy. Ruch oznacza obrót o 90° w lewo lub w prawo. |
| Punkt startu. | Punkt początkowy. Punkt odniesienia pojazdu. |
| Odczyt lokalizacji. | Pojazd zwraca współrzędne X i Y obszaru, w którym się znajduje. |

Bardzo proszę zaproponować interfejs pojazdu księżycowego dostosowany do
specyfikacji technicznej. Proszę zaimplementować mechanizm poruszania
się pojazdu księżycowego. Zachowanie pojazdu powinno być dobrze
przetestowane przy pomocy modułu **unittest**.

## Podsumowanie

Umiejętność rozpoznawania i naprawiania Code Smells jest niezbędna przy
tworzeniu łatwego w utrzymaniu oprogramowania. Zrozumienie opisanych w
laboratorium złych praktyk i ich świadome unikanie znacznie zredukuje
przyszły czas poświęcony na refaktoryzację kodu źródłowego.
