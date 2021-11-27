from django import template
from datetime import datetime

register = template.Library()

@register.filter
def check_task_status(deadline):
    present = datetime.now()
    if deadline < present.date():
        return "Overdue"
    elif deadline > present.date():
        return "Upcoming"
    else:
        return "Today"