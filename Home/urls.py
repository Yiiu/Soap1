from django.conf.urls import url

import Home.views as home_router

urlpatterns = [
    url(r'^$', home_router.index),
]
