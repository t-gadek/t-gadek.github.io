class ShoppingCart:

    def add_product(self, product_name: str, price: int, quantity: int) -> bool:
        """
            Dodawanie produktu do koszyka.
            
            Parametr 'product_name' traktujemy jak identyfikator, nie mozna dodac nowego produktu.
            Metoda powinna zwrocic False jezeli przekazemy produkt, ktory juz istnieje w koszyku.
        """
        pass # 'pass' pozwala na utworzenie pustego bloku, gdy nie ma implementacji. Do usuniecia.

    def remove_product(self, product_name: str) -> bool:
        """Usuwanie produktu z koszyka"""
        pass

    def update_quantity(self, product_name: str, new_quantity: int) -> bool:
        """Aktualizacja ilosci produktu w koszyku"""
        pass

    def get_products(self):
        """Pobieranie nazw produktow z koszyka"""
        pass

    def count_products(self) -> int:
        """Pobieranie liczby produktow znajdujacych się w koszyku"""
        pass

    def get_total_price(self) -> int:
        """Pobieranie sumy cen produktow w koszyku"""
        pass

    def apply_discount_code(self, discount_code: str) -> bool:
        """Zastosowanie kuponu rabatowego"""
        pass

    def checkout(self) -> bool:
        """Realizacja zamowienia"""
        pass
