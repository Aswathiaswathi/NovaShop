from django.shortcuts import render
from rest_framework import viewsets
from .models import ItemMaster,GoodsIn,GoodsOut
from .serializers import ItemMasterSerializer,GoodsInSerializer,GoodsOutSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

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
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self,request,pk=None):
        if pk:
            task=GoodsIn.objects.get(pk=pk)
            serializer=GoodsInSerializer(task)
            print(serializer.data)
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
