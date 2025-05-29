export interface User {
    id: string;
    name: string;
    email: string;
  }
  
  export interface AuthState {
    user: User | null;
    verified_user: boolean;
    token: string | null;
    loading: boolean;
    error: string | null;
    organizationList: any;
    selectedOrganization: any;
  }
  
  export interface LoginCredentials {
    loginId: string;
    password: string;
    rememberMe?: boolean;
  }

  export interface ResetPasswordFormData {
    password: string;
    confirm_password: string;
  }

  export interface ForgotPasswordFormData {
    loginId: string;
  }