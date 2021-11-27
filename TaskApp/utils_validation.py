import re
import sys
import logging

logger = logging.getLogger(__name__)


"""
Description: This class contains methods related to input validation
"""

class InputValidation:

    def __init__(self) -> 'InputValidation':
        self.extra = {'AppName': 'TaskApp'}

    def is_valid_email(self, email: str) -> bool:
        try:
            regex = "(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"
            if(re.search(regex, email)):
                return True

        except Exception as e:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            logger.error("is_valid_email: %s %s", str(
                e), str(exc_tb.tb_lineno), extra=self.extra)

        return False