# Naruszenie zasady DIP

class Light:
    def turn_on(self):
        print("Light is on")

    def turn_off(self):
        print("Light is off")


class Fan:
    def turn_on(self):
        print("Fan is spinning")

    def turn_off(self):
        print("Fan is stopped")


class Button:
    def __init__(self, light: Light):
        self._light = light

    def press(self):
        self._light.turn_on()


# Usage
light = Light()
light_button = Button(light)

light_button.press()
