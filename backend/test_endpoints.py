import requests
import getpass
import os

BASE_ROOT_URL = "http://localhost:8000/"

os.system("cls")

username = input(" Enter a username: ")
email = input(" Enter a unique email: ")
password = getpass.getpass(" Enter a password: ")

# test register
res = requests.post(BASE_ROOT_URL + "register/", data={
    "username": username,
    "email": email,
    "password": password
})

if(res.status_code == 201):
    print("\n Register succeded")
else:
    print(f"\n Register failed with status code {res.status_code}")

# test login
res = requests.post(BASE_ROOT_URL + "login/", data={
    "email": email,
    "password": password
})

if(res.status_code == 200):
    print(" Login succeded")
else:
    print(f" Login failed with status code {res.status_code}")
