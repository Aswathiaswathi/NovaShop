from django.urls import path
from .views import GoodsInAPIView,ItemMasterAPIView

urlpatterns = [
    path('goodsin/', GoodsInAPIView.as_view(), name='goodsin'),
    path('items/', ItemMasterAPIView.as_view()),
    path('goodsin/<int:pk>/',GoodsInAPIView.as_view(),name='goodsout'),
 
]