# Generated by Django 5.1.4 on 2024-12-26 04:31

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ItemMaster',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('item_name', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True, null=True)),
                ('has_expiry', models.BooleanField(default=False)),
                ('has_entry_number', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='GoodsOut',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('quantity', models.IntegerField()),
                ('date_removed', models.DateTimeField(auto_now_add=True)),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='goods_out', to='product.itemmaster')),
            ],
        ),
        migrations.CreateModel(
            name='GoodsIn',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('quantity', models.IntegerField()),
                ('expiry_date', models.DateField(null=True)),
                ('entry_number', models.IntegerField(null=True)),
                ('date_added', models.DateTimeField(auto_now_add=True)),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='goods_in', to='product.itemmaster')),
            ],
        ),
    ]
