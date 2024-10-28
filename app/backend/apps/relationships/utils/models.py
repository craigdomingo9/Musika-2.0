from typing import Dict

def get_field_args(max_length:int=150,blank:bool=True,null:bool=True) -> Dict[str,bool | int]:
    """Returns a dictionary of field arguments for Django model fields."""
    return {
        "max_length": max_length,
        "blank": blank,
        "null": null
    }

