from django.db import models
import datetime

# Create your models here.


class Task(models.Model):

	name = models.CharField(max_length=100, help_text="Task name")

	deadline = models.DateField(default=datetime.date.today)

	TASK_PRIORITY = (
		('Low', 'Low'),
		('Medium', 'Medium'),
		('High', 'High'),
	)

	priority = models.CharField(default="High", max_length=6, choices=TASK_PRIORITY, help_text="Task Priority")

	is_complete = models.BooleanField(default=False, help_text="Designates whether task is completed or not")

	is_deleted = models.BooleanField(default=False, help_text="Designates whether task is deleted or not")

	task_bucket = models.ForeignKey('TaskApp.Bucket', null=True, blank=True, on_delete=models.SET_NULL)
	
	class Meta:
	    verbose_name = "Task"
	    verbose_name_plural = "Task"

	def __str__(self):
		return str(self.name)


class Bucket(models.Model):

	name = models.CharField(max_length=100, help_text="Bucket name")

	class Meta:
	    verbose_name = "Bucket"
	    verbose_name_plural = "Bucket"

	def __str__(self):
		return str(self.name)
