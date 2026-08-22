# Testowanie i jakość oprogramowania

**L#07:** Atrapy.

## Wprowadzenie

Atrapy są to obiekty zastępcze, które ułatwiają testowanie projektów.
Pozwalają wydzielić kod od zawiłych zależności, takich jak bazy danych
czy systemy plików. Dają pełną kontrolę nad otoczeniem testowanego kodu.
Ułatwiają tym samym sprawdzanie logiki.

Rozróżniamy pięć głównych typów atrap.

- **Dummy** służy do zastąpienia obiektu, który jest wymagany jako
  parametr, ale nie jest używany w testowanej metodzie.
- **Stub** służy do podmieniania zachowania obiektu, aby zwracał z góry
  określone wartości.
- **Fake** jest to atrapa, która posiada własną implementację, ale nie
  jest to rzeczywista implementacja.
- **Spy** bazuje na prawdziwym obiekcie, ale opakowuje go i zapisuje
  informacje o jego wywołaniach. W języku Python nie ma dedykowanej
  klasy Spy, ale można ją zaimplementować za pomocą Mock.
- **Mock** bazuje na pustym obiekcie, ale możemy zdefiniować jego
  zachowanie i sprawdzić jego wywołania.

Wykorzystujemy je jako obiekty zastępcze w testach.

**Wskazówka:** Warto zauważyć, że język Python (biblioteka
**unittest.mock**) nie dzieli atrap na tak sztywne klasyfikacje. Klasa
**Mock** pełni najczęściej rolę uniwersalnego zamiennika (np. jako
Dummy, Stub, czy Spy). Dlatego na potrzeby tego laboratorium i
zachowania czytelności kodu, wykluczyłem niektóre z nich i skupimy się
na nauce oraz praktycznym wykorzystaniu **Dummy, Fake oraz Mock**.

## Cel

Celem laboratorium jest zapoznanie się z atrapami i ich zastosowaniem w
testach.

Oto zadania dla Ciebie:

- **Refaktoryzacja kodu:** Oddziel kod produkcyjny(**src**) od
  testowego(**test**). Rozbij skrypt na mniejsze moduły i umieść je w
  odpowiednich katalogach. W katalogu produkcyjnym utwórz podkatalogi
  **model**, **view**, **controller**.
- **Implementacja:** Dokończ implementację wszystkich metod w kodzie
  produkcyjnym. Nie zmieniaj testów! Po uruchomieniu zestawu testów
  zauważysz, że nie przechodzą ze względu na brak implementacji logiki
  szyfru Cezara. Pracuj zgodnie z techniką **TDD (Test-Driven
  Development)**. Skup się na zaprogramowaniu logiki (wyszukaj
  komentarze **TODO**), aby testy przeszły, a dopiero potem zajmij się
  refaktoryzacją. Każda zaimplementowana funkcjonalność to jeden commit,
  więc zatwierdzaj aplikację etapami.
- **Użyj ChatBota:** Wykorzystaj ChatBota do refaktoryzacji kodu i
  implementacji, ale nie generuj gotowego rozwiązania. Zamiast tego,
  proś o pomoc w poszczególnych krokach.
- **Analiza atrap:** Przeanalizuj kod i zwróć uwagę, w jaki sposób
  wykorzystywane są atrapy.

## Wzorzec MVC

