from django.db import models

# Create your models here.
class ItemMaster(models.Model):
    id=models.AutoField(primary_key=True)
    item_name=models.CharField(max_length=255)
    description=models.TextField(blank=True,null=True)
    has_expiry=models.BooleanField(default=False)
    has_entry_number=models.BooleanField(default=False)

    def __str__(self):
        return self.item_name

class GoodsIn(models.Model):
    id=models.AutoField(primary_key=True)
    item=models.ForeignKey(ItemMaster,on_delete=models.CASCADE,related_name='goods_in',null=True)
    quantity=models.IntegerField()
    expiry_date=models.DateField(null=True)
    entry_number=models.IntegerField(null=True)
    date_added=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.item.item_name


   
class GoodsOut(models.Model):
    id=models.AutoField(primary_key=True)
    item=models.ForeignKey(ItemMaster,on_delete=models.CASCADE,related_name='goods_out')
    quantity=models.IntegerField()
    date_removed=models.DateTimeField(auto_now_add=True)
