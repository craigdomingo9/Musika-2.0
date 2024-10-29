from rest_framework import permissions

class IsBusinessOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners of a business to access related resources.
    """

    def has_permission(self, request, view):
        # Allow all authenticated users to access safe methods
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # For unsafe methods, check if the user is authenticated
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # Check if the user is associated with the business of the object
        return obj.business.user == request.user  # Assuming each object has a related business with an owner

class IsAgentOrBusiness(permissions.BasePermission):
    """
    Custom permission to only allow owners of a business to access related resources.
    """

    def has_permission(self, request, view):
        # Allow all authenticated users to access safe methods
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # For unsafe methods, check if the user is authenticated
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # Check if the user is associated with the business of the object
        return obj.business_offer.business.user.is_agent == True | obj.business_offer.business.user.is_business == True   # Assuming each object has a related business with an owner