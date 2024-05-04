import jwt, datetime
token_payload = {'user_id': '42'}
CUBE_API_SECRET = '35e62317c3f6223e71ea5857cf27bd72'
print(jwt.encode(token_payload, CUBE_API_SECRET, algorithm='HS256'))
