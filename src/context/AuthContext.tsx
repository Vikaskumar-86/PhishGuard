
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { supabase } from '../lib/supabase';
import type { UserProfile } from '../types';

interface RegisterData {
  name: string;
  phone: string;
  email: string;
  password: string;
  dob: string;
  gender: string;
  termsAccepted: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  register: (
    data: RegisterData
  ) => Promise<{ success: boolean; error?: string }>;
  login: (
    email: string,
    password: string,
    rememberMe?: boolean
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (partial: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadUser = async (authUser: {
      id: string;
      email?: string;
      user_metadata?: Record<string, unknown>;
    } | null) => {
      if (!authUser) {
        if (mounted) setUser(null);
        return;
      }

      const email = authUser.email ?? '';
      const metadata = authUser.user_metadata ?? {};

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .maybeSingle();

      if (error) {
        console.error('Profile loading failed:', error.message);
        if (mounted) setUser(null);
        return;
      }

      let row = profile;

      if (!row) {
        const { data: created, error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: authUser.id,
            full_name:
              typeof metadata.full_name === 'string'
                ? metadata.full_name
                : '',
            phone:
              typeof metadata.phone === 'string' ? metadata.phone : '',
            date_of_birth:
              typeof metadata.date_of_birth === 'string'
                ? metadata.date_of_birth
                : null,
            gender:
              typeof metadata.gender === 'string' ? metadata.gender : '',
            terms_accepted: metadata.terms_accepted === true,
          })
          .select('*')
          .single();

        if (insertError) {
          console.error('Profile creation failed:', insertError.message);
          if (mounted) setUser(null);
          return;
        }

        row = created;
      }

      if (mounted && row) {
        setUser({
          name: row.full_name || email.split('@')[0],
          phone: row.phone || '',
          email,
          dob: row.date_of_birth || '',
          gender: row.gender || '',
          termsAccepted: row.terms_accepted === true,
          joinDate: row.created_at
            ? String(row.created_at).split('T')[0]
            : new Date().toISOString().split('T')[0],
        });
      }
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setTimeout(() => {
        void loadUser(session?.user ?? null);
      }, 0);
    });

    void supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (error) {
          console.error('Session loading failed:', error.message);
          return;
        }
        return loadUser(data.session?.user ?? null);
      })
      .catch((error: unknown) => {
        console.error('Authentication initialization failed:', error);
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const register = async (
    data: RegisterData
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    try {
      if (!data.termsAccepted) {
        return {
          success: false,
          error: 'Please accept the Terms and Conditions to continue.',
        };
      }

      if (!data.name.trim()) {
        return { success: false, error: 'Full name is required.' };
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
        return {
          success: false,
          error: 'Please provide a valid email address.',
        };
      }

      if (!data.phone.trim()) {
        return { success: false, error: 'Phone number is required.' };
      }

      if (data.password.length < 8) {
        return {
          success: false,
          error: 'Password must be at least 8 characters long.',
        };
      }

      if (!data.dob) {
        return {
          success: false,
          error: 'Date of birth is required.',
        };
      }

      const birthDate = new Date(`${data.dob}T00:00:00`);

      if (
        Number.isNaN(birthDate.getTime()) ||
        birthDate > new Date()
      ) {
        return {
          success: false,
          error: 'Please provide a valid date of birth.',
        };
      }

      if (!data.gender) {
        return {
          success: false,
          error: 'Please select a gender option.',
        };
      }

      const { data: result, error } = await supabase.auth.signUp({
        email: data.email.trim().toLowerCase(),
        password: data.password,
        options: {
          data: {
            full_name: data.name.trim(),
            phone: data.phone.trim(),
            date_of_birth: data.dob,
            gender: data.gender,
            terms_accepted: true,
          },
        },
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (!result.user) {
        return {
          success: false,
          error: 'Registration failed. Please try again.',
        };
      }

      if (!result.session) {
        return {
          success: true,
          error:
            'Registration received. Check your email to confirm your account before signing in.',
        };
      }

      return { success: true };
    } catch (error: unknown) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Registration failed. Please try again.',
      };
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (
    email: string,
    password: string,
    _rememberMe = false
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    try {
      if (!email.trim() || !password) {
        return {
          success: false,
          error: 'Please enter both your email address and password.',
        };
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        return {
          success: false,
          error: 'Please enter a valid email address.',
        };
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error: unknown) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'Login failed.',
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    void supabase.auth.signOut().then(({ error }) => {
      if (error) {
        console.error('Sign out failed:', error.message);
        return;
      }
      setUser(null);
    });
  };

  const updateProfile = (partial: Partial<UserProfile>) => {
    if (!user) return;

    const updated = { ...user, ...partial };
    setUser(updated);

    void (async () => {
      const {
        data: { user: authUser },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !authUser) {
        console.error('Could not verify current user.');
        return;
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: updated.name,
          phone: updated.phone,
          date_of_birth: updated.dob || null,
          gender: updated.gender,
          terms_accepted: updated.termsAccepted,
        })
        .eq('id', authUser.id);

      if (error) {
        console.error('Profile update failed:', error.message);
      }
    })();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        register,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
