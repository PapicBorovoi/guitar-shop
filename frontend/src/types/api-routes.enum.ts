export const ApiRoutes = {
  Register: '/user/register',
  Login: '/user/login',
  Check: '/user/check',
  CreateItem: '/catalog/create',
  DeleteItem: (vendorCode: string) => `/catalog/${vendorCode}`,
  GetItem: (vendorCode: string) => `/catalog/${vendorCode}`,
  UpdateItem: (vendorCode: string) => `/catalog/${vendorCode}`,
  GetItems: '/catalog/list',
} as const;
