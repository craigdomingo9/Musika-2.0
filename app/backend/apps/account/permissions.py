from rest_framework import permissions

class IsAccountOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        print(obj.user.uuid, request.user.uuid)
        return obj.user == request.user
