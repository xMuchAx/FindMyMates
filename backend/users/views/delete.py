from rest_framework.decorators import api_view, authentication_classes
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication

from ..models import User

@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
def delete_user(request):
    if(request.user.is_authenticated):
        request.user.delete()
        return Response({"message": "Profile deleted successfully"}, status=200)
    else:
        return Response({"message": "Invalid credentials"}, status=401)