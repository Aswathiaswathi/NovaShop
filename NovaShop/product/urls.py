from django.urls import path
from .views import GoodsInAPIView,ItemMasterAPIView,StockView,GoodsOutView

urlpatterns = [
    path('goodsin/', GoodsInAPIView.as_view(), name='goodsin'),
    path('items/', ItemMasterAPIView.as_view()),
    path('goodsin/<int:pk>/',GoodsInAPIView.as_view(),name='goodsout'),
    path('stock/', StockView.as_view()),
    path('goodsout/',GoodsOutView.as_view(),name='goodsout'),


 
]