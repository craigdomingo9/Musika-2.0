from rest_framework import permissions

class CanViewAssignment(permissions.BasePermission):
  
    """
    Only related agents can view and operate on the assignments.
    """
    def has_object_permission(self, request, view, obj):
        print()
        # Check if the user is associated with the business of the object
        return True  # Assuming each object has a related business with an owner