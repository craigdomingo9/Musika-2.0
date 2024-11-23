from typing import Type,Dict
from django.db import models
import random
import string
from uuid import uuid4



def get_field_args(max_length:int=150,blank:bool=True,null:bool=True) -> Dict[int,bool | int]:
    """Returns a dictionary of field arguments for Django model fields."""
    return {
        "max_length": max_length,
        "blank": blank,
        "null": null
    }


def generate_unique_code(model: Type[models.Model]):
    length = 8

    while True:
        code = "".join(random.choices(string.ascii_uppercase, k=length))
        if not model.objects.filter(code=code).exists():
            break

    return code




def generate_uuid(model: Type[models.Model]) -> uuid4:
    """Generate a unique UUID for a model."""
    while True:
        new_uuid = uuid4()  # Generate a new UUID
        if hasattr(model, 'uuid') and not model.objects.filter(uuid=new_uuid).exists():
            return new_uuid  # Return if it's unique
            



def get_default_operating_hours():
    return {
        "Monday": {"open": "09:00", "close": "17:00"},
        "Tuesday": {"open": "09:00", "close": "17:00"},
        "Wednesday": {"open": "09:00", "close": "17:00"},
        "Thursday": {"open": "10:00", "close": "18:00"},
        "Friday": {"open": "09:00", "close": "21:00"},
        "Saturday": {"open": "10:00", "close": "14:00"},
        "Sunday": {"closed": True},
    }