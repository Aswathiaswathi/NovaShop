from django.shortcuts import render
from rest_framework import viewsets
from .models import ItemMaster,GoodsIn,GoodsOut
from .serializers import ItemMasterSerializer,GoodsInSerializer,GoodsOutSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils.timezone import now

# Create your views here.

# class ItemView(APIView):
#     def get(self,request):
#         items=ItemMaster.objects.all()
#         serializer=ItemMasterSerializer(items,many=True)
#         return Response(serializer.data)
    
    # def post(self,request):

# class GoodsInViewSet(viewsets.ModelViewSet):
#     queryset=GoodsIn.objects.all()
#     serializer_class=GoodsInSerializer

class GoodsInAPIView(APIView):
    def post(self, request):
        serializer = GoodsInSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            goods_in_instance = serializer.save()  # Save the GoodsIn instance
            item=goods_in_instance.item
            item.update_stock()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self,request,pk=None):
        if pk:
            task=GoodsIn.objects.get(pk=pk)
            serializer=GoodsInSerializer(task)
            print("goodsin data:",serializer.data)
            return Response(serializer.data)
        else:
            tasks=GoodsIn.objects.all()
            serializer=GoodsInSerializer(tasks,many=True)
            return Response(serializer.data)
    
    def put(self, request, pk=None):
        if not pk:
            return Response({'error': 'ID is required for update'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            task = GoodsIn.objects.get(pk=pk)
        except GoodsIn.DoesNotExist:
            return Response({'error': 'GoodsIn entry not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = GoodsInSerializer(task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self,request,pk):
        print("Hii",pk)
        try:
            task=GoodsIn.objects.get(pk=pk)
            task.delete()
            return Response({'message': 'Task deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ItemMasterAPIView(APIView):
    def get(self, request):
        items = ItemMaster.objects.all()
        serializer = ItemMasterSerializer(items, many=True)
        return Response(serializer.data)

    def post(self,request):
        serializer=ItemMasterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class StockView(APIView):
    def get(self, request):
        items = ItemMaster.objects.all()
        data = []
        for item in items:
            data.append({
                "item_name": item.item_name,
                "description": item.description,
                "stock": item.get_stock(),
                "goods_in":item.get_goodsin(),
                "goods_out":item.get_goodsout(),
            })
        return Response(data, status=status.HTTP_200_OK)

class GoodsOutView(APIView):
    def post(self, request):
        item_id = request.data.get('item')
        quantity_to_remove = request.data.get('quantity')
        date_removed = request.data.get('date_removed', now())
        print("Item ID received:", item_id, "quantity:", quantity_to_remove)
        
        if not item_id or not quantity_to_remove:
            return Response({"error": "Item ID and quantity are required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            quantity_to_remove = int(quantity_to_remove)
            if quantity_to_remove <= 0:
                return Response({"error": "Quantity must be a positive integer"}, status=status.HTTP_400_BAD_REQUEST)

            # Get all GoodsIn entries for the item, ordered by expiry date
            goods_in_entries = GoodsIn.objects.filter(item_id=item_id).order_by('expiry_date')
            total_available_stock = sum(entry.quantity for entry in goods_in_entries)  # Calculate total stock
            print("Total available stock", total_available_stock)

            # Check if stock is sufficient
            if total_available_stock < quantity_to_remove:
                return Response({"error": "Insufficient stock to fulfill the request"}, status=status.HTTP_400_BAD_REQUEST)

            # Process GoodsOut operation
            remaining_quantity = quantity_to_remove
            for entry in goods_in_entries:
                print("Expiry date:", entry.expiry_date)
                if remaining_quantity <= 0:
                    break  # No more stock to remove

                if entry.quantity <= remaining_quantity:
                    # If the quantity in this entry is less than or equal to the remaining quantity to remove
                    print(f"Removing {entry.quantity} from entry ID {entry.id}")
                    remaining_quantity -= entry.quantity
                    entry.quantity = 0  # Deplete the stock in this entry
                else:
                    # If the remaining quantity is less than the entry quantity, reduce the entry quantity
                    print(f"Removing {remaining_quantity} from entry ID {entry.id}")
                    entry.quantity -= remaining_quantity
                    print("********entry quantity*********",entry.quantity)
                    remaining_quantity = 0  # All requested quantity has been removed

                print(f"Updated entry ID {entry.id}: remaining quantity {entry.quantity}")
                entry.save()  # Save the updated entry

            if remaining_quantity > 0:
                return Response({"error": "Insufficient stock to fulfill the request"}, status=status.HTTP_400_BAD_REQUEST)

            # Create GoodsOut entry for removed quantity
            item = ItemMaster.objects.get(id=item_id)
            goods_out_instance = GoodsOut.objects.create(item=item, quantity=quantity_to_remove, date_removed=date_removed)
            
            # Update stock after GoodsOut operation
            item.update_stock()

            return Response({"message": "Goods removed successfully"}, status=status.HTTP_201_CREATED)

        except ItemMaster.DoesNotExist:
            return Response({"error": "Item not found"}, status=status.HTTP_400_BAD_REQUEST)
        except ValueError:
            return Response({"error": "Invalid quantity format"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)