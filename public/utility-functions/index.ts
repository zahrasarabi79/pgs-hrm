export interface IPermissions {
  [key: string]: boolean;
}
function hasPermission(permissions: IPermissions, permissionKey: string): boolean {
  // Check if the permissions object exists and has the specified permission key
  if (permissions && permissions.hasOwnProperty(permissionKey)) {
    // Return true if the specified permission is true, otherwise false
    return permissions[permissionKey];
  }
  // Return false if the specified permission key is not found in the permissions object
  return false;
}
export { hasPermission };
