import requests
import os

BASE_ROOT_URL = "http://localhost:8000"

EMAIL = "test.user@gmail.com"
PASSWORD = "password123"

# test register
res = requests.post(f"{BASE_ROOT_URL}/register/", data={
    "username": "Test-User",
    "email": EMAIL,
    "password": PASSWORD
})

os.system("cls")
if(res.status_code == 201):
    print("\n Register test passed successfully\n")
else:
    exit(f"\n Register failed with status code {res.status_code}")

# test login
res = requests.post(f"{BASE_ROOT_URL}/login/", data={
    "email": EMAIL,
    "password": PASSWORD
})

if(res.status_code == 200):
    print(" Login test passed successfully\n")
else:
    exit(f" Login failed with status code {res.status_code}")

token = res.json()["token"]
headers = {"Authorization": f"Token {token}"}

# test update profile
res = requests.post(f"{BASE_ROOT_URL}/update-profile/", data={"username": "The GOAT"}, headers=headers)

if(res.status_code == 200):
    print(" Update profile test passed successfully\n")
else:
    exit(f" Update profile test failed with status code {res.status_code}")

# test delete profile
res = requests.delete(f"{BASE_ROOT_URL}/delete-user/", headers=headers)

if(res.status_code == 200):
    print(" Delete user test passed successfully\n")
else:
    exit(f" Delete user test failed with status code {res.status_code}")
