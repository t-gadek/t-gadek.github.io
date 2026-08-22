class ATM:
    """
    Klasa reprezentująca bankomat (ATM) z podstawowymi operacjami bankowymi.
    """

    def check_balance(self, pin: int) -> float:
        """
        Sprawdza saldo konta użytkownika.

        :param pin: PIN użytkownika.
        :return: Saldo konta użytkownika.
        :raises InvalidPinException: Jeśli podany PIN jest nieprawidłowy.
        """
        pass

    def deposit(self, pin: int, amount: float) -> float:
        """
        Wpłaca środki na konto użytkownika.

        :param pin: PIN użytkownika.
        :param amount: Kwota do wpłacenia.
        :return: Aktualne saldo po wpłacie.
        :raises InvalidPinException: Jeśli podany PIN jest nieprawidłowy.
        """
        pass

    def withdraw(self, pin: int, amount: float) -> float:
        """
        Wypłaca środki z konta użytkownika.

        :param pin: PIN użytkownika.
        :param amount: Kwota do wypłacenia.
        :return: Aktualne saldo po wypłacie.
        :raises InsufficientFundsException: Jeśli saldo jest niewystarczające.
        :raises InvalidPinException: Jeśli podany PIN jest nieprawidłowy.
        """
        pass
