// app/lib/supabase.ts
// Placeholder for Supabase client
// תצטרך להתקין: npm install @supabase/supabase-js

// import { createClient } from '@supabase/supabase-js';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const supabaseUrl = 'YOUR_SUPABASE_URL';
// const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

// export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
//   auth: {
//     storage: AsyncStorage,
//     autoRefreshToken: true,
//     persistSession: true,
//     detectSessionInUrl: false,
//   },
// });

// Temporary mock for development
export const supabase = {
  auth: {
    signInWithOAuth: async ({ provider, options }: any) => {
      console.log(`Mock OAuth login with ${provider}`);
      return { error: null };
    },
    signOut: async () => {
      console.log("Mock sign out");
      return { error: null };
    },
    getSession: async () => {
      return { data: { session: null }, error: null };
    },
  },
};
