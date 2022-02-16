# Generated by Django 3.2.8 on 2022-01-30 14:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0003_alter_product_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='name',
        ),
        migrations.AlterField(
            model_name='order',
            name='deliveredAt',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='paidAt',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
