# Testowanie i jakość oprogramowania

**L#05:** SOLID.

**Wprowadzenie**

Zasady **SOLID** to pięć kluczowych reguł projektowania obiektowego.
Dzięki nim kod jest bardziej elastyczny, czytelny i łatwiejszy w
utrzymaniu. Stosowanie tych zasad znacznie zmniejsza ryzyko błędów przy
rozbudowie aplikacji.

**Cel**

Głównym celem laboratorium jest nauka rozpoznawania wadliwego kodu,
który łamie dobre praktyki. Dodatkowo zapoznamy się z praktycznym
zastosowaniem refaktoryzacji zgodnie z zasadami **SOLID**.

**Zasady SOLID**

Poniżej przedstawiono opis poszczególnych zasad składających się na
akronim SOLID:

- **Single Responsibility Principle (SRP)** - Zasada jednej
  odpowiedzialności: Klasa powinna mieć tylko jedną odpowiedzialność,
  jeden powód do zmiany.
- **Open/Closed Principle (OCP)** – Zasada otwarte/zamknięte: Klasy
  powinny być otwarte na rozszerzenia, ale zamknięte na modyfikacje.
- **Liskov Substitution Principle (LSP)** – Zasada podstawienia Liskov:
  Obiekty klasy bazowej powinny być zastępowane obiektami klasy
  pochodnej bez wpływu na poprawność działania programu.
- **Interface Segregation Principle (ISP)** – Zasada segregacji
  interfejsów: Klasy nie powinny zależeć od metod, których nie używają.
- **Dependency Inversion Principle (DIP)** – Zasada odwrócenia
  zależności: Moduły wysokopoziomowe nie powinny zależeć od modułów
  niskopoziomowych. Oba powinny zależeć od abstrakcji.

**Refaktoryzacja**

Pobierz wszystkie skrypty i postaraj się je poprawić tak, aby nie
naruszały zasad SOLID.

- Naruszona zasada [⬇️
  SRP](../prj/static/source-code/solid/srp.py) (zamówienia).\
  *Czy nasza klasa nie ma zbyt wielu
  odpowiedzialności? Jak to sprytnie rozdzielić?*
- Naruszona zasada [⬇️
  OCP](../prj/static/source-code/solid/ocp.py) (figury geometryczne).\
  *Co się stanie, gdy dodamy nową figurę? Czy
  zostaniesz zmuszony(a) do modyfikacji już działającego kodu?*
- Naruszona zasada [⬇️
  LSP](../prj/static/source-code/solid/lsp.py) (konta bankowe).\
  *Czy dziedziczenie to na pewno dobry pomysł? Jak
  zadbać o odpowiedni kontrakt?*
- Naruszona zasada [⬇️
  ISP](../prj/static/source-code/solid/isp.py) (pracownicy).\
  *Dlaczego zmuszamy obiekty do wdrażania metod,
  których nigdy nie użyją? Jak rozbić ten pękaty interfejs?*
- Naruszona zasada [⬇️
  DIP](../prj/static/source-code/solid/dip.py) (urządzenia).\
  *Czy zwykły włącznik światła musi być połączony na
  sztywno z konkretną żarówką? A co jak zechcesz podpiąć do niego
  wentylator?*

**Podsumowanie**

Zrozumienie i umiejętne stosowanie zasad **SOLID** to klucz do bycia
profesjonalnym inżynierem oprogramowania. Kod oparty na dobrych
praktykach ułatwia pracę nie tylko twórcy, ale całemu zespołowi.
Regularna praktyka poprzez analizę i poprawę architektury prowadzi do
pisania czystego, niezawodnego kodu (clean code).