[Wzorzec MVC (Model-View-Controller)](https://pl.wikipedia.org/wiki/Model-View-Controller) to wzorzec
architektoniczny, który polega na podziale kodu programu na trzy
oddzielne moduły. Model reprezentuje dane i logikę biznesową. View to
interfejs użytkownika. Controller to pośrednik między modelem a
widokiem.

## Aplikacja - szyfr Cezara

``` python
# main.py
import tkinter as tk
from tkinter import messagebox
import unittest
from unittest.mock import Mock, call

# --- MODEL BIZNESOWY (Model) ---
class Logger:
    """Prosty system logowania."""
    def info(self, msg: str) -> None:
        print(f"[INFO] {msg}")
        
    def error(self, msg: str) -> None:
        print(f"[ERROR] {msg}")

class FileHandler:
    """Obsługa plików."""
    def read_content(self, filepath: str) -> str:
        # TODO: Zaimplementuj odczyt
        raise NotImplementedError("Odczyt z pliku nie jest zaimplementowany.")
        
    def write_content(self, filepath: str, content: str) -> None:
        # TODO: Zaimplementuj zapis
        raise NotImplementedError("Zapis do pliku nie jest zaimplementowany.")

class CaesarCipher:
    """Logika kryptograficzna."""
    def __init__(self, shift: int):
        self.shift = shift

    def encrypt(self, text: str) -> str:
        # TODO: Zaimplementuj szyfr Cezara
        raise NotImplementedError("Logika szyfrowania nie jest gotowa.")

class CryptoModel:
    """Mózg operacyjny. Odcięty od interfejsu."""
    def __init__(self, cipher: CaesarCipher, file_handler: FileHandler, logger: Logger):
        self.cipher = cipher
        self.file_handler = file_handler
        self.logger = logger
        
    def process_file(self, input_path: str, output_path: str) -> bool:
        """Kieruje logiką przetwarzania danych."""
        try:
            content = self.file_handler.read_content(input_path)
            encrypted = self.cipher.encrypt(content)
            self.file_handler.write_content(output_path, encrypted)
            self.logger.info(f"Sukces w lokalizacji: {output_path}")
            return True
        except Exception as e:
            self.logger.error(f"Wystąpił błąd: {e}")
            return False

# --- WIDOK (View) ---
class AppView:
    """Warstwa prezentacji (Tkinter). Nie wie nic o szyfrowaniu."""
    def __init__(self, root):
        self.root = root
        
        # Interfejs okna.
        tk.Label(root, text="Ścieżka pliku wejściowego:").pack(pady=(10, 0))
        self.input_entry = tk.Entry(root, width=35)
        self.input_entry.insert(0, "tajne_hasla.txt")
        self.input_entry.pack(pady=5)

        tk.Label(root, text="Ścieżka pliku wyjściowego:").pack(pady=(10, 0))
        self.output_entry = tk.Entry(root, width=35)
        self.output_entry.insert(0, "wynik_szyfrowania.txt")
        self.output_entry.pack(pady=5)
        
        self.action_button = tk.Button(root, text="Szyfruj plik")
        self.action_button.pack(pady=20)
        
    def get_input_path(self) -> str:
        # Pobieranie tekstu widgetu.
        return self.input_entry.get()
        
    def get_output_path(self) -> str:
        # TODO: Odbierz wartość przypisaną z powyższego pola.
        return "wyjście.txt"
        
    def show_message(self, success: bool):
        # TODO: Wygeneruj okno messagebox.showinfo lub messagebox.showerror bazując na fladze.
        pass

    def bind_action(self, callback):
        # TODO: Przypisz zdarzenie zaprogramowanego przycisku.
        pass

# --- KONTROLER (Controller) ---
class AppController:
    """Spaja widok z modelem reagując na zdarzenia."""
    def __init__(self, model: CryptoModel, view: AppView):
        self.model = model
        self.view = view
        self.view.bind_action(self.handle_encryption)

    def handle_encryption(self):
        """Zarządza logiką tuż po kliknięciu, wywołując poszczególne akcje modelu."""
        in_path = self.view.get_input_path()
        out_path = self.view.get_output_path()
        result = self.model.process_file(in_path, out_path)
        self.view.show_message(result)

# --- SEKCJA TESTÓW ---
class TestMVCComponents(unittest.TestCase):

    # Wykorzystana atrapa: Dummy
    def test_should_process_file_without_errors(self):
        # Dummy służy do zastąpienia obiektu, który jest wymagany jako 
        # parametr, ale nie jest używany w testowanej metodzie.
        
        # Given
        dummy_logger = Mock() 
        mock_handler = Mock(spec=FileHandler)
        mock_handler.read_content.return_value = "DowolnyTekst"
        real_cipher = CaesarCipher(shift=3)
        model = CryptoModel(real_cipher, mock_handler, dummy_logger)
        
        # When
        result = model.process_file("in.txt", "out.txt")
        
        # Then
        # Uwaga: Dummy spełnił swoją rolę już podczas bezbłędnej inicjalizacji 
        # modelu w Given. Testujemy tu tylko to, że sama obecność pustego 
        # loggera nie spowodowała błędu (wyjątku).
        self.assertTrue(result)

    # Wykorzystana atrapa: Mock
    def test_should_write_encrypted_content_to_output_file(self):
        # Mock bazuje na pustym obiekcie, ale możemy zdefiniować jego 
        # zachowanie i sprawdzić jego wywołania.
        
        # Given
        dummy_logger = Mock()
        mock_file_handler = Mock(spec=FileHandler)
        mock_file_handler.read_content.return_value = "abc"
        real_cipher = CaesarCipher(shift=3)
        model = CryptoModel(real_cipher, mock_file_handler, dummy_logger)
        
        # When
        model.process_file("a.txt", "b.txt")
        
        # Then
        mock_file_handler.write_content.assert_called_once_with("b.txt", "def")

    # Wykorzystana atrapa: Fake
    def test_should_save_data_to_file_system(self):
        # Fake jest to atrapa, która posiada własną implementację, ale nie 
        # jest to rzeczywista implementacja.
        
        # Given
        class InMemoryFileHandler(FileHandler):
            def __init__(self):
                self.storage = {"d/wejscie.txt": "abc"}
            def read_content(self, path: str) -> str:
                if path not in self.storage:
                    raise FileNotFoundError(f"Brak: {path}")
                return self.storage[path]
            def write_content(self, path: str, content: str) -> None:
                self.storage[path] = content
                
        dummy_logger = Mock()
        real_cipher = CaesarCipher(shift=3)
        fake_fs = InMemoryFileHandler()
        model = CryptoModel(real_cipher, fake_fs, dummy_logger)
        
        # When
        model.process_file("d/wejscie.txt", "d/wynik.txt")
        
        # Then
        self.assertIn("d/wynik.txt", fake_fs.storage)
        self.assertEqual(fake_fs.storage["d/wynik.txt"], "def")

if __name__ == "__main__":

    unittest.main() # Uruchamia testy
    
    # Kod uruchomieniowy aplikacji przenieś do pliku main.py 
    # (plik main.py umieść w katalogu src)
    
    # root = tk.Tk()
    # root.title("Kryptografia MVC")
    # root.geometry("400x300")
    # model = CryptoModel(CaesarCipher(3), FileHandler(), Logger())
    # view = AppView(root)
    # controller = AppController(model, view)
    # root.mainloop()
```
