from dataclasses import dataclass
from logging import getLogger

logger = getLogger(__name__)


@dataclass
class Account:
    pass


class AccountUpdater:
    def __init__(self,account,data) -> None:
        self.account = account
        self.data = data
        self.update_fields = ["is_anonymous"]
    
    def call(self) -> Account:
        try:
            self.update_account(self.data)
            return self.account
        except KeyError as e:
            logger.error(f"Account update failed: {e}")

            return self.account


    def update_account(self, data: dict) -> bool:
        if not isinstance(data, dict):
            raise ValueError("Invalid data")
        
        for key, value in data.items():
            if isinstance(value, list):
                value = "".join(value)
            try:
                setattr(self.account, key, value)
            except AttributeError:
                # Handle attribute error
                pass
            if value != "":
                self.update_fields.append(key)
        return True

