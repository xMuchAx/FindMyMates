from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token

from ..models import User

@api_view(['POST'])
def login(request):
    try:
        user = User.objects.get(email=request.data.get("email"))
    except User.DoesNotExist:
        return Response({"message": "User not found"}, status=404)

    if(user.check_password(request.data.get("password"))):
        token = Token.objects.get(user=user)
        return Response({"token": token.key, "message": "User logged in successfully"}, status=200)
    else:
        return Response({"message": "Wrong password"}, status=401)
