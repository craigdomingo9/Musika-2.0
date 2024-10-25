from typing import Dict,Type
from uuid import uuid4
from django.db import models


def get_field_args(max_length:int=150,blank:bool=True,null:bool=True) -> Dict[int,bool | int]:
    """Returns a dictionary of field arguments for Django model fields."""
    return {
        "max_length": max_length,
        "blank": blank,
        "null": null
    }



def generate_uuid(model: Type[models.Model]) -> uuid4:
    """Generate a unique UUID for a model."""
    while True:
        new_uuid = uuid4()  # Generate a new UUID
        if not model.objects.filter(uuid=new_uuid).exists():
            return new_uuid  # Return if it's unique
