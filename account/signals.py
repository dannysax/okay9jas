from django.db.models.signals import pre_save
from django.contrib.auth.models import User

def UpdateUsername(sender, instance, **kwargs):
    instance.username = instance.email
    if instance.username != '':
        instance.username = instance.email
    
    
pre_save.connect(UpdateUsername, sender=User)