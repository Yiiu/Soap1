# User
> /api/photos

## GET /

> 获取图片列表

### query

>- type = 图片类型：['new']

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

### POST /

> 添加图片
