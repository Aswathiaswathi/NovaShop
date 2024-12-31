from django.db import models

# Create your models here.
class ItemMaster(models.Model):
    id=models.AutoField(primary_key=True)
    item_name=models.CharField(max_length=255)
    description=models.TextField(blank=True,null=True)
    has_expiry=models.BooleanField(default=False)
    has_entry_number=models.BooleanField(default=False)
    stock = models.IntegerField(default=0) 

    def update_stock(self):
        total_goods_in = GoodsIn.objects.filter(item=self).aggregate(total=models.Sum('original_quantity'))['total'] or 0
        total_goods_out = GoodsOut.objects.filter(item=self).aggregate(total=models.Sum('quantity'))['total'] or 0
        self.stock = max(total_goods_in - total_goods_out, 0)
        self.save()


    def get_stock(self):
        return self.stock
    
    def get_goodsin(self):
        total_goods_in = GoodsIn.objects.filter(item=self).aggregate(total=models.Sum('original_quantity'))['total'] or 0
        return total_goods_in
    def get_goodsout(self):
        total_goods_out = GoodsOut.objects.filter(item=self).aggregate(total=models.Sum('quantity'))['total'] or 0
        return total_goods_out

    def __str__(self):
        return self.item_name

class GoodsIn(models.Model):
    id=models.AutoField(primary_key=True)
    item=models.ForeignKey(ItemMaster,on_delete=models.CASCADE,related_name='goods_in',null=True)
    original_quantity = models.PositiveIntegerField(default=0)
    quantity = models.PositiveIntegerField(default=0)
    expiry_date=models.DateField(null=True)
    entry_number=models.IntegerField(null=True)
    date_added=models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.item.update_stock()

    def __str__(self):
        return self.item.item_name


   
class GoodsOut(models.Model):
    id=models.AutoField(primary_key=True)
    item=models.ForeignKey(ItemMaster,on_delete=models.CASCADE,related_name='goods_out')
    quantity=models.IntegerField()
    date_removed=models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.item.update_stock()