# Testowanie i jakość oprogramowania

**L#12:** Selenium.

## Wprowadzenie

**Selenium** to biblioteka języka Python służąca do automatyzacji
przeglądarek internetowych. Pozwala na sterowanie przeglądarką,
symulowanie działań użytkownika oraz testowanie aplikacji webowych.

### Do czego wykorzystujemy Selenium?

- Automatyzacja testów aplikacji webowych.
- Symulowanie interakcji użytkownika z przeglądarką.
- Testowanie kompatybilności stron na różnych przeglądarkach.
- Web scraping (pobieranie danych ze stron internetowych).
- Tworzenie botów do wykonywania powtarzalnych czynności online.

### Co można testować przy pomocy Selenium?

- **Formularze**: Testowanie obsługi formularzy, wprowadzania i
  przesyłania danych.
- **Nawigację**: Klikanie w linki, sprawdzanie przekierowań.
- **Elementy interfejsu**: Widoczność przycisków, tekstów, ikon.
- **Interakcje użytkownika**: Scrollowanie, przeciąganie (drag and
  drop), alerty.
- **Responsywność**: Testy dla różnych rozdzielczości.

### Instalacja potrzebnych paczek

``` bash
pip install selenium webdriver-manager
```

### Przydatne zasoby

- [Selenium with Python (dokumentacja)](https://selenium-python.readthedocs.io/).

## Cel

Celem laboratorium jest zapoznanie się z biblioteką Selenium oraz
procesem automatyzacji testów webowych w języku Python. Zdobędziesz
praktyczne umiejętności pozwalające na tworzenie skryptów, które
automatycznie weryfikują działanie aplikacji w przeglądarce, bazując na
wcześniej przygotowanych przypadkach testowych.

## Zadanie - Selenium

Na podstawie zaprezentowanych poniżej przykładów kodu napisz testy
automatyczne dla aplikacji udostępnionych na poprzednim laboratorium.
Wykorzystaj bibliotekę Selenium oraz język Python.

Twoim zadaniem będzie zaimplementowanie testów, które będą weryfikowały
przypadki testowe oraz zgłoszone błędy (bug reports). Skup się na
automatyzacji scenariuszy testowych, które zostały utworzone podczas
poprzedniego laboratorium.

- Przeanalizuj dostępne poniżej skrypty i uruchom je lokalnie.
- Przeanalizuj swoje przypadki testowe i bug reporty z poprzednich
  zajęć.
- Napisz testy automatyczne w Pythonie z użyciem Selenium, które
  pokrywają te przypadki.
- Przetestuj swoje rozwiązanie (zweryfikuj, jak zachowują się testy po
  przełączeniu na środowisko DEV).

## Przykłady implementacji testów automatycznych

Poniżej znajdziesz gotowe skrypty, które pomogą Ci zrozumieć podstawowe
mechanizmy i rozpocząć pracę.

### Weryfikacja nagłówka strony

Prosty test weryfikujący obecność i treść nagłówka **H1** na
przykładowej stronie.

``` python
import unittest
import time

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

class TestWebPage(unittest.TestCase):
    def setUp(self):
        """
        Inicjalizacja testu - uruchomienie przeglądarki Chrome
        """
        self.service = Service(ChromeDriverManager().install())
        self.driver = webdriver.Chrome(service=self.service)

    def test_page_heading(self):
        """
        Test sprawdzający obecność (assertIsNotNone) i zawartość (assertEqual) nagłówka na stronie
        """
        # Given
        self.driver.get('https://example.com')

        # When
        heading = self.driver.find_element(By.TAG_NAME, 'h1')

        # Then
        self.assertIsNotNone(heading)
        self.assertEqual(heading.text, "Example Domain")

        # Zatrzymanie przeglądarki na 3 sekundy (do celów edukacyjnych)
        time.sleep(3)

    def tearDown(self):
        """
        Zakończenie testu - zamknięcie przeglądarki
        """
        self.driver.quit()

if __name__ == '__main__':
    unittest.main()
```

### Obsługa formularza kalkulatora

Test wprowadzający dane do formularza i weryfikujący wynik działania
kalkulatora.

``` python
import unittest
import time

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

class TestCalculator(unittest.TestCase):
    def setUp(self):
        """
        Inicjalizacja testu - uruchomienie przeglądarki Chrome i otwarcie strony kalkulatora
        """
        self.service = Service(ChromeDriverManager().install())
        self.driver = webdriver.Chrome(service=self.service)
        self.driver.get('https://tgadek.pl/app/tijo-calc/prod/index.html')

    def test_addition(self):
        """
        Test sprawdzający działanie operacji dodawania w kalkulatorze
        """
        # Given
        number1 = self.driver.find_element(By.ID, "number1")
        number1.send_keys("1")
        number2 = self.driver.find_element(By.ID, "number2")
        number2.send_keys("2")

        # When
        self.driver.find_element(By.CSS_SELECTOR, "input[type='button']").click()

        # Then
        result = self.driver.find_element(By.ID, "result").text
        self.assertEqual(result, "1 + 2 = 3")

        # Zatrzymanie przeglądarki na 3 sekundy (do celów edukacyjnych)
        time.sleep(3)

    def tearDown(self):
        """
        Zakończenie testu - zamknięcie przeglądarki
        """
        self.driver.quit()

if __name__ == '__main__':
    unittest.main()
```

## Podsumowanie

Automatyzacja testów za pomocą narzędzi takich jak Selenium znacznie
przyspiesza proces weryfikacji oprogramowania, szczególnie przy
powtarzalnych **testach regresyjnych** (testy weryfikujące, czy nowo
wprowadzony kod nie popsuł działających już funkcji).
