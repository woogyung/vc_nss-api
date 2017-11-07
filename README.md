![Vanilla Coding](https://s3.ap-northeast-2.amazonaws.com/vanilla-coding/Assets/logo_regular%403x.png)

# News Search System API

## Endpoints

### 1. POST `/signup`
- Required request body
```
username: <String>
password: <String>
```
- Sample response (JSON)
```json
{
  "message": "가입 완료"
}
```
### 2. POST `/login`
- Required Request body
```
username: <String>
password: <String>
```
- Sample response (JSON)
```json
{
  "access_token": "ghs__df=423njsfdruur12jfjuh4!?frt34563ju8h84h2d10"
}
```
### 3. GET `/users/:id`
- Required request header
```json
{
  "token": "Bearer YOUR_ACCESS_TOKEN"
}
```
- Sample Response (JSON)
```json
{
  "usernanme": "huh",
  "_id": "3i4i2ih29hfh39di9e2js92wi9"
}
```

### 설치하기

**포크하지 마시고 바로 클론하세요.**

```
git clone https://github.com/vanilla-coding/nss-api.git
cd nss-api
npm install
```

### 실행하기

```
npm start
```
