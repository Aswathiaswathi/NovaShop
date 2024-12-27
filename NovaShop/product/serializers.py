from rest_framework import serializers
from .models import ItemMaster,GoodsIn,GoodsOut

class ItemMasterSerializer(serializers.ModelSerializer):
    class Meta:
        model= ItemMaster
        fields='__all__'

class GoodsInSerializer(serializers.ModelSerializer):
    item_name = serializers.CharField(source='item.item_name', read_only=True)  # Read-only field

    class Meta:
        model=GoodsIn
        fields = ['id', 'item', 'item_name', 'quantity', 'expiry_date', 'entry_number', 'date_added']

class GoodsOutSerializer(serializers.ModelSerializer):
    class Meta:
        model=GoodsOut
        fields='__all__'
