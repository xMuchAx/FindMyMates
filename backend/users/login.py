# from rest_framework.decorators import api_view, renderer_classes
# from rest_framework.renderers import JSONRenderer
# from rest_framework.authtoken.models import Token
# from rest_framework.response import Response

# from drf_yasg.utils import swagger_auto_schema
# from drf_yasg import openapi

# from .models import User

# @swagger_auto_schema(
#     method='post',
#     request_body=openapi.Schema(
#         type=openapi.TYPE_OBJECT,
#         required=['email', 'password'],
#         properties={
#             'email': openapi.Schema(type=openapi.TYPE_STRING),
#             'password': openapi.Schema(type=openapi.TYPE_STRING),
#         }
#     ),
#     responses={200: 'User logged in successfully', 401: 'Wrong password', 404: 'User not found'}
# )

# @renderer_classes([JSONRenderer])
# @api_view(['POST'])
# def login(request):
#     try:
#         user = User.objects.get(email=request.data.get("email"))
#     except User.DoesNotExist:
#         return Response({"message": "User not found"}, status=404)

#     if(user.check_password(request.data.get("password"))):
#         token = Token.objects.get(user=user)
#         return Response({"token": token.key,"user-id": user.id, "message": "User logged in successfully"}, status=200)
#     else:
#         return Response({"message": "Wrong password"}, status=401)
