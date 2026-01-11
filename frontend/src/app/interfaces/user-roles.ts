export const enum UserRoles {
  ADMIN = 'ADMIN',
  OWNER = 'OWNER',
  USER = 'USER'
}

export function objToEnum(obj: {id:number,name:string}):UserRoles | undefined {
  switch (obj.id) {
    case 1:
      return UserRoles.ADMIN;
    case 2:
      return UserRoles.OWNER;
    case 3:
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
      return 'restaurant-owner';
    case UserRoles.USER:
      return 'user';
  }
}
