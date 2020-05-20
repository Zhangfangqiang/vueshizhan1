/**
 * 路由配置开始
 */
export default [
  {
    path      : '/auth/register',
    name      : 'Register',
    component : () => import('@/views/auth/Register')
  },{
    path      : '/auth/login',
    name      : 'Login',
    component : () => import('@/views/auth/Login')
  }
]
