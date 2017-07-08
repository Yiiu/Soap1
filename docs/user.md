# User
> /api/users

## GET /me|:id

> 获取用户信息, /me为登录人用户信息

### respond:

``` js
{
  "_id": <ObjectId>,
  "username": <String>,
  "photos": <Number>,
  "location": <String>,
  "website": <String>,
  "following": <Number>,
  "followers": <Number>,
  "avatar": <String>,
  "description": <String>,
  "nickname": <String>
}
```

## GET /me|:id/photos

> 获取用户照片, /me为登录人用户照片

### respond:

``` js
[
  {
    "_id": <ObjectId>,
    "links": <Url>,
    "exif": {
      "ExposureTime": <Number>,
      "FNumber": <Number>,
      "ISO": <Number>,
      "FocalLength": <Number>
    },
    "image": {
      "ImageDescription": <String>,
      "Make": <String>,
      "Model": <String>,
      "Orientation": <Number>,
      "XResolution": <Number>,
      "YResolution": <Number>,
      "PlanarConfiguration": <Number>,
      "ResolutionUnit": <Number>,
      "Software": <String>,
      "ModifyDate": <Date>,
      "Artist": <String>,
      "ExifOffset": <Number>
    },
    "user": <UserInfo>,
    "created_at": <Date>,
    "tags": [
      <Tag>...
    ]
  }
  ...
]
```
