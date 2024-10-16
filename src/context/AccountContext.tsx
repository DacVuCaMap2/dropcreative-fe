// context/AccountContext.tsx
'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import { cookies } from 'next/headers';

type AccountContextType = {
  accountId: string | null;
};

const AccountContext = createContext<AccountContextType>({
  accountId: null,
});

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const [accountId, setAccountId] = useState<string | null>(null);

  useEffect(() => {
    const cookie = document.cookie;
    const accountIdMatch = cookie.match(/account_id=([^;]+)/);
    if (accountIdMatch) {
      setAccountId(accountIdMatch[1]);
    }
  }, []);

  return (
    <AccountContext.Provider value={{ accountId }}>
      {children}
    </AccountContext.Provider>
  );
}

export const useAccount = () => useContext(AccountContext);