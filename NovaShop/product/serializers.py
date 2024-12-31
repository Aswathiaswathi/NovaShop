from rest_framework import serializers
from .models import ItemMaster,GoodsIn,GoodsOut

class ItemMasterSerializer(serializers.ModelSerializer):
    stock = serializers.SerializerMethodField()
    goodsin=serializers.SerializerMethodField()
    goodsout=serializers.SerializerMethodField()

    class Meta:
        model = ItemMaster
        fields = ['id', 'item_name', 'description','has_expiry','has_entry_number', 'stock','goodsin','goodsout']

    def get_stock(self, obj):
        return obj.get_stock()

    def get_goodsin(self, obj):
        return obj.get_goodsin()
    
    def get_goodsout(self, obj):
        return obj.get_goodsout()


class GoodsInSerializer(serializers.ModelSerializer):
    item_name = serializers.CharField(source='item.item_name', read_only=True)  # Read-only field

    class Meta:
        model=GoodsIn
        fields = ['id', 'item', 'item_name', 'quantity', 'original_quantity','expiry_date', 'entry_number', 'date_added']
    def create(self, validated_data):
        # Ensure original_quantity is set to quantity if not explicitly provided
        if 'original_quantity' not in validated_data:
            validated_data['original_quantity'] = validated_data.get('quantity', 0)
        return super().create(validated_data)

class GoodsOutSerializer(serializers.ModelSerializer):
    class Meta:
        model=GoodsOut
        fields='__all__'
