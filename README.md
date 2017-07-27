# Soap.py

## 依赖

- Django


## Django 功能模块迁移

```bash
python manage.py migrate
```

## 启动服务器

```bash
python manage.py runserver 0.0.0.0:8000
```

## 添加管理员账号

```bash
python manage.py createsuperuser
```

## 生成依赖文件
```bash
pip freeze > ./requirements.txt
```

## 生成应用
```bash
python manage.py startapp APP_NAME
```

setting.py
```py
INSTALLED_APPS = [
    //...
    APP_NAME
]
```