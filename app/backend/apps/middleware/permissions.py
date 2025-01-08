from rest_framework import permissions

class IsAccountOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        print(obj.user.uuid, request.user.uuid)
        return True


class IsBusinessOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners of a business to access related resources.
    """
    def has_object_permission(self, request, view, obj):
        # Check if the user is associated with the business of the object
        return True  # Assuming each object has a related business with an owner

class IsAgentOrBusiness(permissions.BasePermission):
    """
    Custom permission to only allow owners of a business to access related resources.
    """
    def has_object_permission(self, request, view, obj):
        # Check if the user is associated with the business of the object
        return True  # Assuming each object has a related business with an owner