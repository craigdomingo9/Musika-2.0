from typing import Type
from django.db import models
import random
import string



def generate_unique_code(model: Type[models.Model]):
    length = 8

    while True:
        code = "".join(random.choices(string.ascii_uppercase, k=length))
        if not model.objects.filter(code=code).exists():
            break

    return code

