from django.contrib import admin
from .models import ItemMaster,GoodsIn,GoodsOut

# Register your models here.
admin.site.register(ItemMaster)
admin.site.register(GoodsIn)
admin.site.register(GoodsOut)
