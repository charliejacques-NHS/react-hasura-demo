import { PropsWithChildren, createContext, useState } from 'react';

export interface AuthContextValue {
  /**
   * The chosen username
   */
  username: string;
  /**
   * Function to update the chosen username
   * @param username The new username
   */
  setUsername(username: string): void;
  /**
   * The role of the given user
   */
  role?: string;
  /**
   * Function to update the role of the given user
   * @param role The new role
   */
  setRole(role: string): void;
  /**
   * The id of the given user
   */
  userId?: string;
  /**
   * Function to update the id of the given user
   * @param userId The new id
   */
  setUserId(userId: string): void;
  /**
   * Whether the current user is authenticated or not
   */
  authenticated: boolean;
}

const initialValue: AuthContextValue = {
  username: '',
  setUsername: function (_username: string): void {
    throw new Error('Function not implemented.');
  },
  role: undefined,
  setRole: function (_role: string): void {
    throw new Error('Function not implemented.');
  },
  userId: undefined,
  setUserId: function (_userId: string): void {
    throw new Error('Function not implemented.');
  },
  authenticated: false,
};

export const AuthContext = createContext(initialValue);

/**
 * Provider component for {@link AuthContext}
 */
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [username, setUsername] = useState<string>(initialValue.username);
  const [role, setRole] = useState<string | undefined>(initialValue.role);
  const [userId, setUserId] = useState<string | undefined>(initialValue.userId);
  return (
    <AuthContext.Provider
      value={{
        username,
        setUsername,
        role,
        setRole,
        userId,
        setUserId,
        authenticated: !!role && !!userId,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
