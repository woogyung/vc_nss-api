![Vanilla Coding](https://s3.ap-northeast-2.amazonaws.com/vanilla-coding/Assets/logo_regular%403x.png)

# News Search System API

## Endpoints

### 1. Status Check `/status-check`
- Response
```
{
  "message": "Hello, Vanilla"
}
```

### 2. POST `/signup`
- Required Header Options
```
content-type: application/json
```
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

### 3. POST `/login`
- Required Header Options
```
content-type: application/json
```
- Required Request body
```
username: <String>
password: <String>
```
- Sample response (JSON)
```json
{
  "data": {
    "username": "ken"
  },
  "access_token": "ghs__df=423njsfdruur12jfjuh4!?frt34563ju8h84h2d10"
}
```

### 4. GET `/top-stories/{SECTION_NAME}`
- SECTION_NAME: 원하는 섹션을 의미하는 다음 중 하나의 값 `home, opinion, world, national, politics, upshot, nyregion, business, technology, science, health, sports, arts, books, movies, theater, sundayreview, fashion, tmagazine, food, travel, magazine, realestate, automobiles, obituaries, insider`
- Sample Response (JSON)
```
{
  results:
   [
     {
        section: string
        subsection: string
        title: string
        abstract: string
        url: string
        thumbnail_standard: string
        short_url: string
        byline: string
        item_type: string
        updated_date: string
        created_date: string
        published_date: string
        material_type_facet: string
        kicker: string
        des_facet: []
        org_facet: []
        per_facet: []
        geo_facet: []
        multimedia: []
        related_urls: []
    }
  ]
}
```

## 설치하기

### 서버 설치

**포크하지 마시고 바로 클론하세요.**

```
git clone https://github.com/vanilla-coding/nss-api.git
cd nss-api
npm install
```

### 데이터베이스 설정

* [mlab](https://mlab.com) 가입하기
* 데이터베이스 생성
* 데이터베이스 사용자 생성
* `app.js`내에서 `DB_URL`, `DB_USER`, `DB_PASSWORD` 변경

## 실행하기

```sh
npm start
```

Address: `localhost:8080`
