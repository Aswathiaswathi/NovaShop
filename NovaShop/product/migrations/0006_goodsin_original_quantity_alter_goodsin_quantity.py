# Generated by Django 5.1.4 on 2024-12-31 05:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0005_itemmaster_stock'),
    ]

    operations = [
        migrations.AddField(
            model_name='goodsin',
            name='original_quantity',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='goodsin',
            name='quantity',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
