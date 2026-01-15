export enum UserRoles {
  ADMIN = 'ADMIN',
  OWNER = 'OWNER',
  USER = 'USER'
}

export function strToEnum(name:string):UserRoles | undefined {
  switch (name) {
    case 'ADMIN':
      return UserRoles.ADMIN;
    case 'OWNER':
      return UserRoles.OWNER;
    case 'USER':
      return UserRoles.USER;
    default:
      return undefined;
  }
}

export function getRoleRoutes(role:UserRoles){
  switch (role) {
    case UserRoles.ADMIN:
      return 'site-manager';
    case UserRoles.OWNER:
      return 'restaurant-component-owner';
    case UserRoles.USER:
      return 'user';
  }
}
