import datetime
from django.http import HttpResponse


# Create your views here.
def Home(request):
    now = datetime.datetime.now()
    html = "<html><body>It is now %s.</body></html>" % now
    return HttpResponse(html)