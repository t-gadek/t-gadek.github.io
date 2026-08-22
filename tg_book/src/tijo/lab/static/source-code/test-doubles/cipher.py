import tkinter as tk
from tkinter import messagebox
import unittest
from unittest.mock import Mock

# ==================================
# MODEL BIZNESOWY
# ==================================

class Logger:
    """Prosty system logowania."""
    def info(self, msg: str) -> None:
        print(f"[INFO] {msg}")
        
    def error(self, msg: str) -> None:
        print(f"[ERROR] {msg}")

class FileHandler:
    """Obsługa plików zapis i odczyt na dysk."""
    def read_content(self, filepath: str) -> str:
        with open(filepath, "r", encoding="utf-8") as file:
            return file.read()
            
    def write_content(self, filepath: str, content: str) -> None:
        with open(filepath, "w", encoding="utf-8") as file:
            file.write(content)

class CaesarCipher:
    """Implementacja klasycznego algorytmu przesunięcia (Szyfr Cezara)."""
    def __init__(self, shift: int):
        self.shift = shift

    def encrypt(self, text: str) -> str:
        result = []
        for char in text:
            if char.isalpha():
                base = ord('A') if char.isupper() else ord('a')
                # Przesunięcie i owijanie (modulo 26) dla podstawowego alfabetu
                shifted = chr((ord(char) - base + self.shift) % 26 + base)
                result.append(shifted)
            else:
                result.append(char)
        return "".join(result)

class CryptoModel:
    """Mózg operacyjny spinający wszystkie warstwy logiczne (Fasada). Odcięty od interfejsu."""
    def __init__(self, cipher: CaesarCipher, file_handler: FileHandler, logger: Logger):
        self.cipher = cipher
        self.file_handler = file_handler
        self.logger = logger
        
    def process_file(self, input_path: str, output_path: str) -> bool:
        """Kieruje poleceniami przetwarzania danych dla wstrzykniętych podmodułów."""
        try:
            content = self.file_handler.read_content(input_path)
            encrypted = self.cipher.encrypt(content)
            self.file_handler.write_content(output_path, encrypted)
            self.logger.info(f"Sukces w lokalizacji: {output_path}")
            return True
        except Exception as e:
            self.logger.error(f"Wystąpił błąd: {e}")
            return False

# ==================================
# WIDOK (View)
# ==================================

class AppView:
    """Warstwa prezentacji (Tkinter). Operuje na elementach okna - zupełnie nie wie na jakiej logice polega program."""
    def __init__(self, root):
        self.root = root
        
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
        """Zwraca tekst z pola wpisywania."""
        return self.input_entry.get()
        
    def get_output_path(self) -> str:
        """Zwraca wpisany wyjściowy ciąg znaków."""
        return self.output_entry.get()
        
    def show_message(self, success: bool):
        """Prezentacyjnie interpretuje wynik z kontrolera"""
        if success:
            messagebox.showinfo("Sukces", "Zaszyfrowano pomyślnie. Plik znajduje się na dysku!")
        else:
            messagebox.showerror("Błąd", "Niestety coś poszło nie tak. Uruchom debugger.")

    def bind_action(self, callback):
        """Odbiera zaprezentowaną delegowaną funkcję kontrolera i podpina pod kliknięcie guzika"""
        self.action_button.config(command=callback)

# ==================================
# KONTROLER (Controller)
# ==================================

class AppController:
    """Klasa pełniąca mediatora - Spina widok z modelem reagując na bodźce z widoku."""
    def __init__(self, model: CryptoModel, view: AppView):
        self.model = model
        self.view = view
        
        # Inicjalne delegowanie akcji do przycisku na zewnątrz do Widoku!
        self.view.bind_action(self.handle_encryption)

    def handle_encryption(self):
        """Metoda pełniąca funkcję centrali dowodzącej uruchamiającej po zdarzeniu odpowiednie kanały."""
        in_path = self.view.get_input_path()
        out_path = self.view.get_output_path()
        
        # Wywołanie modelu i zwrócenie boola
        result = self.model.process_file(in_path, out_path)
        
        # Odświeżenie widoku rezultatem
        self.view.show_message(result)

# ==================================
# SEKCJA TESTÓW WRAZ Z ATRAPAMI
# ==================================

class TestMVCComponents(unittest.TestCase):

    # Wykorzystana atrapa: Dummy
    def test_should_process_file_without_errors(self):
        dummy_logger = Mock() 
        mock_handler = Mock(spec=FileHandler)
        mock_handler.read_content.return_value = "DowolnyTekst" # Zabezpiecza szyfr przed obiektem Mock iterującym w nieskończoność
        real_cipher = CaesarCipher(shift=3)
        model = CryptoModel(real_cipher, mock_handler, dummy_logger)
        
        result = model.process_file("in.txt", "out.txt")
        self.assertTrue(result)

    # Wykorzystana atrapa: Mock
    def test_should_write_encrypted_content_to_output_file(self):
        dummy_logger = Mock()
        mock_file_handler = Mock(spec=FileHandler)
        mock_file_handler.read_content.return_value = "abc"
        real_cipher = CaesarCipher(shift=3)
        model = CryptoModel(real_cipher, mock_file_handler, dummy_logger)
        
        model.process_file("a.txt", "b.txt")
        mock_file_handler.write_content.assert_called_once_with("b.txt", "def")

    # Wykorzystana atrapa: Fake
    def test_should_save_data_to_file_system(self):
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
        
        model.process_file("d/wejscie.txt", "d/wynik.txt")
        self.assertIn("d/wynik.txt", fake_fs.storage)
        self.assertEqual(fake_fs.storage["d/wynik.txt"], "def")

# ==================================
# PUNKT STARTOWY DEWELOPMENTU
# ==================================

if __name__ == "__main__":
    # Testy środowiskowe
    unittest.main(exit=False)
    
    # Inicjacja silnika UI na platformie w architekturze MVC
    root = tk.Tk()
    root.title("Kryptografia MVC")
    root.geometry("400x300")
    
    crypto_model = CryptoModel(CaesarCipher(3), FileHandler(), Logger())
    app_view = AppView(root)
    app_controller = AppController(crypto_model, app_view)
    
    root.mainloop()
